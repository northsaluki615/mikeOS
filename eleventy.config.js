const { DateTime } = require("luxon");
const markdownItAnchor = require("markdown-it-anchor");

const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const pluginNavigation = require("@11ty/eleventy-navigation");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

const pluginDrafts = require("./eleventy.config.drafts.js");
const pluginImages = require("./eleventy.config.images.js");

// Added for mikeOS
const eleventyPluginIndieWeb = require("eleventy-plugin-indieweb");
const activityPubPlugin = require('eleventy-plugin-activity-pub');
const pluginInlineLinkFavicon = require("eleventy-plugin-inline-link-favicon")
const fs = require("fs");
const path = require("path");

module.exports = function(eleventyConfig) {
	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig.addPassthroughCopy({
		"./public/": "/",
		"./node_modules/prismjs/themes/prism-okaidia.css": "/css/prism-okaidia.css"
	});

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// Watch content images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");

	// App plugins
	eleventyConfig.addPlugin(pluginDrafts);
	eleventyConfig.addPlugin(pluginImages);

	// Official plugins
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 }
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(pluginBundle);

	// Filters
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

	eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return all the tags used in a collection
	eleventyConfig.addFilter("getAllTags", collection => {
		let tagSet = new Set();
		for(let item of collection) {
			(item.data.tags || []).forEach(tag => tagSet.add(tag));
		}
		return Array.from(tagSet);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
	});

	// Customize Markdown library settings:
	eleventyConfig.amendLibrary("md", mdLib => {
		mdLib.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.ariaHidden({
				placement: "after",
				class: "header-anchor",
				symbol: "#",
				ariaHidden: false,
			}),
			level: [1,2,3,4],
			slugify: eleventyConfig.getFilter("slugify")
		});
	});

	eleventyConfig.addShortcode("currentBuildDate", () => {
		return (new Date()).toISOString();
	})

	// Mike's additions
	eleventyConfig.addPlugin(eleventyPluginIndieWeb, {
		hCard: {
			name: "Michael Helmers",
			url: "https://mike.helmers.me",
			email: "mikehelmers@proton.me",
			adr: {
			  locality: "Madison",
			  region: "Wisconsin",
			  countryName: "United States"
			}
		}
	  });
	eleventyConfig.addPlugin(activityPubPlugin, {
		domain: 'mike.helmers.me',
		username: 'mike',
		displayName: 'Michael Helmers',
		summary: 'This is my Eleventy website, now discoverable on the Fediverse!',
		outbox: true,
		outboxCollection: 'posts'
	  });
	eleventyConfig.addPassthroughCopy("images");
	eleventyConfig.addPlugin(pluginInlineLinkFavicon)
	// create a collection of all wiki tags
	eleventyConfig.addCollection("wikiTags", function(collectionApi) {
		let tagSet = new Set();
		collectionApi.getFilteredByGlob("./content/wiki/*.md").forEach(item => {
		  if("tags" in item.data) {
			let tags = item.data.tags;
			tags.forEach(tag => tagSet.add(tag));
		  }
		});
		return [...tagSet];
	  });
	eleventyConfig.addFilter("filterPostsByTag", function(posts, tag) {
		return posts.filter(post => post.data.tags && post.data.tags.includes(tag)).slice(0, 3);
	  });
	// Dynamically add collections based on subdirectories of /content/wiki/
	const wikiDir = 'content/wiki/';
	fs.readdirSync(wikiDir, { withFileTypes: true }).forEach(dir => {
		if (dir.isDirectory()) {
			const dirName = dir.name;
			eleventyConfig.addCollection(dirName, function(collectionApi) {
				return collectionApi.getFilteredByGlob(path.join(wikiDir, dirName, "*.md"));
			});
		}
		});

	eleventyConfig.addCollection("wikiTopics", function(collectionApi) {
		let topics = [];
		// Check if the wiki directory exists to prevent build errors
		if (fs.existsSync(wikiDir)) {
		  // Read the contents of the wiki directory
		  const items = fs.readdirSync(wikiDir, { withFileTypes: true });
		  // Filter for directories and get their names
		  topics = items.filter(item => item.isDirectory()).map(dir => dir.name);
		}
		return topics;
	  });
		  
	// Features to make your build faster (when you need them)

	// If your passthrough copy gets heavy and cumbersome, add this line
	// to emulate the file copy on the dev server. Learn more:
	// https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

	// eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

	return {
		// Control which files Eleventy will process
		// e.g.: *.md, *.njk, *.html, *.liquid
		templateFormats: [
			"md",
			"njk",
			"html",
			"liquid",
		],

		// Pre-process *.md files with: (default: `liquid`)
		markdownTemplateEngine: "njk",

		// Pre-process *.html files with: (default: `liquid`)
		htmlTemplateEngine: "njk",

		// These are all optional:
		dir: {
			input: "content",          // default: "."
			includes: "../_includes",  // default: "_includes"
			data: "../_data",          // default: "_data"
			output: "_static"
		},

		// -----------------------------------------------------------------
		// Optional items:
		// -----------------------------------------------------------------

		// If your site deploys to a subdirectory, change `pathPrefix`.
		// Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

		// When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
		// it will transform any absolute URLs in your HTML to include this
		// folder name and does **not** affect where things go in the output folder.
		pathPrefix: "/",
	};
};

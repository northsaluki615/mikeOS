const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItTableOfContents = require("markdown-it-table-of-contents");
const markdownItTaskCheckbox = require("markdown-it-task-checkbox");

// Official plugins
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const pluginNavigation = require("@11ty/eleventy-navigation");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

// Custom plugins
const pluginDrafts = require("./eleventy.config.drafts.js");
const pluginImages = require("./eleventy.config.images.js");
const eleventyPluginIndieWeb = require("eleventy-plugin-indieweb");
const activityPubPlugin = require('eleventy-plugin-activity-pub');
const embedSpotify = require("eleventy-plugin-embed-spotify");

// Export the configuration
module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy({"./public/": "/**/**/", "./node_modules/prismjs/themes/prism-okaidia.css": "/css/prism-okaidia.css"});
	eleventyConfig.addPassthroughCopy({"./public/**/*": "/"});
	eleventyConfig.addPassthroughCopy("./src/images/*.svg");

	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");
	eleventyConfig.addPlugin(pluginDrafts);
	eleventyConfig.addPlugin(pluginImages);
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginSyntaxHighlight, { preAttributes: { tabindex: 0 } });
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(pluginBundle);

	// Filters and shortcodes
	eleventyConfig.addFilter("readableDate", (dateStr, format = "dd LLLL yyyy", zone = "utc") => {
		let parsedDate = DateTime.fromISO(dateStr, { zone });
		if (!parsedDate.isValid) parsedDate = DateTime.fromJSDate(new Date(dateStr), { zone });
		return parsedDate.isValid ? parsedDate.toFormat(format) : "Invalid Date";
	});

	eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
	});

	eleventyConfig.addFilter("head", (array, n) => {
		if (!Array.isArray(array) || array.length === 0) return [];
		if (n < 0) return array.slice(n);
		return array.slice(0, n);
	});

	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	eleventyConfig.addFilter("getAllTags", collection => {
		let tagSet = new Set();
		for (let item of collection) { (item.data.tags || []).forEach(tag => tagSet.add(tag)); }
		return Array.from(tagSet);
	});

	eleventyConfig.addFilter("filterTagList", tags => {
		return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
	});

	eleventyConfig.addFilter("filterByTag", function(collection, tag) {
		return collection.filter(item => {
		  return (item.data.tags || []).includes(tag);
		});
	  });

	eleventyConfig.amendLibrary("md", mdLib => {
		mdLib.use(markdownItAnchor, { permalink: markdownItAnchor.permalink.ariaHidden({ placement: "after", class: "header-anchor", symbol: "#", ariaHidden: false }), level: [1,2,3,4], slugify: eleventyConfig.getFilter("slugify") });
	});

	eleventyConfig.addShortcode("currentBuildDate", () => { return (new Date()).toISOString(); });	

	eleventyConfig.addFilter("date", function(date, format) {
		// Simple date formatting, adjust as needed
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(date).toLocaleDateString("en-US", options);
	  });

	// Put robots.txt and ai.txt in the root of the output
	eleventyConfig.addPassthroughCopy({ 'public/robots.txt': '/robots.txt' });
	eleventyConfig.addPassthroughCopy({ 'public/ai.txt': '/ai.txt' });

	// Configure Markdown-it with the task checkbox plugin and HTML enabled
	let markdownLib = markdownIt({
		html: true, // Enable HTML tags in source
		linkify: true, // Autoconvert URL-like text to links
		typographer: true // Enable smartquotes
	}).use(markdownItTaskCheckbox, {
		disabled: false, // Make checkboxes interactive
		divWrap: true,   // Wrap checkbox in a div for easier styling
		divClass: 'checkbox',
		idPrefix: 'cbx_',
		ulClass: 'task-list',
		liClass: 'task-list-item'
	}).use(require('markdown-it-table-of-contents'));
	
	// Set the Markdown library to Eleventy's markdown library
	eleventyConfig.setLibrary("md", markdownLib);

	// IndieWeb and ActivityPub plugins
	eleventyConfig.addPlugin(eleventyPluginIndieWeb, { hCard: { name: "Michael Helmers", url: "https://mike.helmers.me", email: "mikehelmers@proton.me", adr: { locality: "Madison", region: "Wisconsin", countryName: "United States" } } });

	eleventyConfig.addPlugin(activityPubPlugin, { domain: 'mike.helmers.me', username: 'mike', displayName: 'Michael Helmers', summary: 'This is my Eleventy website, now discoverable on the Fediverse!'});

	// Registering a collection named "notes"
    eleventyConfig.addCollection("notes", function(collectionApi) {
        return collectionApi.getFilteredByGlob("./content/notes/*.md");
    });
	// Registering a collection named "garden"
    eleventyConfig.addCollection("garden", function(collectionApi) {
        return collectionApi.getFilteredByGlob("./content/garden/**/*.md");
    });
	// Registering a collection named "allTags"
	eleventyConfig.addCollection("allTags", function(collectionApi) {
		let tagSet = new Set();
		collectionApi.getAll().forEach(item => {
		  (item.data.tags || []).forEach(tag => tagSet.add(tag));
		});
		return [...tagSet];
	  });
	// Registering a collection named "topTags"
    eleventyConfig.addCollection("topTags", function(collection) {
        let tagMap = new Map();
        const excludedTags = new Set(["garden", "seedling", "sprout", "evergreen"]);  // Define tags to exclude

        collection.getAll().forEach(function(item) {
            if ("tags" in item.data && item.data.tags.includes("garden")) {
                let tags = item.data.tags;
                tags.forEach(function(tag) {
                    if (!excludedTags.has(tag)) {  // Check if the tag is not in the excluded list
                        if (tagMap.has(tag)) {
                            tagMap.set(tag, tagMap.get(tag) + 1);
                        } else {
                            tagMap.set(tag, 1);
                        }
                    }
                });
            }
        });

        // Convert to sorted array
        let sortedTags = [...tagMap.entries()].sort((a, b) => b[1] - a[1]);
        return sortedTags.slice(0, 4); // Return top 4 tags
    });



	// interlinker plugin
	eleventyConfig.addPlugin(
		require('@photogabble/eleventy-plugin-interlinker'),
		{
		  defaultLayout: 'layouts/embed.liquid'
		}
	  );
	
	// embed-spotify plugin
	eleventyConfig.addPlugin(embedSpotify);
	

	return { 
		templateFormats: ["md", "njk", "html", "liquid"], 
		markdownTemplateEngine: "njk", 
		htmlTemplateEngine: "njk", 
		dir: { 
		  input: "content", 
		  includes: "../_includes", 
		  data: "../_data", 
		  output: "_static" 
		}, 
		pathPrefix: "/", 
	  };
	};

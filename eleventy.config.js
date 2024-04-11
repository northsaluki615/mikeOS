// Purpose: Configure Eleventy for this project.
const { DateTime } = require("luxon");
const markdownItAnchor = require("markdown-it-anchor");

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

// Export the configuration
module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy({"./public/": "/**/**/", "./node_modules/prismjs/themes/prism-okaidia.css": "/css/prism-okaidia.css"});
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

	eleventyConfig.amendLibrary("md", mdLib => {
		mdLib.use(markdownItAnchor, { permalink: markdownItAnchor.permalink.ariaHidden({ placement: "after", class: "header-anchor", symbol: "#", ariaHidden: false }), level: [1,2,3,4], slugify: eleventyConfig.getFilter("slugify") });
	});

	eleventyConfig.addShortcode("currentBuildDate", () => { return (new Date()).toISOString(); });

	// IndieWeb and ActivityPub plugins
	eleventyConfig.addPlugin(eleventyPluginIndieWeb, { hCard: { name: "Michael Helmers", url: "https://mike.helmers.me", email: "mikehelmers@proton.me", adr: { locality: "Madison", region: "Wisconsin", countryName: "United States" } } });

	eleventyConfig.addPlugin(activityPubPlugin, { domain: 'mike.helmers.me', username: 'mike', displayName: 'Michael Helmers', summary: 'This is my Eleventy website, now discoverable on the Fediverse!', outbox: true, outboxCollection: 'posts' });

	return { templateFormats: ["md", "njk", "html", "liquid"], markdownTemplateEngine: "njk", htmlTemplateEngine: "njk", dir: { input: "content", includes: "../_includes", data: "../_data", output: "_static" }, pathPrefix: "/", };
};

// Convert the configuration file to ESM-compatible syntax
export default async function(eleventyConfig) {
	// Dynamically import necessary modules
	const { DateTime } = await import("luxon");
	const markdownIt = await import("markdown-it");
	const markdownItAnchor = await import("markdown-it-anchor");
	const markdownItTableOfContents = await import("markdown-it-table-of-contents");
	const markdownItTaskCheckbox = await import("markdown-it-task-checkbox");
  
	// Official plugins
	const pluginRss = await import("@11ty/eleventy-plugin-rss");
	const pluginSyntaxHighlight = await import("@11ty/eleventy-plugin-syntaxhighlight");
	const pluginBundle = await import("@11ty/eleventy-plugin-bundle");
	const pluginNavigation = await import("@11ty/eleventy-navigation");
	const { EleventyHtmlBasePlugin } = await import("@11ty/eleventy");
	//const UpgradeHelper = await import("@11ty/eleventy-upgrade-help");
  
	// Custom plugins
	const pluginDrafts = await import("./eleventy.config.drafts.js");
	const pluginImages = await import("./eleventy.config.images.js");
	const eleventyPluginIndieWeb = await import("eleventy-plugin-indieweb");
	const activityPubPlugin = await import("eleventy-plugin-activity-pub");
	const embeds = await import("eleventy-plugin-embed-everything");
  
	// Passthrough copy
	eleventyConfig.addPassthroughCopy({
	  "./public/": "/**/**/",
	  "./node_modules/prismjs/themes/prism-okaidia.css": "/css/prism-okaidia.css"
	});
	eleventyConfig.addPassthroughCopy({"./public/**/*": "/"});
	eleventyConfig.addPassthroughCopy("./src/images/*.svg");
  
	// Watch target
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");
  
	// Add plugins
	eleventyConfig.addPlugin(pluginDrafts.default);
	eleventyConfig.addPlugin(pluginImages.default);
	eleventyConfig.addPlugin(pluginRss.default);
	eleventyConfig.addPlugin(pluginSyntaxHighlight.default, { preAttributes: { tabindex: 0 } });
	eleventyConfig.addPlugin(pluginNavigation.default);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
	eleventyConfig.addPlugin(pluginBundle.default);
	eleventyConfig.addPlugin(embeds.default);
	//eleventyConfig.addPlugin(UpgradeHelper.default);
	
  // Filters

	// Formats a date string into a human-readable format
	eleventyConfig.addFilter("readableDate", (dateStr, format = "dd LLLL yyyy", zone = "utc") => {
		let parsedDate = DateTime.fromISO(dateStr, { zone });
		if (!parsedDate.isValid) parsedDate = DateTime.fromJSDate(new Date(dateStr), { zone });
		return parsedDate.isValid ? parsedDate.toFormat(format) : "Invalid Date";
	});

	// Formats a JavaScript date object into an ISO string
	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
	});

	// Returns the first n items of an array
	eleventyConfig.addFilter("head", (array, n) => {
		if (!Array.isArray(array) || array.length === 0) return [];
		if (n < 0) return array.slice(n);
		return array.slice(0, n);
	});

	// Finds the smallest number in a list
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Extracts unique tags from all items in a collection
	eleventyConfig.addFilter("getAllTags", (collection) => {
		let tagSet = new Set();
		for (let item of collection) {
		(item.data.tags || []).forEach((tag) => tagSet.add(tag));
		}
		return Array.from(tagSet);
	});

	// Filters out predefined tags from a list
	eleventyConfig.addFilter("filterTagList", (tags) => {
		return (tags || []).filter((tag) => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
	});

	// Filters a collection by a specific tag
	eleventyConfig.addFilter("filterByTag", (collection, tag) => {
		return collection.filter((item) => {
		return (item.data.tags || []).includes(tag);
		});
	});

	// Formats a date using toLocaleDateString
	eleventyConfig.addFilter("date", (date, format) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(date).toLocaleDateString("en-US", options);
	});

								
  
	// Add filters and shortcodes as needed (no change required for these)
  
	// Markdown-it configuration
	let markdownLib = markdownIt.default({
	  html: true,
	  linkify: true,
	  typographer: true
	})
	  .use(markdownItTaskCheckbox.default, {
		disabled: false,
		divWrap: true,
		divClass: "checkbox",
		idPrefix: "cbx_",
		ulClass: "task-list",
		liClass: "task-list-item"
	  })
	  .use(markdownItTableOfContents.default)
	  .use(markdownItAnchor.default, {
		permalink: markdownItAnchor.default.permalink.ariaHidden({
		  placement: "after",
		  class: "header-anchor",
		  symbol: "#",
		  ariaHidden: false
		}),
		level: [1, 2, 3, 4],
		slugify: eleventyConfig.getFilter("slugify")
	  });
	eleventyConfig.setLibrary("md", markdownLib);
  
	// Return Eleventy configuration
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
	  pathPrefix: "/"
	};
  }
  
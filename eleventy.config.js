const { DateTime } = require("luxon");
const markdownItAnchor = require("markdown-it-anchor");

const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const pluginNavigation = require("@11ty/eleventy-navigation");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

const pluginDrafts = require("./eleventy.config.drafts.js");
const pluginImages = require("./eleventy.config.images.js");

const eleventyPluginIndieWeb = require("eleventy-plugin-indieweb");
const activityPubPlugin = require('eleventy-plugin-activity-pub');
const pluginInlineLinkFavicon = require("eleventy-plugin-inline-link-favicon");
const fs = require("fs");
const path = require("path");
const markdownIt = require("markdown-it");
const wikiLinks = require("markdown-it-wikilinks")({
    baseURL: "/wiki/",
    makeAllLinksAbsolute: true,
    postProcessPageName: (pageName) => {
        return pageName.split('/').map(part => encodeURIComponent(part.trim().toLowerCase().replace(/\s+/g, '-'))).join('/');
    }
});

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({
        "./public/": "/**/**/",
        "./node_modules/prismjs/themes/prism-okaidia.css": "/css/prism-okaidia.css"
    });

    eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");

    eleventyConfig.addPlugin(pluginDrafts);
    eleventyConfig.addPlugin(pluginImages);
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(pluginSyntaxHighlight, {
        preAttributes: { tabindex: 0 }
    });
    eleventyConfig.addPlugin(pluginNavigation);
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    eleventyConfig.addPlugin(pluginBundle);

    eleventyConfig.addFilter("readableDate", (dateStr, format = "dd LLLL yyyy", zone = "utc") => {
        let parsedDate = DateTime.fromISO(dateStr, { zone });
        if (!parsedDate.isValid) {
            parsedDate = DateTime.fromJSDate(new Date(dateStr), { zone });
        }
        if (parsedDate.isValid) {
            return parsedDate.toFormat(format);
        } else {
            console.error(`Invalid date string: ${dateStr}`);
            return "Invalid Date";
        }
    });

    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
    });

    eleventyConfig.addFilter("head", (array, n) => {
        if (!Array.isArray(array) || array.length === 0) {
            return [];
        }
        if (n < 0) {
            return array.slice(n);
        }
        return array.slice(0, n);
    });

    eleventyConfig.addFilter("min", (...numbers) => {
        return Math.min.apply(null, numbers);
    });

    eleventyConfig.addFilter("getAllTags", collection => {
        let tagSet = new Set();
        for (let item of collection) {
            (item.data.tags || []).forEach(tag => tagSet.add(tag));
        }
        return Array.from(tagSet);
    });

    eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
        return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
    });

    eleventyConfig.amendLibrary("md", mdLib => {
        mdLib.use(markdownItAnchor, {
            permalink: markdownItAnchor.permalink.ariaHidden({
                placement: "after",
                class: "header-anchor",
                symbol: "#",
                ariaHidden: false,
            }),
            level: [1, 2, 3, 4],
            slugify: eleventyConfig.getFilter("slugify")
        });
    });

    eleventyConfig.addShortcode("currentBuildDate", () => {
        return (new Date()).toISOString();
    });

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
    eleventyConfig.addPlugin(pluginInlineLinkFavicon);

    eleventyConfig.addFilter("filterPostsByTag", function (posts, tag) {
        return posts.filter(post => post.data.tags && post.data.tags.includes(tag)).slice(0, 3);
    });

    const wikiDir = 'content/wiki/';
    fs.readdirSync(wikiDir, { withFileTypes: true }).forEach(dir => {
        if (dir.isDirectory()) {
            const dirName = dir.name;
            eleventyConfig.addCollection(dirName, function (collectionApi) {
                return collectionApi.getFilteredByGlob(path.join(wikiDir, dirName, "*.md"));
            });
        }
    });

    eleventyConfig.addCollection("wikiTopics", function (collectionApi) {
        let topics = [];
        if (fs.existsSync(wikiDir)) {
            const items = fs.readdirSync(wikiDir, { withFileTypes: true });
            topics = items.filter(item => item.isDirectory()).map(dir => dir.name);
        }
        return topics;
    });

    eleventyConfig.addCollection("allTags", function (collectionApi) {
        let tagSet = new Set();
        collectionApi.getAll().forEach(item => {
            if ("tags" in item.data) {
                let tags = item.data.tags;
                tags.forEach(tag => tagSet.add(tag));
            }
        });
        return [...tagSet];
    });

    eleventyConfig.addFilter("filterByTag", (collection, tagName) => {
        return collection.filter(item => {
            return (item.data.tags || []).includes(tagName);
        });
    });

    let options = {
        html: true,
        linkify: true,
        typographer: true,
    };

    let markdownLib = markdownIt(options)
        .use(markdownItAnchor)
        .use(wikiLinks);

    eleventyConfig.setLibrary("md", markdownLib);

    return {
        templateFormats: [
            "md",
            "njk",
            "html",
            "liquid",
        ],
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

---
title: Eleventy
updated: 2024-04-09
created: 2024-04-09
description: 
tags:
  - staticwebsite
---
# [Eleventy](https://www.11ty.dev) 

**Theme:** 

https://lyz-code.github.io/mkdocs-newsletter/
https://11ty.rocks

### Updating

## Plugins
- [Official](https://www.11ty.dev/docs/plugins/official/)
- [Community](https://www.11ty.dev/docs/plugins/community/)
### eleventy-plugin-indieweb
```js
const eleventyPluginIndieWeb = require("eleventy-plugin-indieweb");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(eleventyPluginIndieWeb, {
    hCard: {
      name: "Michael Helmers",
      url: "https://mike.helmers.me",
      photo: "https://yourwebsite.com/photo.jpg",
      role: "Infosec",
      email: "mikehelmers@proton.me",
      telephone: "+16189672089",
      address: {
        locality: "Madison",
        region: "Wisconsin",
        countryName: "United States"
      }
    }
  });
};

```

```shell
npm install eleventy-plugin-indieweb
```

### Eleventy-Plugin-Activity-Pub

```js
const activityPubPlugin = require('eleventy-plugin-activity-pub');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(activityPubPlugin, {
    domain: 'mike.helmers.me',
    username: 'mike',
    displayName: 'Michael Helmers',
    summary: 'This is my Eleventy website, now discoverable on the Fediverse!',
  });
};
```

```js
npm install eleventy-plugin-activity-pub
```
### eleventy-plugin-inline-link-favicon
```js
```js
const pluginInlineLinkFavicon = require("eleventy-plugin-inline-link-favicon")

module.exports = (eleventyConfig) => {
	eleventyConfig.addPlugin(pluginInlineLinkFavicon)
}
```

```js
npm install eleventy-plugin-inline-link-favicon
```
## Implementing IndieWeb

- incoming webmentions,
- outgoing webmentions,
- syndication to other platforms,
- a microblog that includes notes, likes, replies, RSVPs, etc.,
- building a Micropub client on the side,
- marking up everything with microformats2,
- maintaining several microformats2 feeds.
- https://www.npmjs.com/package/eleventy-plugin-indieweb
- https://www.npmjs.com/package/eleventy-plugin-webmentions

## ActivityPub Implementation
- https://github.com/LewisDaleUK/eleventy-plugin-activity-pub


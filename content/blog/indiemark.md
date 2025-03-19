---
title: IndieMark
date: 2024-06-10
updated: 2024-06-10
description: An indie-web progress bar
tags:
  - seedling
  - indieweb
---
# IndieMark 

From [indieweb.org](https://https://indieweb.org/IndieMark)
>**IndieMark** is an in-progress developer guide that organizes IndieWeb features into related clusters based on implementation trends within the community. Features that build on other features are ordered accordingly within clusters to provide developers with a step-by-step approach to incrementally implementing & integrating these features into their sites.

So, what does this mean for me? This is a DIY progress tracker for my DIY [[eleventy]] site.
## Current Status

## IndieMark Levels Checklist
### Level 1: Basic Identity
- [ ] **Domain**
  - [ ] Register a personal domain.
  - [ ] Configure DNS settings.
- [ ] **URL**
  - [ ] Set up hosting for your website.
  - [ ] Point your domain to your website.
- [ ] **Homepage**
  - [ ] Design a homepage.
  - [ ] Ensure the homepage is accessible at your domain.
- [ ] **Contact Information**
  - [ ] Add an email address.
  - [ ] Add links to social media profiles.
  - [ ] Include a contact form (optional).
### Level 2: Author and Identity
- [ ] **Author Page**
  - [ ] Create a page with your biography.
  - [ ] Add a photo of yourself.
- [ ] **h-card**
  - [ ] Mark up your author page with `h-card` microformat.
  - [ ] Validate the h-card with a microformat validator.
- [ ] **Profile URLs**
  - [ ] Add links to your profiles on other sites (e.g., LinkedIn, Twitter).
  - [ ] Ensure these links are marked up with `u-url`.
### Level 3: Social and Interaction
- [ ] **Replies**
  - [ ] Set up a section for replies on your site.
  - [ ] Publish at least one reply to another post.
- [ ] **Webmentions**
  - [ ] Install or configure a webmention plugin or script.
  - [ ] Test sending a webmention to another site.
  - [ ] Test receiving a webmention from another site.
- [ ] **Backfeed**
  - [ ] Display received webmentions on your posts.
  - [ ] Style the webmentions display to match your site design.
### Level 4: Publishing and Syndication
- [ ] **Blog Posts**
  - [ ] Write and publish a blog post.
  - [ ] Set up a blog post template.
- [ ] **Permalinks**
  - [ ] Configure permanent URLs (permalinks) for your posts.
  - [ ] Test permalinks to ensure they work.
- [ ] **RSS/Atom Feeds**
  - [ ] Generate an RSS or Atom feed for your posts.
  - [ ] Validate the feed with a feed validator.
- [ ] **POSSE**
  - [ ] Set up syndication to at least one social media platform (e.g., Twitter, Facebook).
  - [ ] Include syndication links back to your original post.
- [ ] **Syndication Links**
  - [ ] Ensure syndicated copies link back to the original posts on your site.
  - [ ] Validate that these links are marked up with `rel="syndication"`.
### Level 5: Advanced Features
- [ ] **Micropub**
  - [ ] Install a Micropub endpoint on your site.
  - [ ] Test publishing a post via a Micropub client.
- [ ] **WebSub**
  - [ ] Implement WebSub support on your site.
  - [ ] Test WebSub by subscribing and receiving updates.
- [ ] **IndieAuth**
  - [ ] Set up IndieAuth for your site.
  - [ ] Test logging in with IndieAuth.
- [ ] **PESOS**
  - [ ] Enable PESOS support to accept content from other platforms.
  - [ ] Test importing content from at least one platform (e.g., Instagram, Twitter).
### Level 6: Full IndieWeb Integration
- [ ] **Webmention**
  - [ ] Ensure webmention support for all types of content (e.g., posts, comments).
  - [ ] Test sending and receiving webmentions for various content types.
- [ ] **Microformats**
  - [ ] Mark up all posts with appropriate microformats (e.g., `h-entry`, `h-card`).
  - [ ] Validate microformats with a microformat validator.
- [ ] **Notifications**
  - [ ] Implement notifications for interactions (e.g., mentions, replies).
  - [ ] Test notifications to ensure they are delivered and displayed correctly.
- [ ] **Federation**
  - [ ] Integrate with other IndieWeb-compatible sites for cross-site interactions.
  - [ ] Test cross-site interactions to ensure they work seamlessly.

---
title: 🍃 My Digital Garden
date: 2021-09-26
updated: 2021-09-26
description: 
tags:
  - indieweb
  - digital-garden
  - eleventy
  - static-site
  - self-hosted
  - life
---
# 🍃 Personal Site

**Domain:** [mike.helmers.me](https://mike.helmers.me)
**Host:** [Digital Ocean](https://digitalocean.com)
**Platform:** [[eleventy]]
## [[indieweb]]

## Digital Garden
- https://www.mentalnodes.com/a-gardening-guide-for-your-mind
- https://github.com/maggieappleton/digital-gardeners
- https://tomcritchlow.com/
- https://www.reddit.com/r/DigitalGardens/comments/17jw00y/from_jason_my_custom_digital_garden_in_11ty/
- https://www.fromjason.xyz/
- https://maggieappleton.com/garden-history
- https://www.swyx.io/digital-garden-tos
- https://photogabble.co.uk
## Fonts
- https://fonts.google.com/specimen/Protest+Revolution?stroke=Sans+Serif&selected=Material+Symbols+Outlined:favorite:FILL@0;wght@400;GRAD@0;opsz@24
- https://fonts.google.com/specimen/Share+Tech?query=tech&stroke=Sans+Serif&selected=Material+Symbols+Outlined:favorite:FILL@0;wght@400;GRAD@0;opsz@24

## Needs
- [ ] Update from phone 
- [x] Static Site
- [ ] Activity pub
- [ ] indie web 
- [x] Markdown support 
- [x] Double-bracket links ()
- Displays backlinks
- hovercards for backlinks

## Build components
A header such as a navigation bar.
Design of the header
Options are available on the header
Footer
Design of the footer
Options are available on the footer
The design of the main content
https://dev.to/lambdatest/a-beginners-guide-to-static-site-generator-1epm
### Base Template
Written in the Nunjucks templating engine
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
       {% block title %} {% endblock %}
    </head>
    <body>
        <header>
            {% block header %}
                <script src = “myJS”></script>
    <link src = “myCSS”>
            {% endblock %}
        </header>
<body>
        <div id="container">

{% block content %}
{% endblock %}
</div>      
    <div id = “footer”>
            {% block footer %}
            {% endblock %}
        </div>
    </body>
</html>
```

## Ideas
Can I post my Facebook content ontoy own website? Like, a historical archive?
https://www.swyx.io/digital-garden-tos

## Terminology 
From: https://maggieappleton.com/garden-history
    🌱 Seedlings for very rough and early ideas
    🌿 Budding for work I've cleaned up and clarified
    🌳 Evergreen for work that is reasonably complete (though I still tend these over time).
s I planted and last tended
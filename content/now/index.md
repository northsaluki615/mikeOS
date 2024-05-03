---
layout: layouts/now.njk
eleventyNavigation:
  key: 📌 Now
  order: 3
---

# Mike Now

Here's what I'm up to right now.

## 📚 Currently Reading 📚

<section class="activity-section reading-list">
  <div class="books-grid">
    {% for item in readinglist %}
      {% set currentStatus = item.events | last %}
      {% if "started reading" in currentStatus.status %}
        <div class="book">
          <img src="{{ item.book.cover }}" alt="Cover of {{ item.book.title }}">
          <div class="book-info">
            <h3>{{ item.book.title }}</h3>
            <p>Authors: {{ item.book.authors.join(", ") }}</p>
            <p>Published: {{ item.book.publishedDate | date("MMMM dd, yyyy") }}</p>
          </div>
        </div>
      {% endif %}
    {% else %}
      <p>I'm between books right now, check back later!</p>
    {% endfor %}
  </div>
</section>

## 🎧 Listening 🎧

Currently vibing to Gary Clark Jr. You can listen along here:

https://open.spotify.com/embed/album/09XurHGqbBgvj7SH96UbPV

## 📺 Watching 📺

Binge-watching **The Mandalorian** on Disney+. Absolutely love the Star Wars universe! More details [here](#).

## 🍻 Drinking 🍻

Exploring the world of craft beers. The [Local Craft IPA](#) has been a recent favorite.

## 🎮 Playing 🎮

Hooked on [Helldivers](#) lately. The art and gameplay are top-notch.

## 🛜 WiGLE 🛜

<img border="0" src="https://wigle.net/bi/DCvuUkQ2MgkDGpCEUm_7ow.png">

---
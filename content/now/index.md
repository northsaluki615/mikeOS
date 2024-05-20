---
layout: layouts/base.njk
eleventyNavigation:
  key: 📌 now
  order: 4
---

# mike now

Here's what I'm up to right now.

## 📚 currently reading 📚

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
            <p>Current Status: {{ currentStatus.status }} on {{ currentStatus.date | date("MMMM dd, yyyy") }}</p>
          </div>
        </div>
      {% endif %}
    {% else %}
      <p>I'm between books right now, check back later!</p>
    {% endfor %}
  </div>
</section>

## 🎧 listening 🎧

Currently vibing to Gary Clark Jr. You can listen along here:

https://open.spotify.com/embed/album/09XurHGqbBgvj7SH96UbPV

## 📺 watching 📺

Binge-watching **The Mandalorian** on Disney+. Absolutely love the Star Wars universe! More details [here](#).

## 🍻 drinking 🍻

Exploring the world of craft beers. The [Local Craft IPA](#) has been a recent favorite.

## 🎮 playing 🎮

Hooked on [Helldivers](#) lately. The art and gameplay are top-notch.

## 🛜 WiGLE 🛜

<img border="0" src="https://wigle.net/bi/DCvuUkQ2MgkDGpCEUm_7ow.png">

---
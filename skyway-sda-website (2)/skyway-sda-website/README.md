# Skyway Seventh-day Adventist Church — Website

A multipage site inspired by structure (sticky nav with
a "More" dropdown, card-grid sections, consistent footer), built specifically
for Skyway SDA Church.

## What's new in this revision
- **Fixed a real bug**: the header and footer had a mismatched `id`/`class`, so the
  header wasn't actually sticky and the footer wasn't rendering its background —
  this is also why the "More" dropdown could appear to not show (it was rendering
  underneath the hero image). Both are fixed now.
- **Sticky-hide/reveal header**: the header hides as you scroll down and reappears
  instantly the moment you scroll up.
- **Footer is now a clear blue gradient.**
- **Horizontal-scroll listings now use arrow buttons** (left/right) instead of a
  visible scrollbar — added automatically by `js/site.js` to every `.dept-grid`,
  `.card-grid`, and `.quicklinks` element, so no page markup had to change.
- **Every page opens with an italicized, centered scripture quote** just below the
  header. Quotes are chosen by page type — edit the `QUOTES` object near the top
  of `js/site.js` to change any of them.
- **Sabbath Worship** (`sabbath-worship.html`) and **Sabbath School**
  (`departments/sabbath-school.html`) are now real linked pages from the homepage's
  "Community Under Open Sky" section. Sabbath School also has a new "Study Guides"
  section — edit the `study_guides` array for the `sabbath-school` entry in
  `data/departments.json`, then re-run `generate_departments.py`.

## How to view it
Double-click `index.html` to open it in any browser — no install needed.
(For the smoothest experience, especially the mobile menu, host it — see below.)

## Pages included
- `index.html` — Home, with the centered hero ("Welcome to Our Nature Sabbath")
- `announcements.html`, `study-materials.html`, `events.html`
- `contact-us.html` — general contact page (address, phone, email, message form)
- `bible-study.html` — "Got Questions?" page: a horizontal-scroll list of topical study
  answers, plus a dedicated Bible-study request form (name, phone, email, message)
- `location.html` — short welcome message + embedded Google Map + Get Directions button
- `we-believe.html`
- `departments/index.html` — overview grid of all 28 departments
- `departments/*.html` — one page per department (28 total)
- Sub-ministry pages for Youth Ministries, Community Services, and Sabbath School Branch
  (see the Departments section below)

## Horizontal-scroll listings
Departments, Announcements, Events, Study Materials, and the homepage's quick-nav
cards all scroll horizontally (drag or swipe, like a carousel) rather than wrapping
into rows — matching the amazingdiscoveries.org browsing style. This is controlled
by the `.dept-grid`, `.card-grid`, and `.quicklinks` CSS classes in `css/styles.css`,
so it's consistent everywhere those classes are used. The one exception, as
requested, is the nav bar itself — the "More" dropdown list stays vertical.

## The logo
`assets/images/sda-logo.png` is the official Seventh-day Adventist Church logo you
provided. It's referenced by `js/site.js` (search for `LOGO_IMG`), so it appears in
both the header and footer automatically — replace the file to change it everywhere.

## Is the text editable?
Yes — every word on every page is plain text inside `.html` files, so anything can
be changed by opening a file in a text editor and typing over it. Text marked
`data-editable` in the code is a hint for the most obviously "fill this in" spots
(hero headline, welcome paragraphs, addresses), but nothing is locked — you (or I)
can edit any heading, paragraph, button label, or link on any page.


## Rebuilding the department pages
All 28 departments (and their sub-pages) are generated from one file:
`data/departments.json`. To change a department's name, intro, leaders,
resources, or add/remove a sub-page, edit that JSON file, then re-run:
```
python3 generate_departments.py
```
from inside this folder. This regenerates every department page AND the
homepage's department grid automatically, so you never have to hand-edit
28 files one by one. (Requires Python 3 — no other setup needed.)

## What's a placeholder vs. real content
Anything in `[brackets]` (address, phone, leader names, dates) or labeled
"Photo & name placeholder" is a placeholder — search each file for `[` to find
them quickly, or open the site and look for the dashed "placeholder" styling.

## Editing text
Open any `.html` file in a text editor and change the words directly.
The hero heading and subheading are near the top of `index.html`, marked
with `data-editable`.

## Adding your own background images
1. Put your image file in a new `assets/images/` folder.
2. In `index.html`, find:
   `<section class="hero" style="--hero-bg:none;">`
   and change it to:
   `<section class="hero" style="--hero-bg:url('assets/images/your-photo.jpg');">`
3. Department banners work the same way — each department page has:
   `style="--banner-bg:linear-gradient(...)"` on the `.category-banner` section.
   Replace the gradient with `url('../assets/images/your-photo.jpg')` (note the
   `../` since department pages sit one folder deeper).

## Adding real leadership photos
In any `departments/*.html` file, find a block like:
```html
<div class="leader-avatar" aria-hidden="true">LN</div>
```
Replace it with:
```html
<img class="leader-avatar" style="object-fit:cover;" src="../assets/images/leader-name.jpg" alt="Leader Name">
```

## Updating the church address/phone/email
These appear in two places: `contact-us.html` and the footer (which is
generated by `js/site.js` — search that file for `[Street Address]`,
`[Phone number]`, and the Google Maps query string near the top of the
`footer HTML` function).

## Adding a real logo
The current logo is a simple cross icon drawn in `js/site.js` (search for
`CROSS_ICON`). Replace the `<svg>` markup there, or swap `.brand-logo` in
`css/styles.css` to display an `<img>` instead.

## Navigation structure
- Top nav: Announcements, Study Materials, Events, Departments, More
- "More" dropdown: Study Materials, Events, Contact Us, We Believe
- Footer: Location (Google Maps), We Believe, Contact Us, Study Materials,
  plus church office details and social links

## Hosting it for real
Any static host works, since there's no server-side code:
- Netlify / Vercel: drag-and-drop this folder
- GitHub Pages: push this folder to a repo and enable Pages

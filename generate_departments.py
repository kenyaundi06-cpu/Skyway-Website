import json, os, re

BASE = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(BASE, "data", "departments.json"), encoding="utf-8") as f:
    depts = json.load(f)

OUT_DIR = os.path.join(BASE, "departments")
os.makedirs(OUT_DIR, exist_ok=True)

def initials(name):
    clean = name.replace("[", "").replace("]", "")
    parts = [p for p in clean.split() if p]
    return "".join(p[0].upper() for p in parts[:2]) if parts else "LN"

def leader_cards_html(leaders):
    return "\n        ".join(
        f'''<div class="leader-card">
          <div class="leader-avatar" aria-hidden="true">{initials(l["name"])}</div>
          <h4>{l["name"]}</h4>
          <p class="leader-role">{l["role"]}</p>
          <p class="leader-placeholder-tag">Photo &amp; name placeholder</p>
        </div>''' for l in leaders
    )

def resource_items_html(resources):
    return "\n        ".join(
        f'''<a class="resource-item" href="{r["href"]}">
          <span class="r-title">{r["title"]}</span>
          <span class="r-arrow">Open →</span>
        </a>''' for r in resources
    )

def dept_card_html(d, filename):
    return f'''<a class="dept-card" style="--card-bg:{d["gradient"]}" href="{filename}">
        <span>{d["short"]}</span>
      </a>'''

all_slugs = [d["slug"] for d in depts]

OTHER_DEPTS_BLOCK = '''
  <section class="section section-tint">
    <div class="container">
      <div class="section-head center" style="margin-left:auto;margin-right:auto;">
        <span class="kicker">Explore More</span>
        <h2>Visit Another Department</h2>
        <p>Skyway SDA Church is served by twenty-eight ministry departments — take a look at what else is happening.</p>
      </div>
      <div class="dept-grid">
        {other_dept_cards}
      </div>
    </div>
  </section>
'''

PARENT_TEMPLATE = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{name} — Skyway Seventh-day Adventist Church</title>
<meta name="description" content="{intro_escaped}">
<link rel="stylesheet" href="../css/styles.css">
</head>
<body data-root=".." data-page="departments">

<div id="site-header"></div>

<section class="category-banner" style="--banner-bg:{gradient}">
  <div class="container">
    <p class="breadcrumb"><a href="index.html">Departments</a> &nbsp;/&nbsp; {name}</p>
    <h1>{name}</h1>
    <p>{intro}</p>
  </div>
</section>

<main>
  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="kicker">Meet the Team</span>
        <h2>{name} Leadership</h2>
        <p>The volunteers and leaders who serve this ministry. Photos below are placeholders — swap in real photos any time.</p>
      </div>
      <div class="leader-grid">
        {leader_cards}
      </div>
    </div>
  </section>
{subpages_block}
{study_guides_block}
  <section class="section section-tint">
    <div class="container">
      <div class="section-head">
        <span class="kicker">Get Involved</span>
        <h2>Resources &amp; Links</h2>
        <p>Helpful links related to {name_lower}. Replace these placeholder links with your department's real pages, forms, or sign-ups.</p>
      </div>
      <div class="resource-list">
        {resource_items}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="cta-banner">
        <div>
          <h2>Want to serve with {short}?</h2>
          <p>We're always glad to welcome new hands and hearts into ministry. Reach out and we'll help you find your place.</p>
        </div>
        <a class="btn btn-primary" href="../contact-us.html">Contact This Department</a>
      </div>
    </div>
  </section>
{other_depts_block}
</main>

<div id="site-footer"></div>
<script src="../js/site.js"></script>
</body>
</html>
'''

SUBPAGE_TEMPLATE = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{name} — {parent_name} — Skyway Seventh-day Adventist Church</title>
<meta name="description" content="{intro_escaped}">
<link rel="stylesheet" href="../css/styles.css">
</head>
<body data-root=".." data-page="departments">

<div id="site-header"></div>

<section class="category-banner" style="--banner-bg:{gradient}">
  <div class="container">
    <p class="breadcrumb"><a href="index.html">Departments</a> &nbsp;/&nbsp; <a href="{parent_filename}">{parent_name}</a> &nbsp;/&nbsp; {name}</p>
    <h1>{name}</h1>
    <p>{intro}</p>
  </div>
</section>

<main>
  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="kicker">Meet the Team</span>
        <h2>{name} Leadership</h2>
        <p>The volunteers and leaders who serve this ministry. Photos below are placeholders — swap in real photos any time.</p>
      </div>
      <div class="leader-grid">
        {leader_cards}
      </div>
    </div>
  </section>

  <section class="section section-tint">
    <div class="container">
      <div class="cta-banner">
        <div>
          <h2>Part of {parent_name}</h2>
          <p>{name} is one of the ministries under {parent_name}. Explore the rest of the family, or get in touch to serve.</p>
        </div>
        <a class="btn btn-primary" href="{parent_filename}">Back to {parent_name}</a>
      </div>
    </div>
  </section>
{other_depts_block}
</main>

<div id="site-footer"></div>
<script src="../js/site.js"></script>
</body>
</html>
'''

def build_other_depts_block(current_slug):
    cards = "\n        ".join(
        dept_card_html(o, f'{o["slug"]}.html') for o in depts if o["slug"] != current_slug
    )
    return OTHER_DEPTS_BLOCK.format(other_dept_cards=cards)

for d in depts:
    filename = f'{d["slug"]}.html'
    subpages = d.get("subpages", [])
    study_guides = d.get("study_guides", [])

    subpages_block = ""
    if subpages:
        sub_cards = "\n        ".join(
            f'''<a class="dept-card" style="--card-bg:{d["gradient"]}" href="{d["slug"]}-{s["slug"]}.html">
          <span>{s["name"]}</span>
        </a>''' for s in subpages
        )
        subpages_block = f'''
  <section class="section section-tint">
    <div class="container">
      <div class="section-head">
        <span class="kicker">{d.get("subgroup_label","Sub-Ministries")}</span>
        <h2>Explore Our Sub-Ministries</h2>
        <p>{d["name"]} includes the following ministries — each with its own leadership team.</p>
      </div>
      <div class="dept-grid">
        {sub_cards}
      </div>
    </div>
  </section>
'''

    study_guides_block = ""
    if study_guides:
        guide_cards = "\n        ".join(
            f'''<article class="info-card">
          <div class="card-media"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/></svg></div>
          <div class="card-body">
            <span class="tag">{g["tag"]}</span>
            <h3>{g["title"]}</h3>
            <p>{g["blurb"]}</p>
            <span class="card-cta">Open Guide →</span>
          </div>
        </article>''' for g in study_guides
        )
        study_guides_block = f'''
  <section class="section">
    <div class="container">
      <div class="section-head">
        <span class="kicker">Study Guides</span>
        <h2>Lesson Guides &amp; Resources</h2>
        <p>Scroll through this quarter's guides and past resources. Replace these placeholder links with your real study guides.</p>
      </div>
      <div class="card-grid">
        {guide_cards}
      </div>
    </div>
  </section>
'''


    html = PARENT_TEMPLATE.format(
        name=d["name"], name_lower=d["name"].lower(), short=d["short"],
        intro=d["intro"], intro_escaped=d["intro"].replace('"', "'"),
        gradient=d["gradient"], leader_cards=leader_cards_html(d["leaders"]),
        subpages_block=subpages_block,
        study_guides_block=study_guides_block,
        resource_items=resource_items_html(d["resources"]),
        other_depts_block=build_other_depts_block(d["slug"]),
    )
    with open(os.path.join(OUT_DIR, filename), "w", encoding="utf-8") as f:
        f.write(html)

    # Generate sub-pages
    for s in subpages:
        sub_filename = f'{d["slug"]}-{s["slug"]}.html'
        sub_html = SUBPAGE_TEMPLATE.format(
            name=s["name"], parent_name=d["name"], parent_filename=filename,
            intro=s["intro"], intro_escaped=s["intro"].replace('"', "'"),
            gradient=d["gradient"], leader_cards=leader_cards_html(s["leaders"]),
            other_depts_block=build_other_depts_block(d["slug"]),
        )
        with open(os.path.join(OUT_DIR, sub_filename), "w", encoding="utf-8") as f:
            f.write(sub_html)

# ---- Departments overview page -------------------------------------------
overview_cards = "\n      ".join(dept_card_html(d, f'{d["slug"]}.html') for d in depts)

overview_html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Departments — Skyway Seventh-day Adventist Church</title>
<meta name="description" content="Explore all twenty-eight ministry departments at Skyway Seventh-day Adventist Church.">
<link rel="stylesheet" href="../css/styles.css">
</head>
<body data-root=".." data-page="departments">

<div id="site-header"></div>

<section class="category-banner" style="--banner-bg:linear-gradient(150deg,#8FD3F4 0%, #123F63 100%)">
  <div class="container">
    <p class="breadcrumb"><a href="../index.html">Home</a> &nbsp;/&nbsp; Departments</p>
    <h1>Our Departments</h1>
    <p>Twenty-eight ministry departments serve our congregation and community. Tap any department to meet its leaders, see resources, and find out how to get involved.</p>
  </div>
</section>

<main>
  <section class="section">
    <div class="container">
      <div class="dept-grid">
      {overview_cards}
      </div>
    </div>
  </section>

  <section class="section section-tint">
    <div class="container">
      <div class="cta-banner">
        <div>
          <h2>Not sure where you fit?</h2>
          <p>Reach out and we'll help match your gifts and passions with a ministry team at Skyway.</p>
        </div>
        <a class="btn btn-primary" href="../contact-us.html">Contact Us</a>
      </div>
    </div>
  </section>
</main>

<div id="site-footer"></div>
<script src="../js/site.js"></script>
</body>
</html>
'''
with open(os.path.join(OUT_DIR, "index.html"), "w", encoding="utf-8") as f:
    f.write(overview_html)

# ---- Inject the homepage department grid ----------------------------------
home_cards = "\n        ".join(dept_card_html(d, f'departments/{d["slug"]}.html') for d in depts)
home_path = os.path.join(BASE, "index.html")
with open(home_path, encoding="utf-8") as f:
    home_html = f.read()

new_home_html = re.sub(
    r'(<!-- DEPT_GRID_START -->)(.*?)(<!-- DEPT_GRID_END -->)',
    lambda m: m.group(1) + "\n        " + home_cards + "\n        " + m.group(3),
    home_html, flags=re.DOTALL
)
with open(home_path, "w", encoding="utf-8") as f:
    f.write(new_home_html)

print(f"Generated {len(depts)} department pages, {sum(len(d.get('subpages',[])) for d in depts)} sub-pages, overview page, and updated homepage grid.")

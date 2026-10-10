#!/usr/bin/env python3
"""Create a new blog post or project page and add its card to home.html.

Run from anywhere:  python3 new_post.py
"""
import html
import re
import shutil
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent
HOME = ROOT / "home.html"
IMAGES = ROOT / "images"

PROJECT_SECTIONS = {
    "coding": "coding-project-view",
    "music": "music-project-view",
    "design": "design-project-view",
    "3d": "3d-project-view",
}

NAVBAR = """<img src="/counter/counter.php" style="display: none;">
  <div id="navbar">
    <a href="/home.html"> <img src="/images/Logo.png"></a>
    <span>Marius Schueller</span>
    <ul>
      <li><a href="/home.html">Home</a></li>
    </ul>
  </div>"""


# ---------- input helpers ----------

def ask(prompt, default=None, required=True):
    suffix = f" [{default}]" if default else ""
    while True:
        value = input(f"{prompt}{suffix}: ").strip()
        if not value and default is not None:
            return default
        if value or not required:
            return value
        print("  (required)")


def ask_choice(prompt, choices):
    while True:
        value = input(f"{prompt} ({'/'.join(choices)}): ").strip().lower()
        if value in choices:
            return value
        print(f"  pick one of: {', '.join(choices)}")


def ask_body():
    print("\nType the text. Blank line = new paragraph, '## Heading' = section heading,")
    print("[link text](https://url) = link. Type END on its own line when done.\n")
    lines = []
    while True:
        try:
            line = input()
        except EOFError:
            break
        if line.strip() == "END":
            break
        lines.append(line)
    return "\n".join(lines).strip()


def ask_photo():
    while True:
        raw = input("\nPhoto path (drag the file in, or leave blank for none): ").strip()
        if not raw:
            return None
        # Terminals wrap dragged paths in quotes or escape spaces.
        raw = raw.strip("'\"").replace("\\ ", " ")
        src = Path(raw).expanduser()
        if src.is_file():
            return src
        print(f"  not found: {src}")


# ---------- text -> html ----------

def inline(text):
    text = html.escape(text, quote=False)
    return re.sub(
        r"\[([^\]]+)\]\((https?://[^)\s]+)\)",
        r'<a href="\2" target="_blank">\1</a>',
        text,
    )


def paragraphs(body):
    """Split body into blocks: ('h', text) for headings, ('p', text) for paragraphs."""
    blocks = []
    for chunk in re.split(r"\n\s*\n", body):
        chunk = chunk.strip()
        if not chunk:
            continue
        lines = chunk.splitlines()
        if lines[0].startswith("## "):
            blocks.append(("h", lines[0][3:].strip()))
            lines = lines[1:]
        if lines:
            blocks.append(("p", " ".join(l.strip() for l in lines)))
    return blocks


def slugify(title):
    return re.sub(r"[^a-z0-9]+", "", title.lower()) or "post"


# ---------- page templates ----------

def blog_page(title, date_str, body, image):
    parts = []
    for kind, text in paragraphs(body):
        if kind == "h":
            parts.append(f"                    <h3>{inline(text)}</h3>")
        else:
            parts.append(f"                    {inline(text)}\n                    <br><br>")
    body_html = "\n".join(parts)
    cover = f"""
            <div class="blog-header">
                <div class="blog-cover">
                    <img src="/images/{image}">
                </div>
            </div>
""" if image else ""
    return f"""<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{html.escape(title)}</title>
    <link rel="stylesheet" href="BlogPageNew.css">
    <link rel="stylesheet" href="/projects.css">
    <link rel="stylesheet" href="/max_button.css">
    <link rel="stylesheet" href="/navbar.css">
    <link rel="stylesheet" href="/font.css">

    <link rel="icon" type="image/x-icon" href="/images/favicon.ico">

</head>

<body>
    {NAVBAR}
    <div class="content">
        <div class="blog-container">
{cover}
            <div class="blog-body">
                <div class="blog-title">
                    <h1><br>{html.escape(title)}</h1>
                </div>
                <p>{date_str}</p>
                <div class="blog-summary">
                    <p>
                    <br>
{body_html}
                    </p>

                    <p>
                        - Marius
                    </p>
                </div>

            </div>
            <div class="footer">
            </div>

        </div>
    </div>
</body>

</html>
"""


def project_page(title, date_str, body, image):
    parts = []
    for kind, text in paragraphs(body):
        if kind == "h":
            parts.append(f"            <h3>{inline(text)}</h3>")
        else:
            parts.append(f'            <p class="card__text">{inline(text)}</p>')
    if image:
        parts.append(f'            <img src="/images/{image}" class="big-media" style="max-width: 80vw;">')
    body_html = "\n".join(parts)
    return f"""<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{html.escape(title)}</title>
  <link rel="stylesheet" href="projectPagesNew.css">
  <link rel="stylesheet" href="/navbar.css">
  <link rel="stylesheet" href="/font.css">
  <link rel="icon" type="image/x-icon" href="/images/favicon.ico">
</head>

<body>
  {NAVBAR}
  <div class="content">

    <li class="cards__item">
      <div class="card">
        <div class="card__content">
          <div class="card__title">{html.escape(title)}</div>
          <div class="description">
{body_html}
          </div>


          <p>Finished: {date_str}</p>

        </div>
      </div>
    </li>
  </div>
</body>

</html>
"""


# ---------- home.html cards ----------

def blog_card(title, date_str, summary, image, link, tag):
    cover = f"""
          <div class="blog-header">
            <div class="blog-cover">
              <img src="/images/{image}">
            </div>
          </div>
""" if image else ""
    return f"""
        <!--Blog Post-->
        <div class="blog-container">{cover}
          <div class="blog-body">
            <div class="blog-title">
              <h1><a href="{link}">{html.escape(title)}</a></h1>
            </div>
            <div class="blog-summary">
              <p>
                {inline(summary)}
              </p>
            </div>
            <p class="read-more"><a href="{link}">Read On</a></p>
          </div>

          <div class="footer">
            <p class="date">{date_str}</p>
            <p class="languages">{html.escape(tag)}</p>
          </div>
        </div>
"""


def project_card(title, date_str, summary, image, link):
    img = f"""
                <img class="card__image" aria-live="polite" src="/images/{image}" alt="{html.escape(title)}"
                  loading="lazy" onload="this.style.animationName = 'reveal'" style="width: 75%; border-radius: 5px;">""" if image else ""
    return f"""
          <!--{html.escape(title)}-->
          <li class="cards__item">
            <div class="card">
              <div class="card__content">
                <div class="card__title">{html.escape(title)}</div>
                <p class="card__date">{date_str}</p>{img}
                <p class="card__text">
                  {inline(summary)}
                </p>
                <a href="{link}" class="learn-more">Learn More</a>
              </div>
            </div>
          </li>
"""


def insert_after(doc, button_id, opener, snippet):
    """Insert snippet right after the first `opener` that follows <button id=button_id>."""
    start = doc.find(f'<button id="{button_id}"')
    if start == -1:
        sys.exit(f"Couldn't find button #{button_id} in home.html")
    pos = doc.find(opener, start)
    if pos == -1:
        sys.exit(f"Couldn't find {opener} inside #{button_id} in home.html")
    pos += len(opener)
    return doc[:pos] + snippet + doc[pos:]


# ---------- main ----------

def main():
    kind = ask_choice("Blog or project?", ["blog", "project"])
    title = ask("Title")
    slug = ask("File name (no .html)", slugify(title))
    folder = ROOT / ("blogs" if kind == "blog" else "projects")
    page = folder / f"{slug}.html"
    if page.exists():
        sys.exit(f"{page.relative_to(ROOT)} already exists, pick another file name.")

    today = date.today()
    date_str = ask("Date", f"{today.month}/{today.day}/{today.year}")
    summary = ask("One-line summary for the home page card")

    if kind == "blog":
        tag = ask("Tag shown on the card (e.g. App, Life, Code)", "Blog")
        sections = []
    else:
        picked = ask(f"Categories besides 'All' ({', '.join(PROJECT_SECTIONS)}; comma-separated)",
                     "coding", required=False)
        sections = [s.strip().lower() for s in picked.split(",") if s.strip()]
        bad = [s for s in sections if s not in PROJECT_SECTIONS]
        if bad:
            sys.exit(f"Unknown category: {', '.join(bad)}")

    body = ask_body()
    photo = ask_photo()

    image_name = None
    if photo:
        image_name = photo.name
        dest = IMAGES / image_name
        if dest.exists() and dest.read_bytes() != photo.read_bytes():
            image_name = f"{slug}{photo.suffix.lower()}"
            dest = IMAGES / image_name
            if dest.exists():
                sys.exit(f"images/{image_name} already exists with different content; rename your photo.")

    link = f"{folder.name}/{slug}.html"
    doc = HOME.read_text(encoding="utf-8")
    if kind == "blog":
        content = blog_page(title, date_str, body, image_name)
        doc = insert_after(doc, "blog-view", '<div class="panel">',
                           blog_card(title, date_str, summary, image_name, link, tag))
    else:
        content = project_page(title, date_str, body, image_name)
        card = project_card(title, date_str, summary, image_name, link)
        for button_id in ["all-project-view"] + [PROJECT_SECTIONS[s] for s in sections]:
            doc = insert_after(doc, button_id, '<ul class="cards">', card)

    # Everything validated; now write.
    if photo and not (IMAGES / image_name).exists():
        shutil.copy2(photo, IMAGES / image_name)
    page.write_text(content, encoding="utf-8")
    HOME.write_text(doc, encoding="utf-8")

    print(f"\nCreated {page.relative_to(ROOT)}")
    if photo:
        print(f"Photo  images/{image_name}")
    print("Added card to home.html")
    print("\nPreview it, then: git add -A && git commit -m \"" + title + "\" && git push")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nCancelled, nothing written.")

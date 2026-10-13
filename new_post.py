#!/usr/bin/env python3
"""Create a new blog post or project page and add its card to home.html.

Run from anywhere:  python3 new_post.py
"""
import html
import re
import shutil
import tkinter as tk
from datetime import date
from pathlib import Path
from tkinter import filedialog, font, messagebox, ttk

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
        raise ValueError(f"Couldn't find button #{button_id} in home.html")
    pos = doc.find(opener, start)
    if pos == -1:
        raise ValueError(f"Couldn't find {opener} inside #{button_id} in home.html")
    pos += len(opener)
    return doc[:pos] + snippet + doc[pos:]


# ---------- create ----------

def create_post(kind, title, slug, date_str, summary, tag, sections, body, photo):
    """Validate, then write the page, photo and home.html card. Raises ValueError on problems."""
    folder = ROOT / ("blogs" if kind == "blog" else "projects")
    page = folder / f"{slug}.html"
    if page.exists():
        raise ValueError(f"{page.relative_to(ROOT)} already exists, pick another file name.")

    image_name = None
    if photo:
        if not photo.is_file():
            raise ValueError(f"Photo not found: {photo}")
        image_name = photo.name
        dest = IMAGES / image_name
        if dest.exists() and dest.read_bytes() != photo.read_bytes():
            image_name = f"{slug}{photo.suffix.lower()}"
            dest = IMAGES / image_name
            if dest.exists():
                raise ValueError(f"images/{image_name} already exists with different content; rename your photo.")

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

    lines = [f"Created {page.relative_to(ROOT)}"]
    if photo:
        lines.append(f"Photo: images/{image_name}")
    lines.append("Added card to home.html")
    return "\n".join(lines)


# ---------- ui ----------

BG = "#f6f7f9"
FG = "#1f2328"
MUTED = "#6b7280"
ACCENT = "#2563eb"
ACCENT_HOVER = "#1d4ed8"
BORDER = "#d0d7de"


class App(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("New Post")
        self.configure(bg=BG)
        self.minsize(620, 640)
        self._style()

        today = date.today()
        self.kind = tk.StringVar(value="blog")
        self.title_var = tk.StringVar()
        self.slug = tk.StringVar()
        self.date = tk.StringVar(value=f"{today.month}/{today.day}/{today.year}")
        self.summary = tk.StringVar()
        self.tag = tk.StringVar(value="Blog")
        self.photo = tk.StringVar()
        self.sections = {name: tk.BooleanVar(value=name == "coding") for name in PROJECT_SECTIONS}
        self.status = tk.StringVar()
        self._auto_slug = ""

        self.title_var.trace_add("write", self._sync_slug)
        self.kind.trace_add("write", self._sync_kind)

        self._build()
        self._sync_kind()
        self.title_entry.focus_set()
        self.bind("<Control-Return>", lambda e: self._create())
        self.bind("<Escape>", lambda e: self.destroy())

    def _style(self):
        font.nametofont("TkDefaultFont").configure(size=10)
        self.heading_font = font.Font(family=font.nametofont("TkDefaultFont").actual("family"),
                                      size=16, weight="bold")
        s = ttk.Style(self)
        s.theme_use("clam")
        s.configure(".", background=BG, foreground=FG)
        s.configure("TLabel", background=BG, foreground=FG)
        s.configure("Muted.TLabel", foreground=MUTED)
        s.configure("Heading.TLabel", font=self.heading_font)
        s.configure("Field.TLabel", font=(None, 10, "bold"))
        s.configure("Error.TLabel", foreground="#b91c1c")
        s.configure("TEntry", fieldbackground="white", bordercolor=BORDER, lightcolor=BORDER,
                    darkcolor=BORDER, padding=6)
        s.map("TEntry", bordercolor=[("focus", ACCENT)], lightcolor=[("focus", ACCENT)])
        s.configure("TRadiobutton", background=BG)
        s.configure("TCheckbutton", background=BG)
        s.configure("TButton", padding=(14, 6), background="white", bordercolor=BORDER)
        s.map("TButton", background=[("active", "#eef1f4")])
        s.configure("Accent.TButton", background=ACCENT, foreground="white", bordercolor=ACCENT,
                    font=(None, 10, "bold"))
        s.map("Accent.TButton", background=[("active", ACCENT_HOVER)])

    def _field(self, parent, row, label, widget, hint=None, sticky="ew"):
        ttk.Label(parent, text=label, style="Field.TLabel").grid(row=row, column=0, sticky="nw", pady=(8, 0), padx=(0, 16))
        widget.grid(row=row, column=1, sticky=sticky, pady=(4, 0))
        if hint:
            ttk.Label(parent, text=hint, style="Muted.TLabel").grid(row=row + 1, column=1, sticky="w", pady=(2, 0))

    def _build(self):
        root = ttk.Frame(self, padding=24)
        root.pack(fill="both", expand=True)
        root.columnconfigure(1, weight=1)

        ttk.Label(root, text="New post", style="Heading.TLabel").grid(row=0, column=0, columnspan=2, sticky="w")
        ttk.Label(root, text="Creates the page and adds its card to home.html.",
                  style="Muted.TLabel").grid(row=1, column=0, columnspan=2, sticky="w", pady=(0, 12))

        kind = ttk.Frame(root)
        ttk.Radiobutton(kind, text="Blog post", value="blog", variable=self.kind).pack(side="left", padx=(0, 16))
        ttk.Radiobutton(kind, text="Project", value="project", variable=self.kind).pack(side="left")
        self._field(root, 2, "Type", kind)

        self.title_entry = ttk.Entry(root, textvariable=self.title_var)
        self._field(root, 3, "Title", self.title_entry)

        slug = ttk.Frame(root)
        slug.columnconfigure(1, weight=1)
        self.folder_label = ttk.Label(slug, style="Muted.TLabel")
        self.folder_label.grid(row=0, column=0)
        ttk.Entry(slug, textvariable=self.slug).grid(row=0, column=1, sticky="ew")
        ttk.Label(slug, text=".html", style="Muted.TLabel").grid(row=0, column=2)
        self._field(root, 4, "File name", slug)

        self._field(root, 5, "Date", ttk.Entry(root, textvariable=self.date, width=14), sticky="w")

        self._field(root, 6, "Summary", ttk.Entry(root, textvariable=self.summary),
                    "One line, shown on the home page card.")

        # Blog tag / project categories share row 8.
        self.tag_label = ttk.Label(root, text="Tag", style="Field.TLabel")
        self.tag_entry = ttk.Entry(root, textvariable=self.tag, width=20)
        self.cat_label = ttk.Label(root, text="Categories", style="Field.TLabel")
        self.cat_frame = ttk.Frame(root)
        for name, var in self.sections.items():
            ttk.Checkbutton(self.cat_frame, text=name.capitalize() if name != "3d" else "3D",
                            variable=var).pack(side="left", padx=(0, 14))

        photo = ttk.Frame(root)
        photo.columnconfigure(0, weight=1)
        ttk.Entry(photo, textvariable=self.photo).grid(row=0, column=0, sticky="ew")
        ttk.Button(photo, text="Browse…", command=self._browse).grid(row=0, column=1, padx=(8, 0))
        ttk.Button(photo, text="Clear", command=lambda: self.photo.set("")).grid(row=0, column=2, padx=(6, 0))
        self._field(root, 9, "Photo", photo, "Optional. Copied into images/.")

        body = ttk.Frame(root)
        body.columnconfigure(0, weight=1)
        body.rowconfigure(0, weight=1)
        self.body = tk.Text(body, wrap="word", height=12, relief="flat", undo=True,
                            font=font.nametofont("TkDefaultFont"), padx=8, pady=8,
                            highlightthickness=1, highlightbackground=BORDER, highlightcolor=ACCENT)
        scroll = ttk.Scrollbar(body, command=self.body.yview)
        self.body.configure(yscrollcommand=scroll.set)
        self.body.grid(row=0, column=0, sticky="nsew")
        scroll.grid(row=0, column=1, sticky="ns")
        self._field(root, 11, "Text", body,
                    "Blank line = new paragraph  ·  ## Heading  ·  [link text](https://url)", sticky="nsew")
        root.rowconfigure(11, weight=1)

        ttk.Separator(root).grid(row=13, column=0, columnspan=2, sticky="ew", pady=(18, 12))
        footer = ttk.Frame(root)
        footer.grid(row=14, column=0, columnspan=2, sticky="ew")
        footer.columnconfigure(0, weight=1)
        ttk.Label(footer, textvariable=self.status, style="Error.TLabel", wraplength=360).grid(row=0, column=0, sticky="w")
        ttk.Button(footer, text="Cancel", command=self.destroy).grid(row=0, column=1, padx=(0, 8))
        ttk.Button(footer, text="Create post", style="Accent.TButton", command=self._create).grid(row=0, column=2)

    # ----- behaviour -----

    def _sync_slug(self, *_):
        new = slugify(self.title_var.get())
        if self.slug.get() in ("", self._auto_slug):
            self.slug.set(new)
        self._auto_slug = new

    def _sync_kind(self, *_):
        blog = self.kind.get() == "blog"
        self.folder_label.configure(text="blogs/" if blog else "projects/")
        show, hide = ((self.tag_label, self.tag_entry), (self.cat_label, self.cat_frame)) if blog \
            else ((self.cat_label, self.cat_frame), (self.tag_label, self.tag_entry))
        for w in hide:
            w.grid_remove()
        show[0].grid(row=8, column=0, sticky="nw", pady=(8, 0), padx=(0, 16))
        show[1].grid(row=8, column=1, sticky="w", pady=(4, 0))

    def _browse(self):
        path = filedialog.askopenfilename(
            title="Choose a photo",
            filetypes=[("Images", "*.png *.jpg *.jpeg *.gif *.webp"), ("All files", "*")])
        if path:
            self.photo.set(path)

    def _create(self):
        title = self.title_var.get().strip()
        summary = self.summary.get().strip()
        if not title:
            return self.status.set("Title is required.")
        if not summary:
            return self.status.set("Summary is required.")
        raw = self.photo.get().strip().strip("'\"")
        photo = Path(raw).expanduser() if raw else None
        today = date.today()
        try:
            result = create_post(
                kind=self.kind.get(),
                title=title,
                slug=self.slug.get().strip() or slugify(title),
                date_str=self.date.get().strip() or f"{today.month}/{today.day}/{today.year}",
                summary=summary,
                tag=self.tag.get().strip() or "Blog",
                sections=[name for name, var in self.sections.items() if var.get()],
                body=self.body.get("1.0", "end").strip(),
                photo=photo,
            )
        except (ValueError, OSError) as e:
            return self.status.set(str(e))
        self.status.set("")
        messagebox.showinfo("Post created", result + "\n\nPreview it, then:\n"
                            f'git add -A && git commit -m "{title}" && git push', parent=self)
        self.destroy()


if __name__ == "__main__":
    App().mainloop()

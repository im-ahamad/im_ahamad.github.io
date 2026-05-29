import os, re

INTEREST_FILES = [
    "ai-ml.html", "agriculture-ai.html", "bioinformatics-healthcare.html",
    "data-science-analytics.html", "ai-protein-structure.html", "personalized-learning.html"
]

PROJECTS_DIR = "public/projects"

fixes = [
    # === Common patterns (present in all or most files) ===

    # Cards: transition:all .35s ease; (with semicolon, ai-ml.html style)
    (
        'transition:all .35s ease;',
        'transition:transform .35s ease,border-color .35s ease,box-shadow .35s ease;'
    ),
    # Cards: transition:all .35s ease} (no trailing semicolon, other file style)
    ('transition:all .35s ease}', 'transition:transform .35s ease,border-color .35s ease,box-shadow .35s ease}'),

    # Topic icon (no semicolon variant)
    ('.topic-icon{width:52px;height:52px;border-radius:14px;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:24px;transition:all .35s ease}', '.topic-icon{width:52px;height:52px;border-radius:14px;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:24px;transition:transform .35s ease}'),

    # Buttons: transition:all .3s ease;border:none; (with semicolon, ai-ml.html)
    ('transition:all .3s ease;border:none;', 'transition:transform .3s ease,background .3s ease,border-color .3s ease,color .3s ease,box-shadow .3s ease;border:none;'),
    # Buttons: transition:all .3s ease;border:none} (no semicolon)
    ('transition:all .3s ease;border:none}', 'transition:transform .3s ease,background .3s ease,border-color .3s ease,color .3s ease,box-shadow .3s ease;border:none}'),

    # Tech badge: transition:all .3s ease;cursor:default; (with semicolon)
    ('transition:all .3s ease;cursor:default;', 'transition:transform .3s ease,background .3s ease,border-color .3s ease,box-shadow .3s ease;cursor:default;'),
    # Tech badge: transition:all .3s ease;cursor:default} (no semicolon)
    ('transition:all .3s ease;cursor:default}', 'transition:transform .3s ease,background .3s ease,border-color .3s ease,box-shadow .3s ease;cursor:default}'),

    # Resource link: transition:all .2s} (no semicolon variant)
    ('transition:all .2s}', 'transition:gap .2s ease}'),
    # Resource link: transition:all .2s;} (semicolon variant)
    ('transition:all .2s;}', 'transition:gap .2s ease;}'),

    # Goal item: transition:all .3s} (no semicolon variant)
    ('transition:all .3s}', 'transition:transform .3s ease,background .3s ease,border-color .3s ease}'),
    # Goal item: transition:all .3s;} (semicolon variant)
    ('transition:all .3s;}', 'transition:transform .3s ease,background .3s ease,border-color .3s ease;}'),

    # Nav button: transition:all .25s ease;font-size:16px; (with semicolon)
    ('transition:all .25s ease;font-size:16px;', 'transition:background .25s ease,color .25s ease,border-color .25s ease;font-size:16px;'),
    # Nav button: transition:all .25s ease;font-size:16px} (no semicolon)
    ('transition:all .25s ease;font-size:16px}', 'transition:background .25s ease,color .25s ease,border-color .25s ease;font-size:16px}'),

    # Lang select: with semicolon
    ('font-family:inherit;transition:all .25s ease;', 'font-family:inherit;transition:border-color .25s ease,color .25s ease,background .25s ease;'),
    # Lang select: no semicolon
    ('font-family:inherit;transition:all .25s ease}', 'font-family:inherit;transition:border-color .25s ease,color .25s ease,background .25s ease}'),

    # [data-anim] (critical for scroll jank)
    ('[data-anim]{opacity:0;transform:translateY(30px);transition:all .7s ease}', '[data-anim]{opacity:0;transform:translateY(30px);transition:opacity .7s ease,transform .7s ease}'),
    ('[data-anim]{opacity:0;transform:translateY(30px);transition:all .7s ease;}', '[data-anim]{opacity:0;transform:translateY(30px);transition:opacity .7s ease,transform .7s ease;}'),

    # === Canvas scroll reflow removed ===
    ("document.addEventListener('scroll', () => { canvas.height = document.documentElement.scrollHeight; });",
     "// canvas resize on scroll removed to prevent layout thrashing"),
]

for filename in INTEREST_FILES:
    filepath = os.path.join(PROJECTS_DIR, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Apply string-replacement fixes
    for old, new in fixes:
        if old in content:
            content = content.replace(old, new)

    # Add #particles-canvas hide inside @media(max-width:600px) block (skip if already present)
    if '#particles-canvas{display:none!important}' not in content:
        content = re.sub(
            r'(@media\(max-width:600px\)\{)',
            r'\1#particles-canvas{display:none!important}',
            content
        )

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        remaining = content.count('transition:all')
        print(f"FIXED: {filename} ({remaining} transition:all remaining)")
    else:
        remaining = content.count('transition:all')
        print(f"NO CHANGE: {filename} ({remaining} transition:all remaining)")

print("\nDone!")

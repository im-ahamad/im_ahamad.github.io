import os, re

ALL_FILES = [
    # Group A (Academic Interest)
    "ai-ml.html", "agriculture-ai.html", "bioinformatics-healthcare.html",
    "data-science-analytics.html", "ai-protein-structure.html", "personalized-learning.html",
    # Group B (Projects)
    "crop-disease-detection.html", "crop-recommendation.html", "crop-yield-prediction.html",
    "smart-fertilizer-management.html", "soil-moisture-prediction.html", "climate-crop-planning.html",
]

def add_to_nav_css(content):
    """Add will-change:transform and isolation:isolate to nav element CSS."""
    # Match nav { ... } blocks, add will-change and isolation before the closing brace
    def add_props(m):
        block = m.group(0)
        if 'will-change' not in block:
            # Insert before the closing }
            block = block.rstrip()
            if block.endswith('}'):
                block = block[:-1] + 'will-change:transform;isolation:isolate;}'
        return block
    # Match nav CSS blocks (multi-line or single-line)
    content = re.sub(r'nav\s*\{[^}]*\}', add_props, content)
    return content

# Replacements for transition:all -> specific properties
# Order matters: more specific patterns first
TRANSITION_FIXES = [
    # .fade-in and .scroll-reveal (opacity + transform)
    ('.fade-in { opacity: 0; transform: translateY(30px); transition: all 0.7s ease; }',
     '.fade-in { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }'),
    ('.fade-in { opacity: 0; transform: translateY(30px); transition: all 0.7s ease; }',
     '.fade-in { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }'),
    ('.scroll-reveal { opacity: 0; transform: translateY(30px); transition: all 0.7s ease; }',
     '.scroll-reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }'),

    # .nav-back (border-color, color, box-shadow, transform)
    ('background:var(--bg-card);border:1px solid var(--border-color);border-radius:50px;color:var(--text-secondary);text-decoration:none;font-size:0.875rem;font-weight:500;transition:all 0.3s ease;',
     'background:var(--bg-card);border:1px solid var(--border-color);border-radius:50px;color:var(--text-secondary);text-decoration:none;font-size:0.875rem;font-weight:500;transition:border-color 0.3s ease,color 0.3s ease,box-shadow 0.3s ease,transform 0.3s ease;'),
    # .nav-back in soil-moisture (different spacing)
    ('background:var(--bg-card); border:1px solid var(--border-color); border-radius:50px; color:var(--text-secondary); text-decoration:none; font-size:0.875rem; font-weight:500; transition:all 0.3s ease;',
     'background:var(--bg-card); border:1px solid var(--border-color); border-radius:50px; color:var(--text-secondary); text-decoration:none; font-size:0.875rem; font-weight:500; transition:border-color 0.3s ease,color 0.3s ease,box-shadow 0.3s ease,transform 0.3s ease;'),

    # .theme-btn (border-color, box-shadow, transform)
    ('width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:var(--bg-card);border:1px solid var(--border-color);border-radius:50%;color:var(--text-secondary);cursor:pointer;font-size:1.1rem;transition:all 0.3s ease;padding:0;line-height:1;',
     'width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:var(--bg-card);border:1px solid var(--border-color);border-radius:50%;color:var(--text-secondary);cursor:pointer;font-size:1.1rem;transition:border-color 0.3s ease,box-shadow 0.3s ease,transform 0.3s ease;padding:0;line-height:1;'),
    # .theme-btn in soil-moisture (different spacing)
    ('width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 50%; color: var(--text-secondary); cursor: pointer; font-size: 1.1rem; transition: all 0.3s ease; padding: 0; line-height: 1;',
     'width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 50%; color: var(--text-secondary); cursor: pointer; font-size: 1.1rem; transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease; padding: 0; line-height: 1;'),

    # .tag (background, box-shadow, transform)
    ('padding:8px 20px;border-radius:50px;font-size:0.85rem;font-weight:500;background:rgba(', 'PADDING_MARKER'),
    (';transition:all 0.3s ease;}', ';transition:background 0.3s ease,box-shadow 0.3s ease,transform 0.3s ease;}'),

    # .upload-area (border-color, background)
    (';transition:all 0.3s ease;position:relative;}', ';transition:border-color 0.3s ease,background 0.3s ease;position:relative;}'),
    # upload-area in some files
    ('transition: all 0.3s ease; position: relative; }', 'transition: border-color 0.3s ease, background 0.3s ease; position: relative; }'),

    # .detect-btn (box-shadow, transform)
    ('transition:all 0.3s ease;width:100%;justify-content:center;margin-top:20px;}',
     'transition:box-shadow 0.3s ease,transform 0.3s ease;width:100%;justify-content:center;margin-top:20px;}'),
    ('transition:all 0.3s ease;width:100%;justify-content:center;margin-top:8px;',
     'transition:box-shadow 0.3s ease,transform 0.3s ease;width:100%;justify-content:center;margin-top:8px;'),

    # .result-card (opacity, transform - 0.5s)
    ('opacity:0;transform:translateY(20px);transition:all 0.5s ease;}',
     'opacity:0;transform:translateY(20px);transition:opacity 0.5s ease,transform 0.5s ease;}'),
    ('transition: all 0.5s ease; }', 'transition: opacity 0.5s ease, transform 0.5s ease; }'),
    ('transition:all 0.5s ease;}', 'transition:opacity 0.5s ease,transform 0.5s ease;}'),

    # .gallery-card / .impact-card (transform, border-color, box-shadow - 0.4s)
    ('padding:24px 20px;text-align:center;transition:all 0.4s ease;}',
     'padding:24px 20px;text-align:center;transition:transform 0.4s ease,border-color 0.4s ease,box-shadow 0.4s ease;}'),
    ('padding: 24px 20px; text-align: center; transition: all 0.4s ease; }',
     'padding: 24px 20px; text-align: center; transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease; }'),
    ('padding:32px 24px;text-align:center;transition:all 0.4s ease;}',
     'padding:32px 24px;text-align:center;transition:transform 0.4s ease,border-color 0.4s ease,box-shadow 0.4s ease;}'),
    ('padding: 32px 24px; text-align: center; transition: all 0.4s ease; }',
     'padding: 32px 24px; text-align: center; transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease; }'),

    # .tech-card (transform, border-color - 0.4s)
    ('padding:32px 24px;text-align:center;transition:all 0.4s ease;position:relative;overflow:hidden;}',
     'padding:32px 24px;text-align:center;transition:transform 0.4s ease,border-color 0.4s ease;position:relative;overflow:hidden;}'),

    # .tech-icon (background, box-shadow - 0.3s)
    ('transition:all 0.3s ease;', 'transition:background 0.3s ease,box-shadow 0.3s ease;'),

    # .footer-btn (multiple properties - 0.3s)
    ('transition:all 0.3s ease;font-family:inherit;}',
     'transition:box-shadow 0.3s ease,transform 0.3s ease;font-family:inherit;}'),
    ('transition: all 0.3s ease; font-family: inherit; }',
     'transition: box-shadow 0.3s ease, transform 0.3s ease; font-family: inherit; }'),

    # Generic catch-all for any remaining transition: all 0.Xs ease;
    # This is a fallback - it won't catch everything but helps
]

# Tag-specific fix (need to be more careful since it varies)
TAG_SPECIFIC_FIX = re.compile(
    r'(padding:\d+px \d+px;border-radius:\d+px;font-size:[\d.]+rem;font-weight:\d+;background:rgba\([^;]+;border:1px solid rgba\([^;]+;color:var\(--[^)]+\);transition:all\s+0\.3s\s+ease;)',
    re.DOTALL
)

def fix_tag_transition(content):
    """Fix .tag transition:all -> specific"""
    def replace_tag(m):
        return m.group(1).replace(
            'transition:all 0.3s ease', 'transition:background 0.3s ease,box-shadow 0.3s ease,transform 0.3s ease'
        )
    return TAG_SPECIFIC_FIX.sub(replace_tag, content)


def fix_remaining_transition_all(content):
    """Catch any remaining transition: all that the main fixes missed."""
    # Replace any remaining "transition: all 0.Xs ease"
    content = re.sub(
        r'transition:\s*all\s+([\d.]+s)\s+ease\s*;',
        r'transition:transform \1 ease,opacity \1 ease,background \1 ease,border-color \1 ease,box-shadow \1 ease,color \1 ease;',
        content
    )
    # Replace any remaining "transition: all 0.Xs" (no ease)
    content = re.sub(
        r'transition:\s*all\s+([\d.]+s)\s*;',
        r'transition:transform \1 ease,opacity \1 ease,background \1 ease,border-color \1 ease,box-shadow \1 ease,color \1 ease;',
        content
    )
    return content


for filename in ALL_FILES:
    filepath = os.path.join('public/projects', filename)
    content = open(filepath, 'r', encoding='utf-8').read()
    original = content

    # 1. Add will-change + isolation to nav CSS
    content = add_to_nav_css(content)

    # 2. Apply transition:all fixes
    for old, new in TRANSITION_FIXES:
        if new == 'PADDING_MARKER':
            continue  # skip
        if old in content:
            content = content.replace(old, new)

    # 3. Fix .tag transition specifically
    content = fix_tag_transition(content)

    # 4. Fix any remaining upload-area pattern (not caught above)
    # The upload-area has dashed border, different from other elements
    upload_area_old = 'border:2px dashed rgba(239,68,68,0.3);border-radius:var(--radius);padding:48px 24px;text-align:center;cursor:pointer;transition:all 0.3s ease;position:relative;'
    upload_area_new = 'border:2px dashed rgba(239,68,68,0.3);border-radius:var(--radius);padding:48px 24px;text-align:center;cursor:pointer;transition:border-color 0.3s ease,background 0.3s ease;position:relative;'
    if upload_area_old in content:
        content = content.replace(upload_area_old, upload_area_new)

    # 5. Fix result-card pattern with different formatting
    content = re.sub(
        r'opacity:\s*0;\s*transform:\s*translateY\(20px\);\s*transition:\s*all\s+0\.5s\s+ease\s*;',
        'opacity:0;transform:translateY(20px);transition:opacity 0.5s ease,transform 0.5s ease;',
        content
    )

    # 6. Generic catch-all for any remaining transition: all (with or without space)
    remaining_before = len(re.findall(r'transition:\s*all\s', content))
    if remaining_before > 0:
        before = len(re.findall(r'transition:\s*all\s', content))
        content = fix_remaining_transition_all(content)
        after = len(re.findall(r'transition:\s*all\s', content))
        for _ in range(5):
            if before != after:
                before = after
                content = fix_remaining_transition_all(content)
                after = len(re.findall(r'transition:\s*all\s', content))

    if content != original:
        open(filepath, 'w', encoding='utf-8').write(content)
        remaining = len(re.findall(r'transition:\s*all\s', content))
        nav_fixed = 'will-change' in content
        print(f"FIXED: {filename} ({remaining} transition:all, will-change={'yes' if nav_fixed else 'no'})")
    else:
        remaining = len(re.findall(r'transition:\s*all\s', content))
        nav_fixed = 'will-change' in content
        print(f"NO CHANGE: {filename} ({remaining} transition:all, will-change={'yes' if nav_fixed else 'no'})")

print("\nDone!")

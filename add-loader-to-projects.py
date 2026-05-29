#!/usr/bin/env python3
"""Add the premium loader to all static project HTML pages."""

import os
import glob
import re

PROJECTS_DIR = os.path.join(os.path.dirname(__file__), "public", "projects")

LOADER_CSS = """
    #premium-loader {
      position: fixed;
      inset: 0;
      z-index: 999999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #f8fafc;
      transition: opacity 0.6s ease, visibility 0.6s ease;
    }
    [data-theme="dark"] #premium-loader {
      background: #0a0a0f;
    }
    @media (prefers-color-scheme: dark) {
      #premium-loader { background: #0a0a0f; }
    }
    #premium-loader.hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }
    .loader-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
    }
    .loader-logo {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 28px;
      font-weight: 700;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.5px;
    }
    .loader-spinner {
      position: relative;
      width: 60px;
      height: 60px;
    }
    .loader-spinner-ring {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 3px solid transparent;
    }
    .loader-spinner-ring:nth-child(1) {
      border-top-color: #3b82f6;
      animation: spin 0.8s linear infinite;
    }
    .loader-spinner-ring:nth-child(2) {
      inset: 6px;
      border-right-color: #8b5cf6;
      animation: spin 1s linear infinite reverse;
    }
    .loader-spinner-ring:nth-child(3) {
      inset: 12px;
      border-bottom-color: #06b6d4;
      animation: spin 0.6s linear infinite;
    }
    .loader-bar-track {
      width: 200px;
      height: 3px;
      background: rgba(59,130,246,0.1);
      border-radius: 2px;
      overflow: hidden;
    }
    .loader-bar-fill {
      height: 100%;
      width: 0;
      background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4);
      border-radius: 2px;
      animation: loaderFill 1.2s ease-in-out forwards;
    }
    .loader-text {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 13px;
      letter-spacing: 3px;
      text-transform: uppercase;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: loaderPulse 1.5s ease-in-out infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes loaderFill {
      0% { width: 0; }
      50% { width: 70%; }
      100% { width: 100%; }
    }
    @keyframes loaderPulse {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }
"""

LOADER_HTML = """  <div id="premium-loader">
    <div class="loader-content">
      <div class="loader-logo">Ahamad</div>
      <div class="loader-spinner">
        <div class="loader-spinner-ring"></div>
        <div class="loader-spinner-ring"></div>
        <div class="loader-spinner-ring"></div>
      </div>
      <div class="loader-bar-track">
        <div class="loader-bar-fill"></div>
      </div>
      <div class="loader-text">Loading</div>
    </div>
  </div>
"""

LOADER_JS = """  <script>
    (function() {
      var loader = document.getElementById('premium-loader');
      if (loader) {
        window.addEventListener('load', function() {
          setTimeout(function() {
            loader.classList.add('hidden');
            setTimeout(function() { loader.style.display = 'none'; }, 600);
          }, 800);
        });
      }
    })();
  </script>
"""

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    modified = False

    # Remove old loader-bar HTML elements
    old_bar = '<div class="loader-bar">'
    if old_bar in content:
        content = re.sub(r'\n?\s*<div class="loader-bar">[^<]*</div>', '', content)
        modified = True
        print(f"  Removed old loader-bar from {os.path.basename(filepath)}")

    old_track = 'class="loader-bar-track"'
    # Remove old loader-bar-track that's NOT inside premium-loader
    if old_track in content and 'id="premium-loader"' not in content:
        content = re.sub(
            r'\n\s*<div class="loader-bar-track">\s*\n\s*<div class="loader-bar-fill"></div>\s*\n\s*</div>',
            '',
            content
        )
        modified = True
        print(f"  Removed old loader-track from {os.path.basename(filepath)}")

    # Remove old inline loader-bar CSS
    content = re.sub(
        r'body\{background:[^}]+\}\.loader-bar\{[^}]+\}@keyframes loaderBar\{[^}]+\}',
        r'body{background:\1}',
        content
    )
    if 'loaderBar' not in content:
        modified = True

    # Add CSS before </head>
    if "premium-loader" not in content:
        head_end = content.find("</head>")
        if head_end != -1:
            content = content[:head_end] + LOADER_CSS + content[head_end:]
            modified = True
            print(f"  Added CSS to {os.path.basename(filepath)}")
    else:
        print(f"  SKIP CSS: premium-loader already in {os.path.basename(filepath)}")

    # Add loader HTML after <body
    if '<div id="premium-loader">' not in content:
        body_match = re.search(r'<body[^>]*>', content)
        if body_match:
            insert_pos = body_match.end()
            content = content[:insert_pos] + "\n" + LOADER_HTML + content[insert_pos:]
            modified = True
            print(f"  Added HTML to {os.path.basename(filepath)}")
    else:
        print(f"  SKIP HTML: premium-loader div already in {os.path.basename(filepath)}")

    # Add loader JS before </body>
    if "var loader = document.getElementById('premium-loader')" not in content:
        body_close = content.rfind("</body>")
        if body_close != -1:
            content = content[:body_close] + LOADER_JS + content[body_close:]
            modified = True
            print(f"  Added JS to {os.path.basename(filepath)}")
    else:
        print(f"  SKIP JS: loader script already in {os.path.basename(filepath)}")

    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  SAVED {os.path.basename(filepath)}")
    else:
        print(f"  No changes needed for {os.path.basename(filepath)}")

    return modified

def main():
    html_files = sorted(glob.glob(os.path.join(PROJECTS_DIR, "*.html")))
    print(f"Found {len(html_files)} project HTML files")

    count = 0
    for filepath in html_files:
        print(f"\nProcessing {os.path.basename(filepath)}...")
        if process_file(filepath):
            count += 1

    print(f"\nDone! Modified {count} files.")

if __name__ == "__main__":
    main()

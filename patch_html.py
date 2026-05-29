import os

public_dir = "public/projects"
dist_dir = "dist/projects"

handler = """
<script>
document.addEventListener('click', function(e) {
    var link = e.target.closest('a');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!href) return;
    var shouldIntercept = false;
    if (href === '/#projects') {
        shouldIntercept = true;
    } else if (href === '../../') {
        var title = link.getAttribute('title');
        var i18n = link.getAttribute('data-i18n');
        if (title === 'Back to Portfolio' || i18n === 'backPortfolio' || i18n === 'ctaBack') {
            shouldIntercept = true;
        }
    }
    if (shouldIntercept) {
        e.preventDefault();
        window.parent.postMessage('back-to-portfolio', '*');
    }
});
</script>
</body>"""

for d in [public_dir, dist_dir]:
    if not os.path.isdir(d):
        # dist might not exist yet
        continue
    for f in sorted(os.listdir(d)):
        if not f.endswith(".html"):
            continue
        path = os.path.join(d, f)
        with open(path) as fh:
            c = fh.read()
        if '</body>' not in c:
            continue
        # skip if already patched
        if "postMessage('back-to-portfolio'" in c:
            print(f"already patched: {path}")
            continue
        c = c.replace('</body>', handler)
        with open(path, 'w') as fw:
            fw.write(c)
        print(f"patched: {path}")

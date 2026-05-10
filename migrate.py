import re

with open("assets/melvin_thomas_website_v2 code.html", "r", encoding="utf-8") as f:
    content = f.read()

# Extract CSS
style_match = re.search(r'<style>\s*(.*?)\s*</style>', content, re.DOTALL)
css = style_match.group(1).strip() if style_match else ""

# Extract JS
script_match = re.search(r'<script>\s*(.*?)\s*</script>', content, re.DOTALL)
js = script_match.group(1).strip() if script_match else ""

# Extract HTML (remove style and script blocks, add external links)
html = re.sub(r'<style>.*?</style>', '<link rel="stylesheet" href="styles.css" />', content, flags=re.DOTALL)
html = re.sub(r'<script>.*?</script>', '<script src="script.js"></script>', html, flags=re.DOTALL)

# Replace the about me image
html = html.replace('assets/about_me_section_1777824024984.png', 'assets/Melvin thomas photograph.jpeg')

# Add the 3 new cards to the instr-grid
cards_to_add = """      <div class="instr-card">
        <div class="instr-img"><img src="assets/lab photo 1.jpg" alt="Laboratory Research" loading="lazy" /></div>
        <div class="instr-info">
          <div class="instr-name">Laboratory Research</div>
          <div class="instr-desc">Executing complex chemical reactions and synthesis</div>
        </div>
      </div>
      <div class="instr-card">
        <div class="instr-img"><img src="assets/lab photo 2.jpg" alt="Chromatographic Purification" loading="lazy" /></div>
        <div class="instr-info">
          <div class="instr-name">Chromatographic Purification</div>
          <div class="instr-desc">Advanced expertise in automated chromatographic purification, achieving >98% purity</div>
        </div>
      </div>
      <div class="instr-card">
        <div class="instr-img"><img src="assets/fluorimeter_instrument.png" alt="Fluorimeter" loading="lazy" /></div>
        <div class="instr-info">
          <div class="instr-name">Fluorimeter</div>
          <div class="instr-desc">Full emission spectra and quantum yield measurement</div>
        </div>
      </div>
"""

html = html.replace('    </div>\n\n    <!-- Skills matrix -->', cards_to_add + '    </div>\n\n    <!-- Skills matrix -->')

with open("styles.css", "w", encoding="utf-8") as f:
    f.write(css)

with open("script.js", "w", encoding="utf-8") as f:
    f.write(js)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Migration completed!")

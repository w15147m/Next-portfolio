import re
from html.parser import HTMLParser

class SectionParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.sections = []
        self.in_section = False
        self.section_depth = 0
        self.current_section = ""

    def handle_starttag(self, tag, attrs):
        if tag == "section":
            if self.section_depth == 0:
                self.in_section = True
                self.current_section = ""
            self.section_depth += 1
        
        if self.in_section:
            attrs_str = " ".join([f'{k}="{v}"' if v is not None else k for k, v in attrs])
            self.current_section += f"<{tag} {attrs_str}>" if attrs_str else f"<{tag}>"

    def handle_endtag(self, tag):
        if self.in_section:
            self.current_section += f"</{tag}>"
        
        if tag == "section":
            self.section_depth -= 1
            if self.section_depth == 0:
                self.in_section = False
                self.sections.append(self.current_section)

    def handle_data(self, data):
        if self.in_section:
            self.current_section += data

parser = SectionParser()
with open('landing.html', 'r', encoding='utf-8') as f:
    parser.feed(f.read())

for i, s in enumerate(parser.sections):
    print(f"Section {i}:")
    match = re.search(r'<h[1-6][^>]*>(.*?)</h[1-6]>', s, re.IGNORECASE | re.DOTALL)
    if match:
        print("Heading:", match.group(1).strip()[:100])
    match2 = re.search(r'class="[^"]*"', s)
    print("Class:", match2.group(0) if match2 else "None")
    match3 = re.search(r'id="([^"]*)"', s)
    if match3:
        print("ID:", match3.group(1))
    print("...")

const fs = require('fs');

const html = fs.readFileSync('landing.html', 'utf8');

// A very naive section extractor: find top-level <section> tags
const sections = [];
let depth = 0;
let current = "";
let inSection = false;

// Simple regex-based tag tokenizer to find <section> and </section>
const tagRegex = /<\/?([a-zA-Z0-9]+)[^>]*>/g;
let match;
let lastIndex = 0;

while ((match = tagRegex.exec(html)) !== null) {
    const isClosing = match[0].startsWith('</');
    const tagName = match[1].toLowerCase();
    
    if (tagName === 'section') {
        if (!isClosing) {
            if (depth === 0) {
                inSection = true;
                current = "";
                // add text before the <section> tag if needed, but we just want the tag itself
                current += html.substring(lastIndex, match.index);
                lastIndex = match.index;
            }
            depth++;
        } else {
            depth--;
            if (depth === 0) {
                inSection = false;
                current += html.substring(lastIndex, match.index + match[0].length);
                lastIndex = match.index + match[0].length;
                sections.push(current);
                current = "";
            }
        }
    }
}

// Convert HTML to JSX
function htmlToJsx(htmlStr) {
    // Basic replacements
    let jsx = htmlStr
        .replace(/class=/g, 'className=')
        .replace(/for=/g, 'htmlFor=')
        .replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}')
        .replace(/ tabindex=/g, ' tabIndex=')
        .replace(/ autoplay/g, ' autoPlay')
        .replace(/ playsinline/g, ' playsInline')
        .replace(/ loop/g, ' loop')
        .replace(/ muted/g, ' muted')
        .replace(/ controls/g, ' controls')
        .replace(/ viewBox=/g, ' viewBox='); // keep viewBox as is
        
    // Self close tags
    jsx = jsx.replace(/<(img|br|hr|input|meta|link)([^>]*?)(?<!\/)>/g, '<$1$2 />');

    // Fix SVG / inline attributes (kebab-case to camelCase)
    // Avoid data-* and aria-*
    jsx = jsx.replace(/([a-zA-Z0-9]+)-([a-zA-Z0-9]+)=/g, (match, p1, p2) => {
        if (p1 === 'data' || p1 === 'aria') return match;
        return `${p1}${p2.charAt(0).toUpperCase()}${p2.slice(1)}=`;
    });
    
    // Style attributes usually need to be objects, but let's hope there are none or few
    // Handle inline styles if any (naive approach, mostly for style="...")
    jsx = jsx.replace(/style="([^"]*)"/g, (match, p1) => {
        const parts = p1.split(';').filter(Boolean);
        const styleObj = {};
        parts.forEach(part => {
            let [key, val] = part.split(':');
            if (key && val) {
                key = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                styleObj[key] = val.trim();
            }
        });
        return `style={${JSON.stringify(styleObj)}}`;
    });

    return jsx;
}

const names = [
    "Hero", // 0
    "TrustedBy", // 1
    "TechStack", // 2
    "Features", // 3
    "FeaturesTab", // 4
    "EmptySection", // 5
    "Dashboards", // 6
    "Plugins", // 7
    "CTA", // 8
    "Blogs" // 9
];

for (let i = 1; i < sections.length; i++) {
    const s = sections[i];
    if (s.trim().length < 100 && i === 5) continue; // Skip empty section

    const jsx = htmlToJsx(s);
    const componentName = names[i] || `Section${i}`;
    
    // Some basic imports might be needed, let's just use next/image instead of img if we wanted, but img is fine for now
    let fileContent = `import React from 'react';\n\nexport default function ${componentName}() {\n  return (\n    ${jsx.trim()}\n  );\n}\n`;

    // Fix unescaped entities in JSX like <br> -> <br /> which is already handled, but sometimes bare characters like > inside text
    // React handles bare text fine if it's not a tag. 

    fs.writeFileSync(`src/app/(site)/_components/${componentName}.tsx`, fileContent);
    console.log(`Created ${componentName}.tsx`);
}

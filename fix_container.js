const fs = require('fs');
const path = require('path');

const dir = 'src/app/(site)/_components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  content = content.replace(/className="container"/g, 'className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"');
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
}

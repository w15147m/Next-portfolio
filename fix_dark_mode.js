const fs = require('fs');
const path = require('path');

const dir = 'src/app/(site)/_components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const replacements = [
  [/bg-white(?!\s+dark:)/g, 'bg-white dark:bg-gray-900 dark:border-gray-800'],
  [/bg-gray-50(?!\s+dark:)/g, 'bg-gray-50 dark:bg-gray-800/50'],
  [/text-title-color(?!\s+dark:)/g, 'text-title-color dark:text-white/90'],
  [/text-text-color-secondary(?!\s+dark:)/g, 'text-text-color-secondary dark:text-gray-400'],
  [/text-text-color(?!\s+dark:)/g, 'text-text-color dark:text-gray-300'],
  [/border-stroke(?!\s+dark:|-)/g, 'border-stroke dark:border-gray-800'],
  [/border-stroke-secondary(?!\s+dark:)/g, 'border-stroke-secondary dark:border-gray-700'],
  [/border-\[\#F2F4F7\](?!\s+dark:)/g, 'border-[#F2F4F7] dark:border-gray-800']
];

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Clean up any double additions if run multiple times
  content = content.replace(/dark:bg-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:border-gray-800/g, 'dark:bg-gray-900 dark:border-gray-800');
  
  let original = content;
  for (const [regex, replacement] of replacements) {
    content = content.replace(regex, replacement);
  }
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated dark mode for ${file}`);
  }
}

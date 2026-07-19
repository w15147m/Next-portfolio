const fs = require('fs');
const path = require('path');

const dir = 'src/app/(site)/_components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const images = {
  Blogs: [
    '/images/grid-image/image-01.png',
    '/images/grid-image/image-02.png',
    '/images/grid-image/image-03.png',
    '/images/grid-image/image-04.png',
  ],
  Dashboards: [
    '/images/cards/card-01.jpg',
    '/images/cards/card-02.jpg',
    '/images/cards/card-03.jpg',
  ],
  FeaturesTab: [
    '/images/brand/brand-01.svg',
    '/images/brand/brand-02.svg',
    '/images/brand/brand-03.svg',
    '/images/brand/brand-04.svg',
    '/images/brand/brand-05.svg',
  ],
  Hero: [
    '/images/cards/card-01.jpg',
    '/images/cards/card-02.jpg',
  ],
  Plugins: [
    '/images/brand/brand-06.svg',
    '/images/brand/brand-07.svg',
    '/images/brand/brand-08.svg',
    '/images/brand/brand-09.svg',
    '/images/brand/brand-10.svg',
    '/images/brand/brand-11.svg',
  ],
  TrustedBy: [
    '/images/user/user-01.jpg',
    '/images/user/user-02.jpg',
    '/images/user/user-03.jpg',
  ],
  CTA: [
    '/images/user/user-04.jpg',
    '/images/user/user-05.jpg',
    '/images/user/user-06.jpg',
    '/images/user/user-07.jpg',
    '/images/user/user-08.jpg',
  ]
};

const defaultImages = [
  '/images/cards/card-01.jpg',
  '/images/cards/card-02.jpg'
];

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Remove srcSet attributes entirely
  content = content.replace(/srcSet="[^"]*"/g, '');

  const componentName = file.replace('.tsx', '');
  const imageList = images[componentName] || defaultImages;
  
  let i = 0;
  content = content.replace(/src="[^"]*"/g, (match) => {
    const replacement = `src="${imageList[i % imageList.length]}"`;
    i++;
    return replacement;
  });
  
  // also handle some `<Image>` tags from Next.js if they exist. They need valid paths.
  // The above regex handles src="" whether it's <img> or <Image>.

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated images for ${file}`);
  }
}

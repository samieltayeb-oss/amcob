const fs = require('fs');
const { renderLayout } = require('./site-layout');

// Extract the custom CSS and inner content from the existing design-system.html
const existing = fs.readFileSync('design-system.html', 'utf8');

const styleStart = existing.indexOf('<style>');
const styleEnd = existing.indexOf('</style>') + 8;
const extraStyles = existing.substring(styleStart, styleEnd);

const mainStart = existing.indexOf('<main>');
const mainEnd = existing.indexOf('</main>') + 7;
const mainContent = existing.substring(mainStart, mainEnd);

const rendered = renderLayout({
  title: 'Design System Specification',
  description: 'The definitive design system specification, component library, and token architecture for the AMCOB digital flagship.',
  activeNav: '',
  breadcrumbs: [{ label: 'Design System', url: '/design-system' }],
  extraHead: `<link rel="stylesheet" href="/css/ecosystem-motion.css">\n  ${extraStyles}`,
  extraScripts: '<script src="/js/ecosystem-motion.js"></script>',
  content: mainContent
});

fs.writeFileSync('design-system.html', rendered, 'utf8');
console.log('Successfully regenerated design-system.html with glass navigation and master layout!');

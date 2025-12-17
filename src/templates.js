const templateFiles = import.meta.glob(
  '../resources/templates/**/*.(htm|html)',
  { eager: true, query: '?raw', import: 'default' }
);
const templates = {};
Object.entries(templateFiles).forEach(([name, t]) => {
  const key = name.replace('../resources/templates/', '');
  templates[key] = t;
});

export default templates;

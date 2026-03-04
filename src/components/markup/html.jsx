const htmlTagComponent = (tag = 'div') => {
  const Tag = tag;
  return ({ options, children }) => <Tag class={options.class} style={options.style}>{children}</Tag>;
};
const htmlTags = {};
[
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'b', 'strong', 'i', 'em', 'u', 's',
  'mark', 'del', 'ins', 'code', 'kbd',
  'small', 'sub', 'sup',
  'abbr', 'blockquote', 'span', 'q',
  'ul', 'ol', 'li', 'menu',
  'dl', 'dd', 'dd',
  'br', 'hr', 'wbr'
].forEach((tag) => {
  htmlTags[tag] = { tag, component: htmlTagComponent(tag)};
});

export default htmlTags;

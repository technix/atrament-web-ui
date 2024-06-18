export default function getTagAttributes(tag) {
  const attrs = tag.match(/(\w+)=["']?((?:.?(?!["']?\s+(?:\S+)=|\s*\/?[>"']))+.)["']?/g);
  const attributes = {};
  attrs && attrs.forEach((item) => {
    const [, name, value] = item.match(/(.+)=(.+)/);
    try {
      attributes[name] = JSON.parse(value);
    } catch(e) {
      attributes[name] = value;
    }
  });
  return attributes;
}

const attrRe = /([\w:]+)(?:=(?:"([^"]*)"|(\S+)))?/g;

export default function getTagAttributes(options) {
  const attributes = {};
  if (!options) return attributes;

  // [tag=value]
  if (options.startsWith("=")) {
    attributes.DEFAULT = options.slice(1).trim();
    return attributes;
  }

  // [tag key=value foo="bar"]
  let match;
  while ((match = attrRe.exec(options))) {
    const value = match[2] ?? match[3] ?? "true";
    try {
      attributes[match[1]] = JSON.parse(value);
    } catch(e) { // eslint-disable-line no-unused-vars
      attributes[match[1]] = value;
    }
  }

  return attributes;
}

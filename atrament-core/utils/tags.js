/**
 * Parses tags from ink
 *
 * @export
 * @param {*} tags - array of tags
 * @returns {{}} key-value dictionary of tags
 */
export function parseTags(tags) {
  if (!tags) {
    return {};
  }
  const tagsObj = {};
  tags.forEach((item) => {
    let tagName;
    let tagValue;

    const content = item.match(/\s*(\w+)\s*:\s*(.+?)\s*$/);
    if (content) {
      // tag is in "key: value" format
      const [, key, value] = content;
      tagName = key;
      try {
        tagValue = JSON.parse(value); // this is JSON
      } catch (e) {
        const firstChar = value.substr(0, 1);
        if (firstChar === '{' || firstChar === '[') {
          console.warn('Malformed JSON tag, ignored.', key, value); /* eslint-disable-line */
        } else {
          tagValue = value;
        }
      }
    } else {
      tagName = item; // use tag as key name
      tagValue = true;
    }

    // if there are multiple tags with the same name,
    // store them as array
    if (Array.isArray(tagsObj[tagName])) {
      tagsObj[tagName].push(tagValue);
    } else if (tagsObj[tagName]) {
      tagsObj[tagName] = [tagsObj[tagName], tagValue];
    } else {
      tagsObj[tagName] = tagValue;
    }
  });
  return tagsObj;
}

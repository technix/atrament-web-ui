import MarkupComponents from 'src/components/markup';
import HTMLFragment from 'src/components/markup/html-fragment';
import getTagAttributes from 'src/utils/get-tag-attributes';
import getMarkupRegex from 'src/utils/get-markup-regex';

const containsHTML = (str) => /<\/?[a-z][\s\S]*>/i.test(str);

// modify markup components: add 'regex' property
MarkupComponents.forEach(component => {
  component.regex = getMarkupRegex(component.tag, component.tagOptions);
});

// split string with delimiter string, keeping it in the resulting array
function splitKeepDelimiter(text, delimiter) {
  const escaped = delimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // escape regex chars
  return text.split(new RegExp(`(${escaped})`));
}

function parseTag(item, regex, replacer) {
  const parsed = item.match(regex.parser);
  let attributes = parsed[1];
  if (attributes.startsWith('=')) {
    attributes = `DEFAULT${attributes}`;
  }
  const options = getTagAttributes(attributes);
  return replacer(options, parsed[2], markup);
}


function replaceWithComponent(text, mention, parserFn) {
  if (typeof text !== 'string' || !text.includes(mention)) {
    return text;
  }
  const splitted = splitKeepDelimiter(text, mention);
  const result = splitted.flatMap((fragment) => fragment === mention ? parserFn(fragment) : fragment);
  return result;
}


export default function markup(text) {
  let processedText = [text];
  // find matched markup and its length
  const processingQueue = [];
  MarkupComponents.forEach(component => {
    const mentions = text?.match(component.regex.matcher);
    if (mentions) {
      mentions.forEach((mention) => processingQueue.push({
        component,
        mention,
        size: mention.length
      }));
    }
  });
  // start from the longest markup elements, which may contain others
  processingQueue
    .sort((a, b) => b.size - a.size)
    .forEach(({ component, mention }) => {
      const replacerFn = (txt) => parseTag(txt, component.regex, component.replacer);
      processedText = processedText.flatMap((item) => replaceWithComponent(item, mention, replacerFn));
    });
  return processedText.map((item, index) =>
    typeof item === 'string' && containsHTML(item)
      ? HTMLFragment({index, item})
      : item
  );
}

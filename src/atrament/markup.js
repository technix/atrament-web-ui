import MarkupComponents from 'src/components/markup';
import HTMLFragment from 'src/components/markup/html-fragment';

const containsHTML = (str) => /<\/?[a-z][\s\S]*>/i.test(str);

function replaceWithComponent(text, regexp, replacer) {
  if (typeof text !== 'string') {
    return text;
  }
  const mentions = text.match(regexp);
  if (!mentions) {
    return text;
  }
  const splitted = text.split(regexp);
  const result = splitted.flatMap((fragment, index) => {
    return (index < mentions.length
      ? [fragment, replacer(mentions[index], markup)]
      : [fragment]);
  });
  return result;
}

export default function markup(text) {
  let processedText = [text];
  // find matched markup and its length
  const processingQueue = [];
  MarkupComponents.forEach(component => {
    const mentions = text.match(component.regexp);
    if (mentions) {
      mentions.forEach((m) => processingQueue.push({
        component,
        size: m.length
      }));
    }
  });
  // start from the longest markup elements, which may contain others
  processingQueue
    .sort((a, b) => b.size - a.size)
    .forEach(({ component }) => {
      processedText = processedText.flatMap(
        (item) => replaceWithComponent(
          item,
          component.regexp,
          component.replacer
        )
      );
    });
  return processedText.map((item, index) =>
    typeof item === 'string' && containsHTML(item)
      ? HTMLFragment({index, item})
      : item
  );
}

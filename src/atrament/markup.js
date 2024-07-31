import MarkupComponents from 'src/components/markup';
import HTMLFragment from 'src/components/markup/html-fragment';

const containsHTML = (str) => /<\/?[a-z][\s\S]*>/i.test(str);

function replaceWithComponent(text, regexp, replacer, isInactive) {
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
      ? [fragment, replacer(mentions[index], (item) => markup(item, isInactive), isInactive)]
      : [fragment]);
  });
  return result;
}

export default function markup(text, isInactive) {
  let processedText = [text];
  MarkupComponents.forEach(component => {
    processedText = processedText.flatMap(
      (item) => replaceWithComponent(
        item,
        component.regexp,
        component.replacer,
        isInactive
      )
    );
  });
  return processedText.map((item, index) =>
    typeof item === 'string' && containsHTML(item)
      ? HTMLFragment({index, item})
      : item
  );
}

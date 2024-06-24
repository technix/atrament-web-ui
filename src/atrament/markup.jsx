import { h } from 'preact';

import MarkupComponents from 'src/components/markup';

const containsHTML = (str) => /<\/?[a-z][\s\S]*>/i.test(str);

function replaceWithComponent(text, regexp, replacer, isInactive) {
  let result = text;
  if (typeof text !== 'string') {
    return result;
  }
  const splitted = text.split(regexp);
  const mentions = text.match(regexp);
  if (mentions) {
    result = splitted.flatMap((fragment, index) => {
      return (index < mentions.length
        ? [fragment, replacer(mentions[index], (item) => markup(item, isInactive), isInactive)]
        : [fragment]);
    });
  }
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
  return processedText.filter(item => item).map((item, index) => 
    typeof item === 'string' && containsHTML(item)
      ? <span key={index} dangerouslySetInnerHTML={{__html: item}} />
      : item
  );
}

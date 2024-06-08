import { h } from 'preact';

import MarkupComponents from 'src/components/markup';

function replaceWithComponent(text, regexp, replacer) {
  const splitted = text.split(regexp);
  const mentions = text.match(regexp);
  let result = text;
  if (mentions) {
    result = splitted.flatMap((fragment, index) => {
      const htmlFragment = <span dangerouslySetInnerHTML={{__html: fragment}} />
      return (index < mentions.length
        ? [htmlFragment, replacer(mentions[index])]
        : [htmlFragment]);
    });
  }
  return result;
}

export default function markup(text) {
  let processedText = text;
  MarkupComponents.forEach(component => {
    processedText = replaceWithComponent(
      processedText, 
      component.regexp, 
      component.replacer
    );  
  });
  return processedText;
}
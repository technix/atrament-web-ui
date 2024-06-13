import { h } from 'preact';
import sanitizeHtml from 'sanitize-html';

import MarkupComponents from 'src/components/markup';

const containsHTML = (str) => /<\/?[a-z][\s\S]*>/i.test(str);

const scrubHTML = (str) => {
  return sanitizeHtml(str, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
  });
};


function replaceWithComponent(text, regexp, replacer) {
  let result = text;
  if (typeof text !== 'string') {
    return result;
  }
  const splitted = text.split(regexp);
  const mentions = text.match(regexp);
  if (mentions) {
    result = splitted.flatMap((fragment, index) => {
      return (index < mentions.length
        ? [fragment, replacer(mentions[index], markup)]
        : [fragment]);
    });
  }
  return result;
}

export default function markup(text) {
  let processedText = [text];
  MarkupComponents.forEach(component => {
    processedText = processedText.flatMap(
      (item) => replaceWithComponent(
        item, 
        component.regexp, 
        component.replacer
      )
    );
  });
  return processedText.filter(item => item).map((item, index) => 
    typeof item === 'string' && containsHTML(item)
      ? <span key={index} dangerouslySetInnerHTML={{__html: scrubHTML(item)}} />
      : item
  );
}

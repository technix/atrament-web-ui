import MarkupComponents from 'src/components/markup';
import HTMLFragment from 'src/components/markup/html-fragment';
import getTagAttributes from 'src/utils/get-tag-attributes';

const containsHTML = (str) => /<\/?[a-z][\s\S]*>/i.test(str);

function getRegex(tagName, options = {}) {
  /*
    The following options are allowed:
      [tag][/tag]
      [tag=option][/tag]
      [tag option1=value option2=value][/tag]
    when {single:true}:
      [tag]
      [tag=option]
      [tag option1=value1 option2=value2]
  */
  let matcher = new RegExp(`\\[${tagName}(?:=[^\\]]+|\\s+[^\\]]+)?\\].*?\\[\\/${tagName}\\]`, 'ig');
  let parser = new RegExp(`\\[${tagName}(.*?)\\](.*?)\\[\\/${tagName}\\]`, 'i');
  if (options.single) {
    matcher = new RegExp(`\\[${tagName}(?:=[^\\]]+|\\s+[^\\]]+)?\\]`, 'ig');
    parser = new RegExp(`\\[${tagName}(.*?)\\]`, 'i');
  }
  return {
    matcher,
    parser
  }
}

// modify markup components: add 'regex' property
MarkupComponents.forEach(component => {
  component.regex = getRegex(component.tag, component.tagOptions);
});


function parseTag(item, regex, replacer) {
  const parsed = item.match(regex.parser);
  let attributes = parsed[1];
  if (attributes.startsWith('=')) {
    attributes = `DEFAULT${attributes}`;
  }
  const options = getTagAttributes(attributes);
  return replacer(options, parsed[2], markup);
}


function replaceWithComponent(text, regex, replacer) {
  if (typeof text !== 'string') {
    return text;
  }
  const mentions = text.match(regex.matcher);
  if (!mentions) {
    return text;
  }
  const splitted = text.split(regex.matcher);
  const result = splitted.flatMap((fragment, index) => {
    return (index < mentions.length
      ? [fragment, parseTag(mentions[index], regex, replacer)]
      : [fragment]);
  });
  return result;
}


export default function markup(text) {
  let processedText = [text];
  // find matched markup and its length
  const processingQueue = [];
  MarkupComponents.forEach(component => {
    const mentions = text.match(component.regex.matcher);
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
          component.regex,
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

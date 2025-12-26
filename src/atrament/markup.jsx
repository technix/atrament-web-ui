import { h, Fragment } from 'preact';
import markupTags from 'src/components/markup';
import getTagAttributes from 'src/utils/get-tag-attributes';

const containsHTML = (str) => /<\/?[a-z][\s\S]*>/i.test(str);
const HTMLFragment = ({ index, item }) => (<span key={index} dangerouslySetInnerHTML={{ __html: item }} />);

const tagRe = /\[(\/?)(\w+)([^\]]*)\]/g;

function parseBBCode(input) {
  const root = { children: [] };
  const stack = [root];

  if (!input) {
    return root;
  }

  let cursor = 0;
  tagRe.lastIndex = 0;

  while (true) {
    const match = tagRe.exec(input);
    const parent = stack[stack.length - 1];

    if (!match) break;

    const [, closing, name, rawOptions] = match;
    const index = match.index;

    // text before tag
    if (index > cursor) {
      parent.children.push({
        type: "text",
        value: input.slice(cursor, index)
      });
    }

    const thisTag = markupTags[name];
    const isRaw = thisTag?.tagOptions?.raw;
    const isSingle = thisTag?.tagOptions?.single;

    // unknown tag: emit as text and skip
    if (!thisTag && !closing) {
      const closeRe = new RegExp(`\\[\\/${name}\\]`, "gi");
      closeRe.lastIndex = tagRe.lastIndex;

      const closeMatch = closeRe.exec(input);
      const end = closeMatch
        ? closeMatch.index + closeMatch[0].length
        : input.length;

      parent.children.push({
        type: "text",
        value: input.slice(index, end)
      });

      cursor = end;
      tagRe.lastIndex = end;
      continue;
    }

    // normal open tag
    if (!closing) {
      const node = {
        type: "tag",
        name,
        options: getTagAttributes(rawOptions.trim()),
        children: [],
        raw: isRaw,
        key: Math.random()
      };

      parent.children.push(node);

      if (isSingle) {
        cursor = tagRe.lastIndex;
        continue;
      }

      // raw tag: consume everything as text
      if (isRaw) {
        const closeRe = new RegExp(`\\[\\/${name}\\]`, "gi");
        closeRe.lastIndex = tagRe.lastIndex;

        const closeMatch = closeRe.exec(input);
        const rawEnd = closeMatch
          ? closeMatch.index
          : input.length;

        node.children.push({
          type: "text",
          value: input.slice(
            tagRe.lastIndex,
            rawEnd
          )
        });

        cursor = closeMatch
          ? closeMatch.index + closeMatch[0].length
          : input.length;

        tagRe.lastIndex = cursor;
        continue;
      }
      stack.push(node);
    } else if (parent.name === name) {
      stack.pop();
    }
    cursor = tagRe.lastIndex;
  }

  // remaining text
  if (cursor < input.length) {
    stack[stack.length - 1].children.push({
      type: "text",
      value: input.slice(cursor)
    });
  }

  return root;
}


function render(node) {
  if (node.type === "text") {
    if (containsHTML(node.value)) {
      return HTMLFragment({ index: Math.random(), item: node.value });
    }
    return node.value;
  };

  if (markupTags[node.name]?.replacer) {
    // old-style components with replacers
    const replacer = markupTags[node.name]?.replacer ?? ((options, content) => <>{content}</>);
    return replacer(node.options, node.raw ? node.children[0]?.value : node.children.map(render), (i) => i);
  }

  const Component = markupTags[node.name]?.component ?? Fragment;
  return (<Component key={node.key} options={node.options} markupRenderer={markup}>
    {node.raw ? node.children[0]?.value : node.children.map(render)}
  </Component>);
}

export default function markup(text) {
  const ast = parseBBCode(text);
  return render(ast);
}

import { h } from 'preact';

import markup from 'src/atrament/markup';

const Paragraph = ( {content, isCurrent} ) => {
  if (content.text === "\n") {
    return <></>;
  }

  let pStyle;
  if (!isCurrent) {
    pStyle = {opacity: '70%'};
  }

  let pClass = content.tags.CLASS;
  if (Array.isArray(pClass)) {
    pClass = pClass.join(' ');
  }

  return (<p style={pStyle} class={pClass}>{markup(content.text, !isCurrent)}</p>);
}

export default Paragraph;

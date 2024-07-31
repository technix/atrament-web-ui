import { h } from 'preact';

import Markup from 'src/components/ui/markup';

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

  return (<p style={pStyle} class={pClass}><Markup content={content.text} isInactive={!isCurrent} /></p>);
}

export default Paragraph;

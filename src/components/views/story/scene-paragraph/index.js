import { h } from 'preact';

import markup from 'src/atrament/markup';

const Paragraph = ( {content, isCurrent} ) => {
  let pStyle;
  if (!isCurrent) {
    pStyle = {opacity: '70%'};
  }
  if (content === "\n") {
    return '';
  }
  const transformedContent = markup(content);
  return (<p style={pStyle}>{transformedContent}</p>);
}

export default Paragraph;

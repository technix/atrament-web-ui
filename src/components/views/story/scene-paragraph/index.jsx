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
  return (<p style={pStyle}>{markup(content, !isCurrent)}</p>);
}

export default Paragraph;

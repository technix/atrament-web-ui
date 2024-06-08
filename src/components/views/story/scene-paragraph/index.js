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
  if (Array.isArray(transformedContent)) {
    return (<p style={pStyle}>{transformedContent}</p>);  
  }
  return (<p style={pStyle} dangerouslySetInnerHTML={{__html: transformedContent}} />);
}

export default Paragraph;

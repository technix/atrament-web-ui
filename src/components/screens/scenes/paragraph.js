import { h } from 'preact';

const Paragraph = ( {content, isCurrent} ) => {
  let pStyle;
  if (!isCurrent) {
    pStyle = {opacity: '70%'};
  }
  if (content === "\n") {
    return '';
  }
  return (<p style={pStyle} dangerouslySetInnerHTML={{__html: content}} />);
}

export default Paragraph;

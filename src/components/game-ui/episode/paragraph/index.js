import { h } from 'preact';

import hyphenate from '_src_/lib/hyphens';

function paragraphStyle(text) {
  return text.indexOf('<') === 0 ? '' : 'indented';
}


function paragraphText(hyphens, text) {
  text = text
    .replace(/--/g, '—')              // emdash
    .replace(/"([^"]*)"/g, '«$1»');   // quotes

  if (hyphens) {
    text = hyphenate(text);
  }

  return text;
}

// paragraph component
const Paragraph = ({ hyphens, text }) => (
  <p class={paragraphStyle(text)} dangerouslySetInnerHTML={{ __html: paragraphText(hyphens, text) }} />
);

export default Paragraph;

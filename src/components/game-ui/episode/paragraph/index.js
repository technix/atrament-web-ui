import { h } from 'preact';

import { fmtText } from 'src/lib/typography';

function paragraphStyle(text) {
  return [
    'ui-paragraph',
    text.indexOf('<') === 0 ? '' : 'indented'
  ].join(' ');
}

// paragraph component
const Paragraph = ({ hyphens, text }) => (
  <p class={paragraphStyle(text)} dangerouslySetInnerHTML={{ __html: fmtText(text, { hyphens }) }} />
);

export default Paragraph;

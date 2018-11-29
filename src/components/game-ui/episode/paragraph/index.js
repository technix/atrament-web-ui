
import { h } from 'preact';
import { connect } from 'unistore/preact';
import style from './style';

import hyphenate from '_src_/lib/hyphens';

// paragraph component
const Paragraph = ({ hyphens, text }) => (
  <div class={[
    style.paragraph,
    hyphens ? 'justified' : ''
  ].join(' ')}
  >
    { text.map((line) => <p class={line.indexOf('<') === 0 ? '' : 'indented'} dangerouslySetInnerHTML={{ __html: hyphens ? hyphenate(line) : line }} />) }
  </div>
);

export default connect('hyphens')(Paragraph);

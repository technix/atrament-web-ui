
import { h } from 'preact';
import { connect } from 'unistore/preact';
import style from './style';

import hyphenate from '../../../../lib/hyphens';

// paragraph component
const Paragraph = ({ hyphens, text }) => (
  <div class={[
    style.paragraph,
    hyphens ? 'justified' : '',
    text[0].indexOf('<') === 0 ? '' : 'indented'
  ].join(' ')}
  >
    { text.map((line) => <p dangerouslySetInnerHTML={{ __html: hyphens ? hyphenate(line) : line }} />) }
  </div>
);

export default connect('hyphens')(Paragraph);

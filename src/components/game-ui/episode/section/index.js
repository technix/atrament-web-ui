
import { h } from 'preact';
import { connect } from '_src_/store';
import style from './style';

import Paragraph from '../paragraph';

// paragraph component
const Section = ({ hyphens, text }) => (
  <div class={[
    style.section,
    'ui-section',
    hyphens ? 'justified' : ''
  ].join(' ')}
  >
    { text.map((line) => <Paragraph text={line} hyphens={hyphens} />) }
  </div>
);

export default connect('hyphens')(Section);

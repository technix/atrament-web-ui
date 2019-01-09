
import { h } from 'preact';
import { connect } from 'unistore/preact';
import style from './style';

import Paragraph from '../paragraph';

// paragraph component
const Section = ({ hyphens, text }) => (
  <div class={[
    style.section,
    hyphens ? 'justified' : ''
  ].join(' ')}
  >
    { text.map((line) => <Paragraph text={line} hyphens={hyphens} />) }
  </div>
);

export default connect('hyphens')(Section);

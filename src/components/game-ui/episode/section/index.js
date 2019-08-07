
import { h } from 'preact';
import { connect } from '_src_/store';
import style from './style';

import Paragraph from '../paragraph';

// paragraph component
const Section = ({ settings, text }) => text.length === 0 ? '' : (
  <div class={[
    style.section,
    'ui-section',
    settings.hyphens ? 'justified' : ''
  ].join(' ')}
  >
    <hr />
    { text.map((line) => <Paragraph text={line} hyphens={settings.hyphens} />) }
  </div>
);

export default connect('settings')(Section);

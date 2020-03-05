
import { h } from 'preact';
import { connect } from 'src/store';
import style from './style';

import Paragraph from '../paragraph';
import Image from '../image';

// paragraph component
const Section = ({ settings, text }) => text.length === 0 ? '' : (
  <div class={[
    style.section,
    'ui-section',
    settings.hyphens ? 'justified' : ''
  ].join(' ')}
  >
    <hr />
    { text.map((line) => {
      if (line.startsWith('::IMAGE')) {
        return (<Image config={line} />);
      }
      return (<Paragraph text={line} hyphens={settings.hyphens} />);
    }) }
  </div>
);

export default connect('settings')(Section);

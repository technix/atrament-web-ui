import { h } from 'preact';

import Ripple from 'src/components/blocks/animation-ripple';
import Spinner from 'src/components/blocks/animation-spinner';
import Grid from 'src/components/blocks/animation-grid';
import Fold from 'src/components/blocks/animation-fold';
import Blip from 'src/components/blocks/animation-blip';
import Bounce from 'src/components/blocks/animation-bounce';

// loading block
const RippleDemo = () => (
  <div style="display:flex;align-items:center;justify-content:center;flex-direction:row;flex-wrap:wrap;height:100vh;background-color:#333366;">
    <div style="margin:20px; width: 100px; height: 100px;">
      <Ripple />
    </div>
    <div style="margin:20px; width: 100px; height: 100px;">
      <Spinner />
    </div>
    <div style="margin:20px; width: 100px; height: 100px;">
      <Grid />
    </div>
    <div style="margin:20px; width: 100px; height: 100px;">
      <Fold />
    </div>
    <div style="margin:20px; width: 100px; height: 100px;">
      <Blip />
    </div>
    <div style="margin:20px; width: 100px; height: 100px;">
      <Bounce />
    </div>
  </div>
);

export default RippleDemo;
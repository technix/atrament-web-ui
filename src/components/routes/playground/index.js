import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

import DemoMap2 from './demo/map2';
import DemoParallax from './demo/parallax';

const Playground = ({ subcomponent }) => {
  let render;
  switch (subcomponent) {
  case 'map2':
    render = (
      <DemoMap2 />
    );
    break;
  case 'parallax':
    render = (
      <DemoParallax />
    );
    break;
  default:
    render = (
      <div class={style.playground}>
        <h1>Playground</h1>
        <Link href="/" class={style.btn}>Back to menu</Link>
        <ul>
          <li><Link href="/playground/map2">Map 2</Link></li>
          <li><Link href="/playground/parallax">Parallax</Link></li>
          <li>3</li>
          <li>4</li>
        </ul>
      </div>
    );
  }
  return render;
};

export default Playground;

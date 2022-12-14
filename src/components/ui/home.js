import { h } from 'preact';

import Toolbar from './toolbar';

const UIHome = ({ menu }) => (
  <div class='atrament-container'>
    <Toolbar />
    <div class='atrament-flex-container'>
      <h1>Home</h1>
      <p>This is main app screen. </p>
      <ul>
        {menu.map((item) => item && <li>{item}</li>)}
      </ul>
    </div>
  </div>
);

export default UIHome;
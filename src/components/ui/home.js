import { h } from 'preact';

import UIToolbar from './toolbar';

const UIHome = ({ menu }) => (
  <div class='atrament-container'>
    <UIToolbar />
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
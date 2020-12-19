import { h } from 'preact';

const UIHome = ({ menu }) => (
  <div>
    <h1>Home</h1>
    <p>This is main app screen. </p>
    <ul>
      {menu.map((item) => item && <li>{item}</li>)}
    </ul>
  </div>
);

export default UIHome;
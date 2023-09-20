import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './index.css';

const LinkHome = () => (
  <div>
    <Link key="mainmenu" href="/" class={style.link_home}>Exit to main menu</Link>
  </div>
);

export default LinkHome;

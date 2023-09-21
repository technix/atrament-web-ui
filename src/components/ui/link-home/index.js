import { h } from 'preact';
import { Link } from 'preact-router/match';
import Block from '../block';
import style from './index.css';

const LinkHome = () => (
  <Block>
    <Link key="mainmenu" href="/" class={style.link_home}>The end</Link>
  </Block>
);

export default LinkHome;

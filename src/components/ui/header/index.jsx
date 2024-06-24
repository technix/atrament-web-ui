import { h } from 'preact';
import style from './index.module.css';

const Header = ({ children }) => (
  <div class={[style.header, 'atrament-header'].join(' ')}>
    <div class={style.header_align}>
      {children}
    </div>
  </div>
);

export default Header;
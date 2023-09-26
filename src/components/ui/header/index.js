import { h } from 'preact';
import style from './index.css';

const Header = ({ children }) => (
  <div class={[style.header, 'atrament-header'].join(' ')}>
    <div class={style.header_align}>
      {children}
    </div>
  </div>
);

export default Header;
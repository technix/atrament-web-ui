import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

const Header = ({ children }) => (
  <div class={clsx(style.header, 'atrament-header')}>
    <div class={style.header_align}>
      {children}
    </div>
  </div>
);

export default Header;

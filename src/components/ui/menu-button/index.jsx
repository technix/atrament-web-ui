import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

const MenuButton = ({ children, key, onClick, accented = false, attributes = {}, className = '' }) => (
  <button
    key={key}
    onClick={onClick}
    class={clsx(
      style.menu_button,
      accented && style.accented_button,
      className,
      'atrament-menu-button'
    )}
    {...attributes}
  >
    {children}
  </button>
);

export default MenuButton;

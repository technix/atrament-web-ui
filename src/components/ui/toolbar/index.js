import { h } from 'preact';
import style from './index.css';

const Toolbar = ({ children }) => (
  <div class={[style.toolbar, 'atrament-toolbar'].join(' ')}>
    {children}
  </div>
);

export default Toolbar;
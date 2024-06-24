import { h } from 'preact';
import style from './index.module.css';

const Container = ({ children }) => (
  <div class={[style.container, 'atrament-container'].join(' ')}>
    {children}
  </div>
);

export default Container;

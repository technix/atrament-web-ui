import { h } from 'preact';
import style from './index.css';

const Container = ({ children }) => (
  <div class={[style.container, 'atrament-container'].join(' ')}>
    {children}
  </div>
);

export default Container;

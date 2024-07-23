import { h } from 'preact';
import componentStyle from './index.module.css';

const Container = ({ children, style = {} }) => (
  <div style={style} class={[componentStyle.container, 'atrament-container'].join(' ')}>
    {children}
  </div>
);

export default Container;

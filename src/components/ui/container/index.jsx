import { h } from 'preact';
import clsx from 'clsx';
import componentStyle from './index.module.css';

const Container = ({ children, style = {}, className= '' }) => (
  <div style={style} class={clsx(componentStyle.container, 'atrament-container', className)}>
    {children}
  </div>
);

export default Container;

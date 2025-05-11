import { h } from 'preact';
import clsx from 'clsx';
import componentStyle from './index.module.css';

const Container = ({ children, style = {} }) => (
  <div style={style} class={clsx(componentStyle.container, 'atrament-container')}>
    {children}
  </div>
);

export default Container;

import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

export default {
  tag: '---',
  tagOptions: { single: true },
  component: ({ options }) => {
    return (<hr
      class={clsx(style.separator, 'atrament-tag-separator', options.class)}
      style={{ width: options.width || '60%' }}
    />);
  }
}

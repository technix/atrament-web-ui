import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';
import Markup from 'src/components/ui/markup';

import useToolbarContent from 'src/content/use-toolbar-content';

const Toolbar = () => {
  const toolbarContent = useToolbarContent();
  return (
    <div class={clsx(style.toolbar, 'atrament-toolbar')}>
      <Markup content={toolbarContent} />
    </div>
  )
};

export default Toolbar;

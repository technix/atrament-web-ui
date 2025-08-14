import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

// [info font=system side=highlight]text in info block[/info]

const InfoBlock = ({children, options}) => {
  const classList = clsx(
    style.infoblock,
    options.font === 'system' && style.font_ui,
    options.side === 'accent' && style.side_accent,
    options.side === 'highlight' && style.side_highlight
  );
  return (<div class={classList}>{children}</div>);
};

export default {
  tag: 'info',
  replacer: (options, content, markup) => <InfoBlock options={options}>{markup(content)}</InfoBlock>
}

import { h } from 'preact';
import style from './index.module.css';

// [info font=system side=highlight]text in info block[/info]

import getTagAttributes from 'src/utils/get-tag-attributes';

const InfoBlock = ({children, options}) => {
  const classList = [
    style.infoblock,
    options.font === 'system' ? style.font_ui : '',
    options.side === 'accent' ? style.side_accent : '',
    options.side === 'highlight' ? style.side_highlight : ''
  ].join(' ');
  return (<div class={classList}>{children}</div>);
};

export default {
  regexp: /\[info(?:\s+[^\]]+)?\].*?\[\/info\]/ig,
  replacer: (el, markup) => {
    const fragments = el.match(/\[info(.*?)\](.*?)\[\/info\]/i);
    const options = getTagAttributes(fragments[1]);
    return (<InfoBlock options={options}>{markup(fragments[2])}</InfoBlock>);
  }
}

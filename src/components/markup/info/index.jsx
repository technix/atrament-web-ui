import { h } from 'preact';
import style from './index.module.css';

// [info font=system side=highlight]text in info block[/info]

import getTagAttributes from 'src/utils/get-tag-attributes';

const InfoBlock = ({children, options}) => {
  const classes = [style.infoblock];
  if (options.font === 'system') {
    classes.push(style.font_ui);
  }
  if (options.side) {
    if (options.side === 'accent') {
      classes.push(style.side_accent);
    } else {
      classes.push(style.side_highlight);
    }
  }
  return (<div class={classes.join(' ')}>{children}</div>);
};

export default {
  regexp: /\[info.*?\].*?\[\/info\]/ig,
  replacer: (el, markup) => {
    const fragments = el.match(/\[info(.*?)\](.*?)\[\/info\]/i);
    const options = getTagAttributes(fragments[1]);
    return (<InfoBlock options={options}>{markup(fragments[2])}</InfoBlock>);
  }
}

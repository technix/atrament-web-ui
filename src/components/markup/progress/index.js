import { h } from 'preact';
import style from './index.css';

const Progress = ({options, children}) => {
  const min = +options.min || 0;
  const max = +options.max || 100;
  const value = +options.value || 0;
  let width = value ? ((value - min) * 100)/(max - min) : 0;
  if (width > 100) {
    width = 100;
  }
  if (width < 0) {
    width = 0;
  }

  const styles = [style.progress_bar];
  if (options.style === 'accent') {
    styles.push(style.accent);
  } else {
    styles.push(style.standard);
  }

  return (
    <div class={style.progress_frame}>
      <div class={styles.join(' ')} style={{width:`${width}%`}} />
      <div class={style.progress_content}>{children}&nbsp;</div>
    </div> 
  );
};

export default {
  regexp: /\[progress.+?\].*?\[\/progress\]/ig,
  replacer: (el, markup) => {
    const fragments = el.match(/\[progress(.+?)\](.*?)\[\/progress\]/i);
    const options = {};
    fragments[1].split(/\s+/).forEach((item) => {
      if (item) {
        const [,name, value] = item.match(/(.+)=(.+)/);
        if (name) {
          options[name] = value;
        }
      }
    });
    return (<Progress options={options}>{markup(fragments[2])}</Progress>);
  }
}

import { h } from 'preact';
import style from './index.module.css';

import Markup from 'src/components/ui/markup';

const Paragraph = ( {content, isCurrent} ) => {
  if (content.text === "\n") {
    return <></>;
  }

  let pStyle;
  if (!isCurrent) {
    pStyle = {opacity: '70%'};
  }

  let pClass = content.tags.CLASS || '';
  if (Array.isArray(pClass)) {
    pClass = pClass.join(' ');
  }

  return (
    <div style={pStyle} class={`${style.paragraph} ${pClass}`}>
      <Markup content={content.text} isActive={isCurrent} />
    </div>
  );
}

export default Paragraph;

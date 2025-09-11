import { h } from 'preact';
import TextParagraph from 'src/components/ui/text-paragraph';

import Markup from 'src/components/ui/markup';

const Paragraph = ( {content, isCurrent} ) => {
  if (content.text === "\n") {
    return <></>;
  }

  return (
    <TextParagraph active={isCurrent} class_override={content.tags.CLASS}>
      <Markup content={content.text} isActive={isCurrent} />
    </TextParagraph>
  );
}

export default Paragraph;

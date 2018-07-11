import { h } from 'preact';

const Paragraph = ({ text, cssClass }) => (
  <p class={cssClass}>
    {text}
  </p>
);

export default Paragraph;

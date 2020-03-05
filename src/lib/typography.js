import hyphenate from 'src/lib/hyphens';

function fmtText(text, options) {
  text = text
    .replace(/--/g, '—')              // emdash
    .replace(/"([^"]*)"/g, '«$1»');   // quotes

  if (options && options.hyphens) {
    text = hyphenate(text);
  }

  return text;
}

export {
  fmtText
};

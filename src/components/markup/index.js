import htmlTags from "./html";

const markupTagModules = import.meta.glob('./*/*.jsx', { eager: true });

const markupTags = Object.values(markupTagModules)
  .reduce((allTags, { default: tagModule }) => { allTags[tagModule.tag] = tagModule; return allTags; }, {});

export default { ...markupTags, ...htmlTags };


const markupTags = import.meta.glob('./*/*.jsx', { eager: true });
export default Object.values(markupTags).map(({default: tagModule}) => tagModule);

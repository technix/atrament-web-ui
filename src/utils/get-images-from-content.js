import getMarkupRegex from 'src/utils/get-markup-regex';

const imageRegexes = [getMarkupRegex('img'), getMarkupRegex('picture')];

export default function getImagesFromContent(contentArray) {
  if (!contentArray) {
    return [];
  }
  const images = {};
  contentArray.forEach((content) => {
    imageRegexes.forEach((regex) => {
      content?.match(regex.matcher)?.forEach((item) => {
        const parsed = item.match(regex.parser);
        images[parsed[2]] = true;
      });
    });
  });
  return Object.keys(images);
}

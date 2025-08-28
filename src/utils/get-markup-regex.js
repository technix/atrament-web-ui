export default function getMarkupRegex(tagName, options = {}) {
  /*
    The following options are allowed:
      [tag][/tag]
      [tag=option][/tag]
      [tag option1=value option2=value][/tag]
    when {single:true}:
      [tag]
      [tag=option]
      [tag option1=value1 option2=value2]
  */
  let matcher = new RegExp(`\\[${tagName}(?:=[^\\]]+|\\s+[^\\]]+)?\\].*?\\[\\/${tagName}\\]`, 'ig');
  let parser = new RegExp(`\\[${tagName}(.*?)\\](.*?)\\[\\/${tagName}\\]`, 'i');
  if (options.single) {
    matcher = new RegExp(`\\[${tagName}(?:=[^\\]]+|\\s+[^\\]]+)?\\]`, 'ig');
    parser = new RegExp(`\\[${tagName}(.*?)\\]`, 'i');
  }
  return {
    matcher,
    parser
  }
}

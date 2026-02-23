export default function getSaveDescription(atrament) {
  // if ATRAMENT_SAVE_DESCRIPTION variable is present, use it
  const description = atrament.ink.getVariable('ATRAMENT_SAVE_DESCRIPTION');
  if (description) {
    return description;
  }
  // otherwise, read scene description
  const { metadata, scenes } = atrament.state.get();
  const EXCERPT_LENGTH = +metadata.save_description_length;
  if (!scenes || !EXCERPT_LENGTH) {
    return '';
  }
  // get scene first line
  const firstLine = scenes[scenes.length - 1].text[0];
  // remove markup tags and html tags
  const saveDescription = firstLine
    .replaceAll(/\[.+?\]/gi, '')
    .replaceAll(/<.+?>/gi, '');
  // create description
  let cutDescription = saveDescription.substring(0, EXCERPT_LENGTH);
  if (cutDescription !== saveDescription) {
    cutDescription += '...';
  }
  return cutDescription;
}

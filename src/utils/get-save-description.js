// removes markup tags and html tags
const stripMarkup = (line = '') => line
  .replaceAll(/\[img.*?\].+?\[\/img\]/gi, '')
  .replaceAll(/\[picture.*?\].+?\[\/picture\]/gi, '')
  .replaceAll(/\[video.*?\].+?\[\/video\]/gi, '')
  .replaceAll(/\[.+?\]/gi, '')
  .replaceAll(/<.+?>/gi, '');

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
  // get scene first non-empty line
  const sceneText = scenes[scenes.length - 1]?.text || [];
  const saveDescription = sceneText
    .map(stripMarkup)
    .find((line) => line.trim()) || '';
  // create description
  let cutDescription = saveDescription.substring(0, EXCERPT_LENGTH);
  // if description can be cut or it is empty
  if (cutDescription !== saveDescription || !cutDescription?.trim()) {
    cutDescription += '...';
  }
  return cutDescription;
}

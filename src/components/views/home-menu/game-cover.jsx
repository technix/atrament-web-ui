import { h } from 'preact';
import { useTranslator } from '@eo-locale/preact';
import { useAtrament, useAtramentState } from 'src/atrament/hooks';

import ContainerImage from 'src/components/ui/container-image';
import Header from 'src/components/ui/header';

const GameCover = () => {
  const { getAssetPath } = useAtrament();
  const translator = useTranslator();
  const atramentState = useAtramentState(['metadata']);
  const { title, author, cover, title_screen_layout } = atramentState.metadata;
  const [ coverImage, coverSize ] = (cover || '').split(' ');
  const LayoutElements = {
    cover: coverImage
      ? <ContainerImage src={getAssetPath(coverImage)} options={coverSize ? {width: coverSize} : {}} />
      : '',
    title: <h1>{title ? title : translator.translate('default.title')}</h1>,
    author: <p>{author ? author : translator.translate('default.author')}</p>
  };
  const layout = (title_screen_layout || 'cover, title, author').split(/\s*,\s*/);
  return (
    <Header>
      {layout.map((item) => LayoutElements[item])}
    </Header>
  )
};

export default GameCover;

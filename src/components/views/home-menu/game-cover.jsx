import { h } from 'preact';
import { useTranslator } from '@eo-locale/preact';
import { useAtrament, useAtramentState } from 'src/atrament/hooks';

import ContainerImage from 'src/components/ui/container-image';
import Header from 'src/components/ui/header';

const GameCover = () => {
  const { getAssetPath } = useAtrament();
  const translator = useTranslator();
  const atramentState = useAtramentState(['metadata']);
  const { title, author, cover } = atramentState.metadata;
  const [ coverImage, coverSize ] = (cover || '').split(' ');
  return (
    <Header>
      {coverImage
        ? <ContainerImage src={getAssetPath(coverImage)} options={coverSize ? {width: coverSize} : {}} />
        : ''
      }
      <h1>{title ? title : translator.translate('default.title')}</h1>
      <p>{author ? author : translator.translate('default.author')}</p>
    </Header>
  )
};

export default GameCover;

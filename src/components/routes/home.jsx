import { h } from 'preact';
import { useEffect, useState, useCallback } from 'preact/hooks';
import { useAtrament, useAtramentState } from 'src/atrament/hooks';

import Container from 'src/components/ui/container';
import ContainerFlex from 'src/components/ui/container-flex';

import Menu from 'src/components/menu';
import HomeMenuView from 'src/components/views/home-menu';

import { setPageBackground } from 'src/utils/page-background';

const HomeRoute = () => {
  const { setStateSubkey, canResume, getAssetPath } = useAtrament();
  const atramentState = useAtramentState(['metadata']);
  const { background } = atramentState.metadata;

  const resetBackground = useCallback(() => {
    setStateSubkey('game', 'background', null);
    setStateSubkey('game', 'background_page', null);
  }, [ setStateSubkey ]);

  const [ canBeResumed, setResumeState ] = useState(false);
  useEffect(() => {
    const initHome = async () => {
      const canResumeGame = await canResume();
      setResumeState(!!canResumeGame);
    }
    initHome();
    // reset game background
    resetBackground();
    // set page background
    setPageBackground(background, getAssetPath);
  }, [ resetBackground, canResume, background, getAssetPath ]);

  return (
    <Container>
      <ContainerFlex>
        <Menu />
        <HomeMenuView canBeResumed={canBeResumed} resetBackground={resetBackground} />
      </ContainerFlex>
    </Container>
  );
};

export default HomeRoute;
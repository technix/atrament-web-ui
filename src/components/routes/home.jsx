import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { useAtrament, useAtramentState } from 'src/atrament/hooks';

import Container from 'src/components/ui/container';
import ContainerFlex from 'src/components/ui/container-flex';

import Menu from 'src/components/menu/main-menu';
import { SessionsMenuView, HomeMenuView } from 'src/components/menu/home-menu';

import { setPageBackground } from 'src/utils/page-background';

const HomeRoute = () => {
  const { getAssetPath, resetBackground } = useAtrament();
  const atramentState = useAtramentState(['metadata']);
  const { background, sessions } = atramentState.metadata;

  useEffect(() => {
    // reset game background
    resetBackground();
    // set page background
    setPageBackground(background, getAssetPath);
  }, [ resetBackground, background, getAssetPath ]);

  return (
    <Container>
      <ContainerFlex cssClass='font-face-game'>
        <Menu isHomeScreen />
        { sessions ? <SessionsMenuView /> : <HomeMenuView /> }
      </ContainerFlex>
    </Container>
  );
};

export default HomeRoute;

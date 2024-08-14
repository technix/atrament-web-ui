import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { useAtrament, useAtramentState } from 'src/atrament/hooks';

import Container from 'src/components/ui/container';
import ContainerFlex from 'src/components/ui/container-flex';

import Menu from 'src/components/menu';
import { SessionsMenuView, HomeMenuView } from 'src/components/views/home-menu';

import { setPageBackground } from 'src/utils/page-background';

const HomeRoute = () => {
  const { canResume, getAssetPath, resetBackground } = useAtrament();
  const atramentState = useAtramentState(['metadata']);
  const { background, sessions } = atramentState.metadata;

  useEffect(() => {
    // reset game background
    resetBackground();
    // set page background
    setPageBackground(background, getAssetPath);
  }, [ resetBackground, canResume, background, getAssetPath ]);

  return (
    <Container>
      <ContainerFlex>
        <Menu isHomeScreen />
        { sessions? <SessionsMenuView /> : <HomeMenuView /> }
      </ContainerFlex>
    </Container>
  );
};

export default HomeRoute;
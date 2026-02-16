import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { useAtrament, useAtramentState } from 'src/atrament/hooks';

import Container from 'src/components/ui/container';
import ContainerFlex from 'src/components/ui/container-flex';
import ErrorScreen from 'src/components/screens/error';

import Menu from 'src/components/menu/main-menu';
import { SessionsMenuView, HomeMenuView } from 'src/components/menu/home-menu';

import { setBackground } from 'src/utils/background';

const HomeRoute = () => {
  const { getAssetPath, resetBackground } = useAtrament();
  const atramentState = useAtramentState(['metadata']);
  const { background, sessions } = atramentState.metadata;

  useEffect(() => {
    // reset game background
    resetBackground();
    // set page background
    setBackground(document.getElementById('atrament-app'), background, getAssetPath);
  }, [ resetBackground, background, getAssetPath ]);

  return (
    <Container>
      <ContainerFlex className='font-face-game'>
        <ErrorScreen />
        <Menu isHomeScreen />
        { sessions ? <SessionsMenuView /> : <HomeMenuView /> }
      </ContainerFlex>
    </Container>
  );
};

export default HomeRoute;

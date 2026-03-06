import { h } from 'preact';
import Container from 'src/components/ui/container';
import ContainerFlex from 'src/components/ui/container-flex';
import ErrorScreen from 'src/components/screens/error';
import Menu from 'src/components/menu/main-menu';
import HomeMenuView from 'src/components/menu/home-menu';

const HomeRoute = () => (
  <Container>
    <ContainerFlex className='font-face-game'>
      <ErrorScreen />
      <Menu isHomeScreen />
      <HomeMenuView />
    </ContainerFlex>
  </Container>
);

export default HomeRoute;

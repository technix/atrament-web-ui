import { h } from 'preact';
import Container from 'src/components/ui/container';
import Menu from 'src/components/menu/main-menu';
import Toolbar from 'src/components/screens/game/toolbar';
import StoryView from 'src/components/screens/game/story';
import OverlayView from 'src/components/screens/game/overlay';
import ErrorScreen from 'src/components/screens/error';

const GameRoute = () => (
  <Container className='atrament-container-game'>
    <Menu />
    <ErrorScreen />
    <Toolbar />
    <OverlayView />
    <StoryView />
  </Container>
);

export default GameRoute;

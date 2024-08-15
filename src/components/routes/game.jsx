import { h } from 'preact';
import { useEffect } from 'preact/hooks';

import { useAtrament, useAtramentState } from 'src/atrament/hooks';

import Container from 'src/components/ui/container';
import Menu from 'src/components/menu';
import ErrorModal from 'src/components/ui/error-modal'

import DebuggerView from 'src/components/views/debugger';
import Toolbar from 'src/components/views/toolbar';
import StoryView from 'src/components/views/story';
import OverlayView from 'src/components/views/overlay';
import { setPageBackground } from 'src/utils/page-background';

const GameRoute = () => {
  const { getAssetPath } = useAtrament();
  const atramentState = useAtramentState(['game']);

  let containerStyle;
  if (atramentState.game.background) {
    containerStyle = {
      'background-image': `url(${getAssetPath(atramentState.game.background)})`,
      'background-size': 'cover',
      'background-position': 'center' 
    }
  }

  const backgroundPage = atramentState.game.background_page;
  useEffect(() => {
    setPageBackground(backgroundPage, getAssetPath);
  }, [ backgroundPage, getAssetPath ]);

  return (
    <Container style={containerStyle}>
      {import.meta.env.MODE === 'development' && <DebuggerView />}
      <Menu />
      <ErrorModal />
      <Toolbar />
      <OverlayView />
      <StoryView />
    </Container>
  );
};

export default GameRoute;

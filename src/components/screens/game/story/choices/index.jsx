import { h } from 'preact';
import { Text } from '@eo-locale/preact';
import { route } from 'preact-router';
import { useAtrament } from 'src/atrament/hooks';
import MenuButton from 'src/components/ui/menu-button';
import ChoiceButtonGroup from '../choice-button-group';
import ClickToContinue from '../click-to-continue';


const EndGameLink = () => {
  const { atrament } = useAtrament();
  const endGame = async () => {
    // remove autosave
    const autosaveSlot = atrament.game.getSaveSlotKey({ type: atrament.game.SAVE_AUTOSAVE })
    await atrament.game.removeSave(autosaveSlot);
    // go to home screen
    route('/');
  };
  return (<MenuButton accented key='game-end' onClick={endGame} className='atrament-game-end'><Text id={'game.end'} /></MenuButton>);
};

const Choices = ({ key, currentScene, setReady, hideChoices = false }) => {
  const numberOfChoices = currentScene?.choices ? currentScene.choices.length : -1;
  if (numberOfChoices === 1) {
    const isClickToContinue = currentScene.choices[0].choice.match(/^(|>>>(\d*|\(.+?\)))$/);
    if (isClickToContinue) {
      // click-to-continue choice
      return (<ClickToContinue setReady={setReady} withChoice options={isClickToContinue[2]} />);
    }
  } else if (numberOfChoices === 0) {
    if (currentScene.canContinue) {
      // paragraph mode
      return (<ClickToContinue setReady={setReady} options='(animation=3)' />);
    }
    // end game
    return (<EndGameLink />);
  }
  if (hideChoices || !currentScene) {
    return <></>;
  }
  return (
    <ChoiceButtonGroup
      key={key}
      currentScene={currentScene}
      setReady={setReady}
    />
  );
};

export default Choices;

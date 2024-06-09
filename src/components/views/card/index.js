import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import style from './index.css';

import useAtrament from 'src/atrament/hooks';
import markup from 'src/atrament/markup';

import ContainerText from 'src/components/ui/container-text';

const CardView = () => {
  const { atrament, state } = useAtrament();

  const closeCard = useCallback(() => {
    atrament.state.setSubkey('CARD', 'activeCard', null);
    atrament.state.setSubkey('CARD', 'content', '');
  }, [ atrament ]);

  if (!state.CARD.activeCard) {
    return <></>;
  }
  
  const content = state.CARD.content.split('\n');
    
  return (
    <div class={style.card_container}>
      <div class={style.card_header}>
        <button class={style.button_back} onClick={closeCard}>❮</button>
      </div>
      <div class={[style.card, 'atrament-toolbar-card'].join(' ')}>
        <ContainerText fontSize={state.settings.fontSize}>
          {content.map((item, index) => <p key={index}>{markup(item)}</p>)}
        </ContainerText>
      </div>
    </div>
  );
}

export default CardView;
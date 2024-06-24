import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import style from './index.module.css';

import useAtrament from 'src/atrament/hooks';
import markup from 'src/atrament/markup';

import ContainerText from 'src/components/ui/container-text';

const OverlayView = () => {
  const { atrament, state } = useAtrament();

  const closeOverlay = useCallback(() => {
    atrament.state.setSubkey('OVERLAY', 'activeOverlay', null);
    atrament.state.setSubkey('OVERLAY', 'content', '');
  }, [ atrament ]);

  if (!state.OVERLAY.activeOverlay) {
    return <></>;
  }
  
  const content = state.OVERLAY.content.split('\n');
  const title = state.OVERLAY.title;
    
  return (
    <div class={style.overlay_container}>
      <div class={style.overlay_header}>
        <button class={style.button_back} onClick={closeOverlay}>❮</button>
        {title && <div class={style.overlay_title}>{title}</div>}
      </div>
      <div class={[style.overlay_content, 'atrament-overlay'].join(' ')}>
        <ContainerText fontSize={state.settings.fontSize}>
          {content.map((item, index) => <p key={index}>{markup(item)}</p>)}
        </ContainerText>
      </div>
    </div>
  );
}

export default OverlayView;
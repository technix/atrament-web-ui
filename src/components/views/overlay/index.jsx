import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import style from './index.module.css';

import { IconToolbarBack } from 'src/components/ui/icons';

import { useAtrament, useAtramentState } from 'src/atrament/hooks';
import markup from 'src/atrament/markup';

import ContainerText from 'src/components/ui/container-text';

const OverlayView = () => {
  const { setStateSubkey } = useAtrament();
  const atramentState = useAtramentState();

  const closeOverlay = useCallback(() => {
    setStateSubkey('OVERLAY', 'activeOverlay', null);
    setStateSubkey('OVERLAY', 'content', '');
  }, [ setStateSubkey ]);

  if (!atramentState.OVERLAY.activeOverlay) {
    return <></>;
  }
  
  const content = atramentState.OVERLAY.content.split('\n');
  const title = atramentState.OVERLAY.title;
    
  return (
    <div class={style.overlay_container}>
      <div class={style.overlay_header}>
        <button class={style.button_back} onClick={closeOverlay}><IconToolbarBack /></button>
        {title && <div class={style.overlay_title}>{title}</div>}
      </div>
      <div class={[style.overlay_content, 'atrament-overlay'].join(' ')}>
        <ContainerText fontSize={atramentState.settings.fontSize}>
          {content.map((item, index) => <p key={index}>{markup(item)}</p>)}
        </ContainerText>
      </div>
    </div>
  );
}

export default OverlayView;
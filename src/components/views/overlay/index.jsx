import { h } from 'preact';
import style from './index.module.css';

import { IconToolbarBack } from 'src/components/ui/icons';

import { useAtramentState, useAtramentOverlay } from 'src/atrament/hooks';
import markup from 'src/atrament/markup';

import ContainerText from 'src/components/ui/container-text';

const OverlayView = () => {
  const { overlay, closeOverlay } = useAtramentOverlay();
  const atramentState = useAtramentState();

  if (!overlay.active) {
    return <></>;
  }
  
  return (
    <div class={style.overlay_container}>
      <div class={style.overlay_header}>
        <button class={style.button_back} onClick={closeOverlay}><IconToolbarBack /></button>
        {overlay.title && <div class={style.overlay_title}>{overlay.title}</div>}
      </div>
      <div class={[style.overlay_content, 'atrament-overlay'].join(' ')}>
        <ContainerText fontSize={atramentState.settings.fontSize}>
          {overlay.content.map((item, index) => <p key={index}>{markup(item)}</p>)}
        </ContainerText>
      </div>
    </div>
  );
}

export default OverlayView;

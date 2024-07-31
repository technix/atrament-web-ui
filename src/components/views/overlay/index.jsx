import { h } from 'preact';
import style from './index.module.css';

import { IconToolbarBack } from 'src/components/ui/icons';

import { useAtramentOverlay } from 'src/atrament/hooks';

import ContainerText from 'src/components/ui/container-text';
import Markup from 'src/components/ui/markup';

const OverlayView = () => {
  const { overlay, closeOverlay } = useAtramentOverlay();

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
        <ContainerText>
          {overlay.content.map((item, index) => <p key={index}><Markup content={item} /></p>)}
        </ContainerText>
      </div>
    </div>
  );
}

export default OverlayView;

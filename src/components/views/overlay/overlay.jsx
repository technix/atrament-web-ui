import { h } from 'preact';
import style from './index.module.css';
import clsx from 'clsx';

import { IconToolbarBack } from 'src/components/ui/icons';
import ContainerText from 'src/components/ui/container-text';

export default function OverlayPresenter({ children, title, closeOverlay }) {
  return (
    <div class={style.overlay_container}>
      <div class={style.overlay_header}>
        <button class={style.button_back} onClick={closeOverlay}><IconToolbarBack /></button>
        {title && <div class={style.overlay_title}>{title}</div>}
      </div>
      <div class={clsx(style.overlay_content, 'atrament-overlay')}>
        <ContainerText>
          {children}
        </ContainerText>
      </div>
    </div>
  );
}

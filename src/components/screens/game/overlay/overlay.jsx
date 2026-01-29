import { h } from 'preact';
import style from './index.module.css';
import clsx from 'clsx';

import { IconToolbarBack } from 'src/components/ui/icons';
import ContainerText from 'src/components/ui/container-text';

export default function OverlayPresenter({ children, title, closeOverlay }) {
  const containerClasses = clsx(
    style.overlay_container,
    'atrament-overlay-container'
  );
  const headerClasses = clsx(
    style.overlay_header,
    style.overlay_header_bottom_line,
    'atrament-overlay-header'
  );
  const titleClasses = clsx(
    style.overlay_title,
    'atrament-overlay-title'
  );
  const contentClasses = clsx(
    style.overlay_content,
    'atrament-overlay-content'
  );

  return (
    <div class={containerClasses}>
      <div class={headerClasses}>
        <button class={style.button_back} onClick={closeOverlay}><IconToolbarBack /></button>
        {title && <div class={titleClasses}>{title}</div>}
      </div>
      <ContainerText>
        <div class={contentClasses}>
          {children}
        </div>
      </ContainerText>
    </div>
  );
}

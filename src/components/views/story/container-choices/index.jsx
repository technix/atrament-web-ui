import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';
// UI
import Block from 'src/components/ui/block';

const ContainerChoices = ({ children, key, isReady }) => {
  return (
    <div key={key} class={clsx(style.container_choices, 'atrament-container-choices', isReady && 'animation_appear')}>
      <div style={{ opacity: isReady ? 1 : 0 }}>
        <Block>
          {children}
        </Block>
      </div>
    </div>
  )
};

export default ContainerChoices;
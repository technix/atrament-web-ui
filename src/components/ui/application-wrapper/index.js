import { h } from 'preact';
import style from './index.css';
import { useEffect } from 'preact/hooks';

let vh;

function setInnerHeight () {
  if (window.innerHeight !== vh) {
    vh = window.innerHeight;
    document.documentElement.style.setProperty('--screen-vh', `${vh}px`);
  }
}

window.addEventListener('resize', setInnerHeight);

const ApplicationWrapper = ({ children }) => {
  useEffect(setInnerHeight, []);
  return (
    <div class={[style.application_wrapper, 'atrament-ui-app'].join(' ')}>
      {children}
    </div>
  );
};

export default ApplicationWrapper;

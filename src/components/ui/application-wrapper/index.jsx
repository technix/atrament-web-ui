import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

const ApplicationWrapper = ({ children }) => {
  return (
    <div class={clsx(style.application_wrapper, 'atrament-ui-app')}>
      {children}
    </div>
  );
};

export default ApplicationWrapper;

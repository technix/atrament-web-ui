import { h } from 'preact';
import { useEffect, useCallback, useState } from 'preact/hooks';
import style from './index.module.css';

import { useAtramentState } from 'src/atrament/hooks';
import CloseButton from 'src/components/ui/close-button';

import DebugInfo from './info';
import DebugGoto from './goto';
import DebugGlobaltags from './globaltags';
import DebugVariables from './variables';
import DebugVisits from './visits';
import DebugFunctions from './functions';

const DebuggerView = () => {
  const [ isOpen, openDebugger ] = useState(false);
  const [ keyWait, setKeyWait ] = useState(false);

  const toggleDebugger = useCallback(() => openDebugger(!isOpen), [ isOpen ]);

  const debugHandler = useCallback((e) => {
    if (e.code === 'Backquote') {
      if (keyWait) {
        toggleDebugger();
        setKeyWait(false);
      } else {
        setKeyWait(true);
        setTimeout(() => setKeyWait(false), 1000);
      }
    }
  }, [ toggleDebugger, keyWait, setKeyWait ]);

  useEffect(() => {
    document.addEventListener("keydown", debugHandler, false);
    return () => {
      document.removeEventListener("keydown", debugHandler, false);
    }
  }, [ debugHandler ]);

  if (!isOpen) {
    return (<button class={style.debug_toggle} onClick={toggleDebugger}>⚙</button>);
  }

  return (
    <div class={style.debug_container}>
      <CloseButton onClick={toggleDebugger} />
      <DebugInfo />
      <DebugGlobaltags />
      <DebugVariables />
      <DebugVisits />
      <DebugFunctions />
      <DebugGoto closeFn={toggleDebugger} />
    </div>
  );
}

const DebuggerMenu = () => {
  const { metadata } = useAtramentState(['metadata']);
  return metadata.debug ? <DebuggerView /> : <></>;
}

export default DebuggerMenu;

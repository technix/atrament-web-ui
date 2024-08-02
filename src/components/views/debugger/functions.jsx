import { h } from 'preact';
import style from './index.module.css';
import { useState } from 'preact/hooks';
import { useAtrament } from 'src/atrament/hooks';
import { Text, useTranslator } from '@eo-locale/preact';

import Collapse from 'src/components/ui/collapse';
import Table from 'src/components/ui/table';

const DebugFunctions = () => {
  const { atrament } = useAtrament();
  const translator = useTranslator();
  const [ fnName, setFnName ] = useState('');
  const [ fnArgs, setFnArgs ] = useState(null);
  const [ errorMsg, setErrorMsg ] = useState('');
  const [ outputMsg, setOutputMsg ] = useState(null);

  const parseArgs = (args) => {
    let fnArgs = [];
    try {
      fnArgs = JSON.parse(args);
    } catch (e) {
      // ignore parsing error
    }
    return fnArgs;
  }

  const handleFnChange = (e) => {
    setFnName(e.target.value);
    setErrorMsg('');
    setOutputMsg(null);
  };

  const handleArgsChange = (e) => {
    setFnArgs(e.target.value);
    setErrorMsg('');
    setOutputMsg(null);
  };

  const runFunction = () => {
    if (fnName) {
      try {
        const result = atrament.ink.evaluateFunction(fnName, parseArgs(fnArgs), true);
        setOutputMsg(result);
        setErrorMsg('');
      } catch (e) {
        setErrorMsg(e.toString());
      }
    }
  };

  return(
    <Collapse title={translator.translate('debug.functions')}>
      <div class={style.container}>
        <div>
          <Text id={'debug.functions.run-function'} />:
        </div>
        <div class={style.input_div}>
          <input class={style.input} type="text" value={fnName} onInput={handleFnChange} />
        </div>
      </div>
      <div class={style.container}>
        <div>
          <Text id={'debug.functions.arguments'} />:
        </div>
        <div class={style.input_div}>
          <input
            class={style.input}
            type="text"
            value={fnArgs}
            onInput={handleArgsChange}
            placeholder={translator.translate('debug.functions.arguments_placeholder')}
            title={translator.translate('debug.functions.arguments_placeholder')}
          />
        </div>
        <div>
          <button class={style.button} onClick={runFunction}>&gt;&gt;&gt;</button> <br />
        </div>
      </div>
      <div class={style.container}>
        <pre>{fnName && `${fnName}(${fnArgs ? parseArgs(fnArgs).map(JSON.stringify).join(', ') : ''})`}</pre>
      </div>
      {errorMsg && <div class={style.container}>
        <span class={style.errormsg}>{errorMsg}</span>
      </div>}
      <div class={style.container}>
        {outputMsg && <Table data={[
          [translator.translate('debug.functions.returned-value'), JSON.stringify(outputMsg.returned)],
          [translator.translate('debug.functions.output'), <pre key={'output'}>{outputMsg.output}</pre>],
        ]} />}
      </div>
    </Collapse>
  );
};

export default DebugFunctions;

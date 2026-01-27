import { h } from 'preact';
import style from './index.module.css';
import { useTranslator } from '@eo-locale/preact';
import { useEffect, useState } from 'preact/hooks';
import { useAtrament } from 'src/atrament/hooks';
import Collapse from 'src/components/ui/collapse';

const getPathList = (atrament) => {
  const inkKnots = [];
  const contentRoot = atrament.ink.story().mainContentContainer.namedContent;
  for (const key of contentRoot.keys()) {
    if (key !== 'global decl') {
      // this is a knot
      inkKnots.push(key);
    }
    for (const subkey of contentRoot.get(key).namedContent.keys()){
      inkKnots.push(`${key}.${subkey}`);
    }
  }
  return inkKnots.sort();
}


const DebugGoto = ({ closeFn }) => {
  const { atrament } = useAtrament();
  const translator = useTranslator();
  const [ inkPathList, setInkPathList ] = useState([]);
  const [ pathNameFilter, setPathNameFilter ] = useState('');
  const [ pathString, setPathString ] = useState('');
  const [ errorMsg, setErrorMsg ] = useState('');

  const handlePathstringChange = (e) => {
    setPathString(e.target.value);
    setPathNameFilter(e.target.value);
    setErrorMsg('');
  };

  const goToPath = () => {
    if (pathString) {
      try {
        atrament.ink.goTo(pathString);
        atrament.game.continueStory();
        closeFn();
      } catch (e) {
        setErrorMsg(e.toString());
      }
      setPathString('');
      setPathNameFilter('');
    }
  };

  const setPath = (ev) => {
    const chosenPath = ev.target.getAttribute('data-path');
    setPathString(chosenPath);
    setPathNameFilter(chosenPath);
  }

  useEffect(() => {
    setInkPathList(getPathList(atrament));
  }, [ atrament ]);

  const inkPaths = inkPathList.filter((v) => v.includes(pathNameFilter));

  return (
    <>
      <Collapse title={`${translator.translate('debug.go-to-path')}`}>
        <div class={style.container}>
          <div class={style.input_div}>
            <input class={style.input} type="text" value={pathString} onInput={handlePathstringChange} />
          </div>
          <div>
            <button class={style.button} onClick={goToPath}>&gt;&gt;&gt;</button> <br />
          </div>
        </div>
        <div class={style.container_scrollable}>
          <ul>
            {inkPaths.map((p) => <li><a href="#" onClick={setPath} data-path={p}>{p}</a></li>)}
          </ul>
        </div>
        <div class={style.container}>
          <span class={style.errormsg}>{errorMsg}</span>
        </div>
      </Collapse>
    </>
  );
}

export default DebugGoto;

import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { TranslationsProvider } from '@eo-locale/preact';
import { AtramentContext } from 'src/context';
import atramentInit from 'src/atrament/init';
import locales from 'src/locales';
import { appLanguage } from 'src/constants';

import ApplicationWrapper from 'src/components/ui/application-wrapper';
import ErrorModal from 'src/components/ui/error-modal';
import Container from 'src/components/ui/container';
import Loading from 'src/components/ui/loading';
import AppRouter from './router';

import setInnerHeight from 'src/utils/set-inner-height';

window.addEventListener('resize', setInnerHeight);

function App() {
  const [ atrament, setAtrament ] = useState(null);
  const [ initError, setInitError ] = useState(null);
  const [ loadedPercent, setLoadedPercent ] = useState(0);

  useEffect(setInnerHeight, []);

  useEffect(() => {
    const startEngine = async () => {
      const { default: atrament } = await import("@atrament/web");
      // import inkjs
      const { Story } = await import("inkjs");
      // loader progress
      atrament.interfaces.loader.onProgress(({ percent }) => setLoadedPercent(percent));
      // initialize engine
      try {
        await atramentInit(atrament, Story);
        // done
        setAtrament(atrament);
      } catch (e) {
        console.error(e);
        setInitError(e.message);
      }
    };
    // application is ready
    startEngine();
  }, []);

  return (
    <TranslationsProvider language={appLanguage} locales={locales}>
      <AtramentContext.Provider value={atrament}>
        <ApplicationWrapper>
          {atrament
            ? <AppRouter />
            : initError
              ? <Container><ErrorModal message={initError} /></Container>
              : <Loading loadedPercent={loadedPercent} />
          }
        </ApplicationWrapper>
      </AtramentContext.Provider>
    </TranslationsProvider>
  );
}

export default App;

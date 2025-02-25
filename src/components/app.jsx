import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { TranslationsProvider } from '@eo-locale/preact';
import { AtramentContext } from 'src/context';
import atramentInit from 'src/atrament/init';
import locales from 'src/i18n.json';
import { appLanguage } from 'src/constants';

import ApplicationWrapper from 'src/components/ui/application-wrapper';
import ErrorModal from 'src/components/ui/error-modal';
import Container from 'src/components/ui/container';
import Loading from 'src/components/ui/loading';
import AppRouter from './router';

function App() {
  const [ atrament, setAtrament ] = useState(null);
  const [ initError, setInitError ] = useState(null);

  useEffect(() => {
    const startEngine = async () => {
      const { default: atrament } = await import(/* webpackChunkName: "atrament" */ "@atrament/web");
      // import inkjs
      const { Story } = await import(/* webpackChunkName: "inkjs" */ "inkjs");
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
              : <Loading />
          }
        </ApplicationWrapper>
      </AtramentContext.Provider>
    </TranslationsProvider>
  );
}

export default App;

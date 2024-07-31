import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { TranslationsProvider } from '@eo-locale/preact';
import { AtramentContext } from 'src/context';
import atramentInit from 'src/atrament/init';
import locales from 'src/i18n.json';
import { appLanguage } from 'src/constants';

import ApplicationWrapper from 'src/components/ui/application-wrapper';
import Loading from 'src/components/ui/loading';
import AppRouter from './router';

function App() {
  const [ atrament, setAtrament ] = useState(null);

  useEffect(() => {
    const startEngine = async () => {
      const { default: atrament } = await import(/* webpackChunkName: "atrament" */ "@atrament/web");
      // import inkjs
      const { Story } = await import(/* webpackChunkName: "inkjs" */ "inkjs");
      // initialize engine
      await atramentInit(atrament, Story);
      // done
      setAtrament(atrament);
    };
    // application is ready
    startEngine();
  }, []);

  return (
    <TranslationsProvider language={appLanguage} locales={locales}>
      <AtramentContext.Provider value={atrament}>
        <ApplicationWrapper>
          {atrament ? <AppRouter /> : <Loading />}
        </ApplicationWrapper>
      </AtramentContext.Provider>
    </TranslationsProvider>
  );
}

export default App;

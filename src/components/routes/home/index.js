import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Link } from 'preact-router/match';
import { autosaveExists } from 'src/lib/autosave';

import UIHome from 'src/components/ui/home';

const Home = () => {
  const [isAutosaved, setAutosaved] = useState(false);
  useEffect(async () => {
    setAutosaved(await autosaveExists());
  }, []);

  return (
    <UIHome
      menu={[
        <Link href="/game/new">Start game</Link>,
        isAutosaved && <li><Link href="/game">Continue</Link></li>,
        <Link href="/settings">Settings</Link>
      ]}
    />
  );
};

export default Home;

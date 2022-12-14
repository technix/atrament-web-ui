import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Link } from 'preact-router/match';
import { autosaveExists } from 'src/lib/autosave';

import UIHome from 'src/components/ui/home';

const Home = () => {
  const [isAutosaved, setAutosaved] = useState(false);
  useEffect(() => {
    async function checkAutosave() {
      setAutosaved(await autosaveExists());
    }
    checkAutosave();
  });

  return (
    <UIHome
      menu={[
        <Link key="startgame" href="/game/new">Start game</Link>,
        isAutosaved && <li><Link key="continuegame" href="/game">Continue</Link></li>
      ]}
    />
  );
};

export default Home;

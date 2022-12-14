import { h } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import UISettings from 'src/components/ui/settings';

const UIToolbar = () => {
  const [isSettingsVisible, toggleSettings] = useState(false);

  const clickToggleSettings = useCallback(() => {
    toggleSettings((v) => !v);
  }, []);

  return(<>
    {
      isSettingsVisible ? <UISettings onClose={clickToggleSettings} /> : <a class='toolbar' onClick={clickToggleSettings}>⚙</a>
    }
  </>)
};

export default UIToolbar;
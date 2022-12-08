import { h } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import Settings from 'src/components/routes/settings';

const UIToolbar = () => {
  const [isSettingsVisible, toggleSettings] = useState(false);

  const clickToggleSettings = useCallback(() => {
    toggleSettings((v) => !v);
  }, []);

  return(<>
    {
      isSettingsVisible ? <Settings onClose={clickToggleSettings} /> : <a class='toolbar' onClick={clickToggleSettings}>⚙</a>
    }
  </>)
};

export default UIToolbar;
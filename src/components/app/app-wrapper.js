import { h } from 'preact';

import { useStoreon } from 'storeon/preact';

const UIApp = ({ children }) => {
  const { fontsize } = useStoreon('fontsize');
  return (
    <div id="atrament-ui-app" style={{ 'font-size': `${fontsize}%` }}>
      {children}
    </div>
  );
};

export default UIApp;
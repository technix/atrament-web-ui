import { h } from 'preact';
import LinkMenu from '../link-menu';
import pwa from 'src/pwa';

const LinkInstallPWA = ({children}) => {
  const [ isPWAsupported, installPWA ] = pwa();
  console.log(isPWAsupported);
  return (isPWAsupported ? <LinkMenu key="installPWA" onClick={installPWA}>{children}</LinkMenu> : '');
};

export default LinkInstallPWA;

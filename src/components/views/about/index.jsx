import { h } from 'preact';
import { Text } from '@eo-locale/preact';

import { appVersion } from 'src/constants';
import Block from 'src/components/ui/block';

import style from './index.module.css';
import atramentLogoImage from './atrament-logo.png';
import iftfLogoImage from './iftf-logo.png';

const components = [
  ["Atrament Core", "https://github.com/technix/atrament-core"],
  ["Atrament Web", "https://github.com/technix/atrament-web"],
  ["Atrament Web UI", "https://github.com/technix/atrament-web-ui"],
  ["InkJS", "https://github.com/y-lohse/inkjs"],
  ["Preact", "https://preactjs.com/"],
  ["Howler", "https://howlerjs.com/"],
  ["Nanostores", "https://github.com/nanostores/nanostores"],
  ["LocalForage", "https://github.com/localForage/localForage"],
  ["fflate", "https://github.com/101arrowz/fflate"],
];
const lastComponent = components.length - 1;

const A = ({href, children}) => (<a href={href} target="_blank" rel="noreferrer">{children}</a>);
const iftfLink = '<a href="https://iftechfoundation.org/" target="_blank" rel="noreferrer">Interactive Fiction Technology Foundation</a>';

const AboutMenu = ({ onClick }) => {
  const clickHandler = (e) => e.target.tagName.toLowerCase() === 'a' ? '' : onClick(e);
  return (
    <Block>
      <div onClick={clickHandler}>
        <div class={style.header}>
          <img src={atramentLogoImage} />
          <h1>Atrament <small>{appVersion}</small></h1>
        </div>
        <p><A href="https://atrament.ink/">https://atrament.ink/</A></p>
        <p>
          <Text id={"about.components"} />: {components.map((item, index) => (
            <span key={item[1]}>
              <A href={item[1]}>{item[0]}</A>
              {index === lastComponent ? '.' : ','} </span>
          ))}
        </p>
        <div class={style.infobox}>
          <img src={iftfLogoImage} />
          <p><Text
            id={"about.iftf_support"}
            html
            iftf={iftfLink}
          /></p>
        </div>
      </div>
    </Block>
  );
};

export default AboutMenu;
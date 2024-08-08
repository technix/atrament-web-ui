import { h } from 'preact';
import { route } from 'preact-router';
import { Text } from '@eo-locale/preact';

import Menu from 'src/components/menu';

import Block from '../ui/block';
import Container from '../ui/container';
import ContainerText from '../ui/container-text';
import ContainerFlex from '../ui/container-flex';
import LinkMenu from '../ui/link-menu';

const AboutRoute = () => {
  const mainMenu = () => route('/');

  return (
    <Container>
      <Menu />
      <ContainerText>
        <ContainerFlex>
          <Block>
            <img src="logo.png" style={{margin: 'auto', display: 'block', width: '50%'}} />
            <h1 style={{'text-align': 'center'}}>Atrament UI</h1>
            <p>Web UI for Ink games, made with:</p>
            <ul>
              <li><a href="https://github.com/technix/atrament-core" target="_blank" rel="noreferrer">Atrament</a></li>
              <li><a href="https://github.com/y-lohse/inkjs" target="_blank" rel="noreferrer">InkJS</a></li>
              <li><a href="https://preactjs.com/" target="_blank" rel="noreferrer">Preact</a></li>
              <li><a href="https://howlerjs.com/" target="_blank" rel="noreferrer">Howler</a></li>
              <li><a href="https://github.com/nanostores/nanostores" target="_blank" rel="noreferrer">Nanostores</a></li>
              <li><a href="https://github.com/localForage/localForage" target="_blank" rel="noreferrer">localForage</a></li>
              <li><a href="https://github.com/101arrowz/fflate" target="_blank" rel="noreferrer">fflate</a></li>
            </ul>
          </Block>
        </ContainerFlex>
        <Block>
          <LinkMenu key="mainmenu" onClick={mainMenu}><Text id={'main.menu'} /></LinkMenu>
        </Block>
      </ContainerText>
    </Container>
  );
};

export default AboutRoute;
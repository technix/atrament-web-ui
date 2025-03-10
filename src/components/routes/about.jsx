import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { route } from 'preact-router';
import { Text } from '@eo-locale/preact';

import { useAtrament, useAtramentState } from 'src/atrament/hooks';

import Menu from 'src/components/menu';

import Markup from 'src/components/ui/markup';
import Block from 'src/components/ui/block';
import Container from 'src/components/ui/container';
import ContainerText from 'src/components/ui/container-text';
import ContainerFlex from 'src/components/ui/container-flex';
import LinkMenu from 'src/components/ui/link-menu';

const AboutRoute = () => {
  const { evaluateInkFunction } = useAtrament();
  const { metadata } = useAtramentState(['metadata']);
  const [ aboutContent, setAboutContent ] = useState(' ');
  const mainMenu = () => route('/');
  
  useEffect(() => {
    const result = evaluateInkFunction(metadata.about);
    if (result.output) {
      setAboutContent(result.output);
    } else {
      setAboutContent(result.error);
    }
  }, [ metadata.about, setAboutContent, evaluateInkFunction ]);
  return (
    <Container>
      <Menu isHomeScreen />
      <ContainerText>
        <ContainerFlex>
          <Block>
            <Markup content={aboutContent} />
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
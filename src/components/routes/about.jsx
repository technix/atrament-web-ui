import { h } from 'preact';
import { route } from 'preact-router';
import { Text } from '@eo-locale/preact';

import Menu from 'src/components/menu/main-menu';

import Markup from 'src/components/ui/markup';
import Block from 'src/components/ui/block';
import TextParagraph from 'src/components/ui/text-paragraph';
import Container from 'src/components/ui/container';
import ContainerText from 'src/components/ui/container-text';
import ContainerFlex from 'src/components/ui/container-flex';
import MenuButton from 'src/components/ui/menu-button';

import ErrorScreen from 'src/components/screens/error';
import useAboutContent from 'src/content/use-about-content';

const mainMenu = () => route('/');

const AboutRoute = () => {
  const aboutContent = useAboutContent();
  return (
    <Container>
      <Menu isHomeScreen />
      <ErrorScreen />
      <ContainerText>
        <ContainerFlex>
          <Block> </Block>
          <Block>
            {aboutContent.map((item) => <TextParagraph key={item}><Markup>{item}</Markup></TextParagraph>)}
          </Block>
        </ContainerFlex>
        <Block>
          <MenuButton key="mainmenu" onClick={mainMenu}><Text id={'main.menu'} /></MenuButton>
        </Block>
      </ContainerText>
    </Container>
  );
};

export default AboutRoute;

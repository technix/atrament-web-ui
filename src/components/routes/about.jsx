import { h } from 'preact';
import { route } from 'preact-router';
import { Text } from '@eo-locale/preact';

import Menu from 'src/components/menu';

import Markup from 'src/components/ui/markup';
import Block from 'src/components/ui/block';
import TextParagraph from 'src/components/ui/text-paragraph';
import Container from 'src/components/ui/container';
import ContainerText from 'src/components/ui/container-text';
import ContainerFlex from 'src/components/ui/container-flex';
import LinkMenu from 'src/components/ui/link-menu';

import StoryError from 'src/components/views/story-error';
import useAboutContent from 'src/content/use-about-content';

const mainMenu = () => route('/');

const AboutRoute = () => {
  const aboutContent = useAboutContent();
  return (
    <Container>
      <Menu isHomeScreen />
      <StoryError />
      <ContainerText>
        <ContainerFlex>
          <Block> </Block>
          <Block>
            {aboutContent.map((item) => <TextParagraph key={item}><Markup isActive content={item} /></TextParagraph>)}
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
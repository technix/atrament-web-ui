import { h } from 'preact';
import { route } from 'preact-router';
import { Text } from '@eo-locale/preact';

import Menu from 'src/components/menu/main-menu';

import clsx from 'clsx';

import Markup from 'src/components/ui/markup';
import Block from 'src/components/ui/block';
import TextParagraph from 'src/components/ui/text-paragraph';
import Container from 'src/components/ui/container';
import ContainerText from 'src/components/ui/container-text';
import MenuButton from 'src/components/ui/menu-button';

import ErrorScreen from 'src/components/screens/error';
import useAboutContent from 'src/content/use-about-content';

import style from './about.module.css';

const mainMenu = () => route('/');

const AboutRoute = () => {
  const aboutContent = useAboutContent();
  return (
    <Container>
      <Menu isHomeScreen />
      <ErrorScreen />
      <div class={clsx(style.about_header, 'atrament-about-header')} />
      <ContainerText>
        <Block>
          {aboutContent.map((item) => <TextParagraph key={item}><Markup>{item}</Markup></TextParagraph>)}
        </Block>
      </ContainerText>
      <div class={clsx(style.about_footer, 'atrament-about-footer')}>
        <Block>
          <MenuButton key="mainmenu" onClick={mainMenu}><Text id={'main.menu'} /></MenuButton>
        </Block>
      </div>
    </Container>
  );
};

export default AboutRoute;

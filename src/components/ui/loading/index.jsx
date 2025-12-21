import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

import Container from '../container';
import ContainerFlex from '../container-flex';

import Spinner from '../animation-grid';

const Loading = () => (
  <Container>
    <ContainerFlex>
      <div class={clsx(style.loading, 'atrament-loading')}>
        <Spinner />
      </div>
    </ContainerFlex>
  </Container>
);

export default Loading;

import { h } from 'preact';
import style from './index.module.css';

import Container from '../container';
import ContainerFlex from '../container-flex';

import Spinner from '../animation-grid';

const Loading = () => (
  <Container>
    <ContainerFlex>
      <div class={[style.loading, 'atrament-loading'].join(' ')}>
        <Spinner />
      </div>
    </ContainerFlex>
  </Container>
);

export default Loading;
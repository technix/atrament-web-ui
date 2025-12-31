import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

import Container from '../container';
import ContainerFlex from '../container-flex';

import Spinner from '../animation-grid';
import ProgressBar from '../progressbar';

const Loading = ({ loadedPercent = 0 }) => (
  <Container>
    <ContainerFlex>
      <div class={clsx(style.loading, 'atrament-loading')}>
        <Spinner />
        <div class={clsx(style.progressbar, 'atrament-loading-progressbar')}>
          {loadedPercent > 0 ? <ProgressBar options={{ display: 'thin', solid: true, value: loadedPercent }} /> : ''}
        </div>
      </div>
    </ContainerFlex>
  </Container>
);

export default Loading;

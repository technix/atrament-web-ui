import React from 'react';
import {PreactScrollBox} from './PreactScrollBox';

export class ScrollBox extends React.Component {

  render() {
    return (
      <PreactScrollBox {...this.props}>
        <div className="scroll-box__viewport">
          {this.props.children}
        </div>
      </PreactScrollBox>
    );
  }
}

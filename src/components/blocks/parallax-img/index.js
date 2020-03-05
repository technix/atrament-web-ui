import { h } from 'preact';
// import style from './style';

import ParallaxComponent from 'src/components/modules/parallax';

class ParallaxImg extends ParallaxComponent {
  render({ width, height }, { parallaxProgress }) {
    return (
      <div
        style={`
          background-image: url(assets/game/gfx/postcards.jpg);
          background-size: cover;
          background-position: ${parallaxProgress}%;
          width: ${width};
          height: ${height};
        `}
        ref={this.parallaxRef}
      >
        <div style={`
          width: 30px;
          height: 30px;
          position: relative;
          top: 30px;
          left: 30px;
          background-color: #FFFFFF;
          transition: 300ms linear all;
          transform: rotate(${parallaxProgress}deg);
          `}
        />
      </div>
    );
  }
}

export default ParallaxImg;

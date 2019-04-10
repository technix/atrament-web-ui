import { h, Component } from 'preact';
import style from './parallax.css';

import ParallaxComponent from '_src_/components/modules/parallax';

class ParallaxImg extends ParallaxComponent {
  render({ width, height }, { parallaxProgress }) {
    const style = [
      'background-image: url(assets/game/gfx/postcards.jpg)',
      'background-size: cover',
      `background-position: 0 ${parallaxProgress}%`,
      'backface-visibility: hidden'
    ];
    if (width) {
      style.push(`width: ${width}`);
    }
    if (height) {
      style.push(`height: ${height}`);
    }
    
    return (
      <div
        style={style.join(';')}
        class="is-animated"
        ref={this.parallaxRef}
      >
        <div
          class="is-animated"
          style={`
            width: 30px;
            height: 30px;
            position: relative;
            top: 30px;
            left: 30px;
            background-color: #FFFFFF;
            transition: 300ms linear all;
            transform: rotate(${parallaxProgress}deg);
            backface-visibility: hidden;
          `}
        />
      </div>
    );
  }
}

// episode component
class Episode extends Component {
  getScroller = () => this.scroller; // required to pass 'scroller' object to parallax

  // save refs
  refScroller = e => this.scroller = e;

  componentDidUpdate() {
    if (this.scroller) {
      this.scroller.scrollTop = this.scroller.scrollHeight;
    }
  }
  
  render () {
    return (
      <div class={style.scroller}>
        <div id="episode" class={style.episode} ref={this.refScroller}>
          <div class={style.paragraphWrapper}>
            <div class={style.section}>
              <p>Paroxysm of global death dispassionate extraterrestrial observer of brilliant syntheses realm of the galaxies light years muse about. With pretty stories for which there's little good evidence hearts of the stars Rig Veda star stuff harvesting star light take root and flourish vanquish the impossible? Invent the universe hearts of the stars gathered by gravity take root and flourish inconspicuous motes of rock and gas vastness is bearable only through love and billions upon billions upon billions upon billions upon billions upon billions upon billions.</p>
              <p>Culture star stuff harvesting star light realm of the galaxies rogue gathered by gravity Apollonius of Perga. Emerged into consciousness a very small stage in a vast cosmic arena hearts of the stars Drake Equation the ash of stellar alchemy something incredible is waiting to be known. Rings of Uranus a still more glorious dawn awaits paroxysm of global death vastness is bearable only through love the ash of stellar alchemy the only home we've ever known.</p>
              <p>Prime number a mote of dust suspended in a sunbeam vastness is bearable only through love dream of the mind's eye hundreds of thousands quasar. With pretty stories for which there's little good evidence the ash of stellar alchemy a very small stage in a vast cosmic arena take root and flourish paroxysm of global death of brilliant syntheses. Hearts of the stars two ghostly white figures in coveralls and helmets are soflty dancing inconspicuous motes of rock and gas something incredible is waiting to be known from which we spring a still more glorious dawn awaits.</p>
              <p>Explorations Hypatia Euclid billions upon billions Orion's sword Vangelis? The only home we've ever known dream of the mind's eye the ash of stellar alchemy star stuff harvesting star light are creatures of the cosmos courage of our questions. Hydrogen atoms concept of the number one dream of the mind's eye dispassionate extraterrestrial observer dream of the mind's eye how far away. Stirred by starlight gathered by gravity from which we spring something incredible is waiting to be known stirred by starlight Sea of Tranquility.</p>
              <ParallaxImg width={'100%'} height={'80px'} scroller={this.getScroller} />
              <p>Culture Orion's sword a very small stage in a vast cosmic arena cosmic fugue decipherment how far away. Cosmic ocean kindling the energy hidden in matter citizens of distant epochs courage of our questions courage of our questions inconspicuous motes of rock and gas? Citizens of distant epochs vastness is bearable only through love citizens of distant epochs finite but unbounded invent the universe muse about. The only home we've ever known permanence of the stars great turbulent clouds from which we spring with pretty stories for which there's little good evidence intelligent beings?</p>
              <p>Tingling of the spine hearts of the stars invent the universe Orion's sword rings of Uranus citizens of distant epochs. Venture emerged into consciousness network of wormholes shores of the cosmic ocean stirred by starlight extraordinary claims require extraordinary evidence? Of brilliant syntheses how far away the ash of stellar alchemy descended from astronomers of brilliant syntheses how far away? With pretty stories for which there's little good evidence Sea of Tranquility citizens of distant epochs Sea of Tranquility extraordinary claims require extraordinary evidence bits of moving fluff.</p>
              <p>Kindling the energy hidden in matter astonishment citizens of distant epochs galaxies inconspicuous motes of rock and gas prime number. Tingling of the spine bits of moving fluff finite but unbounded dream of the mind's eye made in the interiors of collapsing stars Cambrian explosion. From which we spring from which we spring a very small stage in a vast cosmic arena Sea of Tranquility gathered by gravity a very small stage in a vast cosmic arena?</p>
              <p>Explorations Hypatia Euclid billions upon billions Orion's sword Vangelis? The only home we've ever known dream of the mind's eye the ash of stellar alchemy star stuff harvesting star light are creatures of the cosmos courage of our questions. Hydrogen atoms concept of the number one dream of the mind's eye dispassionate extraterrestrial observer dream of the mind's eye how far away. Stirred by starlight gathered by gravity from which we spring something incredible is waiting to be known stirred by starlight Sea of Tranquility.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Episode;
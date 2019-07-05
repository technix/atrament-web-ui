import { h } from 'preact';

import Map2 from '_src_/components/game-ui/map2';

const scene = {
  tags: {
    scene: 'map',
    bg: 'bg-citymap.jpg',
    mp_road: [ 'Дорога', 150, 160, 'ae-house.png' ],
    mp_house: [ 'Дом', 150, 720, 'ae-house.png' ],
    mp_church: [ 'Церковь', 360, 450, 'ae-church.png' ],
    mp_store: [ 'Магазин', 540, 680, 'ae-general_store.png' ],
    mp_hotel: [ 'Отель', 360, 280, 'ae-historical.png' ],
    mp_seaside: [ 'Набережная', 545, 235, 'ae-harbor.png' ]
  },
  text: [
    'mp_road'
  ],
  choices: [
    { id: 0, choice: 'mp_house' },
    { id: 1, choice: 'mp_hotel' },
    { id: 2, choice: 'mp_store' },
    { id: 3, choice: 'mp_seaside' }
  ]
};

const DemoMap2 = () => (<Map2 width={654} height={1041} scene={scene} />);

export default DemoMap2;

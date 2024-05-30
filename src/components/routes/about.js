import { h } from 'preact';
import { route } from 'preact-router';
import { useEffect } from 'preact/hooks';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import useAtrament from 'src/atrament/hooks';

import Settings from 'src/components/settings';

import Block from '../ui/block';
import Container from '../ui/container';
import ContainerText from '../ui/container-text';
import ContainerFlex from '../ui/container-flex';
import LinkMenu from '../ui/link-menu';

const initLeaflet = () => {
  const mapMarker = L.icon({
    iconUrl: 'assets/game/marker.png',
    //shadowUrl: 'leaf-shadow.png',

    iconSize:     [140, 140], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [70, 70], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  const bounds = [[0,0], [1002,1417]];
  const worldmap = L.map('worldmap', {
    crs: L.CRS.Simple,
    maxZoom: 2,
    minZoom: -1,
    zoomSnap: 0.1,
    trackResize: true,
    maxBounds: bounds,
    maxBoundsViscosity: 1.0,
    attributionControl: false
  });
  const mapImage = L.imageOverlay('assets/game/themap.jpg', bounds).addTo(worldmap);  
  L.marker([ 1002 - 514, 700 ], {icon: mapMarker}).addTo(worldmap);
  L.marker([ 1002 - 783,1030 ], {icon: mapMarker}).addTo(worldmap);
  L.marker([ 1002 - 339, 1105 ], {icon: mapMarker}).addTo(worldmap);

  worldmap.setView([500, 500], 0);

};


const AboutRoute = () => {
  const { state } = useAtrament();
  const mainMenu = () => route('/');
  useEffect(initLeaflet, []);

  return (
    <Container>
      <Settings />
      <ContainerText fontSize={state.settings.fontSize}>
        <ContainerFlex>
          <div id={'worldmap'} style={{width: '100%', height: '100%', 'z-index': 0}} />
        </ContainerFlex>
        <Block>
          <LinkMenu key="mainmenu" onClick={mainMenu}>Main menu</LinkMenu>
        </Block>
      </ContainerText>
    </Container>
  );
};

export default AboutRoute;
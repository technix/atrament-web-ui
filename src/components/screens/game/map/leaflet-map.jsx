import { h } from 'preact';
import { useRef, useState, useEffect, useCallback } from 'preact/hooks';
import clsx from 'clsx';
import 'leaflet/dist/leaflet.css';
import style from './index.module.css';

const Map = ({ mapImage, markers = [], playerMarker = false, options = { playerMarker: true, proximityThreshold: 50 } }) => {
  const containerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [L, setL] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState(null);

  // Lazy load Leaflet
  useEffect(() => {
    import('leaflet').then(module => {
      setL(module.default);
    });
  }, []);

  // Get image dimensions
  useEffect(() => {
    if (!mapImage) return;
    const img = new Image();
    img.onload = () => {
      setImageDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
      setImageLoaded(true);
    };
    img.src = mapImage;
  }, [mapImage]);

  // Initialize map with Simple CRS
  useEffect(() => {
    if (!L || !containerRef.current || !imageLoaded || !imageDimensions) return;
    const { width, height } = imageDimensions;
    const mapBounds = [[height, 0], [0, width]];
    const mapInstance = L.map(containerRef.current, {
      crs: L.CRS.Simple,
      maxZoom: options.maxZoom ?? 3,
      minZoom: options.minZoom ?? -3,
      maxBounds: mapBounds,
      maxBoundsViscosity: 1.0,
      attributionControl: false
    }).fitBounds(mapBounds);
    const imageBounds = [[0, 0], [height, width]];
    L.imageOverlay(mapImage, imageBounds).addTo(mapInstance);
    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, [L, mapImage, imageLoaded, imageDimensions]);

  // Store player marker ref for proximity detection
  const playerMarkerRef = useRef(null);

/*

  // Render markers
  useEffect(() => {
    if (!map || !L) return;

    // Clear existing markers (except player)
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker && layer !== playerMarkerRef.current) {
        map.removeLayer(layer);
      }
    });

    markers.forEach(marker => {
      // Marker position in pixel coordinates (lat/lng reversed for Simple CRS)
      const markerLatLng = L.latLng(marker.y, marker.x);
      
      let markerIcon = L.icon({
        iconUrl: marker.type === 'image' ? marker.content : undefined,
        iconSize: marker.iconSize || [32, 32],
        iconAnchor: marker.iconAnchor || [16, 16],
        popupAnchor: [0, -16],
        className: marker.disabled ? style.disabled_marker : ''
      });

      // Create a custom div icon for text markers
      if (marker.type === 'text') {
        markerIcon = L.divIcon({
          html: `<div class="${clsx(style.text_marker, marker.disabled ? style.disabled : '')}">${marker.content}</div>`,
          iconSize: [60, 40],
          iconAnchor: [30, 20],
          popupAnchor: [0, -20],
          className: ''
        });
      }

      const leafletMarker = L.marker(markerLatLng, {
        icon: markerIcon,
        draggable: marker.draggable && !marker.disabled
      }).addTo(map);

      // Add popup if provided
      if (marker.popup) {
        leafletMarker.bindPopup(marker.popup);
      }

      // Add click handler if not disabled
      if (!marker.disabled && marker.onclick) {
        leafletMarker.on('click', marker.onclick);
      }

      // Store marker ref for proximity detection if it's the first interactive marker
      if (marker.isPlayer) {
        playerMarkerRef.current = leafletMarker;
      }
    });
  }, [map, L, markers]);

*/

/*

  // Player marker with drag-to-click
  useEffect(() => {
    if (!map || !L || !playerMarker || !imageDimensions) return;

    const { width, height } = imageDimensions;
    const startPosition = L.latLng(height / 2, width / 2); // Center of map

    const playerMarkerInstance = L.marker(startPosition, {
      icon: L.divIcon({
        html: `<div class="${style.player_marker}"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      }),
      draggable: true,
      title: 'Your Position'
    }).addTo(map);

    playerMarkerRef.current = playerMarkerInstance;

    const checkProximity = () => {
      const playerPos = playerMarkerInstance.getLatLng();
      const proximityThreshold = options.proximityThreshold || 40; // pixels

      // Check distance to each marker
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker && layer !== playerMarkerInstance) {
          const markerPos = layer.getLatLng();
          const distance = L.latLng(playerPos.lat, playerPos.lng).distanceTo(markerPos);
          
          if (distance < proximityThreshold) {
            // Find the marker data to trigger onclick
            const matchingMarker = markers.find(m => 
              m.y === markerPos.lat && m.x === markerPos.lng
            );
            if (matchingMarker && matchingMarker.onclick && !matchingMarker.disabled) {
              matchingMarker.onclick();
            }
          }
        }
      });
    };

    playerMarkerInstance.on('dragend', checkProximity);

    return () => {
      map.removeLayer(playerMarkerInstance);
    };
  }, [map, L, playerMarker, markers, imageDimensions, options.proximityThreshold]);

*/

  return (
    <div
      class={clsx(style.map_container, 'atrament-map')}
      ref={containerRef}
    />
  );
};

export default Map;
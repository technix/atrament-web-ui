import { h } from 'preact';
import { useEffect, useState, useCallback, useMemo } from 'preact/hooks';
import { useAtrament, useAtramentState, useAtramentOverlay } from 'src/atrament/hooks';
import getTagAttributes from 'src/utils/get-tag-attributes';
import ContainerText from 'src/components/ui/container-text';
import Map from "./leaflet-map";

const MapView = () => {
  const [mapConfig, setMapConfig] = useState(null);
  const { makeChoice, continueStory, throwAtramentError, getAssetPath } = useAtrament();
  const { execContentFunction } = useAtramentOverlay();
  const atramentState = useAtramentState(['scenes']);
  const lastSceneIndex = atramentState.scenes.length - 1;
  const currentScene = atramentState.scenes[lastSceneIndex];

  const clickHandlerChoice = useCallback((choice) => {
    const chosen = currentScene.choices.findIndex((item) => item.choice === choice);
    if (chosen < 0) {
      throwAtramentError(`[map marker to=${choice}] leads to nonexistent choice!`);
      return;
    }
    makeChoice(chosen);
    continueStory();
  }, [throwAtramentError, continueStory, makeChoice, currentScene]);

  const clickHandlerFunction = useCallback(
    (options) => execContentFunction(options.onclick, options.display),
    [execContentFunction]
  );

  const addOnclickHandler = useCallback((markerOptions) => {
    if (markerOptions.onclick) {
      return () => clickHandlerFunction(markerOptions);
    } else if (markerOptions.to) {
      return () => clickHandlerChoice(markerOptions.to);
    }
    return null;
  }, [clickHandlerChoice, clickHandlerFunction]);

  // Parse map configuration from markup
  useEffect(() => {
    try {
      const config = {
        image: getAssetPath(currentScene.tags.MAP),
        options: getTagAttributes(currentScene.tags.MAP_OPTIONS),
      };
      setMapConfig(config);
    } catch (e) {
      throwAtramentError(`Invalid map configuration JSON: ${e.message}`);
    }
  }, [currentScene, throwAtramentError]);

  const processedMarkers = useMemo(() => {
    if (!mapConfig?.markers) return [];
    
    return mapConfig.markers.map(marker => ({
      ...marker,
      content: marker.type === 'image' ? getAssetPath(marker.content) : marker.content,
      onclick: addOnclickHandler(marker),
      disabled: marker.disabled === true
    }));
  }, [mapConfig?.markers, getAssetPath, addOnclickHandler]);

  if (!mapConfig) return null;

  return (
    <ContainerText className='atrament-container-game-content'>
      <Map
        mapImage={mapConfig.image}
        markers={processedMarkers}
        playerMarker={mapConfig.playerMarker === true}
        options={mapConfig.options}
      />
    </ContainerText>
  );
};

export default MapView;

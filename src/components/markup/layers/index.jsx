import { h } from 'preact';
import { useEffect, useState, useContext, useCallback, useMemo } from 'preact/hooks';
import { useAtrament, useAtramentState, useAtramentOverlay } from 'src/atrament/hooks';
import { ActiveContentContext } from 'src/context';
import getTagAttributes from 'src/utils/get-tag-attributes';

import LayeredImage from 'src/components/ui/layered-image';

function prefetchImages(imageList) {
  const imagePreloads = [];
  for (let img of imageList) {
    imagePreloads.push(new Promise((resolve) => {
      const imgToPreload = new Image();
      const preloaded = () => resolve({
        ...img,
        width: imgToPreload.naturalWidth,
        height: imgToPreload.naturalHeight
      });
      imgToPreload.onload = preloaded;
      imgToPreload.onerror = preloaded;
      imgToPreload.src = img.src;
    }));
  }
  return Promise.allSettled(imagePreloads)
    .then(r => r.map(i => (i.status === 'fulfilled' ? i.value : {})));
}

const Layers = ({ options, children }) => {
  const [ imageLayers, setImageLayers ] = useState(null);
  const [ areaLayers, setAreaLayers ] = useState(null);
  const isActive = useContext(ActiveContentContext);
  const { makeChoice, continueStory, throwAtramentError, getAssetPath } = useAtrament();
  const { execContentFunction } = useAtramentOverlay();

  const atramentState = useAtramentState(['scenes']);

  const clickHandlerChoice = useCallback((choice) => {
    const lastSceneIndex = atramentState.scenes.length - 1;
    const currentScene = atramentState.scenes[lastSceneIndex];
    const chosen = currentScene.choices.findIndex((item) => item.choice === choice);
    if (chosen < 0) {
      throwAtramentError(`[picture to=${choice}] leads to nonexistent choice!`);
      return;
    }
    makeChoice(chosen);
    continueStory();
  }, [ throwAtramentError, continueStory, makeChoice, atramentState.scenes ]);

  const clickHandlerFunction = useCallback(
    (options) => execContentFunction(options.onclick, options.display),
    [ execContentFunction ]
  );

  const addOnclickHandler = useCallback((options, isSceneActive) => {
    let onClick = null;
    if (isSceneActive) {
      if (options.onclick) {
        onClick = (e) => {
          e.stopPropagation();
          clickHandlerFunction(options);
        };
      } else if (options.to) {
        onClick = (e) => {
          e.stopPropagation();
          clickHandlerChoice(options.to);
        };
      }
    }
    return onClick;
  }, [ clickHandlerChoice, clickHandlerFunction ]);

  // image layers
  const imageLayerData = useMemo(() => {
    const pictures = children.match(/\[picture.*?\].+?\[\/picture\]/ig);
    return pictures?.map((img, index) => {
      const [,attrs,src] = img.match(/\[picture(.*?)\](.+?)\[\/picture\]/i);
      const layerOptions = getTagAttributes(attrs);
      return {
        attrs: layerOptions,
        src: getAssetPath(src),
        index
      }
    });
  }, [ children, getAssetPath ]);

  // area layers
  const areaLayerData = useMemo(() => {
    const areas = children.match(/\[area.+?\]/ig);
    return areas?.map((img, index) => {
      const [,attrs] = img.match(/\[area(.*?)\]/i);
      const areaOptions = getTagAttributes(attrs);
      return {
        attrs: areaOptions,
        index
      }
    });
  }, [ children ])


  useEffect(() => {
    const prefetcher = async (images) => {
      const fetchedImages = await prefetchImages(images);
      const imageLayersProcessed = fetchedImages?.map(i => {
        // assign onclick, using image data
        i.onclick = addOnclickHandler(i.attrs, isActive);
        return i;
      });
      setImageLayers(imageLayersProcessed);
    };
    // preload images and assign click handlers to them
    prefetcher(imageLayerData);
    // add click handlers to areas
    const areaLayersProcessed = areaLayerData?.map(i => {
      // assign onclick, using image data
      i.onclick = addOnclickHandler(i.attrs, isActive);
      return i;
    });
    setAreaLayers(areaLayersProcessed);
    console.log('Initial useEffect called');
  }, [ isActive, addOnclickHandler, imageLayerData, areaLayerData ]);

  return (<>
    {imageLayers && <LayeredImage layers={imageLayers} areas={areaLayers} options={options} />}
  </>);
}

export default {
  tag: 'layers',
  tagOptions: { raw: true },
  component: Layers
}

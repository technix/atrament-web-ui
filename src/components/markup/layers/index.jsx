import { h } from 'preact';
import { useEffect, useState, useContext, useCallback } from 'preact/hooks';
import { useAtrament, useAtramentState, useAtramentOverlay } from 'src/atrament/hooks';
import { ActiveContentContext } from 'src/context';
import getTagAttributes from 'src/utils/get-tag-attributes';

import LayeredImage from 'src/components/ui/layered-image';

function prefetchImages(imageList) {
  const imagePreloads = [];
  for (let img of imageList) {
    imagePreloads.push(new Promise((resolve) => {
      const imgToPreload = new Image();
      imgToPreload.onload = resolve;
      imgToPreload.onerror = resolve;
      imgToPreload.src = img.src;
      resolve({
        ...img,
        width: imgToPreload.naturalWidth,
        height: imgToPreload.naturalHeight
      });
    }));
  }
  return Promise.allSettled(imagePreloads)
    .then(r => r.map(i => i.status === 'fulfilled' ? i.value : {}));
}

const Layers = ({ options, children }) => {
  const [ imageData, setImageData ] = useState(null);
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

  const addOnclickHandler = (options) => {
    let onClick = null;
    if (isActive) {
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
  };

  // picture layers
  const pictures = children.match(/\[picture.*?\].+?\[\/picture\]/ig);
  const pictureLayers = pictures?.map((img, index) => {
    const [,attrs,src] = img.match(/\[picture(.*?)\](.+?)\[\/picture\]/i);
    const layerOptions = getTagAttributes(attrs);
    return {
      attrs: layerOptions,
      src: getAssetPath(src),
      index
    }
  });

  // area layers
  const areas = children.match(/\[area.+?\]/ig);
  const areaLayers = areas?.map((img, index) => {
    const [,attrs] = img.match(/\[area(.*?)\]/i);
    const areaOptions = getTagAttributes(attrs);
    return {
      attrs: areaOptions,
      index,
      onclick: addOnclickHandler(areaOptions)
    }
  });

  const imageLayers = imageData?.map(i => {
    // assign onclick, using cached image data
    i.onclick = addOnclickHandler(i.attrs);
    return i;
  });

  useEffect(() => {
    const prefetcher = async (images) => {
      const fetchedImages = await prefetchImages(images);
      setImageData(fetchedImages);
    };
    prefetcher(pictureLayers);
  }, []);

  return (<>
    {imageData && <LayeredImage layers={imageLayers} areas={areaLayers} options={options} />}
  </>);
}

export default {
  tag: 'layers',
  tagOptions: { raw: true },
  component: Layers
}

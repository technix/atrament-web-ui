
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import style from './index.module.css';

const CircleLoader = ({delay = 300}) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [ delay ]);
  return <div class={style.loader} style={{opacity: isVisible ? 1 : 0}} />;
};
export default CircleLoader;

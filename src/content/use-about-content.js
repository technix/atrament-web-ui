import { useAtrament, useAtramentState } from 'src/atrament/hooks';
import { useEffect, useState } from 'preact/hooks';

export default function useAboutContent() {
  const { evaluateInkFunction } = useAtrament();
  const { metadata } = useAtramentState(['metadata']);
  const [ aboutContent, setAboutContent ] = useState(' ');
  
  useEffect(() => {
    const result = evaluateInkFunction(metadata.about);
    setAboutContent(result.output || ' ');
  }, [ metadata.about, setAboutContent, evaluateInkFunction ]);

  return aboutContent.split('\n');
}
import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import markup from 'src/atrament/markup';

const Markup = ({ content, isInactive=false }) => {
  const transformedContent = useMemo(() => markup(content, isInactive), [ content, isInactive ]);
  return(
    <>
      {transformedContent}
    </>
  );
};

export default Markup;

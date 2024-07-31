import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import markup from 'src/atrament/markup';
import { ActiveContentContext } from 'src/context';

const Markup = ({ content, isActive=true }) => {
  const transformedContent = useMemo(() => markup(content), [ content ]);
  return(
    <ActiveContentContext.Provider value={isActive}>
      {transformedContent}
    </ActiveContentContext.Provider>
  );
};

export default Markup;

import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import markup from 'src/atrament/markup';
import { ActiveContentContext } from 'src/context';

const Markup = ({ children, isActive=true }) => {
  const transformedContent = useMemo(() => markup(children), [ children ]);
  return(
    <ActiveContentContext.Provider value={isActive}>
      {transformedContent}
    </ActiveContentContext.Provider>
  );
};

export default Markup;

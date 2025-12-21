// import and register external functions
export default function registerExternalFunctions(atrament) {
  const modules = import.meta.glob('../../resources/externals/*.js', { eager: true });
  Object.values(modules).map(({ default: def }) =>
    atrament.ink.story().BindExternalFunction(def.name, def.external.bind(atrament), def.lookaheadSafe || false)
  );
}


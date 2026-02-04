import toArray from "src/utils/to-array";
// import and register external functions

export default function registerExternalFunctions(atrament) {
  const modules = import.meta.glob('../../resources/externals/*.js', { eager: true });
  Object.values(modules).map(({ default: def }) =>
    toArray(def).map((ext) =>
      atrament.ink.story().BindExternalFunction(ext.name, ext.external.bind(atrament), ext.lookaheadSafe || false)
    )
  );
}


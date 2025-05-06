const locales = import.meta.glob('../resources/locales/*.json', { eager: true });
export default Object.values(locales);

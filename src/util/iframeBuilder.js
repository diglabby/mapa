import parseUrl from './parseUrl';
import constructUrl from './constructUrl';

export default (originalUrl, searchTag = null, height = '500', width = '100', color = 'green') => {
  const parsed = parseUrl(originalUrl);
  let [categories, search, zoom, entry] = new Array(4).fill('', 0, 4);
  let center = null;
  const {
    // original,
    // actual,
    params,
    // path
  } = parsed;
  if (Object.keys(params).length !== 0) {
    const listOfKeys = Object.keys(params);
    if (listOfKeys.indexOf('categories') >= 0) {
      categories = params.categories;
    }
    if (listOfKeys.indexOf('center') >= 0) {
      center = {};
      center.lat = parseFloat(params.center.split(',')[0]);
      center.lng = parseFloat(params.center.split(',')[1]);
    }
    if (listOfKeys.indexOf('search') >= 0) {
      search = params.search;
    }
    if (listOfKeys.indexOf('zoom') >= 0) {
      zoom = params.zoom;
    }
    if (listOfKeys.indexOf('entry') >= 0) {
      entry = params.entry;
    }
  }
  const searchMain = () => {
    if (searchTag == null) {
      return search;
    }
    if (searchTag === '') {
      return '';
    }
  }
  return `
      <iframe title="Mapa" src="https://mapa.falanster.by/map.html${constructUrl(entry, center, zoom, searchMain(), categories )}" width="${width}%" height="${height}"><a href="https://kartevonmorgen.org/" target="_blank">The map</a></iframe>
  `
}
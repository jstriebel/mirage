import Video from './Video'

function importAll(r) {
  return r.keys().reduce(function(map, x) {
      map[x.replace("./", "")] = Video(r(x));
      return map;
  }, {});
}

export default importAll(require.context('./', false, /\.(ogg|mp4)$/));

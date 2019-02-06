function importAll(r) {
  return r.keys().reduce(function(map, x) {
    map[x.replace("./", "")] = r(x)
    return map
  }, {})
}

export default importAll(require.context("./", false, /\.(ogg|mp4)$/))

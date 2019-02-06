function importAll(r) {
  return r.keys().reduce(function(map, x) {
    const name = x.replace("./", "").replace(".js", "")
    map[name] = r(x)["default"]
    return map
  }, {})
}

export default importAll(require.context("./", false, /[A-Z].*\.js$/))

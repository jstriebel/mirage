export const openDrawer = node => ({
  type: "OPEN_DRAWER",
  node,
})

export const closeDrawer = () => ({
  type: "CLOSE_DRAWER",
})

export const reduxGraphStoreChanged = (revId, entries) => ({
  type: "REDUX_GRAPH_STORE_CHANGED",
  revId,
  entries,
})

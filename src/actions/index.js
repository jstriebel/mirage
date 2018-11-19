export const setAlpha = value => ({
  type: 'SET_ALPHA',
  value
});

export const openDrawer = () => ({
  type: 'OPEN_DRAWER'
});

export const closeDrawer = () => ({
  type: 'CLOSE_DRAWER'
});

export const reduxGraphStoreChanged = (revId, entries) => ({
	type: 'REDUX_GRAPH_STORE_CHANGED',
	revId,
	entries
});

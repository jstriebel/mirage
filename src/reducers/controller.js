const initialState = {
  isDrawerOpen: false,
  lastRevId: -1,
  transactions: []
}

export const controller = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_DRAWER':
      return {...state, isDrawerOpen: true}
    case 'CLOSE_DRAWER':
      return {...state, isDrawerOpen: false}
    case 'REDUX_GRAPH_STORE_CHANGED':
      const newTransactions = [...state.transactions]
      newTransactions[action.revId] = action.entries
      return {...state, transactions: newTransactions, lastRevId: action.revId}
    default:
      return state
  }
}

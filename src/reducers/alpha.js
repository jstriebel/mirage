export const alpha = (state = 0, action) => {
  switch (action.type) {
    case 'SET_ALPHA':
      return action.value
    default:
      return state
  }
}

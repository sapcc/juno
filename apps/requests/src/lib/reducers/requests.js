const initialState = {
  items: [],
  isFetching: false,
  error: null,
  updatedAt: null,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case "REQUEST_REQUESTS":
      return { ...state, isFetching: true, error: null }
    case "RECEIVE_REQUESTS":
      return {
        ...state,
        items: action.items,
        isFetching: false,
        updatedAt: Date.now(),
      }
    case "RECEIVE_REQUESTS_ERROR":
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case "ADD_REQUEST": {
      const items = state.items.slice()
      const index = state.items.findIndex((item) => item.id === action.item.id)
      if (index >= 0) {
        items[index] = action.item
      } else {
        items.unshift(action.item)
      }
      return {
        ...state,
        items,
        isFetching: false,
        updatedAt: Date.now(),
      }
    }
    default:
      return state
  }
}

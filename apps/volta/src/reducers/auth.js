const initialState = {
  attr: null,
}

const setAuth = (state, { profile, auth }) => {
  return { ...state, attr: auth }
}
const removeAuth = (state) => {
  return { ...state, attr: null }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_AUTH":
      return setAuth(state, action)
    case "REMOVE_AUTH":
      return removeAuth(state, action)
    default:
      return state
  }
}

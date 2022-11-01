const initialState = {
  attr: null,
  oidc: null,
}
const setOidc = (state, { oidc }) => {
  return { ...state, oidc }
}
const removeOidc = (state) => {
  return { ...state, oidc: null }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_OIDC":
      return setOidc(state, action)
    case "REMOVE_OIDC":
      return removeOidc(state, action)
    default:
      return state
  }
}

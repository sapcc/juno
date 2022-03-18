const initialState = {
  isNewSSOEnabled: false,
  showNewSSO: false,
  endpoint: "",
}

const updateIsNewSSOEnabled = (state, { enabled }) => {
  return { ...state, isNewSSOEnabled: enabled }
}

const showNewSSO = (state, { show }) => {
  return { ...state, showNewSSO: show }
}

const setEndpoint = (state, { endpoint }) => {
  return { ...state, endpoint: endpoint }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_NEW_SSO_ENABLED":
      return updateIsNewSSOEnabled(state, action)
    case "SHOW_NEW_SSO":
      return showNewSSO(state, action)
    case "SET_ENDPOINT":
      return setEndpoint(state, action)
    default:
      return state
  }
}

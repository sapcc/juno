const initialState = {
  isNewSSOEnabled: false,
  showNewSSO: false,
}

const updateIsNewSSOEnabled = (state, { enabled }) => {
  return { ...state, isNewSSOEnabled: enabled }
}

const showNewSSO = (state, { show }) => {
  return { ...state, showNewSSO: show }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_NEW_SSO_ENABLED":
      return updateIsNewSSOEnabled(state, action)
    case "SHOW_NEW_SSO":
      return showNewSSO(state, action)
    default:
      return state
  }
}

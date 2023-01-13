const initialState = {
  isNewSSOEnabled: false,
  showNewSSO: false,
  endpoint: "",
  disabledCAs: [],
  documentationLinks: {},
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

const setDisabledCAs = (state, { cas }) => {
  if (!cas || typeof cas !== "string") return state
  const disabledCAs = cas.split(",")
  return { ...state, disabledCAs: disabledCAs }
}

const setDocumentationLinks = (state, { links }) => {
  if (!links || typeof links !== "string") return state
  let newLinks = {}
  const keyValueLinks = links.split(",")
  keyValueLinks.forEach((kv) => {
    const kvArr = kv.split("=")
    // ensure that there are key and value
    if (kvArr.length === 2) {
      newLinks[kvArr[0]] = kvArr[1]
    }
  })
  return { ...state, documentationLinks: newLinks }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_NEW_SSO_ENABLED":
      return updateIsNewSSOEnabled(state, action)
    case "SHOW_NEW_SSO":
      return showNewSSO(state, action)
    case "SET_ENDPOINT":
      return setEndpoint(state, action)
    case "SET_DISABLED_CAS":
      return setDisabledCAs(state, action)
    case "SET_DOCUMENTATION_LINKS":
      return setDocumentationLinks(state, action)

    default:
      return state
  }
}

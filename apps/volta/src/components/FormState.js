import React, { createContext, useReducer } from "react"

const FormState = createContext(null)
const FormDispatch = createContext(null)

const initialState = { name: "", description: "", identity: "", csr: "" }

const setAttribute = (state, { key, value }) => {
  return { ...state, [key]: value }
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_ATTR":
      return setAttribute(state, action)
    default:
      return state
  }
}

export const FormStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <FormState.Provider value={state}>
      <FormDispatch.Provider value={dispatch}>{children}</FormDispatch.Provider>
    </FormState.Provider>
  )
}

export const useFormDispatch = () => React.useContext(FormDispatch)

export const useFormState = () => {
  return React.useContext(FormState)
}

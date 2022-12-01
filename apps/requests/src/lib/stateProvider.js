import React, { createContext, useContext, useReducer } from "react"
import { reducer, initialState } from "./reducers"

const StateContext = createContext()
const DispatchContext = createContext()

export const useGlobalState = (name) => {
  const state = useContext(StateContext)
  return name ? state[name] : state
}

export const useDispatch = () => useContext(DispatchContext)

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export default StateProvider

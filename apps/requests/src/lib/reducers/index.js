import requests from "./requests"

// combine reducers!
// we use the react hook useReducer to provide global state
// for that we have to combine all reducers to one global reducer.
const reducers = { requests }
const reducer = (state = {}, action = {}) => {
  const newState = { ...state }

  Object.keys(reducers).forEach((name) => {
    newState[name] = reducers[name](state[name], action)
  })

  return newState
}

// calling reducer without params returns the initial state
const initialState = reducer()

export { reducer, initialState }

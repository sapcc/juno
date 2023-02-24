import React from "react"
import { broadcast, get, watch } from "communicator"

function reducer(state, action) {
  if (action.type === "updateAuthData") {
    return {
      ...state,
      authData: action.data,
    }
  }
  throw Error("Unknown action.")
}

const useCommunication = () => {
  const [state, dispatch] = React.useReducer(reducer, {})

  React.useEffect(() => {
    get(
      "AUTH_GET_DATA",
      (data) => {
        console.log("==receive auth data from get", data)
        dispatch({ type: "updateAuthData", data })
      },
      { debug: true }
    )
    const unwatch = watch(
      "AUTH_UPDATE_DATA",
      (data) => {
        console.log("===receive auth data from update", data)
        dispatch({ type: "updateAuthData", data })
      },
      { debug: true }
    )
    return unwatch
  }, [dispatch])

  const login = React.useCallback(() => {
    console.log("LOGIN")
    broadcast("AUTH_LOGIN", "greenhouse", { debug: true })
  }, [])
  const logout = React.useCallback(() => {
    broadcast("AUTH_LOGOUT", "greenhouse")
  }, [])

  return { ...state, login, logout }
}

export default useCommunication

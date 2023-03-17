import { useEffect } from "react"
import { broadcast, watch, onGet } from "communicator"

const useCommunication = ({ authData, login, logout, debug }) => {
  useEffect(() => {
    // inform that the auth app has been loaded!
    broadcast("AUTH_APP_LOADED", true)
    onGet("AUTH_APP_LOADED", () => true)
  }, [])

  useEffect(() => {
    broadcast("AUTH_UPDATE_DATA", authData, { debug })
    const unwatchGet = onGet("AUTH_GET_DATA", () => authData, {
      debug,
    })

    return unwatchGet
  }, [authData])

  useEffect(() => {
    const unwatchLogin = watch("AUTH_LOGIN", login, { debug })
    const unwatchLogout = watch("AUTH_LOGOUT", logout, { debug })
    // unregister on get listener when unmounting
    return () => {
      unwatchLogin()
      unwatchLogout()
    }
  }, [login, logout])
}

export default useCommunication

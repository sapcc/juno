import { useEffect } from "react"
import { broadcast, get, watch } from "communicator"
import useStore from "./useStore"

const useCommunication = () => {
  const auth = useStore((state) => state.auth)
  const userActivity = useStore((state) => state.userActivity)

  useEffect(() => {
    if (!auth.appLoaded || auth?.isProcessing || auth?.error) return
    if (auth?.lastAction?.name === "signOn" && !auth?.loggedIn) {
      broadcast("AUTH_LOGIN", "greenhouse", { debug: true })
    } else if (auth?.lastAction?.name === "signOut" && auth?.loggedIn) {
      broadcast("AUTH_LOGOUT", "greenhouse")
    }
  }, [auth?.lastAction])

  useEffect(() => {
    if (!auth?.setData || !auth?.setAppLoaded) return

    get("AUTH_APP_LOADED", auth?.setAppLoaded)
    const unwatchLoaded = watch("AUTH_APP_LOADED", auth?.setAppLoaded)

    get("AUTH_GET_DATA", auth.setData)
    const unwatchUpdate = watch("AUTH_UPDATE_DATA", auth.setData)

    return () => {
      if (unwatchLoaded) unwatchLoaded()
      if (unwatchUpdate) unwatchUpdate()
    }
  }, [auth?.setData, auth?.setAppLoaded])

  useEffect(() => {
    // check against undefined since this is a boolean
    if (userActivity?.inactiveModal === undefined) return

    broadcast(
      "GREENHOUSE_USER_ACTIVITY",
      { isUserInactive: userActivity?.inactiveModal },
      { debug: true }
    )
  }, [userActivity?.inactiveModal])
}

export default useCommunication

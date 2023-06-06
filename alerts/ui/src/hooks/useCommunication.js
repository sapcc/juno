import { useEffect } from "react"
import { broadcast, get, watch } from "communicator"
import {
  useUserActivityActions,
  useAuthAppLoaded,
  useAuthIsProcessing,
  useAuthError,
  useAuthLoggedIn,
  useAuthLastAction,
  useAuthActions,
  ACTIONS,
} from "./useStore"

const useCommunication = () => {
  console.log("[supernova] useCommunication setup")
  const { setIsActive } = useUserActivityActions()
  const authAppLoaded = useAuthAppLoaded()
  const authIsProcessing = useAuthIsProcessing()
  const authError = useAuthError()
  const authLoggedIn = useAuthLoggedIn()
  const authLastAction = useAuthLastAction()
  const { setData: authSetData, setAppLoaded: authSetAppLoaded } =
    useAuthActions()

  useEffect(() => {
    // watch for user activity updates messages
    // with the watcher we get the user activity object when this app is loaded before the Auth app
    const unwatch = watch(
      "USER_ACTIVITY_UPDATE_DATA",
      (data) => {
        console.log("got message USER_ACTIVITY_UPDATE_DATA: ", data)
        setIsActive(data?.isActive)
      },
      { debug: true }
    )
    return unwatch
  }, [setIsActive])

  useEffect(() => {
    console.log("authLastAction:::", authLastAction)
    if (!authAppLoaded || authIsProcessing || authError) return
    if (authLastAction?.name === ACTIONS.SIGN_ON && !authLoggedIn) {
      broadcast("AUTH_LOGIN", "supernova", { debug: false })
    } else if (authLastAction?.name === ACTIONS.SIGN_OUT && authLoggedIn) {
      broadcast("AUTH_LOGOUT", "supernova")
    }
  }, [authAppLoaded, authIsProcessing, authError, authLoggedIn, authLastAction])

  useEffect(() => {
    if (!authSetData || !authSetAppLoaded) return

    get("AUTH_APP_LOADED", authSetAppLoaded)
    const unwatchLoaded = watch("AUTH_APP_LOADED", authSetAppLoaded)

    get("AUTH_GET_DATA", authSetData)
    const unwatchUpdate = watch("AUTH_UPDATE_DATA", authSetData)

    return () => {
      if (unwatchLoaded) unwatchLoaded()
      if (unwatchUpdate) unwatchUpdate()
    }
  }, [authSetData, authSetAppLoaded])
}

export default useCommunication

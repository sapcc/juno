import { useEffect } from "react"
import { broadcast, get, watch } from "communicator"
import {
  useAuthAppLoaded,
  useAuthIsProcessing,
  useAuthError,
  useAuthLoggedIn,
  useAuthLastAction,
  useAuthActions,
} from "./useStore"

const useCommunication = () => {
  const authAppLoaded = useAuthAppLoaded()
  const authIsProcessing = useAuthIsProcessing()
  const authError = useAuthError()
  const authLoggedIn = useAuthLoggedIn()
  const authLastAction = useAuthLastAction()
  const { setData: authSetData, setAppLoaded: authSetAppLoaded } =
    useAuthActions()

  useEffect(() => {
    if (!authAppLoaded || authIsProcessing || authError) return
    if (authLastAction?.name === "signOn" && !authLoggedIn) {
      broadcast("AUTH_LOGIN", "greenhouse", { debug: false })
    } else if (authLastAction?.name === "signOut" && authLoggedIn) {
      broadcast("AUTH_LOGOUT", "greenhouse")
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

import { useEffect } from "react"
import { get, watch } from "communicator"
import { useActions } from "../components/StoreProvider"

const useCommunication = () => {
  const { setAuthData: setAuthData } = useActions()
  const { setAuthAppLoaded: setAuthAppLoaded } = useActions()

  useEffect(() => {
    if (!setAuthData || !setAuthAppLoaded) return
    get("AUTH_APP_LOADED", setAuthAppLoaded, {
      consumerID: "greenhouse",
      debug: true,
    })
    const unwatchLoaded = watch("AUTH_APP_LOADED", setAuthAppLoaded, {
      debug: true,
      consumerID: "greenhouse",
    })

    get("AUTH_GET_DATA", setAuthData, { consumerID: "greenhouse", debug: true })
    const unwatchUpdate = watch("AUTH_UPDATE_DATA", setAuthData, {
      debug: true,
      consumerID: "greenhouse",
    })

    return () => {
      if (unwatchLoaded) unwatchLoaded()
      if (unwatchUpdate) unwatchUpdate()
    }
  }, [setAuthData, setAuthAppLoaded])
}

export default useCommunication

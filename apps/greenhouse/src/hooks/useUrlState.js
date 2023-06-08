import { useEffect } from "react"
import { registerConsumer } from "url-state-provider/src"
import {
  useAppsActions,
  useAppsActive,
  useAppsConfig,
  useAuthAppIsLoading,
  useAuthLoggedIn,
} from "./useStore"

// url state manager
const urlStateManager = registerConsumer("GREENHOUSE")
const ACTIVE_APPS_KEY = "a"

const useUrlState = () => {
  const { setActive: setActiveApps } = useAppsActions()
  const activeApps = useAppsActive()
  const appsConfig = useAppsConfig()
  const loggedIn = useAuthLoggedIn()

  // Initial state from URL (on login)
  useEffect(() => {
    if (!loggedIn || !appsConfig) return
    let active = urlStateManager.currentState()?.[ACTIVE_APPS_KEY]
    if (active) setActiveApps(active.split(","))
  }, [loggedIn, appsConfig, setActiveApps])

  // sync URL state
  useEffect(() => {
    if (!loggedIn) return
    urlStateManager.push({ [ACTIVE_APPS_KEY]: activeApps.join(",") })
  }, [loggedIn, activeApps])
}

export default useUrlState

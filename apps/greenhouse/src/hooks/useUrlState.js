import { useEffect } from "react"
import { registerConsumer } from "url-state-provider"
import useStore from "./useStore"

// url state manager
const urlStateManager = registerConsumer("GREENHOUSE")
const ACTIVE_APPS_KEY = "a"

const useUrlState = () => {
  const setActive = useStore((state) => state.apps.setActive)
  const activeApps = useStore((state) => state.apps.active)
  const appsConfig = useStore((state) => state.apps.config)
  const loggedIn = useStore((state) => state.auth.loggedIn)

  // Initial state from URL (on login)
  useEffect(() => {
    if (!loggedIn || !appsConfig) return
    let active = urlStateManager.currentState()?.[ACTIVE_APPS_KEY]
    if (active) setActive(active.split(","))
  }, [loggedIn, appsConfig])

  // sync URL state
  useEffect(() => {
    if (!loggedIn) return
    urlStateManager.push({ [ACTIVE_APPS_KEY]: activeApps.join(",") })
  }, [loggedIn, activeApps])
}

export default useUrlState

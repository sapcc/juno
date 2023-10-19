import { useEffect, useLayoutEffect } from "react"
import { registerConsumer } from "url-state-provider"
import {
  useAppsActions,
  useAppsActive,
  useAppsConfig,
  useAuthLoggedIn,
  useGlobalsIsUrlStateSetup,
  useGlobalsActions,
} from "../components/StoreProvider"

// url state manager
const GREENHOUSE_STATE_KEY = "greenhouse"
const ACTIVE_APPS_KEY = "a"
const urlStateManager = registerConsumer(GREENHOUSE_STATE_KEY)

const useUrlState = () => {
  const { setActive: setActiveApps } = useAppsActions()
  const activeApps = useAppsActive()
  const appsConfig = useAppsConfig()
  const loggedIn = useAuthLoggedIn()
  const isUrlStateSetup = useGlobalsIsUrlStateSetup()
  const { setIsUrlStateSetup } = useGlobalsActions()

  // Initial state from URL (on login)
  useLayoutEffect(() => {
    if (!loggedIn || !appsConfig || isUrlStateSetup) return

    let active = urlStateManager.currentState()?.[ACTIVE_APPS_KEY]
    if (active) setActiveApps(active.split(","))
    setIsUrlStateSetup(true)
  }, [loggedIn, appsConfig, setActiveApps])

  // sync URL state
  useEffect(() => {
    if (!loggedIn || !isUrlStateSetup) return
    urlStateManager.push({ [ACTIVE_APPS_KEY]: activeApps.join(",") })
  }, [loggedIn, activeApps])

  useEffect(() => {
    const unregisterStateListener = urlStateManager.onChange((state) =>
      setActiveApps(state[ACTIVE_APPS_KEY] || [])
    )

    const unregisterGlobalChangeListener = urlStateManager.onGlobalChange(
      (state) => {
        const url = new URL(window.location)
        document.title = `Greenhouse - ${url.searchParams.get("__s")}`
      }
    )

    return () => {
      unregisterStateListener()
      unregisterGlobalChangeListener()
    }
  }, [])
}

export default useUrlState

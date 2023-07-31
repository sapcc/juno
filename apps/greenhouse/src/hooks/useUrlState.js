import { useEffect, useLayoutEffect } from "react"
import { registerConsumer, EVENT_URL_STATE_CHANGED } from "url-state-provider"
import {
  useAppsActions,
  useAppsActive,
  useAppsConfig,
  useAuthLoggedIn,
  useGlobalsIsUrlStateSetup,
  useGlobalsActions,
} from "./useStore"

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
    // set document title
    const eventHandler = (state) => {
      // start with default title
      let title = "Greenhouse"
      try {
        // get active app name from url state
        const activeApp =
          state.detail?.[GREENHOUSE_STATE_KEY]?.[ACTIVE_APPS_KEY]

        if (activeApp) {
          // add active app name and state
          title += ` - ${activeApp}`
          // get active app state from url state
          let activeAppState = JSON.stringify(
            state.detail?.[activeApp],
            (k, v) => (v === null ? undefined : v)
          )
          // add active app state to title
          if (activeAppState) title += `: ${activeAppState}`
        }
      } catch (e) {
        console.debug("GREENHOUSE ERROR", e)
      }
      document.title = title
    }
    window.addEventListener(EVENT_URL_STATE_CHANGED, eventHandler)
    return () => {
      window.removeEventListener(EVENT_URL_STATE_CHANGED, eventHandler)
    }
  }, [])
}

export default useUrlState

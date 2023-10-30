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

    const newActiveApps = activeApps?.join(",")
    // if the current state is the same as the new state, don't push
    // this prevents the history from being filled with the same state
    // and therefore prevents the forward button from being disabled
    // This small optimization allows the user to go back and forth!
    if (urlStateManager.currentState()?.[ACTIVE_APPS_KEY] === newActiveApps)
      return

    urlStateManager.push({ [ACTIVE_APPS_KEY]: activeApps.join(",") })
  }, [loggedIn, activeApps])

  useEffect(() => {
    const unregisterStateListener = urlStateManager.onChange((state) => {
      const newActiveApps = state?.[ACTIVE_APPS_KEY]?.split(",")
      setActiveApps(newActiveApps || [])
    })

    // disable this for now, it's annoying!
    // This code sets the title of the page if URL changes.
    // It was introduced to see different titles in the browser history.
    // const unregisterGlobalChangeListener = urlStateManager.onGlobalChange(
    //   (state) => {
    //     const url = new URL(window.location)
    //     document.title = `Greenhouse - ${url.searchParams.get("__s")}`
    //   }
    // )

    return () => {
      unregisterStateListener()
      unregisterGlobalChangeListener()
    }
  }, [])
}

export default useUrlState

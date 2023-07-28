import { useEffect, useLayoutEffect } from "react"
import { registerConsumer } from "url-state-provider"
import {
  useAppsActions,
  useAppsActive,
  useAppsConfig,
  useAuthLoggedIn,
  useGlobalsIsUrlStateSetup,
  useGlobalsActions,
} from "./useStore"

// url state manager
const urlStateManager = registerConsumer("greenhouse")
const ACTIVE_APPS_KEY = "a"

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

  // useEffect(() => {
  //   let t = urlStateManager.onChange((a, b, c) =>
  //     console.log("--------------------------------------log", a, b, c)
  //   )
  // }, [urlStateManager])
}

export default useUrlState

import { useEffect, useState, useLayoutEffect } from "react"
import { registerConsumer } from "url-state-provider"
import {
  useActions,
  useIsLoggedIn,
  useIsUrlStateSetup,
  usePluginActive,
} from "../components/StoreProvider"

// url state manager
const URL_APP_STATE_KEY = "greenhouse-management"
const ACTIVE_APP_KEY = "a"
const urlStateManager = registerConsumer(URL_APP_STATE_KEY)

const useUrlState = () => {
  const { setPluginActive, setIsUrlStateSetup } = useActions()
  const [isURLRead, setIsURLRead] = useState(false)
  const isUrlStateSetup = useIsUrlStateSetup()
  const pluginActive = usePluginActive()
  const isLoggedIn = useIsLoggedIn()

  useLayoutEffect(() => {
    // just read the url state once, after the user is logged in
    if (!isLoggedIn || isURLRead) return

    if (isUrlStateSetup) return

    let active = urlStateManager.currentState()?.[ACTIVE_APP_KEY]
    if (active) setPluginActive(active)
    setIsUrlStateSetup(true)

    setIsURLRead(true)
  }, [isUrlStateSetup, isLoggedIn])

  // sync URL state
  useEffect(() => {
    if (!isUrlStateSetup) return

    // if the current state is the same as the new state, don't push
    // this prevents the history from being filled with the same state
    // and therefore prevents the forward button from being disabled
    // This small optimization allows the user to go back and forth!
    if (urlStateManager.currentState()?.[ACTIVE_APP_KEY] === pluginActive)
      return

    urlStateManager.push({ [ACTIVE_APP_KEY]: pluginActive })
  }, [isUrlStateSetup, pluginActive])
}

export default useUrlState

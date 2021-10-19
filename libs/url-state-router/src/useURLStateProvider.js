import { useState, useEffect } from "react"
import { registerConsumer } from "url-state-provider"

/**
 * This hook takes over the actual registration with the URL State Provider.
 * @param {string} stateID
 * @returns object with state, navigateTo, redirectTo
 */
const useURLStateProvider = (stateID) => {
  const [navigation, setNavigation] = useState()
  const [state, setState] = useState()

  useEffect(() => {
    if (!stateID)
      throw new Error("stateID is undefined. Please provide an unique ID.")

    const { push, replace, onChange, currentState } = registerConsumer(stateID)
    const unregisterConsumer = onChange(setState)

    setState(currentState() || {})

    const navigation = {
      navigateTo: (path, options) => push({ p: path, o: options }),
      redirectTo: (path, options) => replace({ p: path, o: options }),
    }
    setNavigation(navigation)
    return unregisterConsumer
  }, [stateID])

  // Since the useEffect hook is not executed until after the first rendering,
  // we are returning null at this point.
  if (!navigation) return null

  return {
    state,
    navigateTo: navigation.navigateTo,
    redirectTo: navigation.redirectTo,
  }
}

export default useURLStateProvider

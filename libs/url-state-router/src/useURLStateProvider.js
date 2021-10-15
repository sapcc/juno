import { useState, useEffect } from "react"
import { registerConsumer } from "url-state-provider"

const useURLStateProvider = (stateID) => {
  const [navigation, setNavigation] = useState()
  const [state, setState] = useState()

  useEffect(() => {
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

  if (!navigation) return null

  return {
    state,
    navigateTo: navigation.navigateTo,
    redirectTo: navigation.redirectTo,
  }
}

export default useURLStateProvider

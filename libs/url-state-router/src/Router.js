import { RouterContext } from "./RouterContext"
import useURLStateProvider from "./useURLStateProvider"

const Router = ({ stateID, children }) => {
  const URLStateProvider = useURLStateProvider(stateID)
  if (!URLStateProvider) return null

  return (
    <RouterContext.Provider
      value={{
        insideRouter: true,
        currentPath: URLStateProvider.state.p || "/",
        options: URLStateProvider.state.o,
        navigateTo: URLStateProvider.navigateTo,
        redirectTo: URLStateProvider.redirectTo,
      }}
    >
      {children}
    </RouterContext.Provider>
  )
}

export default Router

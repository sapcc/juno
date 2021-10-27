import { createContext, useContext } from "react"

// Router context
export const RouterContext = createContext({ insideRouter: false })

/**
 * This function checks whether the insideRouter variable in router context is true.
 * If not, a warning is issued!
 * @returns router context
 */
export const useRouter = () => {
  const context = useContext(RouterContext)

  if (!context || !context.insideRouter) {
    console.warn(
      "You should not use <Route>, <Switch>, <Redirect> or <Link> outside a <Router>"
    )
  }
  return context
}

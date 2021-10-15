import { createContext, useContext } from "react"

export const RouterContext = createContext({ insideRouter: false })
export const useRouter = () => {
  const context = useContext(RouterContext)

  if (!context || !context.insideRouter) {
    console.warn(
      "You should not use <Route>, <Switch>, <Redirect> or <Link> outside a <Router>"
    )
  }
  return context
}

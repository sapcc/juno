import React from "react"
import { useMemo, createElement } from "react"
import { useRouter } from "."
import { RouterContext } from "./RouterContext"
import routeMatcher from "./routeMatcher"

const Route = ({ path, exact, children, component }) => {
  const { currentPath, options, ...otherProps } = useRouter()
  const [match, routeParams] = useMemo(
    () => routeMatcher(currentPath, path, { exact }),
    [currentPath, path, exact]
  )

  if (!match) return null

  return (
    <RouterContext.Provider
      value={{ path: currentPath, options, routeParams, ...otherProps }}
    >
      {component ? createElement(component) : children}
    </RouterContext.Provider>
  )
}

export default Route

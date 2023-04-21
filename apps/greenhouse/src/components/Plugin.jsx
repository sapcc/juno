import React, { useEffect, useMemo } from "react"
import useAppLoader from "../hooks/useAppLoader"
import { useAppsConfig } from "../hooks/useStore"
import { Spinner } from "juno-ui-components"
import { useRef } from "react"

const Plugin = ({ name, active }) => {
  const { mount } = useAppLoader()
  const holder = useRef()
  const app = useRef(document.createElement("div"))
  const config = useAppsConfig()
  const mounted = useRef(false)

  // create a promise to mount the app
  // this promise is resolved once
  const mountApp = useMemo(
    () =>
      new Promise((resolve) => {
        const a = mount(app.current, config[name])
        if (!a) resolve(false)
        else a.then(() => (mounted.current = true)).then(() => resolve(true))
      }),
    [mount]
  )

  useEffect(() => {
    if (!config[name]) return

    if (active) {
      // load and add to holder
      mountApp.then((loaded) => {
        if (!loaded) return
        holder.current.appendChild(app.current)
      })
    } else {
      // remove from holder
      if (holder.current.contains(app.current))
        holder.current.removeChild(app.current)
    }
  }, [active])

  return <div data-app={name} ref={holder}></div>
}

export default Plugin

import React, { useEffect, useMemo } from "react"
import useAppLoader from "../hooks/useAppLoader"
import { useAppsConfig } from "../hooks/useStore"
import { Spinner } from "juno-ui-components"
import { useRef } from "react"

const Plugin = ({ id, active }) => {
  const { mount } = useAppLoader()
  const holder = useRef()
  const el = document.createElement("div")
  el.classList.add("inline")
  const app = useRef(el)
  const config = useAppsConfig()
  const mounted = useRef(false)

  // create a promise to mount the app
  // this promise is resolved once
  const mountApp = useMemo(
    () =>
      new Promise((resolve) => {
        const a = mount(app.current, config[id])
        if (!a) resolve(false)
        else a.then(() => (mounted.current = true)).then(() => resolve(true))
      }),
    [mount]
  )

  useEffect(() => {
    if (!config[id]) return

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

  return <div data-app={id} ref={holder} className="inline"></div>
}

export default Plugin

import React, { useEffect, useMemo, useRef } from "react"
import { useAppLoader } from "utils"
import { useAssetsUrl, usePluginActive } from "./StoreProvider"

const Plugin = ({ config }) => {
  const assetsUrl = useAssetsUrl()
  const { mount } = useAppLoader(assetsUrl)
  const holder = useRef()
  const activePlugin = usePluginActive()

  const el = document.createElement("div")
  el.classList.add("inline")
  const app = useRef(el)

  const mountApp = useMemo(() => mount(app.current, config), [mount])

  useEffect(() => {
    if (!config) return

    if (activePlugin === config.name) {
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
  }, [activePlugin])

  return <div data-app={config?.name} ref={holder} className="inline"></div>
}

export default Plugin

import React, { useEffect, useMemo } from "react"
import { useAppLoader } from "utils"
import { usePlugin, useGlobalsAssetsHost } from "../components/StoreProvider"
import { useRef } from "react"

const Plugin = ({ id }) => {
  const assetsHost = useGlobalsAssetsHost()
  const { mount } = useAppLoader(assetsHost)
  const holder = useRef()
  const config = usePlugin().config()
  const activeApps = usePlugin().active()

  const el = document.createElement("div")
  el.classList.add("inline")
  const app = useRef(el)

  // create a promise to mount the app
  // this promise is resolved once
  const mountApp = useMemo(() => mount(app.current, config[id]), [mount])

  useEffect(() => {
    if (!config[id]) return

    if (activeApps.indexOf(id) >= 0) {
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
  }, [activeApps])

  return <div data-app={id} ref={holder} className="inline"></div>
}

export default Plugin

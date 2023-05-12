import { useEffect, useCallback, useState, useMemo, useRef } from "react"
import useStore from "../store"

// load widget-loader with importmap-only attribute to
// ensure the importmap is loaded
const importmaps = {}
const loadImportmap = (assetsUrl) => {
  importmaps[assetsUrl] =
    importmaps[assetsUrl] ||
    new Promise((resolve, reject) => {
      // this promise is resolved once!
      const url = new URL("/apps/widget-loader@latest/build/app.js", assetsUrl)
      const script = document.createElement("script")
      script.src = url.href
      script.setAttribute("data-importmap-only", "true")

      document.head.append(script)
      window.addEventListener("JUNO_IMPORTMAP_LOADED", (e) => {
        //setLoaded(true)
        resolve(true)
      })
    })

  return importmaps[assetsUrl]
}

const useAppLoader = () => {
  const assetsUrl = useStore((state) => state.assetsUrl)

  const mount = useCallback(
    (container, config) => {
      if (!assetsUrl) return null
      return loadImportmap(assetsUrl).then(() => {
        console.log("==============MOUNT", config?.name, config)
        let url = config.url
          ? config.url
          : `@juno/${config.name}@${config.version || "latest"}`
        return importShim(url).then((app) => {
          app.mount(container, { props: { ...config.props, embedded: true } })
          return app.unmount
        })
      })
    },
    [assetsUrl]
  )
  return { mount }
}

export default useAppLoader

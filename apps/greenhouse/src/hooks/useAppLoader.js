import { useEffect, useCallback, useState, useMemo, useRef } from "react"
import useStore from "./useStore"

// load widget-loader with importmap-only attribute to
// ensure the importmap is loaded
const importmaps = {}
const loadImportmap = (assetsHost) => {
  importmaps[assetsHost] =
    importmaps[assetsHost] ||
    new Promise((resolve, reject) => {
      // this promise is resolved once!
      console.log("===PROMISE", assetsHost)
      const url = new URL("/apps/widget-loader@latest/build/app.js", assetsHost)
      const script = document.createElement("script")
      script.src = url.href
      script.setAttribute("data-importmap-only", "true")

      document.head.append(script)
      window.addEventListener("JUNO_IMPORTMAP_LOADED", (e) => {
        //setLoaded(true)
        resolve(true)
      })
    })

  return importmaps[assetsHost]
}

const useAppLoader = () => {
  const assetsHost = useStore((state) => state.assetsHost)

  const mount = useCallback(
    (container, config) => {
      if (!assetsHost) return null
      return loadImportmap(assetsHost).then(() => {
        console.log("==============MOUNT", config?.name)
        let url = config.url
          ? config.url
          : `@juno/${config.name}@${config.version || "latest"}`
        return importShim(url).then((app) => {
          app.mount(container, { props: { ...config.props, embedded: true } })
          return app.unmount
        })
      })
    },
    [assetsHost]
  )
  return { mount }
}

export default useAppLoader

import { useEffect, useCallback, useState } from "react"
import useStore from "./useStore"

const useAppLoader = () => {
  const [loaded, setLoaded] = useState()
  const assetsHost = useStore((state) => state.assetsHost)

  // ensure Importmap is loaded!
  useEffect(() => {
    if (!assetsHost) return
    const url = new URL("/apps/widget-loader@latest/build/app.js", assetsHost)
    const script = document.createElement("script")
    script.src = url.href
    script.setAttribute("data-importmap-only", "true")

    document.head.append(script)
    window.addEventListener("JUNO_IMPORTMAP_LOADED", (e) => {
      setLoaded(true)
    })
  }, [setLoaded, assetsHost])

  const mount = useCallback(
    (container, appData) => {
      if (!loaded) return null
      console.log("==============MOUNT", appData?.name)
      let url = appData.url
        ? appData.url
        : `@juno/${appData.name}@${appData.version || "latest"}`
      return importShim(url).then((app) => {
        app.mount(container, { props: { ...appData.props, embedded: true } })
        return app.unmount
      })
    },
    [loaded]
  )
  return { mount }
}

export default useAppLoader

import React from "react"

const useAppLoader = () => {
  const [loaded, setLoaded] = React.useState()

  React.useEffect(() => {
    if (document.querySelector(`script[data-juno-importmap]`)) {
      setLoaded(true)
      console.log("IMPORTMAP LOADED 1")
    } else {
      document.head.append(
        '<script defer src="https://assets.juno.qa-de-1.cloud.sap/apps/widget-loader@latest/build/app.js" data-importmap-only="true"></script>'
      )
      window.addEventListener("junoImportmapLoaded", () => {
        setLoaded(true)
        console.log("IMPORTMAP LOADED 2")
      })
    }
  }, [setLoaded])

  const mount = React.useCallback(
    (container, appData) => {
      if (!loaded) return null
      console.log("==============MOUNT", appData?.name)
      let url = appData.url
        ? appData.url
        : `@juno/${appData.name}@${appData.version || "latest"}`
      return importShim(url).then((app) => {
        app.mount(container, { props: { ...appData.props } })
        return app.unmount
      })
    },
    [loaded]
  )
  return { mount }
}

export default useAppLoader

import React, { useEffect, useMemo } from "react"
import useAppLoader from "../../hooks/useAppLoader"
import { useRef } from "react"
import { Box } from "juno-ui-components"

const TabPreview = ({ config }) => {
  const { mount } = useAppLoader()
  const holder = useRef()
  const app = useRef(document.createElement("div"))
  const mounted = useRef(false)

  // create a promise to mount the app
  // this promise is resolved once
  const mountApp = useMemo(
    () =>
      new Promise((resolve) => {
        const a = mount(app.current, config)
        if (!a) resolve(false)
        else a.then(() => (mounted.current = true)).then(() => resolve(true))
      }),
    [mount, config]
  )

  useEffect(() => {
    if (!config) return

    mountApp.then((loaded) => {
      if (!loaded) return
      holder.current.appendChild(app.current)
    })
  }, [])

  return (
    <Box className="p-8">
      <div data-app={config.name} ref={holder}></div>
    </Box>
  )
}

export default TabPreview

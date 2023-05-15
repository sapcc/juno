import React, { useEffect, useMemo, useState } from "react"
import useAppLoader from "../../hooks/useAppLoader"
import { useRef } from "react"
import { Box, Stack, Spinner } from "juno-ui-components"

const TabPreview = ({ config }) => {
  const { mount } = useAppLoader()
  const holder = useRef()
  const app = useRef(document.createElement("div"))
  const mounted = useRef(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // create a promise to mount the app
  // this promise is resolved once
  const mountApp = useMemo(
    () =>
      new Promise((resolve) => {
        const a = mount(app.current, config)
        setIsLoading(true)
        setIsMounted(false)
        if (!a) resolve(false)
        else
          a.then(() => (mounted.current = true)).then(() => {
            setIsLoading(false)
            setIsMounted(true)
            return resolve(true)
          })
      }),
    [mount, config]
  )

  useEffect(() => {
    if (!isMounted) return

    mountApp.then((loaded) => {
      if (!loaded) return
      holder.current.appendChild(app.current)
    })
  }, [isMounted])

  return (
    <Box className="p-8">
      {isLoading ? (
        <Stack className="pt-2" alignment="center">
          <Spinner variant="primary" />
          Loading...
        </Stack>
      ) : (
        <>
          <p className="mb-6">
            This is a preview of the {config.name} micro frontend without{" "}
            <b>any specific configuration.</b>
          </p>
          <div data-app={config.name} ref={holder}></div>
        </>
      )}
    </Box>
  )
}

export default TabPreview

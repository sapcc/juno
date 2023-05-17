import React, { useEffect, useMemo, useState } from "react"
import useAppLoader from "../../hooks/useAppLoader"
import { useRef } from "react"
import { Box, Stack, Spinner, Message } from "juno-ui-components"
import PreviewAppPropsForm from "./PreviewAppPropsForm"

const TabPreview = ({ asset }) => {
  const { mount } = useAppLoader()
  const holder = useRef()
  const app = useRef(document.createElement("div"))
  const [isLoading, setIsLoading] = useState(false)
  const [appProps, setAppProps] = useState({})

  useEffect(() => {
    // reset app props on asset change
    setAppProps({})
  }, [asset])

  const config = useMemo(() => {
    return {
      name: asset?.name,
      version: asset?.version,
      appPreview: asset?.latestAppPreview,
      props: appProps,
    }
  }, [asset, appProps])

  // create a promise to mount the app
  // this promise is resolved once
  const mountApp = useMemo(() => {
    if (!config?.appPreview) return
    return new Promise((resolve) => {
      const a = mount(app.current, config)
      setIsLoading(true)
      if (!a) resolve(false)
      else
        a.then(() => {
          setIsLoading(false)
          return resolve(true)
        })
    })
  }, [mount, config])

  useEffect(() => {
    if (config?.appPreview) {
      mountApp.then((loaded) => {
        if (!loaded || !holder.current) return
        holder.current.appendChild(app.current)
      })
    }
  }, [config])

  const onAppPropsChange = (newAppProps) => {
    setAppProps(newAppProps)
  }

  return (
    <>
      <PreviewAppPropsForm asset={asset} onAppPropsChange={onAppPropsChange} />
      <Box className="p-8">
        {config?.appPreview ? (
          <>
            {isLoading ? (
              <Stack className="pt-2" alignment="center">
                <Spinner variant="primary" />
                Loading...
              </Stack>
            ) : (
              <>
                {Object.keys(appProps || {}).length <= 0 && (
                  <p className="mb-6">
                    This is a preview of the <b>{config.name}</b> micro frontend
                    without <b>any specific configuration.</b>
                  </p>
                )}
              </>
            )}
            <div data-app={config.name} ref={holder}></div>
          </>
        ) : (
          <Message
            title={config.name}
            text="There is no preview available for this micro frontend"
          />
        )}
      </Box>
    </>
  )
}

export default TabPreview

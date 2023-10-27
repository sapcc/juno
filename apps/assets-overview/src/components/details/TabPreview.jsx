import React, { useEffect, useMemo, useState, useRef } from "react"
import useAppLoader from "../../hooks/useAppLoader"
import { Box, Stack, Spinner, Message, Icon } from "juno-ui-components"
import PreviewAppPropsForm from "./PreviewAppPropsForm"
import useStore from "../../store"
import { stateToURL } from "url-state-provider"

const TabPreview = ({ asset }) => {
  const { mount } = useAppLoader()
  const holder = useRef()
  const app = useRef(document.createElement("div"))
  const [isLoading, setIsLoading] = useState(false)
  const [appProps, setAppProps] = useState({})
  const urlStateTestingKey = useStore((state) => state.urlStateTestingKey)

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
    if (!config?.appPreview || !holder?.current) return
    // mount the app
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
  }, [mount, config, holder])

  useEffect(() => {
    if (!mountApp) return
    if (config?.appPreview) {
      // bind the app
      mountApp.then((loaded) => {
        if (!loaded || !holder.current) return
        holder.current.appendChild(app.current)
      })
    }
  }, [config?.appPreview, mountApp])

  const onAppPropsChange = (newAppProps) => {
    setAppProps(newAppProps)
  }

  return (
    <>
      {config?.appPreview ? (
        <>
          <PreviewAppPropsForm
            asset={asset}
            onAppPropsChange={onAppPropsChange}
          />
          <Box>
            <Stack className="mt-2" distribution="end">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  const url = stateToURL({
                    [urlStateTestingKey]: { p: "/testing", o: config },
                  })
                  window.open(url, "_blank")
                }}
              >
                <Icon color="jn-global-text" icon="openInNew" />
              </a>
            </Stack>

            <div className="px-8 pb-8 pt-2">
              {isLoading ? (
                <Stack alignment="center">
                  <Spinner variant="primary" />
                  Loading...
                </Stack>
              ) : (
                <>
                  {Object.keys(appProps || {}).length <= 0 && (
                    <p className="mb-6">
                      This is a preview of the <b>{config.name}</b> micro
                      frontend without <b>any specific configuration.</b>
                    </p>
                  )}
                </>
              )}
              <div data-app={config.name} ref={holder}></div>
            </div>
          </Box>
        </>
      ) : (
        <Message
          className="mt-8"
          title={config.name}
          text="There is no preview available for this micro frontend"
        />
      )}
    </>
  )
}

export default TabPreview

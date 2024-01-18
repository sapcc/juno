import React, { useEffect, useState, useMemo, useRef } from "react"
import { useAppLoader } from "utils"
import { usePlugin, useGlobalsAssetsHost } from "../components/StoreProvider"
import { Messages, useActions } from "messages-provider"
import { parseError } from "../lib/helpers"
import { Stack, Button } from "juno-ui-components"

const Plugin = ({ id }) => {
  const assetsHost = useGlobalsAssetsHost()
  const { mount } = useAppLoader(assetsHost)
  const holder = useRef()
  const config = usePlugin().config()
  const activeApps = usePlugin().active()
  const { addMessage } = useActions()
  const [displayReload, setDisplayReload] = useState(false)
  const [reload, setReload] = useState(0)

  const el = document.createElement("div")
  el.classList.add("inline")
  const app = useRef(el)

  // this promise is resolved once per app(config[id])
  // The embedded-prop should be true to secure the right display as embedded app.
  const mountApp = useMemo(() => {
    // lets wait until the assetsUrl exists to create the mount function with the correct assets url
    if (!assetsHost) return

    return mount(app.current, {
      ...config[id],
      props: { ...config[id]?.props, embedded: true },
    }).catch((error) => {
      setDisplayReload(true)
      addMessage({
        variant: "error",
        text: `${config[id]?.name}: ` + parseError(error),
      })
    })
  }, [mount, reload, assetsHost, addMessage])

  const displayPluging = useMemo(
    () => activeApps.indexOf(id) >= 0,
    [activeApps, config]
  )

  useEffect(() => {
    if (!config[id] || !mountApp) return

    if (displayPluging) {
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
  }, [mountApp, displayPluging])

  return (
    <div data-app={id} ref={holder} className="inline">
      {displayPluging && (
        <>
          <Messages className="mr-4" />
          {displayReload && (
            <Stack
              alignment="center"
              distribution="center"
              direction="vertical"
              className="my-[10vh]"
            >
              <p className="text-xl">
                Uh-oh! Our plugin <b>{config?.label}</b> encountered a hiccup.{" "}
              </p>
              <p>
                No worries, just give it a little nudge by clicking the{" "}
                <strong>Reload</strong> button below.
              </p>
              <Button
                label="Reload"
                variant="primary"
                onClick={() => setReload(reload + 1)}
                className="mt-2"
              />
            </Stack>
          )}
        </>
      )}
    </div>
  )
}

export default Plugin

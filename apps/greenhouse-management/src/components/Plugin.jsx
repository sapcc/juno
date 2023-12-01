import React, { useEffect, useMemo, useRef, useState } from "react"
import { useAppLoader } from "utils"
import { useAssetsUrl, usePluginActive } from "./StoreProvider"
import { Messages, useActions } from "messages-provider"
import { parseError } from "../lib/helpers"
import { Stack, Button } from "juno-ui-components"

const Plugin = ({ config }) => {
  const { addMessage } = useActions()
  const assetsUrl = useAssetsUrl()
  const { mount } = useAppLoader(assetsUrl)
  const holder = useRef()
  const activePlugin = usePluginActive()
  const [displayReload, setDisplayReload] = useState(false)
  const [reload, setReload] = useState(0)

  const el = document.createElement("div")
  el.classList.add("inline")
  const app = useRef(el)

  // useMemo to not mount the app each time the component is reloaded losing the state
  // TODO: should we keep this apps also in memory??
  const mountApp = useMemo(() => {
    return mount(app.current, config).catch((error) => {
      setDisplayReload(true)
      addMessage({
        variant: "error",
        text: `${config?.name}: ` + parseError(error),
      })
    })
  }, [mount, reload])

  const displayPluging = useMemo(
    () => activePlugin === config?.name,
    [activePlugin, config]
  )

  useEffect(() => {
    if (displayPluging) {
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
    <div data-app={config?.name} ref={holder} className="inline">
      {displayPluging && (
        <>
          <Messages />
          {displayReload && (
            <Stack
              alignment="center"
              distribution="center"
              direction="vertical"
              className="my-[10vh]"
            >
              <p className="text-xl">
                Uh-oh! Our plugin <b>{config?.name}</b> encountered a hiccup.{" "}
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

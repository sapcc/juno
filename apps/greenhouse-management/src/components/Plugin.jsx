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
  /* State isMounted is to ensure that plugin isMounted before unmounting.
   * Otherwise delays in mountApp can overtake the unmounting resulting in not unmounting the plugin.
   */
  const [isMounted, setMounted] = useState(false)

  const el = document.createElement("div")
  el.classList.add("inline")
  const app = useRef(el)

  // useMemo to not mount the app each time the component is reloaded losing the state
  // TODO: should we keep this apps also in memory??
  const mountApp = useMemo(() => {
    // lets wait until the assetsUrl exists to create the mount function with the currect assets url
    if (!assetsUrl) return
    return mount(app.current, config).catch((error) => {
      setDisplayReload(true)
      addMessage({
        variant: "error",
        text: `${config?.name}: ` + parseError(error),
      })
    })
  }, [mount, reload, assetsUrl])

  const displayPluging = useMemo(
    () => activePlugin === config?.name,
    [activePlugin, config]
  )

  useEffect(() => {
    // if assetsUrl still null when rendering for first time the component then mountApp also return null and we skip here
    if (!mountApp) return
    if (displayPluging) {
      mountApp.then((loaded) => {
        if (!loaded) return
        holder.current.appendChild(app.current)
        setMounted(true)
      })
    } else {
      // remove from holder
      if (holder.current.contains(app.current) && isMounted)
        holder.current.removeChild(app.current)
      setMounted(false)
    }
  }, [mountApp, displayPluging, isMounted])

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

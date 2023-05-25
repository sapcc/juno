import React, { useMemo, useRef, useEffect } from "react"
import { currentState } from "url-state-provider"
import useStore from "../store"
import useAppLoader from "../hooks/useAppLoader"
import { useActions, Messages } from "messages-provider"

const TestContent = () => {
  const { addMessage } = useActions()
  const { mount } = useAppLoader()
  const urlStateTestingKey = useStore((state) => state.urlStateTestingKey)
  const urlState = currentState(urlStateTestingKey)
  const holder = useRef()
  const app = useRef(document.createElement("div"))

  const config = useMemo(() => {
    return urlState?.o || {}
  }, [urlState])

  // create a promise to mount the app
  // this promise is resolved once
  const mountApp = useMemo(() => {
    if (!config) return
    return new Promise((resolve) => {
      console.log("Mounting with config:", config)
      const a = mount(app.current, config)
      if (!a) resolve(false)
      else
        a.then(() => {
          addMessage({
            variant: "warning",
            text: `This is a preview of ${config?.name}. Not for productive use!`,
          })
          return resolve(true)
        }).catch((e) => {
          addMessage({
            variant: "error",
            text: e.message,
          })
        })
    })
  }, [mount, config])

  useEffect(() => {
    mountApp.then((loaded) => {
      if (!loaded || !holder.current) return
      app.current.setAttribute("style", "display: inline;")
      holder.current.appendChild(app.current)
    })
  }, [])

  return (
    <>
      <Messages />
      <div data-app={config.name} ref={holder}></div>
    </>
  )
}

export default TestContent

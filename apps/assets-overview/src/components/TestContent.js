import React, { useMemo, useRef, useEffect } from "react"
import { currentState } from "url-state-provider"
import useStore from "../store"
import useAppLoader from "../hooks/useAppLoader"
import { useActions, Messages } from "messages-provider"

const TestContent = () => {
  const { addMessage } = useActions()
  const { mount } = useAppLoader()
  const urlStateKey = useStore((state) => state.urlStateKey)
  const urlState = currentState(`${urlStateKey}-testing`)
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

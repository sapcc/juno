import React, { useEffect, useState } from "react"
import { ShadowRoot } from "juno-ui-components"
// import { executeCode } from "../lib/executeCode"
// import test from "@swc/wasm-web/wasm-web_bg.wasm"
import initSwc, { transformSync } from "@swc/wasm-web"

const initialCodeString = `
import React from 'react'

export default function App() {
  return (
    <div>
      <h1>Hello Playground</h1>
    </div>
  )
}
`.trim()

const Preview = () => {
  const [code, setCode] = useState(initialCodeString)
  const [initialized, setInitialized] = useState(false)
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    const importAndRunSwcOnMount = async () => {
      await initSwc()
      setInitialized(true)
    }
    importAndRunSwcOnMount()
  }, [])

  // useEffect(() => {
  //   if (!code) return

  //   console.log("code:::::::::::::::::::::::::::::::::::::::::::::", code)

  //   executeCode(code, {
  //     react: React,
  //   }).then((Preview) => {
  //     setPreview(<Preview />)
  //   })
  // }, [code])

  return (
    <ShadowRoot>
      <h1>Hello</h1>
      {preview}
    </ShadowRoot>
  )
}

export default Preview

import React, { useEffect, useState } from "react"
import * as junoUIComponents from "juno-ui-components"
import { executeCode } from "../lib/executeCode"
import styles from "../styles.scss"

const initialCodeString = `
import { LoadingIndicator } from "juno-ui-components"

const App = () => {
  return (
    <LoadingIndicator />
  )
}

import React from 'react'
import styles from "styles.scss"
import { AppShell, AppShellProvider } from "juno-ui-components"

export default function StyledApp() {
  return (
    <AppShellProvider theme="theme-dark">
      <style>{styles.toString()}</style>
      <AppShell
        pageHeader="Converged Cloud | Playground"
        embedded={true}
      >
        <App />
      </AppShell>
    </AppShellProvider>
  )
}
`.trim()

const Preview = () => {
  const [code, setCode] = useState(null)
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    setCode(initialCodeString)
  }, [])

  useEffect(() => {
    if (!code) return
    executeCode(code, {
      react: React,
      "juno-ui-components": junoUIComponents,
      "styles.scss": styles,
    }).then((Preview) => {
      setPreview(<Preview />)
    })
  }, [code])

  return <>{preview}</>
}

export default Preview

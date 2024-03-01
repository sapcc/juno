import React, { useEffect, useState } from "react"
import * as junoUIComponents from "juno-ui-components"
import { executeCode, compilerLoader } from "../lib/executeCode"
import PreviewShell from "./PreviewShell"
import Error from "./Error"
import HintLoading from "./HintLoading"

const Preview = ({ code }) => {
  const [preview, setPreview] = useState(null)
  const [isCompilerLoading, setIsCompilerLoading] = useState(true)

  // display loading until the compiler is loaded
  useEffect(() => {
    compilerLoader().then(() => {
      setIsCompilerLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!code) return

    executeCode(code, {
      react: React,
      "juno-ui-components": junoUIComponents,
    })
      .then((Preview) => {
        setPreview(
          <PreviewShell>
            <junoUIComponents.Container>
              <Preview />
            </junoUIComponents.Container>
          </PreviewShell>
        )
      })
      .catch((err) => {
        setPreview(<Error error={err} />)
      })
  }, [code])

  return (
    <div className="w-1/2">
      {isCompilerLoading ? (
        <HintLoading text="Loading SWC Compiler" centered />
      ) : (
        preview
      )}
    </div>
  )
}

export default Preview

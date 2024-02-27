import React, { useEffect, useState } from "react"
import * as junoUIComponents from "juno-ui-components"
import { executeCode } from "../lib/executeCode"
import PreviewShell from "./PreviewShell"
import Error from "./Error"

const Preview = ({ code }) => {
  const [preview, setPreview] = useState(null)

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
        setPreview(
          <PreviewShell>
            <junoUIComponents.Container className="h-full">
              <Error error={err} />
            </junoUIComponents.Container>
          </PreviewShell>
        )
      })
  }, [code])

  return <div className="w-full">{preview}</div>
}

export default Preview

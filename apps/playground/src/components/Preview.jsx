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
        setPreview(<Error error={err} />)
      })
  }, [code])

  return <div className="w-1/2">{preview}</div>
}

export default Preview

import React, { useEffect, useState } from "react"
import * as junoUIComponents from "juno-ui-components"
import { executeCode } from "../lib/executeCode"
import PreviewShell from "./PreviewShell"

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
            <Preview />
          </PreviewShell>
        )
      })
      .catch((err) => {
        console.error(">>>>>>>>>>>>>>>>>>>.", err)
        setPreview(
          <PreviewShell>
            <div className="cutom-wrapperfor-textarea h-full">
              <junoUIComponents.Textarea
                readOnly
                invalid
                className="h-full"
                value={err}
              ></junoUIComponents.Textarea>
            </div>
          </PreviewShell>
        )
      })
  }, [code])

  return <>{preview}</>
}

export default Preview

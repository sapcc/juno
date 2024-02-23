import React, { useState } from "react"
import { Stack, Textarea } from "juno-ui-components"
import Preview from "./components/Preview"
import CodeEditor from "@uiw/react-textarea-code-editor"

const initialCodeString = `
import React from "react"
import { LoadingIndicator } from "juno-ui-components"

export default function App() {
  return (
    <LoadingIndicator />
  )
}
`.trim()

const AppContent = (props) => {
  const [code, setCode] = useState(initialCodeString)

  const onCodeChange = (evn) => {
    setCode(evn.target.value)
  }

  return (
    <Stack className="h-full">
      <CodeEditor
        value={code}
        language="jsx"
        placeholder="Please enter JSX code."
        onChange={onCodeChange}
        padding={15}
        style={{
          width: "100%",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
      />
      <div className="w-full">
        <Preview code={code} />
      </div>
    </Stack>
  )
}

export default AppContent

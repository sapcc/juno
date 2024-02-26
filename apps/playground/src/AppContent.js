import React, { useMemo, useState } from "react"
import { Stack, DataGridToolbar, ButtonRow, Button } from "juno-ui-components"
import Preview from "./components/Preview"
import CodeEditor from "@uiw/react-textarea-code-editor"
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary"
import Error from "./components/Error"

const initialEditorCodeString = `
import React from "react"
import { LoadingIndicator } from "juno-ui-components"

export default function App() {
  return (
    <LoadingIndicator />
  )
}
`.trim()

const fallbackRender = ({ error, resetErrorBoundary }) => {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return <Error error={error} />
}

const AppContent = (props) => {
  const [editorCode, setEditorCode] = useState(initialEditorCodeString)
  const [compiledCode, setCompiledCode] = useState(initialEditorCodeString)

  const onCodeChange = (evn) => {
    setEditorCode(evn.target.value)
  }

  const onCompileClick = () => {
    setCompiledCode(editorCode)
  }

  return (
    <Stack className="h-full">
      <div className="editor-wrapper w-full h-full">
        <DataGridToolbar>
          <ButtonRow>
            <Button
              icon="chevronRight"
              variant="primary"
              onClick={onCompileClick}
            />
          </ButtonRow>
        </DataGridToolbar>
        <CodeEditor
          value={editorCode}
          language="jsx"
          placeholder="Please enter JSX code."
          onChange={onCodeChange}
          padding={15}
          style={{
            width: "100%",
            height: "100%",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        />
      </div>

      <ErrorBoundary fallbackRender={fallbackRender} resetKeys={[compiledCode]}>
        <Preview code={compiledCode} />
      </ErrorBoundary>
    </Stack>
  )
}

export default AppContent

import React, { useState } from "react"
import { Stack, Button, Container } from "juno-ui-components"
import {
  useTheme,
  useReadOnly,
  useInitialEditorCode,
} from "./components/StoreProvider"
import Preview from "./components/Preview"
import CodeEditor from "@uiw/react-textarea-code-editor"
import { ErrorBoundary } from "react-error-boundary"
import Error from "./components/Error"

const editorStyles = {
  width: "100%",
  height: "100%",
  fontFamily:
    "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
}

const fallbackRender = ({ error, resetErrorBoundary }) => {
  return <Error error={error} />
}

const AppContent = (props) => {
  const theme = useTheme()
  const readOnly = useReadOnly()
  const initialEditorCodeString = useInitialEditorCode()
  const [editorCode, setEditorCode] = useState(initialEditorCodeString)
  const [compiledCode, setCompiledCode] = useState(initialEditorCodeString)

  const onCodeChange = (evn) => {
    setEditorCode(evn.target.value)
  }

  const onCompileClick = () => {
    setCompiledCode(editorCode)
  }

  return (
    <Container py className="h-full">
      <Stack className="h-full">
        <Stack direction="vertical" className="w-full">
          <Stack
            direction="horizontal"
            alignment="center"
            className="p-2 bg-theme-background-lvl-1"
          >
            <span className="w-full font-bold">Juno Playground</span>
            {!readOnly && (
              <Button
                icon="chevronRight"
                variant="primary"
                onClick={onCompileClick}
              />
            )}
          </Stack>
          <CodeEditor
            value={editorCode}
            language="jsx"
            placeholder="Please enter JSX code."
            onChange={onCodeChange}
            padding={15}
            readOnly={readOnly}
            style={
              theme === "theme-dark"
                ? editorStyles
                : { ...editorStyles, backgroundColor: "#f5f5f5" }
            }
          />
        </Stack>
        <div className="separator border-r border-theme-background-lvl-4 mx-4" />
        <ErrorBoundary
          fallbackRender={fallbackRender}
          resetKeys={[compiledCode]}
        >
          <Preview code={compiledCode} />
        </ErrorBoundary>
      </Stack>
    </Container>
  )
}

export default AppContent

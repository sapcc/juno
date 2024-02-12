import React, { useState } from "react"
import { Stack, Textarea } from "juno-ui-components"
import Preview from "./components/Preview"

const initialCodeString = `
import { LoadingIndicator } from "juno-ui-components"

const App = () => {
  return (
    <LoadingIndicator />
  )
}
`.trim()

// This is your starting point of tour application
// see several examples in the exampleApp
const AppContent = (props) => {
  const [code, setCode] = useState(initialCodeString)

  return (
    <Stack className="h-full">
      <Textarea
        className="h-full"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={20}
        cols={80}
      />
      <Preview />
    </Stack>
  )
}

export default AppContent

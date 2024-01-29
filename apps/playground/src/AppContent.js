import React, { useState } from "react"
import { Stack, Textarea } from "juno-ui-components"
import Preview from "./components/Preview"

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

import React from "react"

import { exampleFetch as fetchStuff } from "./actions"

import { Message, PageHeader, Stack, Spinner } from "juno-ui-components"
import { currentState, push } from "url-state-provider"
/* Replace this with your app's name */
const URL_STATE_KEY = "template"


const App = (props) => {
  const [processing, setProcessing] = React.useState(false)
  const [items, setItems] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [statusCode, setStatusCode] = React.useState(null)
  const { embedded } = props

  
  const apiCallExample = React.useCallback((term, options) => {
    if (!term) return

    // update URL state
    push(URL_STATE_KEY, { p: term })

    // set/reset status before searching
    setError(null)
    setStatusCode(200)
    setProcessing(true)

    // main fetch method (usually a list call)
    fetchStuff(term, options)
      .then((response) => {
        // get status code from response
        setStatusCode(response.status)
        // read input stream from response and return body as an object
        return response.json()
      })
      .then((data) => {
        console.log("DATA ITEMS", data)
        setItems(data)
      })
      .catch((error) => {
        setItems([]) // if error: set items to empty, otherwise the previous result would stay in state
        setStatusCode(error.statusCode)
        let message = error.message || error
        try {
          message = JSON.parse(message)
          message = message.error || message
        } catch (e) {}
        if (message === "not found") setError("Couldn't find anything")
        else setError(message)
      })
      .finally(() => {
        setProcessing(false)
      })
  }, [])

  // read current url state and call main fetch method if state is presented
  React.useEffect(() => {
    const urlState = currentState(URL_STATE_KEY)
    if (urlState && urlState.p) {
      apiCallExample(urlState.p)
    }
  }, [apiCallExample])

  return (
    <>
      {!embedded && <PageHeader heading="App Template" />}
      <div className="container mx-auto mt-12">
        <Message>Welcome to the example app</Message>
        {processing && (
          <Spinner variant="primary" />
        )}
        {error && (
          <Message variant="danger">
            {error}
            {statusCode === 404 && (
              <>
                Custom error message for status code 404
              </>
            )}
          </Message>
        )}
      </div>
    </>
  )
}

export default App

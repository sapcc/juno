// import React from "react"
// import useOidcAuth from "../../../libs/oauth/src/useOidcAuth"

// export default () => {
//   const oidcData = useOidcAuth({
//     issuerURL: "https://ajfc1jphz.accounts.ondemand.com",
//     clientID: "1cf034b8-f3d5-4fd3-8008-fba557641968",
//   })
//   return <span>Hello {oidcData && oidcData.first_name}</span>
// }

import React from "react"

import { exampleFetch as fetchStuff } from "./actions"

import {
  AppBody,
  AppIntro,
  Button,
  ContentArea,
  ContentAreaHeading,
  ContentAreaToolbar,
  ContentAreaWrapper,
  ContentContainer,
  MainContainer,
  Message,
  PageFooter,
  PageHeader,
  Spinner,
} from "juno-ui-components"
import { currentState, push } from "url-state-provider"
import ContentAreaHeadingStories from "../../../libs/juno-ui-components/src/components/ContentAreaHeading/ContentAreaHeading.stories"
import useOidcAuth from "../../../libs/oauth/src/useOidcAuth"
/* Replace this with your app's name */
const URL_STATE_KEY = "template"

const App = (props) => {
  const [processing, setProcessing] = React.useState(false)
  const [items, setItems] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [statusCode, setStatusCode] = React.useState(null)
  const { embedded } = props
  const { auth, login, logout, isProcessing } = useOidcAuth({
    issuerURL: "https://ajfc1jphz.accounts.ondemand.com",
    clientID: "1cf034b8-f3d5-4fd3-8008-fba557641968",
    initialLogin: true,
  })

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
    <AppBody>
      <PageHeader heading="Converged Cloud | App Template" />

      {/* Wrap everything except page header and footer in a main container */}
      <MainContainer>
        {/* Exchange image with app specific image (save in src/img/). If you don't have a background graphic for your app just remove the whole className prop */}
        <ContentContainer className="bg-[url('img/app_bg.svg')]">
          {/* App intro text */}
          <AppIntro>oAuth Test App</AppIntro>

          <ContentAreaHeading heading="" />

          {/* This wrapper goes around the content area and content area toolbar */}
          <ContentAreaWrapper>
            {/* Content Area. This is the place to add the app's main content */}

            <ContentArea className="mt-0">
              {/* Messages always at the top of the content area */}

              {error && (
                <Message variant="danger">
                  {error}
                  {statusCode === 404 && (
                    <>Custom error message for status code 404</>
                  )}
                </Message>
              )}
              {/* Loading indicator for page content */}
              {processing && <Spinner variant="primary" />}
              {/*
               *
               *
               * CONTENT GOES HERE
               *
               *
               *
               * */}
              <div>
                {auth ? (
                  <div>
                    <h1>Hi {auth.full_name}</h1>
                    <Button onClick={logout}>Logout</Button>
                  </div>
                ) : isProcessing ? (
                  <span>Sign in...</span>
                ) : (
                  <Button onClick={login}>Login</Button>
                )}
              </div>
            </ContentArea>
          </ContentAreaWrapper>
        </ContentContainer>
      </MainContainer>

      <PageFooter />
    </AppBody>
  )
}

export default App

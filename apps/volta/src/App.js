import React from "react"
import { exampleFetch } from "./actions"
import {
  AppBody,
  AppIntro,
  Button,
  ContentArea,
  ContentAreaToolbar,
  ContentContainer,
  MainContainer,
  Message,
  PageFooter,
  PageHeader,
  Spinner,
} from "juno-ui-components"
import { currentState, push } from "url-state-provider"
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query"
import Certificates from "./components/Certificates"

/* Replace this with your app's name */
const URL_STATE_KEY = "volta"

const App = (props) => {
  const [processing, setProcessing] = React.useState(false)
  const [items, setItems] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [statusCode, setStatusCode] = React.useState(null)
  const { embedded } = props

  // Create a client
  const queryClient = new QueryClient()

  // const apiCallExample = React.useCallback((term, options) => {
  //   if (!term) return

  //   // update URL state
  //   push(URL_STATE_KEY, { p: term })

  //   // set/reset status before searching
  //   setError(null)
  //   setStatusCode(200)
  //   setProcessing(true)

  //   // main fetch method (usually a list call)
  //   exampleFetch(term, options)
  //     .then((response) => {
  //       // get status code from response
  //       setStatusCode(response.status)
  //       // read input stream from response and return body as an object
  //       return response.json()
  //     })
  //     .then((data) => {
  //       console.log("DATA ITEMS", data)
  //       setItems(data)
  //     })
  //     .catch((error) => {
  //       setItems([]) // if error: set items to empty, otherwise the previous result would stay in state
  //       setStatusCode(error.statusCode)
  //       let message = error.message || error
  //       try {
  //         message = JSON.parse(message)
  //         message = message.error || message
  //       } catch (e) {}
  //       if (message === "not found") setError("Couldn't find anything")
  //       else setError(message)
  //     })
  //     .finally(() => {
  //       setProcessing(false)
  //     })
  // }, [])

  // read current url state and call main fetch method if state is presented
  // React.useEffect(() => {
  //   const urlState = currentState(URL_STATE_KEY)
  //   if (urlState && urlState.p) {
  //     apiCallExample(urlState.p)
  //   }
  // }, [apiCallExample])

  return (
    <QueryClientProvider client={queryClient}>
      <AppBody>
        <PageHeader heading="Converged Cloud | Volta" />

        {/* Wrap everything except page header and footer in a main container */}
        <MainContainer>
          {/* Exchange image with app specific image (save in src/img/). If you don't have a background graphic for your app just remove the whole className prop */}
          <ContentContainer className="bg-[url('img/app_bg.svg')]">
            {/* App intro text */}
            <AppIntro>
              Intro text here. Explain what this app is in a short lead text.
              Lorem ipsum dolor sit amet. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est. Lorem ipsum dolor sit amet.
            </AppIntro>

            {/* Content Area. This is the place to add the app's main content */}
            <ContentArea heading="SSO Certificates">
              {/* Add a toolbar if you have action buttons or search/filter functionality that affects the whole page */}
              <ContentAreaToolbar>
                <Button>Action</Button>
              </ContentAreaToolbar>

              {/* Messages always at the top of the content area */}
              <div className="juno-message-container mb-8">
                <Message>Welcome to the example app</Message>
                {processing && <Spinner variant="primary" />}
                {error && (
                  <Message variant="danger">
                    {error}
                    {statusCode === 404 && (
                      <>Custom error message for status code 404</>
                    )}
                  </Message>
                )}
              </div>

              {/* CONTENT GOES HERE */}
              <Certificates />
            </ContentArea>
          </ContentContainer>
        </MainContainer>

        <PageFooter />
      </AppBody>
    </QueryClientProvider>
  )
}

export default App

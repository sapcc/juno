import React from "react"
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
import ContentAreaHeadingStories from "../../../libs/juno-ui-components/src/components/ContentAreaHeading/ContentAreaHeading.stories"

import { useOidcAuth } from "oauth"
import { currentState, push } from "url-state-provider"
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query"
import Certificates from "./components/Certificates"
import NewCertificate from "./components/NewCertificate"
import Messages from "./components/Messages"

const preClasses = `
whitespace-pre-wrap
bg-theme-background-lvl-3
p-4
`
const codeClasses = `
w-full 
break-all
`

/* Replace this with your app's name */
const URL_STATE_KEY = "volta"

const App = (props) => {
  const [processing, setProcessing] = React.useState(false)
  const [items, setItems] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [statusCode, setStatusCode] = React.useState(null)
  const { embedded } = props

  const { auth, login, logout } = useOidcAuth({
    issuerURL: "https://accounts400.sap.com/", //"https://ajfc1jphz.accounts.ondemand.com",
    clientID: "b3b4e19c-815f-48cb-a9af-d7838a0d8616", //"6f9796ad-2fc1-4553-ab77-f1b91034d4d2",
  })

  const expiresAtString = React.useMemo(() => {
    if (!auth) return ""
    const date = new Date(auth.expiresAt)
    return date.toLocaleString()
  }, [auth])

  console.log("auth obj: ", auth)

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
              Volta UI manages your SSO certificates stored in a Vault instance.
            </AppIntro>

            <ContentAreaHeading heading="SSO Certificates" />
            <ContentAreaWrapper>
              <ContentAreaToolbar>
                <Button icon="addCircle">Add SSO Cert</Button>
              </ContentAreaToolbar>

              <ContentArea className="mt-0">
                <Messages />
                {error && (
                  <Message variant="danger">
                    {error}
                    {statusCode === 404 && (
                      <>Custom error message for status code 404</>
                    )}
                  </Message>
                )}
                {processing && <Spinner variant="primary" />}

                <div>
                  {auth ? (
                    <>
                      <h1>Hi {auth.first_name}</h1>
                      <p>{auth.full_name}</p>
                      <p>{expiresAtString}</p>
                      <pre className={`volta-codeblock ${preClasses}`}>
                        <code className={codeClasses}>{auth.id_token}</code>
                      </pre>
                      <button
                        onClick={() => {
                          logout({ resetOIDCSession: true })
                        }}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <button onClick={login}>Login</button>
                  )}
                </div>

                <NewCertificate show={true} />
                <Certificates />
              </ContentArea>
            </ContentAreaWrapper>
          </ContentContainer>
        </MainContainer>

        <PageFooter />
      </AppBody>
    </QueryClientProvider>
  )
}

export default App

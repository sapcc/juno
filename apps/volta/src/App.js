import React, { useEffect } from "react"
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
import { StateProvider, useDispatch } from "./components/StateProvider"
import reducers from "./reducers"

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
  const { embedded } = props
  const dispatch = useDispatch()

  const { auth, logout } = useOidcAuth({
    issuerURL: props.issuerURL,
    clientID: props.clientID,
    initialLogin: true,
  })

  useEffect(() => {
    if (!auth) return ""
    console.log("auth changed: ", auth)
    dispatch({ type: "SET_AUTH", auth })
  }, [auth])

  const expiresAtString = React.useMemo(() => {
    if (!auth) return ""
    const date = new Date(auth.expiresAt)
    return date.toLocaleString()
  }, [auth])

  console.log("auth obj: ", auth)

  // Create a client
  const queryClient = new QueryClient()

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

                {processing && <Spinner variant="primary" />}

                <div>
                  {auth && (
                    <>
                      <h1>Hi {auth.first_name}</h1>
                      <p>{auth.full_name}</p>
                      <p>{expiresAtString}</p>
                      <pre className={`volta-codeblock ${preClasses}`}>
                        <code className={codeClasses}>{auth.id_token}</code>
                      </pre>
                      <button
                        onClick={() => {
                          logout({ resetOIDCSession: false })
                        }}
                      >
                        Logout
                      </button>
                    </>
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

export default (props) => (
  <StateProvider reducers={reducers}>
    <App {...props} />
  </StateProvider>
)

import React from "react"

import useStore from "./store"
import { QueryClient, QueryClientProvider } from "react-query"
import ShellLayout from "./components/layout/ShellLayout"
import styles from "./styles.scss"
import StyleProvider, { Button, Spinner } from "juno-ui-components"
import useCommunication from "./useCommunication"
import useAppLoader from "./useAppLoader"

/* IMPORTANT: Replace this with your app's name */
const URL_STATE_KEY = "greenhouse"
/* --------------------------- */

const App = (props) => {
  const setEndpoint = useStore((state) => state.setEndpoint)
  const setUrlStateKey = useStore((state) => state.setUrlStateKey)
  const { embedded } = props
  // Create query client which it can be used from overall in the app
  const queryClient = new QueryClient()
  const appContentRef = React.createRef()

  const { authData, login, logout } = useCommunication()
  const { mount } = useAppLoader()

  React.useEffect(() => {
    if (!mount || !appContentRef.current) return

    const authContainer = document.createElement("div")
    const exampleappContainer = document.createElement("div")
    const dashboardContainer = document.createElement("div")

    appContentRef.current.append(authContainer)
    appContentRef.current.append(exampleappContainer)
    appContentRef.current.append(dashboardContainer)

    mount(authContainer, {
      name: "auth",
      version: "latest",
      props: {
        issuerurl: props.issuerurl,
        clientid: props.clientid,
        initialLogin: true,
      },
    })
    // mount(exampleappContainer, {
    //   name: "exampleapp",
    //   version: "latest",
    //   props: {
    //     embedded: "true",
    //   },
    // })
    mount(dashboardContainer, {
      name: "assets-overview",
      version: "latest",
      props: {
        embedded: "true",
        manifestUrl: "https://elektra.ap.ws2.eu-nl-1.cloud.sap/manifest.json",
      },
    })
  }, [mount])

  // on app initial load save Endpoint and URL_STATE_KEY so it can be
  // used from overall in the application
  React.useEffect(() => {
    // set to empty string to fetch local test data in dev mode
    setEndpoint(props.endpoint || props.currentHost || "")
    setUrlStateKey(URL_STATE_KEY)
  }, [])

  console.log(authData)

  return (
    <QueryClientProvider client={queryClient}>
      <ShellLayout>
        <div ref={appContentRef}></div>

        {authData?.isProcessing ? (
          <Spinner />
        ) : (
          <div>
            {authData?.auth ? (
              <>
                <div>{JSON.stringify(authData.auth, null, 2)}</div>
                <Button onClick={logout}>logout</Button>
              </>
            ) : (
              <Button onClick={login}>Login</Button>
            )}
          </div>
        )}
      </ShellLayout>

      {/* <AppShell
        pageHeader="Converged Cloud | App Template"
        contentHeading="App template page title"
        embedded={embedded === "true"}
      >
        <AppContent props={props} />
      </AppShell> */}
    </QueryClientProvider>
  )
}

const StyledApp = (props) => {
  return (
    <StyleProvider
      stylesWrapper="shadowRoot"
      theme={`${props.theme ? props.theme : "theme-dark"}`}
    >
      {/* load styles inside the shadow dom */}
      <style>{styles.toString()}</style>
      <App {...props} />
    </StyleProvider>
  )
}

export default StyledApp

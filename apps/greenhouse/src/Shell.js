import React, { useEffect } from "react"

import useStore from "./hooks/useStore"
import { QueryClient, QueryClientProvider } from "react-query"
import ShellLayout from "./components/layout/ShellLayout"
import Auth from "./components/Auth"
import App from "./components/App"
import styles from "./styles.scss"
import StyleProvider from "juno-ui-components"
import useCommunication from "./hooks/useCommunication"
import { registerConsumer, currentState } from "url-state-provider"
import useApiClient from "./hooks/useApiClient"

/* IMPORTANT: Replace this with your app's name */
const URL_STATE_KEY = "greenhouse"
/* --------------------------- */

const appsConfig = {
  supernova: {
    name: "supernova",
    version: "latest",
    navigable: true,
    props: {
      endpoint:
        "https://alertmanager-internal.scaleout.eu-nl-1.cloud.sap/api/v2",
    },
  },

  heureka: {
    name: "heureka",
    version: "latest",
    navigable: true,
    props: {
      endpoint: "https://heureka-staging.scaleout.ap-jp-2.cloud.sap/api/v1",
    },
  },

  doop: {
    name: "doop",
    version: "latest",
    navigable: true,
    props: {
      endpoint: "https://heureka-staging.scaleout.ap-jp-2.cloud.sap/api/v1",
    },
  },
}

document.head.appendChild(document.createElement("script")).text =
  "(" +
  function () {
    // injected DOM script is not a content script anymore,
    // it can modify objects and functions of the page
    var _pushState = history.pushState
    var _replaceState = history.replaceState
    history.pushState = function (state, title, url) {
      _pushState.call(this, state, title, url)
      window.dispatchEvent(new CustomEvent("popstate", { state }))
    }
    history.replaceState = function (state, title, url) {
      _replaceState.call(this, state, title, url)
      window.dispatchEvent(new CustomEvent("popstate", { state }))
    }
    // repeat the above for replaceState too
  } +
  ")(); document.currentScript.remove();" // remove the DOM script element

const Shell = (props = {}) => {
  const setEndpoint = useStore((state) => state.setEndpoint)
  const setUrlStateKey = useStore((state) => state.setUrlStateKey)
  const setAppsConfig = useStore((state) => state.apps.setConfig)
  const setActive = useStore((state) => state.apps.setActive)
  const setAssetsHost = useStore((state) => state.setAssetsHost)
  const activeApps = useStore((state) => state.apps.active)
  const loggedIn = useStore((state) => state.auth.loggedIn)
  const authData = useStore((state) => state.auth.data)

  // Create query client which it can be used from overall in the app
  const queryClient = new QueryClient()

  // Initialiazing events watching
  useCommunication()

  // APP INIT
  // on app initial load save Endpoint and URL_STATE_KEY and oder props so it can be
  // used from overall in the application
  useEffect(() => {
    if (!setEndpoint || !setUrlStateKey || !setAppsConfig || !setAssetsHost)
      return
    // set to empty string to fetch local test data in dev mode
    setEndpoint(props.endpoint || props.currentHost || "")
    setUrlStateKey(URL_STATE_KEY)
    setAppsConfig({
      ...appsConfig,
      auth: {
        name: "auth",
        version: "latest",
        navigable: false,
        props: {
          issuerurl: props.issuerurl,
          clientid: props.clientid,
          initialLogin: true,
        },
      },
    })
    setAssetsHost(props.currentHost)
  }, [setEndpoint, setUrlStateKey, setAppsConfig, setAssetsHost])

  // ON_LOGIN
  React.useEffect(() => {
    if (!loggedIn) return
    // set the api client
    console.log("AUTH_DATA: ", authData)
    if (authData?.JWT && props.endpoint)
      useApiClient(props.endpoint, authData?.JWT)

    // Set active app from URL state
    // if no active set take the first
    const greenhouseUrlState = registerConsumer(URL_STATE_KEY)
    let active = greenhouseUrlState.currentState()?.a
    if (active) setActive(active.split(","))
    else setActive([Object.keys(appsConfig)?.[0]])
    // TODO: check if the active app exists in the manifest
  }, [loggedIn])

  // sync URL state
  React.useEffect(() => {
    if (!loggedIn) return
    const greenhouseUrlState = registerConsumer(URL_STATE_KEY)
    greenhouseUrlState.push({ a: activeApps.join(",") })
  }, [loggedIn, activeApps])

  return (
    <Auth>
      <QueryClientProvider client={queryClient}>
        <ShellLayout>
          {Object.keys(appsConfig).map((appName, i) => (
            <App
              name={appName}
              key={i}
              active={activeApps.indexOf(appName) >= 0}
            />
          ))}
        </ShellLayout>
      </QueryClientProvider>
    </Auth>
  )
}

const StyledShell = (props) => {
  return (
    <StyleProvider
      stylesWrapper="shadowRoot"
      theme={`${props.theme ? props.theme : "theme-dark"}`}
    >
      {/* load styles inside the shadow dom */}
      <style>{styles.toString()}</style>
      <Shell {...props} />
    </StyleProvider>
  )
}

export default StyledShell

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

/* IMPORTANT: Replace this with your app's name */
const URL_STATE_KEY = "greenhouse"
/* --------------------------- */

const appsConfig = {
  heureka: {
    name: "heureka",
    version: "latest",
    navigable: true,
    props: {
      endpoint: "https://heureka-staging.scaleout.ap-jp-2.cloud.sap/api/v1",
    },
  },

  supernova: {
    name: "supernova",
    version: "latest",
    navigable: true,
    props: {
      endpoint:
        "https://alertmanager-internal.scaleout.eu-nl-1.cloud.sap/api/v2",
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

  // Create query client which it can be used from overall in the app
  const queryClient = new QueryClient()

  useCommunication()

  // INIT
  // on app initial load save Endpoint and URL_STATE_KEY so it can be
  // used from overall in the application
  useEffect(() => {
    if (
      !setAppsConfig ||
      !setUrlStateKey ||
      !setAppsConfig ||
      !setActive ||
      !setAssetsHost
    )
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

    // setActive(["heureka"])

    setAssetsHost(props.currentHost)
  }, [setEndpoint, setUrlStateKey, setAppsConfig, setActive, setAssetsHost])

  const loaded = React.useMemo(
    () => loggedIn && window.location.href.indexOf("__s") >= 0,
    [loggedIn, window.location.href]
  )

  React.useEffect(() => {
    if (!loggedIn) return
    const greenhouseUrlState = registerConsumer(URL_STATE_KEY)
    console.log(
      "========================URL STATE",
      greenhouseUrlState.currentState(),
      window.location.href
    )
    const active = greenhouseUrlState.currentState()?.a
    if (active) setActive(active.split(","))
  }, [loggedIn])

  React.useEffect(() => {
    if (!loggedIn) return
    const greenhouseUrlState = registerConsumer(URL_STATE_KEY)
    greenhouseUrlState.push({ a: activeApps.join(",") })
  }, [loggedIn, activeApps])

  return (
    <QueryClientProvider client={queryClient}>
      <ShellLayout>
        <Auth>
          {Object.keys(appsConfig).map((appName, i) => (
            <App
              name={appName}
              key={i}
              active={activeApps.indexOf(appName) >= 0}
            />
          ))}
          {/* {activeApps.map((appName, i) => (
            <App name={appName} key={i} />
          ))} */}
        </Auth>
      </ShellLayout>
    </QueryClientProvider>
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

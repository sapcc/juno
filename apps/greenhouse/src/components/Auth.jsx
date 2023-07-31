import React, { useEffect } from "react"
import { Button, LoadingIndicator, Spinner, Stack } from "juno-ui-components"
import {
  useAuthAppLoaded,
  useAuthLoggedIn,
  useAuthIsProcessing,
  useAuthData,
  useAuthError,
  useAuthActions,
  useGlobalsActions,
} from "../hooks/useStore"
import useAppLoader from "../hooks/useAppLoader"
import { Transition } from "@tailwindui/react"

const currentUrl = new URL(window.location.href)
let match = currentUrl.host.match(/^(.+)\.dashboard\..+/)
let orgName = match ? match[1] : currentUrl.searchParams.get("org")

/**
 * Auth Component:
 *
 * This component is responsible for managing user authentication and loading the authentication app dynamically.
 * It receives the following props:
 * - clientId: The client ID for authentication.
 * - issuerUrl: The URL of the authentication issuer.
 * - mock: A flag indicating whether to use mock authentication.
 * - children: The content to be displayed when the user is logged in.
 *
 * The component uses custom hooks to handle authentication states and data. It dynamically loads the authentication
 * app via the use of the useAppLoader hook. When mounted, the component connects to the authentication events,
 * allowing seamless authentication experiences.
 *
 * The Auth component renders three main sections:
 * 1. A div element with a data-app attribute set to "greenhouse-auth" and a ref for loading the authentication app.
 * 2. A Transition component that displays the children (content) when the user is logged in, applying a smooth fade-in
 *    and fade-out transition effect.
 * 3. If the user is not logged in, a stack containing loading indicators, messages, and a "Sign in" button is rendered.
 *    The component handles various loading states, shows a long loading indicator after 5 seconds, and displays specific
 *    messages based on the authentication status.
 *
 * Note: The component reads organization information from the token and adjusts the URL accordingly after the user is logged in.
 */
const Auth = ({
  clientId,
  issuerUrl,
  mock,
  children,
  demoOrg,
  demoUserToken,
}) => {
  const authData = useAuthData()
  const authAppLoaded = useAuthAppLoaded()
  const authLoggedIn = useAuthLoggedIn()
  const authIsProcessing = useAuthIsProcessing()
  const authError = useAuthError()
  const { login } = useAuthActions()

  const ref = React.createRef()
  const { mount } = useAppLoader()
  const [loading, setLoading] = React.useState(!authAppLoaded)
  const [longLoading, setLongLoading] = React.useState(false)

  const { setDemoMode } = useGlobalsActions()

  // in this useEffect we load the auth app via import (see mount)
  // It should happen just once!
  // The connection to the auth events happens in the useCommunication hook!
  useEffect(() => {
    if (!mount || !clientId || !issuerUrl) return

    // if current orgName is the demo org, we mock the auth app
    if (demoOrg === orgName) {
      // we mock the auth app with default groups
      mock = JSON.stringify({
        groups: ["organization:demo", "team:containers", "role:ccloud:admin"],
      })
      // set demo mode
      setDemoMode(true)
      // see in useCommunication hook, there we redefine  the authData.JWT wit demoUserToken if demo mode is set
    }

    mount(ref.current, {
      id: "auth",
      name: "auth",
      version: "latest",
      props: {
        issuerUrl: issuerUrl,
        clientId: clientId,
        mock: mock,
        debug: true,
        initialLogin: true,
        requestParams: JSON.stringify({
          connector_id: !orgName ? undefined : orgName,
        }),
      },
    })
  }, [mount, clientId, issuerUrl, setDemoMode])

  // read org name from token and adjust url to contain the org name
  useEffect(() => {
    if (!authLoggedIn) return

    if (!orgName) {
      const orgString = authData?.raw?.groups?.find(
        (g) => g.indexOf("organization:") === 0
      )

      if (orgString) {
        const name = orgString.split(":")[1]
        let url = new URL(window.location.href)
        url.searchParams.set("org", name)
        window.history.replaceState(null, null, url.href)
      }
    }
  }, [authLoggedIn, authData])

  // timeout for waiting for auth
  useEffect(() => {
    setLoading(!authAppLoaded)
    if (authAppLoaded) return
    // set timeout for waiting for auth app
    let loadingTimer
    if (!authAppLoaded) {
      loadingTimer = setTimeout(() => {
        if (!authAppLoaded) setLoading(false)
      }, 30000) // 30 seconds
    }

    return () => loadingTimer && clearTimeout(loadingTimer)
  }, [authAppLoaded, setLoading])

  // set long loading
  useEffect(() => {
    let longLoadingTimer = setTimeout(() => setLongLoading(true), 5000) // long loading if longer than 5 seconds
    return () => longLoadingTimer && clearTimeout(longLoadingTimer)
  }, [])

  return (
    <>
      <div data-app="greenhouse-auth" ref={ref} />

      <Transition
        show={authLoggedIn}
        enter="transition-opacity duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-0"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {children}
      </Transition>

      {!authLoggedIn && (
        <Stack
          alignment="center"
          distribution="center"
          direction="vertical"
          className="h-screen"
        >
          {loading || authIsProcessing ? (
            <>
              {longLoading ? (
                <LoadingIndicator className="jn-text-theme-info" />
              ) : (
                <Spinner
                  className="mx-6 mb-3"
                  variant="primary"
                  size="1.5rem"
                />
              )}
              {loading ? "Loading..." : "Signing on..."}
            </>
          ) : (
            <>
              {authAppLoaded ? (
                <>
                  <span>
                    {authError
                      ? JSON.stringify(authError)
                      : "Please sign in before you can use Greenhouse."}
                  </span>
                  <Button variant="primary" onClick={login} className="mt-3">
                    Sign in
                  </Button>
                </>
              ) : (
                "Looks like the auth app is missing!"
              )}
            </>
          )}
        </Stack>
      )}
    </>
  )
}

export default Auth

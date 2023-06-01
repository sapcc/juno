import React, { useEffect } from "react"
import { Button, LoadingIndicator, Spinner, Stack } from "juno-ui-components"
import {
  useAuthAppLoaded,
  useAuthLoggedIn,
  useAuthIsProcessing,
  useAuthData,
  useAuthError,
} from "../hooks/useStore"
import useAppLoader from "../hooks/useAppLoader"
import { Transition } from "@tailwindui/react"

const orgName = new URL(window.location.href).searchParams.get("org")

const Auth = ({ clientId, issuerUrl, mock, children }) => {
  const authData = useAuthData()
  const authAppLoaded = useAuthAppLoaded()
  const authLoggedIn = useAuthLoggedIn()
  const authIsProcessing = useAuthIsProcessing()
  const authError = useAuthError()

  const ref = React.createRef()
  const { mount } = useAppLoader()
  const [loading, setLoading] = React.useState(!authAppLoaded)
  const [longLoading, setLongLoading] = React.useState(false)

  // in this useEffect we load the auth app via import (see mount)
  // It should happen just once!
  // The connection to the auth events happens in the useCommunication hook!
  useEffect(() => {
    if (!mount || !clientId || !issuerUrl) return

    mount(ref.current, {
      name: "auth",
      version: "latest",
      props: {
        issuerUrl: issuerUrl,
        clientId: clientId,
        mock: mock,
        initialLogin: true,
        requestParams: JSON.stringify({
          connector_id: !orgName ? undefined : orgName,
        }),
      },
    })
  }, [mount, clientId, issuerUrl])

  // read org name from token and adjust url to contain the org name
  useEffect(() => {
    if (!authLoggedIn) return

    const orgString = authData?.raw?.groups?.find(
      (g) => g.indexOf("organization:") === 0
    )
    if (orgString) {
      const name = orgString.split(":")[1]
      const url = new URL(window.location.href)
      url.searchParams.set("org", name)
      window.history.replaceState(null, null, url.href)
    }
  }, [authLoggedIn, authData])

  // timeout for waiting for auth
  useEffect(() => {
    if (authAppLoaded) return
    // set timeout for waiting for auth app
    let loadingTimer
    if (!authAppLoaded) {
      loadingTimer = setTimeout(() => {
        if (!authAppLoaded) setLoading(false)
      }, 30000) // 30 seconds
    }

    return () => loadingTimer && clearTimeout(loadingTimer)
  }, [authAppLoaded])

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
        leave="transition-opacity duration-100"
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
                      : "Authentication required"}
                  </span>
                  <Button onClick={() => auth?.login()} className="mt-3">
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

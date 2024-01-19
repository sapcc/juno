import React, { useEffect, useState, createRef } from "react"
import { Button, LoadingIndicator, Spinner, Stack } from "juno-ui-components"
import { useAuthAppLoaded, useIsLoggedIn } from "./StoreProvider"
import { Transition } from "@tailwindui/react"

import { useActions as messageActions } from "messages-provider"

const Auth = ({ children }) => {
  const authAppLoaded = useAuthAppLoaded()
  const authLoggedIn = useIsLoggedIn()

  const [loading, setLoading] = useState(!authAppLoaded)
  const [longLoading, setLongLoading] = useState(false)

  const { addMessage } = messageActions()

  addMessage({
    variant: "error",
    text: "hilfe hilfe hilfe",
  })

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
      <Transition
        show={!!authLoggedIn}
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
          {longLoading ? (
            <LoadingIndicator className="jn-text-theme-info" />
          ) : (
            <Spinner className="mx-6 mb-3" variant="primary" size="1.5rem" />
          )}
          {loading ? "Loading..." : "Signing on..."}
        </Stack>
      )}
    </>
  )
}

export default Auth

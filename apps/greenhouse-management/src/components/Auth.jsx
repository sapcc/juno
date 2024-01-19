import React, { useEffect, useState } from "react"
import { Spinner, Stack } from "juno-ui-components"
import { useAuthAppLoaded, useIsLoggedIn } from "./StoreProvider"
import { Transition } from "@tailwindui/react"

const Auth = ({ children }) => {
  const authAppLoaded = useAuthAppLoaded()
  const authLoggedIn = useIsLoggedIn()

  const [loading, setLoading] = useState(!authAppLoaded)

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
          <Spinner className="mx-6 mb-3" variant="primary" size="1.5rem" />

          {loading ? "Loading..." : "Signing on..."}
        </Stack>
      )}
    </>
  )
}

export default Auth

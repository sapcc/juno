import React from "react"
import { Spinner, Stack } from "juno-ui-components"
import { useIsLoggedIn } from "./StoreProvider"
import { Transition } from "@tailwindui/react"

// Adds a loading screen while during auth
// Shows children when auth is complete

const Auth = ({ children }) => {
  const authLoggedIn = useIsLoggedIn()

  return (
    <>
      {!!authLoggedIn && children}
      {!authLoggedIn && (
        <Stack
          alignment="center"
          distribution="center"
          direction="vertical"
          className="h-screen"
        >
          <Spinner className="mx-6 mb-3" variant="primary" size="1.5rem" />

          <p>Loading...</p>
        </Stack>
      )}
    </>
  )
}

export default Auth

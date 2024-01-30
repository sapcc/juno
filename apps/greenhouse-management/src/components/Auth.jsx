import React from "react"
import { Stack } from "juno-ui-components"
import { useIsLoggedIn } from "./StoreProvider"
import HintLoading from "./shared/HintLoading"

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
          <HintLoading />
        </Stack>
      )}
    </>
  )
}

export default Auth

import React from "react"
import { Stack, Button, Spinner } from "juno-ui-components"

const WelcomeView = ({ loginCallback, isProcessing }) => {
  return (
    <Stack
      alignment="center"
      distribution="center"
      direction="vertical"
      className="mt-[10vh]"
    >
      <p className="text-xl">
        Welcome to the Converged Cloud Client Certificate Self-Service
      </p>
      {isProcessing ? (
        <Spinner />
      ) : (
        <>
          <p className="text-xl">
            Login to create and manage your certificates
          </p>
          <Button
            label="Login"
            variant="primary"
            onClick={loginCallback}
            className="mt-2"
          />
        </>
      )}
    </Stack>
  )
}

export default WelcomeView

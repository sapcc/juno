import React from "react"
import { Stack, Button } from "juno-ui-components"

const WellcomeView = ({ loginCallback }) => {
  return (
    <Stack
      alignment="center"
      distribution="center"
      direction="vertical"
      className="h-full"
    >
      <p className="text-xl">Wellcome to the Converged Cloud Platform</p>
      <p className="text-md">Login to manage your SSO certificates</p>
      <Button
        label="Login"
        variant="primary"
        onClick={loginCallback}
        className="mt-2"
      />
    </Stack>
  )
}

export default WellcomeView

import React from "react"
import { Stack, Button } from "juno-ui-components"
import CustomAppShell from "./CustomAppShell"

const WellcomeView = ({ loginCallback }) => {
  return (
    <CustomAppShell>
      <Stack
        alignment="center"
        distribution="center"
        direction="vertical"
        className="mt-[10vh]"
      >
        <p className="text-xl">
          Wellcome to the Converged Cloud Client Certificate Self-Service
        </p>
        <p className="text-xl">Login to create and manage your certificates</p>
        <Button
          label="Login"
          variant="primary"
          onClick={loginCallback}
          className="mt-2"
        />
      </Stack>
    </CustomAppShell>
  )
}

export default WellcomeView

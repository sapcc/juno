import React, { useState, useEffect } from "react"
import SilenceScheduled from "./SilenceScheduled"

import { MessagesProvider } from "messages-provider"
import { Button } from "juno-ui-components"
const SilenceScheduledWrapper = () => {
  const [displayNewScheduledSilence, setDisplayNewScheduledSilence] =
    useState(false)

  return (
    <>
      <MessagesProvider>
        <Button
          onClick={(e) => {
            e.stopPropagation()
            setDisplayNewScheduledSilence(!displayNewScheduledSilence)
          }}
        >
          Silence
        </Button>
        {displayNewScheduledSilence && <SilenceScheduled />}
      </MessagesProvider>
    </>
  )
}

export default SilenceScheduledWrapper

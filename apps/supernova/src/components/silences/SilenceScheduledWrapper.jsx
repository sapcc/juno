import React, { useState, useEffect } from "react"
import SilenceScheduled from "./SilenceScheduled"

import { MessagesProvider } from "messages-provider"
import { Button, Icon } from "juno-ui-components"

const SilenceScheduledWrapper = () => {
  const [displayNewScheduledSilence, setDisplayNewScheduledSilence] =
    useState(false)

  // function which sets displayNewScheduledSilence to false
  const callbackOnClose = () => {
    setDisplayNewScheduledSilence(false)
  }

  return (
    <>
      <MessagesProvider>
        <Button
          onClick={(e) => {
            e.stopPropagation()
            setDisplayNewScheduledSilence(!displayNewScheduledSilence)
          }}
        >
          Schedule Silence
        </Button>
        {displayNewScheduledSilence && (
          <SilenceScheduled callbackOnClose={callbackOnClose} />
        )}
      </MessagesProvider>
    </>
  )
}

export default SilenceScheduledWrapper

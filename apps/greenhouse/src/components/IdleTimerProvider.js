import React, { useState, useEffect } from "react"
import useIdleTimer from "../hooks/useIdleTimer"
import { Modal } from "juno-ui-components"
import { broadcast, watch, onGet } from "communicator"

const IdleTimerProvider = ({ timeout, onTimeout, onActive, children }) => {
  const { isActive, inActiveSince } = useIdleTimer({ timeout })
  const [isUserInactive, setIsUserInactive] = useState(false)

  console.log("IdleTimerProvider: ", timeout, isActive, inActiveSince)

  useEffect(() => {
    if (!isActive) {
      setIsUserInactive(true)
    }
  }, [isActive])

  useEffect(() => {
    if (isUserInactive) {
      broadcast("USER_INACTIVE", "greenhouse", { debug: true })
    } else {
      broadcast("USER_ACTIVE", "greenhouse", { debug: true })
    }
  }, [isUserInactive])

  return (
    <>
      {isUserInactive && (
        <Modal
          open={true}
          onCancel={() => {
            setIsUserInactive(false)
          }}
          cancelButtonLabel="Continue"
        >
          <p>
            It seems you aren't anymore active. The workers are paused until you
            hit continue.
          </p>
        </Modal>
      )}
      {children}
    </>
  )
}

export default IdleTimerProvider

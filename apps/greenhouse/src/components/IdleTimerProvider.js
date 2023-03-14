import React, { useState, useEffect } from "react"
import { Modal } from "juno-ui-components"
import useStore from "../hooks/useStore"

const IdleTimerProvider = ({ children }) => {
  const userActivity = useStore((state) => state.userActivity)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (!userActivity?.isActive) {
      setShowModal(true)
    }
  }, [userActivity?.isActive])

  useEffect(() => {
    console.log("SHOW MODAL: ", showModal)
    userActivity?.setInactiveModal(showModal)
  }, [showModal])

  return (
    <>
      {showModal && (
        <Modal
          open={true}
          onCancel={() => {
            setShowModal(false)
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

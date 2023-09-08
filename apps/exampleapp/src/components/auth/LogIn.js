import React, { useState } from "react"

import { Modal, FormRow, TextInput } from "juno-ui-components"
import { useGlobalsActions, useAuthActions } from "../StoreProvider"

const LogIn = () => {
  const { setCurrentModal } = useGlobalsActions()
  const { setUser: logUser } = useAuthActions()
  const [newUser, setNewUser] = useState({ name: null, password: null })

  const onConfirm = () => {
    if (!newUser.name || !newUser.password) return
    logUser(newUser)
    setCurrentModal(null)
  }

  return (
    <Modal
      title="Log In"
      open
      onCancel={() => setCurrentModal(null)}
      onConfirm={onConfirm}
      confirmButtonLabel="Log In"
    >
      <FormRow>
        <TextInput
          label="Username"
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
      </FormRow>
      <FormRow>
        <TextInput
          label="Password"
          type="password"
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
      </FormRow>
    </Modal>
  )
}

export default LogIn

import React, { useState, useEffect } from "react"
import { Message } from "juno-ui-components"
import { getCertificates } from "../queries"
import { useGlobalState } from "./StateProvider"

const Messages = () => {
  const auth = useGlobalState().auth
  const [errors, setErrors] = useState({ certificatesError: null })
  const { isError: isCertsError, error: certsError } = getCertificates(
    auth.attr?.id_token
  )

  useEffect(() => {
    let errMsg = certsError?.message
    if (certsError?.message) {
      try {
        errMsg = JSON.parse(certsError?.message).msg
      } catch (error) {}
    }
    setErrors({ ...errors, certificatesError: errMsg })
  }, [certsError])

  return (
    <>
      {isCertsError && (
        <Message variant="danger">{errors.certificatesError}</Message>
      )}
    </>
  )
}

export default Messages

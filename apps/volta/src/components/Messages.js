import React, { useState, useEffect } from "react"
import { Message } from "juno-ui-components"
import { getCertificates } from "../queries"

const Messages = () => {
  const [errors, setErrors] = useState({ certificatesError: null })
  const { isError: isCertsError, error: certsError } = getCertificates()

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

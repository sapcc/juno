import React, { useState, useMemo } from "react"
import { Button, ContentArea } from "juno-ui-components"
import {
  getAlgorithm,
  generateKeys,
  pemEncodeKey,
  generateCsr,
} from "../helpers"

const preClasses = `
whitespace-pre-wrap
bg-theme-background-lvl-3
p-4
`
const codeClasses = `
w-full 
break-all
`

const ALGORITHM_KEY = "RSA-2048"

const NewCertificate = () => {
  const [keys, setKeys] = useState(null)
  const [pemCsr, setPemCsr] = useState(null)
  const [pemEncodedPublicKey, setPemEncodedPublicKey] = useState(null)
  const [pemEncodedPrivateKey, setPemEncodedPrivateKey] = useState(null)

  const algorithm = useMemo(() => getAlgorithm(ALGORITHM_KEY), [ALGORITHM_KEY])

  const getNewKeys = () => {
    // reset obj
    setKeys(null)
    setPemEncodedPublicKey(null)
    setPemEncodedPrivateKey(null)

    generateKeys(algorithm).then((keys) => {
      setKeys(keys)
      pemEncodeKey(keys.publicKey)
        .then((pemKey) => {
          setPemEncodedPublicKey(pemKey)
        })
        .catch((error) => {
          console.log("error: ", error)
        })

      pemEncodeKey(keys.privateKey)
        .then((pemKey) => {
          setPemEncodedPrivateKey(pemKey)
        })
        .catch((error) => {
          console.log("error: ", error)
        })
    })
  }

  const onGenerateClicked = () => getNewKeys()

  const onGenerateCSRClicked = () => {
    if (!keys) return
    setPemCsr(null)
    generateCsr(algorithm, keys)
      .then((csr) => {
        setPemCsr(csr.toString("pem"))
      })
      .catch((error) => {
        console.log("error: ", error)
      })
  }

  return (
    <>
      <Button label="Generate keys" onClick={onGenerateClicked} />
      {pemEncodedPublicKey && (
        <pre className={`volta-codeblock ${preClasses}`}>
          <code className={codeClasses}>{pemEncodedPublicKey}</code>
        </pre>
      )}
      {pemEncodedPrivateKey && (
        <pre className={`volta-codeblock ${preClasses}`}>
          <code className={codeClasses}>{pemEncodedPrivateKey}</code>
        </pre>
      )}
      <Button label="Generate CSR" onClick={onGenerateCSRClicked} />
      {pemCsr && (
        <pre className={`volta-codeblock ${preClasses}`}>
          <code className={codeClasses}>{pemCsr}</code>
        </pre>
      )}
    </>
  )
}

export default NewCertificate

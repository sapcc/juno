import React, { useState } from "react"
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

const NewCertificate = () => {
  const [keys, setKeys] = useState(null)
  const [pemEncodedPublicKey, setPemEncodedPublicKey] = useState(null)
  const [pemEncodedPrivateKey, setPemEncodedPrivateKey] = useState(null)

  const onGenerateClicked = () => {
    const alg = getAlgorithm("RSA-2048")
    console.log("alg: ", alg)

    generateKeys(alg).then((keys) => {
      // reset obj
      setPemEncodedPublicKey(null)
      setPemEncodedPrivateKey(null)

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
    </>
  )
}

export default NewCertificate

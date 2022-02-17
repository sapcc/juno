import React, { useState } from "react"
import { Button, ContentArea } from "juno-ui-components"
import {
  getAlgorithm,
  generateKeys,
  pemEncodePrivateKey,
  generateCsr,
} from "../helpers"

const NewCertificate = () => {
  const [keys, setKeys] = useState(null)
  const [displayPK, setDisplayPK] = useState(null)

  const onGenerateClicked = () => {
    const alg = getAlgorithm("RSA-2048")
    console.log("alg: ", alg)

    generateKeys(alg).then((keys) => {
      pemEncodePrivateKey(keys).then((pk) => {
        setDisplayPK(pk)
      })
    })
  }

  return (
    <>
      <Button label="generate" onClick={onGenerateClicked} />
      {setDisplayPK && <ContentArea>{displayPK}</ContentArea>}
    </>
  )
}

export default NewCertificate

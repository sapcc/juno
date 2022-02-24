import React, { useState, useMemo } from "react"
import { Button, Modal, Spinner, Stack } from "juno-ui-components"
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
mt-2
`
const codeClasses = `
w-full 
break-all
`

const section = `
py-2
`
const sectionBody = `
py-2
`

const ALGORITHM_KEY = "RSA-2048"

const NewCertificate = ({ onClose }) => {
  const [keys, setKeys] = useState(null)
  const [pemCsr, setPemCsr] = useState(null)
  const [pemEncodedPrivateKey, setPemEncodedPrivateKey] = useState(null)
  const [processingAuto, setProcessingAuto] = useState(false)

  const algorithm = useMemo(() => getAlgorithm(ALGORITHM_KEY), [ALGORITHM_KEY])

  const onAutoClicked = () => {
    setProcessingAuto(true)
    setKeys(null)
    setPemEncodedPrivateKey(null)
    setPemCsr(null)
    // get the keys first
    generateKeys(algorithm).then((keys) => {
      setKeys(keys)
      // encode private key
      pemEncodeKey(keys.privateKey)
        .then((pemKey) => {
          setPemEncodedPrivateKey(pemKey)
        })
        .catch((error) => {
          // TODO break process
          console.log("error: ", error)
        })
        .then(() => {
          generateCsr(algorithm, keys)
            .then((csr) => {
              setPemCsr(csr.toString("pem"))
            })
            .catch((error) => {
              console.log("error: ", error)
            })
        })
    })
  }
  const onManuallyClicked = () => {}

  return (
    <Modal isOpen={true} title="New SSO Cert" close={onClose}>
      <div>
        In order to create a new SSO certificat you can choose between:
        <ul>
          <li className={section}>
            <div>
              <b>Autogenerate</b>: the app creates for you a private key and the
              needed certificate sign request (CSR) which are send automatically
              to the backend by clicking the button below. As a result you will
              get a pem coded private key and the SSO certificate. Please
              remember to secure the private key since it is not saved anywhere
              else.
            </div>
            <div className={sectionBody}>
              <Stack alignment="center" className="">
                <Button
                  disabled={processingAuto}
                  label="Auto"
                  onClick={onAutoClicked}
                />
                {processingAuto && (
                  <Spinner className="ml-2" variant="primary" />
                )}
              </Stack>

              {pemEncodedPrivateKey && (
                <pre className={`volta-codeblock ${preClasses}`}>
                  <code className={codeClasses}>{pemEncodedPrivateKey}</code>
                </pre>
              )}
              {/* <Button label="Generate CSR" onClick={onGenerateCSRClicked} /> */}
              {pemCsr && (
                <pre className={`volta-codeblock ${preClasses}`}>
                  <code className={codeClasses}>{pemCsr}</code>
                </pre>
              )}
            </div>
          </li>
          <li>
            <b>Manually</b>: you create your self the certificate sign request
            (CSR) and paste it in the text area displayed when clicking the
            button below. As a result you will get a pem coded SSO certificate.
            Please see following information and examples for creating a
            certificate sign request (CSR):
            <a
              href="https://github.wdf.sap.corp/cc/volta/blob/master/docs/api-v1.md#Sign-a-certificate"
              target="_blank"
            >
              Documentation | Sign a certificate
            </a>
            <div className={sectionBody}>
              <Button label="Manually" onClick={onManuallyClicked} />
            </div>
          </li>
        </ul>
      </div>
    </Modal>
  )
}

export default NewCertificate

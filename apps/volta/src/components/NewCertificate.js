import React, { useState, useMemo } from "react"
import {
  Button,
  Modal,
  Spinner,
  Stack,
  Message,
  Select,
  SelectOption,
  Label,
  TextInputRow,
  TextareaRow,
} from "juno-ui-components"
import { newCertificateMutation } from "../queries"
import {
  getAlgorithm,
  generateKeys,
  pemEncodeKey,
  generateCsr,
} from "../helpers"
import { useGlobalState } from "./StateProvider"

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

const ALGORITHM_KEY = "RSA-2048"

const NewCertificate = ({ onClose }) => {
  const auth = useGlobalState().auth
  const [pemCsr, setPemCsr] = useState(null)
  const [sso, setSso] = useState(null)
  const [pemEncodedPrivateKey, setPemEncodedPrivateKey] = useState(null)
  const [processingAuto, setProcessingAuto] = useState(false)
  const [error, setError] = useState(null)
  const [showAutoSection, setShowAutoSection] = useState(false)
  const [showManuallySection, setShowManuallySection] = useState(false)

  const algorithm = useMemo(() => getAlgorithm(ALGORITHM_KEY), [ALGORITHM_KEY])

  const mutation = newCertificateMutation()

  const onAutoClicked = () => {
    setProcessingAuto(true)
    setPemEncodedPrivateKey(null)
    setPemCsr(null)
    // get the keys first
    generateKeys(algorithm).then((newKeys) => {
      // encode private key
      pemEncodeKey(newKeys.privateKey)
        .then((pemKey) => {
          setPemEncodedPrivateKey(pemKey)
          return newKeys
        })
        .catch((error) => {
          // TODO break process
          console.log("error: ", error)
        })
        .then((newKeys) => {
          generateCsr(algorithm, newKeys)
            .then((csr) => {
              // convert csr to pem string
              const pemEncodedCSR = csr.toString("pem")
              setPemCsr(pemEncodedCSR)
              return pemEncodedCSR
            })
            .catch((error) => {
              console.log("error: ", error)
            })
            .then((newPemCsr) => {
              // make request
              mutation.mutate(
                {
                  bearerToken: auth.attr?.id_token,
                  csr: newPemCsr,
                },
                {
                  onSuccess: (data, variables, context) => {
                    // I will fire first
                  },
                  onError: (error, variables, context) => {
                    console.log("onError: ", error.message)
                    console.log("variables: ", variables)
                    console.log("context: ", context)
                  },
                  onSettled: (data, error, variables, context) => {
                    // I will fire first
                  },
                }
              )
            })
        })
    })
  }
  const onManuallyClicked = () => {}

  const onSelectChanged = (e) => {
    setShowAutoSection(false)
    setShowManuallySection(false)
    if (e.target.value === "auto") setShowAutoSection(true)
    else if (e.target.value === "manually") setShowManuallySection(true)
  }

  return (
    <Modal isOpen={true} title="New SSO Cert" close={onClose}>
      {/* <Message variant="danger">Error</Message> */}
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
            <div className={section}>
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
                <>
                  <pre className={`volta-codeblock ${preClasses}`}>
                    <code className={codeClasses}>{pemCsr}</code>
                  </pre>
                </>
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
            <div className={section}>
              <Button label="Manually" onClick={onManuallyClicked} />
            </div>
          </li>
        </ul>
        <div className="select-method">
          <Label text="Please select how you want to proceed" />
          <div>
            <Select name="Simple-Select" onChange={onSelectChanged}>
              <SelectOption label="Select..." value="" />
              <SelectOption label="Autogenerate" value="auto" />
              <SelectOption label="Manually" value="manually" />
            </Select>
          </div>
        </div>
        {showAutoSection && (
          <div className={section}>
            <TextInputRow
              label="Description"
              onChange={function noRefCheck() {}}
            />
          </div>
        )}
        {showManuallySection && (
          <div className={section}>
            <TextInputRow
              label="Description"
              onChange={function noRefCheck() {}}
            />
            <TextareaRow
              label="Certificate sign request"
              onChange={function noRefCheck() {}}
            />
          </div>
        )}
      </div>
    </Modal>
  )
}

export default NewCertificate

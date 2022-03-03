import React, {
  useState,
  useMemo,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react"
import {
  Button,
  Spinner,
  Stack,
  TextInputRow,
  TextareaRow,
  Message,
  Checkbox,
} from "juno-ui-components"
import {
  getAlgorithm,
  generateKeys,
  pemEncodeKey,
  generateCsr,
} from "../helpers"
import { newCertificateMutation } from "../queries"
import { useFormState, useFormDispatch } from "./FormState"
import { useGlobalState } from "./StateProvider"

const ALGORITHM_KEY = "RSA-2048"

const preClasses = `
whitespace-pre-wrap
bg-theme-background-lvl-5
p-4
mt-2
rounded
max-h-40
overflow-y-scroll
`
const codeClasses = `
w-full 
break-all
`
const validateForm = ({ name, description, csr, pkCopied }) => {
  const invalidItems = {}

  if (!name || name.length === 0) {
    if (!invalidItems["name"]) invalidItems["name"] = []
    invalidItems["name"].push(`Name can't be blank`)
  }

  if (name && name.length > 30) {
    if (!invalidItems["name"]) invalidItems["name"] = []
    invalidItems["name"].push(`30 characters is the maximum allowed`)
  }

  if (description && description.length > 100) {
    if (!invalidItems["description"]) invalidItems["description"] = []
    invalidItems["description"].push(`100 characters is the maximum allowed`)
  }

  if (!csr || csr.length === 0) {
    if (!invalidItems["csr"]) invalidItems["csr"] = []
    invalidItems["csr"].push(`Certificate signing request can't be blank`)
  }

  if (pkCopied !== undefined && !pkCopied) {
    if (!invalidItems["pkCopied"]) invalidItems["pkCopied"] = []
    invalidItems["pkCopied"].push(
      `Please check you have copied the private key`
    )
  }

  return invalidItems
}

const Form = ({ onValidationChanged }, ref) => {
  const dispatch = useFormDispatch()
  const formState = useFormState()
  const auth = useGlobalState().auth

  const [sso, setSso] = useState(null)
  const [pemEncodedPrivateKey, setPemEncodedPrivateKey] = useState(null)
  const [generatingCSR, setGeneretingCSR] = useState(false)
  const [formValidation, setFormValidation] = useState({})

  const algorithm = useMemo(() => getAlgorithm(ALGORITHM_KEY), [ALGORITHM_KEY])
  const mutation = newCertificateMutation()

  useEffect(() => {
    if (auth && auth?.attr?.login_name) {
      dispatch({
        type: "SET_ATTR",
        key: "identity",
        value: auth?.attr?.login_name,
      })
    }
  }, [])

  const generateCSR = () => {
    setGeneretingCSR(true)
    setPemEncodedPrivateKey(null)
    dispatch({
      type: "SET_ATTR",
      key: "csr",
      value: "",
    })
    // get the keys first
    generateKeys(algorithm)
      .then((newKeys) => {
        // encode private key
        pemEncodeKey(newKeys.privateKey)
          .then((pemKey) => {
            setPemEncodedPrivateKey(pemKey)
            onAttrChanged("pkCopied", false)
            return newKeys
          })
          .catch((error) => {
            // TODO break process
            console.log("error: ", error)
          })
          .then((newKeys) => {
            generateCsr(algorithm, newKeys)
              .then((csr) => {
                onAttrChanged("csr", csr.toString("pem"))
              })
              .catch((error) => {
                console.log("error: ", error)
              })
          })
      })
      .then(() => setGeneretingCSR(false))
  }

  useImperativeHandle(ref, () => ({
    submit() {
      // TODO validation
      const data = formState
      console.log("submit: ", data)
      const formValidation = validateForm({ data })
      console.log("formValidation: ", formValidation)
      setFormValidation(formValidation)
      // make request
      // mutation.mutate(
      //   {
      //     bearerToken: auth.attr?.id_token,
      //     csr: pemCsr,
      //   },
      //   {
      //     onSuccess: (data, variables, context) => {
      //       // I will fire first
      //     },
      //     onError: (error, variables, context) => {
      //       console.log("onError: ", error.message)
      //       console.log("variables: ", variables)
      //       console.log("context: ", context)
      //     },
      //     onSettled: (data, error, variables, context) => {
      //       // I will fire first
      //     },
      //   }
      // )
    },
  }))

  const textAreaHelpText = () => {
    return (
      <>
        Create a certificate sign request (CSR) and paste it in the text area.
        Please see following information and examples for creating a certificate
        sign request (CSR):{" "}
        <a
          href="https://github.wdf.sap.corp/cc/volta/blob/master/docs/api-v1.md#Sign-a-certificate"
          target="_blank"
        >
          Documentation | Sign a certificate
        </a>
      </>
    )
  }

  const errorHelpText = (messages) => {
    return messages.map((msg, i) => (
      <span key={i} className="block text-theme-danger ">
        {msg}
      </span>
    ))
  }

  const onAttrChanged = (key, value) => {
    dispatch({ type: "SET_ATTR", key: key, value: value })
  }

  // update form validation so it can be used outside of the form
  useEffect(() => {
    onValidationChanged(validateForm(formState))
  }, [formState])

  return (
    <>
      <TextInputRow
        label="Name"
        required
        onChange={(e) => {
          onAttrChanged("name", e.target.value)
        }}
        helptext={
          formValidation["name"] && errorHelpText(formValidation["name"])
        }
        className={formValidation["name"] && "text-theme-danger border-2"}
      />
      <TextInputRow
        label="Description"
        onChange={(e) => {
          onAttrChanged("description", e.target.value)
        }}
        helptext={
          formValidation["description"] &&
          errorHelpText(formValidation["description"])
        }
        className={
          formValidation["description"] && "text-theme-danger border-2"
        }
      />
      <TextInputRow
        label="User"
        value={formState.identity}
        onChange={(e) => {
          onAttrChanged("identity", e.target.value)
        }}
        helptext={
          formValidation["identity"]
            ? errorHelpText(formValidation["identity"])
            : "Owner for whom the certificate will be issued"
        }
        className={formValidation["identity"] && "text-theme-danger border-2"}
      />
      <Stack alignment="center" className="mb-2" distribution="end">
        <Button
          disabled={generatingCSR}
          label="Generate CSR"
          onClick={generateCSR}
        />
        {generatingCSR && <Spinner className="ml-2" variant="primary" />}
      </Stack>
      <TextareaRow
        required
        label="Certificate sign request (CSR)"
        value={formState.csr}
        onChange={(e) => {
          setPemEncodedPrivateKey(null)
          onAttrChanged("csr", e.target.value)
        }}
        helptext={
          formValidation["csr"]
            ? errorHelpText(formValidation["csr"])
            : textAreaHelpText()
        }
        className={formValidation["csr"] && "text-theme-danger border-2"}
      />

      {pemEncodedPrivateKey && (
        <div className="mt-10">
          <Message
            text="Please copy the private key below and store it in a save place. This key is being used to create the certificate sign request and it is not store anyware."
            variant="warning"
          />
          <pre className={preClasses}>
            <code className={codeClasses}>{pemEncodedPrivateKey}</code>
          </pre>

          <Stack alignment="center" className="mt-5">
            <Checkbox
              onChange={(e) => {
                onAttrChanged("pkCopied", e.target.checked)
              }}
            />
            <span className="ml-2">
              I have copied the private key and stored it in a save place.
            </span>
          </Stack>
        </div>
      )}
    </>
  )
}

export default forwardRef(Form)

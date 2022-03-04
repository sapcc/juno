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

export const validateForm = ({ name, description, csr }) => {
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

  return invalidItems
}

const Form = ({ onFormSubmitted }, ref) => {
  const dispatch = useFormDispatch()
  const formState = useFormState()
  const auth = useGlobalState().auth

  const [pemPrivateKey, setPemPrivateKey] = useState(null)
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
    setPemPrivateKey(null)
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
            setPemPrivateKey(pemKey)
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
      const validation = validateForm(formState)
      setFormValidation(validation)
      if (Object.keys(validation).length > 0) {
        return
      }
      mutation.mutate(
        {
          bearerToken: auth.attr?.id_token,
          formState: formState,
        },
        {
          onSuccess: (data) => {
            onFormSubmitted(pemPrivateKey, data?.certificate)
          },
          onError: (error) => {
            console.log("onError: ", error.message)
            console.log("variables: ", variables)
            console.log("context: ", context)
          },
          onSettled: (data, error, variables, context) => {
            // Invalidate certificates query
          },
        }
      )
    },
  }))

  const textAreaHelpText = () => {
    return (
      <>
        You can either create your own certificate signing request (CSR) using
        an existing private key or we can create one for you (this will also
        create a new private key; we will not store this key). Please see
        following information and examples for creating a certificate signing
        request:{" "}
        <a
          href="https://github.wdf.sap.corp/cc/volta/blob/master/docs/api-v1.md#Sign-a-certificate"
          target="_blank"
        >
          Documentation | Signing a certificate
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
          size="small"
          onClick={generateCSR}
        />
        {generatingCSR && <Spinner className="ml-2" variant="primary" />}
      </Stack>
      <TextareaRow
        required
        label="Certificate sign request (CSR)"
        value={formState.csr}
        onChange={(e) => {
          setPemPrivateKey(null)
          onAttrChanged("csr", e.target.value)
        }}
        helptext={
          formValidation["csr"]
            ? errorHelpText(formValidation["csr"])
            : textAreaHelpText()
        }
        className={formValidation["csr"] && "text-theme-danger border-2"}
      />
    </>
  )
}

export default forwardRef(Form)

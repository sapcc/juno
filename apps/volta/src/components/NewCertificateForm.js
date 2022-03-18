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
  Form,
} from "juno-ui-components"
import {
  generateKeys,
  pemEncodeKey,
  generateCsr,
  getAlgorithm,
} from "../lib/csrUtils"
import { newCertificateMutation } from "../queries"
import { useFormState, useFormDispatch } from "./FormState"
import { useGlobalState } from "./StateProvider"
import { parseError } from "../helpers"
import { useMessagesDispatch } from "./MessagesProvider"
import { useQueryClient } from "react-query"

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

const NewCertificateForm = ({ onFormSuccess, onFormLoading }, ref) => {
  const dispatch = useFormDispatch()
  const formState = useFormState()
  const auth = useGlobalState().auth
  const endpoint = useGlobalState().globals.endpoint
  const dispatchMessage = useMessagesDispatch()
  const queryClient = useQueryClient()

  const [pemPrivateKey, setPemPrivateKey] = useState(null)
  const [formValidation, setFormValidation] = useState({})

  const algorithm = useMemo(() => getAlgorithm(ALGORITHM_KEY), [ALGORITHM_KEY])

  // useMutation can't create a subscription like for useQuery. State can't be shared
  // https://github.com/tannerlinsley/react-query/issues/2304
  const { isLoading, isError, error, data, isSuccess, mutate } =
    newCertificateMutation()

  useEffect(() => {
    if (!onFormLoading) return
    onFormLoading(isLoading)
  }, [isLoading])

  // on form init set the identity attributes
  useEffect(() => {
    if (auth && auth?.attr?.login_name) {
      dispatch({
        type: "SET_ATTR",
        key: "identity",
        value: auth?.attr?.login_name,
      })
    }
  }, [])

  const onGenerateCSRError = () => {
    dispatchMessage({
      type: "SET_MESSAGE",
      msg: {
        variant: "error",
        text: "Error generating certificate signing request. Please check the console for details.",
      },
    })
  }

  const generateCSR = () => {
    setPemPrivateKey(null)
    dispatch({
      type: "SET_ATTR",
      key: "csr",
      value: "",
    })
    // get the keys first
    generateKeys(algorithm).then((newKeys) => {
      // encode private key
      pemEncodeKey(newKeys?.privateKey)
        .then((pemKey) => {
          // save the private key pem encoded
          setPemPrivateKey(pemKey)
          // create csr
          generateCsr(algorithm, newKeys)
            .then((csr) => {
              onAttrChanged("csr", csr.toString("pem"))
            })
            .catch((error) => {
              console.error("generateCsr: ", error)
              onGenerateCSRError()
            })
        })
        .catch((error) => {
          console.error("pemEncodeKey: ", error)
          onGenerateCSRError()
        })
    })
  }

  useImperativeHandle(ref, () => ({
    submit() {
      // reset panel messages
      dispatchMessage({
        type: "RESET_MESSAGE",
      })
      // check validaton
      const validation = validateForm(formState)
      setFormValidation(validation)
      if (Object.keys(validation).length > 0) {
        return
      }
      mutate(
        {
          endpoint: endpoint,
          bearerToken: auth.attr?.id_token,
          formState: formState,
        },
        {
          onSuccess: (data, variables, context) => {
            dispatchMessage({
              type: "SET_MESSAGE",
              msg: {
                variant: "success",
                text: <span>Successfully create SSO cert</span>,
              },
            })
            // return response to the parent
            if (onFormSuccess) {
              onFormSuccess(pemPrivateKey, data?.certificate)
            }
            // refetch cert list
            queryClient.invalidateQueries("certificates")
          },
          onError: (error, variables, context) => {
            dispatchMessage({
              type: "SET_MESSAGE",
              msg: {
                variant: "error",
                text: parseError(error),
              },
            })
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
    <Form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
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
            : "Owner for whom the certificate will be issued. Owner can be also a technical user or technical team user which belongs to the user who is creating the SSO certificate."
        }
        className={formValidation["identity"] && "text-theme-danger border-2"}
      />
      <Stack alignment="center" className="mb-2" distribution="end">
        <Button label="Generate CSR" size="small" onClick={generateCSR} />
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
    </Form>
  )
}

export default forwardRef(NewCertificateForm)

import React, {
  useState,
  useMemo,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react"
import {
  Button,
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
import { useCertState } from "../hooks/useCertState"
import useStore from "../store"
import { parseError } from "../helpers"
import { useQueryClient } from "react-query"
import { useMessageStore } from "messages-provider"

const ALGORITHM_KEY = "RSA-2048"

const NewCertificateForm = ({ ca, onFormSuccess, onFormLoading }, ref) => {
  const addMessage = useMessageStore((state) => state.addMessage)
  const resetMessages = useMessageStore((state) => state.resetMessages)

  // the form state is being handeled in a zustand context store. Since the complexity
  // in this form is very low could be removed from here.
  const formState = useCertState(useCallback((state) => state.formState))
  const setAttribute = useCertState(useCallback((state) => state.setAttribute))
  const formValidation = useCertState(
    useCallback((state) => state.formValidation)
  )

  const oidc = useStore(useCallback((state) => state.oidc))
  const endpoint = useStore(useCallback((state) => state.endpoint))
  const queryClient = useQueryClient()

  const [pemPrivateKey, setPemPrivateKey] = useState(null)
  const [showValidation, setShowValidation] = useState({})

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
    if (!setAttribute) return
    const userId = (
      oidc?.auth?.subject || oidc?.auth?.login_name
    )?.toUpperCase()
    if (userId) {
      setAttribute({ key: "identity", value: userId })
    }
  }, [setAttribute])

  const onGenerateCSRError = () => {
    addMessage({
      variant: "error",
      text: "Error generating certificate signing request. Please check the console for details.",
    })
  }

  const generateCSR = () => {
    setPemPrivateKey(null)
    setAttribute({ key: "csr", value: "" })
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
              onGenerateCSRError()
            })
        })
        .catch((error) => {
          onGenerateCSRError()
        })
    })
  }

  useImperativeHandle(ref, () => ({
    submit() {
      // reset panel messages
      resetMessages()
      // check validaton
      setShowValidation(formValidation)
      if (Object.keys(formValidation).length > 0) return
      mutate(
        {
          endpoint: endpoint,
          ca: ca,
          bearerToken: oidc?.auth?.id_token,
          formState: formState,
        },
        {
          onSuccess: (data, variables, context) => {
            addMessage({
              variant: "success",
              text: <span>Successfully create SSO cert</span>,
            })
            // return response to the parent
            if (onFormSuccess) {
              onFormSuccess(pemPrivateKey, data?.certificate)
            }
            // refetch cert list
            queryClient.invalidateQueries("certificates")
          },
          onError: (error, variables, context) => {
            addMessage({
              variant: "error",
              text: parseError(error),
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
    setAttribute({ key: key, value: value })
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
          showValidation["name"] && errorHelpText(showValidation["name"])
        }
        className={showValidation["name"] && "text-theme-danger border-2"}
      />
      <TextInputRow
        label="Description"
        onChange={(e) => {
          onAttrChanged("description", e.target.value)
        }}
        helptext={
          showValidation["description"] &&
          errorHelpText(showValidation["description"])
        }
        className={
          showValidation["description"] && "text-theme-danger border-2"
        }
      />
      <TextInputRow
        label="User"
        value={formState.identity}
        onChange={(e) => {
          onAttrChanged("identity", e.target.value?.toUpperCase())
        }}
        helptext={
          showValidation["identity"]
            ? errorHelpText(showValidation["identity"])
            : "Owner for whom the certificate will be issued. Owner can be also a technical user or technical team user which belongs to the user who is creating the SSO certificate."
        }
        className={showValidation["identity"] && "text-theme-danger border-2"}
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
          showValidation["csr"]
            ? errorHelpText(showValidation["csr"])
            : textAreaHelpText()
        }
        className={showValidation["csr"] && "text-theme-danger border-2"}
      />
    </Form>
  )
}

export default forwardRef(NewCertificateForm)

import React, { useState } from "react"
import {
  Modal,
  Button,
  Box,
  Form,
  Textarea,
  TextInput,
  Select,
  SelectOption,
  Message,
} from "juno-ui-components"
import {
  useAuthData,
  useSilencesExcludedLabels,
  useGlobalsApiEndpoint,
  useSilencesActions,
  useAlertEnrichedLabels,
} from "../../hooks/useAppStore"
import { post } from "../../api/client"
import AlertDescription from "../alerts/shared/AlertDescription"
import SilenceNewAdvanced from "./SilenceNewAdvanced"
import { DateTime } from "luxon"
import {
  latestExpirationDate,
  DEFAULT_DURATION_OPTIONS,
  getSelectOptions,
  setupMatchers,
} from "./silenceHelpers"
import { parseError } from "../../helpers"

const validateForm = (values) => {
  const invalidItems = {}
  if (values?.comment?.length <= 3) {
    if (!invalidItems["comment"]) invalidItems["comment"] = []
    invalidItems["comment"].push(`Description can't be blank`)
  }

  return invalidItems
}

const errorHelpText = (messages) => {
  return messages.map((msg, i) => (
    <span key={i} className="block text-theme-danger ">
      {msg}
    </span>
  ))
}

const SilenceScheduled = ({ alert, size, variant }) => {
  const [displayNewSilence, setDisplayNewSilence] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  const onSubmitForm = () => {
    setSuccess(null)

    const newSilence = "jo"

    // submit silence
    // post(`${apiEndpoint}/silences`, {
    post(`localhost/silences`, {
      body: JSON.stringify(newSilence),
    })
      .then((data) => {
        setSuccess(data)
      })
      .catch((error) => {
        setError(parseError(error))
      })
  }

  return (
    <>
      <Button
        size={size}
        variant={variant}
        onClick={(e) => {
          e.stopPropagation()
          setDisplayNewSilence(!displayNewSilence)
        }}
      >
        Silence
      </Button>
      {displayNewSilence && (
        <Modal
          title="Schedule new silence"
          size="large"
          open={true}
          confirmButtonLabel={success ? null : "Save"}
          onCancel={() => setDisplayNewSilence(false)}
          onConfirm={success ? null : onSubmitForm}
        >
          {error && <Message text={error} variant="danger" />}

          {success && (
            <Message className="mb-6" variant="info">
              A silence object with id <b>{success?.silenceID}</b> was created
              successfully. Please note that it may take up to 5 minutes for the
              alert to show up as silenced.
            </Message>
          )}

          {!success && (
            <>
              <Form className="mt-6">
                <TextInput
                  className="mb-4"
                  required
                  label="Silenced by"
                  value="Me"
                  disabled
                />
              </Form>
            </>
          )}
        </Modal>
      )}
    </>
  )
}

export default SilenceScheduled

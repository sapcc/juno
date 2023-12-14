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
  FormRow,
  Stack,
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
import fakesilence from "./fakesilence.json"
import { e } from "juno-ui-components/build/floating-ui.dom-a8dd2d87"
import { k } from "juno-ui-components/build/Icon.component-96dfa3a1"

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
  const [selected, setSelected] = useState(null)

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
          onConfirm={success ? null : onSubmitForm}
        >
          {error && <Message text={error} variant="danger" />}

          {success && (
            <Message className="mb-6" variant="success">
              A silence object with id <b>{success?.silenceID}</b> was created
              successfully. Please note that it may take up to 5 minutes for the
              alert to show up as silenced.
            </Message>
          )}

          {!success && (
            <>
              <Form className="mt-6">
                <FormRow>
                  <Select
                    required
                    label="Silence Template"
                    value={selected?.title || "Select"}
                  >
                    {fakesilence?.map((option) => (
                      <SelectOption
                        key={option.title}
                        label={option.title}
                        value={option.title}
                        onClick={() => {
                          setSelected(option)
                        }}
                      />
                    ))}
                  </Select>
                </FormRow>
                <FormRow>
                  {selected && <Box>{selected?.description}</Box>}
                </FormRow>
              </Form>
              {selected && (
                <Form>
                  <FormRow>
                    <TextInput
                      required
                      label="Silenced by"
                      value="Me"
                      disabled
                    />
                  </FormRow>
                  {selected.editable_labels.length > 0 && (
                    <FormRow>
                      <div className="grid gap-2 grid-cols-3">
                        {selected.editable_labels.map((editable_labels) => (
                          <TextInput required label={editable_labels} />
                        ))}
                      </div>
                    </FormRow>
                  )}
                  {Object.keys(selected.fixed_labels).length > 0 > 0 && (
                    <FormRow>
                      <div className="grid gap-2 grid-cols-3">
                        {Object.keys(selected.fixed_labels).map((key) => (
                          <TextInput
                            required
                            label={key}
                            value={selected.fixed_labels[key]}
                            disabled
                          />
                        ))}
                      </div>
                    </FormRow>
                  )}

                  <FormRow>
                    <Textarea label="Comment"> </Textarea>
                  </FormRow>
                </Form>
              )}
            </>
          )}
        </Modal>
      )}
    </>
  )
}

export default SilenceScheduled

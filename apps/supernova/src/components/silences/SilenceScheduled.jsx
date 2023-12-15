import React, { useState, useEffect } from "react"
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

const DEFAULT_FORM_VALUES = {
  startTime: "2012-12-20T13:37",
  endTime: "2012-12-21T16:00",
  comment: "",
}

// Controls the Date if it is valid
const validateDate = (date) => {
  const dateRegex = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}$/)
  return dateRegex.test(date)
}

const SilenceScheduled = ({ alert, size, variant }) => {
  const authData = useAuthData()
  const [formState, setFormState] = useState(DEFAULT_FORM_VALUES)

  const [displayNewScheduledSilence, setDisplayNewScheduledSilence] =
    useState(false)

  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (!displayNewScheduledSilence) return

    // reset form state with default values
    setFormState({
      ...formState,
      ...DEFAULT_FORM_VALUES,
      createdBy: authData?.parsed?.fullName,
    })
    // reset other states
    setError(null)
    setSuccess(null)
  }, [displayNewScheduledSilence, selected])

  const onSubmitForm = () => {
    setSuccess(null)
    setError(null)

    let labelValues = {}

    // add fixed labels with values to the formState.labelValues object
    Object.keys(selected.fixed_labels).forEach((label) => {
      labelValues[label] = selected.fixed_labels[label]
    })

    console.log(labelValues)
    console.log(formState)

    let newSilence = { ...formState, labelValues: labelValues }
    console.log(newSilence)
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
          setDisplayNewScheduledSilence(!displayNewScheduledSilence)
        }}
      >
        Silence
      </Button>
      {displayNewScheduledSilence && (
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
                      value={formState.createdBy}
                      disabled
                    />
                  </FormRow>
                  <FormRow>
                    <div className="grid gap-2 grid-cols-2">
                      <TextInput
                        required
                        label="Startzeit"
                        value={formState.startTime}
                      />
                      <TextInput
                        required
                        label="Endzeit"
                        value={formState.endTime}
                      />
                    </div>
                  </FormRow>

                  {selected.editable_labels.length > 0 && (
                    <FormRow>
                      <div className="grid gap-2 grid-cols-3">
                        {selected.editable_labels.map((editable_label) => (
                          <TextInput
                            required
                            label={editable_label}
                            key={editable_label}
                          />
                        ))}
                      </div>
                    </FormRow>
                  )}
                  {Object.keys(selected.fixed_labels).length > 0 > 0 && (
                    <FormRow>
                      <div className="grid gap-2 grid-cols-3">
                        {Object.keys(selected.fixed_labels).map((label) => (
                          <TextInput
                            required
                            label={label}
                            value={selected.fixed_labels[label]}
                            key={label}
                            disabled
                          />
                        ))}
                      </div>
                    </FormRow>
                  )}

                  <FormRow>
                    <Textarea
                      label="Comment"
                      value={formState.comment}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          comment: e.target.value,
                        })
                      }
                    ></Textarea>
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

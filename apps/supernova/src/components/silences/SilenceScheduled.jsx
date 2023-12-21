import React, { useState, useEffect } from "react"

import { Messages, useActions } from "messages-provider"
import {
  Modal,
  Box,
  Form,
  Textarea,
  TextInput,
  Select,
  SelectOption,
  Message,
  FormRow,
  Pill,
  FormSection,
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
  startAt: "2012-12-20T13:37",
  endAt: "2012-12-21T16:00",
  fixed_labels: {},
  comment: {
    value: "",
    error: null,
  },
}

const SilenceScheduled = () => {
  const authData = useAuthData()
  const [formState, setFormState] = useState(DEFAULT_FORM_VALUES)

  const [displayNewScheduledSilence, setDisplayNewScheduledSilence] =
    useState(false)

  const [success, setSuccess] = useState(null)
  const [selected, setSelected] = useState(null)
  const [editableLabelValues, setEditableLabelValues] = useState({})
  const { addMessage } = useActions()

  useEffect(() => {
    if (!displayNewScheduledSilence) return

    // reset form state with default values
    setFormState({
      ...formState,
      ...DEFAULT_FORM_VALUES,
      createdBy: authData?.parsed?.fullName,
    })
    // reset other states
    setSuccess(null)
  }, [displayNewScheduledSilence, selected])

  const onSubmitForm = () => {
    setSuccess(null)

    if (!validateForm()) {
      return
    }

    let labelValues = {}

    // add fixed labels with values to the formState.labelValues object
    Object.keys(formState.fixed_labels).forEach((label) => {
      labelValues[label] = formState.fixed_labels[label]
    })

    labelValues = { ...labelValues, ...editableLabelValues }

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
        addMessage({
          variant: "error",
          text: parseError(error),
        })
      })
  }

  const handleEditableLabelChange = (event, editable_label) => {
    setEditableLabelValues((prevValues) => ({
      ...prevValues,
      [editable_label]: event.target.value,
    }))
  }

  const validateLabelValue = (value) => {
    try {
      return !!new RegExp(value)
    } catch (e) {
      return false
    }
  }

  const validateForm = () => {
    let errorexist = false

    // validate if comment is at least 3 characters long
    console.log("formState", formState)
    if (formState?.comment?.value.length < 3) {
      setFormState({
        ...formState,
        comment: {
          ...formState.comment,
          error: "Please enter at least 3 characters",
        },
      })
      errorexist = true
    }

    // All editable labels are valid regular expressions
    formState.editable_labels.map((editable_label) => {
      if (!validateLabelValue(editableLabelValues[editable_label])) {
        addMessage({
          variant: "error",
          text: `Value for ${editable_label} is not a valid regular expression`,
        })
        errorexist = true
      }

      if (
        !editableLabelValues[editable_label] ||
        editableLabelValues[editable_label] === ""
      ) {
        addMessage({
          variant: "error",
          text: `Value for ${editable_label} is empty`,
        })
        errorexist = true
      }
    })

    if (errorexist) {
      addMessage({
        variant: "error",
        text: parseError("Please fix the errors in the form"),
      })
      return false
    }

    return true
  }

  return (
    <Modal
      title="Schedule new silence"
      size="large"
      open={true}
      confirmButtonLabel={success ? null : "Save"}
      onConfirm={success ? null : onSubmitForm}
    >
      <Messages />

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
                      // reset formState with default values
                      setFormState({
                        ...formState,
                        ...DEFAULT_FORM_VALUES,
                        fixed_labels: option?.fixed_labels || {},
                        editable_labels: option?.editable_labels || [],
                        createdBy: authData?.parsed?.fullName,
                      })
                    }}
                  />
                ))}
              </Select>
            </FormRow>

            {selected && (
              <FormRow>
                <Box>{selected?.description}</Box>
              </FormRow>
            )}
          </Form>

          {selected && (
            <Form>
              <FormSection>
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
                      label="Start"
                      value={formState.startAt}
                    />
                    <TextInput required label="End" value={formState.endAt} />
                  </div>
                </FormRow>

                <FormRow>
                  <Textarea
                    label="Comment"
                    value={formState.comment.value}
                    errortext={formState.comment.error}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        comment: {
                          ...formState.comment,
                          value: e.target.value,
                          error: null,
                        },
                      })
                    }
                  ></Textarea>
                </FormRow>
              </FormSection>
              <FormSection>
                {formState.editable_labels.length > 0 && (
                  <FormRow>
                    <p>
                      Editable Labels are labels that are editable. You can use
                      regular expressions.
                    </p>
                  </FormRow>
                )}

                {formState.editable_labels.length > 0 && (
                  <FormRow>
                    <div className="grid gap-2 grid-cols-3">
                      {formState.editable_labels.map((editable_label) => (
                        <TextInput
                          required
                          label={editable_label}
                          key={editable_label}
                          id={editable_label}
                          onChange={(e) =>
                            handleEditableLabelChange(e, editable_label)
                          }
                        />
                      ))}
                    </div>
                  </FormRow>
                )}
              </FormSection>

              <FormSection>
                {Object.keys(formState?.fixed_labels).length > 0 && (
                  <FormRow>
                    <p>Fixed Labels are labels that are not editable.</p>
                  </FormRow>
                )}

                {Object.keys(formState?.fixed_labels).length > 0 && (
                  <FormRow>
                    <div className="grid gap-2 grid-cols-3">
                      {Object.keys(formState.fixed_labels).map((label) => (
                        <Pill
                          pillKey={label}
                          pillKeyLabel={label}
                          pillValue={formState?.fixed_labels[label]}
                          pillValueLabel={formState?.fixed_labels[label]}
                        />
                      ))}
                    </div>
                  </FormRow>
                )}
              </FormSection>
            </Form>
          )}
        </>
      )}
    </Modal>
  )
}

export default SilenceScheduled

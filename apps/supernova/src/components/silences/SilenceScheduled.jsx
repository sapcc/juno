import React, { useState, useEffect } from "react"
import produce from "immer"

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
import { C } from "juno-ui-components/build/ContentContainer.component-700aac71"

const DEFAULT_FORM_VALUES = {
  startAt: "2012-12-20T13:37",
  endAt: "2012-12-21T16:00",
  fixed_labels: {},
  editable_labels: {},
  comment: {
    value: "",
    error: null,
  },
  createdBy: "",
}

const SilenceScheduled = () => {
  const authData = useAuthData()
  const [formState, setFormState] = useState(DEFAULT_FORM_VALUES)

  const [displayNewScheduledSilence, setDisplayNewScheduledSilence] =
    useState(false)

  const [success, setSuccess] = useState(null)
  const [selected, setSelected] = useState(null)
  const { addMessage } = useActions()

  useEffect(() => {
    if (!displayNewScheduledSilence) return

    // reset form state with default values
    setFormState({
      DEFAULT_FORM_VALUES,
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

  const validateLabelValue = (value) => {
    try {
      return !!new RegExp(value)
    } catch (e) {
      return false
    }
  }

  const validateForm = () => {
    console.log("formState", formState)
    let errorexist = false

    // validate if comment is at least 3 characters long
    if (formState?.comment?.value.length < 3) {
      setFormState(
        produce((formState) => {
          formState.comment.error = "Please enter at least 3 characters"
        })
      )
      errorexist = true
    }

    // All editable labels are valid regular expressions
    console.log("formState.editable_labels", formState.editable_labels)
    Object.keys(formState.editable_labels).map((editable_label) => {
      console.log(formState.editable_labels[editable_label])

      if (
        !validateLabelValue(formState.editable_labels[editable_label].value)
      ) {
        setFormState(
          produce((formState) => {
            formState.editable_labels[
              editable_label
            ].error = `Value for ${editable_label} is not a valid regular expression`
          })
        )
        errorexist = true
      }

      if (!formState.editable_labels[editable_label].value) {
        setFormState(
          produce((formState) => {
            formState.editable_labels[
              editable_label
            ].error = `Value for ${editable_label} is empty`
          })
        )
        errorexist = true
      }
    })

    console.log("formState.editable_labels", formState.editable_labels)

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
                        ...DEFAULT_FORM_VALUES,
                        fixed_labels: option?.fixed_labels || {},
                        createdBy: authData?.parsed?.fullName,
                        // Editlabels Object with empty values and errors null
                        editable_labels: option?.editable_labels?.reduce(
                          (acc, label) => ({
                            ...acc,
                            [label]: {
                              value: "",
                              error: null,
                            },
                          }),
                          {}
                        ),
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
                      setFormState(
                        produce((formState) => {
                          formState.comment.value = e.target.value
                          formState.comment.error = null
                        })
                      )
                    }
                  ></Textarea>
                </FormRow>
              </FormSection>
              <FormSection>
                {Object.keys(formState?.editable_labels).length > 0 && (
                  <FormRow>
                    <p>
                      Editable Labels are labels that are editable. You can use
                      regular expressions.
                    </p>
                  </FormRow>
                )}

                {Object.keys(formState?.editable_labels).length > 0 && (
                  <FormRow>
                    <div className="grid gap-2 grid-cols-3">
                      {Object.keys(formState.editable_labels).map(
                        (editable_label) => (
                          <TextInput
                            required
                            label={editable_label}
                            key={editable_label}
                            id={editable_label}
                            errortext={
                              formState?.editable_labels[editable_label]?.error
                            }
                            onChange={(e) =>
                              setFormState(
                                produce((formState) => {
                                  formState.editable_labels[
                                    editable_label
                                  ].value = e.target.value
                                  formState.editable_labels[
                                    editable_label
                                  ].error = null
                                })
                              )
                            }
                          />
                        )
                      )}
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

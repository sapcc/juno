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
  comment: "",
}

const SilenceScheduled = () => {
  const authData = useAuthData()
  const [formState, setFormState] = useState(DEFAULT_FORM_VALUES)

  const [displayNewScheduledSilence, setDisplayNewScheduledSilence] =
    useState(false)

  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
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
    Object.keys(selected.fixed_labels).forEach((label) => {
      labelValues[label] = selected.fixed_labels[label]
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
    // validate if comment is at least 3 characters long
    if (formState?.comment?.length < 3) {
      addMessage({
        variant: "error",
        text: "Comment must be at least 3 characters long!",
      })
      return false
    }

    // All editable labels are valid regular expressions
    const isLabelsValid = selected.editable_labels.every((editable_label) => {
      const resolve = {}

      if (!validateLabelValue(editableLabelValues[editable_label])) {
        addMessage({
          variant: "error",
          text: `Value for ${editable_label} is not a valid regular expression`,
        })
        return false
      }

      if (
        !editableLabelValues[editable_label] ||
        editableLabelValues[editable_label] === ""
      ) {
        addMessage({
          variant: "error",
          text: `Value for ${editable_label} is empty`,
        })
        return false
      }

      return true
    })

    if (!isLabelsValid) {
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
                    }}
                  />
                ))}
              </Select>
            </FormRow>
            <FormRow>{selected && <Box>{selected?.description}</Box>}</FormRow>
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
                  <TextInput required label="Start" value={formState.startAt} />
                  <TextInput required label="End" value={formState.endAt} />
                </div>
              </FormRow>

              {Object.keys(selected.fixed_labels).length > 0 && (
                <FormRow>
                  <p>Fixed Labels are labels that are not editable.</p>
                </FormRow>
              )}

              {Object.keys(selected.fixed_labels).length > 0 && (
                <FormRow>
                  <div className="grid gap-2 grid-cols-3">
                    {Object.keys(selected.fixed_labels).map((label) => (
                      <Pill
                        pillKey={label}
                        pillKeyLabel={label}
                        pillValue={selected.fixed_labels[label]}
                        pillValueLabel={selected.fixed_labels[label]}
                      />
                    ))}
                  </div>
                </FormRow>
              )}
              {selected.editable_labels.length > 0 && (
                <FormRow>
                  <p>
                    Editable Labels are labels that are editable. You can use
                    regular expressions.
                  </p>
                </FormRow>
              )}

              {selected.editable_labels.length > 0 && (
                <FormRow>
                  <div className="grid gap-2 grid-cols-3">
                    {selected.editable_labels.map((editable_label) => (
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
  )
}

export default SilenceScheduled

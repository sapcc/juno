import React, { useEffect, useState } from "react"
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
  Stack,
  Pill,
  FormSection,
  DateTimePicker,
} from "juno-ui-components"
import { useAuthData, useGlobalsApiEndpoint } from "../../hooks/useAppStore"
import { post, get } from "../../api/client"
import { parseError } from "../../helpers"
import fakesilence from "./fakesilence.json"

const DEFAULT_FORM_VALUES = {
  fixed_labels: {},
  editable_labels: {},
  comment: {
    value: "",
    error: null,
  },
  createdBy: "",
  date: {
    start: null,
    end: null,
    error: null,
  },
}

const SilenceScheduled = (props) => {
  const authData = useAuthData()
  const { addMessage, resetMessages } = useActions()

  // set sucess of sending the silence
  const [success, setSuccess] = useState(null)

  // set the selected template
  const [selected, setSelected] = useState(null)

  // default time for DateTimePicker
  const date = new Date()
  const defaultDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`

  // Formular which will be used to create the silence
  const [formState, setFormState] = useState(DEFAULT_FORM_VALUES)

  // useEffect to init callback after rendering. This is needed to reopen the SilencedScheduledWrapper closing the modal
  const [closed, setClosed] = useState(false)
  useEffect(() => {
    if (closed) {
      props.callbackOnClose()
    }
  }, [closed])

  // submit
  const onSubmitForm = () => {
    // reset errors.
    resetMessages()

    setSuccess(null)

    if (!validateForm()) {
      return
    }

    const silence = {
      startAt: formState.date.start,
      endAt: formState.date.end,
      comment: formState.comment.value,
      createdBy: formState.createdBy,
      matchers: [],
    }

    for (const [key, value] of Object.entries(formState.editable_labels)) {
      silence.matchers.push({
        name: key,
        value: value.value,
        isRegex: true,
      })
    }

    for (const [key, value] of Object.entries(formState.fixed_labels)) {
      silence.matchers.push({
        name: key,
        value: value,
        isRegex: true,
      })
    }

    console.log("silence", silence)

    // submit silence
    // post(`${apiEndpoint}/silences`, {
    post(`localhost/silences`, {
      body: JSON.stringify(silence),
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

  //////
  ////// Form Validation

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

    console.log("aa", formState.date.start, formState.date.end)

    // checks if start date is before end date
    if (new Date(formState.date.start) >= new Date(formState.date.end)) {
      setFormState(
        produce((formState) => {
          formState.date.error = "The start date need to be before the end date"
        })
      )
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

    if (errorexist) {
      addMessage({
        variant: "error",
        text: parseError("Please fix the errors in the form"),
      })
    }

    if (!errorexist) {
      return true
    }

    return false
  }

  const validateLabelValue = (value) => {
    try {
      return !!new RegExp(value)
    } catch (e) {
      return false
    }
  }

  //////
  ////// OnClick

  const onChangeTemplate = (value) => {
    const newSelectedOption = fakesilence.find(
      (option) => option.title === value
    )

    const newFormState = {
      ...DEFAULT_FORM_VALUES,
      fixed_labels: newSelectedOption?.fixed_labels || {},
      createdBy: authData?.parsed?.fullName,
      editable_labels: newSelectedOption?.editable_labels?.reduce(
        (acc, label) => ({
          ...acc,
          [label]: {
            value: "",
            error: null,
          },
        }),
        {}
      ),
    }
    setFormState(newFormState)

    setSelected(newSelectedOption)
  }

  const onChangeLabelValue = (e) => {
    console.log("onChangeLabelValue")
    const editable_label = e.target.id
    setFormState(
      produce((formState) => {
        formState.editable_labels[editable_label].value = e.target.value
        formState.editable_labels[editable_label].error = null
      })
    )
  }

  const onChangeComment = (e) => {
    console.log("onChangeComment")
    setFormState(
      produce((formState) => {
        formState.comment.value = e.target.value
        formState.comment.error = null
      })
    )
  }

  const setStartDate = (e) => {
    console.log("ddssdf")
    setFormState(
      produce((formState) => {
        formState.date.start = e
        formState.date.error = null
      })
    )

    console.log("formState.date.start ", formState.date.start)
  }

  const setEndDate = (e) => {
    console.log("ddssdf", e)
    setFormState(
      produce((formState) => {
        formState.date.end = e
        formState.date.error = null
      })
    )

    console.log("formState.date.end ", formState.date.end)
  }

  return (
    <Modal
      title="Schedule new silence"
      size="large"
      open={true}
      confirmButtonLabel={success ? null : "Save"}
      onConfirm={success ? null : onSubmitForm}
      onCancel={() => setClosed(true)}
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
                onValueChange={(value) => {
                  onChangeTemplate(value)
                }}
              >
                {fakesilence?.map((option, index) => (
                  <SelectOption
                    key={index}
                    label={option.title}
                    value={option.title}
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
                    <DateTimePicker
                      dateFormat="Y-m-d H:i"
                      label="Select a start date"
                      enableTime
                      time_24hr
                      required
                      errortext={formState.date.error}
                      onChange={setStartDate}
                    />
                    <DateTimePicker
                      dateFormat="Y-m-d H:i"
                      label="Select a end date"
                      enableTime
                      time_24hr
                      required
                      errortext={formState.date.error}
                      onChange={setEndDate}
                    />
                  </div>
                </FormRow>

                <FormRow>
                  <Textarea
                    label="Comment"
                    value={formState.comment.value}
                    errortext={formState.comment.error}
                    onChange={onChangeComment}
                  ></Textarea>
                </FormRow>
              </FormSection>

              {formState?.editable_labels &&
                Object.keys(formState?.editable_labels).length > 0 && (
                  <FormSection>
                    <FormRow>
                      <p>
                        Editable Labels are labels that are editable. You can
                        use regular expressions.
                      </p>
                    </FormRow>

                    <FormRow>
                      <div className="grid gap-2 grid-cols-3">
                        {Object.keys(formState.editable_labels).map(
                          (editable_label, index) => (
                            <TextInput
                              required
                              label={editable_label}
                              key={index}
                              id={editable_label}
                              value={
                                formState?.editable_labels[editable_label].value
                              }
                              errortext={
                                formState?.editable_labels[editable_label]
                                  ?.error
                              }
                              onChange={onChangeLabelValue}
                            />
                          )
                        )}
                      </div>
                    </FormRow>
                  </FormSection>
                )}

              {Object.keys(formState?.fixed_labels).length > 0 && (
                <FormSection>
                  <FormRow>
                    <p>Fixed Labels are labels that are not editable.</p>
                  </FormRow>

                  <FormRow>
                    <Stack gap="2" wrap={true}>
                      {Object.keys(formState.fixed_labels).map(
                        (label, index) => (
                          <Pill
                            key={index}
                            pillKey={label}
                            pillKeyLabel={label}
                            pillValue={formState?.fixed_labels[label]}
                            pillValueLabel={formState?.fixed_labels[label]}
                          />
                        )
                      )}
                    </Stack>
                  </FormRow>
                </FormSection>
              )}
            </Form>
          )}
        </>
      )}
    </Modal>
  )
}

export default SilenceScheduled

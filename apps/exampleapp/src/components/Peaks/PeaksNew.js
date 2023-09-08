import React, { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  PanelBody,
  PanelFooter,
  Button,
  FormRow,
  TextInput,
} from "juno-ui-components"

const PeaksNew = ({ closeCallback }) => {
  const queryClient = useQueryClient()
  const [formState, setFormState] = useState({})

  const { isLoading, isError, error, data, isSuccess, mutate } = useMutation({
    mutationKey: ["peakAdd"],
  })

  const onSubmit = () => {
    // TODO form validation
    mutate(
      { formState: formState },
      {
        onSuccess: (data, variables, context) => {
          closeCallback()
          // refetch peaks
          queryClient.invalidateQueries("peaks")
        },
        onError: (error, variables, context) => {
          // TODO display error
        },
      }
    )
  }

  const onAttrChanged = (key, value) => {
    setFormState({ ...formState, [key]: value })
  }

  return (
    <PanelBody
      footer={
        <PanelFooter>
          <Button label="Cancel" variant="subdued" onClick={closeCallback} />
          <Button label="Save" variant="primary" onClick={onSubmit} />
        </PanelFooter>
      }
    >
      <FormRow>
        <TextInput
          label="Name"
          autoFocus
          onChange={(e) => onAttrChanged("name", e.target.value)}
        />
      </FormRow>
      <FormRow>
        <TextInput
          label="Height"
          onChange={(e) => onAttrChanged("height", e.target.value)}
        />
      </FormRow>
      <FormRow>
        <TextInput
          label="Main Range"
          onChange={(e) => onAttrChanged("range", e.target.value)}
        />
      </FormRow>
      <FormRow>
        <TextInput
          label="Region"
          onChange={(e) => onAttrChanged("region", e.target.value)}
        />
      </FormRow>
      <FormRow>
        <TextInput
          label="Country"
          onChange={(e) => onAttrChanged("country", e.target.value)}
        />
      </FormRow>
      <FormRow>
        <TextInput
          type="url"
          label="URL"
          onChange={(e) => onAttrChanged("url", e.target.value)}
        />
      </FormRow>
    </PanelBody>
  )
}

export default PeaksNew

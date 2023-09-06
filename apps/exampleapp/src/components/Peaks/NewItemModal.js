import React, { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Modal, FormRow, TextInput } from "juno-ui-components"
import { currentState, push } from "url-state-provider"
import { useGlobalsUrlStateKey } from "../StoreProvider"

const NewItemModal = () => {
  const urlStateKey = useStore((state) => state.urlStateKey)

  const queryClient = useQueryClient()
  const [formState, setFormState] = useState({})

  const { isLoading, isError, error, data, isSuccess, mutate } = useMutation({
    mutationKey: ["peakAdd"],
  })

  const closeNewItemModal = () => {
    const urlState = currentState(urlStateKey)
    push(urlStateKey, { ...urlState, currentModal: "" })
  }

  const onSubmit = () => {
    // TODO form validation
    mutate(
      { formState: formState },
      {
        onSuccess: (data, variables, context) => {
          closeNewItemModal()
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
    <Modal
      title="Add a New Peak"
      open
      onCancel={closeNewItemModal}
      confirmButtonLabel="Save New Peak"
      onConfirm={onSubmit}
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
    </Modal>
  )
}

export default NewItemModal

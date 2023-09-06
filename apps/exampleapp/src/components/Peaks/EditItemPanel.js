import React, { useState, useEffect } from "react"
import {
  Button,
  Form,
  PanelBody,
  PanelFooter,
  FormRow,
  TextInput,
} from "juno-ui-components"
import { currentState, push } from "url-state-provider"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useGlobalsUrlStateKey } from "../StoreProvider"

const EditItemPanel = ({ closeCallback }) => {
  const urlStateKey = useGlobalsUrlStateKey()
  const urlState = currentState(urlStateKey)
  const queryClient = useQueryClient()
  const [formState, setFormState] = useState({})

  const peakFeach = useQuery({
    queryKey: [`peaks`, urlState.peakId],
  })

  const peakMutation = useMutation({
    mutationKey: ["peakEdit"],
  })

  useEffect(() => {
    if (peakFeach.isSuccess) {
      setFormState(peakFeach.data)
    }
  }, [peakFeach.isSuccess])

  const onSubmit = () => {
    // TODO form validation
    peakMutation.mutate(
      {
        id: urlState.peakId,
        formState: formState,
      },
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
      <Form>
        <FormRow>
          <TextInput
            label="Name"
            value={formState?.name}
            onChange={(e) => onAttrChanged("name", e.target.value)}
          />
        </FormRow>
        <FormRow>
          <TextInput
            label="Height"
            value={formState?.height}
            onChange={(e) => onAttrChanged("height", e.target.value)}
          />
        </FormRow>
        <FormRow>
          <TextInput
            label="Main Range"
            value={formState?.mainrange}
            onChange={(e) => onAttrChanged("mainrange", e.target.value)}
          />
        </FormRow>
        <FormRow>
          <TextInput
            label="Region"
            value={formState?.region}
            onChange={(e) => onAttrChanged("region", e.target.value)}
          />
        </FormRow>
        <FormRow>
          <TextInput
            label="Country"
            value={formState?.countries}
            onChange={(e) => onAttrChanged("countries", e.target.value)}
          />
        </FormRow>
      </Form>
    </PanelBody>
  )
}

export default EditItemPanel

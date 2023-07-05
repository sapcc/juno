import React, { useState, useEffect } from "react"
import {
  Button,
  Form,
  PanelBody,
  PanelFooter,
  FormRow,
  TextInput,
} from "juno-ui-components"
import useStore from "../store"
import { currentState, push } from "url-state-provider"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchPeak, updatePeak } from "../actions"

const EditItemPanel = ({ closeCallback }) => {
  const urlStateKey = useStore((state) => state.urlStateKey)
  const endpoint = useStore((state) => state.endpoint)
  const urlState = currentState(urlStateKey)
  const queryClient = useQueryClient()
  const [formState, setFormState] = useState({})

  const peakFeach = useQuery({
    queryKey: ["peaks", endpoint, urlState.peakId],
    queryFn: fetchPeak,
    // refer to this documentation to see more options
    // https://tanstack.com/query/v4/docs/guides/queries
  })

  const peakMutation = useMutation({
    mutationFn: ({ endpoint, id, formState }) =>
      updatePeak(endpoint, id, formState),
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
        endpoint: endpoint,
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

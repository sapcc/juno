import React, { useRef } from "react"
import { DataListRow, DataListCell } from "juno-ui-components"
import InlineConfirmRemove from "./InlineConfirmRemove"
import { revokeCertificateMutation } from "../queries"
import { useGlobalState } from "./StateProvider"
import { useMessagesDispatch } from "./MessagesProvider"
import { useQueryClient } from "react-query"
import { parseError } from "../helpers"

const serial = `
bg-theme-background-lvl-7
px-3
py-1
rounded
h-min
`

const CertificateListItem = ({ item }) => {
  const auth = useGlobalState().auth
  const dispatchMessage = useMessagesDispatch()
  const queryClient = useQueryClient()
  const removeRef = useRef()
  // useMutation can't create a subscription like for useQuery. State can't be shared
  // https://github.com/tannerlinsley/react-query/issues/2304
  const { isLoading, isError, error, data, isSuccess, mutate } =
    revokeCertificateMutation()

  const expiresAtString = React.useMemo(() => {
    if (!item.not_after) return ""
    const date = new Date(item.not_after)
    return date.toLocaleString()
  }, [item?.not_after])

  const onRemoveConfirmed = () => {
    mutate(
      {
        bearerToken: auth.attr?.id_token,
        serial: item.serial,
      },
      {
        onSuccess: (data, variables, context) => {
          dispatchMessage({
            type: "SET_MESSAGE",
            msg: {
              variant: "success",
              text: (
                <span>
                  Successfully revoked cert with serial <b>{item.serial}</b>
                </span>
              ),
            },
          })
          // refetch cert list
          queryClient.invalidateQueries("certificates")
        },
        onError: (error, variables, context) => {
          dispatchMessage({
            type: "SET_MESSAGE",
            msg: {
              variant: "error",
              text: parseError(error),
            },
          })
          removeRef.current.reset()
        },
      }
    )
  }

  return (
    <DataListRow>
      <DataListCell width={20}>{item.name}</DataListCell>
      <DataListCell width={40}>
        <div className={serial}>{item.serial}</div>
      </DataListCell>
      <DataListCell width={15}>{item.identity}</DataListCell>
      <DataListCell width={15}>{expiresAtString}</DataListCell>
      <DataListCell width={10}>
        <InlineConfirmRemove
          ref={removeRef}
          onRemoveConfirmed={onRemoveConfirmed}
        />
      </DataListCell>
    </DataListRow>
  )
}

export default CertificateListItem

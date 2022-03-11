import React, { useState, useMemo } from "react"
import { DataListRow, DataListCell, Icon } from "juno-ui-components"
import InlineConfirmRemove from "./InlineConfirmRemove"
import { revokeCertificateMutation } from "../queries"
import { useGlobalState } from "./StateProvider"
import { useMessagesDispatch } from "./MessagesProvider"
import { useQueryClient } from "react-query"
import { parseError, isExpired } from "../helpers"
import Badge from "./Badge"

const serial = `
bg-theme-background-lvl-7
px-2
rounded
h-min
`

const rowClasses = (isConfirmOpen) => {
  return `
			${
        isConfirmOpen &&
        `border 
         border-theme-danger 
         text-theme-danger
         transition
         ease-out
         duration-300`
      }
		`
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
}

const CertificateListItem = ({ item }) => {
  const auth = useGlobalState().auth
  const dispatchMessage = useMessagesDispatch()
  const queryClient = useQueryClient()
  const [showConfirm, setShowConfirm] = useState(false)

  // useMutation can't create a subscription like for useQuery. State can't be shared
  // https://github.com/tannerlinsley/react-query/issues/2304
  const { isLoading, isError, error, data, isSuccess, mutate } =
    revokeCertificateMutation()

  const expiresAtString = React.useMemo(() => {
    if (!item.not_after) return ""
    const date = new Date(item.not_after)
    return date.toLocaleString()
  }, [item?.not_after])

  const stateBadge = React.useMemo(() => {
    const date = new Date(item.not_after)
    if (isExpired(date)) {
      return <Badge variant="danger" text="Expired" />
    }
    return <Badge text="Active" />
  }, [item?.not_after])

  const onRemoveConfirmed = () => {
    setShowConfirm(false)
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
        },
      }
    )
  }

  const onRemoveClicked = () => {
    setShowConfirm(true)
  }

  const onRemoveCancel = () => {
    setShowConfirm(false)
  }

  const inlineConfirmText = useMemo(() => {
    let name = item?.name
    if (!name || name.length === 0) name = "this"
    return (
      <span>
        Are you sure you want to revoke <b>{name}</b> cert?
      </span>
    )
  }, [item?.name])

  return (
    <DataListRow className={`relative ${rowClasses(showConfirm)}`}>
      <InlineConfirmRemove
        text={inlineConfirmText}
        actionText="Revoke"
        actionIcon="deleteForever"
        show={showConfirm}
        onConfirm={onRemoveConfirmed}
        onCancel={onRemoveCancel}
      />
      <DataListCell width={15}>{item.name}</DataListCell>
      <DataListCell width={40}>
        <div className={serial}>{item.serial}</div>
      </DataListCell>
      <DataListCell width={13}>{item.identity}</DataListCell>
      <DataListCell width={13}>{stateBadge}</DataListCell>
      <DataListCell width={15}>{expiresAtString}</DataListCell>
      <DataListCell width={4}>
        <Icon
          disabled={showConfirm}
          icon="deleteForever"
          onClick={onRemoveClicked}
        />
      </DataListCell>
    </DataListRow>
  )
}

export default CertificateListItem

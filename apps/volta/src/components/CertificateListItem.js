import React, { useState, useMemo } from "react"
import { DataGridRow, DataGridCell, Icon, Badge } from "juno-ui-components"
import InlineConfirmRemove from "./InlineConfirmRemove"
import { revokeCertificateMutation } from "../queries"
import { useGlobalState } from "./StateProvider"
import { useMessagesDispatch } from "./MessagesProvider"
import { useQueryClient } from "react-query"
import { parseError } from "../helpers"
import { DateTime } from "luxon"

// if remove row shows
// - remove cell bottom border so the 2 cells belongs together
// - change the background color so it is easier to difference from the other rows
// - text text color to red
const cellClasses = (isConfirmOpen) => {
  return `
			${
        isConfirmOpen &&
        `border-b-0 
         bg-theme-background-lvl-2
         text-theme-danger
         transition
         ease-out
         duration-300`
      }
		`
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
}

const certIdClasses = (isConfirmOpen) => {
  return `
      text-sm 
      pt-1
      whitespace-nowrap
			${isConfirmOpen ? `text-theme-danger` : `text-theme-disabled`}
		`
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
}

const expirationDateClasses = `
whitespace-nowrap
`

const CertificateListItem = ({ item, ca }) => {
  const auth = useGlobalState().auth
  const endpoint = useGlobalState().globals.endpoint
  const dispatchMessage = useMessagesDispatch()
  const queryClient = useQueryClient()
  const [showConfirm, setShowConfirm] = useState(false)

  // useMutation can't create a subscription like for useQuery. State can't be shared
  // https://github.com/tannerlinsley/react-query/issues/2304
  const { isLoading, isError, error, data, isSuccess, mutate } =
    revokeCertificateMutation()

  const expiresAtString = React.useMemo(() => {
    if (!item.not_after) return "No date available"
    return DateTime.fromISO(item.not_after).toLocaleString(
      DateTime.DATETIME_FULL
    )
  }, [item?.not_after])

  const isCertAvtive = React.useMemo(() => {
    return item?.status?.toLowerCase() === "active"
  }, [item?.status])

  const stateBadge = React.useMemo(() => {
    // Active, Expired, Pending, Revoked
    switch (item.status) {
      case "Active":
        return <Badge variant="success" text={item.status} />
      case "Expired":
        return <Badge variant="danger" text={item.status} />
      case "Pending":
        return <Badge variant="warning" text={item.status} />
      case "Revoked":
        return <Badge text={item.status} />
      default:
        return <Badge text={item.status} />
    }
  }, [item?.status])

  const onRemoveConfirmed = () => {
    setShowConfirm(false)
    mutate(
      {
        endpoint: endpoint,
        ca: ca.name,
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
    <>
      <DataGridRow>
        <DataGridCell className={cellClasses(showConfirm)}>
          <span>{item.name}</span>
          <div className={certIdClasses(showConfirm)}>{item.serial}</div>
        </DataGridCell>
        <DataGridCell className={cellClasses(showConfirm)}>
          {item.description}
        </DataGridCell>
        <DataGridCell className={cellClasses(showConfirm)}>
          {item.identity}
        </DataGridCell>
        <DataGridCell className={cellClasses(showConfirm)}>
          {stateBadge}
        </DataGridCell>
        <DataGridCell className={cellClasses(showConfirm)}>
          <span className={expirationDateClasses}>{expiresAtString}</span>
        </DataGridCell>
        <DataGridCell className={cellClasses(showConfirm)}>
          {isCertAvtive && (
            <Icon
              disabled={showConfirm}
              icon="deleteForever"
              onClick={() => setShowConfirm(true)}
            />
          )}
        </DataGridCell>
      </DataGridRow>

      <InlineConfirmRemove
        text={inlineConfirmText}
        actionText="Revoke"
        actionIcon="deleteForever"
        show={showConfirm}
        onConfirm={onRemoveConfirmed}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  )
}

export default CertificateListItem

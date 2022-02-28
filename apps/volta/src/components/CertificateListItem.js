import React from "react"
import { DataListRow, DataListCell, ClickableIcon } from "juno-ui-components"

const serial = `
bg-theme-background-lvl-7
px-3
py-1
rounded
`

const CertificateListItem = ({ item, revoke }) => {
  const expiresAtString = React.useMemo(() => {
    if (!item.not_after) return ""
    const date = new Date(item.not_after)
    return date.toLocaleString()
  }, [item?.not_after])

  const onRevokeClicked = () => {
    console.log("onRevokeClicked")
  }

  return (
    <DataListRow>
      <DataListCell width={15}>{item.description}</DataListCell>
      <DataListCell width={40}>
        <div className={serial}>{item.serial}</div>
      </DataListCell>
      <DataListCell width={15}>{item.common_name}</DataListCell>
      <DataListCell width={20}>{expiresAtString}</DataListCell>
      <DataListCell width={10}>
        <ClickableIcon icon="deleteForever" onClick={onRevokeClicked} />
      </DataListCell>
    </DataListRow>
  )
}

export default CertificateListItem

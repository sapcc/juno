import React from "react"
import { DataListRow, DataListCell, Icon } from "juno-ui-components"

const clickableIcon = ``

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
      <DataListCell width={40}>{item.serial}</DataListCell>
      <DataListCell width={15}>{item.common_name}</DataListCell>
      <DataListCell width={20}>{expiresAtString}</DataListCell>
      <DataListCell width={10}>
        <Icon color="global-text" icon="dangerous" onClick={onRevokeClicked} />
      </DataListCell>
    </DataListRow>
  )
}

export default CertificateListItem

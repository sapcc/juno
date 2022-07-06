import React from "react"
import { ContentAreaToolbar, SearchInput } from "juno-ui-components"

const ListToolBar = ({ disabled }) => {
  return (
    <ContentAreaToolbar>
      <SearchInput
        disabled={disabled}
        onChange={function noRefCheck() {}}
        onClick={function noRefCheck() {}}
        onKeyPress={function noRefCheck() {}}
        onSearch={function noRefCheck() {}}
      />
    </ContentAreaToolbar>
  )
}

export default ListToolBar

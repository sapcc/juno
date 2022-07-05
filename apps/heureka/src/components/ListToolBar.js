import React from "react"
import { ContentAreaToolbar, SearchInput } from "juno-ui-components"

const ListToolBar = () => {
  return (
    <ContentAreaToolbar>
      <SearchInput
        onChange={function noRefCheck() {}}
        onClick={function noRefCheck() {}}
        onKeyPress={function noRefCheck() {}}
        onSearch={function noRefCheck() {}}
      />
    </ContentAreaToolbar>
  )
}

export default ListToolBar

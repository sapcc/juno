import React from "react"
import { SearchInput } from "juno-ui-components"

const ToolbarStyles = `
h-15
bg-theme-background-lvl-2
mb-0.5
p-4
`

const ListToolBar = ({ disabled }) => {
  return (
    <div className={ToolbarStyles}>
      <SearchInput
        onChange={function noRefCheck() {}}
        onClick={function noRefCheck() {}}
        onKeyPress={function noRefCheck() {}}
        onSearch={function noRefCheck() {}}
      />
    </div>
  )
}

export default ListToolBar

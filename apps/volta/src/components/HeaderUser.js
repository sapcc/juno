import React, { useState, useEffect } from "react"
import { Stack, Button } from "juno-ui-components"

const headerUserName = `
mr-4
`

const HeaderUser = ({ name, logout }) => {
  return (
    <Stack alignment="center" className="w-full" distribution="end">
      <div className={headerUserName}>{name}</div>

      <Button
        label="Logout"
        size="small"
        onClick={() => logout({ resetOIDCSession: true })}
      />
    </Stack>
  )
}

export default HeaderUser

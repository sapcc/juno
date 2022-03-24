import React from "react"
import { Stack, Button } from "juno-ui-components"

const HeaderUser = ({ name, logout }) => {
  return (
    <Stack alignment="center" className="ml-auto" distribution="end">
      <div className="mr-4">{name}</div>

      <Button
        label="Logout"
        size="small"
        onClick={() => logout({ resetOIDCSession: false, silent: true })}
      />
    </Stack>
  )
}

export default HeaderUser

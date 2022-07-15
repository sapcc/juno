import React from "react"
import { Stack } from "juno-ui-components"

const avatarCss = `
h-8
w-8
bg-theme-background-lvl-2
rounded-full
mr-2
bg-cover 
`

const Avatar = ({ user }) => {
  return (
    <Stack alignment="center">
      <div
        style={{
          background: `url(https://avatars.wdf.sap.corp/avatar/${user.SapID}?size=24x24) no-repeat`,
          backgroundSize: `cover`,
        }}
        className={avatarCss}
      />
      <span>{user.Name}</span>
    </Stack>
  )
}

export default Avatar

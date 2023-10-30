import React from "react"
import { Stack } from "juno-ui-components"

const avatarCss = `
h-8
w-8
bg-theme-background-lvl-2
rounded-full
bg-cover 
`

const Avatar = ({ userName, url }) => {
  return (
    <Stack alignment="center">
      <div
        style={{
          background: `url(${url}) no-repeat`,
          backgroundSize: `cover`,
        }}
        className={avatarCss}
      />
      {userName && <span className="ml-2">{userName}</span>}
    </Stack>
  )
}

export default Avatar

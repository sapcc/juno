import React from "react"
import { Button } from "./shared/StyledComponents"
import { send, on } from "communicator"

const UserProfile = () => {
  const [token, setToken] = React.useState()

  React.useEffect(() => {
    return on("AUTH_UPDATE_TOKEN", ({ token, authToken }) => {
      setToken(token)
    })
  }, [])

  const logout = React.useCallback(() => {
    send("AUTH_REVOKE_TOKEN")
  }, [])

  const login = React.useCallback(() => {
    send("AUTH_GET_TOKEN", {
      receiveResponse: ({ authToken, token }) => {
        setToken(token)
      },
    })
  }, [])

  if (token)
    return (
      <span>
        User: {token.user.name}{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            logout()
          }}
        >
          logout
        </a>
      </span>
    )

  return (
    <Button
      type="large"
      onClick={(e) => {
        e.preventDefault()
        login()
      }}
    >
      Login
    </Button>
  )
}

export default UserProfile

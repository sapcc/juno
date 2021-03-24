import React from "react"
import { Button } from "components/shared/StyledComponents"

const UserProfile = () => {
  const [token, setToken] = React.useState()

  React.useEffect(() => {
    const handleTokenUpdate = (e) => {
      if (e.detail && e.detail.token) {
        setToken(e.detail.token)
      }
    }

    window.addEventListener("AUTH_UPDATE_TOKEN", handleTokenUpdate)
    return () =>
      window.removeEventListener("AUTH_UPDATE_TOKEN", handleTokenUpdate)
  })

  if (token)
    return (
      <span>
        User: {token.user.name}{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            setToken(null)
          }}
        >
          logout
        </a>
      </span>
    )

  return (
    <Button
      type="large"
      onClick={() => {
        var event = new CustomEvent("AUTH_GET_TOKEN", {
          detail: {
            receiveResponse: (authToken, token) => {
              console.log(token)
              setToken(token)
            },
          },
        })
        window.dispatchEvent(event)
      }}
    >
      Login
    </Button>
  )
}

export default UserProfile

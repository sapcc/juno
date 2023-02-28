import React from "react"
import { Button, Spinner } from "juno-ui-components"
import useStore from "../hooks/useStore"
import useAppLoader from "../hooks/useAppLoader"

const Auth = ({ children }) => {
  const auth = useStore((state) => state.auth)
  const ref = React.createRef()
  const { mount } = useAppLoader()
  const config = useStore((state) => state.apps.config)

  React.useEffect(() => {
    if (!mount || !ref.current || !config["auth"]) return
    mount(ref.current, config["auth"])
  }, [mount, ref.current, config["auth"]])

  return (
    <>
      <div data-name="greenhouse-auth" ref={ref} />
      {auth?.appLoaded ? (
        auth?.isProcessing ? (
          <>
            <Spinner /> Signing on...
          </>
        ) : auth?.error ? (
          error
        ) : auth?.loggedIn ? (
          children
        ) : (
          <>
            You are not logged in!{" "}
            <Button onClick={() => auth?.login()}>Login</Button>
          </>
        )
      ) : (
        "Authentication required"
      )}
    </>
  )
}

export default Auth

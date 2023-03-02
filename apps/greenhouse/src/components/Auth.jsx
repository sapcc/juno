import React from "react"
import { Button, LoadingIndicator, Spinner } from "juno-ui-components"
import useStore from "../hooks/useStore"
import useAppLoader from "../hooks/useAppLoader"

const Loading = () => {
  const [Component, setComponent] = React.useState(Spinner)
  React.useEffect(() => {
    const timer = setTimeout(() => setComponent(LoadingIndicator), 5000) // switch Loading indicator when loading longer than 5 Seconds
  })

  return <Component />
}

const Auth = ({ children }) => {
  const auth = useStore((state) => state.auth)
  const ref = React.createRef()
  const { mount } = useAppLoader()
  const config = useStore((state) => state.apps.config)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (!mount || !ref.current || !config["auth"]) return
    mount(ref.current, config["auth"])
  }, [mount, ref.current, config["auth"]])

  React.useEffect(() => {
    setLoading(auth?.appLoaded && auth?.isProcessing)

    let timer
    if (!auth?.appLoaded) {
      timer = setTimeout(() => {
        if (!auth?.appLoaded) setLoading(false)
      }, 30000) // 30 seconds
    }

    return () => timer && clearTimeout(timer)
  }, [auth?.isProcessing, auth?.appLoaded])

  const statusMessage = React.useMemo(
    () =>
      auth?.error
        ? JSON.stringify(auth.error)
        : auth?.isProcessing
        ? "Signing on..."
        : loading
        ? "Loading"
        : !auth?.appLoaded
        ? "Authentication required"
        : null,
    [auth?.error, auth?.isProcessing, auth?.appLoaded, loading]
  )

  return (
    <>
      <div data-name="greenhouse-auth" ref={ref} />

      {auth?.loggedIn ? (
        children
      ) : (
        <div className="grid h-screen place-items-center">
          <div>
            {loading ? (
              <>
                {/* <LoadingIndicator color="jn-text-theme-info" /> {statusMessage} */}
                <Spinner className="mx-6 mb-3" />
                {/* <Loading /> */}
                {statusMessage}
              </>
            ) : (
              auth?.appLoaded && (
                <>
                  You are not logged in!{" "}
                  <Button onClick={() => auth?.login()}>Login</Button>
                </>
              )
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Auth

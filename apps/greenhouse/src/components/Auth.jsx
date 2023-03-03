import React from "react"
import { Button, LoadingIndicator, Spinner } from "juno-ui-components"
import useStore from "../hooks/useStore"
import useAppLoader from "../hooks/useAppLoader"
import { Transition } from "@tailwindui/react"

const Auth = ({ children }) => {
  const auth = useStore((state) => state.auth)
  const ref = React.createRef()
  const { mount } = useAppLoader()
  const config = useStore((state) => state.apps.config)
  const [loading, setLoading] = React.useState(false)
  const [longLoading, setLongLoading] = React.useState(false)

  React.useEffect(() => {
    if (!mount || !ref.current || !config["auth"]) return
    mount(ref.current, config["auth"])
  }, [mount, ref.current, config["auth"]])

  // timeout for waiting for auth
  React.useEffect(() => {
    setLoading(!auth?.appLoaded)

    // set timeout for waiting for auth app
    let loadingTimer
    if (!auth?.appLoaded) {
      loadingTimer = setTimeout(() => {
        if (!auth?.appLoaded) setLoading(false)
      }, 30000) // 30 seconds
    }

    return () => loadingTimer && clearTimeout(loadingTimer)
  }, [auth?.appLoaded])

  // set long loading
  React.useEffect(() => {
    let longLoadingTimer = setTimeout(() => setLongLoading(true), 5000) // long loading if longer than 5 seconds
    return () => longLoadingTimer && clearTimeout(longLoadingTimer)
  }, [])

  return (
    <>
      <div data-name="greenhouse-auth" ref={ref} />

      <Transition
        show={auth?.loggedIn}
        enter="transition-opacity duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {children}
      </Transition>

      {!auth?.loggedIn && (
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">
            {auth?.error && JSON.stringify(error)}

            {loading || auth?.isProcessing ? (
              <>
                {longLoading ? (
                  <LoadingIndicator className="jn-text-theme-info" />
                ) : (
                  <Spinner
                    className="mx-6 mb-3"
                    variant="primary"
                    size="1.5rem"
                  />
                )}

                {loading ? "Loading..." : "Signing on..."}
              </>
            ) : (
              <>
                Authentication required. <br />
                {auth?.appLoaded ? (
                  <Button onClick={() => auth?.login()} className="mt-3 w-full">
                    Sign in
                  </Button>
                ) : (
                  "Looks like the auth app is missing!"
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Auth

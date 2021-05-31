import React from "react"
import {
  Button,
  FloatingLabelInput,
  // FloatingLabelSelect,
  Spinner,
} from "juno-ui-components"

import { loginWithSSO, loginWithPassword } from "./actions"

export const LoginDialog = ({
  onLogin,
  Body,
  Buttons,
  close,
  endpoint,
  domain,
  project,
  projectID,
  sso,
}) => {
  const [error, setError] = React.useState(null)
  const [submitting, setSubmitting] = React.useState(false)
  const [useSSO, setUseSSO] = React.useState(sso && domain && endpoint && true)

  const [values, setValues] = React.useState({
    domain: domain || "monsoon3",
  })

  const onChange = React.useCallback((name, value) => {
    setValues((oldValues) => ({ ...oldValues, [name]: value }))
  }, [])

  const submit = React.useCallback(() => {
    setSubmitting(true)
    setError(null)
    const { domain, user, password } = values
    loginWithPassword({
      endpoint,
      domain,
      user,
      password,
      projectID,
      project,
    })
      .then(([authToken, payload]) => {
        onLogin({ authToken, token: payload.token })
      })
      .catch((error) => {
        const message =
          error.statusCode === 401
            ? "user id or password invalid!"
            : error.message
        setError(`${error.statusCode}: ${message}`)
        console.warn(error)
      })
      .finally(() => setSubmitting(false))
  }, [endpoint, project, projectID, values])

  const valid = React.useMemo(
    () => values.domain && values.user && values.password,
    [values]
  )

  React.useEffect(() => {
    if (!useSSO) return
    loginWithSSO({
      endpoint,
      domain,
      project,
      projectID,
    })
      .then(([authToken, payload]) =>
        onLogin({ authToken, token: payload.token })
      )
      .catch((error) => {
        const message =
          error.statusCode === 401
            ? "Could not authenticate using SSO certificate!"
            : error.message
        setError(`${error.statusCode}: ${message}`)
        console.warn(error)
        setUseSSO(false)
      })
  }, [useSSO, endpoint, domain, project, projectID])

  if (useSSO)
    return (
      <>
        <Body>
          <Spinner />
          <span className="text-gray-700">Login using SSO certificate...</span>
        </Body>
        <Buttons>
          <Button
            onClick={(e) => {
              e.preventDefault()
              close()
            }}
          >
            Cancel
          </Button>
        </Buttons>
      </>
    )

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
      >
        <Body>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3">
              {error}
            </div>
          )}
          <div className="space-y-3">
            <FloatingLabelInput
              label="Domain"
              value={values.domain}
              onChange={(e) => onChange("domain", e.target.value)}
            />

            <FloatingLabelInput
              label="D/C/I Number"
              value={values.user}
              onChange={(e) => onChange("user", e.target.value)}
            />
            <FloatingLabelInput
              type="password"
              label="Password"
              value={values.password}
              onChange={(e) => onChange("password", e.target.value)}
            />
          </div>
        </Body>
        <Buttons>
          <div className="space-x-3">
            <Button type="submit" disabled={!valid} variant="primary">
              {submitting && <Spinner />}
              Login
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault()
                close()
              }}
            >
              Cancel
            </Button>
          </div>
        </Buttons>
      </form>
    </>
  )
}

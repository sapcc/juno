import React from "react"
import "twin.macro"

import {
  Button,
  FloatingLabelInput,
  FloatingLabelSelect,
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
  sso,
}) => {
  const useSSO = React.useMemo(() => sso && domain && endpoint && true, [
    sso,
    domain,
    endpoint,
  ])
  const [error, setError] = React.useState(null)
  const [submitting, setSubmitting] = React.useState(false)

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
    loginWithPassword({ endpoint, domain, user, password })
      .then(([authToken, payload]) => {
        onLogin({ authToken, token: payload.token })
      })
      .catch((error) => {
        const message =
          error.statusCode === 401
            ? "user id or password invalid!"
            : error.message
        setError(`${error.statusCode}: ${message}`)
      })
      .finally(() => setSubmitting(false))
  }, [endpoint, values])

  const valid = React.useMemo(
    () => values.domain && values.user && values.password,
    [values]
  )

  React.useEffect(() => {
    if (!useSSO) return
    loginWithSSO({
      endpoint,
      domain,
    })
      .then(([authToken, payload]) =>
        onLogin({ authToken, token: payload.token })
      )
      .catch((error) => {
        setError(error.message)
      })
  }, [useSSO, endpoint, domain])

  if (useSSO)
    return (
      <>
        <Body>
          <Spinner />
          <span tw="text-gray-700">Login using SSO certificate...</span>
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
            <div tw="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3">
              {error}
            </div>
          )}
          <div tw="space-y-3">
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
          <Button type="submit" disabled={!valid} mode="primary">
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
        </Buttons>
      </form>
    </>
  )
}

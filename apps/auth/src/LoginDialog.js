import React from "react"
import "twin.macro"

import {
  Button,
  FloatingLabelInput,
  FloatingLabelSelect,
  Spinner,
} from "juno-ui-components"

import { loginWithSSO, loginWithPassword } from "./actions"

const REGIONS = ["qa-de-1", "eu-nl-1", "eu-de-1"]
export const LoginDialog = ({
  onLogin,
  Body,
  Buttons,
  close,
  region,
  domain,
  sso,
}) => {
  const useSSO = React.useMemo(() => sso && domain && region && true, [
    sso,
    domain,
    region,
  ])
  const [error, setError] = React.useState(null)
  const [submitting, setSubmitting] = React.useState(false)

  const [values, setValues] = React.useState({
    region: REGIONS.indexOf(region) >= 0 ? region : REGIONS[0],
    domain: domain || "monsoon3",
  })

  const onChange = React.useCallback((name, value) => {
    setValues((oldValues) => ({ ...oldValues, [name]: value }))
  }, [])

  const submit = React.useCallback(() => {
    setSubmitting(true)
    setError(null)
    const { region, domain, user, password } = values
    loginWithPassword({ region, domain, user, password })
      .then(([authToken, payload]) => {
        onLogin({ authToken, token: payload.token })
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => setSubmitting(false))
  }, [values])

  const valid = React.useMemo(
    () => values.region && values.domain && values.user && values.password,
    [values]
  )

  React.useEffect(() => {
    if (!useSSO) return
    loginWithSSO({
      region: region,
      domain: domain,
    })
      .then(([authToken, payload]) =>
        onLogin({ authToken, token: payload.token })
      )
      .catch((error) => {
        setError(error.message)
      })
  }, [useSSO])

  if (useSSO)
    return (
      <>
        <Body>
          <Spinner />
          Login using SSO certificate...
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
            <FloatingLabelSelect
              label="Region"
              onChange={(e) => onChange("region", e.target.value)}
              value={values.region || ""}
            >
              {REGIONS.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </FloatingLabelSelect>

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

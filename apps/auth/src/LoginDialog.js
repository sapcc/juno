import React from "react"
import "twin.macro"

import {
  Button,
  FloatingLabelInput,
  FloatingLabelSelect,
  Spinner,
} from "juno-ui-components"

import { loginWithPassword } from "./actions"

export const LoginDialog = ({ onLogin, Body, Buttons, close }) => {
  const regions = React.useMemo(() => ["qa-de-1", "eu-nl-1"], [])
  const [error, setError] = React.useState(null)
  const [submitting, setSubmitting] = React.useState(false)
  const [values, setValues] = React.useState({ region: regions[0] })

  const onChange = React.useCallback((name, value) => {
    setValues((oldValues) => ({ ...oldValues, [name]: value }))
  }, [])

  const submit = React.useCallback(() => {
    setSubmitting(true)
    setError(null)
    const { region, domain, user, password } = values
    loginWithPassword({ region, domain, user, password })
      .then(([authToken, payload]) => {
        onLogin(authToken, payload.token)
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

  return (
    <>
      <Body>
        {error && (
          <div tw="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3">
            {error}
          </div>
        )}
        <form tw="space-y-3">
          <FloatingLabelSelect
            label="Region"
            onChange={(e) => onChange("region", e.target.value)}
            value={values.region || ""}
          >
            {regions.map((r, i) => (
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
        </form>
      </Body>
      <Buttons>
        <Button
          disabled={!valid}
          mode="primary"
          onClick={(e) => {
            e.preventDefault()
            submit()
          }}
        >
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
    </>
  )
}

import React, { useEffect, useMemo, useState } from "react"
import { Form, Stack, TextInputRow, Icon, Button } from "juno-ui-components"

// bg-theme-background-lvl-2
const formAreaCss = (show) => {
  return `      
      opacity-0
      h-0
      transition
      ease-out
      duration-300
      mb-0
			${show && `opacity-100 h-fit`}
		`
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
}

const PreviewAppPropsForm = ({ asset, onAppPropsChange }) => {
  const [formState, setFormState] = useState({})
  const [show, setShow] = useState(false)

  useEffect(() => {
    // reset state on asset change
    setFormState({})
    setShow(false)
  }, [asset])

  const appProps = useMemo(() => {
    return asset?.appProps || {}
  }, [asset])

  const onShowClick = () => {
    setShow(!show)
  }

  // on enter key submit the form
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onAppPropsChange(formState)
    }
  }

  const onInputChanged = (key, value) => {
    setFormState({ ...formState, [key]: value })
  }

  return (
    <div className="py-4">
      <Stack className="mb-4" alignment="center" distribution="end">
        <div className="cursor-pointer" onClick={onShowClick}>
          <Stack alignment="center">
            <Icon
              color="jn-global-text"
              icon={show ? "expandLess" : "expandMore"}
            />
            Set configuration
          </Stack>
        </div>
      </Stack>

      <Form className={formAreaCss(show)}>
        {Object.keys(appProps).map((key) => (
          <TextInputRow
            key={key}
            id={key}
            label={key}
            required={appProps[key]?.type === "required"}
            helptext={`${appProps[key]?.description}`}
            onChange={(e) => onInputChanged(key, e?.target?.value)}
            onKeyDown={handleKeyDown}
          />
        ))}
        <Stack className="mb-4" alignment="center" distribution="end">
          <Button
            label="Apply"
            onClick={() => onAppPropsChange(formState)}
            variant="primary"
          />
        </Stack>
      </Form>
    </div>
  )
}

export default PreviewAppPropsForm

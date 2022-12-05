import React, { useMemo, useState, useRef, useEffect } from "react"
import {
  SelectRow,
  SelectOption,
  TextInputRow,
  DataGrid,
  DataGridRow,
  DataGridCell,
} from "juno-ui-components"

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      // if (!ref.current || ref.current.contains(event.target)) {
      //   return
      // }

      console.log("ref: ", ref.current, event)

      handler(event)
    }
    window.addEventListener("click", listener)
    return () => {
      window.removeEventListener("click", listener)
    }
  }, [ref, handler])
}

const optionsContainer = (isOpen) => {
  return `
    max-h-64
    overflow-y-scroll
    outline-none
    ring-2
    ring-theme-focus
    opacity-0
    transition
    ease-out
    duration-300
			${isOpen && `opacity-100`}
		`
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
}

const SmartSelectInput = ({ options }) => {
  const [displayOptions, setDisplayOptions] = useState(false)
  const ref = useRef()

  useOnClickOutside(ref, () => {
    console.log("useOnClickOutside")
    // setDisplayOptions(false)
  })

  options = useMemo(() => {
    if (!options) return []
    return options
  }, [options])

  const onFocus = (event) => {
    console.log("onfocus", event)
    setDisplayOptions(true)
  }
  const onBlur = (event) => {
    console.log("onBlur", event)
    // setDisplayOptions(false)
    event.currentTarget.focus()
    event.preventDefault()
  }

  return (
    <>
      <SelectRow label="Select Row" onChange={function noRefCheck() {}}>
        <SelectOption label="Option 1" value="d-1" />
        <SelectOption label="Option 2" value="d-2" />
      </SelectRow>

      <TextInputRow
        label="Smart Select"
        onChange={function noRefCheck() {}}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <div ref={ref}>
        <div
          className={`options-container ${optionsContainer(displayOptions)}`}
        >
          <DataGrid columns={1}>
            {options.length > 0 && (
              <>
                {options.map((option, i) => (
                  <DataGridRow key={i}>
                    <DataGridCell>{option.value}</DataGridCell>
                  </DataGridRow>
                ))}
              </>
            )}
          </DataGrid>
        </div>
      </div>
    </>
  )
}

export default SmartSelectInput

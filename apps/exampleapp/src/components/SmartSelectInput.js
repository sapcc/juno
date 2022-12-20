import React, { useMemo, useState, useEffect } from "react"
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  FloatingFocusManager,
  useId,
} from "@floating-ui/react"
import {
  TextInputRow,
  DataGrid,
  DataGridRow,
  DataGridCell,
  Badge,
} from "juno-ui-components"

const optionsContainer = (isOpen) => {
  return `
    max-h-64
    overflow-y-scroll
    outline-none
    ring-2
    ring-theme-focus
    bg-theme-textinput
		`
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
}

const optionsRow = `
  hover:text-theme-accent
`

const fakeInputText = `
  text-theme-textinput
  bg-theme-textinput
  min-h-[2.5rem]
  rounded-3px
  p-2
`

const fakeInputTextPlaceholder = `
  opacity-50
`

const fakeInputTextOptions = `
  mr-1
`

const SmartSelectInput = ({ options }) => {
  const [open, setOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [displayOptions, setDisplayOptions] = useState(false)

  options = useMemo(() => {
    if (!options) return []
    return options
  }, [options])

  useEffect(() => {
    if (options) {
      const difference = options.filter(
        ({ value: id1 }) =>
          !selectedOptions.some(({ value: id2 }) => id2 === id1)
      )
      setDisplayOptions(difference)
    }
  }, [selectedOptions, options])

  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    placement: "bottom-start",
    onOpenChange: setOpen,
    middleware: [offset(5), shift()],
    whileElementsMounted: autoUpdate,
  })

  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ])

  const headingId = useId()

  // ===============

  const onChange = (event) => {
    setOpen(true)
  }

  const onOptionClicked = (option) => {
    console.log("onOptionClicked: ", option)
    setSelectedOptions([...selectedOptions, option])
  }

  const onOptionDeselected = (option) => {
    const index = selectedOptions.findIndex(
      (item) => item.value == option.value
    )
    if (index < 0) {
      return
    }
    let newOptions = selectedOptions.slice()
    newOptions.splice(index, 1)
    setSelectedOptions(newOptions)
  }

  console.log("selectedOptions: ", selectedOptions)

  return (
    <div>
      <div ref={reference} {...getReferenceProps()}>
        {/* <TextInputRow
          label="Smart Select"
          onChange={onChange}
          // onFocus={onFocus}
          onBlur={onBlur}
        /> */}
        <div className={fakeInputText}>
          {selectedOptions.length > 0 ? (
            <>
              {selectedOptions.map((item, index) => (
                <Badge
                  className={fakeInputTextOptions}
                  key={index}
                  icon="deleteForever"
                  text={item.label}
                  variant="info"
                  onClick={() => onOptionDeselected(item)}
                />
              ))}
            </>
          ) : (
            <div className={fakeInputTextPlaceholder}>Select...</div>
          )}
        </div>
      </div>
      {open && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={floating}
            className={`options-container ${optionsContainer(open)}`}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            aria-labelledby={headingId}
            {...getFloatingProps()}
          >
            <DataGrid id={headingId} columns={1}>
              {displayOptions.length > 0 && (
                <>
                  {displayOptions.map((option, i) => (
                    <DataGridRow
                      key={i}
                      onClick={() => onOptionClicked(option)}
                      className={optionsRow}
                    >
                      <DataGridCell>{option.value}</DataGridCell>
                    </DataGridRow>
                  ))}
                </>
              )}
            </DataGrid>
          </div>
        </FloatingFocusManager>
      )}
    </div>
  )
}

export default SmartSelectInput

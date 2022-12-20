import React, { useMemo, useState, useEffect } from "react"
import {
  useFloating,
  autoUpdate,
  offset,
  shift,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  FloatingFocusManager,
  useId,
  size,
} from "@floating-ui/react"
import {
  TextInputRow,
  TextInput,
  DataGrid,
  DataGridRow,
  DataGridCell,
  Badge,
} from "juno-ui-components"

const optionsContainer = `
  smart-select-options-container
  max-h-64
  overflow-y-scroll
  outline-none
  rounded-3px
  ring-2
  ring-theme-focus
  bg-theme-textinput
  `

const optionFilter = `
  smart-select-options-filter
  p-3 
  bg-theme-background-lvl-2
`

const optionsRow = `
  smart-select-options-row
  hover:text-theme-accent
`

const fakeInputText = (isOpen) => {
  return `
    smart-select-input
    text-theme-textinput
    bg-theme-textinput
    min-h-[2.5rem]
    rounded-3px
    p-2
    ${isOpen && `ring-2 ring-theme-focus`}
    `
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
}

const fakeInputTextPlaceholder = `
  smart-select-input-placeholder
  opacity-50
`

const fakeInputTextOptions = `
  smart-select-input-selected-option
  mr-1
`

const regexString = (string) => string.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")

const SmartSelectInput = ({ options }) => {
  const [open, setOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [displayOptions, setDisplayOptions] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  options = useMemo(() => {
    if (!options) return []
    return options
  }, [options])

  useEffect(() => {
    if (options) {
      // remove choosen options
      const difference = options.filter(
        ({ value: id1 }) =>
          !selectedOptions.some(({ value: id2 }) => id2 === id1)
      )
      // filter
      const regex = new RegExp(regexString(searchTerm.trim()), "i")
      const filteredOptions = difference.filter(
        (i) => `${i.label}`.search(regex) >= 0
      )

      console.log("filteredOptions ", filteredOptions)

      setDisplayOptions(filteredOptions)
    }
  }, [selectedOptions, options, searchTerm])

  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    placement: "bottom-start",
    onOpenChange: setOpen,
    middleware: [
      offset(8),
      shift(),
      size({
        apply({ rects, elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
            width: `${rects.reference.width}px`,
          })
        },
        padding: 10,
      }),
    ],
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

  const onOptionClicked = (option) => {
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

  const onSearchTermChanges = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <div ref={reference} {...getReferenceProps()}>
        <div className={fakeInputText(open)}>
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
            className={optionsContainer}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            aria-labelledby={headingId}
            {...getFloatingProps()}
          >
            <div className={optionFilter}>
              <TextInputRow
                label="Filter"
                value={searchTerm}
                onChange={onSearchTermChanges}
              />
            </div>
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
              {displayOptions.length === 0 && searchTerm && (
                <DataGridRow className={optionsRow}>
                  <DataGridCell>No options found</DataGridCell>
                </DataGridRow>
              )}
            </DataGrid>
          </div>
        </FloatingFocusManager>
      )}
    </div>
  )
}

export default SmartSelectInput

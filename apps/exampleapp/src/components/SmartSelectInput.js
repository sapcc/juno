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
  DataGrid,
  DataGridRow,
  DataGridCell,
  Badge,
  LoadingIndicator,
  Stack,
  Message,
  Button,
  Spinner,
} from "juno-ui-components"

const optionsContainer = `
  smart-select-options-container
  overflow-y-scroll
  rounded-3px
  ring-2
  ring-theme-focus
  bg-theme-textinput
  `

const optionFilter = `
  smart-select-options-filter
  p-3 
  bg-theme-background-lvl-2
  sticky
  top-0
`
const optionFilterInput = `
  w-full
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

const SmartSelectInput = ({
  options,
  isLoading,
  error,
  fetchPromise,
  isFetching,
  fetchStatus,
  fetchButton,
  onOptionClick,
  onOptionRemove,
  selectedOptions,
  searchTerm,
  onSearchTermChange,
}) => {
  const [open, setOpen] = useState(false)

  // set default to empty string if not given
  options = useMemo(() => {
    if (!options) return []
    return options
  }, [options])

  // set default to empty string if not given
  searchTerm = useMemo(() => {
    if (!searchTerm) return ""
    return searchTerm
  }, [searchTerm])

  // set default to empty array if not given
  selectedOptions = useMemo(() => {
    if (!selectedOptions) return []
    return selectedOptions
  }, [selectedOptions])

  //
  // Set up Floating ui
  //
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

  const click = useClick(context, {
    toggle: true,
    event: "mousedown",
  })
  const dismiss = useDismiss(context, {
    referencePress: true,
  })
  const role = useRole(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ])

  const headingId = useId()

  //
  // Callbacks
  //
  const onOptionClicked = (option) => {
    if (onOptionClick) onOptionClick(option)
  }

  const onOptionDeselected = (option) => {
    if (onOptionRemove) onOptionRemove(option)
  }

  return (
    <div>
      <div
        className={fakeInputText(open)}
        ref={reference}
        {...getReferenceProps()}
      >
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
              <Stack alignment="center">
                <TextInputRow
                  className={optionFilterInput}
                  label="Filter"
                  value={searchTerm}
                  onChange={onSearchTermChange}
                  // disabled={!options || options.length === 0}
                />
                {searchTerm && fetchPromise && (
                  <Stack alignment="center" className={optionFilterActions}>
                    {fetchStatus && (
                      <span className={optionsNotFoundStatus}>
                        {fetchStatus}
                      </span>
                    )}
                    {isFetching && <Spinner variant="primary" />}
                    {fetchButton && fetchButton}
                  </Stack>
                )}
              </Stack>
            </div>
            <DataGrid id={headingId} columns={1}>
              {error && (
                <DataGridRow>
                  <DataGridCell>
                    <Message text={error} variant="error" />
                  </DataGridCell>
                </DataGridRow>
              )}

              {isLoading && (
                <DataGridRow>
                  <DataGridCell>
                    <Stack alignment="center">
                      <LoadingIndicator color="jn-text-theme-info" size="40" />
                      <span>Loading Options...</span>
                    </Stack>
                  </DataGridCell>
                </DataGridRow>
              )}

              {options.length > 0 && (
                <>
                  {options.map((option, i) => (
                    <DataGridRow
                      key={i}
                      onClick={() => onOptionClicked(option)}
                      className={optionsRow}
                    >
                      <DataGridCell>{option.label}</DataGridCell>
                    </DataGridRow>
                  ))}
                </>
              )}

              {(!options || options.length === 0) && (
                <DataGridRow>
                  <DataGridCell>
                    <span>No options available</span>
                  </DataGridCell>
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

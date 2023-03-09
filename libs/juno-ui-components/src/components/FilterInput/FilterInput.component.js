import React, { useState, useEffect } from "react"
import { Select } from "../Select/Select.component"
import { SelectOption } from "../SelectOption/SelectOption.component"
import { TextInput } from "../TextInput/TextInput.component"
import { Icon } from "../Icon/Icon.component"
import PropTypes from "prop-types"

const wrapperStyles = `
	jn-flex
	jn-relative
	jn-p-px
	jn-border
	jn-rounded
	jn-bg-theme-filter-input
`

const defaultWrapperStyles = `
  jn-border-theme-filter-input
`

const errorWrapperStyles = `
  jn-border-theme-error
`

const selectStyles = `
	jn-rounded-r-none
`

const textInputStyles = `
	jn-grow
	jn-rounded-l-none
	jn-pr-16
	!jn-bg-theme-filter-input-textinput
	focus:jn-z-40
`

const iconWrapperStyles = `
	jn-absolute
	jn-flex
	jn-right-2
	jn-top-1.5
	jn-z-50
`

const selectWrapperStyles = `
  jn-min-w-[25%]
  jn-max-w-[50%]
`

/** 
A special Input to select key and value of a filter.
  Renamed:
  
  * selectedFilterKey -> filterKey
  * onSelectedFilterKeyChange -> onFilterKeyChange
  * filterValue,
  * onFilterValueChange,
  * [theFilterKey, setTheFilterKey]
  * [theFilterValue, setTheFilterValue]
*/
export const FilterInput = ({
  keyPlaceholder,
  keyLabel,
  open,
  options,
  valueLabel,
  className,
  filterKey,
  onFilterKeyChange,
  filterValue,
  onFilterValueChange,
  valuePlaceholder,
  onClear,
  onKeyPress,
  onFilter,
  loading,
  error,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [theFilterKey, setTheFilterKey] = useState("")
  const [theFilterValue, setTheFilterValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  
  useEffect(() => {
    setIsOpen(open)
  }, [open])
  
  useEffect(() => {
    setTheFilterKey(filterKey)
  }, [filterKey])

  useEffect(() => {
    setTheFilterValue(filterValue)
  }, [filterValue])
  
  useEffect(() => {
    if (!hasError && options.length < 1 || isLoading) {
      setIsLoading(loading)
      // reset the text input value when component is loading data:
      setTheFilterValue("") 
    } else {
      setIsLoading(false)
    }
  }, [options, loading])

  useEffect(() => {
    setHasError(error)
  }, [error])
  
  const handleOpenChange = () => {
    setIsOpen(!isOpen)
  }

  // TODO: make work with new Select -> how to get new value from Select?
  const handleFilterKeyChange = (fKey) => {
    console.log(fKey)
    setTheFilterKey(fKey)
    // Reset the (text input) value whenever the selected Filter key changes:
    setTheFilterValue("")
    onFilterKeyChange && onFilterKeyChange(event)
  }

  const handleFilterValueChange = (event) => {
    console.log(event)
    setTheFilterValue(event.target.value)
    onFilterValueChange && onFilterValueChange(event)
  }

  const handleClearClick = (event) => {
    setTheFilterValue("")
    onClear && onClear(event)
  }

  const handleFilterClick = () => {
    onFilter && onFilter(value)
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && onFilter) {
      onFilter && onFilter(value)
    }
    onKeyPress && onKeyPress(event)
  }

  return (
    <div
      className={`juno-filter-input ${wrapperStyles} ${
        isLoading ? "juno-filter-input-loading " : ""
      } ${hasError ? "juno-filter-input-error " : ""} ${
        hasError ? errorWrapperStyles : defaultWrapperStyles
      } ${className}`}
      {...props}
    >
      
      <div className={`${selectWrapperStyles}`}>
        <Select
          className={`juno-filter-input-select ${selectStyles} ${ hasError ? "jn-border-none" : "" }`}
          placeholder={ keyPlaceholder || keyLabel }
          aria-label={ keyPlaceholder || keyLabel }
          loading={isLoading}
          error={hasError}
          open={isOpen}
          value={theFilterKey}
          onValueChange={handleFilterKeyChange}
          onOpenChange={handleOpenChange}
        >
          {options.map((option, i) => {
            // console.log(option.key)
            return (<SelectOption
              label={i || option.label}
              value={i || option.key}
              key={`${i}`}
              {...option}
            />)
          })}
        </Select>
      </div>
      
      <TextInput
        value={theFilterValue}
        className={`${textInputStyles}`}
        aria-label={valueLabel}
        onChange={handleFilterValueChange}
        onKeyPress={handleKeyPress}
        disabled={ isLoading || hasError }
        placeholder={isLoading ? "Loading Filter Options…" : valuePlaceholder}
      />
      <div className={`${iconWrapperStyles}`}>
        {theFilterValue && theFilterValue.length ? (
          <Icon
            icon="close"
            title="Clear"
            size="18"
            className={`jn-mr-2`}
            onClick={handleClearClick}
          />
        ) : null}
        <Icon
          icon="filterAlt"
          title="Filter"
          disabled={isLoading || hasError}
          onClick={handleFilterClick}
        />
      </div>
    </div>
  )
}

FilterInput.propTypes = {
  /** A Placeholder to display in the Filter Key Select if none is selected. Defaults to "Select Filter…". */
  keyPlaceholder: PropTypes.string,
  /** Legacy: The label to display on the Filter Key Select. For new implementations, use 'placeholder' instead. */
  keyLabel: PropTypes.string,
  /** Whether the Filter Key Select is open. */
  open: PropTypes.bool,
  /** The options for the Filter Select: `[{Label: "Filter 1", key: "filter-1"}, {...}]`
	The array MUST exist in order for the component to render, but can be empty `[]`.
	*/
  options: PropTypes.arrayOf(PropTypes.object),
  /** The key of the current filter */
  filterKey: PropTypes.string,
  /** Pass a handler to be executed when the filter key changes */
  onFilterKeyChange: PropTypes.func,
  /** The aria-label of the Filter Value Text Input */
  valueLabel: PropTypes.string,
  /** The current value of the Filter Input */
  filterValue: PropTypes.string,
  /** Optional: pass a placeholder for the filter value text input */
  valuePlaceholder: PropTypes.string,
  /** Pass a handler to be executed when the filter value changes */
  onFilterValueChange: PropTypes.func,
  /** Pass a handler to execute when the Filter Value Clear button is clicked */
  onClear: PropTypes.func,
  /** Whether the filter is currently loading */
  loading: PropTypes.bool,
  /** Pass a className to the wrapping element */
  className: PropTypes.string,
  /** Pass a handler to execute when the Filter Value Filter button is clicked */
  onFilter: PropTypes.func,
  /** Whether the FilterInput has an error */
  error: PropTypes.bool,
}

FilterInput.defaultProps = {
  keyPlaceholder: "Select Filter…",
  keyLabel: "Select Filter",
  open: false,
  options: [],
  filterKey: undefined,
  onFilterKeyChange: undefined,
  valueLabel: "Filter by Value",
  filterValue: undefined,
  valuePlaceholder: "Enter Value…",
  onFilterValueChange: undefined,
  onClear: undefined,
  onFilter: undefined,
  loading: false,
  className: "",
  error: false,
}

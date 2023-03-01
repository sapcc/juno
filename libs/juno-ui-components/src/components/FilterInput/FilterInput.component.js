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
*/
export const FilterInput = ({
  keyPlaceholder,
  keyLabel,
  open,
  options,
  valueLabel,
  className,
  selectedFilterKey,
  onSelectedFilterKeyChange,
  filterValue,
  valuePlaceholder,
  onFilterValueChange,
  onClear,
  onKeyPress,
  onFilter,
  loading,
  error,
  ...props
}) => {
  const [selectedFilter, setSelectedFilter] = useState("")
  const [value, setValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  
  useEffect(() => {
    setSelectedFilter(selectedFilterKey)
  }, [selectedFilterKey])

  useEffect(() => {
    setValue(filterValue)
  }, [filterValue])
  
  useEffect(() => {
    if (!hasError && options.length < 1 || isLoading) {
      setIsLoading(loading)
      setValue("") // reset the text input value when component is loading data
    } else {
      setIsLoading(false)
    }
  }, [options, loading])

  useEffect(() => {
    setHasError(error)
  }, [error])

  // TODO: make work with new Select -> how to get new value from Select?
  // Reset the (text input) value whenever the selected Filter key changes:
  const handleSelectedFilterChange = (event) => {
    setSelectedFilter(event.target.value)
    setValue("")
    onSelectedFilterKeyChange && onSelectedFilterKeyChange(event)
  }

  const handleFilterValueChange = (event) => {
    setValue(event.target.value)
    onFilterValueChange && onFilterValueChange(event)
  }

  const handleClearClick = (event) => {
    setValue("")
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
      {/* <div>
      
      
        <Select
          className={`juno-filter-input-select ${selectStyles} ${ hasError ? "jn-border-none" : "" }`}
          aria-label={keyLabel}
          value={selectedFilter}
          onChange={handleSelectedFilterChange}
          loading={isLoading}
          error={hasError}
          placeholder={keyLabel}
        >
          {options.map((option, i) => (
            <SelectOption
              label={option.label}
              value={option.key}
              key={`${i}`}
              {...option}
            />
          ))}
        </Select>
      </div> */}
      
      <div className={`${selectWrapperStyles}`}>
        <Select
          className={`juno-filter-input-select ${selectStyles} ${ hasError ? "jn-border-none" : "" }`}
          placeholder={ keyPlaceholder || keyLabel }
          aria-label={ keyPlaceholder || keyLabel }
          loading={isLoading}
          error={hasError}
        >
          {options.map((option, i) => {
            //console.log(option)
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
        value={value}
        className={`${textInputStyles}`}
        aria-label={valueLabel}
        onChange={handleFilterValueChange}
        onKeyPress={handleKeyPress}
        disabled={ isLoading || hasError }
        placeholder={isLoading ? "Loading Filter Options…" : valuePlaceholder}
      />
      <div className={`${iconWrapperStyles}`}>
        {value && value.length ? (
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
  /** Legacy: The label to display on the Filter Key Select. If possible, use 'placeholder' instead. */
  keyLabel: PropTypes.string,
  /** Whether the Filter Key Select is open. */
  open: PropTypes.bool,
  /** The options for the Filter Select: `[{Label: "Filter 1", key: "filter-1"}, {...}]`
	The array MUST have a length in order for the component to render.
	*/
  options: PropTypes.arrayOf(PropTypes.object),
  /** The key of the current filter */
  selectedFilterKey: PropTypes.string,
  /** Pass a handler to be executed when the filter key changes */
  onSelectedFilterKeyChange: PropTypes.func,
  /** The aria-label of the Filter Value Text Input */
  valueLabel: PropTypes.string, // TODO -> valueLabel
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
  placeholder: "Select Filter…",
  keyLabel: "Select Filter",
  open: false,
  options: [],
  selectedFilterKey: "",
  onSelectedFilterKeyChange: undefined,
  valueLabel: "Filter by Value",
  filterValue: "",
  valuePlaceholder: "",
  onFilterValueChange: undefined,
  onClear: undefined,
  onFilter: undefined,
  loading: false,
  className: "",
  error: false,
}

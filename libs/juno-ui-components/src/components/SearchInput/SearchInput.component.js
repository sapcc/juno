import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import "./searchinput.css"
import { Icon } from "../Icon/index"
import { Stack } from "../Stack/index"

const wrapperClasses = (variant) => {
  return `
			jn-relative
			jn-inline-block
      jn-min-w-max
			${
        variant === "hero"
          ? `
					jn-w-full
				`
          : `
					jn-w-auto
				`
      }
		`
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
}

const searchClasses = (variant) => {
  return `
			jn-rounded-full
      jn-bg-theme-textinput
      jn-text-theme-high
      jn-shadow
			focus:jn-outline-none
			focus:jn-rounded-full
      focus:jn-ring-2
      focus:jn-ring-theme-focus
			${
        variant === "hero"
          ? `
					jn-text-lg
					jn-w-full
					jn-pl-6
					jn-pr-20
					jn-py-2.5
				`
          : `
					jn-text-base
					jn-w-auto
					jn-pl-3
					jn-pr-16
					jn-py-1
				`
      }
		`
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
}

const searchIconClasses = (variant) => {
  return `
			${variant === "hero"
          ? `
					jn-right-5
				`
          : `
					jn-right-3
				`
      }
		`
}

const iconWrapperStyles = (variant) => {
  return `
    jn-absolute
    ${variant == "hero"
      ? `
      jn-right-5
      `
      : `
      jn-right-3
      `
    }
  `
}

/** A basic, atomic, controlled Input[type="search"] */
export const SearchInput = ({
  name,
  value,
  placeholder,
  clear,
  className,
  autoComplete,
  onSearch,
  onChange,
  onClick,
  onKeyPress,
  onClear,
  variant,
  ...props
}) => {

  const [val, setValue] = useState(value)
	
	useEffect(() => {
		setValue(value)
	}, [value])

	const handleInputChange = (event) => {
		setValue(event.target.value)
		onChange && onChange(event)
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && onSearch) { onSearch(val) }
    onKeyPress && onKeyPress(event)
  }

  const handleSearchClick = (event) => {
		onSearch && onSearch(val)
		onClick && onClick(event)
  }
  
  const handleClearClick = (event) => {
    setValue("")
    onClear && onClear(event)
  }

  return (
    <div className={`juno-search-input-wrapper ${wrapperClasses(variant)}`} role="search">
      <Stack gap="2" alignment="center">
        <input
          type="search"
          name={name || "search"}
          placeholder={placeholder}
          value={val}
          autoComplete={autoComplete}
          className={`juno-search-input ${searchClasses(variant)} ${className}`}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          {...props}
        />
        <div className={`${iconWrapperStyles(variant)}`}>
          { clear && val.length ? <Icon 
                                    icon="close"
                                    title="Clear"
                                    onClick={handleClearClick}
                                  /> 
                                : 
                                  null }
          <Icon
            icon="search"
            className={`${searchIconClasses(variant)}`}
            title="Search"
            onClick={handleSearchClick}
          />
        </div>
      </Stack>
    </div>
  )
}

SearchInput.propTypes = {
  /** Pass a name. Defaults to "search". */
  name: PropTypes.string,
  /** Pass a variant. Defaults to "default", "hero" variant renders a search input that is meant to be used standalone on a search page, similar to the inital google search page. */
  variant: PropTypes.oneOf(["hero", "default"]),
  /** Pass a custom placeholder to replace "Search…" default.*/
  placeholder: PropTypes.string,
  /** Pass a value for initial rendering. Will NOT be updated once user changes for now */
  value: PropTypes.string,
  /** Pass a valid autocomplete value. We do not police validity. Default is "off" */
	autoComplete: PropTypes.string,
  /** Pass whether to show Clear button or not. Default is true. */
  clear: PropTypes.bool,
  /** The class names passed here will be merged with the exisiting class names of the component */
  className: PropTypes.string,
  /** Pass a search handler that will be called by the component when a search is triggered either via "Enter" keypress or via click on the magnifying glass icon */
  onSearch: PropTypes.func,
  /** Pass a click handler that will be called when the magnifying glass icon is clicked */
  onClick: PropTypes.func,
  /** Pass a change handler */
  onChange: PropTypes.func,
  /** Pass a keyPress handler, by default the component will listen to the "Enter" key and call the passed onSearch function when it is pressed */
  onKeyPress: PropTypes.func,
  /** Pass a handler to be executed once a user clicks on the Clear button of the SearchField */
  onClear: PropTypes.func,
}

SearchInput.defaultProps = {
  value: "",
  variant: "default",
  clear: true,
  onSearch: undefined,
  onChange: undefined,
  onClick: undefined,
  onKeyPress: undefined,
  onClear: undefined,
  autoComplete: "off",
  placeholder: "Search…",
  className: "",
}

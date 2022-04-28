import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import "./searchinput.css"
import { Icon } from "../Icon/index"
import { Stack } from "../Stack/index"

const wrapperClasses = (variant) => {
  return `
			relative
			inline-block
      min-w-max
			${
        variant === "hero"
          ? `
					w-full
				`
          : `
					w-auto
				`
      }
		`
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
}

const searchClasses = (variant) => {
  return `
			rounded-full
			focus:outline-none
			focus:rounded-full
      focus:ring-2
      focus:ring-theme-focus
			bg-theme-textinput
			text-theme-high
			shadow
			${
        variant === "hero"
          ? `
					text-lg
					w-full
					pl-6
					pr-20
					py-2.5
				`
          : `
					text-base
					w-auto
					pl-3
					pr-16
					py-1
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
					right-5
				`
          : `
					right-3
				`
      }
		`
}

// const clearIconClasses = (variant) => {
// 	return (
// 		`
// 			${variant === "hero" ?
// 				`
// 					right-16
// 				`
// 			:
// 				`
// 					right-11
// 				`
// 			}
// 		`
// 	)
// }

/** A basic, atomic, controlled Input[type="search"] */
export const SearchInput = ({
  name,
  value,
  placeholder,
  className,
  autoComplete,
  onSearch,
  onChange,
  onClick,
  onKeyPress,
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

  const handleClick = (event) => {
		onSearch && onSearch(val)
		onClick && onClick(event)
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
        <Icon
          icon="search"
          className={`absolute ${searchIconClasses(variant)}`}
          title="Search"
          onClick={handleClick}
        />
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
}

SearchInput.defaultProps = {
  value: "",
  variant: "default",
  onSearch: undefined,
  onChange: undefined,
  onClick: undefined,
  onKeyPress: undefined,
  autoComplete: "off",
  placeholder: "Search…",
  className: "",
}

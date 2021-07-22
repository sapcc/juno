import React from "react"
import PropTypes from "prop-types"
import "./searchinput.css"
import SearchIcon from "../../img/icon_search.svg"
// import ClearIcon from "../../img/icon_close.svg"

const wrapperClasses = (variant) => {
  return `
			relative
			inline-block
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

const absoluteIcon = (variant) => {
  return `
			absolute
			${
        variant === "hero"
          ? `
					top-3.5
				`
          : `
					top-1
				`
      }
		`
}

const searchIconClasses = (variant) => {
  return `
			${
        variant === "hero"
          ? `
					right-6
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

/** A basic, atomic, uncontrolled Input[type="search"] */
export const SearchInput = ({
  name,
  value,
  placeholder,
  className,
  onChange,
  variant,
  ...props
}) => {
  return (
    <div className={`search-input-wrapper ${wrapperClasses(variant)}`}>
      <input
        type="search"
        name={name || "search"}
        placeholder={placeholder}
        defaultValue={value}
        autoComplete="off"
        className={`search-input ${searchClasses(variant)} ${className || ""}`}
        onChange={onChange}
        {...props}
      />
      <SearchIcon
        className={`${absoluteIcon(variant)} ${searchIconClasses(variant)}`}
      />
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
  /** The class names passed here will be merged with the exisiting class names of the component */
  className: PropTypes.string,
  /** Pass a handler */
  onChange: PropTypes.func,
}

SearchInput.defaultProps = {
  value: "",
  variant: "default",
  onChange: undefined,
  placeholder: "Search…",
}

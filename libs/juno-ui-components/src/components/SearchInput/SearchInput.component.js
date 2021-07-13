import React from "react"
import PropTypes from "prop-types"

const searchStyle = () => {
	return (
		`
			rounded-full
			px-3
			py-1
		`
	)
}

/** A basic, atomic, uncontrolled Input[type="search"] */
export const SearchInput = ({
	name,
	value,
	placeholder,
	className,
	onChange,
	...props
}) => {
	return (
		<input 
			type="search"
			name={name || "search"}
			placeholder={placeholder}
			defaultValue={value}
			className = {`${searchStyle()} ${className}`}
			onChange={onChange}
			{...props}
		/>
	)
}

SearchInput.propTypes = { 
	/** Pass a name. Defaults to "search". */
	name: PropTypes.string,
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
	onChange: undefined,
	placeholder: "Search…"
}
import React from "react"
import PropTypes from "prop-types"

/** A basic, atomic, uncontrolled Input[type="search"] */
export const SearchInput = ({
	name,
	value,
	placeholder,
	onChange,
	...props
}) => {
	return (
		<input 
			type="search"
			name={name || "search"}
			placeholder={placeholder}
			defaultValue={value}
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
	/** Pass a handler */
	onChange: PropTypes.func,
}

SearchInput.defaultProps = {
	value: "",
	onChange: undefined,
	placeholder: "Search…"
}
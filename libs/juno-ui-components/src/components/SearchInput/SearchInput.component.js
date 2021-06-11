import React from "react"
import PropTypes from "prop-types"

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
	name: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
}

SearchInput.defaultProps = {
	value: "",
	onChange: undefined,
	placeholder: "Search…"
}
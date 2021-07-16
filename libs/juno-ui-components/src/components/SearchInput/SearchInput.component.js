import React from "react"
import PropTypes from "prop-types"
import {createUseStyles} from 'react-jss'

const searchClasses = () => {
	return (
		`
			rounded-full
			focus:outline-none
			focus:rounded-full
			focus:ring-2
			px-3
			py-1
			bg-theme-textinput
			text-theme-medium
		`
	)
}

const useStyles = createUseStyles({
  searchInput: {
    '&::-webkit-search-cancel-button': {
			'-webkit-appearance': 'none'
		}
	}
})


/** A basic, atomic, uncontrolled Input[type="search"] */
export const SearchInput = ({
	name,
	value,
	placeholder,
	className,
	onChange,
	...props
}) => {
	const classes = useStyles()
	return (
		<input 
			type="search"
			name={name || "search"}
			placeholder={placeholder}
			defaultValue={value}
			className = {`${searchClasses()} ${className || ""} ${classes.searchInput}`}
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
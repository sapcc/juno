import React from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index.js"

const selectstyles = `
	bg-theme-select
	text-theme-high
	appearance-none
	text-base
	pl-3
	pr-9
	h-11
	border
	border-transparent
	rounded-3px
	bg-icon-arrow-down
	bg-right
	bg-no-repeat
	focus:outline-none
	focus:ring-2
	focus:ring-focus
	disabled:opacity-50
`

const wrapperstyles = `
	relative
`

const iconstyles = `
	absolute
	right-[.5rem]
	top-[0]
	pointer-events-none
`

const disablediconstyles = `
	opacity-50
`



/*+ A basic, uncontrolled Select. Takes SelectOption and SelectOptionGroup as children. */
export const Select = ({
	name,
	id,
	children,
	className,
	disabled,
	onChange,
	...props
}) => {
	return (
		<span className={`juno-select-wrapper ${wrapperstyles}`}>
			<select 
				name={name || "unnamed select"}
				id={id}
				className={`juno-select ${selectstyles} ${className}`}
				onChange={onChange}
				disabled={disabled}
				{...props}
			>
			{children}
			</select>
			<Icon icon={"expandMore"} className={`${iconstyles} ${ disabled ? disablediconstyles : "" } `} />
		</span>
	)
}

Select.propTypes = {
	/** Pass a name. */
	name: PropTypes.string,
	/** The id of the select */
	id: PropTypes.string,
	/** Pass a classname */
	className: PropTypes.string,
	/** Pass SelectOption and SelectOptionGroup as children. */
	children: PropTypes.node,
	/** Disabled the select */
	disabled: PropTypes.bool,
	/** Pass a handler */
	onChange: PropTypes.func,
}

Select.defaultProps = {
	name: null,
	id: "",
	className: "",
	disabled: null,
	onChange: undefined,
}
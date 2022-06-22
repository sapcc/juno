import React from "react"
import PropTypes from "prop-types"
import { Icon } from "../Icon/index.js"

const selectstyles = `
	jn-bg-theme-select
	jn-text-theme-high
	jn-appearance-none
	jn-text-base
	jn-pl-4
	jn-pr-9
	jn-h-[2.375rem]
	jn-border
	jn-border-transparent
	jn-rounded-3px
	jn-bg-icon-arrow-down
	jn-bg-right
	jn-bg-no-repeat
	focus:jn-outline-none
	focus:jn-ring-2
	focus:jn-ring-theme-focus
	disabled:jn-opacity-50
`

const wrapperstyles = `
	jn-relative
`

const iconstyles = `
	jn-absolute
	jn-right-2
	jn-top-2
	jn-pointer-events-none
`

const disablediconstyles = `
	jn-opacity-50
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
		<div className={`juno-select-wrapper ${wrapperstyles}`}>
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
		</div>
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
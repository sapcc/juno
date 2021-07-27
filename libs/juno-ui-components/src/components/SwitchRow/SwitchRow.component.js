import React from "react"
import PropTypes from "prop-types"
import { Switch } from "../Switch/index.js"
import { Label } from "../Label/index.js"

const switchrow = `
	flex
	flex-row
`

const helptextstyles = `
	text-xs
	text-theme-disabled
`

/** A checkbox input group containing a checkbox, associated label, and structural markup */
export const SwitchRow =({
	value,
	name,
	label,
	id,
	disabled,
	helptext,
	className,
	onChange,
	...props
}) => {
	return (
		<div
			className={`switch-row ${switchrow}`}
			{...props}
		>
			<div>
				<Switch name={name} onChange={onChange} id={id} value={value || ""} disabled={disabled} className={className} />
			</div>
			<div>
				<Label text={label} htmlFor={id} />
				{helptext ? <p className={`${helptextstyles}`}>{helptext}</p> : ""}
			</div>
		</div>
	)
}

SwitchRow.propTypes = {
	/** Optional initial value */
	value: PropTypes.string,
	/** Name attribute of the checkbox element */
	name: PropTypes.string,
	/** Label text */
	label: PropTypes.string,
	/** Id */
	id: PropTypes.string,
	/** Disabled */
	disabled: PropTypes.bool,
	/** Help text */
	helptext: PropTypes.string,
	/** Pass a className */
	className: PropTypes.string,
	/** Pass a handler to the checkbox element */
	onChange: PropTypes.func,
}

SwitchRow.defaultProps = {
	value: null,
	name: null,
	label: null,
	id: null,
	disabled: null,
	helptext: null,
	className: "",
	onChange: undefined,
}


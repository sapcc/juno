import React, { useState } from "react"
import PropTypes from "prop-types"

/* General */

const swtch = `
`

const track = `
`

const handle = `
`

/* Size classes */

const swtchSmall = `
`

const swtchDefaultSize = `
`

const swtchLarge = `
`

/* Checked classes */

const checkedTrack = `
`

const uncheckedTrack = `
`

const checkedHandle = `
`

const uncheckedHandle = `
`
/* Disabled classes */
const swtchDisabled = `
	pointer-events-none
	cursor-not-allowed
`

const disabledTrack = `
`

const disabledHandle = `
`


const sizeClass = (size) => {
	switch (size) {
		case "small":
		  return swtchSmall
		case "large":
		  return swtchLarge
		default:
		  return swtchDefaultSize
	}
}

const checkedTrackClass = (checked) => {
	if (checked) {
		return checkedTrack
	} else {
		return uncheckedTrack
	}
}

const checkedHandleClass = (checked) => {
	if (checked) {
		return checkedHandle
	} else {
		return uncheckedHandle
	}
}

const disabledClass = (disabled) => {
	if (disabled) {
		return swtchDisabled
	} else {
		return false
	}
}

const disabledTrackClass = (disabled) => {
	if (disabled) {
		return disabledTrack
	} else {
		return false
	}
}

const disabledHandleClass = (disabled) => {
	if (disabled) {
		return disabledHandle
	} else {
		return false
	}
}

/** A Switch/Toggle component */
export const Switch = ({
	name,
	checked,
	onChange,
	size,
	disabled,
	...props
}) => {
	const [checkedState, toggleChecked] = useState(checked)
	const [disabledState, toggleDisabled] = useState(disabled)
	return (
		<button 
			type="button"
			role="switch"
			name={name}
			className={`switch-${checkedState} ${swtch} ${sizeClass(size)} ${disabledClass(disabledState)}`}
			onChange={onChange}
			onClick={ () => toggleChecked(!checkedState) }
			{...props}
		>
			<span>
				<span className={`${track} ${checkedTrackClass(checkedState)} ${disabledTrackClass(disabledState)}`}></span>
				<span className={`${handle} ${checkedHandleClass(checkedState)} ${disabledHandleClass(disabledState)}`}></span>
			</span>
			{/* DELETE once styes are in place: */}
			{ checkedState ? "on" : "off"}
		</button>
	)
}

Switch.propTypes = { 
	/** Name attribute */
	name: PropTypes.string,
	/** Leave empty for default size */
	size: PropTypes.oneOf(["small", "default", "large"]),
	/**  Pass checked state for initial rendering. */
	checked: PropTypes.bool,
	/** Disabled switch */
	disabled: PropTypes.bool,
	/** Pass a handler */
	onChange: PropTypes.func,
}

Switch.defaultProps = {
	name: "unnamed switch",
	checked: false,
	disabled: false,
	size: "default",
	onChange: undefined,
}
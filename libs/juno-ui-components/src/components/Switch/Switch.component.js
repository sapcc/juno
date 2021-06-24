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

/** A Switch/Toggle component */
export const Switch = ({
	name,
	checked,
	onChange,
	size,
	...props
}) => {
	const [checkedState, toggleChecked] = useState(checked)
	return (
		<button 
			type="button"
			role="switch"
			name={name}
			className={`switch-${checkedState} ${swtch} ${sizeClass(size)}`}
			onChange={onChange}
			onClick={ () => toggleChecked(!checkedState) }
			{...props}
		>
			<span>
				<span className={`${track} ${checkedTrackClass(checkedState)}`}></span>
				<span className={`${handle} ${checkedHandleClass(checkedState)}`}></span>
			</span>
			{`${checkedState}`}
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
	/** Pass a handler */
	onChange: PropTypes.func,
}

Switch.defaultProps = {
	name: "unnamed switch",
	checked: false,
	size: "default",
	onChange: undefined,
}
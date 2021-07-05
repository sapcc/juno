import React, { useState } from "react"
import PropTypes from "prop-types"

const swtchStyles = (size, disabled) => {
	return (
		`
			rounded-full
			relative
			p-0
			leading-0
			focus:outline-none 
			focus:ring
			${ disabled ? 'pointer-events-none cursor-not-allowed opacity-50' : '' }
			${ size === 'small' ? 'w-8 h-4' : '' }
			${ size === 'large' ? 'w-12 h-6' : '' }
			${ size === 'default' ? 'w-10 h-5' : '' }
		`
	)
}

const swtchBodyStyles = (size) => {
	return (
		`	
			absolute
			top-0
			right-0
			bottom-0
			left-0
			${ size === 'small' ? 'w-8 h-4' : '' }
			${ size === 'large' ? 'w-12 h-6' : '' }
			${ size === 'default' ? 'w-10 h-5' : '' }
		`
	)	
}

const swtchTrackStyles = (size, checked) => {
	return (
		`
			inline-block
			absolute
			top-0
			right-0
			bottom-0
			left-0
			rounded-full
			${ size === 'small' ? 'w-8 h-4' : '' }
			${ size === 'large' ? 'w-12 h-6' : '' }
			${ size === 'default' ? 'w-10 h-5' : '' }
			${ checked ? 'bg-theme-primary border-theme-primary' : 'bg-theme-default border-theme-default' }
		`
	)
	
}

const swtchHandleStyles = (size, checked) => {
	return (
		`
			inline-block
			absolute
			top-0
			rounded-full
			bg-white 
			border-theme-default
			${ size === 'small' ? 'w-4 h-4' : '' }
			${ size === 'large' ? 'w-6 h-6' : '' }
			${ size === 'default' ? 'w-5 h-5' : '' }
			${checked ? 'right-0' : 'left-0'}
		`
	)
}

/** A Switch/Toggle component */
export const Switch = ({
	name,
	id,
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
			id={id}
			className={`switch ${swtchStyles(size, disabledState)}`}
			checked={checkedState}
			aria-checked={checkedState}
			onChange={onChange}
			onClick={ () => toggleChecked(!checkedState) }
			{...props}
		>
			<span className={`switch-body ${swtchBodyStyles(size)}`}>
				<span className={`switch-track ${swtchTrackStyles(size, checkedState)}`}></span>
				<span className={`switch-handle ${swtchHandleStyles(size, checkedState)}`}></span>
			</span>
		</button>
	)
}

Switch.propTypes = { 
	/** Name attribute */
	name: PropTypes.string,
	/** Id */
	id: PropTypes.string,
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
	id: null,
	checked: false,
	disabled: false,
	size: "default",
	onChange: undefined,
}
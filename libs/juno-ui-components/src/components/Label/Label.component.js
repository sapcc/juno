import React from "react"
import PropTypes from "prop-types"

const labelstyles = `
	jn-text-theme-high
	jn-text-base
`

const requiredstyles = `
	jn-inline-block
	jn-w-1
	jn-h-1
	jn-rounded-full
	jn-align-top
	jn-ml-1
	jn-mt-2
	jn-bg-theme-required
`

const minimizedStyles = `

`

const disabledstyles = `
	jn-opacity-50
	jn-cursor-not-allowed
`

/**
* A re-usable Label component
*/

export const Label = ({
	text,
	htmlFor,
	required,
	disabled,
	minimized,
	className,
	...props
}) => {
	return (
		<>
		<label 
			className={`
				juno-label 
				${ labelstyles } 
				${ minimized ? "juno-label-minimized " + minimizedStyles : "" }
				${ disabled ? "juno-label-disabled " + disabledstyles : "" } 
				${ className }
			`} 
			htmlFor={htmlFor} 
			{...props}
		>
			{ text }
			{ required ? 
				<span className={`
					juno-required 
					${ requiredstyles }
					`}>
				</span> 
			: 
				"" }
		</label>
		
		</>
	)
}

Label.propTypes = { 
	/** Pass a string of text to be rendered as contents. Required.  */
	text: PropTypes.string,
	/** An Id of an input element to associate the label with */
	htmlFor: PropTypes.string,
	/** Required */
	required: PropTypes.bool,
	/** Pass a className */
	className: PropTypes.string,
	/** Label for a disabled input */
	disabled: PropTypes.bool,
	/** Whether the label is minimzed */
	minimized: PropTypes.bool,
}

Label.defaultProps = {
	text: "",
	htmlFor: "",
	required: false,
	className: "",
	disabled: false,
	minimized: false,
}
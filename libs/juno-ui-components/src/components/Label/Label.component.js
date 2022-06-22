import React from "react"
import PropTypes from "prop-types"

/* Stacked: Label is above the text input or native select element */
/* Floating: label is inside the text input element */
/* Default: Others, e.g. Radio, checkbox, etc. */

const labelstyles = `
	jn-text-theme-high
`

const stackedlabelstyles = `
	jn-text-sm
`

const floatinglabelstyles = `
	floating-label
	jn-text-base
`

const defaultlabelstyles = `
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
// namespace disabled label?
const disabledstyles = `
	disabled 
	jn-opacity-50
`

const variantStyles = (variant) => {
	switch (variant) {
		case "floating":
			return floatinglabelstyles
		case "stacked":
			return stackedlabelstyles
		default:
			return defaultlabelstyles
	}
}

/**
* A re-usable Label component
*/

export const Label = ({
	text,
	htmlFor,
	required,
	variant,
	disabled,
	className,
	...props
}) => {
	return (
		<>
		<label className={`juno-label ${labelstyles} ${variantStyles(variant)} ${ disabled ? disabledstyles : "" } ${className}`} htmlFor={htmlFor} {...props}>{ text ? text : "unlabeled" }</label>
		{ required ? <span className={`required ${requiredstyles}`} ></span> : "" }
		</>
	)
}

Label.propTypes = { 
	/** Pass a string of text to be rendered as contents. Required.  */
	text: PropTypes.string,
	/** An Id of an inout element to connect the label with */
	htmlFor: PropTypes.string,
	/** Required */
	required: PropTypes.bool,
	/** Pass a className */
	className: PropTypes.string,
	/** Label for a disabled input */
	disabled: PropTypes.bool,
	/** Variant: stacked or floating */
	variant: PropTypes.oneOf(["floating", "stacked"]),
}

Label.defaultProps = {
	text: null,
	htmlFor: null,
	required: null,
	className: "",
	disabled: null,
	variant: null,
}
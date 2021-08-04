import React from "react"
import PropTypes from "prop-types"

const labelstyles = `
	text-theme-high
`


const stackedlabelstyles = `
	text-sm
`

const floatinglabelstyles = `
	text-base
`

const defaultlabelstyles = `
	text-sm
`

const requiredstyles = `
	inline-block
	w-1
	h-1
	rounded-full
	align-top
	ml-1
	mt-2
	bg-theme-required
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
	className,
	...props
}) => {
	return (
		<>
		<label className={`label ${labelstyles} ${variantStyles(variant)} ${className}`} htmlFor={htmlFor}>{ text ? text : "unlabeled" }</label>
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
	/** Variant: stacked or floating */
	variant: PropTypes.oneOf(["floating", "stacked"]),
}

Label.defaultProps = {
	text: null,
	htmlFor: null,
	required: null,
	className: "",
	variant: null,
}
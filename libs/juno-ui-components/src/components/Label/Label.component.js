import React from "react"
import PropTypes from "prop-types"

const labelstyles = `
	text-sm
	text-theme-high
`

const requiredstyles = `
	rounded:full
`

/**
* A re-usable Label component
*/

export const Label = ({
	text,
	htmlFor,
	required,
	className,
	...props
}) => {
	return (
		<>
		<label className={`label ${labelstyles} ${className}`} htmlFor={htmlFor}>{ text ? text : "unlabeled" }</label>
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
}

Label.defaultProps = {
	text: null,
	htmlFor: null,
	required: null,
	className: "",
}
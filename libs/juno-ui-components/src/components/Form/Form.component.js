import React from "react"
import PropTypes from "prop-types"

const formHeading = `
`

/** A Form to hold FormSections and/or FormGroups with an optional title. */
export const Form = ({
	title,
	className,
	children,
	...props
}) => {
	return (
		<form 
			className={`juno-form ${className}`}
			{...props}
		>
			{title ?  <h1 className={`juno-form-heading ${formHeading}`}>{title}</h1> : ""}
			{children}
		</form>		
	)
}

Form.propTypes = { 
	/** Title to be rendered in the Form`. */
	title: PropTypes.string,
	/** Custom className */
	className: PropTypes.string,
	/** Children to render in the form */
	children: PropTypes.node,
}

Form.defaultProps = {
	title: null,
	className: "",
	children: null,
}
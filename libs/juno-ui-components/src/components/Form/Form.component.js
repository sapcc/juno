import React from "react"
import PropTypes from "prop-types"

const formHeading = `
`

/** A Form to hold FormSections and/or FormGroups with an optional title. */
export const Form = ({
	title,
	children,
	...props
}) => {
	return (
		<form 
			{...props}
		>
			{title ?  <h1 className={`${formHeading}`}>{title}</h1> : ""}
			{children}
		</form>		
	)
}

Form.propTypes = { 
	/** Title to be rendered in the Form`. */
	title: PropTypes.string,
	/** Children to render in the form */
	children: PropTypes.node,
}

Form.defaultProps = {
	title: null,
	children: null,
}
import React from "react"
import PropTypes from "prop-types"
import { FormLayoutProvider } from "../FormLayoutProvider"

const formHeading = `
  `

/** A Form to hold FormSections and/or FormGroups with an optional title. */
export const Form = ({
	title,
	children,
	layout,
	...props
}) => {
	return (
			<form 
				className={`form-${layout}`}
				{...props}
			>
				<FormLayoutProvider layout={layout}>
					{title ?  <h1 className={`${formHeading}`}>{title}</h1> : ""}
					{children}
				</FormLayoutProvider>
			</form>		
	)
}

Form.propTypes = { 
	/** Layout direction of the form */
	layout: PropTypes.oneOf(["horizontal", "vertical"]),
	/** Title to be rendered in the Form`. */
	title: PropTypes.string,
	/** Children to render in the form */
	children: PropTypes.node,
}

Form.defaultProps = {
	layout: "horizontal",
	title: null,
	children: null,
}
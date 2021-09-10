import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { Label } from "../Label/index.js"

const checkboxgroupstyles = `
	mb-5
`

export const CheckboxGroup = ({
	name,
	label,
	required,
	disabled,
	children,
	className,
	...props
}) => {

	const namedChildren = () => {
		return React.Children.map(children, (child) => {
			return React.cloneElement(child, {
				name: name,
				className: className,
				disabled: disabled
			});
		});
	 };
	
	return (
		<div role="group" className={`checkbox-group ${checkboxgroupstyles}`} {...props} >
			{ label ? <Label text={label} htmlFor={name} required={required} /> : "" }
			{ namedChildren() }
		</div>
	)
}


CheckboxGroup.propTypes = {
	/** Name attribute. Checkboxes within the group will have this name attribute */
	name: PropTypes.string,
	/** Label for the groupd as a whole */
	label: PropTypes.string,
	/** Whether a selection in the group is required */
	required: PropTypes.bool,
	/** Disable the whole group */
	disabled: PropTypes.bool,
	/** Custom class to be passed to the individual checkboxes of the group */
	className: PropTypes.string,
	/** Child checkbox components */
	children: PropTypes.node,
}


CheckboxGroup.defaultProps = {
	name: null,
	className: "",
	label: null,
	required: null,
	disabled: null,
	children: null,
}
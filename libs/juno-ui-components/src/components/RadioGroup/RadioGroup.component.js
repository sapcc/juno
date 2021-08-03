import React from "react"
import PropTypes from "prop-types"
import { Label } from "../Label/index.js"

/** A very basic, for the time being uncontrolled Group of Radios. */
export const RadioGroup = ({
	name,
	label,
	required,
	children,
	className,
	...props
}) => {
	const namedChildren = () => {
		return React.Children.map(children, (child) => {
		  return React.cloneElement(child, {
			name: name,
			className: className
		  });
		});
	 };
	 return (
	 	<>
		 	{ label ? <Label text={label} htmlFor={name} required={required} /> : "" }
		 	{ namedChildren() }
		</>
	 );
}

RadioGroup.propTypes = {
	/** Name attribute. Radios within the group using the same name will work together as mutually exclusive options. */
	name: PropTypes.string.isRequired,
	/** Label for the group of radios as a whole */
	label: PropTypes.string,
	/** Whether a selection is required */
	required: PropTypes.bool,
	/** Pass a custom class to apply to the individual Radios of the group */
	className: PropTypes.string,
	/** Child radio components. These will receive the name attribute as passed to Radiogroup. */
	children: PropTypes.node
}

RadioGroup.defaultProps = {
	className: "",
	required: null,
	label: null
}


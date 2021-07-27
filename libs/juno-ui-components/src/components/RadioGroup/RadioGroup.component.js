import React from "react"
import PropTypes from "prop-types"

/** A very basic, for the time being uncontrolled Group of Radios. */
export const RadioGroup = ({
	name,
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
	 return <React.Fragment>{namedChildren()}</React.Fragment>;
}

RadioGroup.propTypes = {
	/** Name attribute. Radios within the group using the same name will work together as mutually exclusive options. */
	name: PropTypes.string.isRequired,
	/** Pass a custom class to apply to the individual Radios of the group */
	className: PropTypes.string,
	/** Child radio components. These will receive the name attribute as passed to Radiogroup. */
	children: PropTypes.node
}

RadioGroup.defaultProps = {
	className: ""
}


import React from "react"
import PropTypes from "prop-types"

/** A very basic, for the time being uncontrolled Group of Radios. */
export const RadioGroup = ({
	name,
	children,
	...props
}) => {
	const namedChildren = () => {
		return React.Children.map(children, (child) => {
		  return React.cloneElement(child, {
			name: name
		  });
		});
	 };
	 return <React.Fragment>{namedChildren()}</React.Fragment>;
}

RadioGroup.propTypes = {
	/** Name attribute. Radios within the group using the same name will work together as mutually exclusive options. */
	name: PropTypes.string.isRequired,
	/** Child radio components. These will receive the name attribute as passed to Radiogroup. */
	children: PropTypes.node
}


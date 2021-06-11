import React from "react"
import PropTypes from "prop-types"

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
	name: PropTypes.string.isRequired
}


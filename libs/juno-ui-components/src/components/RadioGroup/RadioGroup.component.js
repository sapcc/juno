import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { Label } from "../Label/index.js"

const radiogroupstyles = `
	jn-mb-4
	last:jn-mb-0
`

const radiogrouplabelstyles = `
	jn-inline-block
	jn-mb-2
`
/**
A component to semantically and functionally group individual RadioRows: All contained child RadioRows will share the same `name`-attribute passed as a prop to the group, and thus make the Radios work with each other as expected.
*/

export const RadioGroup = ({
	name,
	label,
	selected,
	required,
	disabled,
	children,
	className,
	...props
}) => {
	
	const [selectedOption, setSelectedOption] = useState("")
	
	useEffect( () => {
		setSelectedOption(selected)
	}, [selected])
	
	const handleRadioChange = (event) => {
		setSelectedOption(event.target.value)
	}
	
	const namedChildren = () => {
		return React.Children.map(children, (child) => {
			
			let checkedOption = false 
			if (selectedOption) {
				// if parent has selectedOption, oarent wins. 
				checkedOption = (selectedOption === child.props.value)
			} else if (child.props.checked) {
				//otherwise last checked option wins
				checkedOption = true
				// update state accordingly
				setSelectedOption(child.props.value)
			}
			// clone element, set name and checked acc. to above logic:
			return React.cloneElement(child, {
				name: name,
				className: className,
				onChange: handleRadioChange,
				checked: checkedOption,
				disabled: disabled
			});
		});
	 };
	
	return (
		<div role="radiogroup" className={`juno-radiogroup ${radiogroupstyles} ${className}`} onChange={namedChildren} {...props} >
			{ label ? <Label text={label} htmlFor={name} className={`${radiogrouplabelstyles}`} required={required} /> : "" }
			{ namedChildren() }
		</div>
	)
}

RadioGroup.propTypes = {
	/** Name attribute. Radios within the group using the same name will work together as mutually exclusive options. */
	name: PropTypes.string.isRequired,
	/** Label for the group of radios as a whole. Mandatory if you want to denote a selection in the set is required. */
	label: PropTypes.string,
	/** The value of the selected option */
	selected: PropTypes.string,
	/** Specify whether a selection of one of the options is required */
	required: PropTypes.bool,
	/** Disable a RadioGroup */
	disabled: PropTypes.bool,
	/** Pass a custom class to apply to the individual Radios of the group */
	className: PropTypes.string,
	/** Child Radio components. These will receive the name attribute passed to Radiogroup. */
	children: PropTypes.node	
}

RadioGroup.defaultProps = {
	name: null,
	className: "",
	required: null,
	label: null,
	selected: "",
	disabled: false,
}
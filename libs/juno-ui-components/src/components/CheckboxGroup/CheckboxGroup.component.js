import React, { useState, useEffect, useMemo, createContext, useId } from "react"
import PropTypes from "prop-types"
import { Label } from "../Label/index.js"
import { Icon } from "../Icon/index"
import { FormHint } from "../FormHint/index"


export const CheckboxGroupContext = createContext()

export const CheckboxGroup = ({
  children,
  disabled,
  id,
  label,
  name,
  onChange,
  selected,
  ...props
}) => {
  
  // Utility
  const isNotEmptyString = (str) => {
    return !(typeof str === 'string' && str.trim().length === 0)
  }
  
  const uniqueId = () => (
    "juno-checkboxgroup-" + useId()
  )
  
  // Create unique identifiers for use with name and id of the group:
  const groupName = name || uniqueId()
  const groupId = id || uniqueId()
  
  // Init state variables:
  const [selectedOptions, setSelectedOptions] = useState(selected) // undefined, empty array or array of values
  
  useEffect(() => {
    if (selected) {
      setSelectedOptions(selected)
    }
  }, [selected])

  // Callback function to be passed via context to individual checkboxes:
  const handleCheckboxChange = (value) => {
    const changedValue = value
    if (selectedOptions && selectedOptions.includes(value)) {
      setSelectedOptions( selectedOptions.filter((value) => {return value !== changedValue}) )
    } else if (selectedOptions && !selectedOptions.includes(value)) {
      setSelectedOptions( (selectedOptions) => [...selectedOptions, changedValue] )
    } else {
      setSelectedOptions([changedValue])
    }
    onChange && onChange(value)
  }
  
  // Callback function to be passed via the context to child Checkboxes so they can add their value to the groups' selectedOptions array in case selected has not been set on the parent (otherwise the parent select will trump whatever is set on the child in a group context). Called ONLY ONCE during initialization of the child Checkbox when we DON't want to execute any additional onChange handlers just yet:
  const updateSelectedValue = (value) => {
    if (!selected) {
      setSelectedOptions( (selectedOptions) => [...selectedOptions || [], value] )
    }
  }
  
  return (
    <CheckboxGroupContext.Provider
      value={
        {
          selectedOptions: selectedOptions,
          name: groupName,
          disabled: disabled,
          handleCheckboxChange: handleCheckboxChange,
          updateSelectedValue: updateSelectedValue,
        }
      }
    >
      <div>
        <div>
          { children }
        </div>
        <p>
          selectedOptions: {selectedOptions}
        </p>
      </div>
    </CheckboxGroupContext.Provider>
  )
  
}

CheckboxGroup.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  /** Array of values of individual selected options in the group */
  selected: PropTypes.array,
}

CheckboxGroup.defaultProps = {
  children: null,
  disabled: false,
  id: "",
  label: undefined,
  name: "",
  onChange: undefined,
  selected: undefined,
}


///----------------------------------------------------------------------------------------------------------

// const checkboxgroupstyles = `
// 	jn-mb-4
// 	jn-last:mb-0
// `
// 
// const checkboxgrouplabelstyles = `
// 	jn-inline-block
// 	jn-mb-1
// `
// 
// const groupstyles = `
// 	jn-relative
// 	jn-rounded
// 	jn-border
// 	jn-py-1
// `
// 
// const defaultgroupstyles = `
// 	jn-border-transparent
// `
// 
// const validgroupstyles = `
// 	jn-border-theme-success
// 	jn-px-2
// `
// 
// const invalidgroupstyles = `
// 	jn-border-theme-error
// 	jn-px-2
// `
// 
// const errortextstyles = `
// 	jn-text-xs
// 	jn-text-theme-error
// 	jn-mb-2
// `
// 
// const successtextstyles = `
// 	jn-text-xs
// 	jn-text-theme-success
// 	jn-mb-2
// `
// 
// const iconstyles = `
// 	jn-absolute
// 	jn-right-2
// 	jn-top-1.5
// `
// 
// /**
// A component to semantically group Checkboxes together. All Checkboxes inside the CheckboxGroup will share the same 'name' attribute.
// */
// export const CheckboxGroup = ({
//   name,
//   id,
//   label,
//   selected,
//   required,
//   disabled,
//   valid,
//   invalid,
//   helptext,
//   errortext,
//   successtext,
//   children,
//   className,
//   ...props
// }) => {
//   
//   const isNotEmptyString = (str) => {
//     return !(typeof str === 'string' && str.trim().length === 0)
//   }
//   
//   const [selectedOptions, setSelectedOptions] = useState([])
//   const [isValid, setIsValid] = useState(false)
//   const [isInvalid, setIsInvalid] = useState(false)
// 
//   const validated = useMemo(
//     () => valid || (successtext && successtext.length ? true : false),
//     [valid, successtext]
//   )
//   const invalidated = useMemo(
//     () => invalid || (errortext && errortext.length ? true : false),
//     [invalid, errortext]
//   )
// 
//   useEffect(() => {
//     setSelectedOptions(selected)
//   }, [selected])
// 
//   useEffect(() => {
//     setIsValid(validated)
//   }, [validated])
// 
//   useEffect(() => {
//     setIsInvalid(invalidated)
//   }, [invalidated])
// 
//   const handleCheckboxChange = (event) => {
//     const changedValue = event.target.value
//     const exists = selectedOptions.includes(changedValue)
//     if (exists) {
//       // remove element if it was the previously selected element…
//       setSelectedOptions(
//         selectedOptions.filter((value) => {
//           return value !== changedValue
//         })
//       )
//     } else {
//       // …otherwise add element
//       setSelectedOptions((selectedOptions) => [
//         ...selectedOptions,
//         changedValue,
//       ])
//     }
//   }
// 
//   const namedChildren = () => {
//     return React.Children.map(children, (child) => {
//       const isSelected = selectedOptions.includes(child.props.value)
//       return React.cloneElement(child, {
//         name: name,
//         className: className,
//         disabled: disabled,
//         checked: isSelected,
//         onChange: handleCheckboxChange,
//       })
//     })
//   }
// 
//   return (
//     <div
//       role="group"
//       className={`juno-checkbox-group ${
//         isValid ? "juno-checkbox-group-valid" : ""
//       } ${
//         isInvalid ? "juno-checkbox-group-invalid" : ""
//       } ${checkboxgroupstyles} ${className}`}
//       {...props}
//     >
//       {
//         label && isNotEmptyString(label) ?
//           <Label 
//             text={label}
//             htmlFor={id}
//             disabled={disabled}
//             required={required}
//           />
//         :
//           ""
//       }
//       <div
//         className={`juno-checkbox-group-options ${groupstyles} ${
//           isValid ? validgroupstyles : ""
//         } ${isInvalid ? invalidgroupstyles : ""} ${
//           isValid || isInvalid ? "" : defaultgroupstyles
//         }`}
//       >
//         {isInvalid ? (
//           <Icon
//             icon="dangerous"
//             color="jn-text-theme-error"
//             className={`${iconstyles}`}
//           />
//         ) : null}
//         {isValid ? (
//           <Icon
//             icon="checkCircle"
//             color="jn-text-theme-success"
//             className={`${iconstyles}`}
//           />
//         ) : null}
//         {namedChildren()}
//       </div>
//       { errortext && isNotEmptyString(errortext) ?
//           <FormHint text={errortext} variant="error" />
//         :
//           ""
//       }
//       { successtext && isNotEmptyString(successtext) ?
//           <FormHint text={successtext} variant="success" />
//         :
//           ""
//       }
//       { helptext && isNotEmptyString(helptext) ?
//           <FormHint text={helptext} />
//         :
//           ""
//        }
//     </div>
//   )
// }
// 
// CheckboxGroup.propTypes = {
//   /** Name attribute. Checkboxes within the group will have this name attribute */
//   name: PropTypes.string,
//   /** The id of the group as a whole */
//   id: PropTypes.string,
//   /** Label for the groupd as a whole */
//   label: PropTypes.string,
//   /** Array of values of individual selected options in the group */
//   selected: PropTypes.array,
//   /** Whether a selection in the group is required */
//   required: PropTypes.bool,
//   /** Disable the whole group */
//   disabled: PropTypes.bool,
//   /** Whether the CheckboxGroup is invalid */
//   invalid: PropTypes.bool,
//   /** Text to display in case validation failed. Will sett the whole group to invalid when passed. */
//   errortext: PropTypes.string,
//   /** Whether the CheckboxGroup is valid */
//   valid: PropTypes.bool,
//   /** A text to render to further explain meaning and significance of the group */
//   helptext: PropTypes.node,
//   /** Text to display in case validation is successful. When passed, will set the whole group to valid. */
//   successtext: PropTypes.node,
//   /** Text to display in case validation is unsuccessful. When passed, will set the whole group to invalid. */
//   errortext: PropTypes.node,
//   /** Custom class to be passed to the individual checkboxes of the group */
//   className: PropTypes.string,
//   /** Child checkbox components */
//   children: PropTypes.node,
// }
// 
// CheckboxGroup.defaultProps = {
//   name: "",
//   id: "",
//   className: "",
//   label: "",
//   required: false,
//   selected: [],
//   disabled: false,
//   invalid: false,
//   helptext: "",
//   errortext: "",
//   valid: false,
//   successtext: "",
//   children: null,
// }

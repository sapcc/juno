import React, { useState, useEffect, useMemo, createContext } from "react"
import PropTypes from "prop-types"
import { Label } from "../Label/index.js"
import { Icon } from "../Icon/index"
import { FormHint } from "../FormHint/index"

const radiogroupstyles = `
	jn-mb-4
	last:jn-mb-0
`

const radiogrouplabelstyles = `
	jn-inline-block
	jn-mb-1
`

const groupstyles = `
	jn-relative
	jn-rounded
	jn-border
	jn-py-1
`

const defaultgroupstyles = `
	jn-border-transparent
`

const validgroupstyles = `
	jn-border-theme-success
	jn-px-2
`

const invalidgroupstyles = `
	jn-border-theme-error
	jn-px-2
`

const errortextstyles = `
	jn-text-xs
	jn-text-theme-error
	jn-mb-2
`

const successtextstyles = `
	jn-text-xs
	jn-text-theme-success
	jn-mb-2
`

const iconstyles = `
	jn-absolute
	jn-right-2
	jn-top-1.5
`

export const RadioGroupContext = createContext()

/**
A component to wrap and group individual Radio components: All contained child Radio elements will share the same `name`-attribute passed as a prop to the group, and thus make the Radios work with each other as expected.
*/
export const RadioGroup = ({
  children,
  className,
  disabled,
  errortext,
  helptext,
  id,
  invalid,
  label,
  name,
  onChange,
  required,
  selected,
  successtext,
  valid,
  ...props
}) => {
  
  // Utility
  const isNotEmptyString = (str) => {
    return !(typeof str === 'string' && str.trim().length === 0)
  }
  
  const [selectedValue, setSelectedValue] = useState(selected)
  const [isValid, setIsValid] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  
  // Validate / Invalidate the RadioGroup based on the respective props: 
  const validated = useMemo(
    () => valid || (successtext && successtext.length ? true : false),
    [valid, successtext]
  )
  const invalidated = useMemo(
    () => invalid || (errortext && errortext.length ? true : false),
    [invalid, errortext]
  )
  
  useEffect(() => {
    setIsValid(validated)
  }, [validated])

  useEffect(() => {
    setIsInvalid(invalidated)
  }, [invalidated])
  
  // Update selectedValue when selected prop changes:
  useEffect(() => {
    if (selected) {
      setSelectedValue(selected)
    }
  }, [selected])
  
  // Callback function to be passed via the group context to child Radios so they can set the value on the parent if necessary (only used ONCE during initialisation when we don't want to trigger onChange handlers yet):
  const updateSelectedValue = (value) => {
    setSelectedValue(value)
  }
  
  // Handler to be passed to child Radios to execute when they change
  const handleRadioChange = (value) => {
    setSelectedValue(value)
    onChange && onChange(value)
  }
  
  return (
    // span a context to provide the selected value from the group state, the name, and the parent group methods to update the parent state, etc.: 
    <RadioGroupContext.Provider
      value={{
        selectedValue: selectedValue,
        name: name,
        onChange: handleRadioChange,
        updateSelectedValue: updateSelectedValue,
        disabled: disabled,
      }}
    >
      <div
        className={`
          juno-radiogroup 
          ${ radiogroupstyles } 
          ${ isValid ? "juno-radiogroup-valid" : "" } 
          ${isInvalid ? "juno-radiogroup-invalid" : ""} 
          ${className}
        `}
        id={id}
        role="radiogroup"
        {...props}
      >
        {
          label && isNotEmptyString(label) ?
            <Label 
              text={label}
              htmlFor={id}
              disabled={disabled}
              required={required}
            />
          :
            ""
        }
        <div
          className={`
            juno-checkbox-group-options 
            ${ groupstyles } 
            ${ isValid ? validgroupstyles : "" } 
            ${isInvalid ? invalidgroupstyles : ""} 
            ${ isValid || isInvalid ? "" : defaultgroupstyles }
          `}
        >
          {isInvalid ? 
            <Icon
              icon="dangerous"
              color="jn-text-theme-error"
              className={`${iconstyles}`}
            />
          : 
            ""
          }
          {isValid ? 
            <Icon
              icon="checkCircle"
              color="jn-text-theme-success"
              className={`${iconstyles}`}
            />
          : 
            ""
          }
          { children }
        </div>
        { errortext && isNotEmptyString(errortext) ?
            <FormHint text={errortext} variant="error" />
          :
            ""
        }
        { successtext && isNotEmptyString(successtext) ?
            <FormHint text={successtext} variant="success" />
          :
            ""
        }
        { helptext && isNotEmptyString(helptext) ?
            <FormHint text={helptext} />
          :
            ""
         }
      </div>
    </RadioGroupContext.Provider>
  )
  
}

RadioGroup.propTypes = {
  /** The children of the RadioGroup. Typically, these will be `Radio` components. */
  children: PropTypes.node,
  /** Pass a custom className */
  className: PropTypes.string,
  /** Whether all Radios in the group are disabled */
  disabled: PropTypes.bool,
  /** The id of the group */
  id: PropTypes.string,
  /** Label for the group of radios as a whole. Passing a label is mandatory in order to denote a selection in the set is required by passing the `required` prop. */
  label: PropTypes.string,
  /** The name of all radios in a group. */
  name: PropTypes.string,
  /** An onChange handler to execute when the selected option changes */ 
  onChange: PropTypes.func,
  /** Whether a selection on the RadioGroup is required */
  required: PropTypes.bool,
  /** The value of the initially selected radio. This will override 'checked' set on any of the child radio elements. */
  selected: PropTypes.string,
}

RadioGroup.defaultProps = {
  children: null,
  className: "",
  disabled: false,
  id: "",
  label: "",
  name: undefined,
  onChange: undefined,
  required: false,
  selected: undefined,
}

// ----------------------------------------------------------------------------------------------------

// const radiogroupstyles = `
// 	jn-mb-4
// 	last:jn-mb-0
// `
// 
// const radiogrouplabelstyles = `
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
// A component to semantically and functionally group individual RadioRows: All contained child RadioRows will share the same `name`-attribute passed as a prop to the group, and thus make the Radios work with each other as expected.
// */
// 
// export const RadioGroup = ({
//   name,
//   id,
//   label,
//   selected,
//   required,
//   disabled,
//   valid,
//   helptext,
//   successtext,
//   invalid,
//   errortext,
//   children,
//   className,
//   ...props
// }) => {
//   
//   const isNotEmptyString = (str) => {
//     return !(typeof str === 'string' && str.trim().length === 0)
//   }
//   
//   const [selectedOption, setSelectedOption] = useState("")
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
//     setSelectedOption(selected)
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
//   const handleRadioChange = (event) => {
//     setSelectedOption(event.target.value)
//   }
// 
//   const namedChildren = () => {
//     return React.Children.map(children, (child) => {
//       let checkedOption = false
//       if (selectedOption) {
//         // if parent has selectedOption, oarent wins.
//         checkedOption = selectedOption === child.props.value
//       } else if (child.props.checked) {
//         //otherwise last checked option wins
//         checkedOption = true
//         // update state accordingly
//         setSelectedOption(child.props.value)
//       }
//       // clone element, set name and checked acc. to above logic:
//       return React.cloneElement(child, {
//         name: name,
//         className: className,
//         onChange: handleRadioChange,
//         checked: checkedOption,
//         disabled: disabled,
//       })
//     })
//   }
// 
//   return (
//     <div
//       role="radiogroup"
//       className={`juno-radiogroup ${radiogroupstyles} ${
//         isValid ? "juno-radiogroup-valid" : ""
//       } ${isInvalid ? "juno-radiogroup-invalid" : ""}${className}`}
//       onChange={namedChildren}
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
// RadioGroup.propTypes = {
//   /** Name attribute. Radios within the group using the same name will work together as mutually exclusive options. */
//   name: PropTypes.string.isRequired,
//   /** Id for the group of radios */
//   id: PropTypes.string,
//   /** Label for the group of radios as a whole. Mandatory if you want to denote a selection in the set is required. */
//   label: PropTypes.string,
//   /** The value of the selected option */
//   selected: PropTypes.string,
//   /** Specify whether a selection of one of the options is required */
//   required: PropTypes.bool,
//   /** Disable a RadioGroup */
//   disabled: PropTypes.bool,
//   /** Whether the RadioGroup is invalid */
//   invalid: PropTypes.bool,
//   /** A text to render to further explain meaning and significance of the group */
//   helptext: PropTypes.node,
//   /** Text to display in case validation failed. Will set the whole group to invalid when passed. */
//   errortext: PropTypes.node,
//   /** Whether the RadioGroup is valid */
//   valid: PropTypes.bool,
//   /** Text to display in case validation is successful. When passed, will set the whole group to valid. */
//   successtext: PropTypes.node,
//   /** Pass a custom class to apply to the individual Radios of the group */
//   className: PropTypes.string,
//   /** Child Radio components. These will receive the name attribute passed to RadioGroup. */
//   children: PropTypes.node,
// }
// 
// RadioGroup.defaultProps = {
//   name: null,
//   id: "",
//   className: "",
//   required: null,
//   label: null,
//   selected: "",
//   disabled: false,
//   valid: false,
//   helptext: "",
//   successtext: "",
//   invalid: false,
//   errortext: "",
//   className: "",
// }

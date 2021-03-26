import React from "react"
import PropTypes from "prop-types"
import tw, { styled } from "twin.macro"

const FloatingLabelContainer = styled.div`
  ${tw`relative`}
  &>input::placeholder {
    color: transparent;
  }

  & > input:focus,
  & > input:not(:placeholder-shown) {
    ${tw`pt-8`}
  }

  & > input:focus ~ label,
  & > input:not(:placeholder-shown) ~ label {
    ${tw`opacity-75 scale-75 -translate-y-3 translate-x-1`};
  }
`

/**
 * Form input field with floating label
 */
export const FloatingLabelInput = ({ type, label, name, value, onChange }) => (
  <FloatingLabelContainer>
    <input
      type={type || "text"}
      tw="border focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm border-gray-300 w-full p-3 h-16"
      placeholder={label || "Label"}
      value={value || ""}
      name={name || label}
      onChange={onChange}
      autoComplete="off"
    />
    <label
      htmlFor={name || label}
      tw="absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
    >
      {label}
    </label>
  </FloatingLabelContainer>
)

FloatingLabelInput.propTypes = {
  /**
   * type of the input
   */
  type: PropTypes.oneOf(["text", "password", "number"]),
  /**
   * label of the input
   */
  label: PropTypes.string,
  /**
   * input name (optional)
   */
  name: PropTypes.string,
  /**
   * value of the input
   */
  value: PropTypes.string,
  /**
   * onChange handler
   */
  onChange: PropTypes.func,
}

FloatingLabelInput.defaultProps = {
  type: "text",
  label: "Label",
  name: "test",
  value: "",
  onChange: (e) => {
    alert("onChange is not implemented")
  },
}

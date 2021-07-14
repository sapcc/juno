import React from "react"
import PropTypes from "prop-types"

// const FloatingLabelContainer = styled.div`
//   position: relative;
//   color: rgba(75, 85, 99, 1);

//   & > input::placeholder {
//     color: transparent;
//   }
//   & > input:focus,
//   & > input:not(:placeholder-shown) {
//     padding-top: 2rem;
//   }
//   & > input:focus ~ label,
//   & > input:not(:placeholder-shown) ~ label {
//     opacity: 0.75;
//     --tw-scale-x: 0.75;
//     --tw-scale-y: 0.75;
//     --tw-translate-y: -0.75rem;
//     --tw-translate-x: 0.25rem;
//   }
// `

/**
 * Form input field with floating label
 */
export const FloatingLabelInput = ({
  type,
  label,
  name,
  value,
  onChange,
  onKeyPress,
}) => (
  <div className="floating-label-container">
    <input
      type={type || "text"}
      className="border focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm border-gray-300 w-full p-3 h-16"
      placeholder={label || "Label"}
      value={value || ""}
      name={name || label}
      onChange={onChange}
      onKeyPress={onKeyPress}
      autoComplete="off"
    />
    <label
      htmlFor={name || label}
      className="absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out "
    >
      {label}
    </label>
  </div>
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
    console.log("onChange is not implemented")
  },
}

import React from "react"
import PropTypes from "prop-types"
import tw from "twin.macro"

export const FloatingLabelSelect = ({
  label,
  children,
  name,
  value,
  onChange,
}) => (
  <div tw="relative">
    <select
      tw="border focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm border-gray-300 w-full p-3 h-16 pt-8"
      name={name || label}
      onChange={onChange}
      value={value}
    >
      {children}
    </select>
    <label
      htmlFor={name || label}
      tw="absolute top-0 left-0 px-3 py-5 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out opacity-75 scale-75 -translate-y-3 translate-x-1"
    >
      {label}
    </label>
  </div>
)

FloatingLabelSelect.propTypes = {
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
  /**
   * options array
   */
  children: PropTypes.array,
}

FloatingLabelSelect.defaultProps = {
  label: "Label",
  name: "select",
  value: "test",
  onChange: (e) => {
    alert("onChange is not implemented")
  },
}

import { _ as _objectWithoutProperties, a as _extends } from './_rollupPluginBabelHelpers-a2ce5f9f.js';
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Primary UI component for user interaction
 */

var Button = function Button(_ref) {
  var primary = _ref.primary,
      backgroundColor = _ref.backgroundColor;
      _ref.size;
      var label = _ref.label,
      props = _objectWithoutProperties(_ref, ["primary", "backgroundColor", "size", "label"]);

  var mode = primary ? "storybook-button--primary" : "storybook-button--secondary";
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: ["btn-custom mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm", mode].join(" "),
    style: backgroundColor && {
      backgroundColor: backgroundColor
    }
  }, props), label);
};
Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,

  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,

  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),

  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,

  /**
   * Optional click handler
   */
  onClick: PropTypes.func
};
Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: "medium",
  onClick: undefined
};

export { Button };

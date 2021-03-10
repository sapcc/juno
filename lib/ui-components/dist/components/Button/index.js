"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _react = _interopRequireDefault(require("react"));

require("../../assets/styles/main.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var btn = {
  "width": "100%",
  "display": "inline-flex",
  "justifyContent": "center",
  "borderRadius": "0.375rem",
  "borderWidth": "1px",
  "--tw-shadow": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  "boxShadow": "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
  "paddingLeft": "1rem",
  "paddingRight": "1rem",
  "paddingTop": "0.5rem",
  "paddingBottom": "0.5rem",
  "fontSize": "1rem",
  "lineHeight": "1.5rem",
  "fontWeight": "500",
  ":focus": {
    "outline": "2px solid transparent",
    "outlineOffset": "2px",
    "--tw-ring-offset-shadow": "var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)",
    "--tw-ring-shadow": "var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)",
    "boxShadow": "var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)",
    "--tw-ring-offset-width": "2px"
  },
  "@media (min-width: 640px)": {
    "fontSize": "0.875rem",
    "lineHeight": "1.25rem",
    "marginLeft": "0.75rem",
    "width": "auto"
  }
};
var btnDanger = {
  ":focus": {
    "--tw-ring-opacity": "1",
    "--tw-ring-color": "rgba(239, 68, 68, var(--tw-ring-opacity))"
  },
  "--tw-text-opacity": "1",
  "color": "rgba(255, 255, 255, var(--tw-text-opacity))",
  ":hover": {
    "--tw-bg-opacity": "1",
    "backgroundColor": "rgba(185, 28, 28, var(--tw-bg-opacity))"
  },
  "--tw-bg-opacity": "1",
  "backgroundColor": "rgba(220, 38, 38, var(--tw-bg-opacity))",
  "borderColor": "transparent"
};
var btnDefault = {
  ":focus": {
    "--tw-ring-opacity": "1",
    "--tw-ring-color": "rgba(99, 102, 241, var(--tw-ring-opacity))"
  },
  "--tw-text-opacity": "1",
  "color": "rgba(55, 65, 81, var(--tw-text-opacity))",
  ":hover": {
    "--tw-bg-opacity": "1",
    "backgroundColor": "rgba(249, 250, 251, var(--tw-bg-opacity))"
  },
  "--tw-bg-opacity": "1",
  "backgroundColor": "rgba(255, 255, 255, var(--tw-bg-opacity))",
  "--tw-border-opacity": "1",
  "borderColor": "rgba(209, 213, 219, var(--tw-border-opacity))"
};

var _StyledButton = (0, _styledComponents["default"])("button").withConfig({
  displayName: "Button___StyledButton",
  componentId: "odr4p5-0"
})(["", ""], function (p) {
  return p._css;
});

var _default = function _default(_ref) {
  var onClick = _ref.onClick,
      children = _ref.children,
      danger = _ref.danger;
  return /*#__PURE__*/_react["default"].createElement(_StyledButton, {
    type: "button",
    onClick: onClick,
    _css: [btn, danger ? btnDanger : btnDefault]
  }, children);
};

exports["default"] = _default;
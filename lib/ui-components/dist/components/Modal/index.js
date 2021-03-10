"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("../Button"));

require("../../assets/styles/main.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var BackgroundOverlay = _styledComponents["default"].div.withConfig({
  displayName: "Modal__BackgroundOverlay",
  componentId: "sc-9kzv33-0"
})(function (_ref) {
  var isActive = _ref.isActive;
  return [{
    "position": "fixed",
    "top": "0px",
    "right": "0px",
    "bottom": "0px",
    "left": "0px",
    "transitionProperty": "opacity",
    "transitionTimingFunction": "cubic-bezier(0.4, 0, 0.2, 1)",
    "transitionDuration": "150ms"
  }, isActive ? {
    "opacity": "1"
  } : {
    "opacity": "0"
  }];
});

var ModalHolder = _styledComponents["default"].div.withConfig({
  displayName: "Modal__ModalHolder",
  componentId: "sc-9kzv33-1"
})({
  "position": "fixed",
  "zIndex": "10",
  "top": "0px",
  "right": "0px",
  "bottom": "0px",
  "left": "0px",
  "overflowY": "auto"
});

var ModalContainer = _styledComponents["default"].div.withConfig({
  displayName: "Modal__ModalContainer",
  componentId: "sc-9kzv33-2"
})({
  "display": "flex",
  "alignItems": "flex-end",
  "justifyContent": "center",
  "minHeight": "100vh",
  "paddingTop": "1rem",
  "paddingLeft": "1rem",
  "paddingRight": "1rem",
  "paddingBottom": "5rem",
  "textAlign": "center",
  "@media (min-width: 640px)": {
    "display": "block",
    "padding": "0px"
  }
});

var Modal = _styledComponents["default"].div.withConfig({
  displayName: "Modal",
  componentId: "sc-9kzv33-3"
})(function (_ref2) {
  var isOpen = _ref2.isOpen;
  return [{
    "transitionProperty": "all",
    "transitionTimingFunction": "cubic-bezier(0.4, 0, 0.2, 1)",
    "transitionDuration": "150ms",
    "display": "inline-block",
    "verticalAlign": "bottom",
    "--tw-bg-opacity": "1",
    "backgroundColor": "rgba(255, 255, 255, var(--tw-bg-opacity))",
    "borderRadius": "0.5rem",
    "textAlign": "left",
    "overflow": "hidden",
    "--tw-shadow": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "boxShadow": "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
    "--tw-translate-x": "0",
    "--tw-translate-y": "0",
    "--tw-rotate": "0",
    "--tw-skew-x": "0",
    "--tw-skew-y": "0",
    "--tw-scale-x": "1",
    "--tw-scale-y": "1",
    "transform": "translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
    "@media (min-width: 640px)": {
      "marginTop": "2rem",
      "marginBottom": "2rem",
      "verticalAlign": "middle",
      "maxWidth": "32rem",
      "width": "100%"
    }
  }, isOpen ? "opacity-100" : "opacity-0"];
});

var _default = function _default(_ref3) {
  var isOpen = _ref3.isOpen,
      onClose = _ref3.onClose;

  var _React$useState = _react["default"].useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      visible = _React$useState2[0],
      setIsVisible = _React$useState2[1];

  _react["default"].useEffect(function () {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(function () {
        return setIsVisible(false);
      }, 150);
    }
  }, [isOpen]);

  if (!visible) return null;
  return /*#__PURE__*/_react["default"].createElement(ModalHolder, null, /*#__PURE__*/_react["default"].createElement(ModalContainer, null, /*#__PURE__*/_react["default"].createElement(BackgroundOverlay, {
    isActive: isOpen
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute inset-0 bg-gray-500 opacity-75"
  })), /*#__PURE__*/_react["default"].createElement("span", {
    className: "hidden sm:inline-block sm:align-middle sm:h-screen",
    "aria-hidden": "true"
  }, "\u200B"), /*#__PURE__*/_react["default"].createElement(Modal, {
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "modal-headline"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "sm:flex sm:items-start"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    className: "h-6 w-6 text-red-600",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "aria-hidden": "true"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "text-lg leading-6 font-medium text-gray-900",
    id: "modal-headline"
  }, "Deactivate account"), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mt-2"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "text-sm text-gray-500"
  }, "Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone."))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
  }, /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    danger: true,
    onClick: onClose
  }, "Deactivate"), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    onClick: onClose
  }, "Cancel")))));
};

exports["default"] = _default;
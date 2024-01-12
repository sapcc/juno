var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));

// external:/tmp/node_modules/react/jsx-runtime.js
var jsx_runtime_exports = {};
__reExport(jsx_runtime_exports, jsx_runtime_star);
import * as jsx_runtime_star from "/tmp/node_modules/react/jsx-runtime.js";
var export_Fragment = jsx_runtime_exports.Fragment;
var export_default = jsx_runtime_exports.default;
var export_jsx = jsx_runtime_exports.jsx;
var export_jsxs = jsx_runtime_exports.jsxs;
export {
  export_Fragment as Fragment,
  export_default as default,
  export_jsx as jsx,
  export_jsxs as jsxs
};

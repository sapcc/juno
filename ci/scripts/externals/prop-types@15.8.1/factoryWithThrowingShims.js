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

// external:/tmp/node_modules/prop-types/factoryWithThrowingShims.js
var factoryWithThrowingShims_exports = {};
__reExport(factoryWithThrowingShims_exports, factoryWithThrowingShims_star);
import * as factoryWithThrowingShims_star from "/tmp/node_modules/prop-types/factoryWithThrowingShims.js";
var export_default = factoryWithThrowingShims_exports.default;
export {
  export_default as default
};

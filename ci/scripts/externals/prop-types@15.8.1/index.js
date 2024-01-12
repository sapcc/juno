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

// external:/tmp/node_modules/prop-types/index.js
var prop_types_exports = {};
__reExport(prop_types_exports, prop_types_star);
import * as prop_types_star from "/tmp/node_modules/prop-types/index.js";
var export_PropTypes = prop_types_exports.PropTypes;
var export_any = prop_types_exports.any;
var export_array = prop_types_exports.array;
var export_arrayOf = prop_types_exports.arrayOf;
var export_bigint = prop_types_exports.bigint;
var export_bool = prop_types_exports.bool;
var export_checkPropTypes = prop_types_exports.checkPropTypes;
var export_default = prop_types_exports.default;
var export_element = prop_types_exports.element;
var export_elementType = prop_types_exports.elementType;
var export_exact = prop_types_exports.exact;
var export_func = prop_types_exports.func;
var export_instanceOf = prop_types_exports.instanceOf;
var export_node = prop_types_exports.node;
var export_number = prop_types_exports.number;
var export_object = prop_types_exports.object;
var export_objectOf = prop_types_exports.objectOf;
var export_oneOf = prop_types_exports.oneOf;
var export_oneOfType = prop_types_exports.oneOfType;
var export_resetWarningCache = prop_types_exports.resetWarningCache;
var export_shape = prop_types_exports.shape;
var export_string = prop_types_exports.string;
var export_symbol = prop_types_exports.symbol;
export {
  export_PropTypes as PropTypes,
  export_any as any,
  export_array as array,
  export_arrayOf as arrayOf,
  export_bigint as bigint,
  export_bool as bool,
  export_checkPropTypes as checkPropTypes,
  export_default as default,
  export_element as element,
  export_elementType as elementType,
  export_exact as exact,
  export_func as func,
  export_instanceOf as instanceOf,
  export_node as node,
  export_number as number,
  export_object as object,
  export_objectOf as objectOf,
  export_oneOf as oneOf,
  export_oneOfType as oneOfType,
  export_resetWarningCache as resetWarningCache,
  export_shape as shape,
  export_string as string,
  export_symbol as symbol
};

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../../tmp/node_modules/zustand/shallow.js
var require_shallow = __commonJS({
  "../../../tmp/node_modules/zustand/shallow.js"(exports, module) {
    "use strict";
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    __name(_unsupportedIterableToArray, "_unsupportedIterableToArray");
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++)
        arr2[i] = arr[i];
      return arr2;
    }
    __name(_arrayLikeToArray, "_arrayLikeToArray");
    function _createForOfIteratorHelperLoose(o, allowArrayLike) {
      var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
      if (it)
        return (it = it.call(o)).next.bind(it);
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it)
          o = it;
        var i = 0;
        return function() {
          if (i >= o.length)
            return {
              done: true
            };
          return {
            done: false,
            value: o[i++]
          };
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    __name(_createForOfIteratorHelperLoose, "_createForOfIteratorHelperLoose");
    function shallow$1(objA, objB) {
      if (Object.is(objA, objB)) {
        return true;
      }
      if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
        return false;
      }
      if (objA instanceof Map && objB instanceof Map) {
        if (objA.size !== objB.size)
          return false;
        for (var _iterator = _createForOfIteratorHelperLoose(objA), _step; !(_step = _iterator()).done; ) {
          var _step$value = _step.value, key = _step$value[0], value = _step$value[1];
          if (!Object.is(value, objB.get(key))) {
            return false;
          }
        }
        return true;
      }
      if (objA instanceof Set && objB instanceof Set) {
        if (objA.size !== objB.size)
          return false;
        for (var _iterator2 = _createForOfIteratorHelperLoose(objA), _step2; !(_step2 = _iterator2()).done; ) {
          var _value = _step2.value;
          if (!objB.has(_value)) {
            return false;
          }
        }
        return true;
      }
      var keysA = Object.keys(objA);
      if (keysA.length !== Object.keys(objB).length) {
        return false;
      }
      for (var i = 0; i < keysA.length; i++) {
        if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
          return false;
        }
      }
      return true;
    }
    __name(shallow$1, "shallow$1");
    var shallow2 = /* @__PURE__ */ __name(function(objA, objB) {
      if (true) {
        console.warn("[DEPRECATED] Default export is deprecated. Instead use `import { shallow } from 'zustand/shallow'`.");
      }
      return shallow$1(objA, objB);
    }, "shallow");
    exports.default = shallow2;
    exports.shallow = shallow$1;
    module.exports = shallow2;
    module.exports.shallow = shallow$1;
    exports.default = module.exports;
  }
});

// c2e:/tmp/node_modules/zustand/shallow.js
var import_shallow = __toESM(require_shallow());
var export_default = import_shallow.default;
var export_shallow = import_shallow.shallow;
export {
  export_default as default,
  export_shallow as shallow
};

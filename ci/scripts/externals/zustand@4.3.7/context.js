var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// external:react
var react_exports = {};
import * as react_star from "react";
var init_react = __esm({
  "external:react"() {
    __reExport(react_exports, react_star);
  }
});

// external:zustand
var zustand_exports = {};
import * as zustand_star from "zustand";
var init_zustand = __esm({
  "external:zustand"() {
    __reExport(zustand_exports, zustand_star);
  }
});

// ../../../tmp/node_modules/zustand/context.js
var require_context = __commonJS({
  "../../../tmp/node_modules/zustand/context.js"(exports, module) {
    "use strict";
    var react = (init_react(), __toCommonJS(react_exports));
    var zustand = (init_zustand(), __toCommonJS(zustand_exports));
    function _extends() {
      _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    __name(_extends, "_extends");
    function createContext() {
      if (true) {
        console.warn("[DEPRECATED] `context` will be removed in a future version. Instead use `import { createStore, useStore } from 'zustand'`. See: https://github.com/pmndrs/zustand/discussions/1180.");
      }
      var ZustandContext = react.createContext(void 0);
      var Provider = /* @__PURE__ */ __name(function Provider2(_ref) {
        var createStore = _ref.createStore, children = _ref.children;
        var storeRef = react.useRef();
        if (!storeRef.current) {
          storeRef.current = createStore();
        }
        return react.createElement(ZustandContext.Provider, {
          value: storeRef.current
        }, children);
      }, "Provider");
      var useContextStore = /* @__PURE__ */ __name(function useContextStore2(selector, equalityFn) {
        var store = react.useContext(ZustandContext);
        if (!store) {
          throw new Error("Seems like you have not used zustand provider as an ancestor.");
        }
        return zustand.useStore(store, selector, equalityFn);
      }, "useContextStore");
      var useStoreApi = /* @__PURE__ */ __name(function useStoreApi2() {
        var store = react.useContext(ZustandContext);
        if (!store) {
          throw new Error("Seems like you have not used zustand provider as an ancestor.");
        }
        return react.useMemo(function() {
          return _extends({}, store);
        }, [store]);
      }, "useStoreApi");
      return {
        Provider,
        useStore: useContextStore,
        useStoreApi
      };
    }
    __name(createContext, "createContext");
    module.exports = createContext;
  }
});

// c2e:/tmp/node_modules/zustand/context.js
var import_context = __toESM(require_context());
var export_default = import_context.default;
export {
  export_default as default
};

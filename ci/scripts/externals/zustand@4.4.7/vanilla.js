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

// ../../../tmp/node_modules/zustand/vanilla.js
var require_vanilla = __commonJS({
  "../../../tmp/node_modules/zustand/vanilla.js"(exports, module) {
    "use strict";
    var createStoreImpl = /* @__PURE__ */ __name(function createStoreImpl2(createState) {
      var state;
      var listeners = /* @__PURE__ */ new Set();
      var setState = /* @__PURE__ */ __name(function setState2(partial, replace) {
        var nextState = typeof partial === "function" ? partial(state) : partial;
        if (!Object.is(nextState, state)) {
          var _previousState = state;
          state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
          listeners.forEach(function(listener) {
            return listener(state, _previousState);
          });
        }
      }, "setState");
      var getState = /* @__PURE__ */ __name(function getState2() {
        return state;
      }, "getState");
      var subscribe = /* @__PURE__ */ __name(function subscribe2(listener) {
        listeners.add(listener);
        return function() {
          return listeners.delete(listener);
        };
      }, "subscribe");
      var destroy = /* @__PURE__ */ __name(function destroy2() {
        if (true) {
          console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.");
        }
        listeners.clear();
      }, "destroy");
      var api = {
        setState,
        getState,
        subscribe,
        destroy
      };
      state = createState(setState, getState, api);
      return api;
    }, "createStoreImpl");
    var createStore2 = /* @__PURE__ */ __name(function createStore3(createState) {
      return createState ? createStoreImpl(createState) : createStoreImpl;
    }, "createStore");
    var vanilla = /* @__PURE__ */ __name(function(createState) {
      if (true) {
        console.warn("[DEPRECATED] Default export is deprecated. Instead use import { createStore } from 'zustand/vanilla'.");
      }
      return createStore2(createState);
    }, "vanilla");
    exports.createStore = createStore2;
    exports.default = vanilla;
    module.exports = vanilla;
    module.exports.createStore = createStore2;
    exports.default = module.exports;
  }
});

// c2e:/tmp/node_modules/zustand/vanilla.js
var import_vanilla = __toESM(require_vanilla());
var export_createStore = import_vanilla.createStore;
var export_default = import_vanilla.default;
export {
  export_createStore as createStore,
  export_default as default
};

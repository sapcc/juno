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

// ../../../tmp/node_modules/custom-event-polyfill/polyfill.js
var require_polyfill = __commonJS({
  "../../../tmp/node_modules/custom-event-polyfill/polyfill.js"() {
    (function() {
      if (typeof window === "undefined") {
        return;
      }
      try {
        var ce = new window.CustomEvent("test", { cancelable: true });
        ce.preventDefault();
        if (ce.defaultPrevented !== true) {
          throw new Error("Could not prevent default");
        }
      } catch (e) {
        var CustomEvent = /* @__PURE__ */ __name(function(event, params) {
          var evt, origPrevent;
          params = params || {};
          params.bubbles = !!params.bubbles;
          params.cancelable = !!params.cancelable;
          evt = document.createEvent("CustomEvent");
          evt.initCustomEvent(
            event,
            params.bubbles,
            params.cancelable,
            params.detail
          );
          origPrevent = evt.preventDefault;
          evt.preventDefault = function() {
            origPrevent.call(this);
            try {
              Object.defineProperty(this, "defaultPrevented", {
                get: function() {
                  return true;
                }
              });
            } catch (e2) {
              this.defaultPrevented = true;
            }
          };
          return evt;
        }, "CustomEvent");
        CustomEvent.prototype = window.Event.prototype;
        window.CustomEvent = CustomEvent;
      }
    })();
  }
});

// c2e:/tmp/node_modules/custom-event-polyfill/polyfill.js
var import_polyfill = __toESM(require_polyfill());
var export_default = import_polyfill.default;
export {
  export_default as default
};

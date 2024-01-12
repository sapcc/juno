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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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

// ../../../tmp/node_modules/zustand/esm/vanilla.js
var vanilla_exports = {};
__export(vanilla_exports, {
  createStore: () => createStore,
  default: () => vanilla
});
var createStoreImpl, createStore, vanilla;
var init_vanilla = __esm({
  "../../../tmp/node_modules/zustand/esm/vanilla.js"() {
    createStoreImpl = /* @__PURE__ */ __name((createState) => {
      let state;
      const listeners = /* @__PURE__ */ new Set();
      const setState = /* @__PURE__ */ __name((partial, replace) => {
        const nextState = typeof partial === "function" ? partial(state) : partial;
        if (!Object.is(nextState, state)) {
          const previousState = state;
          state = (replace != null ? replace : typeof nextState !== "object") ? nextState : Object.assign({}, state, nextState);
          listeners.forEach((listener) => listener(state, previousState));
        }
      }, "setState");
      const getState = /* @__PURE__ */ __name(() => state, "getState");
      const subscribe = /* @__PURE__ */ __name((listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
      }, "subscribe");
      const destroy = /* @__PURE__ */ __name(() => {
        if (true) {
          console.warn(
            "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
          );
        }
        listeners.clear();
      }, "destroy");
      const api = { setState, getState, subscribe, destroy };
      state = createState(setState, getState, api);
      return api;
    }, "createStoreImpl");
    createStore = /* @__PURE__ */ __name((createState) => createState ? createStoreImpl(createState) : createStoreImpl, "createStore");
    vanilla = /* @__PURE__ */ __name((createState) => {
      if (true) {
        console.warn(
          "[DEPRECATED] Default export is deprecated. Instead use import { createStore } from 'zustand/vanilla'."
        );
      }
      return createStore(createState);
    }, "vanilla");
  }
});

// external:react
var react_exports = {};
import * as react_star from "react";
var init_react = __esm({
  "external:react"() {
    __reExport(react_exports, react_star);
  }
});

// ../../../tmp/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js
var require_use_sync_external_store_shim_development = __commonJS({
  "../../../tmp/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        }
        var React = (init_react(), __toCommonJS(react_exports));
        var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        function error(format) {
          {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
        }
        __name(error, "error");
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return String(item);
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        __name(printWarning, "printWarning");
        function is(x, y) {
          return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
        }
        __name(is, "is");
        var objectIs = typeof Object.is === "function" ? Object.is : is;
        var useState = React.useState, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue = React.useDebugValue;
        var didWarnOld18Alpha = false;
        var didWarnUncachedGetSnapshot = false;
        function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
          {
            if (!didWarnOld18Alpha) {
              if (React.startTransition !== void 0) {
                didWarnOld18Alpha = true;
                error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release.");
              }
            }
          }
          var value = getSnapshot();
          {
            if (!didWarnUncachedGetSnapshot) {
              var cachedValue = getSnapshot();
              if (!objectIs(value, cachedValue)) {
                error("The result of getSnapshot should be cached to avoid an infinite loop");
                didWarnUncachedGetSnapshot = true;
              }
            }
          }
          var _useState = useState({
            inst: {
              value,
              getSnapshot
            }
          }), inst = _useState[0].inst, forceUpdate = _useState[1];
          useLayoutEffect(function() {
            inst.value = value;
            inst.getSnapshot = getSnapshot;
            if (checkIfSnapshotChanged(inst)) {
              forceUpdate({
                inst
              });
            }
          }, [subscribe, value, getSnapshot]);
          useEffect(function() {
            if (checkIfSnapshotChanged(inst)) {
              forceUpdate({
                inst
              });
            }
            var handleStoreChange = /* @__PURE__ */ __name(function() {
              if (checkIfSnapshotChanged(inst)) {
                forceUpdate({
                  inst
                });
              }
            }, "handleStoreChange");
            return subscribe(handleStoreChange);
          }, [subscribe]);
          useDebugValue(value);
          return value;
        }
        __name(useSyncExternalStore, "useSyncExternalStore");
        function checkIfSnapshotChanged(inst) {
          var latestGetSnapshot = inst.getSnapshot;
          var prevValue = inst.value;
          try {
            var nextValue = latestGetSnapshot();
            return !objectIs(prevValue, nextValue);
          } catch (error2) {
            return true;
          }
        }
        __name(checkIfSnapshotChanged, "checkIfSnapshotChanged");
        function useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot) {
          return getSnapshot();
        }
        __name(useSyncExternalStore$1, "useSyncExternalStore$1");
        var canUseDOM = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
        var isServerEnvironment = !canUseDOM;
        var shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore;
        var useSyncExternalStore$2 = React.useSyncExternalStore !== void 0 ? React.useSyncExternalStore : shim;
        exports.useSyncExternalStore = useSyncExternalStore$2;
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
        }
      })();
    }
  }
});

// ../../../tmp/node_modules/use-sync-external-store/shim/index.js
var require_shim = __commonJS({
  "../../../tmp/node_modules/use-sync-external-store/shim/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_use_sync_external_store_shim_development();
    }
  }
});

// ../../../tmp/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js
var require_with_selector_development = __commonJS({
  "../../../tmp/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        }
        var React = (init_react(), __toCommonJS(react_exports));
        var shim = require_shim();
        function is(x, y) {
          return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
        }
        __name(is, "is");
        var objectIs = typeof Object.is === "function" ? Object.is : is;
        var useSyncExternalStore = shim.useSyncExternalStore;
        var useRef = React.useRef, useEffect = React.useEffect, useMemo = React.useMemo, useDebugValue = React.useDebugValue;
        function useSyncExternalStoreWithSelector(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
          var instRef = useRef(null);
          var inst;
          if (instRef.current === null) {
            inst = {
              hasValue: false,
              value: null
            };
            instRef.current = inst;
          } else {
            inst = instRef.current;
          }
          var _useMemo = useMemo(function() {
            var hasMemo = false;
            var memoizedSnapshot;
            var memoizedSelection;
            var memoizedSelector = /* @__PURE__ */ __name(function(nextSnapshot) {
              if (!hasMemo) {
                hasMemo = true;
                memoizedSnapshot = nextSnapshot;
                var _nextSelection = selector(nextSnapshot);
                if (isEqual !== void 0) {
                  if (inst.hasValue) {
                    var currentSelection = inst.value;
                    if (isEqual(currentSelection, _nextSelection)) {
                      memoizedSelection = currentSelection;
                      return currentSelection;
                    }
                  }
                }
                memoizedSelection = _nextSelection;
                return _nextSelection;
              }
              var prevSnapshot = memoizedSnapshot;
              var prevSelection = memoizedSelection;
              if (objectIs(prevSnapshot, nextSnapshot)) {
                return prevSelection;
              }
              var nextSelection = selector(nextSnapshot);
              if (isEqual !== void 0 && isEqual(prevSelection, nextSelection)) {
                return prevSelection;
              }
              memoizedSnapshot = nextSnapshot;
              memoizedSelection = nextSelection;
              return nextSelection;
            }, "memoizedSelector");
            var maybeGetServerSnapshot = getServerSnapshot === void 0 ? null : getServerSnapshot;
            var getSnapshotWithSelector = /* @__PURE__ */ __name(function() {
              return memoizedSelector(getSnapshot());
            }, "getSnapshotWithSelector");
            var getServerSnapshotWithSelector = maybeGetServerSnapshot === null ? void 0 : function() {
              return memoizedSelector(maybeGetServerSnapshot());
            };
            return [getSnapshotWithSelector, getServerSnapshotWithSelector];
          }, [getSnapshot, getServerSnapshot, selector, isEqual]), getSelection = _useMemo[0], getServerSelection = _useMemo[1];
          var value = useSyncExternalStore(subscribe, getSelection, getServerSelection);
          useEffect(function() {
            inst.hasValue = true;
            inst.value = value;
          }, [value]);
          useDebugValue(value);
          return value;
        }
        __name(useSyncExternalStoreWithSelector, "useSyncExternalStoreWithSelector");
        exports.useSyncExternalStoreWithSelector = useSyncExternalStoreWithSelector;
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
        }
      })();
    }
  }
});

// ../../../tmp/node_modules/use-sync-external-store/shim/with-selector.js
var require_with_selector = __commonJS({
  "../../../tmp/node_modules/use-sync-external-store/shim/with-selector.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_with_selector_development();
    }
  }
});

// ../../../tmp/node_modules/zustand/index.js
var require_zustand = __commonJS({
  "../../../tmp/node_modules/zustand/index.js"(exports, module) {
    "use strict";
    var vanilla2 = (init_vanilla(), __toCommonJS(vanilla_exports));
    var react$1 = (init_react(), __toCommonJS(react_exports));
    var useSyncExternalStoreExports = require_with_selector();
    var useSyncExternalStoreWithSelector = useSyncExternalStoreExports.useSyncExternalStoreWithSelector;
    function useStore2(api, selector, equalityFn) {
      if (selector === void 0) {
        selector = api.getState;
      }
      var slice = useSyncExternalStoreWithSelector(api.subscribe, api.getState, api.getServerState || api.getState, selector, equalityFn);
      react$1.useDebugValue(slice);
      return slice;
    }
    __name(useStore2, "useStore");
    var createImpl = /* @__PURE__ */ __name(function createImpl2(createState) {
      if (typeof createState !== "function") {
        console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");
      }
      var api = typeof createState === "function" ? vanilla2.createStore(createState) : createState;
      var useBoundStore = /* @__PURE__ */ __name(function useBoundStore2(selector, equalityFn) {
        return useStore2(api, selector, equalityFn);
      }, "useBoundStore");
      Object.assign(useBoundStore, api);
      return useBoundStore;
    }, "createImpl");
    var create2 = /* @__PURE__ */ __name(function create3(createState) {
      return createState ? createImpl(createState) : createImpl;
    }, "create");
    var react = /* @__PURE__ */ __name(function(createState) {
      if (true) {
        console.warn("[DEPRECATED] Default export is deprecated. Instead use `import { create } from 'zustand'`.");
      }
      return create2(createState);
    }, "react");
    exports.create = create2;
    exports.default = react;
    exports.useStore = useStore2;
    Object.keys(vanilla2).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return vanilla2[k];
          }
        });
    });
    module.exports = react;
    module.exports.create = create2;
    module.exports.useStore = useStore2;
    module.exports.createStore = vanilla2.createStore;
    exports.default = module.exports;
  }
});

// c2e:/tmp/node_modules/zustand/index.js
var import_zustand = __toESM(require_zustand());
var export_create = import_zustand.create;
var export_createStore = import_zustand.createStore;
var export_default = import_zustand.default;
var export_useStore = import_zustand.useStore;
export {
  export_create as create,
  export_createStore as createStore,
  export_default as default,
  export_useStore as useStore
};
/*! Bundled license information:

use-sync-external-store/cjs/use-sync-external-store-shim.development.js:
  (**
   * @license React
   * use-sync-external-store-shim.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js:
  (**
   * @license React
   * use-sync-external-store-shim/with-selector.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/

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

// ../../../tmp/node_modules/@tanstack/query-core/build/lib/subscribable.js
var require_subscribable = __commonJS({
  "../../../tmp/node_modules/@tanstack/query-core/build/lib/subscribable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Subscribable = class {
      constructor() {
        this.listeners = [];
        this.subscribe = this.subscribe.bind(this);
      }
      subscribe(listener) {
        this.listeners.push(listener);
        this.onSubscribe();
        return () => {
          this.listeners = this.listeners.filter((x) => x !== listener);
          this.onUnsubscribe();
        };
      }
      hasListeners() {
        return this.listeners.length > 0;
      }
      onSubscribe() {
      }
      onUnsubscribe() {
      }
    };
    __name(Subscribable, "Subscribable");
    exports.Subscribable = Subscribable;
  }
});

// ../../../tmp/node_modules/@tanstack/query-core/build/lib/utils.js
var require_utils = __commonJS({
  "../../../tmp/node_modules/@tanstack/query-core/build/lib/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var isServer2 = typeof window === "undefined" || "Deno" in window;
    function noop() {
      return void 0;
    }
    __name(noop, "noop");
    function functionalUpdate(updater, input) {
      return typeof updater === "function" ? updater(input) : updater;
    }
    __name(functionalUpdate, "functionalUpdate");
    function isValidTimeout(value) {
      return typeof value === "number" && value >= 0 && value !== Infinity;
    }
    __name(isValidTimeout, "isValidTimeout");
    function difference(array1, array2) {
      return array1.filter((x) => array2.indexOf(x) === -1);
    }
    __name(difference, "difference");
    function replaceAt(array, index, value) {
      const copy = array.slice(0);
      copy[index] = value;
      return copy;
    }
    __name(replaceAt, "replaceAt");
    function timeUntilStale(updatedAt, staleTime) {
      return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
    }
    __name(timeUntilStale, "timeUntilStale");
    function parseQueryArgs2(arg1, arg2, arg3) {
      if (!isQueryKey(arg1)) {
        return arg1;
      }
      if (typeof arg2 === "function") {
        return {
          ...arg3,
          queryKey: arg1,
          queryFn: arg2
        };
      }
      return {
        ...arg2,
        queryKey: arg1
      };
    }
    __name(parseQueryArgs2, "parseQueryArgs");
    function parseMutationArgs2(arg1, arg2, arg3) {
      if (isQueryKey(arg1)) {
        if (typeof arg2 === "function") {
          return {
            ...arg3,
            mutationKey: arg1,
            mutationFn: arg2
          };
        }
        return {
          ...arg2,
          mutationKey: arg1
        };
      }
      if (typeof arg1 === "function") {
        return {
          ...arg2,
          mutationFn: arg1
        };
      }
      return {
        ...arg1
      };
    }
    __name(parseMutationArgs2, "parseMutationArgs");
    function parseFilterArgs2(arg1, arg2, arg3) {
      return isQueryKey(arg1) ? [{
        ...arg2,
        queryKey: arg1
      }, arg3] : [arg1 || {}, arg2];
    }
    __name(parseFilterArgs2, "parseFilterArgs");
    function parseMutationFilterArgs2(arg1, arg2, arg3) {
      return isQueryKey(arg1) ? [{
        ...arg2,
        mutationKey: arg1
      }, arg3] : [arg1 || {}, arg2];
    }
    __name(parseMutationFilterArgs2, "parseMutationFilterArgs");
    function matchQuery2(filters, query) {
      const {
        type = "all",
        exact,
        fetchStatus,
        predicate,
        queryKey,
        stale
      } = filters;
      if (isQueryKey(queryKey)) {
        if (exact) {
          if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
            return false;
          }
        } else if (!partialMatchKey(query.queryKey, queryKey)) {
          return false;
        }
      }
      if (type !== "all") {
        const isActive = query.isActive();
        if (type === "active" && !isActive) {
          return false;
        }
        if (type === "inactive" && isActive) {
          return false;
        }
      }
      if (typeof stale === "boolean" && query.isStale() !== stale) {
        return false;
      }
      if (typeof fetchStatus !== "undefined" && fetchStatus !== query.state.fetchStatus) {
        return false;
      }
      if (predicate && !predicate(query)) {
        return false;
      }
      return true;
    }
    __name(matchQuery2, "matchQuery");
    function matchMutation(filters, mutation) {
      const {
        exact,
        fetching,
        predicate,
        mutationKey
      } = filters;
      if (isQueryKey(mutationKey)) {
        if (!mutation.options.mutationKey) {
          return false;
        }
        if (exact) {
          if (hashQueryKey2(mutation.options.mutationKey) !== hashQueryKey2(mutationKey)) {
            return false;
          }
        } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
          return false;
        }
      }
      if (typeof fetching === "boolean" && mutation.state.status === "loading" !== fetching) {
        return false;
      }
      if (predicate && !predicate(mutation)) {
        return false;
      }
      return true;
    }
    __name(matchMutation, "matchMutation");
    function hashQueryKeyByOptions(queryKey, options) {
      const hashFn = (options == null ? void 0 : options.queryKeyHashFn) || hashQueryKey2;
      return hashFn(queryKey);
    }
    __name(hashQueryKeyByOptions, "hashQueryKeyByOptions");
    function hashQueryKey2(queryKey) {
      return JSON.stringify(queryKey, (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
        result[key] = val[key];
        return result;
      }, {}) : val);
    }
    __name(hashQueryKey2, "hashQueryKey");
    function partialMatchKey(a, b) {
      return partialDeepEqual(a, b);
    }
    __name(partialMatchKey, "partialMatchKey");
    function partialDeepEqual(a, b) {
      if (a === b) {
        return true;
      }
      if (typeof a !== typeof b) {
        return false;
      }
      if (a && b && typeof a === "object" && typeof b === "object") {
        return !Object.keys(b).some((key) => !partialDeepEqual(a[key], b[key]));
      }
      return false;
    }
    __name(partialDeepEqual, "partialDeepEqual");
    function replaceEqualDeep2(a, b) {
      if (a === b) {
        return a;
      }
      const array = isPlainArray(a) && isPlainArray(b);
      if (array || isPlainObject(a) && isPlainObject(b)) {
        const aSize = array ? a.length : Object.keys(a).length;
        const bItems = array ? b : Object.keys(b);
        const bSize = bItems.length;
        const copy = array ? [] : {};
        let equalItems = 0;
        for (let i = 0; i < bSize; i++) {
          const key = array ? i : bItems[i];
          copy[key] = replaceEqualDeep2(a[key], b[key]);
          if (copy[key] === a[key]) {
            equalItems++;
          }
        }
        return aSize === bSize && equalItems === aSize ? a : copy;
      }
      return b;
    }
    __name(replaceEqualDeep2, "replaceEqualDeep");
    function shallowEqualObjects(a, b) {
      if (a && !b || b && !a) {
        return false;
      }
      for (const key in a) {
        if (a[key] !== b[key]) {
          return false;
        }
      }
      return true;
    }
    __name(shallowEqualObjects, "shallowEqualObjects");
    function isPlainArray(value) {
      return Array.isArray(value) && value.length === Object.keys(value).length;
    }
    __name(isPlainArray, "isPlainArray");
    function isPlainObject(o) {
      if (!hasObjectPrototype(o)) {
        return false;
      }
      const ctor = o.constructor;
      if (typeof ctor === "undefined") {
        return true;
      }
      const prot = ctor.prototype;
      if (!hasObjectPrototype(prot)) {
        return false;
      }
      if (!prot.hasOwnProperty("isPrototypeOf")) {
        return false;
      }
      return true;
    }
    __name(isPlainObject, "isPlainObject");
    function hasObjectPrototype(o) {
      return Object.prototype.toString.call(o) === "[object Object]";
    }
    __name(hasObjectPrototype, "hasObjectPrototype");
    function isQueryKey(value) {
      return Array.isArray(value);
    }
    __name(isQueryKey, "isQueryKey");
    function isError2(value) {
      return value instanceof Error;
    }
    __name(isError2, "isError");
    function sleep(timeout) {
      return new Promise((resolve) => {
        setTimeout(resolve, timeout);
      });
    }
    __name(sleep, "sleep");
    function scheduleMicrotask(callback) {
      sleep(0).then(callback);
    }
    __name(scheduleMicrotask, "scheduleMicrotask");
    function getAbortController() {
      if (typeof AbortController === "function") {
        return new AbortController();
      }
      return;
    }
    __name(getAbortController, "getAbortController");
    function replaceData(prevData, data, options) {
      if (options.isDataEqual != null && options.isDataEqual(prevData, data)) {
        return prevData;
      } else if (typeof options.structuralSharing === "function") {
        return options.structuralSharing(prevData, data);
      } else if (options.structuralSharing !== false) {
        return replaceEqualDeep2(prevData, data);
      }
      return data;
    }
    __name(replaceData, "replaceData");
    exports.difference = difference;
    exports.functionalUpdate = functionalUpdate;
    exports.getAbortController = getAbortController;
    exports.hashQueryKey = hashQueryKey2;
    exports.hashQueryKeyByOptions = hashQueryKeyByOptions;
    exports.isError = isError2;
    exports.isPlainArray = isPlainArray;
    exports.isPlainObject = isPlainObject;
    exports.isQueryKey = isQueryKey;
    exports.isServer = isServer2;
    exports.isValidTimeout = isValidTimeout;
    exports.matchMutation = matchMutation;
    exports.matchQuery = matchQuery2;
    exports.noop = noop;
    exports.parseFilterArgs = parseFilterArgs2;
    exports.parseMutationArgs = parseMutationArgs2;
    exports.parseMutationFilterArgs = parseMutationFilterArgs2;
    exports.parseQueryArgs = parseQueryArgs2;
    exports.partialDeepEqual = partialDeepEqual;
    exports.partialMatchKey = partialMatchKey;
    exports.replaceAt = replaceAt;
    exports.replaceData = replaceData;
    exports.replaceEqualDeep = replaceEqualDeep2;
    exports.scheduleMicrotask = scheduleMicrotask;
    exports.shallowEqualObjects = shallowEqualObjects;
    exports.sleep = sleep;
    exports.timeUntilStale = timeUntilStale;
  }
});

// ../../../tmp/node_modules/@tanstack/query-core/build/lib/focusManager.js
var require_focusManager = __commonJS({
  "../../../tmp/node_modules/@tanstack/query-core/build/lib/focusManager.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var subscribable = require_subscribable();
    var utils = require_utils();
    var FocusManager = class extends subscribable.Subscribable {
      constructor() {
        super();
        this.setup = (onFocus) => {
          if (!utils.isServer && window.addEventListener) {
            const listener = /* @__PURE__ */ __name(() => onFocus(), "listener");
            window.addEventListener("visibilitychange", listener, false);
            window.addEventListener("focus", listener, false);
            return () => {
              window.removeEventListener("visibilitychange", listener);
              window.removeEventListener("focus", listener);
            };
          }
          return;
        };
      }
      onSubscribe() {
        if (!this.cleanup) {
          this.setEventListener(this.setup);
        }
      }
      onUnsubscribe() {
        if (!this.hasListeners()) {
          var _this$cleanup;
          (_this$cleanup = this.cleanup) == null ? void 0 : _this$cleanup.call(this);
          this.cleanup = void 0;
        }
      }
      setEventListener(setup) {
        var _this$cleanup2;
        this.setup = setup;
        (_this$cleanup2 = this.cleanup) == null ? void 0 : _this$cleanup2.call(this);
        this.cleanup = setup((focused) => {
          if (typeof focused === "boolean") {
            this.setFocused(focused);
          } else {
            this.onFocus();
          }
        });
      }
      setFocused(focused) {
        this.focused = focused;
        if (focused) {
          this.onFocus();
        }
      }
      onFocus() {
        this.listeners.forEach((listener) => {
          listener();
        });
      }
      isFocused() {
        if (typeof this.focused === "boolean") {
          return this.focused;
        }
        if (typeof document === "undefined") {
          return true;
        }
        return [void 0, "visible", "prerender"].includes(document.visibilityState);
      }
    };
    __name(FocusManager, "FocusManager");
    var focusManager2 = new FocusManager();
    exports.FocusManager = FocusManager;
    exports.focusManager = focusManager2;
  }
});

// ../../../tmp/node_modules/@tanstack/query-core/build/lib/onlineManager.js
var require_onlineManager = __commonJS({
  "../../../tmp/node_modules/@tanstack/query-core/build/lib/onlineManager.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var subscribable = require_subscribable();
    var utils = require_utils();
    var OnlineManager = class extends subscribable.Subscribable {
      constructor() {
        super();
        this.setup = (onOnline) => {
          if (!utils.isServer && window.addEventListener) {
            const listener = /* @__PURE__ */ __name(() => onOnline(), "listener");
            window.addEventListener("online", listener, false);
            window.addEventListener("offline", listener, false);
            return () => {
              window.removeEventListener("online", listener);
              window.removeEventListener("offline", listener);
            };
          }
          return;
        };
      }
      onSubscribe() {
        if (!this.cleanup) {
          this.setEventListener(this.setup);
        }
      }
      onUnsubscribe() {
        if (!this.hasListeners()) {
          var _this$cleanup;
          (_this$cleanup = this.cleanup) == null ? void 0 : _this$cleanup.call(this);
          this.cleanup = void 0;
        }
      }
      setEventListener(setup) {
        var _this$cleanup2;
        this.setup = setup;
        (_this$cleanup2 = this.cleanup) == null ? void 0 : _this$cleanup2.call(this);
        this.cleanup = setup((online) => {
          if (typeof online === "boolean") {
            this.setOnline(online);
          } else {
            this.onOnline();
          }
        });
      }
      setOnline(online) {
        this.online = online;
        if (online) {
          this.onOnline();
        }
      }
      onOnline() {
        this.listeners.forEach((listener) => {
          listener();
        });
      }
      isOnline() {
        if (typeof this.online === "boolean") {
          return this.online;
        }
        if (typeof navigator === "undefined" || typeof navigator.onLine === "undefined") {
          return true;
        }
        return navigator.onLine;
      }
    };
    __name(OnlineManager, "OnlineManager");
    var onlineManager2 = new OnlineManager();
    exports.OnlineManager = OnlineManager;
    exports.onlineManager = onlineManager2;
  }
});

// ../../../tmp/node_modules/@tanstack/query-core/build/lib/retryer.js
var require_retryer = __commonJS({
  "../../../tmp/node_modules/@tanstack/query-core/build/lib/retryer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var focusManager2 = require_focusManager();
    var onlineManager2 = require_onlineManager();
    var utils = require_utils();
    function defaultRetryDelay(failureCount) {
      return Math.min(1e3 * 2 ** failureCount, 3e4);
    }
    __name(defaultRetryDelay, "defaultRetryDelay");
    function canFetch(networkMode) {
      return (networkMode != null ? networkMode : "online") === "online" ? onlineManager2.onlineManager.isOnline() : true;
    }
    __name(canFetch, "canFetch");
    var CancelledError2 = class {
      constructor(options) {
        this.revert = options == null ? void 0 : options.revert;
        this.silent = options == null ? void 0 : options.silent;
      }
    };
    __name(CancelledError2, "CancelledError");
    function isCancelledError2(value) {
      return value instanceof CancelledError2;
    }
    __name(isCancelledError2, "isCancelledError");
    function createRetryer(config) {
      let isRetryCancelled = false;
      let failureCount = 0;
      let isResolved = false;
      let continueFn;
      let promiseResolve;
      let promiseReject;
      const promise = new Promise((outerResolve, outerReject) => {
        promiseResolve = outerResolve;
        promiseReject = outerReject;
      });
      const cancel = /* @__PURE__ */ __name((cancelOptions) => {
        if (!isResolved) {
          reject(new CancelledError2(cancelOptions));
          config.abort == null ? void 0 : config.abort();
        }
      }, "cancel");
      const cancelRetry = /* @__PURE__ */ __name(() => {
        isRetryCancelled = true;
      }, "cancelRetry");
      const continueRetry = /* @__PURE__ */ __name(() => {
        isRetryCancelled = false;
      }, "continueRetry");
      const shouldPause = /* @__PURE__ */ __name(() => !focusManager2.focusManager.isFocused() || config.networkMode !== "always" && !onlineManager2.onlineManager.isOnline(), "shouldPause");
      const resolve = /* @__PURE__ */ __name((value) => {
        if (!isResolved) {
          isResolved = true;
          config.onSuccess == null ? void 0 : config.onSuccess(value);
          continueFn == null ? void 0 : continueFn();
          promiseResolve(value);
        }
      }, "resolve");
      const reject = /* @__PURE__ */ __name((value) => {
        if (!isResolved) {
          isResolved = true;
          config.onError == null ? void 0 : config.onError(value);
          continueFn == null ? void 0 : continueFn();
          promiseReject(value);
        }
      }, "reject");
      const pause = /* @__PURE__ */ __name(() => {
        return new Promise((continueResolve) => {
          continueFn = /* @__PURE__ */ __name((value) => {
            const canContinue = isResolved || !shouldPause();
            if (canContinue) {
              continueResolve(value);
            }
            return canContinue;
          }, "continueFn");
          config.onPause == null ? void 0 : config.onPause();
        }).then(() => {
          continueFn = void 0;
          if (!isResolved) {
            config.onContinue == null ? void 0 : config.onContinue();
          }
        });
      }, "pause");
      const run = /* @__PURE__ */ __name(() => {
        if (isResolved) {
          return;
        }
        let promiseOrValue;
        try {
          promiseOrValue = config.fn();
        } catch (error) {
          promiseOrValue = Promise.reject(error);
        }
        Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
          var _config$retry, _config$retryDelay;
          if (isResolved) {
            return;
          }
          const retry = (_config$retry = config.retry) != null ? _config$retry : 3;
          const retryDelay = (_config$retryDelay = config.retryDelay) != null ? _config$retryDelay : defaultRetryDelay;
          const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
          const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
          if (isRetryCancelled || !shouldRetry) {
            reject(error);
            return;
          }
          failureCount++;
          config.onFail == null ? void 0 : config.onFail(failureCount, error);
          utils.sleep(delay).then(() => {
            if (shouldPause()) {
              return pause();
            }
            return;
          }).then(() => {
            if (isRetryCancelled) {
              reject(error);
            } else {
              run();
            }
          });
        });
      }, "run");
      if (canFetch(config.networkMode)) {
        run();
      } else {
        pause().then(run);
      }
      return {
        promise,
        cancel,
        continue: () => {
          const didContinue = continueFn == null ? void 0 : continueFn();
          return didContinue ? promise : Promise.resolve();
        },
        cancelRetry,
        continueRetry
      };
    }
    __name(createRetryer, "createRetryer");
    exports.CancelledError = CancelledError2;
    exports.canFetch = canFetch;
    exports.createRetryer = createRetryer;
    exports.isCancelledError = isCancelledError2;
  }
});

// ../../../tmp/node_modules/@tanstack/query-core/build/lib/logger.js
var require_logger = __commonJS({
  "../../../tmp/node_modules/@tanstack/query-core/build/lib/logger.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var defaultLogger = console;
    exports.defaultLogger = defaultLogger;
  }
});

// ../../../tmp/node_modules/@tanstack/query-core/build/lib/notifyManager.js
var require_notifyManager = __commonJS({
  "../../../tmp/node_modules/@tanstack/query-core/build/lib/notifyManager.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_utils();
    function createNotifyManager() {
      let queue = [];
      let transactions = 0;
      let notifyFn = /* @__PURE__ */ __name((callback) => {
        callback();
      }, "notifyFn");
      let batchNotifyFn = /* @__PURE__ */ __name((callback) => {
        callback();
      }, "batchNotifyFn");
      const batch = /* @__PURE__ */ __name((callback) => {
        let result;
        transactions++;
        try {
          result = callback();
        } finally {
          transactions--;
          if (!transactions) {
            flush();
          }
        }
        return result;
      }, "batch");
      const schedule = /* @__PURE__ */ __name((callback) => {
        if (transactions) {
          queue.push(callback);
        } else {
          utils.scheduleMicrotask(() => {
            notifyFn(callback);
          });
        }
      }, "schedule");
      const batchCalls = /* @__PURE__ */ __name((callback) => {
        return (...args) => {
          schedule(() => {
            callback(...args);
          });
        };
      }, "batchCalls");
      const flush = /* @__PURE__ */ __name(() => {
        const originalQueue = queue;
        queue = [];
        if (originalQueue.length) {
          utils.scheduleMicrotask(() => {
            batchNotifyFn(() => {
              originalQueue.forEach((callback) => {
                notifyFn(callback);
              });
            });
          });
        }
      }, "flush");
      const setNotifyFunction = /* @__PURE__ */ __name((fn) => {
        notifyFn = fn;
      }, "setNotifyFunction");
      const setBatchNotifyFunction = /* @__PURE__ */ __name((fn) => {
        batchNotifyFn = fn;
      }, "setBatchNotifyFunction");
      return {
        batch,
        batchCalls,
        schedule,
        setNotifyFunction,
        setBatchNotifyFunction
      };
    }
    __name(createNotifyManager, "createNotifyManager");
    var notifyManager2 = createNotifyManager();
    exports.createNotifyManager = createNotifyManager;
    exports.notifyManager = notifyManager2;
  }
});

// ../../../tmp/node_modules/@tanstack/query-core/build/lib/removable.js
var require_removable = __commonJS({
  "../../../tmp/node_modules/@tanstack/query-core/build/lib/removable.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_utils();
    var Removable = class {
      destroy() {
        this.clearGcTimeout();
      }
      scheduleGc() {
        this.clearGcTimeout();
        if (utils.isValidTimeout(this.cacheTime)) {
          this.gcTimeout = setTimeout(() => {
            this.optionalRemove();
          }, this.cacheTime);
        }
      }
      updateCacheTime(newCacheTime) {
        this.cacheTime = Math.max(this.cacheTime || 0, newCacheTime != null ? newCacheTime : utils.isServer ? Infinity : 5 * 60 * 1e3);
      }
      clearGcTimeout() {
        if (this.gcTimeout) {
          clearTimeout(this.gcTimeout);
          this.gcTimeout = void 0;
        }
      }
    };
    __name(Removable, "Removable");
    exports.Removable = Removable;
  }
});

// ../../../tmp/node_modules/@tanstack/query-core/build/lib/query.js
var require_query = __commonJS({
  "../../../tmp/node_modules/@tanstack/query-core/build/lib/query.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_utils();
    var logger = require_logger();
    var notifyManager2 = require_notifyManager();
    var retryer = require_retryer();
    var removable = require_removable();
    var Query = class extends removable.Removable {
      constructor(config) {
        super();
        this.abortSignalConsumed = false;
        this.defaultOptions = config.defaultOptions;
        this.setOptions(config.options);
        this.observers = [];
        this.cache = config.cache;
        this.logger = config.logger || logger.defaultLogger;
        this.queryKey = config.queryKey;
        this.queryHash = config.queryHash;
        this.initialState = config.state || getDefaultState(this.options);
        this.state = this.initialState;
        this.scheduleGc();
      }
      get meta() {
        return this.options.meta;
      }
      setOptions(options) {
        this.options = {
          ...this.defaultOptions,
          ...options
        };
        this.updateCacheTime(this.options.cacheTime);
      }
      optionalRemove() {
        if (!this.observers.length && this.state.fetchStatus === "idle") {
          this.cache.remove(this);
        }
      }
      setData(newData, options) {
        const data = utils.replaceData(this.state.data, newData, this.options);
        this.dispatch({
          data,
          type: "success",
          dataUpdatedAt: options == null ? void 0 : options.updatedAt,
          manual: options == null ? void 0 : options.manual
        });
        return data;
      }
      setState(state, setStateOptions) {
        this.dispatch({
          type: "setState",
          state,
          setStateOptions
        });
      }
      cancel(options) {
        var _this$retryer;
        const promise = this.promise;
        (_this$retryer = this.retryer) == null ? void 0 : _this$retryer.cancel(options);
        return promise ? promise.then(utils.noop).catch(utils.noop) : Promise.resolve();
      }
      destroy() {
        super.destroy();
        this.cancel({
          silent: true
        });
      }
      reset() {
        this.destroy();
        this.setState(this.initialState);
      }
      isActive() {
        return this.observers.some((observer) => observer.options.enabled !== false);
      }
      isDisabled() {
        return this.getObserversCount() > 0 && !this.isActive();
      }
      isStale() {
        return this.state.isInvalidated || !this.state.dataUpdatedAt || this.observers.some((observer) => observer.getCurrentResult().isStale);
      }
      isStaleByTime(staleTime = 0) {
        return this.state.isInvalidated || !this.state.dataUpdatedAt || !utils.timeUntilStale(this.state.dataUpdatedAt, staleTime);
      }
      onFocus() {
        var _this$retryer2;
        const observer = this.observers.find((x) => x.shouldFetchOnWindowFocus());
        if (observer) {
          observer.refetch({
            cancelRefetch: false
          });
        }
        (_this$retryer2 = this.retryer) == null ? void 0 : _this$retryer2.continue();
      }
      onOnline() {
        var _this$retryer3;
        const observer = this.observers.find((x) => x.shouldFetchOnReconnect());
        if (observer) {
          observer.refetch({
            cancelRefetch: false
          });
        }
        (_this$retryer3 = this.retryer) == null ? void 0 : _this$retryer3.continue();
      }
      addObserver(observer) {
        if (this.observers.indexOf(observer) === -1) {
          this.observers.push(observer);
          this.clearGcTimeout();
          this.cache.notify({
            type: "observerAdded",
            query: this,
            observer
          });
        }
      }
      removeObserver(observer) {
        if (this.observers.indexOf(observer) !== -1) {
          this.observers = this.observers.filter((x) => x !== observer);
          if (!this.observers.length) {
            if (this.retryer) {
              if (this.abortSignalConsumed) {
                this.retryer.cancel({
                  revert: true
                });
              } else {
                this.retryer.cancelRetry();
              }
            }
            this.scheduleGc();
          }
          this.cache.notify({
            type: "observerRemoved",
            query: this,
            observer
          });
        }
      }
      getObserversCount() {
        return this.observers.length;
      }
      invalidate() {
        if (!this.state.isInvalidated) {
          this.dispatch({
            type: "invalidate"
          });
        }
      }
      fetch(options, fetchOptions) {
        var _this$options$behavio, _context$fetchOptions;
        if (this.state.fetchStatus !== "idle") {
          if (this.state.dataUpdatedAt && fetchOptions != null && fetchOptions.cancelRefetch) {
            this.cancel({
              silent: true
            });
          } else if (this.promise) {
            var _this$retryer4;
            (_this$retryer4 = this.retryer) == null ? void 0 : _this$retryer4.continueRetry();
            return this.promise;
          }
        }
        if (options) {
          this.setOptions(options);
        }
        if (!this.options.queryFn) {
          const observer = this.observers.find((x) => x.options.queryFn);
          if (observer) {
            this.setOptions(observer.options);
          }
        }
        if (!Array.isArray(this.options.queryKey)) {
          if (true) {
            this.logger.error("As of v4, queryKey needs to be an Array. If you are using a string like 'repoData', please change it to an Array, e.g. ['repoData']");
          }
        }
        const abortController = utils.getAbortController();
        const queryFnContext = {
          queryKey: this.queryKey,
          pageParam: void 0,
          meta: this.meta
        };
        const addSignalProperty = /* @__PURE__ */ __name((object) => {
          Object.defineProperty(object, "signal", {
            enumerable: true,
            get: () => {
              if (abortController) {
                this.abortSignalConsumed = true;
                return abortController.signal;
              }
              return void 0;
            }
          });
        }, "addSignalProperty");
        addSignalProperty(queryFnContext);
        const fetchFn = /* @__PURE__ */ __name(() => {
          if (!this.options.queryFn) {
            return Promise.reject("Missing queryFn");
          }
          this.abortSignalConsumed = false;
          return this.options.queryFn(queryFnContext);
        }, "fetchFn");
        const context = {
          fetchOptions,
          options: this.options,
          queryKey: this.queryKey,
          state: this.state,
          fetchFn
        };
        addSignalProperty(context);
        (_this$options$behavio = this.options.behavior) == null ? void 0 : _this$options$behavio.onFetch(context);
        this.revertState = this.state;
        if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((_context$fetchOptions = context.fetchOptions) == null ? void 0 : _context$fetchOptions.meta)) {
          var _context$fetchOptions2;
          this.dispatch({
            type: "fetch",
            meta: (_context$fetchOptions2 = context.fetchOptions) == null ? void 0 : _context$fetchOptions2.meta
          });
        }
        const onError = /* @__PURE__ */ __name((error) => {
          if (!(retryer.isCancelledError(error) && error.silent)) {
            this.dispatch({
              type: "error",
              error
            });
          }
          if (!retryer.isCancelledError(error)) {
            var _this$cache$config$on, _this$cache$config, _this$cache$config$on2, _this$cache$config2;
            (_this$cache$config$on = (_this$cache$config = this.cache.config).onError) == null ? void 0 : _this$cache$config$on.call(_this$cache$config, error, this);
            (_this$cache$config$on2 = (_this$cache$config2 = this.cache.config).onSettled) == null ? void 0 : _this$cache$config$on2.call(_this$cache$config2, this.state.data, error, this);
            if (true) {
              this.logger.error(error);
            }
          }
          if (!this.isFetchingOptimistic) {
            this.scheduleGc();
          }
          this.isFetchingOptimistic = false;
        }, "onError");
        this.retryer = retryer.createRetryer({
          fn: context.fetchFn,
          abort: abortController == null ? void 0 : abortController.abort.bind(abortController),
          onSuccess: (data) => {
            var _this$cache$config$on3, _this$cache$config3, _this$cache$config$on4, _this$cache$config4;
            if (typeof data === "undefined") {
              if (true) {
                this.logger.error("Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: " + this.queryHash);
              }
              onError(new Error("undefined"));
              return;
            }
            this.setData(data);
            (_this$cache$config$on3 = (_this$cache$config3 = this.cache.config).onSuccess) == null ? void 0 : _this$cache$config$on3.call(_this$cache$config3, data, this);
            (_this$cache$config$on4 = (_this$cache$config4 = this.cache.config).onSettled) == null ? void 0 : _this$cache$config$on4.call(_this$cache$config4, data, this.state.error, this);
            if (!this.isFetchingOptimistic) {
              this.scheduleGc();
            }
            this.isFetchingOptimistic = false;
          },
          onError,
          onFail: (failureCount, error) => {
            this.dispatch({
              type: "failed",
              failureCount,
              error
            });
          },
          onPause: () => {
            this.dispatch({
              type: "pause"
            });
          },
          onContinue: () => {
            this.dispatch({
              type: "continue"
            });
          },
          retry: context.options.retry,
          retryDelay: context.options.retryDelay,
          networkMode: context.options.networkMode
        });
        this.promise = this.retryer.promise;
        return this.promise;
      }
      dispatch(action) {
        const reducer = /* @__PURE__ */ __name((state) => {
          var _action$meta, _action$dataUpdatedAt;
          switch (action.type) {
            case "failed":
              return {
                ...state,
                fetchFailureCount: action.failureCount,
                fetchFailureReason: action.error
              };
            case "pause":
              return {
                ...state,
                fetchStatus: "paused"
              };
            case "continue":
              return {
                ...state,
                fetchStatus: "fetching"
              };
            case "fetch":
              return {
                ...state,
                fetchFailureCount: 0,
                fetchFailureReason: null,
                fetchMeta: (_action$meta = action.meta) != null ? _action$meta : null,
                fetchStatus: retryer.canFetch(this.options.networkMode) ? "fetching" : "paused",
                ...!state.dataUpdatedAt && {
                  error: null,
                  status: "loading"
                }
              };
            case "success":
              return {
                ...state,
                data: action.data,
                dataUpdateCount: state.dataUpdateCount + 1,
                dataUpdatedAt: (_action$dataUpdatedAt = action.dataUpdatedAt) != null ? _action$dataUpdatedAt : Date.now(),
                error: null,
                isInvalidated: false,
                status: "success",
                ...!action.manual && {
                  fetchStatus: "idle",
                  fetchFailureCount: 0,
                  fetchFailureReason: null
                }
              };
            case "error":
              const error = action.error;
              if (retryer.isCancelledError(error) && error.revert && this.revertState) {
                return {
                  ...this.revertState
                };
              }
              return {
                ...state,
                error,
                errorUpdateCount: state.errorUpdateCount + 1,
                errorUpdatedAt: Date.now(),
                fetchFailureCount: state.fetchFailureCount + 1,
                fetchFailureReason: error,
                fetchStatus: "idle",
                status: "error"
              };
            case "invalidate":
              return {
                ...state,
                isInvalidated: true
              };
            case "setState":
              return {
                ...state,
                ...action.state
              };
          }
        }, "reducer");
        this.state = reducer(this.state);
        notifyManager2.notifyManager.batch(() => {
          this.observers.forEach((observer) => {
            observer.onQueryUpdate(action);
          });
          this.cache.notify({
            query: this,
            type: "updated",
            action
          });
        });
      }
    };
    __name(Query, "Query");
    function getDefaultState(options) {
      const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
      const hasData = typeof data !== "undefined";
      const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
      return {
        data,
        dataUpdateCount: 0,
        dataUpdatedAt: hasData ? initialDataUpdatedAt != null ? initialDataUpdatedAt : Date.now() : 0,
        error: null,
        errorUpdateCount: 0,
        errorUpdatedAt: 0,
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchMeta: null,
        isInvalidated: false,
        status: hasData ? "success" : "loading",
        fetchStatus: "idle"
      };
    }
    __name(getDefaultState, "getDefaultState");
    exports.Query = Query;
  }
});

// ../../../tmp/node_modules/@tanstack/query-core/build/lib/queryCache.js
var require_queryCache = __commonJS({
  "../../../tmp/node_modules/@tanstack/query-core/build/lib/queryCache.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_utils();
    var query = require_query();
    var notifyManager2 = require_notifyManager();
    var subscribable = require_subscribable();
    var QueryCache2 = class extends subscribable.Subscribable {
      constructor(config) {
        super();
        this.config = config || {};
        this.queries = [];
        this.queriesMap = {};
      }
      build(client, options, state) {
        var _options$queryHash;
        const queryKey = options.queryKey;
        const queryHash = (_options$queryHash = options.queryHash) != null ? _options$queryHash : utils.hashQueryKeyByOptions(queryKey, options);
        let query$1 = this.get(queryHash);
        if (!query$1) {
          query$1 = new query.Query({
            cache: this,
            logger: client.getLogger(),
            queryKey,
            queryHash,
            options: client.defaultQueryOptions(options),
            state,
            defaultOptions: client.getQueryDefaults(queryKey)
          });
          this.add(query$1);
        }
        return query$1;
      }
      add(query2) {
        if (!this.queriesMap[query2.queryHash]) {
          this.queriesMap[query2.queryHash] = query2;
          this.queries.push(query2);
          this.notify({
            type: "added",
            query: query2
          });
        }
      }
      remove(query2) {
        const queryInMap = this.queriesMap[query2.queryHash];
        if (queryInMap) {
          query2.destroy();
          this.queries = this.queries.filter((x) => x !== query2);
          if (queryInMap === query2) {
            delete this.queriesMap[query2.queryHash];
          }
          this.notify({
            type: "removed",
            query: query2
          });
        }
      }
      clear() {
        notifyManager2.notifyManager.batch(() => {
          this.queries.forEach((query2) => {
            this.remove(query2);
          });
        });
      }
      get(queryHash) {
        return this.queriesMap[queryHash];
      }
      getAll() {
        return this.queries;
      }
      find(arg1, arg2) {
        const [filters] = utils.parseFilterArgs(arg1, arg2);
        if (typeof filters.exact === "undefined") {
          filters.exact = true;
        }
        return this.queries.find((query2) => utils.matchQuery(filters, query2));
      }
      findAll(arg1, arg2) {
        const [filters] = utils.parseFilterArgs(arg1, arg2);
        return Object.keys(filters).length > 0 ? this.queries.filter((query2) => utils.matchQuery(filters, query2)) : this.queries;
      }
      notify(event) {
        notifyManager2.notifyManager.batch(() => {
          this.listeners.forEach((listener) => {
            listener(event);
          });
        });
      }
      onFocus() {
        notifyManager2.notifyManager.batch(() => {
          this.queries.forEach((query2) => {
            query2.onFocus();
          });
        });
      }
      onOnline() {
        notifyManager2.notifyManager.batch(() => {
          this.queries.forEach((query2) => {
            query2.onOnline();
          });
        });
      }
    };
    __name(QueryCache2, "QueryCache");
    exports.QueryCache = QueryCache2;
  }
});

// ../../../tmp/node_modules/@tanstack/query-core/build/lib/mutation.js
var require_mutation = __commonJS({
  "../../../tmp/node_modules/@tanstack/query-core/build/lib/mutation.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var logger = require_logger();
    var notifyManager2 = require_notifyManager();
    var removable = require_removable();
    var retryer = require_retryer();
    var Mutation = class extends removable.Removable {
      constructor(config) {
        super();
        this.defaultOptions = config.defaultOptions;
        this.mutationId = config.mutationId;
        this.mutationCache = config.mutationCache;
        this.logger = config.logger || logger.defaultLogger;
        this.observers = [];
        this.state = config.state || getDefaultState();
        this.setOptions(config.options);
        this.scheduleGc();
      }
      setOptions(options) {
        this.options = {
          ...this.defaultOptions,
          ...options
        };
        this.updateCacheTime(this.options.cacheTime);
      }
      get meta() {
        return this.options.meta;
      }
      setState(state) {
        this.dispatch({
          type: "setState",
          state
        });
      }
      addObserver(observer) {
        if (this.observers.indexOf(observer) === -1) {
          this.observers.push(observer);
          this.clearGcTimeout();
          this.mutationCache.notify({
            type: "observerAdded",
            mutation: this,
            observer
          });
        }
      }
      removeObserver(observer) {
        this.observers = this.observers.filter((x) => x !== observer);
        this.scheduleGc();
        this.mutationCache.notify({
          type: "observerRemoved",
          mutation: this,
          observer
        });
      }
      optionalRemove() {
        if (!this.observers.length) {
          if (this.state.status === "loading") {
            this.scheduleGc();
          } else {
            this.mutationCache.remove(this);
          }
        }
      }
      continue() {
        var _this$retryer$continu, _this$retryer;
        return (_this$retryer$continu = (_this$retryer = this.retryer) == null ? void 0 : _this$retryer.continue()) != null ? _this$retryer$continu : this.execute();
      }
      async execute() {
        const executeMutation = /* @__PURE__ */ __name(() => {
          var _this$options$retry;
          this.retryer = retryer.createRetryer({
            fn: () => {
              if (!this.options.mutationFn) {
                return Promise.reject("No mutationFn found");
              }
              return this.options.mutationFn(this.state.variables);
            },
            onFail: (failureCount, error) => {
              this.dispatch({
                type: "failed",
                failureCount,
                error
              });
            },
            onPause: () => {
              this.dispatch({
                type: "pause"
              });
            },
            onContinue: () => {
              this.dispatch({
                type: "continue"
              });
            },
            retry: (_this$options$retry = this.options.retry) != null ? _this$options$retry : 0,
            retryDelay: this.options.retryDelay,
            networkMode: this.options.networkMode
          });
          return this.retryer.promise;
        }, "executeMutation");
        const restored = this.state.status === "loading";
        try {
          var _this$mutationCache$c3, _this$mutationCache$c4, _this$options$onSucce, _this$options2, _this$mutationCache$c5, _this$mutationCache$c6, _this$options$onSettl, _this$options3;
          if (!restored) {
            var _this$mutationCache$c, _this$mutationCache$c2, _this$options$onMutat, _this$options;
            this.dispatch({
              type: "loading",
              variables: this.options.variables
            });
            await ((_this$mutationCache$c = (_this$mutationCache$c2 = this.mutationCache.config).onMutate) == null ? void 0 : _this$mutationCache$c.call(_this$mutationCache$c2, this.state.variables, this));
            const context = await ((_this$options$onMutat = (_this$options = this.options).onMutate) == null ? void 0 : _this$options$onMutat.call(_this$options, this.state.variables));
            if (context !== this.state.context) {
              this.dispatch({
                type: "loading",
                context,
                variables: this.state.variables
              });
            }
          }
          const data = await executeMutation();
          await ((_this$mutationCache$c3 = (_this$mutationCache$c4 = this.mutationCache.config).onSuccess) == null ? void 0 : _this$mutationCache$c3.call(_this$mutationCache$c4, data, this.state.variables, this.state.context, this));
          await ((_this$options$onSucce = (_this$options2 = this.options).onSuccess) == null ? void 0 : _this$options$onSucce.call(_this$options2, data, this.state.variables, this.state.context));
          await ((_this$mutationCache$c5 = (_this$mutationCache$c6 = this.mutationCache.config).onSettled) == null ? void 0 : _this$mutationCache$c5.call(_this$mutationCache$c6, data, null, this.state.variables, this.state.context, this));
          await ((_this$options$onSettl = (_this$options3 = this.options).onSettled) == null ? void 0 : _this$options$onSettl.call(_this$options3, data, null, this.state.variables, this.state.context));
          this.dispatch({
            type: "success",
            data
          });
          return data;
        } catch (error) {
          try {
            var _this$mutationCache$c7, _this$mutationCache$c8, _this$options$onError, _this$options4, _this$mutationCache$c9, _this$mutationCache$c10, _this$options$onSettl2, _this$options5;
            await ((_this$mutationCache$c7 = (_this$mutationCache$c8 = this.mutationCache.config).onError) == null ? void 0 : _this$mutationCache$c7.call(_this$mutationCache$c8, error, this.state.variables, this.state.context, this));
            if (true) {
              this.logger.error(error);
            }
            await ((_this$options$onError = (_this$options4 = this.options).onError) == null ? void 0 : _this$options$onError.call(_this$options4, error, this.state.variables, this.state.context));
            await ((_this$mutationCache$c9 = (_this$mutationCache$c10 = this.mutationCache.config).onSettled) == null ? void 0 : _this$mutationCache$c9.call(_this$mutationCache$c10, void 0, error, this.state.variables, this.state.context, this));
            await ((_this$options$onSettl2 = (_this$options5 = this.options).onSettled) == null ? void 0 : _this$options$onSettl2.call(_this$options5, void 0, error, this.state.variables, this.state.context));
            throw error;
          } finally {
            this.dispatch({
              type: "error",
              error
            });
          }
        }
      }
      dispatch(action) {
        const reducer = /* @__PURE__ */ __name((state) => {
          switch (action.type) {
            case "failed":
              return {
                ...state,
                failureCount: action.failureCount,
                failureReason: action.error
              };
            case "pause":
              return {
                ...state,
                isPaused: true
              };
            case "continue":
              return {
                ...state,
                isPaused: false
              };
            case "loading":
              return {
                ...state,
                context: action.context,
                data: void 0,
                failureCount: 0,
                failureReason: null,
                error: null,
                isPaused: !retryer.canFetch(this.options.networkMode),
                status: "loading",
                variables: action.variables
              };
            case "success":
              return {
                ...state,
                data: action.data,
                failureCount: 0,
                failureReason: null,
                error: null,
                status: "success",
                isPaused: false
              };
            case "error":
              return {
                ...state,
                data: void 0,
                error: action.error,
                failureCount: state.failureCount + 1,
                failureReason: action.error,
                isPaused: false,
                status: "error"
              };
            case "setState":
              return {
                ...state,
                ...action.state
              };
          }
        }, "reducer");
        this.state = reducer(this.state);
        notifyManager2.notifyManager.batch(() => {
          this.observers.forEach((observer) => {
            observer.onMutationUpdate(action);
          });
          this.mutationCache.notify({
            mutation: this,
            type: "updated",
            action
          });
        });
      }
    };
    __name(Mutation, "Mutation");
    function getDefaultState() {
      return {
        context: void 0,
        data: void 0,
        error: null,
        failureCount: 0,
        failureReason: null,
        isPaused: false,
        status: "idle",
        variables: void 0
      };
    }
    __name(getDefaultState, "getDefaultState");
    exports.Mutation = Mutation;
    exports.getDefaultState = getDefaultState;
  }
});

// ../../../tmp/node_modules/@tanstack/query-core/build/lib/mutationCache.js
var require_mutationCache = __commonJS({
  "../../../tmp/node_modules/@tanstack/query-core/build/lib/mutationCache.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var notifyManager2 = require_notifyManager();
    var mutation = require_mutation();
    var utils = require_utils();
    var subscribable = require_subscribable();
    var MutationCache2 = class extends subscribable.Subscribable {
      constructor(config) {
        super();
        this.config = config || {};
        this.mutations = [];
        this.mutationId = 0;
      }
      build(client, options, state) {
        const mutation$1 = new mutation.Mutation({
          mutationCache: this,
          logger: client.getLogger(),
          mutationId: ++this.mutationId,
          options: client.defaultMutationOptions(options),
          state,
          defaultOptions: options.mutationKey ? client.getMutationDefaults(options.mutationKey) : void 0
        });
        this.add(mutation$1);
        return mutation$1;
      }
      add(mutation2) {
        this.mutations.push(mutation2);
        this.notify({
          type: "added",
          mutation: mutation2
        });
      }
      remove(mutation2) {
        this.mutations = this.mutations.filter((x) => x !== mutation2);
        this.notify({
          type: "removed",
          mutation: mutation2
        });
      }
      clear() {
        notifyManager2.notifyManager.batch(() => {
          this.mutations.forEach((mutation2) => {
            this.remove(mutation2);
          });
        });
      }
      getAll() {
        return this.mutations;
      }
      find(filters) {
        if (typeof filters.exact === "undefined") {
          filters.exact = true;
        }
        return this.mutations.find((mutation2) => utils.matchMutation(filters, mutation2));
      }
      findAll(filters) {
        return this.mutations.filter((mutation2) => utils.matchMutation(filters, mutation2));
      }
      notify(event) {
        notifyManager2.notifyManager.batch(() => {
          this.listeners.forEach((listener) => {
            listener(event);
          });
        });
      }
      resumePausedMutations() {
        var _this$resuming;
        this.resuming = ((_this$resuming = this.resuming) != null ? _this$resuming : Promise.resolve()).then(() => {
          const pausedMutations = this.mutations.filter((x) => x.state.isPaused);
          return notifyManager2.notifyManager.batch(() => pausedMutations.reduce((promise, mutation2) => promise.then(() => mutation2.continue().catch(utils.noop)), Promise.resolve()));
        }).then(() => {
          this.resuming = void 0;
        });
        return this.resuming;
      }
    };
    __name(MutationCache2, "MutationCache");
    exports.MutationCache = MutationCache2;
  }
});

// ../../../tmp/node_modules/@tanstack/query-core/build/lib/infiniteQueryBehavior.js
var require_infiniteQueryBehavior = __commonJS({
  "../../../tmp/node_modules/@tanstack/query-core/build/lib/infiniteQueryBehavior.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function infiniteQueryBehavior() {
      return {
        onFetch: (context) => {
          context.fetchFn = () => {
            var _context$fetchOptions, _context$fetchOptions2, _context$fetchOptions3, _context$fetchOptions4, _context$state$data, _context$state$data2;
            const refetchPage = (_context$fetchOptions = context.fetchOptions) == null ? void 0 : (_context$fetchOptions2 = _context$fetchOptions.meta) == null ? void 0 : _context$fetchOptions2.refetchPage;
            const fetchMore = (_context$fetchOptions3 = context.fetchOptions) == null ? void 0 : (_context$fetchOptions4 = _context$fetchOptions3.meta) == null ? void 0 : _context$fetchOptions4.fetchMore;
            const pageParam = fetchMore == null ? void 0 : fetchMore.pageParam;
            const isFetchingNextPage = (fetchMore == null ? void 0 : fetchMore.direction) === "forward";
            const isFetchingPreviousPage = (fetchMore == null ? void 0 : fetchMore.direction) === "backward";
            const oldPages = ((_context$state$data = context.state.data) == null ? void 0 : _context$state$data.pages) || [];
            const oldPageParams = ((_context$state$data2 = context.state.data) == null ? void 0 : _context$state$data2.pageParams) || [];
            let newPageParams = oldPageParams;
            let cancelled = false;
            const addSignalProperty = /* @__PURE__ */ __name((object) => {
              Object.defineProperty(object, "signal", {
                enumerable: true,
                get: () => {
                  var _context$signal;
                  if ((_context$signal = context.signal) != null && _context$signal.aborted) {
                    cancelled = true;
                  } else {
                    var _context$signal2;
                    (_context$signal2 = context.signal) == null ? void 0 : _context$signal2.addEventListener("abort", () => {
                      cancelled = true;
                    });
                  }
                  return context.signal;
                }
              });
            }, "addSignalProperty");
            const queryFn = context.options.queryFn || (() => Promise.reject("Missing queryFn"));
            const buildNewPages = /* @__PURE__ */ __name((pages, param, page, previous) => {
              newPageParams = previous ? [param, ...newPageParams] : [...newPageParams, param];
              return previous ? [page, ...pages] : [...pages, page];
            }, "buildNewPages");
            const fetchPage = /* @__PURE__ */ __name((pages, manual, param, previous) => {
              if (cancelled) {
                return Promise.reject("Cancelled");
              }
              if (typeof param === "undefined" && !manual && pages.length) {
                return Promise.resolve(pages);
              }
              const queryFnContext = {
                queryKey: context.queryKey,
                pageParam: param,
                meta: context.options.meta
              };
              addSignalProperty(queryFnContext);
              const queryFnResult = queryFn(queryFnContext);
              const promise2 = Promise.resolve(queryFnResult).then((page) => buildNewPages(pages, param, page, previous));
              return promise2;
            }, "fetchPage");
            let promise;
            if (!oldPages.length) {
              promise = fetchPage([]);
            } else if (isFetchingNextPage) {
              const manual = typeof pageParam !== "undefined";
              const param = manual ? pageParam : getNextPageParam(context.options, oldPages);
              promise = fetchPage(oldPages, manual, param);
            } else if (isFetchingPreviousPage) {
              const manual = typeof pageParam !== "undefined";
              const param = manual ? pageParam : getPreviousPageParam(context.options, oldPages);
              promise = fetchPage(oldPages, manual, param, true);
            } else {
              newPageParams = [];
              const manual = typeof context.options.getNextPageParam === "undefined";
              const shouldFetchFirstPage = refetchPage && oldPages[0] ? refetchPage(oldPages[0], 0, oldPages) : true;
              promise = shouldFetchFirstPage ? fetchPage([], manual, oldPageParams[0]) : Promise.resolve(buildNewPages([], oldPageParams[0], oldPages[0]));
              for (let i = 1; i < oldPages.length; i++) {
                promise = promise.then((pages) => {
                  const shouldFetchNextPage = refetchPage && oldPages[i] ? refetchPage(oldPages[i], i, oldPages) : true;
                  if (shouldFetchNextPage) {
                    const param = manual ? oldPageParams[i] : getNextPageParam(context.options, pages);
                    return fetchPage(pages, manual, param);
                  }
                  return Promise.resolve(buildNewPages(pages, oldPageParams[i], oldPages[i]));
                });
              }
            }
            const finalPromise = promise.then((pages) => ({
              pages,
              pageParams: newPageParams
            }));
            return finalPromise;
          };
        }
      };
    }
    __name(infiniteQueryBehavior, "infiniteQueryBehavior");
    function getNextPageParam(options, pages) {
      return options.getNextPageParam == null ? void 0 : options.getNextPageParam(pages[pages.length - 1], pages);
    }
    __name(getNextPageParam, "getNextPageParam");
    function getPreviousPageParam(options, pages) {
      return options.getPreviousPageParam == null ? void 0 : options.getPreviousPageParam(pages[0], pages);
    }
    __name(getPreviousPageParam, "getPreviousPageParam");
    function hasNextPage(options, pages) {
      if (options.getNextPageParam && Array.isArray(pages)) {
        const nextPageParam = getNextPageParam(options, pages);
        return typeof nextPageParam !== "undefined" && nextPageParam !== null && nextPageParam !== false;
      }
      return;
    }
    __name(hasNextPage, "hasNextPage");
    function hasPreviousPage(options, pages) {
      if (options.getPreviousPageParam && Array.isArray(pages)) {
        const previousPageParam = getPreviousPageParam(options, pages);
        return typeof previousPageParam !== "undefined" && previousPageParam !== null && previousPageParam !== false;
      }
      return;
    }
    __name(hasPreviousPage, "hasPreviousPage");
    exports.getNextPageParam = getNextPageParam;
    exports.getPreviousPageParam = getPreviousPageParam;
    exports.hasNextPage = hasNextPage;
    exports.hasPreviousPage = hasPreviousPage;
    exports.infiniteQueryBehavior = infiniteQueryBehavior;
  }
});

// ../../../tmp/node_modules/@tanstack/query-core/build/lib/queryClient.js
var require_queryClient = __commonJS({
  "../../../tmp/node_modules/@tanstack/query-core/build/lib/queryClient.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_utils();
    var queryCache = require_queryCache();
    var mutationCache = require_mutationCache();
    var focusManager2 = require_focusManager();
    var onlineManager2 = require_onlineManager();
    var notifyManager2 = require_notifyManager();
    var infiniteQueryBehavior = require_infiniteQueryBehavior();
    var logger = require_logger();
    var QueryClient2 = class {
      constructor(config = {}) {
        this.queryCache = config.queryCache || new queryCache.QueryCache();
        this.mutationCache = config.mutationCache || new mutationCache.MutationCache();
        this.logger = config.logger || logger.defaultLogger;
        this.defaultOptions = config.defaultOptions || {};
        this.queryDefaults = [];
        this.mutationDefaults = [];
        this.mountCount = 0;
        if (config.logger) {
          this.logger.error("Passing a custom logger has been deprecated and will be removed in the next major version.");
        }
      }
      mount() {
        this.mountCount++;
        if (this.mountCount !== 1)
          return;
        this.unsubscribeFocus = focusManager2.focusManager.subscribe(() => {
          if (focusManager2.focusManager.isFocused()) {
            this.resumePausedMutations();
            this.queryCache.onFocus();
          }
        });
        this.unsubscribeOnline = onlineManager2.onlineManager.subscribe(() => {
          if (onlineManager2.onlineManager.isOnline()) {
            this.resumePausedMutations();
            this.queryCache.onOnline();
          }
        });
      }
      unmount() {
        var _this$unsubscribeFocu, _this$unsubscribeOnli;
        this.mountCount--;
        if (this.mountCount !== 0)
          return;
        (_this$unsubscribeFocu = this.unsubscribeFocus) == null ? void 0 : _this$unsubscribeFocu.call(this);
        this.unsubscribeFocus = void 0;
        (_this$unsubscribeOnli = this.unsubscribeOnline) == null ? void 0 : _this$unsubscribeOnli.call(this);
        this.unsubscribeOnline = void 0;
      }
      isFetching(arg1, arg2) {
        const [filters] = utils.parseFilterArgs(arg1, arg2);
        filters.fetchStatus = "fetching";
        return this.queryCache.findAll(filters).length;
      }
      isMutating(filters) {
        return this.mutationCache.findAll({
          ...filters,
          fetching: true
        }).length;
      }
      getQueryData(queryKey, filters) {
        var _this$queryCache$find;
        return (_this$queryCache$find = this.queryCache.find(queryKey, filters)) == null ? void 0 : _this$queryCache$find.state.data;
      }
      ensureQueryData(arg1, arg2, arg3) {
        const parsedOptions = utils.parseQueryArgs(arg1, arg2, arg3);
        const cachedData = this.getQueryData(parsedOptions.queryKey);
        return cachedData ? Promise.resolve(cachedData) : this.fetchQuery(parsedOptions);
      }
      getQueriesData(queryKeyOrFilters) {
        return this.getQueryCache().findAll(queryKeyOrFilters).map(({
          queryKey,
          state
        }) => {
          const data = state.data;
          return [queryKey, data];
        });
      }
      setQueryData(queryKey, updater, options) {
        const query = this.queryCache.find(queryKey);
        const prevData = query == null ? void 0 : query.state.data;
        const data = utils.functionalUpdate(updater, prevData);
        if (typeof data === "undefined") {
          return void 0;
        }
        const parsedOptions = utils.parseQueryArgs(queryKey);
        const defaultedOptions = this.defaultQueryOptions(parsedOptions);
        return this.queryCache.build(this, defaultedOptions).setData(data, {
          ...options,
          manual: true
        });
      }
      setQueriesData(queryKeyOrFilters, updater, options) {
        return notifyManager2.notifyManager.batch(() => this.getQueryCache().findAll(queryKeyOrFilters).map(({
          queryKey
        }) => [queryKey, this.setQueryData(queryKey, updater, options)]));
      }
      getQueryState(queryKey, filters) {
        var _this$queryCache$find2;
        return (_this$queryCache$find2 = this.queryCache.find(queryKey, filters)) == null ? void 0 : _this$queryCache$find2.state;
      }
      removeQueries(arg1, arg2) {
        const [filters] = utils.parseFilterArgs(arg1, arg2);
        const queryCache2 = this.queryCache;
        notifyManager2.notifyManager.batch(() => {
          queryCache2.findAll(filters).forEach((query) => {
            queryCache2.remove(query);
          });
        });
      }
      resetQueries(arg1, arg2, arg3) {
        const [filters, options] = utils.parseFilterArgs(arg1, arg2, arg3);
        const queryCache2 = this.queryCache;
        const refetchFilters = {
          type: "active",
          ...filters
        };
        return notifyManager2.notifyManager.batch(() => {
          queryCache2.findAll(filters).forEach((query) => {
            query.reset();
          });
          return this.refetchQueries(refetchFilters, options);
        });
      }
      cancelQueries(arg1, arg2, arg3) {
        const [filters, cancelOptions = {}] = utils.parseFilterArgs(arg1, arg2, arg3);
        if (typeof cancelOptions.revert === "undefined") {
          cancelOptions.revert = true;
        }
        const promises = notifyManager2.notifyManager.batch(() => this.queryCache.findAll(filters).map((query) => query.cancel(cancelOptions)));
        return Promise.all(promises).then(utils.noop).catch(utils.noop);
      }
      invalidateQueries(arg1, arg2, arg3) {
        const [filters, options] = utils.parseFilterArgs(arg1, arg2, arg3);
        return notifyManager2.notifyManager.batch(() => {
          var _ref, _filters$refetchType;
          this.queryCache.findAll(filters).forEach((query) => {
            query.invalidate();
          });
          if (filters.refetchType === "none") {
            return Promise.resolve();
          }
          const refetchFilters = {
            ...filters,
            type: (_ref = (_filters$refetchType = filters.refetchType) != null ? _filters$refetchType : filters.type) != null ? _ref : "active"
          };
          return this.refetchQueries(refetchFilters, options);
        });
      }
      refetchQueries(arg1, arg2, arg3) {
        const [filters, options] = utils.parseFilterArgs(arg1, arg2, arg3);
        const promises = notifyManager2.notifyManager.batch(() => this.queryCache.findAll(filters).filter((query) => !query.isDisabled()).map((query) => {
          var _options$cancelRefetc;
          return query.fetch(void 0, {
            ...options,
            cancelRefetch: (_options$cancelRefetc = options == null ? void 0 : options.cancelRefetch) != null ? _options$cancelRefetc : true,
            meta: {
              refetchPage: filters.refetchPage
            }
          });
        }));
        let promise = Promise.all(promises).then(utils.noop);
        if (!(options != null && options.throwOnError)) {
          promise = promise.catch(utils.noop);
        }
        return promise;
      }
      fetchQuery(arg1, arg2, arg3) {
        const parsedOptions = utils.parseQueryArgs(arg1, arg2, arg3);
        const defaultedOptions = this.defaultQueryOptions(parsedOptions);
        if (typeof defaultedOptions.retry === "undefined") {
          defaultedOptions.retry = false;
        }
        const query = this.queryCache.build(this, defaultedOptions);
        return query.isStaleByTime(defaultedOptions.staleTime) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
      }
      prefetchQuery(arg1, arg2, arg3) {
        return this.fetchQuery(arg1, arg2, arg3).then(utils.noop).catch(utils.noop);
      }
      fetchInfiniteQuery(arg1, arg2, arg3) {
        const parsedOptions = utils.parseQueryArgs(arg1, arg2, arg3);
        parsedOptions.behavior = infiniteQueryBehavior.infiniteQueryBehavior();
        return this.fetchQuery(parsedOptions);
      }
      prefetchInfiniteQuery(arg1, arg2, arg3) {
        return this.fetchInfiniteQuery(arg1, arg2, arg3).then(utils.noop).catch(utils.noop);
      }
      resumePausedMutations() {
        return this.mutationCache.resumePausedMutations();
      }
      getQueryCache() {
        return this.queryCache;
      }
      getMutationCache() {
        return this.mutationCache;
      }
      getLogger() {
        return this.logger;
      }
      getDefaultOptions() {
        return this.defaultOptions;
      }
      setDefaultOptions(options) {
        this.defaultOptions = options;
      }
      setQueryDefaults(queryKey, options) {
        const result = this.queryDefaults.find((x) => utils.hashQueryKey(queryKey) === utils.hashQueryKey(x.queryKey));
        if (result) {
          result.defaultOptions = options;
        } else {
          this.queryDefaults.push({
            queryKey,
            defaultOptions: options
          });
        }
      }
      getQueryDefaults(queryKey) {
        if (!queryKey) {
          return void 0;
        }
        const firstMatchingDefaults = this.queryDefaults.find((x) => utils.partialMatchKey(queryKey, x.queryKey));
        if (true) {
          const matchingDefaults = this.queryDefaults.filter((x) => utils.partialMatchKey(queryKey, x.queryKey));
          if (matchingDefaults.length > 1) {
            this.logger.error("[QueryClient] Several query defaults match with key '" + JSON.stringify(queryKey) + "'. The first matching query defaults are used. Please check how query defaults are registered. Order does matter here. cf. https://react-query.tanstack.com/reference/QueryClient#queryclientsetquerydefaults.");
          }
        }
        return firstMatchingDefaults == null ? void 0 : firstMatchingDefaults.defaultOptions;
      }
      setMutationDefaults(mutationKey, options) {
        const result = this.mutationDefaults.find((x) => utils.hashQueryKey(mutationKey) === utils.hashQueryKey(x.mutationKey));
        if (result) {
          result.defaultOptions = options;
        } else {
          this.mutationDefaults.push({
            mutationKey,
            defaultOptions: options
          });
        }
      }
      getMutationDefaults(mutationKey) {
        if (!mutationKey) {
          return void 0;
        }
        const firstMatchingDefaults = this.mutationDefaults.find((x) => utils.partialMatchKey(mutationKey, x.mutationKey));
        if (true) {
          const matchingDefaults = this.mutationDefaults.filter((x) => utils.partialMatchKey(mutationKey, x.mutationKey));
          if (matchingDefaults.length > 1) {
            this.logger.error("[QueryClient] Several mutation defaults match with key '" + JSON.stringify(mutationKey) + "'. The first matching mutation defaults are used. Please check how mutation defaults are registered. Order does matter here. cf. https://react-query.tanstack.com/reference/QueryClient#queryclientsetmutationdefaults.");
          }
        }
        return firstMatchingDefaults == null ? void 0 : firstMatchingDefaults.defaultOptions;
      }
      defaultQueryOptions(options) {
        if (options != null && options._defaulted) {
          return options;
        }
        const defaultedOptions = {
          ...this.defaultOptions.queries,
          ...this.getQueryDefaults(options == null ? void 0 : options.queryKey),
          ...options,
          _defaulted: true
        };
        if (!defaultedOptions.queryHash && defaultedOptions.queryKey) {
          defaultedOptions.queryHash = utils.hashQueryKeyByOptions(defaultedOptions.queryKey, defaultedOptions);
        }
        if (typeof defaultedOptions.refetchOnReconnect === "undefined") {
          defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
        }
        if (typeof defaultedOptions.useErrorBoundary === "undefined") {
          defaultedOptions.useErrorBoundary = !!defaultedOptions.suspense;
        }
        return defaultedOptions;
      }
      defaultMutationOptions(options) {
        if (options != null && options._defaulted) {
          return options;
        }
        return {
          ...this.defaultOptions.mutations,
          ...this.getMutationDefaults(options == null ? void 0 : options.mutationKey),
          ...options,
          _defaulted: true
        };
      }
      clear() {
        this.queryCache.clear();
        this.mutationCache.clear();
      }
    };
    __name(QueryClient2, "QueryClient");
    exports.QueryClient = QueryClient2;
  }
});

// ../../../tmp/node_modules/@tanstack/query-core/build/lib/queryObserver.js
var require_queryObserver = __commonJS({
  "../../../tmp/node_modules/@tanstack/query-core/build/lib/queryObserver.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_utils();
    var notifyManager2 = require_notifyManager();
    var focusManager2 = require_focusManager();
    var subscribable = require_subscribable();
    var retryer = require_retryer();
    var QueryObserver2 = class extends subscribable.Subscribable {
      constructor(client, options) {
        super();
        this.client = client;
        this.options = options;
        this.trackedProps = /* @__PURE__ */ new Set();
        this.selectError = null;
        this.bindMethods();
        this.setOptions(options);
      }
      bindMethods() {
        this.remove = this.remove.bind(this);
        this.refetch = this.refetch.bind(this);
      }
      onSubscribe() {
        if (this.listeners.length === 1) {
          this.currentQuery.addObserver(this);
          if (shouldFetchOnMount(this.currentQuery, this.options)) {
            this.executeFetch();
          }
          this.updateTimers();
        }
      }
      onUnsubscribe() {
        if (!this.listeners.length) {
          this.destroy();
        }
      }
      shouldFetchOnReconnect() {
        return shouldFetchOn(this.currentQuery, this.options, this.options.refetchOnReconnect);
      }
      shouldFetchOnWindowFocus() {
        return shouldFetchOn(this.currentQuery, this.options, this.options.refetchOnWindowFocus);
      }
      destroy() {
        this.listeners = [];
        this.clearStaleTimeout();
        this.clearRefetchInterval();
        this.currentQuery.removeObserver(this);
      }
      setOptions(options, notifyOptions) {
        const prevOptions = this.options;
        const prevQuery = this.currentQuery;
        this.options = this.client.defaultQueryOptions(options);
        if (typeof (options == null ? void 0 : options.isDataEqual) !== "undefined") {
          this.client.getLogger().error("The isDataEqual option has been deprecated and will be removed in the next major version. You can achieve the same functionality by passing a function as the structuralSharing option");
        }
        if (!utils.shallowEqualObjects(prevOptions, this.options)) {
          this.client.getQueryCache().notify({
            type: "observerOptionsUpdated",
            query: this.currentQuery,
            observer: this
          });
        }
        if (typeof this.options.enabled !== "undefined" && typeof this.options.enabled !== "boolean") {
          throw new Error("Expected enabled to be a boolean");
        }
        if (!this.options.queryKey) {
          this.options.queryKey = prevOptions.queryKey;
        }
        this.updateQuery();
        const mounted = this.hasListeners();
        if (mounted && shouldFetchOptionally(this.currentQuery, prevQuery, this.options, prevOptions)) {
          this.executeFetch();
        }
        this.updateResult(notifyOptions);
        if (mounted && (this.currentQuery !== prevQuery || this.options.enabled !== prevOptions.enabled || this.options.staleTime !== prevOptions.staleTime)) {
          this.updateStaleTimeout();
        }
        const nextRefetchInterval = this.computeRefetchInterval();
        if (mounted && (this.currentQuery !== prevQuery || this.options.enabled !== prevOptions.enabled || nextRefetchInterval !== this.currentRefetchInterval)) {
          this.updateRefetchInterval(nextRefetchInterval);
        }
      }
      getOptimisticResult(options) {
        const query = this.client.getQueryCache().build(this.client, options);
        return this.createResult(query, options);
      }
      getCurrentResult() {
        return this.currentResult;
      }
      trackResult(result) {
        const trackedResult = {};
        Object.keys(result).forEach((key) => {
          Object.defineProperty(trackedResult, key, {
            configurable: false,
            enumerable: true,
            get: () => {
              this.trackedProps.add(key);
              return result[key];
            }
          });
        });
        return trackedResult;
      }
      getCurrentQuery() {
        return this.currentQuery;
      }
      remove() {
        this.client.getQueryCache().remove(this.currentQuery);
      }
      refetch({
        refetchPage,
        ...options
      } = {}) {
        return this.fetch({
          ...options,
          meta: {
            refetchPage
          }
        });
      }
      fetchOptimistic(options) {
        const defaultedOptions = this.client.defaultQueryOptions(options);
        const query = this.client.getQueryCache().build(this.client, defaultedOptions);
        query.isFetchingOptimistic = true;
        return query.fetch().then(() => this.createResult(query, defaultedOptions));
      }
      fetch(fetchOptions) {
        var _fetchOptions$cancelR;
        return this.executeFetch({
          ...fetchOptions,
          cancelRefetch: (_fetchOptions$cancelR = fetchOptions.cancelRefetch) != null ? _fetchOptions$cancelR : true
        }).then(() => {
          this.updateResult();
          return this.currentResult;
        });
      }
      executeFetch(fetchOptions) {
        this.updateQuery();
        let promise = this.currentQuery.fetch(this.options, fetchOptions);
        if (!(fetchOptions != null && fetchOptions.throwOnError)) {
          promise = promise.catch(utils.noop);
        }
        return promise;
      }
      updateStaleTimeout() {
        this.clearStaleTimeout();
        if (utils.isServer || this.currentResult.isStale || !utils.isValidTimeout(this.options.staleTime)) {
          return;
        }
        const time = utils.timeUntilStale(this.currentResult.dataUpdatedAt, this.options.staleTime);
        const timeout = time + 1;
        this.staleTimeoutId = setTimeout(() => {
          if (!this.currentResult.isStale) {
            this.updateResult();
          }
        }, timeout);
      }
      computeRefetchInterval() {
        var _this$options$refetch;
        return typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(this.currentResult.data, this.currentQuery) : (_this$options$refetch = this.options.refetchInterval) != null ? _this$options$refetch : false;
      }
      updateRefetchInterval(nextInterval) {
        this.clearRefetchInterval();
        this.currentRefetchInterval = nextInterval;
        if (utils.isServer || this.options.enabled === false || !utils.isValidTimeout(this.currentRefetchInterval) || this.currentRefetchInterval === 0) {
          return;
        }
        this.refetchIntervalId = setInterval(() => {
          if (this.options.refetchIntervalInBackground || focusManager2.focusManager.isFocused()) {
            this.executeFetch();
          }
        }, this.currentRefetchInterval);
      }
      updateTimers() {
        this.updateStaleTimeout();
        this.updateRefetchInterval(this.computeRefetchInterval());
      }
      clearStaleTimeout() {
        if (this.staleTimeoutId) {
          clearTimeout(this.staleTimeoutId);
          this.staleTimeoutId = void 0;
        }
      }
      clearRefetchInterval() {
        if (this.refetchIntervalId) {
          clearInterval(this.refetchIntervalId);
          this.refetchIntervalId = void 0;
        }
      }
      createResult(query, options) {
        const prevQuery = this.currentQuery;
        const prevOptions = this.options;
        const prevResult = this.currentResult;
        const prevResultState = this.currentResultState;
        const prevResultOptions = this.currentResultOptions;
        const queryChange = query !== prevQuery;
        const queryInitialState = queryChange ? query.state : this.currentQueryInitialState;
        const prevQueryResult = queryChange ? this.currentResult : this.previousQueryResult;
        const {
          state
        } = query;
        let {
          dataUpdatedAt,
          error,
          errorUpdatedAt,
          fetchStatus,
          status
        } = state;
        let isPreviousData = false;
        let isPlaceholderData = false;
        let data;
        if (options._optimisticResults) {
          const mounted = this.hasListeners();
          const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
          const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
          if (fetchOnMount || fetchOptionally) {
            fetchStatus = retryer.canFetch(query.options.networkMode) ? "fetching" : "paused";
            if (!dataUpdatedAt) {
              status = "loading";
            }
          }
          if (options._optimisticResults === "isRestoring") {
            fetchStatus = "idle";
          }
        }
        if (options.keepPreviousData && !state.dataUpdatedAt && prevQueryResult != null && prevQueryResult.isSuccess && status !== "error") {
          data = prevQueryResult.data;
          dataUpdatedAt = prevQueryResult.dataUpdatedAt;
          status = prevQueryResult.status;
          isPreviousData = true;
        } else if (options.select && typeof state.data !== "undefined") {
          if (prevResult && state.data === (prevResultState == null ? void 0 : prevResultState.data) && options.select === this.selectFn) {
            data = this.selectResult;
          } else {
            try {
              this.selectFn = options.select;
              data = options.select(state.data);
              data = utils.replaceData(prevResult == null ? void 0 : prevResult.data, data, options);
              this.selectResult = data;
              this.selectError = null;
            } catch (selectError) {
              if (true) {
                this.client.getLogger().error(selectError);
              }
              this.selectError = selectError;
            }
          }
        } else {
          data = state.data;
        }
        if (typeof options.placeholderData !== "undefined" && typeof data === "undefined" && status === "loading") {
          let placeholderData;
          if (prevResult != null && prevResult.isPlaceholderData && options.placeholderData === (prevResultOptions == null ? void 0 : prevResultOptions.placeholderData)) {
            placeholderData = prevResult.data;
          } else {
            placeholderData = typeof options.placeholderData === "function" ? options.placeholderData() : options.placeholderData;
            if (options.select && typeof placeholderData !== "undefined") {
              try {
                placeholderData = options.select(placeholderData);
                this.selectError = null;
              } catch (selectError) {
                if (true) {
                  this.client.getLogger().error(selectError);
                }
                this.selectError = selectError;
              }
            }
          }
          if (typeof placeholderData !== "undefined") {
            status = "success";
            data = utils.replaceData(prevResult == null ? void 0 : prevResult.data, placeholderData, options);
            isPlaceholderData = true;
          }
        }
        if (this.selectError) {
          error = this.selectError;
          data = this.selectResult;
          errorUpdatedAt = Date.now();
          status = "error";
        }
        const isFetching = fetchStatus === "fetching";
        const isLoading = status === "loading";
        const isError2 = status === "error";
        const result = {
          status,
          fetchStatus,
          isLoading,
          isSuccess: status === "success",
          isError: isError2,
          isInitialLoading: isLoading && isFetching,
          data,
          dataUpdatedAt,
          error,
          errorUpdatedAt,
          failureCount: state.fetchFailureCount,
          failureReason: state.fetchFailureReason,
          errorUpdateCount: state.errorUpdateCount,
          isFetched: state.dataUpdateCount > 0 || state.errorUpdateCount > 0,
          isFetchedAfterMount: state.dataUpdateCount > queryInitialState.dataUpdateCount || state.errorUpdateCount > queryInitialState.errorUpdateCount,
          isFetching,
          isRefetching: isFetching && !isLoading,
          isLoadingError: isError2 && state.dataUpdatedAt === 0,
          isPaused: fetchStatus === "paused",
          isPlaceholderData,
          isPreviousData,
          isRefetchError: isError2 && state.dataUpdatedAt !== 0,
          isStale: isStale(query, options),
          refetch: this.refetch,
          remove: this.remove
        };
        return result;
      }
      updateResult(notifyOptions) {
        const prevResult = this.currentResult;
        const nextResult = this.createResult(this.currentQuery, this.options);
        this.currentResultState = this.currentQuery.state;
        this.currentResultOptions = this.options;
        if (utils.shallowEqualObjects(nextResult, prevResult)) {
          return;
        }
        this.currentResult = nextResult;
        const defaultNotifyOptions = {
          cache: true
        };
        const shouldNotifyListeners = /* @__PURE__ */ __name(() => {
          if (!prevResult) {
            return true;
          }
          const {
            notifyOnChangeProps
          } = this.options;
          if (notifyOnChangeProps === "all" || !notifyOnChangeProps && !this.trackedProps.size) {
            return true;
          }
          const includedProps = new Set(notifyOnChangeProps != null ? notifyOnChangeProps : this.trackedProps);
          if (this.options.useErrorBoundary) {
            includedProps.add("error");
          }
          return Object.keys(this.currentResult).some((key) => {
            const typedKey = key;
            const changed = this.currentResult[typedKey] !== prevResult[typedKey];
            return changed && includedProps.has(typedKey);
          });
        }, "shouldNotifyListeners");
        if ((notifyOptions == null ? void 0 : notifyOptions.listeners) !== false && shouldNotifyListeners()) {
          defaultNotifyOptions.listeners = true;
        }
        this.notify({
          ...defaultNotifyOptions,
          ...notifyOptions
        });
      }
      updateQuery() {
        const query = this.client.getQueryCache().build(this.client, this.options);
        if (query === this.currentQuery) {
          return;
        }
        const prevQuery = this.currentQuery;
        this.currentQuery = query;
        this.currentQueryInitialState = query.state;
        this.previousQueryResult = this.currentResult;
        if (this.hasListeners()) {
          prevQuery == null ? void 0 : prevQuery.removeObserver(this);
          query.addObserver(this);
        }
      }
      onQueryUpdate(action) {
        const notifyOptions = {};
        if (action.type === "success") {
          notifyOptions.onSuccess = !action.manual;
        } else if (action.type === "error" && !retryer.isCancelledError(action.error)) {
          notifyOptions.onError = true;
        }
        this.updateResult(notifyOptions);
        if (this.hasListeners()) {
          this.updateTimers();
        }
      }
      notify(notifyOptions) {
        notifyManager2.notifyManager.batch(() => {
          if (notifyOptions.onSuccess) {
            var _this$options$onSucce, _this$options, _this$options$onSettl, _this$options2;
            (_this$options$onSucce = (_this$options = this.options).onSuccess) == null ? void 0 : _this$options$onSucce.call(_this$options, this.currentResult.data);
            (_this$options$onSettl = (_this$options2 = this.options).onSettled) == null ? void 0 : _this$options$onSettl.call(_this$options2, this.currentResult.data, null);
          } else if (notifyOptions.onError) {
            var _this$options$onError, _this$options3, _this$options$onSettl2, _this$options4;
            (_this$options$onError = (_this$options3 = this.options).onError) == null ? void 0 : _this$options$onError.call(_this$options3, this.currentResult.error);
            (_this$options$onSettl2 = (_this$options4 = this.options).onSettled) == null ? void 0 : _this$options$onSettl2.call(_this$options4, void 0, this.currentResult.error);
          }
          if (notifyOptions.listeners) {
            this.listeners.forEach((listener) => {
              listener(this.currentResult);
            });
          }
          if (notifyOptions.cache) {
            this.client.getQueryCache().notify({
              query: this.currentQuery,
              type: "observerResultsUpdated"
            });
          }
        });
      }
    };
    __name(QueryObserver2, "QueryObserver");
    function shouldLoadOnMount(query, options) {
      return options.enabled !== false && !query.state.dataUpdatedAt && !(query.state.status === "error" && options.retryOnMount === false);
    }
    __name(shouldLoadOnMount, "shouldLoadOnMount");
    function shouldFetchOnMount(query, options) {
      return shouldLoadOnMount(query, options) || query.state.dataUpdatedAt > 0 && shouldFetchOn(query, options, options.refetchOnMount);
    }
    __name(shouldFetchOnMount, "shouldFetchOnMount");
    function shouldFetchOn(query, options, field) {
      if (options.enabled !== false) {
        const value = typeof field === "function" ? field(query) : field;
        return value === "always" || value !== false && isStale(query, options);
      }
      return false;
    }
    __name(shouldFetchOn, "shouldFetchOn");
    function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
      return options.enabled !== false && (query !== prevQuery || prevOptions.enabled === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
    }
    __name(shouldFetchOptionally, "shouldFetchOptionally");
    function isStale(query, options) {
      return query.isStaleByTime(options.staleTime);
    }
    __name(isStale, "isStale");
    exports.QueryObserver = QueryObserver2;
  }
});

// ../../../tmp/node_modules/@tanstack/query-core/build/lib/queriesObserver.js
var require_queriesObserver = __commonJS({
  "../../../tmp/node_modules/@tanstack/query-core/build/lib/queriesObserver.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_utils();
    var notifyManager2 = require_notifyManager();
    var queryObserver = require_queryObserver();
    var subscribable = require_subscribable();
    var QueriesObserver2 = class extends subscribable.Subscribable {
      constructor(client, queries) {
        super();
        this.client = client;
        this.queries = [];
        this.result = [];
        this.observers = [];
        this.observersMap = {};
        if (queries) {
          this.setQueries(queries);
        }
      }
      onSubscribe() {
        if (this.listeners.length === 1) {
          this.observers.forEach((observer) => {
            observer.subscribe((result) => {
              this.onUpdate(observer, result);
            });
          });
        }
      }
      onUnsubscribe() {
        if (!this.listeners.length) {
          this.destroy();
        }
      }
      destroy() {
        this.listeners = [];
        this.observers.forEach((observer) => {
          observer.destroy();
        });
      }
      setQueries(queries, notifyOptions) {
        this.queries = queries;
        notifyManager2.notifyManager.batch(() => {
          const prevObservers = this.observers;
          const newObserverMatches = this.findMatchingObservers(this.queries);
          newObserverMatches.forEach((match) => match.observer.setOptions(match.defaultedQueryOptions, notifyOptions));
          const newObservers = newObserverMatches.map((match) => match.observer);
          const newObserversMap = Object.fromEntries(newObservers.map((observer) => [observer.options.queryHash, observer]));
          const newResult = newObservers.map((observer) => observer.getCurrentResult());
          const hasIndexChange = newObservers.some((observer, index) => observer !== prevObservers[index]);
          if (prevObservers.length === newObservers.length && !hasIndexChange) {
            return;
          }
          this.observers = newObservers;
          this.observersMap = newObserversMap;
          this.result = newResult;
          if (!this.hasListeners()) {
            return;
          }
          utils.difference(prevObservers, newObservers).forEach((observer) => {
            observer.destroy();
          });
          utils.difference(newObservers, prevObservers).forEach((observer) => {
            observer.subscribe((result) => {
              this.onUpdate(observer, result);
            });
          });
          this.notify();
        });
      }
      getCurrentResult() {
        return this.result;
      }
      getQueries() {
        return this.observers.map((observer) => observer.getCurrentQuery());
      }
      getObservers() {
        return this.observers;
      }
      getOptimisticResult(queries) {
        return this.findMatchingObservers(queries).map((match) => match.observer.getOptimisticResult(match.defaultedQueryOptions));
      }
      findMatchingObservers(queries) {
        const prevObservers = this.observers;
        const defaultedQueryOptions = queries.map((options) => this.client.defaultQueryOptions(options));
        const matchingObservers = defaultedQueryOptions.flatMap((defaultedOptions) => {
          const match = prevObservers.find((observer) => observer.options.queryHash === defaultedOptions.queryHash);
          if (match != null) {
            return [{
              defaultedQueryOptions: defaultedOptions,
              observer: match
            }];
          }
          return [];
        });
        const matchedQueryHashes = matchingObservers.map((match) => match.defaultedQueryOptions.queryHash);
        const unmatchedQueries = defaultedQueryOptions.filter((defaultedOptions) => !matchedQueryHashes.includes(defaultedOptions.queryHash));
        const unmatchedObservers = prevObservers.filter((prevObserver) => !matchingObservers.some((match) => match.observer === prevObserver));
        const getObserver = /* @__PURE__ */ __name((options) => {
          const defaultedOptions = this.client.defaultQueryOptions(options);
          const currentObserver = this.observersMap[defaultedOptions.queryHash];
          return currentObserver != null ? currentObserver : new queryObserver.QueryObserver(this.client, defaultedOptions);
        }, "getObserver");
        const newOrReusedObservers = unmatchedQueries.map((options, index) => {
          if (options.keepPreviousData) {
            const previouslyUsedObserver = unmatchedObservers[index];
            if (previouslyUsedObserver !== void 0) {
              return {
                defaultedQueryOptions: options,
                observer: previouslyUsedObserver
              };
            }
          }
          return {
            defaultedQueryOptions: options,
            observer: getObserver(options)
          };
        });
        const sortMatchesByOrderOfQueries = /* @__PURE__ */ __name((a, b) => defaultedQueryOptions.indexOf(a.defaultedQueryOptions) - defaultedQueryOptions.indexOf(b.defaultedQueryOptions), "sortMatchesByOrderOfQueries");
        return matchingObservers.concat(newOrReusedObservers).sort(sortMatchesByOrderOfQueries);
      }
      onUpdate(observer, result) {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
          this.result = utils.replaceAt(this.result, index, result);
          this.notify();
        }
      }
      notify() {
        notifyManager2.notifyManager.batch(() => {
          this.listeners.forEach((listener) => {
            listener(this.result);
          });
        });
      }
    };
    __name(QueriesObserver2, "QueriesObserver");
    exports.QueriesObserver = QueriesObserver2;
  }
});

// ../../../tmp/node_modules/@tanstack/query-core/build/lib/infiniteQueryObserver.js
var require_infiniteQueryObserver = __commonJS({
  "../../../tmp/node_modules/@tanstack/query-core/build/lib/infiniteQueryObserver.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var queryObserver = require_queryObserver();
    var infiniteQueryBehavior = require_infiniteQueryBehavior();
    var InfiniteQueryObserver2 = class extends queryObserver.QueryObserver {
      // Type override
      // Type override
      // Type override
      // eslint-disable-next-line @typescript-eslint/no-useless-constructor
      constructor(client, options) {
        super(client, options);
      }
      bindMethods() {
        super.bindMethods();
        this.fetchNextPage = this.fetchNextPage.bind(this);
        this.fetchPreviousPage = this.fetchPreviousPage.bind(this);
      }
      setOptions(options, notifyOptions) {
        super.setOptions({
          ...options,
          behavior: infiniteQueryBehavior.infiniteQueryBehavior()
        }, notifyOptions);
      }
      getOptimisticResult(options) {
        options.behavior = infiniteQueryBehavior.infiniteQueryBehavior();
        return super.getOptimisticResult(options);
      }
      fetchNextPage({
        pageParam,
        ...options
      } = {}) {
        return this.fetch({
          ...options,
          meta: {
            fetchMore: {
              direction: "forward",
              pageParam
            }
          }
        });
      }
      fetchPreviousPage({
        pageParam,
        ...options
      } = {}) {
        return this.fetch({
          ...options,
          meta: {
            fetchMore: {
              direction: "backward",
              pageParam
            }
          }
        });
      }
      createResult(query, options) {
        var _state$fetchMeta, _state$fetchMeta$fetc, _state$fetchMeta2, _state$fetchMeta2$fet, _state$data, _state$data2;
        const {
          state
        } = query;
        const result = super.createResult(query, options);
        const {
          isFetching,
          isRefetching
        } = result;
        const isFetchingNextPage = isFetching && ((_state$fetchMeta = state.fetchMeta) == null ? void 0 : (_state$fetchMeta$fetc = _state$fetchMeta.fetchMore) == null ? void 0 : _state$fetchMeta$fetc.direction) === "forward";
        const isFetchingPreviousPage = isFetching && ((_state$fetchMeta2 = state.fetchMeta) == null ? void 0 : (_state$fetchMeta2$fet = _state$fetchMeta2.fetchMore) == null ? void 0 : _state$fetchMeta2$fet.direction) === "backward";
        return {
          ...result,
          fetchNextPage: this.fetchNextPage,
          fetchPreviousPage: this.fetchPreviousPage,
          hasNextPage: infiniteQueryBehavior.hasNextPage(options, (_state$data = state.data) == null ? void 0 : _state$data.pages),
          hasPreviousPage: infiniteQueryBehavior.hasPreviousPage(options, (_state$data2 = state.data) == null ? void 0 : _state$data2.pages),
          isFetchingNextPage,
          isFetchingPreviousPage,
          isRefetching: isRefetching && !isFetchingNextPage && !isFetchingPreviousPage
        };
      }
    };
    __name(InfiniteQueryObserver2, "InfiniteQueryObserver");
    exports.InfiniteQueryObserver = InfiniteQueryObserver2;
  }
});

// ../../../tmp/node_modules/@tanstack/query-core/build/lib/mutationObserver.js
var require_mutationObserver = __commonJS({
  "../../../tmp/node_modules/@tanstack/query-core/build/lib/mutationObserver.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mutation = require_mutation();
    var notifyManager2 = require_notifyManager();
    var subscribable = require_subscribable();
    var utils = require_utils();
    var MutationObserver2 = class extends subscribable.Subscribable {
      constructor(client, options) {
        super();
        this.client = client;
        this.setOptions(options);
        this.bindMethods();
        this.updateResult();
      }
      bindMethods() {
        this.mutate = this.mutate.bind(this);
        this.reset = this.reset.bind(this);
      }
      setOptions(options) {
        var _this$currentMutation;
        const prevOptions = this.options;
        this.options = this.client.defaultMutationOptions(options);
        if (!utils.shallowEqualObjects(prevOptions, this.options)) {
          this.client.getMutationCache().notify({
            type: "observerOptionsUpdated",
            mutation: this.currentMutation,
            observer: this
          });
        }
        (_this$currentMutation = this.currentMutation) == null ? void 0 : _this$currentMutation.setOptions(this.options);
      }
      onUnsubscribe() {
        if (!this.listeners.length) {
          var _this$currentMutation2;
          (_this$currentMutation2 = this.currentMutation) == null ? void 0 : _this$currentMutation2.removeObserver(this);
        }
      }
      onMutationUpdate(action) {
        this.updateResult();
        const notifyOptions = {
          listeners: true
        };
        if (action.type === "success") {
          notifyOptions.onSuccess = true;
        } else if (action.type === "error") {
          notifyOptions.onError = true;
        }
        this.notify(notifyOptions);
      }
      getCurrentResult() {
        return this.currentResult;
      }
      reset() {
        this.currentMutation = void 0;
        this.updateResult();
        this.notify({
          listeners: true
        });
      }
      mutate(variables, options) {
        this.mutateOptions = options;
        if (this.currentMutation) {
          this.currentMutation.removeObserver(this);
        }
        this.currentMutation = this.client.getMutationCache().build(this.client, {
          ...this.options,
          variables: typeof variables !== "undefined" ? variables : this.options.variables
        });
        this.currentMutation.addObserver(this);
        return this.currentMutation.execute();
      }
      updateResult() {
        const state = this.currentMutation ? this.currentMutation.state : mutation.getDefaultState();
        const result = {
          ...state,
          isLoading: state.status === "loading",
          isSuccess: state.status === "success",
          isError: state.status === "error",
          isIdle: state.status === "idle",
          mutate: this.mutate,
          reset: this.reset
        };
        this.currentResult = result;
      }
      notify(options) {
        notifyManager2.notifyManager.batch(() => {
          if (this.mutateOptions && this.hasListeners()) {
            if (options.onSuccess) {
              var _this$mutateOptions$o, _this$mutateOptions, _this$mutateOptions$o2, _this$mutateOptions2;
              (_this$mutateOptions$o = (_this$mutateOptions = this.mutateOptions).onSuccess) == null ? void 0 : _this$mutateOptions$o.call(_this$mutateOptions, this.currentResult.data, this.currentResult.variables, this.currentResult.context);
              (_this$mutateOptions$o2 = (_this$mutateOptions2 = this.mutateOptions).onSettled) == null ? void 0 : _this$mutateOptions$o2.call(_this$mutateOptions2, this.currentResult.data, null, this.currentResult.variables, this.currentResult.context);
            } else if (options.onError) {
              var _this$mutateOptions$o3, _this$mutateOptions3, _this$mutateOptions$o4, _this$mutateOptions4;
              (_this$mutateOptions$o3 = (_this$mutateOptions3 = this.mutateOptions).onError) == null ? void 0 : _this$mutateOptions$o3.call(_this$mutateOptions3, this.currentResult.error, this.currentResult.variables, this.currentResult.context);
              (_this$mutateOptions$o4 = (_this$mutateOptions4 = this.mutateOptions).onSettled) == null ? void 0 : _this$mutateOptions$o4.call(_this$mutateOptions4, void 0, this.currentResult.error, this.currentResult.variables, this.currentResult.context);
            }
          }
          if (options.listeners) {
            this.listeners.forEach((listener) => {
              listener(this.currentResult);
            });
          }
        });
      }
    };
    __name(MutationObserver2, "MutationObserver");
    exports.MutationObserver = MutationObserver2;
  }
});

// ../../../tmp/node_modules/@tanstack/query-core/build/lib/hydration.js
var require_hydration = __commonJS({
  "../../../tmp/node_modules/@tanstack/query-core/build/lib/hydration.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function dehydrateMutation(mutation) {
      return {
        mutationKey: mutation.options.mutationKey,
        state: mutation.state
      };
    }
    __name(dehydrateMutation, "dehydrateMutation");
    function dehydrateQuery(query) {
      return {
        state: query.state,
        queryKey: query.queryKey,
        queryHash: query.queryHash
      };
    }
    __name(dehydrateQuery, "dehydrateQuery");
    function defaultShouldDehydrateMutation2(mutation) {
      return mutation.state.isPaused;
    }
    __name(defaultShouldDehydrateMutation2, "defaultShouldDehydrateMutation");
    function defaultShouldDehydrateQuery2(query) {
      return query.state.status === "success";
    }
    __name(defaultShouldDehydrateQuery2, "defaultShouldDehydrateQuery");
    function dehydrate2(client, options = {}) {
      const mutations = [];
      const queries = [];
      if (options.dehydrateMutations !== false) {
        const shouldDehydrateMutation = options.shouldDehydrateMutation || defaultShouldDehydrateMutation2;
        client.getMutationCache().getAll().forEach((mutation) => {
          if (shouldDehydrateMutation(mutation)) {
            mutations.push(dehydrateMutation(mutation));
          }
        });
      }
      if (options.dehydrateQueries !== false) {
        const shouldDehydrateQuery = options.shouldDehydrateQuery || defaultShouldDehydrateQuery2;
        client.getQueryCache().getAll().forEach((query) => {
          if (shouldDehydrateQuery(query)) {
            queries.push(dehydrateQuery(query));
          }
        });
      }
      return {
        mutations,
        queries
      };
    }
    __name(dehydrate2, "dehydrate");
    function hydrate2(client, dehydratedState, options) {
      if (typeof dehydratedState !== "object" || dehydratedState === null) {
        return;
      }
      const mutationCache = client.getMutationCache();
      const queryCache = client.getQueryCache();
      const mutations = dehydratedState.mutations || [];
      const queries = dehydratedState.queries || [];
      mutations.forEach((dehydratedMutation) => {
        var _options$defaultOptio;
        mutationCache.build(client, {
          ...options == null ? void 0 : (_options$defaultOptio = options.defaultOptions) == null ? void 0 : _options$defaultOptio.mutations,
          mutationKey: dehydratedMutation.mutationKey
        }, dehydratedMutation.state);
      });
      queries.forEach((dehydratedQuery) => {
        var _options$defaultOptio2;
        const query = queryCache.get(dehydratedQuery.queryHash);
        const dehydratedQueryState = {
          ...dehydratedQuery.state,
          fetchStatus: "idle"
        };
        if (query) {
          if (query.state.dataUpdatedAt < dehydratedQueryState.dataUpdatedAt) {
            query.setState(dehydratedQueryState);
          }
          return;
        }
        queryCache.build(client, {
          ...options == null ? void 0 : (_options$defaultOptio2 = options.defaultOptions) == null ? void 0 : _options$defaultOptio2.queries,
          queryKey: dehydratedQuery.queryKey,
          queryHash: dehydratedQuery.queryHash
        }, dehydratedQueryState);
      });
    }
    __name(hydrate2, "hydrate");
    exports.defaultShouldDehydrateMutation = defaultShouldDehydrateMutation2;
    exports.defaultShouldDehydrateQuery = defaultShouldDehydrateQuery2;
    exports.dehydrate = dehydrate2;
    exports.hydrate = hydrate2;
  }
});

// ../../../tmp/node_modules/@tanstack/query-core/build/lib/index.js
var require_lib = __commonJS({
  "../../../tmp/node_modules/@tanstack/query-core/build/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var retryer = require_retryer();
    var queryCache = require_queryCache();
    var queryClient = require_queryClient();
    var queryObserver = require_queryObserver();
    var queriesObserver = require_queriesObserver();
    var infiniteQueryObserver = require_infiniteQueryObserver();
    var mutationCache = require_mutationCache();
    var mutationObserver = require_mutationObserver();
    var notifyManager2 = require_notifyManager();
    var focusManager2 = require_focusManager();
    var onlineManager2 = require_onlineManager();
    var utils = require_utils();
    var hydration = require_hydration();
    exports.CancelledError = retryer.CancelledError;
    exports.isCancelledError = retryer.isCancelledError;
    exports.QueryCache = queryCache.QueryCache;
    exports.QueryClient = queryClient.QueryClient;
    exports.QueryObserver = queryObserver.QueryObserver;
    exports.QueriesObserver = queriesObserver.QueriesObserver;
    exports.InfiniteQueryObserver = infiniteQueryObserver.InfiniteQueryObserver;
    exports.MutationCache = mutationCache.MutationCache;
    exports.MutationObserver = mutationObserver.MutationObserver;
    exports.notifyManager = notifyManager2.notifyManager;
    exports.focusManager = focusManager2.focusManager;
    exports.onlineManager = onlineManager2.onlineManager;
    exports.hashQueryKey = utils.hashQueryKey;
    exports.isError = utils.isError;
    exports.isServer = utils.isServer;
    exports.matchQuery = utils.matchQuery;
    exports.parseFilterArgs = utils.parseFilterArgs;
    exports.parseMutationArgs = utils.parseMutationArgs;
    exports.parseMutationFilterArgs = utils.parseMutationFilterArgs;
    exports.parseQueryArgs = utils.parseQueryArgs;
    exports.replaceEqualDeep = utils.replaceEqualDeep;
    exports.defaultShouldDehydrateMutation = hydration.defaultShouldDehydrateMutation;
    exports.defaultShouldDehydrateQuery = hydration.defaultShouldDehydrateQuery;
    exports.dehydrate = hydration.dehydrate;
    exports.hydrate = hydration.hydrate;
  }
});

// external:react-dom
var react_dom_exports = {};
import * as react_dom_star from "react-dom";
var init_react_dom = __esm({
  "external:react-dom"() {
    __reExport(react_dom_exports, react_dom_star);
  }
});

// ../../../tmp/node_modules/@tanstack/react-query/build/lib/reactBatchedUpdates.js
var require_reactBatchedUpdates = __commonJS({
  "../../../tmp/node_modules/@tanstack/react-query/build/lib/reactBatchedUpdates.js"(exports) {
    "use client";
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ReactDOM = (init_react_dom(), __toCommonJS(react_dom_exports));
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        Object.keys(e).forEach(function(k) {
          if (k !== "default") {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function() {
                return e[k];
              }
            });
          }
        });
      }
      n["default"] = e;
      return Object.freeze(n);
    }
    __name(_interopNamespace, "_interopNamespace");
    var ReactDOM__namespace = _interopNamespace(ReactDOM);
    var unstable_batchedUpdates = ReactDOM__namespace.unstable_batchedUpdates;
    exports.unstable_batchedUpdates = unstable_batchedUpdates;
  }
});

// ../../../tmp/node_modules/@tanstack/react-query/build/lib/setBatchUpdatesFn.js
var require_setBatchUpdatesFn = __commonJS({
  "../../../tmp/node_modules/@tanstack/react-query/build/lib/setBatchUpdatesFn.js"() {
    "use strict";
    var queryCore = require_lib();
    var reactBatchedUpdates = require_reactBatchedUpdates();
    queryCore.notifyManager.setBatchNotifyFunction(reactBatchedUpdates.unstable_batchedUpdates);
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

// ../../../tmp/node_modules/@tanstack/react-query/build/lib/useSyncExternalStore.js
var require_useSyncExternalStore = __commonJS({
  "../../../tmp/node_modules/@tanstack/react-query/build/lib/useSyncExternalStore.js"(exports) {
    "use client";
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var index_js = require_shim();
    var useSyncExternalStore = index_js.useSyncExternalStore;
    exports.useSyncExternalStore = useSyncExternalStore;
  }
});

// ../../../tmp/node_modules/@tanstack/react-query/build/lib/QueryClientProvider.js
var require_QueryClientProvider = __commonJS({
  "../../../tmp/node_modules/@tanstack/react-query/build/lib/QueryClientProvider.js"(exports) {
    "use client";
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = (init_react(), __toCommonJS(react_exports));
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        Object.keys(e).forEach(function(k) {
          if (k !== "default") {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function() {
                return e[k];
              }
            });
          }
        });
      }
      n["default"] = e;
      return Object.freeze(n);
    }
    __name(_interopNamespace, "_interopNamespace");
    var React__namespace = _interopNamespace(React);
    var defaultContext2 = React__namespace.createContext(void 0);
    var QueryClientSharingContext = React__namespace.createContext(false);
    function getQueryClientContext(context, contextSharing) {
      if (context) {
        return context;
      }
      if (contextSharing && typeof window !== "undefined") {
        if (!window.ReactQueryClientContext) {
          window.ReactQueryClientContext = defaultContext2;
        }
        return window.ReactQueryClientContext;
      }
      return defaultContext2;
    }
    __name(getQueryClientContext, "getQueryClientContext");
    var useQueryClient2 = /* @__PURE__ */ __name(({
      context
    } = {}) => {
      const queryClient = React__namespace.useContext(getQueryClientContext(context, React__namespace.useContext(QueryClientSharingContext)));
      if (!queryClient) {
        throw new Error("No QueryClient set, use QueryClientProvider to set one");
      }
      return queryClient;
    }, "useQueryClient");
    var QueryClientProvider2 = /* @__PURE__ */ __name(({
      client,
      children,
      context,
      contextSharing = false
    }) => {
      React__namespace.useEffect(() => {
        client.mount();
        return () => {
          client.unmount();
        };
      }, [client]);
      if (contextSharing) {
        client.getLogger().error("The contextSharing option has been deprecated and will be removed in the next major version");
      }
      const Context = getQueryClientContext(context, contextSharing);
      return React__namespace.createElement(QueryClientSharingContext.Provider, {
        value: !context && contextSharing
      }, React__namespace.createElement(Context.Provider, {
        value: client
      }, children));
    }, "QueryClientProvider");
    exports.QueryClientProvider = QueryClientProvider2;
    exports.defaultContext = defaultContext2;
    exports.useQueryClient = useQueryClient2;
  }
});

// ../../../tmp/node_modules/@tanstack/react-query/build/lib/isRestoring.js
var require_isRestoring = __commonJS({
  "../../../tmp/node_modules/@tanstack/react-query/build/lib/isRestoring.js"(exports) {
    "use client";
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = (init_react(), __toCommonJS(react_exports));
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        Object.keys(e).forEach(function(k) {
          if (k !== "default") {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function() {
                return e[k];
              }
            });
          }
        });
      }
      n["default"] = e;
      return Object.freeze(n);
    }
    __name(_interopNamespace, "_interopNamespace");
    var React__namespace = _interopNamespace(React);
    var IsRestoringContext = React__namespace.createContext(false);
    var useIsRestoring2 = /* @__PURE__ */ __name(() => React__namespace.useContext(IsRestoringContext), "useIsRestoring");
    var IsRestoringProvider2 = IsRestoringContext.Provider;
    exports.IsRestoringProvider = IsRestoringProvider2;
    exports.useIsRestoring = useIsRestoring2;
  }
});

// ../../../tmp/node_modules/@tanstack/react-query/build/lib/QueryErrorResetBoundary.js
var require_QueryErrorResetBoundary = __commonJS({
  "../../../tmp/node_modules/@tanstack/react-query/build/lib/QueryErrorResetBoundary.js"(exports) {
    "use client";
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = (init_react(), __toCommonJS(react_exports));
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        Object.keys(e).forEach(function(k) {
          if (k !== "default") {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function() {
                return e[k];
              }
            });
          }
        });
      }
      n["default"] = e;
      return Object.freeze(n);
    }
    __name(_interopNamespace, "_interopNamespace");
    var React__namespace = _interopNamespace(React);
    function createValue() {
      let isReset = false;
      return {
        clearReset: () => {
          isReset = false;
        },
        reset: () => {
          isReset = true;
        },
        isReset: () => {
          return isReset;
        }
      };
    }
    __name(createValue, "createValue");
    var QueryErrorResetBoundaryContext = React__namespace.createContext(createValue());
    var useQueryErrorResetBoundary2 = /* @__PURE__ */ __name(() => React__namespace.useContext(QueryErrorResetBoundaryContext), "useQueryErrorResetBoundary");
    var QueryErrorResetBoundary2 = /* @__PURE__ */ __name(({
      children
    }) => {
      const [value] = React__namespace.useState(() => createValue());
      return React__namespace.createElement(QueryErrorResetBoundaryContext.Provider, {
        value
      }, typeof children === "function" ? children(value) : children);
    }, "QueryErrorResetBoundary");
    exports.QueryErrorResetBoundary = QueryErrorResetBoundary2;
    exports.useQueryErrorResetBoundary = useQueryErrorResetBoundary2;
  }
});

// ../../../tmp/node_modules/@tanstack/react-query/build/lib/utils.js
var require_utils2 = __commonJS({
  "../../../tmp/node_modules/@tanstack/react-query/build/lib/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function shouldThrowError(_useErrorBoundary, params) {
      if (typeof _useErrorBoundary === "function") {
        return _useErrorBoundary(...params);
      }
      return !!_useErrorBoundary;
    }
    __name(shouldThrowError, "shouldThrowError");
    exports.shouldThrowError = shouldThrowError;
  }
});

// ../../../tmp/node_modules/@tanstack/react-query/build/lib/errorBoundaryUtils.js
var require_errorBoundaryUtils = __commonJS({
  "../../../tmp/node_modules/@tanstack/react-query/build/lib/errorBoundaryUtils.js"(exports) {
    "use client";
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = (init_react(), __toCommonJS(react_exports));
    var utils = require_utils2();
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        Object.keys(e).forEach(function(k) {
          if (k !== "default") {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function() {
                return e[k];
              }
            });
          }
        });
      }
      n["default"] = e;
      return Object.freeze(n);
    }
    __name(_interopNamespace, "_interopNamespace");
    var React__namespace = _interopNamespace(React);
    var ensurePreventErrorBoundaryRetry = /* @__PURE__ */ __name((options, errorResetBoundary) => {
      if (options.suspense || options.useErrorBoundary) {
        if (!errorResetBoundary.isReset()) {
          options.retryOnMount = false;
        }
      }
    }, "ensurePreventErrorBoundaryRetry");
    var useClearResetErrorBoundary = /* @__PURE__ */ __name((errorResetBoundary) => {
      React__namespace.useEffect(() => {
        errorResetBoundary.clearReset();
      }, [errorResetBoundary]);
    }, "useClearResetErrorBoundary");
    var getHasError = /* @__PURE__ */ __name(({
      result,
      errorResetBoundary,
      useErrorBoundary,
      query
    }) => {
      return result.isError && !errorResetBoundary.isReset() && !result.isFetching && utils.shouldThrowError(useErrorBoundary, [result.error, query]);
    }, "getHasError");
    exports.ensurePreventErrorBoundaryRetry = ensurePreventErrorBoundaryRetry;
    exports.getHasError = getHasError;
    exports.useClearResetErrorBoundary = useClearResetErrorBoundary;
  }
});

// ../../../tmp/node_modules/@tanstack/react-query/build/lib/suspense.js
var require_suspense = __commonJS({
  "../../../tmp/node_modules/@tanstack/react-query/build/lib/suspense.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ensureStaleTime = /* @__PURE__ */ __name((defaultedOptions) => {
      if (defaultedOptions.suspense) {
        if (typeof defaultedOptions.staleTime !== "number") {
          defaultedOptions.staleTime = 1e3;
        }
      }
    }, "ensureStaleTime");
    var willFetch = /* @__PURE__ */ __name((result, isRestoring) => result.isLoading && result.isFetching && !isRestoring, "willFetch");
    var shouldSuspend = /* @__PURE__ */ __name((defaultedOptions, result, isRestoring) => (defaultedOptions == null ? void 0 : defaultedOptions.suspense) && willFetch(result, isRestoring), "shouldSuspend");
    var fetchOptimistic = /* @__PURE__ */ __name((defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).then(({
      data
    }) => {
      defaultedOptions.onSuccess == null ? void 0 : defaultedOptions.onSuccess(data);
      defaultedOptions.onSettled == null ? void 0 : defaultedOptions.onSettled(data, null);
    }).catch((error) => {
      errorResetBoundary.clearReset();
      defaultedOptions.onError == null ? void 0 : defaultedOptions.onError(error);
      defaultedOptions.onSettled == null ? void 0 : defaultedOptions.onSettled(void 0, error);
    }), "fetchOptimistic");
    exports.ensureStaleTime = ensureStaleTime;
    exports.fetchOptimistic = fetchOptimistic;
    exports.shouldSuspend = shouldSuspend;
    exports.willFetch = willFetch;
  }
});

// ../../../tmp/node_modules/@tanstack/react-query/build/lib/useQueries.js
var require_useQueries = __commonJS({
  "../../../tmp/node_modules/@tanstack/react-query/build/lib/useQueries.js"(exports) {
    "use client";
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = (init_react(), __toCommonJS(react_exports));
    var useSyncExternalStore = require_useSyncExternalStore();
    var queryCore = require_lib();
    var QueryClientProvider2 = require_QueryClientProvider();
    var isRestoring = require_isRestoring();
    var QueryErrorResetBoundary2 = require_QueryErrorResetBoundary();
    var errorBoundaryUtils = require_errorBoundaryUtils();
    var suspense = require_suspense();
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        Object.keys(e).forEach(function(k) {
          if (k !== "default") {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function() {
                return e[k];
              }
            });
          }
        });
      }
      n["default"] = e;
      return Object.freeze(n);
    }
    __name(_interopNamespace, "_interopNamespace");
    var React__namespace = _interopNamespace(React);
    function useQueries2({
      queries,
      context
    }) {
      const queryClient = QueryClientProvider2.useQueryClient({
        context
      });
      const isRestoring$1 = isRestoring.useIsRestoring();
      const defaultedQueries = React__namespace.useMemo(() => queries.map((options) => {
        const defaultedOptions = queryClient.defaultQueryOptions(options);
        defaultedOptions._optimisticResults = isRestoring$1 ? "isRestoring" : "optimistic";
        return defaultedOptions;
      }), [queries, queryClient, isRestoring$1]);
      const [observer] = React__namespace.useState(() => new queryCore.QueriesObserver(queryClient, defaultedQueries));
      const optimisticResult = observer.getOptimisticResult(defaultedQueries);
      useSyncExternalStore.useSyncExternalStore(React__namespace.useCallback((onStoreChange) => isRestoring$1 ? () => void 0 : observer.subscribe(queryCore.notifyManager.batchCalls(onStoreChange)), [observer, isRestoring$1]), () => observer.getCurrentResult(), () => observer.getCurrentResult());
      React__namespace.useEffect(() => {
        observer.setQueries(defaultedQueries, {
          listeners: false
        });
      }, [defaultedQueries, observer]);
      const errorResetBoundary = QueryErrorResetBoundary2.useQueryErrorResetBoundary();
      defaultedQueries.forEach((query) => {
        errorBoundaryUtils.ensurePreventErrorBoundaryRetry(query, errorResetBoundary);
        suspense.ensureStaleTime(query);
      });
      errorBoundaryUtils.useClearResetErrorBoundary(errorResetBoundary);
      const shouldAtLeastOneSuspend = optimisticResult.some((result, index) => suspense.shouldSuspend(defaultedQueries[index], result, isRestoring$1));
      const suspensePromises = shouldAtLeastOneSuspend ? optimisticResult.flatMap((result, index) => {
        const options = defaultedQueries[index];
        const queryObserver = observer.getObservers()[index];
        if (options && queryObserver) {
          if (suspense.shouldSuspend(options, result, isRestoring$1)) {
            return suspense.fetchOptimistic(options, queryObserver, errorResetBoundary);
          } else if (suspense.willFetch(result, isRestoring$1)) {
            void suspense.fetchOptimistic(options, queryObserver, errorResetBoundary);
          }
        }
        return [];
      }) : [];
      if (suspensePromises.length > 0) {
        throw Promise.all(suspensePromises);
      }
      const firstSingleResultWhichShouldThrow = optimisticResult.find((result, index) => {
        var _defaultedQueries$ind, _defaultedQueries$ind2;
        return errorBoundaryUtils.getHasError({
          result,
          errorResetBoundary,
          useErrorBoundary: (_defaultedQueries$ind = (_defaultedQueries$ind2 = defaultedQueries[index]) == null ? void 0 : _defaultedQueries$ind2.useErrorBoundary) != null ? _defaultedQueries$ind : false,
          query: observer.getQueries()[index]
        });
      });
      if (firstSingleResultWhichShouldThrow != null && firstSingleResultWhichShouldThrow.error) {
        throw firstSingleResultWhichShouldThrow.error;
      }
      return optimisticResult;
    }
    __name(useQueries2, "useQueries");
    exports.useQueries = useQueries2;
  }
});

// ../../../tmp/node_modules/@tanstack/react-query/build/lib/useBaseQuery.js
var require_useBaseQuery = __commonJS({
  "../../../tmp/node_modules/@tanstack/react-query/build/lib/useBaseQuery.js"(exports) {
    "use client";
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = (init_react(), __toCommonJS(react_exports));
    var useSyncExternalStore = require_useSyncExternalStore();
    var queryCore = require_lib();
    var QueryErrorResetBoundary2 = require_QueryErrorResetBoundary();
    var QueryClientProvider2 = require_QueryClientProvider();
    var isRestoring = require_isRestoring();
    var errorBoundaryUtils = require_errorBoundaryUtils();
    var suspense = require_suspense();
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        Object.keys(e).forEach(function(k) {
          if (k !== "default") {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function() {
                return e[k];
              }
            });
          }
        });
      }
      n["default"] = e;
      return Object.freeze(n);
    }
    __name(_interopNamespace, "_interopNamespace");
    var React__namespace = _interopNamespace(React);
    function useBaseQuery(options, Observer) {
      const queryClient = QueryClientProvider2.useQueryClient({
        context: options.context
      });
      const isRestoring$1 = isRestoring.useIsRestoring();
      const errorResetBoundary = QueryErrorResetBoundary2.useQueryErrorResetBoundary();
      const defaultedOptions = queryClient.defaultQueryOptions(options);
      defaultedOptions._optimisticResults = isRestoring$1 ? "isRestoring" : "optimistic";
      if (defaultedOptions.onError) {
        defaultedOptions.onError = queryCore.notifyManager.batchCalls(defaultedOptions.onError);
      }
      if (defaultedOptions.onSuccess) {
        defaultedOptions.onSuccess = queryCore.notifyManager.batchCalls(defaultedOptions.onSuccess);
      }
      if (defaultedOptions.onSettled) {
        defaultedOptions.onSettled = queryCore.notifyManager.batchCalls(defaultedOptions.onSettled);
      }
      suspense.ensureStaleTime(defaultedOptions);
      errorBoundaryUtils.ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary);
      errorBoundaryUtils.useClearResetErrorBoundary(errorResetBoundary);
      const [observer] = React__namespace.useState(() => new Observer(queryClient, defaultedOptions));
      const result = observer.getOptimisticResult(defaultedOptions);
      useSyncExternalStore.useSyncExternalStore(React__namespace.useCallback((onStoreChange) => isRestoring$1 ? () => void 0 : observer.subscribe(queryCore.notifyManager.batchCalls(onStoreChange)), [observer, isRestoring$1]), () => observer.getCurrentResult(), () => observer.getCurrentResult());
      React__namespace.useEffect(() => {
        observer.setOptions(defaultedOptions, {
          listeners: false
        });
      }, [defaultedOptions, observer]);
      if (suspense.shouldSuspend(defaultedOptions, result, isRestoring$1)) {
        throw suspense.fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
      }
      if (errorBoundaryUtils.getHasError({
        result,
        errorResetBoundary,
        useErrorBoundary: defaultedOptions.useErrorBoundary,
        query: observer.getCurrentQuery()
      })) {
        throw result.error;
      }
      return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
    }
    __name(useBaseQuery, "useBaseQuery");
    exports.useBaseQuery = useBaseQuery;
  }
});

// ../../../tmp/node_modules/@tanstack/react-query/build/lib/useQuery.js
var require_useQuery = __commonJS({
  "../../../tmp/node_modules/@tanstack/react-query/build/lib/useQuery.js"(exports) {
    "use client";
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var queryCore = require_lib();
    var useBaseQuery = require_useBaseQuery();
    function useQuery2(arg1, arg2, arg3) {
      const parsedOptions = queryCore.parseQueryArgs(arg1, arg2, arg3);
      return useBaseQuery.useBaseQuery(parsedOptions, queryCore.QueryObserver);
    }
    __name(useQuery2, "useQuery");
    exports.useQuery = useQuery2;
  }
});

// ../../../tmp/node_modules/@tanstack/react-query/build/lib/Hydrate.js
var require_Hydrate = __commonJS({
  "../../../tmp/node_modules/@tanstack/react-query/build/lib/Hydrate.js"(exports) {
    "use client";
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = (init_react(), __toCommonJS(react_exports));
    var queryCore = require_lib();
    var QueryClientProvider2 = require_QueryClientProvider();
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        Object.keys(e).forEach(function(k) {
          if (k !== "default") {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function() {
                return e[k];
              }
            });
          }
        });
      }
      n["default"] = e;
      return Object.freeze(n);
    }
    __name(_interopNamespace, "_interopNamespace");
    var React__namespace = _interopNamespace(React);
    function useHydrate2(state, options = {}) {
      const queryClient = QueryClientProvider2.useQueryClient({
        context: options.context
      });
      const optionsRef = React__namespace.useRef(options);
      optionsRef.current = options;
      React__namespace.useMemo(() => {
        if (state) {
          queryCore.hydrate(queryClient, state, optionsRef.current);
        }
      }, [queryClient, state]);
    }
    __name(useHydrate2, "useHydrate");
    var Hydrate2 = /* @__PURE__ */ __name(({
      children,
      options,
      state
    }) => {
      useHydrate2(state, options);
      return children;
    }, "Hydrate");
    exports.Hydrate = Hydrate2;
    exports.useHydrate = useHydrate2;
  }
});

// ../../../tmp/node_modules/@tanstack/react-query/build/lib/useIsFetching.js
var require_useIsFetching = __commonJS({
  "../../../tmp/node_modules/@tanstack/react-query/build/lib/useIsFetching.js"(exports) {
    "use client";
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = (init_react(), __toCommonJS(react_exports));
    var queryCore = require_lib();
    var useSyncExternalStore = require_useSyncExternalStore();
    var QueryClientProvider2 = require_QueryClientProvider();
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        Object.keys(e).forEach(function(k) {
          if (k !== "default") {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function() {
                return e[k];
              }
            });
          }
        });
      }
      n["default"] = e;
      return Object.freeze(n);
    }
    __name(_interopNamespace, "_interopNamespace");
    var React__namespace = _interopNamespace(React);
    function useIsFetching2(arg1, arg2, arg3) {
      const [filters, options = {}] = queryCore.parseFilterArgs(arg1, arg2, arg3);
      const queryClient = QueryClientProvider2.useQueryClient({
        context: options.context
      });
      const queryCache = queryClient.getQueryCache();
      return useSyncExternalStore.useSyncExternalStore(React__namespace.useCallback((onStoreChange) => queryCache.subscribe(queryCore.notifyManager.batchCalls(onStoreChange)), [queryCache]), () => queryClient.isFetching(filters), () => queryClient.isFetching(filters));
    }
    __name(useIsFetching2, "useIsFetching");
    exports.useIsFetching = useIsFetching2;
  }
});

// ../../../tmp/node_modules/@tanstack/react-query/build/lib/useIsMutating.js
var require_useIsMutating = __commonJS({
  "../../../tmp/node_modules/@tanstack/react-query/build/lib/useIsMutating.js"(exports) {
    "use client";
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = (init_react(), __toCommonJS(react_exports));
    var useSyncExternalStore = require_useSyncExternalStore();
    var queryCore = require_lib();
    var QueryClientProvider2 = require_QueryClientProvider();
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        Object.keys(e).forEach(function(k) {
          if (k !== "default") {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function() {
                return e[k];
              }
            });
          }
        });
      }
      n["default"] = e;
      return Object.freeze(n);
    }
    __name(_interopNamespace, "_interopNamespace");
    var React__namespace = _interopNamespace(React);
    function useIsMutating2(arg1, arg2, arg3) {
      const [filters, options = {}] = queryCore.parseMutationFilterArgs(arg1, arg2, arg3);
      const queryClient = QueryClientProvider2.useQueryClient({
        context: options.context
      });
      const mutationCache = queryClient.getMutationCache();
      return useSyncExternalStore.useSyncExternalStore(React__namespace.useCallback((onStoreChange) => mutationCache.subscribe(queryCore.notifyManager.batchCalls(onStoreChange)), [mutationCache]), () => queryClient.isMutating(filters), () => queryClient.isMutating(filters));
    }
    __name(useIsMutating2, "useIsMutating");
    exports.useIsMutating = useIsMutating2;
  }
});

// ../../../tmp/node_modules/@tanstack/react-query/build/lib/useMutation.js
var require_useMutation = __commonJS({
  "../../../tmp/node_modules/@tanstack/react-query/build/lib/useMutation.js"(exports) {
    "use client";
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = (init_react(), __toCommonJS(react_exports));
    var useSyncExternalStore = require_useSyncExternalStore();
    var queryCore = require_lib();
    var QueryClientProvider2 = require_QueryClientProvider();
    var utils = require_utils2();
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        Object.keys(e).forEach(function(k) {
          if (k !== "default") {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function() {
                return e[k];
              }
            });
          }
        });
      }
      n["default"] = e;
      return Object.freeze(n);
    }
    __name(_interopNamespace, "_interopNamespace");
    var React__namespace = _interopNamespace(React);
    function useMutation2(arg1, arg2, arg3) {
      const options = queryCore.parseMutationArgs(arg1, arg2, arg3);
      const queryClient = QueryClientProvider2.useQueryClient({
        context: options.context
      });
      const [observer] = React__namespace.useState(() => new queryCore.MutationObserver(queryClient, options));
      React__namespace.useEffect(() => {
        observer.setOptions(options);
      }, [observer, options]);
      const result = useSyncExternalStore.useSyncExternalStore(React__namespace.useCallback((onStoreChange) => observer.subscribe(queryCore.notifyManager.batchCalls(onStoreChange)), [observer]), () => observer.getCurrentResult(), () => observer.getCurrentResult());
      const mutate = React__namespace.useCallback((variables, mutateOptions) => {
        observer.mutate(variables, mutateOptions).catch(noop);
      }, [observer]);
      if (result.error && utils.shouldThrowError(observer.options.useErrorBoundary, [result.error])) {
        throw result.error;
      }
      return {
        ...result,
        mutate,
        mutateAsync: result.mutate
      };
    }
    __name(useMutation2, "useMutation");
    function noop() {
    }
    __name(noop, "noop");
    exports.useMutation = useMutation2;
  }
});

// ../../../tmp/node_modules/@tanstack/react-query/build/lib/useInfiniteQuery.js
var require_useInfiniteQuery = __commonJS({
  "../../../tmp/node_modules/@tanstack/react-query/build/lib/useInfiniteQuery.js"(exports) {
    "use client";
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var queryCore = require_lib();
    var useBaseQuery = require_useBaseQuery();
    function useInfiniteQuery2(arg1, arg2, arg3) {
      const options = queryCore.parseQueryArgs(arg1, arg2, arg3);
      return useBaseQuery.useBaseQuery(options, queryCore.InfiniteQueryObserver);
    }
    __name(useInfiniteQuery2, "useInfiniteQuery");
    exports.useInfiniteQuery = useInfiniteQuery2;
  }
});

// ../../../tmp/node_modules/@tanstack/react-query/build/lib/index.js
var require_lib2 = __commonJS({
  "../../../tmp/node_modules/@tanstack/react-query/build/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require_setBatchUpdatesFn();
    var queryCore = require_lib();
    var useQueries2 = require_useQueries();
    var useQuery2 = require_useQuery();
    var QueryClientProvider2 = require_QueryClientProvider();
    var Hydrate2 = require_Hydrate();
    var QueryErrorResetBoundary2 = require_QueryErrorResetBoundary();
    var useIsFetching2 = require_useIsFetching();
    var useIsMutating2 = require_useIsMutating();
    var useMutation2 = require_useMutation();
    var useInfiniteQuery2 = require_useInfiniteQuery();
    var isRestoring = require_isRestoring();
    exports.useQueries = useQueries2.useQueries;
    exports.useQuery = useQuery2.useQuery;
    exports.QueryClientProvider = QueryClientProvider2.QueryClientProvider;
    exports.defaultContext = QueryClientProvider2.defaultContext;
    exports.useQueryClient = QueryClientProvider2.useQueryClient;
    exports.Hydrate = Hydrate2.Hydrate;
    exports.useHydrate = Hydrate2.useHydrate;
    exports.QueryErrorResetBoundary = QueryErrorResetBoundary2.QueryErrorResetBoundary;
    exports.useQueryErrorResetBoundary = QueryErrorResetBoundary2.useQueryErrorResetBoundary;
    exports.useIsFetching = useIsFetching2.useIsFetching;
    exports.useIsMutating = useIsMutating2.useIsMutating;
    exports.useMutation = useMutation2.useMutation;
    exports.useInfiniteQuery = useInfiniteQuery2.useInfiniteQuery;
    exports.IsRestoringProvider = isRestoring.IsRestoringProvider;
    exports.useIsRestoring = isRestoring.useIsRestoring;
    Object.keys(queryCore).forEach(function(k) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        Object.defineProperty(exports, k, {
          enumerable: true,
          get: function() {
            return queryCore[k];
          }
        });
    });
  }
});

// c2e:/tmp/node_modules/@tanstack/react-query/build/lib/index.js
var import_lib = __toESM(require_lib2());
var export_CancelledError = import_lib.CancelledError;
var export_Hydrate = import_lib.Hydrate;
var export_InfiniteQueryObserver = import_lib.InfiniteQueryObserver;
var export_IsRestoringProvider = import_lib.IsRestoringProvider;
var export_MutationCache = import_lib.MutationCache;
var export_MutationObserver = import_lib.MutationObserver;
var export_QueriesObserver = import_lib.QueriesObserver;
var export_QueryCache = import_lib.QueryCache;
var export_QueryClient = import_lib.QueryClient;
var export_QueryClientProvider = import_lib.QueryClientProvider;
var export_QueryErrorResetBoundary = import_lib.QueryErrorResetBoundary;
var export_QueryObserver = import_lib.QueryObserver;
var export_default = import_lib.default;
var export_defaultContext = import_lib.defaultContext;
var export_defaultShouldDehydrateMutation = import_lib.defaultShouldDehydrateMutation;
var export_defaultShouldDehydrateQuery = import_lib.defaultShouldDehydrateQuery;
var export_dehydrate = import_lib.dehydrate;
var export_focusManager = import_lib.focusManager;
var export_hashQueryKey = import_lib.hashQueryKey;
var export_hydrate = import_lib.hydrate;
var export_isCancelledError = import_lib.isCancelledError;
var export_isError = import_lib.isError;
var export_isServer = import_lib.isServer;
var export_matchQuery = import_lib.matchQuery;
var export_notifyManager = import_lib.notifyManager;
var export_onlineManager = import_lib.onlineManager;
var export_parseFilterArgs = import_lib.parseFilterArgs;
var export_parseMutationArgs = import_lib.parseMutationArgs;
var export_parseMutationFilterArgs = import_lib.parseMutationFilterArgs;
var export_parseQueryArgs = import_lib.parseQueryArgs;
var export_replaceEqualDeep = import_lib.replaceEqualDeep;
var export_useHydrate = import_lib.useHydrate;
var export_useInfiniteQuery = import_lib.useInfiniteQuery;
var export_useIsFetching = import_lib.useIsFetching;
var export_useIsMutating = import_lib.useIsMutating;
var export_useIsRestoring = import_lib.useIsRestoring;
var export_useMutation = import_lib.useMutation;
var export_useQueries = import_lib.useQueries;
var export_useQuery = import_lib.useQuery;
var export_useQueryClient = import_lib.useQueryClient;
var export_useQueryErrorResetBoundary = import_lib.useQueryErrorResetBoundary;
export {
  export_CancelledError as CancelledError,
  export_Hydrate as Hydrate,
  export_InfiniteQueryObserver as InfiniteQueryObserver,
  export_IsRestoringProvider as IsRestoringProvider,
  export_MutationCache as MutationCache,
  export_MutationObserver as MutationObserver,
  export_QueriesObserver as QueriesObserver,
  export_QueryCache as QueryCache,
  export_QueryClient as QueryClient,
  export_QueryClientProvider as QueryClientProvider,
  export_QueryErrorResetBoundary as QueryErrorResetBoundary,
  export_QueryObserver as QueryObserver,
  export_default as default,
  export_defaultContext as defaultContext,
  export_defaultShouldDehydrateMutation as defaultShouldDehydrateMutation,
  export_defaultShouldDehydrateQuery as defaultShouldDehydrateQuery,
  export_dehydrate as dehydrate,
  export_focusManager as focusManager,
  export_hashQueryKey as hashQueryKey,
  export_hydrate as hydrate,
  export_isCancelledError as isCancelledError,
  export_isError as isError,
  export_isServer as isServer,
  export_matchQuery as matchQuery,
  export_notifyManager as notifyManager,
  export_onlineManager as onlineManager,
  export_parseFilterArgs as parseFilterArgs,
  export_parseMutationArgs as parseMutationArgs,
  export_parseMutationFilterArgs as parseMutationFilterArgs,
  export_parseQueryArgs as parseQueryArgs,
  export_replaceEqualDeep as replaceEqualDeep,
  export_useHydrate as useHydrate,
  export_useInfiniteQuery as useInfiniteQuery,
  export_useIsFetching as useIsFetching,
  export_useIsMutating as useIsMutating,
  export_useIsRestoring as useIsRestoring,
  export_useMutation as useMutation,
  export_useQueries as useQueries,
  export_useQuery as useQuery,
  export_useQueryClient as useQueryClient,
  export_useQueryErrorResetBoundary as useQueryErrorResetBoundary
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
*/

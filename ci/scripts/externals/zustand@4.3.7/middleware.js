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

// ../../../tmp/node_modules/zustand/middleware.js
var require_middleware = __commonJS({
  "../../../tmp/node_modules/zustand/middleware.js"(exports) {
    "use strict";
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
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null)
        return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0)
          continue;
        target[key] = source[key];
      }
      return target;
    }
    __name(_objectWithoutPropertiesLoose, "_objectWithoutPropertiesLoose");
    var reduxImpl = /* @__PURE__ */ __name(function reduxImpl2(reducer, initial) {
      return function(set, _get, api) {
        api.dispatch = function(action) {
          set(function(state) {
            return reducer(state, action);
          }, false, action);
          return action;
        };
        api.dispatchFromDevtools = true;
        return _extends({
          dispatch: /* @__PURE__ */ __name(function dispatch() {
            var _ref;
            return (_ref = api).dispatch.apply(_ref, arguments);
          }, "dispatch")
        }, initial);
      };
    }, "reduxImpl");
    var redux2 = reduxImpl;
    var _excluded = ["enabled", "anonymousActionType", "store"];
    var _excluded2 = ["connection"];
    var trackedConnections = /* @__PURE__ */ new Map();
    var getTrackedConnectionState = /* @__PURE__ */ __name(function getTrackedConnectionState2(name) {
      var api = trackedConnections.get(name);
      if (!api)
        return {};
      return Object.fromEntries(Object.entries(api.stores).map(function(_ref) {
        var key = _ref[0], api2 = _ref[1];
        return [key, api2.getState()];
      }));
    }, "getTrackedConnectionState");
    var extractConnectionInformation = /* @__PURE__ */ __name(function extractConnectionInformation2(store, extensionConnector, options) {
      if (store === void 0) {
        return {
          type: "untracked",
          connection: extensionConnector.connect(options)
        };
      }
      var existingConnection = trackedConnections.get(options.name);
      if (existingConnection) {
        return _extends({
          type: "tracked",
          store
        }, existingConnection);
      }
      var newConnection = {
        connection: extensionConnector.connect(options),
        stores: {}
      };
      trackedConnections.set(options.name, newConnection);
      return _extends({
        type: "tracked",
        store
      }, newConnection);
    }, "extractConnectionInformation");
    var devtoolsImpl = /* @__PURE__ */ __name(function devtoolsImpl2(fn, devtoolsOptions) {
      if (devtoolsOptions === void 0) {
        devtoolsOptions = {};
      }
      return function(set, get, api) {
        var _devtoolsOptions = devtoolsOptions, enabled = _devtoolsOptions.enabled, anonymousActionType = _devtoolsOptions.anonymousActionType, store = _devtoolsOptions.store, options = _objectWithoutPropertiesLoose(_devtoolsOptions, _excluded);
        var extensionConnector;
        try {
          extensionConnector = (enabled != null ? enabled : true) && window.__REDUX_DEVTOOLS_EXTENSION__;
        } catch (e) {
        }
        if (!extensionConnector) {
          if (enabled) {
            console.warn("[zustand devtools middleware] Please install/enable Redux devtools extension");
          }
          return fn(set, get, api);
        }
        var _extractConnectionInf = extractConnectionInformation(store, extensionConnector, options), connection = _extractConnectionInf.connection, connectionInformation = _objectWithoutPropertiesLoose(_extractConnectionInf, _excluded2);
        var isRecording = true;
        api.setState = function(state, replace, nameOrAction) {
          var _extends2;
          var r = set(state, replace);
          if (!isRecording)
            return r;
          var action = nameOrAction === void 0 ? {
            type: anonymousActionType || "anonymous"
          } : typeof nameOrAction === "string" ? {
            type: nameOrAction
          } : nameOrAction;
          if (store === void 0) {
            connection == null ? void 0 : connection.send(action, get());
            return r;
          }
          connection == null ? void 0 : connection.send(_extends({}, action, {
            type: store + "/" + action.type
          }), _extends({}, getTrackedConnectionState(options.name), (_extends2 = {}, _extends2[store] = api.getState(), _extends2)));
          return r;
        };
        var setStateFromDevtools = /* @__PURE__ */ __name(function setStateFromDevtools2() {
          var originalIsRecording = isRecording;
          isRecording = false;
          set.apply(void 0, arguments);
          isRecording = originalIsRecording;
        }, "setStateFromDevtools");
        var initialState = fn(api.setState, get, api);
        if (connectionInformation.type === "untracked") {
          connection == null ? void 0 : connection.init(initialState);
        } else {
          connectionInformation.stores[connectionInformation.store] = api;
          connection == null ? void 0 : connection.init(Object.fromEntries(Object.entries(connectionInformation.stores).map(function(_ref2) {
            var key = _ref2[0], store2 = _ref2[1];
            return [key, key === connectionInformation.store ? initialState : store2.getState()];
          })));
        }
        if (api.dispatchFromDevtools && typeof api.dispatch === "function") {
          var didWarnAboutReservedActionType = false;
          var originalDispatch = api.dispatch;
          api.dispatch = function() {
            for (var _len = arguments.length, a = new Array(_len), _key = 0; _key < _len; _key++) {
              a[_key] = arguments[_key];
            }
            if (a[0].type === "__setState" && !didWarnAboutReservedActionType) {
              console.warn('[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.');
              didWarnAboutReservedActionType = true;
            }
            originalDispatch.apply(void 0, a);
          };
        }
        connection.subscribe(function(message) {
          switch (message.type) {
            case "ACTION":
              if (typeof message.payload !== "string") {
                console.error("[zustand devtools middleware] Unsupported action format");
                return;
              }
              return parseJsonThen(message.payload, function(action) {
                if (action.type === "__setState") {
                  if (store === void 0) {
                    setStateFromDevtools(action.state);
                    return;
                  }
                  if (Object.keys(action.state).length !== 1) {
                    console.error(`
                    [zustand devtools middleware] Unsupported __setState action format. 
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `);
                  }
                  var stateFromDevtools = action.state[store];
                  if (stateFromDevtools === void 0 || stateFromDevtools === null) {
                    return;
                  }
                  if (JSON.stringify(api.getState()) !== JSON.stringify(stateFromDevtools)) {
                    setStateFromDevtools(stateFromDevtools);
                  }
                  return;
                }
                if (!api.dispatchFromDevtools)
                  return;
                if (typeof api.dispatch !== "function")
                  return;
                api.dispatch(action);
              });
            case "DISPATCH":
              switch (message.payload.type) {
                case "RESET":
                  setStateFromDevtools(initialState);
                  if (store === void 0) {
                    return connection == null ? void 0 : connection.init(api.getState());
                  }
                  return connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
                case "COMMIT":
                  if (store === void 0) {
                    connection == null ? void 0 : connection.init(api.getState());
                    return;
                  }
                  return connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
                case "ROLLBACK":
                  return parseJsonThen(message.state, function(state) {
                    if (store === void 0) {
                      setStateFromDevtools(state);
                      connection == null ? void 0 : connection.init(api.getState());
                      return;
                    }
                    setStateFromDevtools(state[store]);
                    connection == null ? void 0 : connection.init(getTrackedConnectionState(options.name));
                  });
                case "JUMP_TO_STATE":
                case "JUMP_TO_ACTION":
                  return parseJsonThen(message.state, function(state) {
                    if (store === void 0) {
                      setStateFromDevtools(state);
                      return;
                    }
                    if (JSON.stringify(api.getState()) !== JSON.stringify(state[store])) {
                      setStateFromDevtools(state[store]);
                    }
                  });
                case "IMPORT_STATE": {
                  var _nextLiftedState$comp;
                  var nextLiftedState = message.payload.nextLiftedState;
                  var lastComputedState = (_nextLiftedState$comp = nextLiftedState.computedStates.slice(-1)[0]) == null ? void 0 : _nextLiftedState$comp.state;
                  if (!lastComputedState)
                    return;
                  if (store === void 0) {
                    setStateFromDevtools(lastComputedState);
                  } else {
                    setStateFromDevtools(lastComputedState[store]);
                  }
                  connection == null ? void 0 : connection.send(null, nextLiftedState);
                  return;
                }
                case "PAUSE_RECORDING":
                  return isRecording = !isRecording;
              }
              return;
          }
        });
        return initialState;
      };
    }, "devtoolsImpl");
    var devtools2 = devtoolsImpl;
    var parseJsonThen = /* @__PURE__ */ __name(function parseJsonThen2(stringified, f) {
      var parsed;
      try {
        parsed = JSON.parse(stringified);
      } catch (e) {
        console.error("[zustand devtools middleware] Could not parse the received json", e);
      }
      if (parsed !== void 0)
        f(parsed);
    }, "parseJsonThen");
    var subscribeWithSelectorImpl = /* @__PURE__ */ __name(function subscribeWithSelectorImpl2(fn) {
      return function(set, get, api) {
        var origSubscribe = api.subscribe;
        api.subscribe = function(selector, optListener, options) {
          var listener = selector;
          if (optListener) {
            var equalityFn = (options == null ? void 0 : options.equalityFn) || Object.is;
            var currentSlice = selector(api.getState());
            listener = /* @__PURE__ */ __name(function listener2(state) {
              var nextSlice = selector(state);
              if (!equalityFn(currentSlice, nextSlice)) {
                var previousSlice = currentSlice;
                optListener(currentSlice = nextSlice, previousSlice);
              }
            }, "listener");
            if (options != null && options.fireImmediately) {
              optListener(currentSlice, currentSlice);
            }
          }
          return origSubscribe(listener);
        };
        var initialState = fn(set, get, api);
        return initialState;
      };
    }, "subscribeWithSelectorImpl");
    var subscribeWithSelector2 = subscribeWithSelectorImpl;
    var combine2 = /* @__PURE__ */ __name(function combine3(initialState, create) {
      return function() {
        return Object.assign({}, initialState, create.apply(void 0, arguments));
      };
    }, "combine");
    function createJSONStorage2(getStorage) {
      var storage;
      try {
        storage = getStorage();
      } catch (e) {
        return;
      }
      var persistStorage = {
        getItem: /* @__PURE__ */ __name(function getItem(name) {
          var _getItem;
          var parse = /* @__PURE__ */ __name(function parse2(str2) {
            if (str2 === null) {
              return null;
            }
            return JSON.parse(str2);
          }, "parse");
          var str = (_getItem = storage.getItem(name)) != null ? _getItem : null;
          if (str instanceof Promise) {
            return str.then(parse);
          }
          return parse(str);
        }, "getItem"),
        setItem: /* @__PURE__ */ __name(function setItem(name, newValue) {
          return storage.setItem(name, JSON.stringify(newValue));
        }, "setItem"),
        removeItem: /* @__PURE__ */ __name(function removeItem(name) {
          return storage.removeItem(name);
        }, "removeItem")
      };
      return persistStorage;
    }
    __name(createJSONStorage2, "createJSONStorage");
    var toThenable = /* @__PURE__ */ __name(function toThenable2(fn) {
      return function(input) {
        try {
          var result = fn(input);
          if (result instanceof Promise) {
            return result;
          }
          return {
            then: /* @__PURE__ */ __name(function then(onFulfilled) {
              return toThenable2(onFulfilled)(result);
            }, "then"),
            catch: /* @__PURE__ */ __name(function _catch(_onRejected) {
              return this;
            }, "_catch")
          };
        } catch (e) {
          return {
            then: /* @__PURE__ */ __name(function then(_onFulfilled) {
              return this;
            }, "then"),
            catch: /* @__PURE__ */ __name(function _catch(onRejected) {
              return toThenable2(onRejected)(e);
            }, "_catch")
          };
        }
      };
    }, "toThenable");
    var oldImpl = /* @__PURE__ */ __name(function oldImpl2(config, baseOptions) {
      return function(set, get, api) {
        var options = _extends({
          getStorage: /* @__PURE__ */ __name(function getStorage() {
            return localStorage;
          }, "getStorage"),
          serialize: JSON.stringify,
          deserialize: JSON.parse,
          partialize: /* @__PURE__ */ __name(function partialize(state) {
            return state;
          }, "partialize"),
          version: 0,
          merge: /* @__PURE__ */ __name(function merge(persistedState, currentState) {
            return _extends({}, currentState, persistedState);
          }, "merge")
        }, baseOptions);
        var _hasHydrated = false;
        var hydrationListeners = /* @__PURE__ */ new Set();
        var finishHydrationListeners = /* @__PURE__ */ new Set();
        var storage;
        try {
          storage = options.getStorage();
        } catch (e) {
        }
        if (!storage) {
          return config(function() {
            console.warn("[zustand persist middleware] Unable to update item '" + options.name + "', the given storage is currently unavailable.");
            set.apply(void 0, arguments);
          }, get, api);
        }
        var thenableSerialize = toThenable(options.serialize);
        var setItem = /* @__PURE__ */ __name(function setItem2() {
          var state = options.partialize(_extends({}, get()));
          var errorInSync;
          var thenable = thenableSerialize({
            state,
            version: options.version
          }).then(function(serializedValue) {
            return storage.setItem(options.name, serializedValue);
          }).catch(function(e) {
            errorInSync = e;
          });
          if (errorInSync) {
            throw errorInSync;
          }
          return thenable;
        }, "setItem");
        var savedSetState = api.setState;
        api.setState = function(state, replace) {
          savedSetState(state, replace);
          void setItem();
        };
        var configResult = config(function() {
          set.apply(void 0, arguments);
          void setItem();
        }, get, api);
        var stateFromStorage;
        var hydrate = /* @__PURE__ */ __name(function hydrate2() {
          if (!storage)
            return;
          _hasHydrated = false;
          hydrationListeners.forEach(function(cb) {
            return cb(get());
          });
          var postRehydrationCallback = (options.onRehydrateStorage == null ? void 0 : options.onRehydrateStorage(get())) || void 0;
          return toThenable(storage.getItem.bind(storage))(options.name).then(function(storageValue) {
            if (storageValue) {
              return options.deserialize(storageValue);
            }
          }).then(function(deserializedStorageValue) {
            if (deserializedStorageValue) {
              if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
                if (options.migrate) {
                  return options.migrate(deserializedStorageValue.state, deserializedStorageValue.version);
                }
                console.error("State loaded from storage couldn't be migrated since no migrate function was provided");
              } else {
                return deserializedStorageValue.state;
              }
            }
          }).then(function(migratedState) {
            var _get;
            stateFromStorage = options.merge(migratedState, (_get = get()) != null ? _get : configResult);
            set(stateFromStorage, true);
            return setItem();
          }).then(function() {
            postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
            _hasHydrated = true;
            finishHydrationListeners.forEach(function(cb) {
              return cb(stateFromStorage);
            });
          }).catch(function(e) {
            postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
          });
        }, "hydrate");
        api.persist = {
          setOptions: /* @__PURE__ */ __name(function setOptions(newOptions) {
            options = _extends({}, options, newOptions);
            if (newOptions.getStorage) {
              storage = newOptions.getStorage();
            }
          }, "setOptions"),
          clearStorage: /* @__PURE__ */ __name(function clearStorage() {
            var _storage;
            (_storage = storage) == null ? void 0 : _storage.removeItem(options.name);
          }, "clearStorage"),
          getOptions: /* @__PURE__ */ __name(function getOptions() {
            return options;
          }, "getOptions"),
          rehydrate: /* @__PURE__ */ __name(function rehydrate() {
            return hydrate();
          }, "rehydrate"),
          hasHydrated: /* @__PURE__ */ __name(function hasHydrated() {
            return _hasHydrated;
          }, "hasHydrated"),
          onHydrate: /* @__PURE__ */ __name(function onHydrate(cb) {
            hydrationListeners.add(cb);
            return function() {
              hydrationListeners.delete(cb);
            };
          }, "onHydrate"),
          onFinishHydration: /* @__PURE__ */ __name(function onFinishHydration(cb) {
            finishHydrationListeners.add(cb);
            return function() {
              finishHydrationListeners.delete(cb);
            };
          }, "onFinishHydration")
        };
        hydrate();
        return stateFromStorage || configResult;
      };
    }, "oldImpl");
    var newImpl = /* @__PURE__ */ __name(function newImpl2(config, baseOptions) {
      return function(set, get, api) {
        var options = _extends({
          storage: createJSONStorage2(function() {
            return localStorage;
          }),
          partialize: /* @__PURE__ */ __name(function partialize(state) {
            return state;
          }, "partialize"),
          version: 0,
          merge: /* @__PURE__ */ __name(function merge(persistedState, currentState) {
            return _extends({}, currentState, persistedState);
          }, "merge")
        }, baseOptions);
        var _hasHydrated2 = false;
        var hydrationListeners = /* @__PURE__ */ new Set();
        var finishHydrationListeners = /* @__PURE__ */ new Set();
        var storage = options.storage;
        if (!storage) {
          return config(function() {
            console.warn("[zustand persist middleware] Unable to update item '" + options.name + "', the given storage is currently unavailable.");
            set.apply(void 0, arguments);
          }, get, api);
        }
        var setItem = /* @__PURE__ */ __name(function setItem2() {
          var state = options.partialize(_extends({}, get()));
          return storage.setItem(options.name, {
            state,
            version: options.version
          });
        }, "setItem");
        var savedSetState = api.setState;
        api.setState = function(state, replace) {
          savedSetState(state, replace);
          void setItem();
        };
        var configResult = config(function() {
          set.apply(void 0, arguments);
          void setItem();
        }, get, api);
        var stateFromStorage;
        var hydrate = /* @__PURE__ */ __name(function hydrate2() {
          var _get3;
          if (!storage)
            return;
          _hasHydrated2 = false;
          hydrationListeners.forEach(function(cb) {
            var _get2;
            return cb((_get2 = get()) != null ? _get2 : configResult);
          });
          var postRehydrationCallback = (options.onRehydrateStorage == null ? void 0 : options.onRehydrateStorage((_get3 = get()) != null ? _get3 : configResult)) || void 0;
          return toThenable(storage.getItem.bind(storage))(options.name).then(function(deserializedStorageValue) {
            if (deserializedStorageValue) {
              if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
                if (options.migrate) {
                  return options.migrate(deserializedStorageValue.state, deserializedStorageValue.version);
                }
                console.error("State loaded from storage couldn't be migrated since no migrate function was provided");
              } else {
                return deserializedStorageValue.state;
              }
            }
          }).then(function(migratedState) {
            var _get4;
            stateFromStorage = options.merge(migratedState, (_get4 = get()) != null ? _get4 : configResult);
            set(stateFromStorage, true);
            return setItem();
          }).then(function() {
            postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
            stateFromStorage = get();
            _hasHydrated2 = true;
            finishHydrationListeners.forEach(function(cb) {
              return cb(stateFromStorage);
            });
          }).catch(function(e) {
            postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
          });
        }, "hydrate");
        api.persist = {
          setOptions: /* @__PURE__ */ __name(function setOptions(newOptions) {
            options = _extends({}, options, newOptions);
            if (newOptions.storage) {
              storage = newOptions.storage;
            }
          }, "setOptions"),
          clearStorage: /* @__PURE__ */ __name(function clearStorage() {
            var _storage2;
            (_storage2 = storage) == null ? void 0 : _storage2.removeItem(options.name);
          }, "clearStorage"),
          getOptions: /* @__PURE__ */ __name(function getOptions() {
            return options;
          }, "getOptions"),
          rehydrate: /* @__PURE__ */ __name(function rehydrate() {
            return hydrate();
          }, "rehydrate"),
          hasHydrated: /* @__PURE__ */ __name(function hasHydrated() {
            return _hasHydrated2;
          }, "hasHydrated"),
          onHydrate: /* @__PURE__ */ __name(function onHydrate(cb) {
            hydrationListeners.add(cb);
            return function() {
              hydrationListeners.delete(cb);
            };
          }, "onHydrate"),
          onFinishHydration: /* @__PURE__ */ __name(function onFinishHydration(cb) {
            finishHydrationListeners.add(cb);
            return function() {
              finishHydrationListeners.delete(cb);
            };
          }, "onFinishHydration")
        };
        if (!options.skipHydration) {
          hydrate();
        }
        return stateFromStorage || configResult;
      };
    }, "newImpl");
    var persistImpl = /* @__PURE__ */ __name(function persistImpl2(config, baseOptions) {
      if ("getStorage" in baseOptions || "serialize" in baseOptions || "deserialize" in baseOptions) {
        if (true) {
          console.warn("[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead.");
        }
        return oldImpl(config, baseOptions);
      }
      return newImpl(config, baseOptions);
    }, "persistImpl");
    var persist2 = persistImpl;
    exports.combine = combine2;
    exports.createJSONStorage = createJSONStorage2;
    exports.devtools = devtools2;
    exports.persist = persist2;
    exports.redux = redux2;
    exports.subscribeWithSelector = subscribeWithSelector2;
  }
});

// c2e:/tmp/node_modules/zustand/middleware.js
var import_middleware = __toESM(require_middleware());
var export_combine = import_middleware.combine;
var export_createJSONStorage = import_middleware.createJSONStorage;
var export_default = import_middleware.default;
var export_devtools = import_middleware.devtools;
var export_persist = import_middleware.persist;
var export_redux = import_middleware.redux;
var export_subscribeWithSelector = import_middleware.subscribeWithSelector;
export {
  export_combine as combine,
  export_createJSONStorage as createJSONStorage,
  export_default as default,
  export_devtools as devtools,
  export_persist as persist,
  export_redux as redux,
  export_subscribeWithSelector as subscribeWithSelector
};

// src/index.js
var uniqString = () => Math.random().toString(36).substring(2);
window.__junoCommunicatorTabId = window.__junoCommunicatorTabId || uniqString();
window.__junoEventListeners = window.__junoEventListeners || {
  broadcast: {},
  get: {}
};
var log = (...params) => console.log("Communicator Debug [" + CHANNEL_PREFIX + "]:", ...params);
var warn = (...params) => console.warn("Communicator Warning:", ...params);
var addListener = (type, event, listener) => {
  if (!window.__junoEventListeners[type]?.[event]) {
    window.__junoEventListeners[type][event] = [];
  }
  window.__junoEventListeners[type][event].push(listener);
};
var removeListener = (type, event, listener) => {
  if (!window.__junoEventListeners[type]?.[event])
    return;
  window.__junoEventListeners[type][event] = window.__junoEventListeners[type][event].filter((l) => l !== listener);
};
var listenerWrapper = (callback) => (data, options = {}) => {
  return new Promise(async (resolve) => {
    callback(data, options);
    resolve();
  });
};
var crossWindowEventBridge = new BroadcastChannel(
  "__JUNO_CROSS_WINDOW_EVENT_BRIDGE__"
);
crossWindowEventBridge.onmessage = (e) => {
  const { type, name, data, sourceWindowId } = e.data || {};
  if (type === "broadcast") {
    window.__junoEventListeners["broadcast"]?.[name]?.forEach((listener) => {
      try {
        listener(data, {
          crossWindow: true,
          sourceWindowId,
          thisWindowId: window.__junoCommunicatorTabId
        });
      } catch (e2) {
        warn(e2);
      }
    });
  }
};
var broadcast = (name, data, options = {}) => {
  try {
    if (typeof name !== "string")
      throw new Error("(broadcast) the message name must be given.");
    if (data === void 0)
      data = null;
    const { debug, crossWindow: crossWindow2 = false, ...unknownOptions } = options || {};
    const unknownOptionsKeys = Object.keys(unknownOptions);
    if (unknownOptionsKeys.length > 0)
      warn(`(broadcast) unknown options: ${unknownOptionsKeys.join(", ")}`);
    if (debug != void 0 && typeof debug !== "boolean")
      warn("(broadcast) debug must be a boolean");
    if (typeof crossWindow2 !== "boolean")
      warn("(broadcast) crossWindow must be a boolean");
    if (debug)
      log(
        `broadcast ${crossWindow2 ? "cross-window" : "intra-window"} message ${name} with data `,
        data
      );
    window.__junoEventListeners["broadcast"]?.[name]?.forEach((listener) => {
      try {
        listener(data, {
          sourceWindowId: window.__junoCommunicatorTabId,
          thisWindowId: window.__junoCommunicatorTabId
        });
      } catch (e) {
        warn(e);
      }
    });
    if (crossWindow2) {
      crossWindowEventBridge.postMessage({
        type: "broadcast",
        name,
        data,
        sourceWindowId: window.__junoCommunicatorTabId
      });
    }
  } catch (e) {
    warn(e);
  }
};
var watch = (name, callback, options = {}) => {
  try {
    if (typeof name !== "string")
      throw new Error("(watch) the message name must be given.");
    if (typeof callback !== "function")
      throw new Error("(watch) the callback parameter must be a function.");
    const { debug, ...unknownOptions } = options || {};
    const unknownOptionsKeys = Object.keys(unknownOptions);
    if (unknownOptionsKeys.length > 0)
      warn(`(watch) unknown options: ${unknownOptionsKeys.join(", ")}`);
    if (debug)
      log(
        `watch for ${crossWindow ? "cross-window" : "intra-window"} message ${name}`
      );
    addListener("broadcast", name, listenerWrapper(callback));
    return () => removeListener("broadcast", name, listenerWrapper(callback));
  } catch (e) {
    warn(e);
  }
};
var get = (name, callback, options = {}) => {
  try {
    if (typeof name !== "string")
      throw new Error("(get) the message name must be given.");
    if (typeof callback !== "function")
      throw new Error("(get) the callback parameter must be a function.");
    const { debug, getOptions, ...unknownOptions } = options || {};
    const unknownOptionsKeys = Object.keys(unknownOptions);
    if (unknownOptionsKeys.length > 0)
      warn(`(get) unknown options: ${unknownOptionsKeys.join(", ")}`);
    if (debug)
      log(`get data for intra-window message ${name}`);
    if (window.__junoEventListeners["get"]?.[name]?.length === 0)
      return;
    window.__junoEventListeners["get"][name]?.forEach((listener) => {
      try {
        const data = listener(options?.getOptions);
        callback(data, {
          sourceWindowId: window.__junoCommunicatorTabId,
          thisWindowId: window.__junoCommunicatorTabId
        });
      } catch (e) {
        warn(e);
      }
    });
  } catch (e) {
    warn(e);
  }
};
var onGet = (name, callback, options = {}) => {
  try {
    if (typeof name !== "string")
      throw new Error("(onGet) the message name must be given.");
    if (typeof callback !== "function")
      throw new Error("(onGet) the callback parameter must be a function.");
    const { debug, crossWindow: crossWindow2 = false, ...unknownOptions } = options || {};
    const unknownOptionsKeys = Object.keys(unknownOptions);
    if (unknownOptionsKeys.length > 0)
      warn(`(onGet) unknown options: ${unknownOptionsKeys.join(", ")}`);
    if (debug)
      log(`send data for intra-window message ${name}`);
    addListener("get", name, listenerWrapper(callback));
    return () => removeListener("get", name, listenerWrapper(callback));
  } catch (e) {
    warn(e);
  }
};
export {
  broadcast,
  get,
  onGet,
  watch
};
//# sourceMappingURL=build.js.map

// src/index.js
var CHANNEL_PREFIX = "JUNO_COMMUNICATOR#";
var uniqString = () => Math.random().toString(36).substring(2);
var log = (...params) => console.log("Communicator Debug [" + CHANNEL_PREFIX + "]:", ...params);
var warn = (...params) => console.warn("Communicator Warning:", ...params);
var error = (...params) => console.error("Communicator Error:", ...params);
window.__juno_communicator_tab_id = window.__juno_communicator_tab_id || uniqString();
console.log("===", window.__juno_communicator_tab_id, "===");
var broadcast = (name, data, options) => {
  try {
    if (typeof name !== "string")
      throw new Error("(broadcast) the message name must be given.");
    if (data === void 0)
      data = null;
    const { debug, crossWindow = false, ...unknownOptions } = options || {};
    const unknownOptionsKeys = Object.keys(unknownOptions);
    if (unknownOptionsKeys.length > 0)
      warn(`(broadcast) unknown options: ${unknownOptionsKeys.join(", ")}`);
    if (debug != void 0 && typeof debug !== "boolean")
      warn("(broadcast) debug must be a boolean");
    if (typeof crossWindow !== "boolean")
      warn("(broadcast) crossWindow must be a boolean");
    let channelName = CHANNEL_PREFIX + name;
    if (crossWindow === false) {
      channelName = `${window.__juno_communicator_tab_id}:${channelName}`;
    }
    let bc = new BroadcastChannel(channelName);
    if (debug)
      log(
        `broadcast message ${name} ${crossWindow ? "cross-window" : "intra-window"} with data `,
        data
      );
    bc.postMessage({ payload: data, source: window.__juno_communicator_tab_id });
    bc.close();
  } catch (e) {
    error(e.message);
  }
};
var watch = (name, callback, options) => {
  try {
    if (typeof name !== "string")
      throw new Error("(watch) the message name must be given.");
    if (typeof callback !== "function")
      throw new Error("(watch) the callback parameter must be a function.");
    const { debug, crossWindow = false, ...unknownOptions } = options || {};
    const unknownOptionsKeys = Object.keys(unknownOptions);
    if (unknownOptionsKeys.length > 0)
      warn(`(watch) unknown options: ${unknownOptionsKeys.join(", ")}`);
    let channelName = CHANNEL_PREFIX + name;
    if (debug)
      log(
        `watch for ${crossWindow ? "cross-window" : "intra-window"} message ${name}`
      );
    let bc;
    if (crossWindow === true) {
      bc = new BroadcastChannel(channelName);
      bc.onmessage = (e) => {
        callback(e.data?.payload, {
          sourceWindowId: e.data?.source,
          thisWindowId: window.__juno_communicator_tab_id
        });
      };
    }
    let bcIntra = new BroadcastChannel(
      `${window.__juno_communicator_tab_id}:${channelName}`
    );
    bcIntra.onmessage = (e) => {
      callback(e.data, {
        sourceWindowId: e.data?.source,
        thisWindowId: window.__juno_communicator_tab_id
      });
    };
    return () => {
      if (bc)
        bc.close();
      bcIntra.close();
    };
  } catch (e) {
    error(e.message);
  }
};
var get = (name, callback, options) => {
  try {
    if (typeof name !== "string")
      throw new Error("(get) the message name must be given.");
    if (typeof callback !== "function")
      throw new Error("(get) the callback parameter must be a function.");
    const {
      debug,
      getOptions,
      crossWindow = false,
      ...unknownOptions
    } = options || {};
    const unknownOptionsKeys = Object.keys(unknownOptions);
    if (unknownOptionsKeys.length > 0)
      warn(`(get) unknown options: ${unknownOptionsKeys.join(", ")}`);
    if (debug)
      log(`get data for message ${name}`);
    let channelName = CHANNEL_PREFIX + name;
    if (crossWindow === false) {
      channelName = `${window.__juno_communicator_tab_id}:${channelName}`;
    }
    const requesterID = channelName + ":GET";
    const receiverID = channelName + requesterID + ":RESPONSE:" + uniqString();
    let receiver = new BroadcastChannel(receiverID);
    receiver.onmessage = (e) => {
      callback(e.payload?.data, {
        sourceWindowId: e.data?.source,
        thisWindowId: window.__juno_communicator_tab_id
      });
    };
    let requester = new BroadcastChannel(requesterID);
    requester.postMessage({
      payload: { receiverID, getOptions },
      source: window.__juno_communicator_tab_id
    });
    requester.close();
    return () => {
      receiver.close();
    };
  } catch (e) {
    error(e.message);
  }
};
var onGet = (name, callback, options = {}) => {
  try {
    if (typeof name !== "string")
      throw new Error("(onGet) the message name must be given.");
    if (typeof callback !== "function")
      throw new Error("(onGet) the callback parameter must be a function.");
    const { debug, crossWindow = false, ...unknownOptions } = options || {};
    const unknownOptionsKeys = Object.keys(unknownOptions);
    if (unknownOptionsKeys.length > 0)
      warn(`(onGet) unknown options: ${unknownOptionsKeys.join(", ")}`);
    if (debug)
      log(`send data for message ${name}`);
    let channelName = CHANNEL_PREFIX + name;
    if (crossWindow === false) {
      channelName = `${window.__juno_communicator_tab_id}:${channelName}`;
    }
    const requesterID = channelName + ":GET";
    const receiver = new BroadcastChannel(requesterID);
    receiver.onmessage = (e) => {
      if (!e.data?.payload?.receiverID)
        return;
      const { receiverID, getOptions } = e.data?.payload;
      const data = callback(getOptions, {
        sourceWindowId: e.data?.source,
        thisWindowId: window.__juno_communicator_tab_id
      });
      const bc = new BroadcastChannel(receiverID);
      bc.postMessage({
        payload: data,
        source: window.__juno_communicator_tab_id
      });
      bc.close();
    };
    return () => {
      receiver.close();
    };
  } catch (e) {
    error(e.message);
  }
};
export {
  broadcast,
  get,
  onGet,
  watch
};

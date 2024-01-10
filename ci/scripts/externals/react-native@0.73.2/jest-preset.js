var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
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

// ../../../tmp/node_modules/react-native/jest-preset.js
var require_jest_preset = __commonJS({
  "../../../tmp/node_modules/react-native/jest-preset.js"(exports, module) {
    "use strict";
    module.exports = {
      haste: {
        defaultPlatform: "ios",
        platforms: ["android", "ios", "native"]
      },
      transform: {
        "^.+\\.(js|ts|tsx)$": "babel-jest",
        "^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$": __require.resolve(
          "./jest/assetFileTransformer.js"
        )
      },
      transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)/)"
      ],
      setupFiles: [__require.resolve("./jest/setup.js")],
      testEnvironment: __require.resolve("./jest/react-native-env.js")
    };
  }
});

// c2e:/tmp/node_modules/react-native/jest-preset.js
var import_jest_preset = __toESM(require_jest_preset());
var export_default = import_jest_preset.default;
var export_haste = import_jest_preset.haste;
var export_setupFiles = import_jest_preset.setupFiles;
var export_testEnvironment = import_jest_preset.testEnvironment;
var export_transform = import_jest_preset.transform;
var export_transformIgnorePatterns = import_jest_preset.transformIgnorePatterns;
export {
  export_default as default,
  export_haste as haste,
  export_setupFiles as setupFiles,
  export_testEnvironment as testEnvironment,
  export_transform as transform,
  export_transformIgnorePatterns as transformIgnorePatterns
};

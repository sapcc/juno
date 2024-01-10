var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// ../../../tmp/node_modules/react-native/template.config.js
var require_template_config = __commonJS({
  "../../../tmp/node_modules/react-native/template.config.js"(exports, module) {
    module.exports = {
      placeholderName: "HelloWorld",
      titlePlaceholder: "Hello App Display Name",
      templateDir: "./template"
    };
  }
});

// c2e:/tmp/node_modules/react-native/template.config.js
var import_template_config = __toESM(require_template_config());
var export_default = import_template_config.default;
var export_placeholderName = import_template_config.placeholderName;
var export_templateDir = import_template_config.templateDir;
var export_titlePlaceholder = import_template_config.titlePlaceholder;
export {
  export_default as default,
  export_placeholderName as placeholderName,
  export_templateDir as templateDir,
  export_titlePlaceholder as titlePlaceholder
};

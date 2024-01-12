var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));

// external:/tmp/node_modules/immer/dist/cjs/index.js
var cjs_exports = {};
__reExport(cjs_exports, cjs_star);
import * as cjs_star from "/tmp/node_modules/immer/dist/cjs/index.js";
var export_Immer = cjs_exports.Immer;
var export_applyPatches = cjs_exports.applyPatches;
var export_castDraft = cjs_exports.castDraft;
var export_castImmutable = cjs_exports.castImmutable;
var export_createDraft = cjs_exports.createDraft;
var export_current = cjs_exports.current;
var export_default = cjs_exports.default;
var export_enableMapSet = cjs_exports.enableMapSet;
var export_enablePatches = cjs_exports.enablePatches;
var export_finishDraft = cjs_exports.finishDraft;
var export_freeze = cjs_exports.freeze;
var export_immerable = cjs_exports.immerable;
var export_isDraft = cjs_exports.isDraft;
var export_isDraftable = cjs_exports.isDraftable;
var export_nothing = cjs_exports.nothing;
var export_original = cjs_exports.original;
var export_produce = cjs_exports.produce;
var export_produceWithPatches = cjs_exports.produceWithPatches;
var export_setAutoFreeze = cjs_exports.setAutoFreeze;
var export_setUseStrictShallowCopy = cjs_exports.setUseStrictShallowCopy;
export {
  export_Immer as Immer,
  export_applyPatches as applyPatches,
  export_castDraft as castDraft,
  export_castImmutable as castImmutable,
  export_createDraft as createDraft,
  export_current as current,
  export_default as default,
  export_enableMapSet as enableMapSet,
  export_enablePatches as enablePatches,
  export_finishDraft as finishDraft,
  export_freeze as freeze,
  export_immerable as immerable,
  export_isDraft as isDraft,
  export_isDraftable as isDraftable,
  export_nothing as nothing,
  export_original as original,
  export_produce as produce,
  export_produceWithPatches as produceWithPatches,
  export_setAutoFreeze as setAutoFreeze,
  export_setUseStrictShallowCopy as setUseStrictShallowCopy
};

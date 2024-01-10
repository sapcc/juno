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

// ../../../tmp/node_modules/immer/dist/cjs/immer.cjs.development.js
var require_immer_cjs_development = __commonJS({
  "../../../tmp/node_modules/immer/dist/cjs/immer.cjs.development.js"(exports, module) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export = /* @__PURE__ */ __name((target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    }, "__export");
    var __copyProps2 = /* @__PURE__ */ __name((to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    }, "__copyProps");
    var __toCommonJS = /* @__PURE__ */ __name((mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod), "__toCommonJS");
    var immer_exports = {};
    __export(immer_exports, {
      Immer: () => Immer22,
      applyPatches: () => applyPatches2,
      castDraft: () => castDraft2,
      castImmutable: () => castImmutable2,
      createDraft: () => createDraft2,
      current: () => current2,
      enableMapSet: () => enableMapSet2,
      enablePatches: () => enablePatches2,
      finishDraft: () => finishDraft2,
      freeze: () => freeze2,
      immerable: () => DRAFTABLE,
      isDraft: () => isDraft2,
      isDraftable: () => isDraftable2,
      nothing: () => NOTHING,
      original: () => original2,
      produce: () => produce2,
      produceWithPatches: () => produceWithPatches2,
      setAutoFreeze: () => setAutoFreeze2,
      setUseStrictShallowCopy: () => setUseStrictShallowCopy2
    });
    module.exports = __toCommonJS(immer_exports);
    var NOTHING = Symbol.for("immer-nothing");
    var DRAFTABLE = Symbol.for("immer-draftable");
    var DRAFT_STATE = Symbol.for("immer-state");
    var errors = true ? [
      // All error codes, starting by 0:
      function(plugin) {
        return `The plugin for '${plugin}' has not been loaded into Immer. To enable the plugin, import and call \`enable${plugin}()\` when initializing your application.`;
      },
      function(thing) {
        return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${thing}'`;
      },
      "This object has been frozen and should not be mutated",
      function(data) {
        return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + data;
      },
      "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
      "Immer forbids circular references",
      "The first or second argument to `produce` must be a function",
      "The third argument to `produce` must be a function or undefined",
      "First argument to `createDraft` must be a plain object, an array, or an immerable object",
      "First argument to `finishDraft` must be a draft returned by `createDraft`",
      function(thing) {
        return `'current' expects a draft, got: ${thing}`;
      },
      "Object.defineProperty() cannot be used on an Immer draft",
      "Object.setPrototypeOf() cannot be used on an Immer draft",
      "Immer only supports deleting array indices",
      "Immer only supports setting array indices and the 'length' property",
      function(thing) {
        return `'original' expects a draft, got: ${thing}`;
      }
      // Note: if more errors are added, the errorOffset in Patches.ts should be increased
      // See Patches.ts for additional errors
    ] : [];
    function die(error, ...args) {
      if (true) {
        const e = errors[error];
        const msg = typeof e === "function" ? e.apply(null, args) : e;
        throw new Error(`[Immer] ${msg}`);
      }
      throw new Error(
        `[Immer] minified error nr: ${error}. Full error at: https://bit.ly/3cXEKWf`
      );
    }
    __name(die, "die");
    var getPrototypeOf = Object.getPrototypeOf;
    function isDraft2(value) {
      return !!value && !!value[DRAFT_STATE];
    }
    __name(isDraft2, "isDraft");
    function isDraftable2(value) {
      if (!value)
        return false;
      return isPlainObject(value) || Array.isArray(value) || !!value[DRAFTABLE] || !!value.constructor?.[DRAFTABLE] || isMap(value) || isSet(value);
    }
    __name(isDraftable2, "isDraftable");
    var objectCtorString = Object.prototype.constructor.toString();
    function isPlainObject(value) {
      if (!value || typeof value !== "object")
        return false;
      const proto = getPrototypeOf(value);
      if (proto === null) {
        return true;
      }
      const Ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
      if (Ctor === Object)
        return true;
      return typeof Ctor == "function" && Function.toString.call(Ctor) === objectCtorString;
    }
    __name(isPlainObject, "isPlainObject");
    function original2(value) {
      if (!isDraft2(value))
        die(15, value);
      return value[DRAFT_STATE].base_;
    }
    __name(original2, "original");
    function each(obj, iter) {
      if (getArchtype(obj) === 0) {
        Object.entries(obj).forEach(([key, value]) => {
          iter(key, value, obj);
        });
      } else {
        obj.forEach((entry, index) => iter(index, entry, obj));
      }
    }
    __name(each, "each");
    function getArchtype(thing) {
      const state = thing[DRAFT_STATE];
      return state ? state.type_ : Array.isArray(thing) ? 1 : isMap(thing) ? 2 : isSet(thing) ? 3 : 0;
    }
    __name(getArchtype, "getArchtype");
    function has(thing, prop) {
      return getArchtype(thing) === 2 ? thing.has(prop) : Object.prototype.hasOwnProperty.call(thing, prop);
    }
    __name(has, "has");
    function get(thing, prop) {
      return getArchtype(thing) === 2 ? thing.get(prop) : thing[prop];
    }
    __name(get, "get");
    function set(thing, propOrOldValue, value) {
      const t = getArchtype(thing);
      if (t === 2)
        thing.set(propOrOldValue, value);
      else if (t === 3) {
        thing.add(value);
      } else
        thing[propOrOldValue] = value;
    }
    __name(set, "set");
    function is(x, y) {
      if (x === y) {
        return x !== 0 || 1 / x === 1 / y;
      } else {
        return x !== x && y !== y;
      }
    }
    __name(is, "is");
    function isMap(target) {
      return target instanceof Map;
    }
    __name(isMap, "isMap");
    function isSet(target) {
      return target instanceof Set;
    }
    __name(isSet, "isSet");
    function latest(state) {
      return state.copy_ || state.base_;
    }
    __name(latest, "latest");
    function shallowCopy(base, strict) {
      if (isMap(base)) {
        return new Map(base);
      }
      if (isSet(base)) {
        return new Set(base);
      }
      if (Array.isArray(base))
        return Array.prototype.slice.call(base);
      if (!strict && isPlainObject(base)) {
        if (!getPrototypeOf(base)) {
          const obj = /* @__PURE__ */ Object.create(null);
          return Object.assign(obj, base);
        }
        return { ...base };
      }
      const descriptors = Object.getOwnPropertyDescriptors(base);
      delete descriptors[DRAFT_STATE];
      let keys = Reflect.ownKeys(descriptors);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const desc = descriptors[key];
        if (desc.writable === false) {
          desc.writable = true;
          desc.configurable = true;
        }
        if (desc.get || desc.set)
          descriptors[key] = {
            configurable: true,
            writable: true,
            // could live with !!desc.set as well here...
            enumerable: desc.enumerable,
            value: base[key]
          };
      }
      return Object.create(getPrototypeOf(base), descriptors);
    }
    __name(shallowCopy, "shallowCopy");
    function freeze2(obj, deep = false) {
      if (isFrozen(obj) || isDraft2(obj) || !isDraftable2(obj))
        return obj;
      if (getArchtype(obj) > 1) {
        obj.set = obj.add = obj.clear = obj.delete = dontMutateFrozenCollections;
      }
      Object.freeze(obj);
      if (deep)
        each(obj, (_key, value) => freeze2(value, true), true);
      return obj;
    }
    __name(freeze2, "freeze");
    function dontMutateFrozenCollections() {
      die(2);
    }
    __name(dontMutateFrozenCollections, "dontMutateFrozenCollections");
    function isFrozen(obj) {
      return Object.isFrozen(obj);
    }
    __name(isFrozen, "isFrozen");
    var plugins = {};
    function getPlugin(pluginKey) {
      const plugin = plugins[pluginKey];
      if (!plugin) {
        die(0, pluginKey);
      }
      return plugin;
    }
    __name(getPlugin, "getPlugin");
    function loadPlugin(pluginKey, implementation) {
      if (!plugins[pluginKey])
        plugins[pluginKey] = implementation;
    }
    __name(loadPlugin, "loadPlugin");
    var currentScope;
    function getCurrentScope() {
      return currentScope;
    }
    __name(getCurrentScope, "getCurrentScope");
    function createScope(parent_, immer_) {
      return {
        drafts_: [],
        parent_,
        immer_,
        // Whenever the modified draft contains a draft from another scope, we
        // need to prevent auto-freezing so the unowned draft can be finalized.
        canAutoFreeze_: true,
        unfinalizedDrafts_: 0
      };
    }
    __name(createScope, "createScope");
    function usePatchesInScope(scope, patchListener) {
      if (patchListener) {
        getPlugin("Patches");
        scope.patches_ = [];
        scope.inversePatches_ = [];
        scope.patchListener_ = patchListener;
      }
    }
    __name(usePatchesInScope, "usePatchesInScope");
    function revokeScope(scope) {
      leaveScope(scope);
      scope.drafts_.forEach(revokeDraft);
      scope.drafts_ = null;
    }
    __name(revokeScope, "revokeScope");
    function leaveScope(scope) {
      if (scope === currentScope) {
        currentScope = scope.parent_;
      }
    }
    __name(leaveScope, "leaveScope");
    function enterScope(immer2) {
      return currentScope = createScope(currentScope, immer2);
    }
    __name(enterScope, "enterScope");
    function revokeDraft(draft) {
      const state = draft[DRAFT_STATE];
      if (state.type_ === 0 || state.type_ === 1)
        state.revoke_();
      else
        state.revoked_ = true;
    }
    __name(revokeDraft, "revokeDraft");
    function processResult(result, scope) {
      scope.unfinalizedDrafts_ = scope.drafts_.length;
      const baseDraft = scope.drafts_[0];
      const isReplaced = result !== void 0 && result !== baseDraft;
      if (isReplaced) {
        if (baseDraft[DRAFT_STATE].modified_) {
          revokeScope(scope);
          die(4);
        }
        if (isDraftable2(result)) {
          result = finalize(scope, result);
          if (!scope.parent_)
            maybeFreeze(scope, result);
        }
        if (scope.patches_) {
          getPlugin("Patches").generateReplacementPatches_(
            baseDraft[DRAFT_STATE].base_,
            result,
            scope.patches_,
            scope.inversePatches_
          );
        }
      } else {
        result = finalize(scope, baseDraft, []);
      }
      revokeScope(scope);
      if (scope.patches_) {
        scope.patchListener_(scope.patches_, scope.inversePatches_);
      }
      return result !== NOTHING ? result : void 0;
    }
    __name(processResult, "processResult");
    function finalize(rootScope, value, path) {
      if (isFrozen(value))
        return value;
      const state = value[DRAFT_STATE];
      if (!state) {
        each(
          value,
          (key, childValue) => finalizeProperty(rootScope, state, value, key, childValue, path),
          true
          // See #590, don't recurse into non-enumerable of non drafted objects
        );
        return value;
      }
      if (state.scope_ !== rootScope)
        return value;
      if (!state.modified_) {
        maybeFreeze(rootScope, state.base_, true);
        return state.base_;
      }
      if (!state.finalized_) {
        state.finalized_ = true;
        state.scope_.unfinalizedDrafts_--;
        const result = state.copy_;
        let resultEach = result;
        let isSet2 = false;
        if (state.type_ === 3) {
          resultEach = new Set(result);
          result.clear();
          isSet2 = true;
        }
        each(
          resultEach,
          (key, childValue) => finalizeProperty(rootScope, state, result, key, childValue, path, isSet2)
        );
        maybeFreeze(rootScope, result, false);
        if (path && rootScope.patches_) {
          getPlugin("Patches").generatePatches_(
            state,
            path,
            rootScope.patches_,
            rootScope.inversePatches_
          );
        }
      }
      return state.copy_;
    }
    __name(finalize, "finalize");
    function finalizeProperty(rootScope, parentState, targetObject, prop, childValue, rootPath, targetIsSet) {
      if (childValue === targetObject)
        die(5);
      if (isDraft2(childValue)) {
        const path = rootPath && parentState && parentState.type_ !== 3 && // Set objects are atomic since they have no keys.
        !has(parentState.assigned_, prop) ? rootPath.concat(prop) : void 0;
        const res = finalize(rootScope, childValue, path);
        set(targetObject, prop, res);
        if (isDraft2(res)) {
          rootScope.canAutoFreeze_ = false;
        } else
          return;
      } else if (targetIsSet) {
        targetObject.add(childValue);
      }
      if (isDraftable2(childValue) && !isFrozen(childValue)) {
        if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) {
          return;
        }
        finalize(rootScope, childValue);
        if (!parentState || !parentState.scope_.parent_)
          maybeFreeze(rootScope, childValue);
      }
    }
    __name(finalizeProperty, "finalizeProperty");
    function maybeFreeze(scope, value, deep = false) {
      if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) {
        freeze2(value, deep);
      }
    }
    __name(maybeFreeze, "maybeFreeze");
    function createProxyProxy(base, parent) {
      const isArray = Array.isArray(base);
      const state = {
        type_: isArray ? 1 : 0,
        // Track which produce call this is associated with.
        scope_: parent ? parent.scope_ : getCurrentScope(),
        // True for both shallow and deep changes.
        modified_: false,
        // Used during finalization.
        finalized_: false,
        // Track which properties have been assigned (true) or deleted (false).
        assigned_: {},
        // The parent draft state.
        parent_: parent,
        // The base state.
        base_: base,
        // The base proxy.
        draft_: null,
        // set below
        // The base copy with any updated values.
        copy_: null,
        // Called by the `produce` function.
        revoke_: null,
        isManual_: false
      };
      let target = state;
      let traps = objectTraps;
      if (isArray) {
        target = [state];
        traps = arrayTraps;
      }
      const { revoke, proxy } = Proxy.revocable(target, traps);
      state.draft_ = proxy;
      state.revoke_ = revoke;
      return proxy;
    }
    __name(createProxyProxy, "createProxyProxy");
    var objectTraps = {
      get(state, prop) {
        if (prop === DRAFT_STATE)
          return state;
        const source = latest(state);
        if (!has(source, prop)) {
          return readPropFromProto(state, source, prop);
        }
        const value = source[prop];
        if (state.finalized_ || !isDraftable2(value)) {
          return value;
        }
        if (value === peek(state.base_, prop)) {
          prepareCopy(state);
          return state.copy_[prop] = createProxy(value, state);
        }
        return value;
      },
      has(state, prop) {
        return prop in latest(state);
      },
      ownKeys(state) {
        return Reflect.ownKeys(latest(state));
      },
      set(state, prop, value) {
        const desc = getDescriptorFromProto(latest(state), prop);
        if (desc?.set) {
          desc.set.call(state.draft_, value);
          return true;
        }
        if (!state.modified_) {
          const current22 = peek(latest(state), prop);
          const currentState = current22?.[DRAFT_STATE];
          if (currentState && currentState.base_ === value) {
            state.copy_[prop] = value;
            state.assigned_[prop] = false;
            return true;
          }
          if (is(value, current22) && (value !== void 0 || has(state.base_, prop)))
            return true;
          prepareCopy(state);
          markChanged(state);
        }
        if (state.copy_[prop] === value && // special case: handle new props with value 'undefined'
        (value !== void 0 || prop in state.copy_) || // special case: NaN
        Number.isNaN(value) && Number.isNaN(state.copy_[prop]))
          return true;
        state.copy_[prop] = value;
        state.assigned_[prop] = true;
        return true;
      },
      deleteProperty(state, prop) {
        if (peek(state.base_, prop) !== void 0 || prop in state.base_) {
          state.assigned_[prop] = false;
          prepareCopy(state);
          markChanged(state);
        } else {
          delete state.assigned_[prop];
        }
        if (state.copy_) {
          delete state.copy_[prop];
        }
        return true;
      },
      // Note: We never coerce `desc.value` into an Immer draft, because we can't make
      // the same guarantee in ES5 mode.
      getOwnPropertyDescriptor(state, prop) {
        const owner = latest(state);
        const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
        if (!desc)
          return desc;
        return {
          writable: true,
          configurable: state.type_ !== 1 || prop !== "length",
          enumerable: desc.enumerable,
          value: owner[prop]
        };
      },
      defineProperty() {
        die(11);
      },
      getPrototypeOf(state) {
        return getPrototypeOf(state.base_);
      },
      setPrototypeOf() {
        die(12);
      }
    };
    var arrayTraps = {};
    each(objectTraps, (key, fn) => {
      arrayTraps[key] = function() {
        arguments[0] = arguments[0][0];
        return fn.apply(this, arguments);
      };
    });
    arrayTraps.deleteProperty = function(state, prop) {
      if (isNaN(parseInt(prop)))
        die(13);
      return arrayTraps.set.call(this, state, prop, void 0);
    };
    arrayTraps.set = function(state, prop, value) {
      if (prop !== "length" && isNaN(parseInt(prop)))
        die(14);
      return objectTraps.set.call(this, state[0], prop, value, state[0]);
    };
    function peek(draft, prop) {
      const state = draft[DRAFT_STATE];
      const source = state ? latest(state) : draft;
      return source[prop];
    }
    __name(peek, "peek");
    function readPropFromProto(state, source, prop) {
      const desc = getDescriptorFromProto(source, prop);
      return desc ? `value` in desc ? desc.value : (
        // This is a very special case, if the prop is a getter defined by the
        // prototype, we should invoke it with the draft as context!
        desc.get?.call(state.draft_)
      ) : void 0;
    }
    __name(readPropFromProto, "readPropFromProto");
    function getDescriptorFromProto(source, prop) {
      if (!(prop in source))
        return void 0;
      let proto = getPrototypeOf(source);
      while (proto) {
        const desc = Object.getOwnPropertyDescriptor(proto, prop);
        if (desc)
          return desc;
        proto = getPrototypeOf(proto);
      }
      return void 0;
    }
    __name(getDescriptorFromProto, "getDescriptorFromProto");
    function markChanged(state) {
      if (!state.modified_) {
        state.modified_ = true;
        if (state.parent_) {
          markChanged(state.parent_);
        }
      }
    }
    __name(markChanged, "markChanged");
    function prepareCopy(state) {
      if (!state.copy_) {
        state.copy_ = shallowCopy(
          state.base_,
          state.scope_.immer_.useStrictShallowCopy_
        );
      }
    }
    __name(prepareCopy, "prepareCopy");
    var Immer22 = /* @__PURE__ */ __name(class {
      constructor(config) {
        this.autoFreeze_ = true;
        this.useStrictShallowCopy_ = false;
        this.produce = (base, recipe, patchListener) => {
          if (typeof base === "function" && typeof recipe !== "function") {
            const defaultBase = recipe;
            recipe = base;
            const self = this;
            return /* @__PURE__ */ __name(function curriedProduce(base2 = defaultBase, ...args) {
              return self.produce(base2, (draft) => recipe.call(this, draft, ...args));
            }, "curriedProduce");
          }
          if (typeof recipe !== "function")
            die(6);
          if (patchListener !== void 0 && typeof patchListener !== "function")
            die(7);
          let result;
          if (isDraftable2(base)) {
            const scope = enterScope(this);
            const proxy = createProxy(base, void 0);
            let hasError = true;
            try {
              result = recipe(proxy);
              hasError = false;
            } finally {
              if (hasError)
                revokeScope(scope);
              else
                leaveScope(scope);
            }
            usePatchesInScope(scope, patchListener);
            return processResult(result, scope);
          } else if (!base || typeof base !== "object") {
            result = recipe(base);
            if (result === void 0)
              result = base;
            if (result === NOTHING)
              result = void 0;
            if (this.autoFreeze_)
              freeze2(result, true);
            if (patchListener) {
              const p = [];
              const ip = [];
              getPlugin("Patches").generateReplacementPatches_(base, result, p, ip);
              patchListener(p, ip);
            }
            return result;
          } else
            die(1, base);
        };
        this.produceWithPatches = (base, recipe) => {
          if (typeof base === "function") {
            return (state, ...args) => this.produceWithPatches(state, (draft) => base(draft, ...args));
          }
          let patches, inversePatches;
          const result = this.produce(base, recipe, (p, ip) => {
            patches = p;
            inversePatches = ip;
          });
          return [result, patches, inversePatches];
        };
        if (typeof config?.autoFreeze === "boolean")
          this.setAutoFreeze(config.autoFreeze);
        if (typeof config?.useStrictShallowCopy === "boolean")
          this.setUseStrictShallowCopy(config.useStrictShallowCopy);
      }
      createDraft(base) {
        if (!isDraftable2(base))
          die(8);
        if (isDraft2(base))
          base = current2(base);
        const scope = enterScope(this);
        const proxy = createProxy(base, void 0);
        proxy[DRAFT_STATE].isManual_ = true;
        leaveScope(scope);
        return proxy;
      }
      finishDraft(draft, patchListener) {
        const state = draft && draft[DRAFT_STATE];
        if (!state || !state.isManual_)
          die(9);
        const { scope_: scope } = state;
        usePatchesInScope(scope, patchListener);
        return processResult(void 0, scope);
      }
      /**
       * Pass true to automatically freeze all copies created by Immer.
       *
       * By default, auto-freezing is enabled.
       */
      setAutoFreeze(value) {
        this.autoFreeze_ = value;
      }
      /**
       * Pass true to enable strict shallow copy.
       *
       * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
       */
      setUseStrictShallowCopy(value) {
        this.useStrictShallowCopy_ = value;
      }
      applyPatches(base, patches) {
        let i;
        for (i = patches.length - 1; i >= 0; i--) {
          const patch = patches[i];
          if (patch.path.length === 0 && patch.op === "replace") {
            base = patch.value;
            break;
          }
        }
        if (i > -1) {
          patches = patches.slice(i + 1);
        }
        const applyPatchesImpl = getPlugin("Patches").applyPatches_;
        if (isDraft2(base)) {
          return applyPatchesImpl(base, patches);
        }
        return this.produce(
          base,
          (draft) => applyPatchesImpl(draft, patches)
        );
      }
    }, "Immer2");
    function createProxy(value, parent) {
      const draft = isMap(value) ? getPlugin("MapSet").proxyMap_(value, parent) : isSet(value) ? getPlugin("MapSet").proxySet_(value, parent) : createProxyProxy(value, parent);
      const scope = parent ? parent.scope_ : getCurrentScope();
      scope.drafts_.push(draft);
      return draft;
    }
    __name(createProxy, "createProxy");
    function current2(value) {
      if (!isDraft2(value))
        die(10, value);
      return currentImpl(value);
    }
    __name(current2, "current");
    function currentImpl(value) {
      if (!isDraftable2(value) || isFrozen(value))
        return value;
      const state = value[DRAFT_STATE];
      let copy;
      if (state) {
        if (!state.modified_)
          return state.base_;
        state.finalized_ = true;
        copy = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
      } else {
        copy = shallowCopy(value, true);
      }
      each(copy, (key, childValue) => {
        set(copy, key, currentImpl(childValue));
      });
      if (state) {
        state.finalized_ = false;
      }
      return copy;
    }
    __name(currentImpl, "currentImpl");
    function enablePatches2() {
      const errorOffset = 16;
      if (true) {
        errors.push(
          'Sets cannot have "replace" patches.',
          function(op) {
            return "Unsupported patch operation: " + op;
          },
          function(path) {
            return "Cannot apply patch, path doesn't resolve: " + path;
          },
          "Patching reserved attributes like __proto__, prototype and constructor is not allowed"
        );
      }
      const REPLACE = "replace";
      const ADD = "add";
      const REMOVE = "remove";
      function generatePatches_(state, basePath, patches, inversePatches) {
        switch (state.type_) {
          case 0:
          case 2:
            return generatePatchesFromAssigned(
              state,
              basePath,
              patches,
              inversePatches
            );
          case 1:
            return generateArrayPatches(state, basePath, patches, inversePatches);
          case 3:
            return generateSetPatches(
              state,
              basePath,
              patches,
              inversePatches
            );
        }
      }
      __name(generatePatches_, "generatePatches_");
      function generateArrayPatches(state, basePath, patches, inversePatches) {
        let { base_, assigned_ } = state;
        let copy_ = state.copy_;
        if (copy_.length < base_.length) {
          ;
          [base_, copy_] = [copy_, base_];
          [patches, inversePatches] = [inversePatches, patches];
        }
        for (let i = 0; i < base_.length; i++) {
          if (assigned_[i] && copy_[i] !== base_[i]) {
            const path = basePath.concat([i]);
            patches.push({
              op: REPLACE,
              path,
              // Need to maybe clone it, as it can in fact be the original value
              // due to the base/copy inversion at the start of this function
              value: clonePatchValueIfNeeded(copy_[i])
            });
            inversePatches.push({
              op: REPLACE,
              path,
              value: clonePatchValueIfNeeded(base_[i])
            });
          }
        }
        for (let i = base_.length; i < copy_.length; i++) {
          const path = basePath.concat([i]);
          patches.push({
            op: ADD,
            path,
            // Need to maybe clone it, as it can in fact be the original value
            // due to the base/copy inversion at the start of this function
            value: clonePatchValueIfNeeded(copy_[i])
          });
        }
        for (let i = copy_.length - 1; base_.length <= i; --i) {
          const path = basePath.concat([i]);
          inversePatches.push({
            op: REMOVE,
            path
          });
        }
      }
      __name(generateArrayPatches, "generateArrayPatches");
      function generatePatchesFromAssigned(state, basePath, patches, inversePatches) {
        const { base_, copy_ } = state;
        each(state.assigned_, (key, assignedValue) => {
          const origValue = get(base_, key);
          const value = get(copy_, key);
          const op = !assignedValue ? REMOVE : has(base_, key) ? REPLACE : ADD;
          if (origValue === value && op === REPLACE)
            return;
          const path = basePath.concat(key);
          patches.push(op === REMOVE ? { op, path } : { op, path, value });
          inversePatches.push(
            op === ADD ? { op: REMOVE, path } : op === REMOVE ? { op: ADD, path, value: clonePatchValueIfNeeded(origValue) } : { op: REPLACE, path, value: clonePatchValueIfNeeded(origValue) }
          );
        });
      }
      __name(generatePatchesFromAssigned, "generatePatchesFromAssigned");
      function generateSetPatches(state, basePath, patches, inversePatches) {
        let { base_, copy_ } = state;
        let i = 0;
        base_.forEach((value) => {
          if (!copy_.has(value)) {
            const path = basePath.concat([i]);
            patches.push({
              op: REMOVE,
              path,
              value
            });
            inversePatches.unshift({
              op: ADD,
              path,
              value
            });
          }
          i++;
        });
        i = 0;
        copy_.forEach((value) => {
          if (!base_.has(value)) {
            const path = basePath.concat([i]);
            patches.push({
              op: ADD,
              path,
              value
            });
            inversePatches.unshift({
              op: REMOVE,
              path,
              value
            });
          }
          i++;
        });
      }
      __name(generateSetPatches, "generateSetPatches");
      function generateReplacementPatches_(baseValue, replacement, patches, inversePatches) {
        patches.push({
          op: REPLACE,
          path: [],
          value: replacement === NOTHING ? void 0 : replacement
        });
        inversePatches.push({
          op: REPLACE,
          path: [],
          value: baseValue
        });
      }
      __name(generateReplacementPatches_, "generateReplacementPatches_");
      function applyPatches_(draft, patches) {
        patches.forEach((patch) => {
          const { path, op } = patch;
          let base = draft;
          for (let i = 0; i < path.length - 1; i++) {
            const parentType = getArchtype(base);
            let p = path[i];
            if (typeof p !== "string" && typeof p !== "number") {
              p = "" + p;
            }
            if ((parentType === 0 || parentType === 1) && (p === "__proto__" || p === "constructor"))
              die(errorOffset + 3);
            if (typeof base === "function" && p === "prototype")
              die(errorOffset + 3);
            base = get(base, p);
            if (typeof base !== "object")
              die(errorOffset + 2, path.join("/"));
          }
          const type = getArchtype(base);
          const value = deepClonePatchValue(patch.value);
          const key = path[path.length - 1];
          switch (op) {
            case REPLACE:
              switch (type) {
                case 2:
                  return base.set(key, value);
                case 3:
                  die(errorOffset);
                default:
                  return base[key] = value;
              }
            case ADD:
              switch (type) {
                case 1:
                  return key === "-" ? base.push(value) : base.splice(key, 0, value);
                case 2:
                  return base.set(key, value);
                case 3:
                  return base.add(value);
                default:
                  return base[key] = value;
              }
            case REMOVE:
              switch (type) {
                case 1:
                  return base.splice(key, 1);
                case 2:
                  return base.delete(key);
                case 3:
                  return base.delete(patch.value);
                default:
                  return delete base[key];
              }
            default:
              die(errorOffset + 1, op);
          }
        });
        return draft;
      }
      __name(applyPatches_, "applyPatches_");
      function deepClonePatchValue(obj) {
        if (!isDraftable2(obj))
          return obj;
        if (Array.isArray(obj))
          return obj.map(deepClonePatchValue);
        if (isMap(obj))
          return new Map(
            Array.from(obj.entries()).map(([k, v]) => [k, deepClonePatchValue(v)])
          );
        if (isSet(obj))
          return new Set(Array.from(obj).map(deepClonePatchValue));
        const cloned = Object.create(getPrototypeOf(obj));
        for (const key in obj)
          cloned[key] = deepClonePatchValue(obj[key]);
        if (has(obj, DRAFTABLE))
          cloned[DRAFTABLE] = obj[DRAFTABLE];
        return cloned;
      }
      __name(deepClonePatchValue, "deepClonePatchValue");
      function clonePatchValueIfNeeded(obj) {
        if (isDraft2(obj)) {
          return deepClonePatchValue(obj);
        } else
          return obj;
      }
      __name(clonePatchValueIfNeeded, "clonePatchValueIfNeeded");
      loadPlugin("Patches", {
        applyPatches_,
        generatePatches_,
        generateReplacementPatches_
      });
    }
    __name(enablePatches2, "enablePatches");
    function enableMapSet2() {
      class DraftMap extends Map {
        constructor(target, parent) {
          super();
          this[DRAFT_STATE] = {
            type_: 2,
            parent_: parent,
            scope_: parent ? parent.scope_ : getCurrentScope(),
            modified_: false,
            finalized_: false,
            copy_: void 0,
            assigned_: void 0,
            base_: target,
            draft_: this,
            isManual_: false,
            revoked_: false
          };
        }
        get size() {
          return latest(this[DRAFT_STATE]).size;
        }
        has(key) {
          return latest(this[DRAFT_STATE]).has(key);
        }
        set(key, value) {
          const state = this[DRAFT_STATE];
          assertUnrevoked(state);
          if (!latest(state).has(key) || latest(state).get(key) !== value) {
            prepareMapCopy(state);
            markChanged(state);
            state.assigned_.set(key, true);
            state.copy_.set(key, value);
            state.assigned_.set(key, true);
          }
          return this;
        }
        delete(key) {
          if (!this.has(key)) {
            return false;
          }
          const state = this[DRAFT_STATE];
          assertUnrevoked(state);
          prepareMapCopy(state);
          markChanged(state);
          if (state.base_.has(key)) {
            state.assigned_.set(key, false);
          } else {
            state.assigned_.delete(key);
          }
          state.copy_.delete(key);
          return true;
        }
        clear() {
          const state = this[DRAFT_STATE];
          assertUnrevoked(state);
          if (latest(state).size) {
            prepareMapCopy(state);
            markChanged(state);
            state.assigned_ = /* @__PURE__ */ new Map();
            each(state.base_, (key) => {
              state.assigned_.set(key, false);
            });
            state.copy_.clear();
          }
        }
        forEach(cb, thisArg) {
          const state = this[DRAFT_STATE];
          latest(state).forEach((_value, key, _map) => {
            cb.call(thisArg, this.get(key), key, this);
          });
        }
        get(key) {
          const state = this[DRAFT_STATE];
          assertUnrevoked(state);
          const value = latest(state).get(key);
          if (state.finalized_ || !isDraftable2(value)) {
            return value;
          }
          if (value !== state.base_.get(key)) {
            return value;
          }
          const draft = createProxy(value, state);
          prepareMapCopy(state);
          state.copy_.set(key, draft);
          return draft;
        }
        keys() {
          return latest(this[DRAFT_STATE]).keys();
        }
        values() {
          const iterator = this.keys();
          return {
            [Symbol.iterator]: () => this.values(),
            next: () => {
              const r = iterator.next();
              if (r.done)
                return r;
              const value = this.get(r.value);
              return {
                done: false,
                value
              };
            }
          };
        }
        entries() {
          const iterator = this.keys();
          return {
            [Symbol.iterator]: () => this.entries(),
            next: () => {
              const r = iterator.next();
              if (r.done)
                return r;
              const value = this.get(r.value);
              return {
                done: false,
                value: [r.value, value]
              };
            }
          };
        }
        [(DRAFT_STATE, Symbol.iterator)]() {
          return this.entries();
        }
      }
      __name(DraftMap, "DraftMap");
      function proxyMap_(target, parent) {
        return new DraftMap(target, parent);
      }
      __name(proxyMap_, "proxyMap_");
      function prepareMapCopy(state) {
        if (!state.copy_) {
          state.assigned_ = /* @__PURE__ */ new Map();
          state.copy_ = new Map(state.base_);
        }
      }
      __name(prepareMapCopy, "prepareMapCopy");
      class DraftSet extends Set {
        constructor(target, parent) {
          super();
          this[DRAFT_STATE] = {
            type_: 3,
            parent_: parent,
            scope_: parent ? parent.scope_ : getCurrentScope(),
            modified_: false,
            finalized_: false,
            copy_: void 0,
            base_: target,
            draft_: this,
            drafts_: /* @__PURE__ */ new Map(),
            revoked_: false,
            isManual_: false
          };
        }
        get size() {
          return latest(this[DRAFT_STATE]).size;
        }
        has(value) {
          const state = this[DRAFT_STATE];
          assertUnrevoked(state);
          if (!state.copy_) {
            return state.base_.has(value);
          }
          if (state.copy_.has(value))
            return true;
          if (state.drafts_.has(value) && state.copy_.has(state.drafts_.get(value)))
            return true;
          return false;
        }
        add(value) {
          const state = this[DRAFT_STATE];
          assertUnrevoked(state);
          if (!this.has(value)) {
            prepareSetCopy(state);
            markChanged(state);
            state.copy_.add(value);
          }
          return this;
        }
        delete(value) {
          if (!this.has(value)) {
            return false;
          }
          const state = this[DRAFT_STATE];
          assertUnrevoked(state);
          prepareSetCopy(state);
          markChanged(state);
          return state.copy_.delete(value) || (state.drafts_.has(value) ? state.copy_.delete(state.drafts_.get(value)) : (
            /* istanbul ignore next */
            false
          ));
        }
        clear() {
          const state = this[DRAFT_STATE];
          assertUnrevoked(state);
          if (latest(state).size) {
            prepareSetCopy(state);
            markChanged(state);
            state.copy_.clear();
          }
        }
        values() {
          const state = this[DRAFT_STATE];
          assertUnrevoked(state);
          prepareSetCopy(state);
          return state.copy_.values();
        }
        entries() {
          const state = this[DRAFT_STATE];
          assertUnrevoked(state);
          prepareSetCopy(state);
          return state.copy_.entries();
        }
        keys() {
          return this.values();
        }
        [(DRAFT_STATE, Symbol.iterator)]() {
          return this.values();
        }
        forEach(cb, thisArg) {
          const iterator = this.values();
          let result = iterator.next();
          while (!result.done) {
            cb.call(thisArg, result.value, result.value, this);
            result = iterator.next();
          }
        }
      }
      __name(DraftSet, "DraftSet");
      function proxySet_(target, parent) {
        return new DraftSet(target, parent);
      }
      __name(proxySet_, "proxySet_");
      function prepareSetCopy(state) {
        if (!state.copy_) {
          state.copy_ = /* @__PURE__ */ new Set();
          state.base_.forEach((value) => {
            if (isDraftable2(value)) {
              const draft = createProxy(value, state);
              state.drafts_.set(value, draft);
              state.copy_.add(draft);
            } else {
              state.copy_.add(value);
            }
          });
        }
      }
      __name(prepareSetCopy, "prepareSetCopy");
      function assertUnrevoked(state) {
        if (state.revoked_)
          die(3, JSON.stringify(latest(state)));
      }
      __name(assertUnrevoked, "assertUnrevoked");
      loadPlugin("MapSet", { proxyMap_, proxySet_ });
    }
    __name(enableMapSet2, "enableMapSet");
    var immer = new Immer22();
    var produce2 = immer.produce;
    var produceWithPatches2 = immer.produceWithPatches.bind(
      immer
    );
    var setAutoFreeze2 = immer.setAutoFreeze.bind(immer);
    var setUseStrictShallowCopy2 = immer.setUseStrictShallowCopy.bind(immer);
    var applyPatches2 = immer.applyPatches.bind(immer);
    var createDraft2 = immer.createDraft.bind(immer);
    var finishDraft2 = immer.finishDraft.bind(immer);
    function castDraft2(value) {
      return value;
    }
    __name(castDraft2, "castDraft");
    function castImmutable2(value) {
      return value;
    }
    __name(castImmutable2, "castImmutable");
  }
});

// ../../../tmp/node_modules/immer/dist/cjs/index.js
var require_cjs = __commonJS({
  "../../../tmp/node_modules/immer/dist/cjs/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_immer_cjs_development();
    }
  }
});

// c2e:/tmp/node_modules/immer/dist/cjs/index.js
var import_cjs = __toESM(require_cjs());
var export_Immer = import_cjs.Immer;
var export_applyPatches = import_cjs.applyPatches;
var export_castDraft = import_cjs.castDraft;
var export_castImmutable = import_cjs.castImmutable;
var export_createDraft = import_cjs.createDraft;
var export_current = import_cjs.current;
var export_default = import_cjs.default;
var export_enableMapSet = import_cjs.enableMapSet;
var export_enablePatches = import_cjs.enablePatches;
var export_finishDraft = import_cjs.finishDraft;
var export_freeze = import_cjs.freeze;
var export_immerable = import_cjs.immerable;
var export_isDraft = import_cjs.isDraft;
var export_isDraftable = import_cjs.isDraftable;
var export_nothing = import_cjs.nothing;
var export_original = import_cjs.original;
var export_produce = import_cjs.produce;
var export_produceWithPatches = import_cjs.produceWithPatches;
var export_setAutoFreeze = import_cjs.setAutoFreeze;
var export_setUseStrictShallowCopy = import_cjs.setUseStrictShallowCopy;
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

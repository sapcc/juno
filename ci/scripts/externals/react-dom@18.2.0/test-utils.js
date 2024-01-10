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

// external:react
var react_exports = {};
import * as react_star from "react";
var init_react = __esm({
  "external:react"() {
    __reExport(react_exports, react_star);
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

// ../../../tmp/node_modules/react-dom/cjs/react-dom-test-utils.development.js
var require_react_dom_test_utils_development = __commonJS({
  "../../../tmp/node_modules/react-dom/cjs/react-dom-test-utils.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        var React = (init_react(), __toCommonJS(react_exports));
        var ReactDOM = (init_react_dom(), __toCommonJS(react_dom_exports));
        var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        function warn(format) {
          {
            {
              for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }
              printWarning("warn", format, args);
            }
          }
        }
        __name(warn, "warn");
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
        function get(key) {
          return key._reactInternals;
        }
        __name(get, "get");
        var FunctionComponent = 0;
        var ClassComponent = 1;
        var HostRoot = 3;
        var HostComponent = 5;
        var HostText = 6;
        var NoFlags = (
          /*                      */
          0
        );
        var Placement = (
          /*                    */
          2
        );
        var Hydrating = (
          /*                    */
          4096
        );
        var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
        function getNearestMountedFiber(fiber) {
          var node = fiber;
          var nearestMounted = fiber;
          if (!fiber.alternate) {
            var nextNode = node;
            do {
              node = nextNode;
              if ((node.flags & (Placement | Hydrating)) !== NoFlags) {
                nearestMounted = node.return;
              }
              nextNode = node.return;
            } while (nextNode);
          } else {
            while (node.return) {
              node = node.return;
            }
          }
          if (node.tag === HostRoot) {
            return nearestMounted;
          }
          return null;
        }
        __name(getNearestMountedFiber, "getNearestMountedFiber");
        function assertIsMounted(fiber) {
          if (getNearestMountedFiber(fiber) !== fiber) {
            throw new Error("Unable to find node on an unmounted component.");
          }
        }
        __name(assertIsMounted, "assertIsMounted");
        function findCurrentFiberUsingSlowPath(fiber) {
          var alternate = fiber.alternate;
          if (!alternate) {
            var nearestMounted = getNearestMountedFiber(fiber);
            if (nearestMounted === null) {
              throw new Error("Unable to find node on an unmounted component.");
            }
            if (nearestMounted !== fiber) {
              return null;
            }
            return fiber;
          }
          var a = fiber;
          var b = alternate;
          while (true) {
            var parentA = a.return;
            if (parentA === null) {
              break;
            }
            var parentB = parentA.alternate;
            if (parentB === null) {
              var nextParent = parentA.return;
              if (nextParent !== null) {
                a = b = nextParent;
                continue;
              }
              break;
            }
            if (parentA.child === parentB.child) {
              var child = parentA.child;
              while (child) {
                if (child === a) {
                  assertIsMounted(parentA);
                  return fiber;
                }
                if (child === b) {
                  assertIsMounted(parentA);
                  return alternate;
                }
                child = child.sibling;
              }
              throw new Error("Unable to find node on an unmounted component.");
            }
            if (a.return !== b.return) {
              a = parentA;
              b = parentB;
            } else {
              var didFindChild = false;
              var _child = parentA.child;
              while (_child) {
                if (_child === a) {
                  didFindChild = true;
                  a = parentA;
                  b = parentB;
                  break;
                }
                if (_child === b) {
                  didFindChild = true;
                  b = parentA;
                  a = parentB;
                  break;
                }
                _child = _child.sibling;
              }
              if (!didFindChild) {
                _child = parentB.child;
                while (_child) {
                  if (_child === a) {
                    didFindChild = true;
                    a = parentB;
                    b = parentA;
                    break;
                  }
                  if (_child === b) {
                    didFindChild = true;
                    b = parentB;
                    a = parentA;
                    break;
                  }
                  _child = _child.sibling;
                }
                if (!didFindChild) {
                  throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
                }
              }
            }
            if (a.alternate !== b) {
              throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
            }
          }
          if (a.tag !== HostRoot) {
            throw new Error("Unable to find node on an unmounted component.");
          }
          if (a.stateNode.current === a) {
            return fiber;
          }
          return alternate;
        }
        __name(findCurrentFiberUsingSlowPath, "findCurrentFiberUsingSlowPath");
        var assign = Object.assign;
        function getEventCharCode(nativeEvent) {
          var charCode;
          var keyCode = nativeEvent.keyCode;
          if ("charCode" in nativeEvent) {
            charCode = nativeEvent.charCode;
            if (charCode === 0 && keyCode === 13) {
              charCode = 13;
            }
          } else {
            charCode = keyCode;
          }
          if (charCode === 10) {
            charCode = 13;
          }
          if (charCode >= 32 || charCode === 13) {
            return charCode;
          }
          return 0;
        }
        __name(getEventCharCode, "getEventCharCode");
        function functionThatReturnsTrue() {
          return true;
        }
        __name(functionThatReturnsTrue, "functionThatReturnsTrue");
        function functionThatReturnsFalse() {
          return false;
        }
        __name(functionThatReturnsFalse, "functionThatReturnsFalse");
        function createSyntheticEvent(Interface) {
          function SyntheticBaseEvent(reactName, reactEventType, targetInst, nativeEvent, nativeEventTarget) {
            this._reactName = reactName;
            this._targetInst = targetInst;
            this.type = reactEventType;
            this.nativeEvent = nativeEvent;
            this.target = nativeEventTarget;
            this.currentTarget = null;
            for (var _propName in Interface) {
              if (!Interface.hasOwnProperty(_propName)) {
                continue;
              }
              var normalize = Interface[_propName];
              if (normalize) {
                this[_propName] = normalize(nativeEvent);
              } else {
                this[_propName] = nativeEvent[_propName];
              }
            }
            var defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;
            if (defaultPrevented) {
              this.isDefaultPrevented = functionThatReturnsTrue;
            } else {
              this.isDefaultPrevented = functionThatReturnsFalse;
            }
            this.isPropagationStopped = functionThatReturnsFalse;
            return this;
          }
          __name(SyntheticBaseEvent, "SyntheticBaseEvent");
          assign(SyntheticBaseEvent.prototype, {
            preventDefault: function() {
              this.defaultPrevented = true;
              var event = this.nativeEvent;
              if (!event) {
                return;
              }
              if (event.preventDefault) {
                event.preventDefault();
              } else if (typeof event.returnValue !== "unknown") {
                event.returnValue = false;
              }
              this.isDefaultPrevented = functionThatReturnsTrue;
            },
            stopPropagation: function() {
              var event = this.nativeEvent;
              if (!event) {
                return;
              }
              if (event.stopPropagation) {
                event.stopPropagation();
              } else if (typeof event.cancelBubble !== "unknown") {
                event.cancelBubble = true;
              }
              this.isPropagationStopped = functionThatReturnsTrue;
            },
            /**
             * We release all dispatched `SyntheticEvent`s after each event loop, adding
             * them back into the pool. This allows a way to hold onto a reference that
             * won't be added back into the pool.
             */
            persist: function() {
            },
            /**
             * Checks if this event should be released back into the pool.
             *
             * @return {boolean} True if this should not be released, false otherwise.
             */
            isPersistent: functionThatReturnsTrue
          });
          return SyntheticBaseEvent;
        }
        __name(createSyntheticEvent, "createSyntheticEvent");
        var EventInterface = {
          eventPhase: 0,
          bubbles: 0,
          cancelable: 0,
          timeStamp: function(event) {
            return event.timeStamp || Date.now();
          },
          defaultPrevented: 0,
          isTrusted: 0
        };
        var SyntheticEvent = createSyntheticEvent(EventInterface);
        var UIEventInterface = assign({}, EventInterface, {
          view: 0,
          detail: 0
        });
        var SyntheticUIEvent = createSyntheticEvent(UIEventInterface);
        var lastMovementX;
        var lastMovementY;
        var lastMouseEvent;
        function updateMouseMovementPolyfillState(event) {
          if (event !== lastMouseEvent) {
            if (lastMouseEvent && event.type === "mousemove") {
              lastMovementX = event.screenX - lastMouseEvent.screenX;
              lastMovementY = event.screenY - lastMouseEvent.screenY;
            } else {
              lastMovementX = 0;
              lastMovementY = 0;
            }
            lastMouseEvent = event;
          }
        }
        __name(updateMouseMovementPolyfillState, "updateMouseMovementPolyfillState");
        var MouseEventInterface = assign({}, UIEventInterface, {
          screenX: 0,
          screenY: 0,
          clientX: 0,
          clientY: 0,
          pageX: 0,
          pageY: 0,
          ctrlKey: 0,
          shiftKey: 0,
          altKey: 0,
          metaKey: 0,
          getModifierState: getEventModifierState,
          button: 0,
          buttons: 0,
          relatedTarget: function(event) {
            if (event.relatedTarget === void 0)
              return event.fromElement === event.srcElement ? event.toElement : event.fromElement;
            return event.relatedTarget;
          },
          movementX: function(event) {
            if ("movementX" in event) {
              return event.movementX;
            }
            updateMouseMovementPolyfillState(event);
            return lastMovementX;
          },
          movementY: function(event) {
            if ("movementY" in event) {
              return event.movementY;
            }
            return lastMovementY;
          }
        });
        var SyntheticMouseEvent = createSyntheticEvent(MouseEventInterface);
        var DragEventInterface = assign({}, MouseEventInterface, {
          dataTransfer: 0
        });
        var SyntheticDragEvent = createSyntheticEvent(DragEventInterface);
        var FocusEventInterface = assign({}, UIEventInterface, {
          relatedTarget: 0
        });
        var SyntheticFocusEvent = createSyntheticEvent(FocusEventInterface);
        var AnimationEventInterface = assign({}, EventInterface, {
          animationName: 0,
          elapsedTime: 0,
          pseudoElement: 0
        });
        var SyntheticAnimationEvent = createSyntheticEvent(AnimationEventInterface);
        var ClipboardEventInterface = assign({}, EventInterface, {
          clipboardData: function(event) {
            return "clipboardData" in event ? event.clipboardData : window.clipboardData;
          }
        });
        var SyntheticClipboardEvent = createSyntheticEvent(ClipboardEventInterface);
        var CompositionEventInterface = assign({}, EventInterface, {
          data: 0
        });
        var SyntheticCompositionEvent = createSyntheticEvent(CompositionEventInterface);
        var normalizeKey = {
          Esc: "Escape",
          Spacebar: " ",
          Left: "ArrowLeft",
          Up: "ArrowUp",
          Right: "ArrowRight",
          Down: "ArrowDown",
          Del: "Delete",
          Win: "OS",
          Menu: "ContextMenu",
          Apps: "ContextMenu",
          Scroll: "ScrollLock",
          MozPrintableKey: "Unidentified"
        };
        var translateToKey = {
          "8": "Backspace",
          "9": "Tab",
          "12": "Clear",
          "13": "Enter",
          "16": "Shift",
          "17": "Control",
          "18": "Alt",
          "19": "Pause",
          "20": "CapsLock",
          "27": "Escape",
          "32": " ",
          "33": "PageUp",
          "34": "PageDown",
          "35": "End",
          "36": "Home",
          "37": "ArrowLeft",
          "38": "ArrowUp",
          "39": "ArrowRight",
          "40": "ArrowDown",
          "45": "Insert",
          "46": "Delete",
          "112": "F1",
          "113": "F2",
          "114": "F3",
          "115": "F4",
          "116": "F5",
          "117": "F6",
          "118": "F7",
          "119": "F8",
          "120": "F9",
          "121": "F10",
          "122": "F11",
          "123": "F12",
          "144": "NumLock",
          "145": "ScrollLock",
          "224": "Meta"
        };
        function getEventKey(nativeEvent) {
          if (nativeEvent.key) {
            var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
            if (key !== "Unidentified") {
              return key;
            }
          }
          if (nativeEvent.type === "keypress") {
            var charCode = getEventCharCode(nativeEvent);
            return charCode === 13 ? "Enter" : String.fromCharCode(charCode);
          }
          if (nativeEvent.type === "keydown" || nativeEvent.type === "keyup") {
            return translateToKey[nativeEvent.keyCode] || "Unidentified";
          }
          return "";
        }
        __name(getEventKey, "getEventKey");
        var modifierKeyToProp = {
          Alt: "altKey",
          Control: "ctrlKey",
          Meta: "metaKey",
          Shift: "shiftKey"
        };
        function modifierStateGetter(keyArg) {
          var syntheticEvent = this;
          var nativeEvent = syntheticEvent.nativeEvent;
          if (nativeEvent.getModifierState) {
            return nativeEvent.getModifierState(keyArg);
          }
          var keyProp = modifierKeyToProp[keyArg];
          return keyProp ? !!nativeEvent[keyProp] : false;
        }
        __name(modifierStateGetter, "modifierStateGetter");
        function getEventModifierState(nativeEvent) {
          return modifierStateGetter;
        }
        __name(getEventModifierState, "getEventModifierState");
        var KeyboardEventInterface = assign({}, UIEventInterface, {
          key: getEventKey,
          code: 0,
          location: 0,
          ctrlKey: 0,
          shiftKey: 0,
          altKey: 0,
          metaKey: 0,
          repeat: 0,
          locale: 0,
          getModifierState: getEventModifierState,
          // Legacy Interface
          charCode: function(event) {
            if (event.type === "keypress") {
              return getEventCharCode(event);
            }
            return 0;
          },
          keyCode: function(event) {
            if (event.type === "keydown" || event.type === "keyup") {
              return event.keyCode;
            }
            return 0;
          },
          which: function(event) {
            if (event.type === "keypress") {
              return getEventCharCode(event);
            }
            if (event.type === "keydown" || event.type === "keyup") {
              return event.keyCode;
            }
            return 0;
          }
        });
        var SyntheticKeyboardEvent = createSyntheticEvent(KeyboardEventInterface);
        var PointerEventInterface = assign({}, MouseEventInterface, {
          pointerId: 0,
          width: 0,
          height: 0,
          pressure: 0,
          tangentialPressure: 0,
          tiltX: 0,
          tiltY: 0,
          twist: 0,
          pointerType: 0,
          isPrimary: 0
        });
        var SyntheticPointerEvent = createSyntheticEvent(PointerEventInterface);
        var TouchEventInterface = assign({}, UIEventInterface, {
          touches: 0,
          targetTouches: 0,
          changedTouches: 0,
          altKey: 0,
          metaKey: 0,
          ctrlKey: 0,
          shiftKey: 0,
          getModifierState: getEventModifierState
        });
        var SyntheticTouchEvent = createSyntheticEvent(TouchEventInterface);
        var TransitionEventInterface = assign({}, EventInterface, {
          propertyName: 0,
          elapsedTime: 0,
          pseudoElement: 0
        });
        var SyntheticTransitionEvent = createSyntheticEvent(TransitionEventInterface);
        var WheelEventInterface = assign({}, MouseEventInterface, {
          deltaX: function(event) {
            return "deltaX" in event ? event.deltaX : (
              // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
              "wheelDeltaX" in event ? -event.wheelDeltaX : 0
            );
          },
          deltaY: function(event) {
            return "deltaY" in event ? event.deltaY : (
              // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
              "wheelDeltaY" in event ? -event.wheelDeltaY : (
                // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
                "wheelDelta" in event ? -event.wheelDelta : 0
              )
            );
          },
          deltaZ: 0,
          // Browsers without "deltaMode" is reporting in raw wheel delta where one
          // notch on the scroll is always +/- 120, roughly equivalent to pixels.
          // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
          // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
          deltaMode: 0
        });
        var SyntheticWheelEvent = createSyntheticEvent(WheelEventInterface);
        var ELEMENT_NODE = 1;
        function invokeGuardedCallbackProd(name, func, context, a, b, c, d, e, f) {
          var funcArgs = Array.prototype.slice.call(arguments, 3);
          try {
            func.apply(context, funcArgs);
          } catch (error2) {
            this.onError(error2);
          }
        }
        __name(invokeGuardedCallbackProd, "invokeGuardedCallbackProd");
        var invokeGuardedCallbackImpl = invokeGuardedCallbackProd;
        {
          if (typeof window !== "undefined" && typeof window.dispatchEvent === "function" && typeof document !== "undefined" && typeof document.createEvent === "function") {
            var fakeNode = document.createElement("react");
            invokeGuardedCallbackImpl = /* @__PURE__ */ __name(function invokeGuardedCallbackDev(name, func, context, a, b, c, d, e, f) {
              if (typeof document === "undefined" || document === null) {
                throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
              }
              var evt = document.createEvent("Event");
              var didCall = false;
              var didError = true;
              var windowEvent = window.event;
              var windowEventDescriptor = Object.getOwnPropertyDescriptor(window, "event");
              function restoreAfterDispatch() {
                fakeNode.removeEventListener(evtType, callCallback, false);
                if (typeof window.event !== "undefined" && window.hasOwnProperty("event")) {
                  window.event = windowEvent;
                }
              }
              __name(restoreAfterDispatch, "restoreAfterDispatch");
              var funcArgs = Array.prototype.slice.call(arguments, 3);
              function callCallback() {
                didCall = true;
                restoreAfterDispatch();
                func.apply(context, funcArgs);
                didError = false;
              }
              __name(callCallback, "callCallback");
              var error2;
              var didSetError = false;
              var isCrossOriginError = false;
              function handleWindowError(event) {
                error2 = event.error;
                didSetError = true;
                if (error2 === null && event.colno === 0 && event.lineno === 0) {
                  isCrossOriginError = true;
                }
                if (event.defaultPrevented) {
                  if (error2 != null && typeof error2 === "object") {
                    try {
                      error2._suppressLogging = true;
                    } catch (inner) {
                    }
                  }
                }
              }
              __name(handleWindowError, "handleWindowError");
              var evtType = "react-" + (name ? name : "invokeguardedcallback");
              window.addEventListener("error", handleWindowError);
              fakeNode.addEventListener(evtType, callCallback, false);
              evt.initEvent(evtType, false, false);
              fakeNode.dispatchEvent(evt);
              if (windowEventDescriptor) {
                Object.defineProperty(window, "event", windowEventDescriptor);
              }
              if (didCall && didError) {
                if (!didSetError) {
                  error2 = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`);
                } else if (isCrossOriginError) {
                  error2 = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.");
                }
                this.onError(error2);
              }
              window.removeEventListener("error", handleWindowError);
              if (!didCall) {
                restoreAfterDispatch();
                return invokeGuardedCallbackProd.apply(this, arguments);
              }
            }, "invokeGuardedCallbackDev");
          }
        }
        var invokeGuardedCallbackImpl$1 = invokeGuardedCallbackImpl;
        var hasError = false;
        var caughtError = null;
        var hasRethrowError = false;
        var rethrowError = null;
        var reporter = {
          onError: function(error2) {
            hasError = true;
            caughtError = error2;
          }
        };
        function invokeGuardedCallback(name, func, context, a, b, c, d, e, f) {
          hasError = false;
          caughtError = null;
          invokeGuardedCallbackImpl$1.apply(reporter, arguments);
        }
        __name(invokeGuardedCallback, "invokeGuardedCallback");
        function invokeGuardedCallbackAndCatchFirstError(name, func, context, a, b, c, d, e, f) {
          invokeGuardedCallback.apply(this, arguments);
          if (hasError) {
            var error2 = clearCaughtError();
            if (!hasRethrowError) {
              hasRethrowError = true;
              rethrowError = error2;
            }
          }
        }
        __name(invokeGuardedCallbackAndCatchFirstError, "invokeGuardedCallbackAndCatchFirstError");
        function rethrowCaughtError() {
          if (hasRethrowError) {
            var error2 = rethrowError;
            hasRethrowError = false;
            rethrowError = null;
            throw error2;
          }
        }
        __name(rethrowCaughtError, "rethrowCaughtError");
        function clearCaughtError() {
          if (hasError) {
            var error2 = caughtError;
            hasError = false;
            caughtError = null;
            return error2;
          } else {
            throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
          }
        }
        __name(clearCaughtError, "clearCaughtError");
        var isArrayImpl = Array.isArray;
        function isArray(a) {
          return isArrayImpl(a);
        }
        __name(isArray, "isArray");
        var SecretInternals = ReactDOM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        var EventInternals = SecretInternals.Events;
        var getInstanceFromNode = EventInternals[0];
        var getNodeFromInstance = EventInternals[1];
        var getFiberCurrentPropsFromNode = EventInternals[2];
        var enqueueStateRestore = EventInternals[3];
        var restoreStateIfNeeded = EventInternals[4];
        var act2 = React.unstable_act;
        function Event(suffix) {
        }
        __name(Event, "Event");
        var hasWarnedAboutDeprecatedMockComponent = false;
        function findAllInRenderedFiberTreeInternal(fiber, test) {
          if (!fiber) {
            return [];
          }
          var currentParent = findCurrentFiberUsingSlowPath(fiber);
          if (!currentParent) {
            return [];
          }
          var node = currentParent;
          var ret = [];
          while (true) {
            if (node.tag === HostComponent || node.tag === HostText || node.tag === ClassComponent || node.tag === FunctionComponent) {
              var publicInst = node.stateNode;
              if (test(publicInst)) {
                ret.push(publicInst);
              }
            }
            if (node.child) {
              node.child.return = node;
              node = node.child;
              continue;
            }
            if (node === currentParent) {
              return ret;
            }
            while (!node.sibling) {
              if (!node.return || node.return === currentParent) {
                return ret;
              }
              node = node.return;
            }
            node.sibling.return = node.return;
            node = node.sibling;
          }
        }
        __name(findAllInRenderedFiberTreeInternal, "findAllInRenderedFiberTreeInternal");
        function validateClassInstance(inst, methodName) {
          if (!inst) {
            return;
          }
          if (get(inst)) {
            return;
          }
          var received;
          var stringified = String(inst);
          if (isArray(inst)) {
            received = "an array";
          } else if (inst && inst.nodeType === ELEMENT_NODE && inst.tagName) {
            received = "a DOM node";
          } else if (stringified === "[object Object]") {
            received = "object with keys {" + Object.keys(inst).join(", ") + "}";
          } else {
            received = stringified;
          }
          throw new Error(methodName + "(...): the first argument must be a React class instance. " + ("Instead received: " + received + "."));
        }
        __name(validateClassInstance, "validateClassInstance");
        function renderIntoDocument2(element) {
          var div = document.createElement("div");
          return ReactDOM.render(element, div);
        }
        __name(renderIntoDocument2, "renderIntoDocument");
        function isElement2(element) {
          return React.isValidElement(element);
        }
        __name(isElement2, "isElement");
        function isElementOfType2(inst, convenienceConstructor) {
          return React.isValidElement(inst) && inst.type === convenienceConstructor;
        }
        __name(isElementOfType2, "isElementOfType");
        function isDOMComponent2(inst) {
          return !!(inst && inst.nodeType === ELEMENT_NODE && inst.tagName);
        }
        __name(isDOMComponent2, "isDOMComponent");
        function isDOMComponentElement2(inst) {
          return !!(inst && React.isValidElement(inst) && !!inst.tagName);
        }
        __name(isDOMComponentElement2, "isDOMComponentElement");
        function isCompositeComponent2(inst) {
          if (isDOMComponent2(inst)) {
            return false;
          }
          return inst != null && typeof inst.render === "function" && typeof inst.setState === "function";
        }
        __name(isCompositeComponent2, "isCompositeComponent");
        function isCompositeComponentWithType2(inst, type) {
          if (!isCompositeComponent2(inst)) {
            return false;
          }
          var internalInstance = get(inst);
          var constructor = internalInstance.type;
          return constructor === type;
        }
        __name(isCompositeComponentWithType2, "isCompositeComponentWithType");
        function findAllInRenderedTree2(inst, test) {
          validateClassInstance(inst, "findAllInRenderedTree");
          if (!inst) {
            return [];
          }
          var internalInstance = get(inst);
          return findAllInRenderedFiberTreeInternal(internalInstance, test);
        }
        __name(findAllInRenderedTree2, "findAllInRenderedTree");
        function scryRenderedDOMComponentsWithClass2(root, classNames) {
          validateClassInstance(root, "scryRenderedDOMComponentsWithClass");
          return findAllInRenderedTree2(root, function(inst) {
            if (isDOMComponent2(inst)) {
              var className = inst.className;
              if (typeof className !== "string") {
                className = inst.getAttribute("class") || "";
              }
              var classList = className.split(/\s+/);
              if (!isArray(classNames)) {
                if (classNames === void 0) {
                  throw new Error("TestUtils.scryRenderedDOMComponentsWithClass expects a className as a second argument.");
                }
                classNames = classNames.split(/\s+/);
              }
              return classNames.every(function(name) {
                return classList.indexOf(name) !== -1;
              });
            }
            return false;
          });
        }
        __name(scryRenderedDOMComponentsWithClass2, "scryRenderedDOMComponentsWithClass");
        function findRenderedDOMComponentWithClass2(root, className) {
          validateClassInstance(root, "findRenderedDOMComponentWithClass");
          var all = scryRenderedDOMComponentsWithClass2(root, className);
          if (all.length !== 1) {
            throw new Error("Did not find exactly one match (found: " + all.length + ") for class:" + className);
          }
          return all[0];
        }
        __name(findRenderedDOMComponentWithClass2, "findRenderedDOMComponentWithClass");
        function scryRenderedDOMComponentsWithTag2(root, tagName) {
          validateClassInstance(root, "scryRenderedDOMComponentsWithTag");
          return findAllInRenderedTree2(root, function(inst) {
            return isDOMComponent2(inst) && inst.tagName.toUpperCase() === tagName.toUpperCase();
          });
        }
        __name(scryRenderedDOMComponentsWithTag2, "scryRenderedDOMComponentsWithTag");
        function findRenderedDOMComponentWithTag2(root, tagName) {
          validateClassInstance(root, "findRenderedDOMComponentWithTag");
          var all = scryRenderedDOMComponentsWithTag2(root, tagName);
          if (all.length !== 1) {
            throw new Error("Did not find exactly one match (found: " + all.length + ") for tag:" + tagName);
          }
          return all[0];
        }
        __name(findRenderedDOMComponentWithTag2, "findRenderedDOMComponentWithTag");
        function scryRenderedComponentsWithType2(root, componentType) {
          validateClassInstance(root, "scryRenderedComponentsWithType");
          return findAllInRenderedTree2(root, function(inst) {
            return isCompositeComponentWithType2(inst, componentType);
          });
        }
        __name(scryRenderedComponentsWithType2, "scryRenderedComponentsWithType");
        function findRenderedComponentWithType2(root, componentType) {
          validateClassInstance(root, "findRenderedComponentWithType");
          var all = scryRenderedComponentsWithType2(root, componentType);
          if (all.length !== 1) {
            throw new Error("Did not find exactly one match (found: " + all.length + ") for componentType:" + componentType);
          }
          return all[0];
        }
        __name(findRenderedComponentWithType2, "findRenderedComponentWithType");
        function mockComponent2(module2, mockTagName) {
          {
            if (!hasWarnedAboutDeprecatedMockComponent) {
              hasWarnedAboutDeprecatedMockComponent = true;
              warn("ReactTestUtils.mockComponent() is deprecated. Use shallow rendering or jest.mock() instead.\n\nSee https://reactjs.org/link/test-utils-mock-component for more information.");
            }
          }
          mockTagName = mockTagName || module2.mockTagName || "div";
          module2.prototype.render.mockImplementation(function() {
            return React.createElement(mockTagName, null, this.props.children);
          });
          return this;
        }
        __name(mockComponent2, "mockComponent");
        function nativeTouchData2(x, y) {
          return {
            touches: [{
              pageX: x,
              pageY: y
            }]
          };
        }
        __name(nativeTouchData2, "nativeTouchData");
        function executeDispatch(event, listener, inst) {
          var type = event.type || "unknown-event";
          event.currentTarget = getNodeFromInstance(inst);
          invokeGuardedCallbackAndCatchFirstError(type, listener, void 0, event);
          event.currentTarget = null;
        }
        __name(executeDispatch, "executeDispatch");
        function executeDispatchesInOrder(event) {
          var dispatchListeners = event._dispatchListeners;
          var dispatchInstances = event._dispatchInstances;
          if (isArray(dispatchListeners)) {
            for (var i = 0; i < dispatchListeners.length; i++) {
              if (event.isPropagationStopped()) {
                break;
              }
              executeDispatch(event, dispatchListeners[i], dispatchInstances[i]);
            }
          } else if (dispatchListeners) {
            executeDispatch(event, dispatchListeners, dispatchInstances);
          }
          event._dispatchListeners = null;
          event._dispatchInstances = null;
        }
        __name(executeDispatchesInOrder, "executeDispatchesInOrder");
        var executeDispatchesAndRelease = /* @__PURE__ */ __name(function(event) {
          if (event) {
            executeDispatchesInOrder(event);
            if (!event.isPersistent()) {
              event.constructor.release(event);
            }
          }
        }, "executeDispatchesAndRelease");
        function isInteractive(tag) {
          return tag === "button" || tag === "input" || tag === "select" || tag === "textarea";
        }
        __name(isInteractive, "isInteractive");
        function getParent(inst) {
          do {
            inst = inst.return;
          } while (inst && inst.tag !== HostComponent);
          if (inst) {
            return inst;
          }
          return null;
        }
        __name(getParent, "getParent");
        function traverseTwoPhase2(inst, fn, arg) {
          var path = [];
          while (inst) {
            path.push(inst);
            inst = getParent(inst);
          }
          var i;
          for (i = path.length; i-- > 0; ) {
            fn(path[i], "captured", arg);
          }
          for (i = 0; i < path.length; i++) {
            fn(path[i], "bubbled", arg);
          }
        }
        __name(traverseTwoPhase2, "traverseTwoPhase");
        function shouldPreventMouseEvent(name, type, props) {
          switch (name) {
            case "onClick":
            case "onClickCapture":
            case "onDoubleClick":
            case "onDoubleClickCapture":
            case "onMouseDown":
            case "onMouseDownCapture":
            case "onMouseMove":
            case "onMouseMoveCapture":
            case "onMouseUp":
            case "onMouseUpCapture":
            case "onMouseEnter":
              return !!(props.disabled && isInteractive(type));
            default:
              return false;
          }
        }
        __name(shouldPreventMouseEvent, "shouldPreventMouseEvent");
        function getListener(inst, registrationName) {
          var stateNode = inst.stateNode;
          if (!stateNode) {
            return null;
          }
          var props = getFiberCurrentPropsFromNode(stateNode);
          if (!props) {
            return null;
          }
          var listener = props[registrationName];
          if (shouldPreventMouseEvent(registrationName, inst.type, props)) {
            return null;
          }
          if (listener && typeof listener !== "function") {
            throw new Error("Expected `" + registrationName + "` listener to be a function, instead got a value of `" + typeof listener + "` type.");
          }
          return listener;
        }
        __name(getListener, "getListener");
        function listenerAtPhase(inst, event, propagationPhase) {
          var registrationName = event._reactName;
          if (propagationPhase === "captured") {
            registrationName += "Capture";
          }
          return getListener(inst, registrationName);
        }
        __name(listenerAtPhase, "listenerAtPhase");
        function accumulateDispatches(inst, ignoredDirection, event) {
          if (inst && event && event._reactName) {
            var registrationName = event._reactName;
            var listener = getListener(inst, registrationName);
            if (listener) {
              if (event._dispatchListeners == null) {
                event._dispatchListeners = [];
              }
              if (event._dispatchInstances == null) {
                event._dispatchInstances = [];
              }
              event._dispatchListeners.push(listener);
              event._dispatchInstances.push(inst);
            }
          }
        }
        __name(accumulateDispatches, "accumulateDispatches");
        function accumulateDirectionalDispatches(inst, phase, event) {
          {
            if (!inst) {
              error("Dispatching inst must not be null");
            }
          }
          var listener = listenerAtPhase(inst, event, phase);
          if (listener) {
            if (event._dispatchListeners == null) {
              event._dispatchListeners = [];
            }
            if (event._dispatchInstances == null) {
              event._dispatchInstances = [];
            }
            event._dispatchListeners.push(listener);
            event._dispatchInstances.push(inst);
          }
        }
        __name(accumulateDirectionalDispatches, "accumulateDirectionalDispatches");
        function accumulateDirectDispatchesSingle(event) {
          if (event && event._reactName) {
            accumulateDispatches(event._targetInst, null, event);
          }
        }
        __name(accumulateDirectDispatchesSingle, "accumulateDirectDispatchesSingle");
        function accumulateTwoPhaseDispatchesSingle(event) {
          if (event && event._reactName) {
            traverseTwoPhase2(event._targetInst, accumulateDirectionalDispatches, event);
          }
        }
        __name(accumulateTwoPhaseDispatchesSingle, "accumulateTwoPhaseDispatchesSingle");
        var Simulate2 = {};
        var directDispatchEventTypes = /* @__PURE__ */ new Set(["mouseEnter", "mouseLeave", "pointerEnter", "pointerLeave"]);
        function makeSimulator(eventType) {
          return function(domNode, eventData) {
            if (React.isValidElement(domNode)) {
              throw new Error("TestUtils.Simulate expected a DOM node as the first argument but received a React element. Pass the DOM node you wish to simulate the event on instead. Note that TestUtils.Simulate will not work if you are using shallow rendering.");
            }
            if (isCompositeComponent2(domNode)) {
              throw new Error("TestUtils.Simulate expected a DOM node as the first argument but received a component instance. Pass the DOM node you wish to simulate the event on instead.");
            }
            var reactName = "on" + eventType[0].toUpperCase() + eventType.slice(1);
            var fakeNativeEvent = new Event();
            fakeNativeEvent.target = domNode;
            fakeNativeEvent.type = eventType.toLowerCase();
            var targetInst = getInstanceFromNode(domNode);
            var event = new SyntheticEvent(reactName, fakeNativeEvent.type, targetInst, fakeNativeEvent, domNode);
            event.persist();
            assign(event, eventData);
            if (directDispatchEventTypes.has(eventType)) {
              accumulateDirectDispatchesSingle(event);
            } else {
              accumulateTwoPhaseDispatchesSingle(event);
            }
            ReactDOM.unstable_batchedUpdates(function() {
              enqueueStateRestore(domNode);
              executeDispatchesAndRelease(event);
              rethrowCaughtError();
            });
            restoreStateIfNeeded();
          };
        }
        __name(makeSimulator, "makeSimulator");
        var simulatedEventTypes = ["blur", "cancel", "click", "close", "contextMenu", "copy", "cut", "auxClick", "doubleClick", "dragEnd", "dragStart", "drop", "focus", "input", "invalid", "keyDown", "keyPress", "keyUp", "mouseDown", "mouseUp", "paste", "pause", "play", "pointerCancel", "pointerDown", "pointerUp", "rateChange", "reset", "resize", "seeked", "submit", "touchCancel", "touchEnd", "touchStart", "volumeChange", "drag", "dragEnter", "dragExit", "dragLeave", "dragOver", "mouseMove", "mouseOut", "mouseOver", "pointerMove", "pointerOut", "pointerOver", "scroll", "toggle", "touchMove", "wheel", "abort", "animationEnd", "animationIteration", "animationStart", "canPlay", "canPlayThrough", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "playing", "progress", "seeking", "stalled", "suspend", "timeUpdate", "transitionEnd", "waiting", "mouseEnter", "mouseLeave", "pointerEnter", "pointerLeave", "change", "select", "beforeInput", "compositionEnd", "compositionStart", "compositionUpdate"];
        function buildSimulators() {
          simulatedEventTypes.forEach(function(eventType) {
            Simulate2[eventType] = makeSimulator(eventType);
          });
        }
        __name(buildSimulators, "buildSimulators");
        buildSimulators();
        exports.Simulate = Simulate2;
        exports.act = act2;
        exports.findAllInRenderedTree = findAllInRenderedTree2;
        exports.findRenderedComponentWithType = findRenderedComponentWithType2;
        exports.findRenderedDOMComponentWithClass = findRenderedDOMComponentWithClass2;
        exports.findRenderedDOMComponentWithTag = findRenderedDOMComponentWithTag2;
        exports.isCompositeComponent = isCompositeComponent2;
        exports.isCompositeComponentWithType = isCompositeComponentWithType2;
        exports.isDOMComponent = isDOMComponent2;
        exports.isDOMComponentElement = isDOMComponentElement2;
        exports.isElement = isElement2;
        exports.isElementOfType = isElementOfType2;
        exports.mockComponent = mockComponent2;
        exports.nativeTouchData = nativeTouchData2;
        exports.renderIntoDocument = renderIntoDocument2;
        exports.scryRenderedComponentsWithType = scryRenderedComponentsWithType2;
        exports.scryRenderedDOMComponentsWithClass = scryRenderedDOMComponentsWithClass2;
        exports.scryRenderedDOMComponentsWithTag = scryRenderedDOMComponentsWithTag2;
        exports.traverseTwoPhase = traverseTwoPhase2;
      })();
    }
  }
});

// ../../../tmp/node_modules/react-dom/test-utils.js
var require_test_utils = __commonJS({
  "../../../tmp/node_modules/react-dom/test-utils.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_dom_test_utils_development();
    }
  }
});

// c2e:/tmp/node_modules/react-dom/test-utils.js
var import_test_utils = __toESM(require_test_utils());
var export_Simulate = import_test_utils.Simulate;
var export_act = import_test_utils.act;
var export_default = import_test_utils.default;
var export_findAllInRenderedTree = import_test_utils.findAllInRenderedTree;
var export_findRenderedComponentWithType = import_test_utils.findRenderedComponentWithType;
var export_findRenderedDOMComponentWithClass = import_test_utils.findRenderedDOMComponentWithClass;
var export_findRenderedDOMComponentWithTag = import_test_utils.findRenderedDOMComponentWithTag;
var export_isCompositeComponent = import_test_utils.isCompositeComponent;
var export_isCompositeComponentWithType = import_test_utils.isCompositeComponentWithType;
var export_isDOMComponent = import_test_utils.isDOMComponent;
var export_isDOMComponentElement = import_test_utils.isDOMComponentElement;
var export_isElement = import_test_utils.isElement;
var export_isElementOfType = import_test_utils.isElementOfType;
var export_mockComponent = import_test_utils.mockComponent;
var export_nativeTouchData = import_test_utils.nativeTouchData;
var export_renderIntoDocument = import_test_utils.renderIntoDocument;
var export_scryRenderedComponentsWithType = import_test_utils.scryRenderedComponentsWithType;
var export_scryRenderedDOMComponentsWithClass = import_test_utils.scryRenderedDOMComponentsWithClass;
var export_scryRenderedDOMComponentsWithTag = import_test_utils.scryRenderedDOMComponentsWithTag;
var export_traverseTwoPhase = import_test_utils.traverseTwoPhase;
export {
  export_Simulate as Simulate,
  export_act as act,
  export_default as default,
  export_findAllInRenderedTree as findAllInRenderedTree,
  export_findRenderedComponentWithType as findRenderedComponentWithType,
  export_findRenderedDOMComponentWithClass as findRenderedDOMComponentWithClass,
  export_findRenderedDOMComponentWithTag as findRenderedDOMComponentWithTag,
  export_isCompositeComponent as isCompositeComponent,
  export_isCompositeComponentWithType as isCompositeComponentWithType,
  export_isDOMComponent as isDOMComponent,
  export_isDOMComponentElement as isDOMComponentElement,
  export_isElement as isElement,
  export_isElementOfType as isElementOfType,
  export_mockComponent as mockComponent,
  export_nativeTouchData as nativeTouchData,
  export_renderIntoDocument as renderIntoDocument,
  export_scryRenderedComponentsWithType as scryRenderedComponentsWithType,
  export_scryRenderedDOMComponentsWithClass as scryRenderedDOMComponentsWithClass,
  export_scryRenderedDOMComponentsWithTag as scryRenderedDOMComponentsWithTag,
  export_traverseTwoPhase as traverseTwoPhase
};
/*! Bundled license information:

react-dom/cjs/react-dom-test-utils.development.js:
  (**
   * @license React
   * react-dom-test-utils.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/

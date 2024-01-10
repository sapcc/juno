var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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

// ../../../tmp/node_modules/prop-types/prop-types.js
var require_prop_types = __commonJS({
  "../../../tmp/node_modules/prop-types/prop-types.js"(exports, module) {
    (function(f) {
      if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f();
      } else if (typeof define === "function" && define.amd) {
        define([], f);
      } else {
        var g;
        if (typeof window !== "undefined") {
          g = window;
        } else if (typeof global !== "undefined") {
          g = global;
        } else if (typeof self !== "undefined") {
          g = self;
        } else {
          g = this;
        }
        g.PropTypes = f();
      }
    })(function() {
      var define2, module2, exports2;
      return function() {
        function r(e, n, t) {
          function o(i2, f) {
            if (!n[i2]) {
              if (!e[i2]) {
                var c = "function" == typeof __require && __require;
                if (!f && c)
                  return c(i2, true);
                if (u)
                  return u(i2, true);
                var a = new Error("Cannot find module '" + i2 + "'");
                throw a.code = "MODULE_NOT_FOUND", a;
              }
              var p = n[i2] = { exports: {} };
              e[i2][0].call(p.exports, function(r2) {
                var n2 = e[i2][1][r2];
                return o(n2 || r2);
              }, p, p.exports, r, e, n, t);
            }
            return n[i2].exports;
          }
          __name(o, "o");
          for (var u = "function" == typeof __require && __require, i = 0; i < t.length; i++)
            o(t[i]);
          return o;
        }
        __name(r, "r");
        return r;
      }()({ 1: [function(require2, module3, exports3) {
        "use strict";
        var printWarning = /* @__PURE__ */ __name(function() {
        }, "printWarning");
        if (true) {
          var ReactPropTypesSecret = require2("./lib/ReactPropTypesSecret");
          var loggedTypeFailures = {};
          var has = require2("./lib/has");
          printWarning = /* @__PURE__ */ __name(function(text) {
            var message = "Warning: " + text;
            if (typeof console !== "undefined") {
              console.error(message);
            }
            try {
              throw new Error(message);
            } catch (x) {
            }
          }, "printWarning");
        }
        function checkPropTypes2(typeSpecs, values, location, componentName, getStack) {
          if (true) {
            for (var typeSpecName in typeSpecs) {
              if (has(typeSpecs, typeSpecName)) {
                var error;
                try {
                  if (typeof typeSpecs[typeSpecName] !== "function") {
                    var err = Error(
                      (componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
                    );
                    err.name = "Invariant Violation";
                    throw err;
                  }
                  error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
                } catch (ex) {
                  error = ex;
                }
                if (error && !(error instanceof Error)) {
                  printWarning(
                    (componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
                  );
                }
                if (error instanceof Error && !(error.message in loggedTypeFailures)) {
                  loggedTypeFailures[error.message] = true;
                  var stack = getStack ? getStack() : "";
                  printWarning(
                    "Failed " + location + " type: " + error.message + (stack != null ? stack : "")
                  );
                }
              }
            }
          }
        }
        __name(checkPropTypes2, "checkPropTypes");
        checkPropTypes2.resetWarningCache = function() {
          if (true) {
            loggedTypeFailures = {};
          }
        };
        module3.exports = checkPropTypes2;
      }, { "./lib/ReactPropTypesSecret": 5, "./lib/has": 6 }], 2: [function(require2, module3, exports3) {
        "use strict";
        var ReactPropTypesSecret = require2("./lib/ReactPropTypesSecret");
        function emptyFunction() {
        }
        __name(emptyFunction, "emptyFunction");
        function emptyFunctionWithReset() {
        }
        __name(emptyFunctionWithReset, "emptyFunctionWithReset");
        emptyFunctionWithReset.resetWarningCache = emptyFunction;
        module3.exports = function() {
          function shim(props, propName, componentName, location, propFullName, secret) {
            if (secret === ReactPropTypesSecret) {
              return;
            }
            var err = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
            );
            err.name = "Invariant Violation";
            throw err;
          }
          __name(shim, "shim");
          ;
          shim.isRequired = shim;
          function getShim() {
            return shim;
          }
          __name(getShim, "getShim");
          ;
          var ReactPropTypes = {
            array: shim,
            bigint: shim,
            bool: shim,
            func: shim,
            number: shim,
            object: shim,
            string: shim,
            symbol: shim,
            any: shim,
            arrayOf: getShim,
            element: shim,
            elementType: shim,
            instanceOf: getShim,
            node: shim,
            objectOf: getShim,
            oneOf: getShim,
            oneOfType: getShim,
            shape: getShim,
            exact: getShim,
            checkPropTypes: emptyFunctionWithReset,
            resetWarningCache: emptyFunction
          };
          ReactPropTypes.PropTypes = ReactPropTypes;
          return ReactPropTypes;
        };
      }, { "./lib/ReactPropTypesSecret": 5 }], 3: [function(require2, module3, exports3) {
        "use strict";
        var ReactIs = require2("react-is");
        var assign = require2("object-assign");
        var ReactPropTypesSecret = require2("./lib/ReactPropTypesSecret");
        var has = require2("./lib/has");
        var checkPropTypes2 = require2("./checkPropTypes");
        var printWarning = /* @__PURE__ */ __name(function() {
        }, "printWarning");
        if (true) {
          printWarning = /* @__PURE__ */ __name(function(text) {
            var message = "Warning: " + text;
            if (typeof console !== "undefined") {
              console.error(message);
            }
            try {
              throw new Error(message);
            } catch (x) {
            }
          }, "printWarning");
        }
        function emptyFunctionThatReturnsNull() {
          return null;
        }
        __name(emptyFunctionThatReturnsNull, "emptyFunctionThatReturnsNull");
        module3.exports = function(isValidElement, throwOnDirectAccess) {
          var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
          var FAUX_ITERATOR_SYMBOL = "@@iterator";
          function getIteratorFn(maybeIterable) {
            var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
            if (typeof iteratorFn === "function") {
              return iteratorFn;
            }
          }
          __name(getIteratorFn, "getIteratorFn");
          var ANONYMOUS = "<<anonymous>>";
          var ReactPropTypes = {
            array: createPrimitiveTypeChecker("array"),
            bigint: createPrimitiveTypeChecker("bigint"),
            bool: createPrimitiveTypeChecker("boolean"),
            func: createPrimitiveTypeChecker("function"),
            number: createPrimitiveTypeChecker("number"),
            object: createPrimitiveTypeChecker("object"),
            string: createPrimitiveTypeChecker("string"),
            symbol: createPrimitiveTypeChecker("symbol"),
            any: createAnyTypeChecker(),
            arrayOf: createArrayOfTypeChecker,
            element: createElementTypeChecker(),
            elementType: createElementTypeTypeChecker(),
            instanceOf: createInstanceTypeChecker,
            node: createNodeChecker(),
            objectOf: createObjectOfTypeChecker,
            oneOf: createEnumTypeChecker,
            oneOfType: createUnionTypeChecker,
            shape: createShapeTypeChecker,
            exact: createStrictShapeTypeChecker
          };
          function is(x, y) {
            if (x === y) {
              return x !== 0 || 1 / x === 1 / y;
            } else {
              return x !== x && y !== y;
            }
          }
          __name(is, "is");
          function PropTypeError(message, data) {
            this.message = message;
            this.data = data && typeof data === "object" ? data : {};
            this.stack = "";
          }
          __name(PropTypeError, "PropTypeError");
          PropTypeError.prototype = Error.prototype;
          function createChainableTypeChecker(validate) {
            if (true) {
              var manualPropTypeCallCache = {};
              var manualPropTypeWarningCount = 0;
            }
            function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
              componentName = componentName || ANONYMOUS;
              propFullName = propFullName || propName;
              if (secret !== ReactPropTypesSecret) {
                if (throwOnDirectAccess) {
                  var err = new Error(
                    "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
                  );
                  err.name = "Invariant Violation";
                  throw err;
                } else if (typeof console !== "undefined") {
                  var cacheKey = componentName + ":" + propName;
                  if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
                  manualPropTypeWarningCount < 3) {
                    printWarning(
                      "You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
                    );
                    manualPropTypeCallCache[cacheKey] = true;
                    manualPropTypeWarningCount++;
                  }
                }
              }
              if (props[propName] == null) {
                if (isRequired) {
                  if (props[propName] === null) {
                    return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
                  }
                  return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
                }
                return null;
              } else {
                return validate(props, propName, componentName, location, propFullName);
              }
            }
            __name(checkType, "checkType");
            var chainedCheckType = checkType.bind(null, false);
            chainedCheckType.isRequired = checkType.bind(null, true);
            return chainedCheckType;
          }
          __name(createChainableTypeChecker, "createChainableTypeChecker");
          function createPrimitiveTypeChecker(expectedType) {
            function validate(props, propName, componentName, location, propFullName, secret) {
              var propValue = props[propName];
              var propType = getPropType(propValue);
              if (propType !== expectedType) {
                var preciseType = getPreciseType(propValue);
                return new PropTypeError(
                  "Invalid " + location + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."),
                  { expectedType }
                );
              }
              return null;
            }
            __name(validate, "validate");
            return createChainableTypeChecker(validate);
          }
          __name(createPrimitiveTypeChecker, "createPrimitiveTypeChecker");
          function createAnyTypeChecker() {
            return createChainableTypeChecker(emptyFunctionThatReturnsNull);
          }
          __name(createAnyTypeChecker, "createAnyTypeChecker");
          function createArrayOfTypeChecker(typeChecker) {
            function validate(props, propName, componentName, location, propFullName) {
              if (typeof typeChecker !== "function") {
                return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
              }
              var propValue = props[propName];
              if (!Array.isArray(propValue)) {
                var propType = getPropType(propValue);
                return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
              }
              for (var i = 0; i < propValue.length; i++) {
                var error = typeChecker(propValue, i, componentName, location, propFullName + "[" + i + "]", ReactPropTypesSecret);
                if (error instanceof Error) {
                  return error;
                }
              }
              return null;
            }
            __name(validate, "validate");
            return createChainableTypeChecker(validate);
          }
          __name(createArrayOfTypeChecker, "createArrayOfTypeChecker");
          function createElementTypeChecker() {
            function validate(props, propName, componentName, location, propFullName) {
              var propValue = props[propName];
              if (!isValidElement(propValue)) {
                var propType = getPropType(propValue);
                return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
              }
              return null;
            }
            __name(validate, "validate");
            return createChainableTypeChecker(validate);
          }
          __name(createElementTypeChecker, "createElementTypeChecker");
          function createElementTypeTypeChecker() {
            function validate(props, propName, componentName, location, propFullName) {
              var propValue = props[propName];
              if (!ReactIs.isValidElementType(propValue)) {
                var propType = getPropType(propValue);
                return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type."));
              }
              return null;
            }
            __name(validate, "validate");
            return createChainableTypeChecker(validate);
          }
          __name(createElementTypeTypeChecker, "createElementTypeTypeChecker");
          function createInstanceTypeChecker(expectedClass) {
            function validate(props, propName, componentName, location, propFullName) {
              if (!(props[propName] instanceof expectedClass)) {
                var expectedClassName = expectedClass.name || ANONYMOUS;
                var actualClassName = getClassName(props[propName]);
                return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
              }
              return null;
            }
            __name(validate, "validate");
            return createChainableTypeChecker(validate);
          }
          __name(createInstanceTypeChecker, "createInstanceTypeChecker");
          function createEnumTypeChecker(expectedValues) {
            if (!Array.isArray(expectedValues)) {
              if (true) {
                if (arguments.length > 1) {
                  printWarning(
                    "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
                  );
                } else {
                  printWarning("Invalid argument supplied to oneOf, expected an array.");
                }
              }
              return emptyFunctionThatReturnsNull;
            }
            function validate(props, propName, componentName, location, propFullName) {
              var propValue = props[propName];
              for (var i = 0; i < expectedValues.length; i++) {
                if (is(propValue, expectedValues[i])) {
                  return null;
                }
              }
              var valuesString = JSON.stringify(expectedValues, /* @__PURE__ */ __name(function replacer(key, value) {
                var type = getPreciseType(value);
                if (type === "symbol") {
                  return String(value);
                }
                return value;
              }, "replacer"));
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + String(propValue) + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
            }
            __name(validate, "validate");
            return createChainableTypeChecker(validate);
          }
          __name(createEnumTypeChecker, "createEnumTypeChecker");
          function createObjectOfTypeChecker(typeChecker) {
            function validate(props, propName, componentName, location, propFullName) {
              if (typeof typeChecker !== "function") {
                return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
              }
              var propValue = props[propName];
              var propType = getPropType(propValue);
              if (propType !== "object") {
                return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
              }
              for (var key in propValue) {
                if (has(propValue, key)) {
                  var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
                  if (error instanceof Error) {
                    return error;
                  }
                }
              }
              return null;
            }
            __name(validate, "validate");
            return createChainableTypeChecker(validate);
          }
          __name(createObjectOfTypeChecker, "createObjectOfTypeChecker");
          function createUnionTypeChecker(arrayOfTypeCheckers) {
            if (!Array.isArray(arrayOfTypeCheckers)) {
              true ? printWarning("Invalid argument supplied to oneOfType, expected an instance of array.") : void 0;
              return emptyFunctionThatReturnsNull;
            }
            for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
              var checker = arrayOfTypeCheckers[i];
              if (typeof checker !== "function") {
                printWarning(
                  "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i + "."
                );
                return emptyFunctionThatReturnsNull;
              }
            }
            function validate(props, propName, componentName, location, propFullName) {
              var expectedTypes = [];
              for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
                var checker2 = arrayOfTypeCheckers[i2];
                var checkerResult = checker2(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
                if (checkerResult == null) {
                  return null;
                }
                if (checkerResult.data.hasOwnProperty("expectedType")) {
                  expectedTypes.push(checkerResult.data.expectedType);
                }
              }
              var expectedTypesMessage = expectedTypes.length > 0 ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "";
              return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`" + expectedTypesMessage + "."));
            }
            __name(validate, "validate");
            return createChainableTypeChecker(validate);
          }
          __name(createUnionTypeChecker, "createUnionTypeChecker");
          function createNodeChecker() {
            function validate(props, propName, componentName, location, propFullName) {
              if (!isNode(props[propName])) {
                return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
              }
              return null;
            }
            __name(validate, "validate");
            return createChainableTypeChecker(validate);
          }
          __name(createNodeChecker, "createNodeChecker");
          function invalidValidatorError(componentName, location, propFullName, key, type) {
            return new PropTypeError(
              (componentName || "React class") + ": " + location + " type `" + propFullName + "." + key + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + type + "`."
            );
          }
          __name(invalidValidatorError, "invalidValidatorError");
          function createShapeTypeChecker(shapeTypes) {
            function validate(props, propName, componentName, location, propFullName) {
              var propValue = props[propName];
              var propType = getPropType(propValue);
              if (propType !== "object") {
                return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
              }
              for (var key in shapeTypes) {
                var checker = shapeTypes[key];
                if (typeof checker !== "function") {
                  return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
                }
                var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
                if (error) {
                  return error;
                }
              }
              return null;
            }
            __name(validate, "validate");
            return createChainableTypeChecker(validate);
          }
          __name(createShapeTypeChecker, "createShapeTypeChecker");
          function createStrictShapeTypeChecker(shapeTypes) {
            function validate(props, propName, componentName, location, propFullName) {
              var propValue = props[propName];
              var propType = getPropType(propValue);
              if (propType !== "object") {
                return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
              }
              var allKeys = assign({}, props[propName], shapeTypes);
              for (var key in allKeys) {
                var checker = shapeTypes[key];
                if (has(shapeTypes, key) && typeof checker !== "function") {
                  return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
                }
                if (!checker) {
                  return new PropTypeError(
                    "Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  ")
                  );
                }
                var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
                if (error) {
                  return error;
                }
              }
              return null;
            }
            __name(validate, "validate");
            return createChainableTypeChecker(validate);
          }
          __name(createStrictShapeTypeChecker, "createStrictShapeTypeChecker");
          function isNode(propValue) {
            switch (typeof propValue) {
              case "number":
              case "string":
              case "undefined":
                return true;
              case "boolean":
                return !propValue;
              case "object":
                if (Array.isArray(propValue)) {
                  return propValue.every(isNode);
                }
                if (propValue === null || isValidElement(propValue)) {
                  return true;
                }
                var iteratorFn = getIteratorFn(propValue);
                if (iteratorFn) {
                  var iterator = iteratorFn.call(propValue);
                  var step;
                  if (iteratorFn !== propValue.entries) {
                    while (!(step = iterator.next()).done) {
                      if (!isNode(step.value)) {
                        return false;
                      }
                    }
                  } else {
                    while (!(step = iterator.next()).done) {
                      var entry = step.value;
                      if (entry) {
                        if (!isNode(entry[1])) {
                          return false;
                        }
                      }
                    }
                  }
                } else {
                  return false;
                }
                return true;
              default:
                return false;
            }
          }
          __name(isNode, "isNode");
          function isSymbol(propType, propValue) {
            if (propType === "symbol") {
              return true;
            }
            if (!propValue) {
              return false;
            }
            if (propValue["@@toStringTag"] === "Symbol") {
              return true;
            }
            if (typeof Symbol === "function" && propValue instanceof Symbol) {
              return true;
            }
            return false;
          }
          __name(isSymbol, "isSymbol");
          function getPropType(propValue) {
            var propType = typeof propValue;
            if (Array.isArray(propValue)) {
              return "array";
            }
            if (propValue instanceof RegExp) {
              return "object";
            }
            if (isSymbol(propType, propValue)) {
              return "symbol";
            }
            return propType;
          }
          __name(getPropType, "getPropType");
          function getPreciseType(propValue) {
            if (typeof propValue === "undefined" || propValue === null) {
              return "" + propValue;
            }
            var propType = getPropType(propValue);
            if (propType === "object") {
              if (propValue instanceof Date) {
                return "date";
              } else if (propValue instanceof RegExp) {
                return "regexp";
              }
            }
            return propType;
          }
          __name(getPreciseType, "getPreciseType");
          function getPostfixForTypeWarning(value) {
            var type = getPreciseType(value);
            switch (type) {
              case "array":
              case "object":
                return "an " + type;
              case "boolean":
              case "date":
              case "regexp":
                return "a " + type;
              default:
                return type;
            }
          }
          __name(getPostfixForTypeWarning, "getPostfixForTypeWarning");
          function getClassName(propValue) {
            if (!propValue.constructor || !propValue.constructor.name) {
              return ANONYMOUS;
            }
            return propValue.constructor.name;
          }
          __name(getClassName, "getClassName");
          ReactPropTypes.checkPropTypes = checkPropTypes2;
          ReactPropTypes.resetWarningCache = checkPropTypes2.resetWarningCache;
          ReactPropTypes.PropTypes = ReactPropTypes;
          return ReactPropTypes;
        };
      }, { "./checkPropTypes": 1, "./lib/ReactPropTypesSecret": 5, "./lib/has": 6, "object-assign": 7, "react-is": 11 }], 4: [function(require2, module3, exports3) {
        if (true) {
          var ReactIs = require2("react-is");
          var throwOnDirectAccess = true;
          module3.exports = require2("./factoryWithTypeCheckers")(ReactIs.isElement, throwOnDirectAccess);
        } else {
          module3.exports = require2("./factoryWithThrowingShims")();
        }
      }, { "./factoryWithThrowingShims": 2, "./factoryWithTypeCheckers": 3, "react-is": 11 }], 5: [function(require2, module3, exports3) {
        "use strict";
        var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
        module3.exports = ReactPropTypesSecret;
      }, {}], 6: [function(require2, module3, exports3) {
        module3.exports = Function.call.bind(Object.prototype.hasOwnProperty);
      }, {}], 7: [function(require2, module3, exports3) {
        "use strict";
        var getOwnPropertySymbols = Object.getOwnPropertySymbols;
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var propIsEnumerable = Object.prototype.propertyIsEnumerable;
        function toObject(val) {
          if (val === null || val === void 0) {
            throw new TypeError("Object.assign cannot be called with null or undefined");
          }
          return Object(val);
        }
        __name(toObject, "toObject");
        function shouldUseNative() {
          try {
            if (!Object.assign) {
              return false;
            }
            var test1 = new String("abc");
            test1[5] = "de";
            if (Object.getOwnPropertyNames(test1)[0] === "5") {
              return false;
            }
            var test2 = {};
            for (var i = 0; i < 10; i++) {
              test2["_" + String.fromCharCode(i)] = i;
            }
            var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
              return test2[n];
            });
            if (order2.join("") !== "0123456789") {
              return false;
            }
            var test3 = {};
            "abcdefghijklmnopqrst".split("").forEach(function(letter) {
              test3[letter] = letter;
            });
            if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
              return false;
            }
            return true;
          } catch (err) {
            return false;
          }
        }
        __name(shouldUseNative, "shouldUseNative");
        module3.exports = shouldUseNative() ? Object.assign : function(target, source) {
          var from;
          var to = toObject(target);
          var symbols;
          for (var s = 1; s < arguments.length; s++) {
            from = Object(arguments[s]);
            for (var key in from) {
              if (hasOwnProperty.call(from, key)) {
                to[key] = from[key];
              }
            }
            if (getOwnPropertySymbols) {
              symbols = getOwnPropertySymbols(from);
              for (var i = 0; i < symbols.length; i++) {
                if (propIsEnumerable.call(from, symbols[i])) {
                  to[symbols[i]] = from[symbols[i]];
                }
              }
            }
          }
          return to;
        };
      }, {}], 8: [function(require2, module3, exports3) {
        var process = module3.exports = {};
        var cachedSetTimeout;
        var cachedClearTimeout;
        function defaultSetTimout() {
          throw new Error("setTimeout has not been defined");
        }
        __name(defaultSetTimout, "defaultSetTimout");
        function defaultClearTimeout() {
          throw new Error("clearTimeout has not been defined");
        }
        __name(defaultClearTimeout, "defaultClearTimeout");
        (function() {
          try {
            if (typeof setTimeout === "function") {
              cachedSetTimeout = setTimeout;
            } else {
              cachedSetTimeout = defaultSetTimout;
            }
          } catch (e) {
            cachedSetTimeout = defaultSetTimout;
          }
          try {
            if (typeof clearTimeout === "function") {
              cachedClearTimeout = clearTimeout;
            } else {
              cachedClearTimeout = defaultClearTimeout;
            }
          } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
          }
        })();
        function runTimeout(fun) {
          if (cachedSetTimeout === setTimeout) {
            return setTimeout(fun, 0);
          }
          if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
          }
          try {
            return cachedSetTimeout(fun, 0);
          } catch (e) {
            try {
              return cachedSetTimeout.call(null, fun, 0);
            } catch (e2) {
              return cachedSetTimeout.call(this, fun, 0);
            }
          }
        }
        __name(runTimeout, "runTimeout");
        function runClearTimeout(marker) {
          if (cachedClearTimeout === clearTimeout) {
            return clearTimeout(marker);
          }
          if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
          }
          try {
            return cachedClearTimeout(marker);
          } catch (e) {
            try {
              return cachedClearTimeout.call(null, marker);
            } catch (e2) {
              return cachedClearTimeout.call(this, marker);
            }
          }
        }
        __name(runClearTimeout, "runClearTimeout");
        var queue = [];
        var draining = false;
        var currentQueue;
        var queueIndex = -1;
        function cleanUpNextTick() {
          if (!draining || !currentQueue) {
            return;
          }
          draining = false;
          if (currentQueue.length) {
            queue = currentQueue.concat(queue);
          } else {
            queueIndex = -1;
          }
          if (queue.length) {
            drainQueue();
          }
        }
        __name(cleanUpNextTick, "cleanUpNextTick");
        function drainQueue() {
          if (draining) {
            return;
          }
          var timeout = runTimeout(cleanUpNextTick);
          draining = true;
          var len = queue.length;
          while (len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
              if (currentQueue) {
                currentQueue[queueIndex].run();
              }
            }
            queueIndex = -1;
            len = queue.length;
          }
          currentQueue = null;
          draining = false;
          runClearTimeout(timeout);
        }
        __name(drainQueue, "drainQueue");
        process.nextTick = function(fun) {
          var args = new Array(arguments.length - 1);
          if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
            }
          }
          queue.push(new Item(fun, args));
          if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
          }
        };
        function Item(fun, array2) {
          this.fun = fun;
          this.array = array2;
        }
        __name(Item, "Item");
        Item.prototype.run = function() {
          this.fun.apply(null, this.array);
        };
        process.title = "browser";
        process.browser = true;
        process.env = {};
        process.argv = [];
        process.version = "";
        process.versions = {};
        function noop() {
        }
        __name(noop, "noop");
        process.on = noop;
        process.addListener = noop;
        process.once = noop;
        process.off = noop;
        process.removeListener = noop;
        process.removeAllListeners = noop;
        process.emit = noop;
        process.prependListener = noop;
        process.prependOnceListener = noop;
        process.listeners = function(name) {
          return [];
        };
        process.binding = function(name) {
          throw new Error("process.binding is not supported");
        };
        process.cwd = function() {
          return "/";
        };
        process.chdir = function(dir) {
          throw new Error("process.chdir is not supported");
        };
        process.umask = function() {
          return 0;
        };
      }, {}], 9: [function(require2, module3, exports3) {
        (function(process) {
          (function() {
            "use strict";
            if (process.env.NODE_ENV !== "production") {
              (function() {
                "use strict";
                var hasSymbol = typeof Symbol === "function" && Symbol.for;
                var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
                var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
                var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
                var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
                var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
                var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
                var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
                var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
                var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
                var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
                var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
                var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
                var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
                var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
                var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
                var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
                var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
                var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
                function isValidElementType(type) {
                  return typeof type === "string" || typeof type === "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
                  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
                }
                __name(isValidElementType, "isValidElementType");
                function typeOf(object2) {
                  if (typeof object2 === "object" && object2 !== null) {
                    var $$typeof = object2.$$typeof;
                    switch ($$typeof) {
                      case REACT_ELEMENT_TYPE:
                        var type = object2.type;
                        switch (type) {
                          case REACT_ASYNC_MODE_TYPE:
                          case REACT_CONCURRENT_MODE_TYPE:
                          case REACT_FRAGMENT_TYPE:
                          case REACT_PROFILER_TYPE:
                          case REACT_STRICT_MODE_TYPE:
                          case REACT_SUSPENSE_TYPE:
                            return type;
                          default:
                            var $$typeofType = type && type.$$typeof;
                            switch ($$typeofType) {
                              case REACT_CONTEXT_TYPE:
                              case REACT_FORWARD_REF_TYPE:
                              case REACT_LAZY_TYPE:
                              case REACT_MEMO_TYPE:
                              case REACT_PROVIDER_TYPE:
                                return $$typeofType;
                              default:
                                return $$typeof;
                            }
                        }
                      case REACT_PORTAL_TYPE:
                        return $$typeof;
                    }
                  }
                  return void 0;
                }
                __name(typeOf, "typeOf");
                var AsyncMode = REACT_ASYNC_MODE_TYPE;
                var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
                var ContextConsumer = REACT_CONTEXT_TYPE;
                var ContextProvider = REACT_PROVIDER_TYPE;
                var Element = REACT_ELEMENT_TYPE;
                var ForwardRef = REACT_FORWARD_REF_TYPE;
                var Fragment = REACT_FRAGMENT_TYPE;
                var Lazy = REACT_LAZY_TYPE;
                var Memo = REACT_MEMO_TYPE;
                var Portal = REACT_PORTAL_TYPE;
                var Profiler = REACT_PROFILER_TYPE;
                var StrictMode = REACT_STRICT_MODE_TYPE;
                var Suspense = REACT_SUSPENSE_TYPE;
                var hasWarnedAboutDeprecatedIsAsyncMode = false;
                function isAsyncMode(object2) {
                  {
                    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
                      hasWarnedAboutDeprecatedIsAsyncMode = true;
                      console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
                    }
                  }
                  return isConcurrentMode(object2) || typeOf(object2) === REACT_ASYNC_MODE_TYPE;
                }
                __name(isAsyncMode, "isAsyncMode");
                function isConcurrentMode(object2) {
                  return typeOf(object2) === REACT_CONCURRENT_MODE_TYPE;
                }
                __name(isConcurrentMode, "isConcurrentMode");
                function isContextConsumer(object2) {
                  return typeOf(object2) === REACT_CONTEXT_TYPE;
                }
                __name(isContextConsumer, "isContextConsumer");
                function isContextProvider(object2) {
                  return typeOf(object2) === REACT_PROVIDER_TYPE;
                }
                __name(isContextProvider, "isContextProvider");
                function isElement(object2) {
                  return typeof object2 === "object" && object2 !== null && object2.$$typeof === REACT_ELEMENT_TYPE;
                }
                __name(isElement, "isElement");
                function isForwardRef(object2) {
                  return typeOf(object2) === REACT_FORWARD_REF_TYPE;
                }
                __name(isForwardRef, "isForwardRef");
                function isFragment(object2) {
                  return typeOf(object2) === REACT_FRAGMENT_TYPE;
                }
                __name(isFragment, "isFragment");
                function isLazy(object2) {
                  return typeOf(object2) === REACT_LAZY_TYPE;
                }
                __name(isLazy, "isLazy");
                function isMemo(object2) {
                  return typeOf(object2) === REACT_MEMO_TYPE;
                }
                __name(isMemo, "isMemo");
                function isPortal(object2) {
                  return typeOf(object2) === REACT_PORTAL_TYPE;
                }
                __name(isPortal, "isPortal");
                function isProfiler(object2) {
                  return typeOf(object2) === REACT_PROFILER_TYPE;
                }
                __name(isProfiler, "isProfiler");
                function isStrictMode(object2) {
                  return typeOf(object2) === REACT_STRICT_MODE_TYPE;
                }
                __name(isStrictMode, "isStrictMode");
                function isSuspense(object2) {
                  return typeOf(object2) === REACT_SUSPENSE_TYPE;
                }
                __name(isSuspense, "isSuspense");
                exports3.AsyncMode = AsyncMode;
                exports3.ConcurrentMode = ConcurrentMode;
                exports3.ContextConsumer = ContextConsumer;
                exports3.ContextProvider = ContextProvider;
                exports3.Element = Element;
                exports3.ForwardRef = ForwardRef;
                exports3.Fragment = Fragment;
                exports3.Lazy = Lazy;
                exports3.Memo = Memo;
                exports3.Portal = Portal;
                exports3.Profiler = Profiler;
                exports3.StrictMode = StrictMode;
                exports3.Suspense = Suspense;
                exports3.isAsyncMode = isAsyncMode;
                exports3.isConcurrentMode = isConcurrentMode;
                exports3.isContextConsumer = isContextConsumer;
                exports3.isContextProvider = isContextProvider;
                exports3.isElement = isElement;
                exports3.isForwardRef = isForwardRef;
                exports3.isFragment = isFragment;
                exports3.isLazy = isLazy;
                exports3.isMemo = isMemo;
                exports3.isPortal = isPortal;
                exports3.isProfiler = isProfiler;
                exports3.isStrictMode = isStrictMode;
                exports3.isSuspense = isSuspense;
                exports3.isValidElementType = isValidElementType;
                exports3.typeOf = typeOf;
              })();
            }
          }).call(this);
        }).call(this, require2("_process"));
      }, { "_process": 8 }], 10: [function(require2, module3, exports3) {
        "use strict";
        var b = "function" === typeof Symbol && Symbol.for, c = b ? Symbol.for("react.element") : 60103, d = b ? Symbol.for("react.portal") : 60106, e = b ? Symbol.for("react.fragment") : 60107, f = b ? Symbol.for("react.strict_mode") : 60108, g = b ? Symbol.for("react.profiler") : 60114, h = b ? Symbol.for("react.provider") : 60109, k = b ? Symbol.for("react.context") : 60110, l = b ? Symbol.for("react.async_mode") : 60111, m = b ? Symbol.for("react.concurrent_mode") : 60111, n = b ? Symbol.for("react.forward_ref") : 60112, p = b ? Symbol.for("react.suspense") : 60113, q = b ? Symbol.for("react.suspense_list") : 60120, r = b ? Symbol.for("react.memo") : 60115, t = b ? Symbol.for("react.lazy") : 60116, v = b ? Symbol.for("react.block") : 60121, w = b ? Symbol.for("react.fundamental") : 60117, x = b ? Symbol.for("react.responder") : 60118, y = b ? Symbol.for("react.scope") : 60119;
        function z(a) {
          if ("object" === typeof a && null !== a) {
            var u = a.$$typeof;
            switch (u) {
              case c:
                switch (a = a.type, a) {
                  case l:
                  case m:
                  case e:
                  case g:
                  case f:
                  case p:
                    return a;
                  default:
                    switch (a = a && a.$$typeof, a) {
                      case k:
                      case n:
                      case t:
                      case r:
                      case h:
                        return a;
                      default:
                        return u;
                    }
                }
              case d:
                return u;
            }
          }
        }
        __name(z, "z");
        function A(a) {
          return z(a) === m;
        }
        __name(A, "A");
        exports3.AsyncMode = l;
        exports3.ConcurrentMode = m;
        exports3.ContextConsumer = k;
        exports3.ContextProvider = h;
        exports3.Element = c;
        exports3.ForwardRef = n;
        exports3.Fragment = e;
        exports3.Lazy = t;
        exports3.Memo = r;
        exports3.Portal = d;
        exports3.Profiler = g;
        exports3.StrictMode = f;
        exports3.Suspense = p;
        exports3.isAsyncMode = function(a) {
          return A(a) || z(a) === l;
        };
        exports3.isConcurrentMode = A;
        exports3.isContextConsumer = function(a) {
          return z(a) === k;
        };
        exports3.isContextProvider = function(a) {
          return z(a) === h;
        };
        exports3.isElement = function(a) {
          return "object" === typeof a && null !== a && a.$$typeof === c;
        };
        exports3.isForwardRef = function(a) {
          return z(a) === n;
        };
        exports3.isFragment = function(a) {
          return z(a) === e;
        };
        exports3.isLazy = function(a) {
          return z(a) === t;
        };
        exports3.isMemo = function(a) {
          return z(a) === r;
        };
        exports3.isPortal = function(a) {
          return z(a) === d;
        };
        exports3.isProfiler = function(a) {
          return z(a) === g;
        };
        exports3.isStrictMode = function(a) {
          return z(a) === f;
        };
        exports3.isSuspense = function(a) {
          return z(a) === p;
        };
        exports3.isValidElementType = function(a) {
          return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
        };
        exports3.typeOf = z;
      }, {}], 11: [function(require2, module3, exports3) {
        (function(process) {
          (function() {
            "use strict";
            if (process.env.NODE_ENV === "production") {
              module3.exports = require2("./cjs/react-is.production.min.js");
            } else {
              module3.exports = require2("./cjs/react-is.development.js");
            }
          }).call(this);
        }).call(this, require2("_process"));
      }, { "./cjs/react-is.development.js": 9, "./cjs/react-is.production.min.js": 10, "_process": 8 }] }, {}, [4])(4);
    });
  }
});

// c2e:/tmp/node_modules/prop-types/prop-types.js
var import_prop_types = __toESM(require_prop_types());
var export_PropTypes = import_prop_types.PropTypes;
var export_any = import_prop_types.any;
var export_array = import_prop_types.array;
var export_arrayOf = import_prop_types.arrayOf;
var export_bigint = import_prop_types.bigint;
var export_bool = import_prop_types.bool;
var export_checkPropTypes = import_prop_types.checkPropTypes;
var export_default = import_prop_types.default;
var export_element = import_prop_types.element;
var export_elementType = import_prop_types.elementType;
var export_exact = import_prop_types.exact;
var export_func = import_prop_types.func;
var export_instanceOf = import_prop_types.instanceOf;
var export_node = import_prop_types.node;
var export_number = import_prop_types.number;
var export_object = import_prop_types.object;
var export_objectOf = import_prop_types.objectOf;
var export_oneOf = import_prop_types.oneOf;
var export_oneOfType = import_prop_types.oneOfType;
var export_resetWarningCache = import_prop_types.resetWarningCache;
var export_shape = import_prop_types.shape;
var export_string = import_prop_types.string;
var export_symbol = import_prop_types.symbol;
export {
  export_PropTypes as PropTypes,
  export_any as any,
  export_array as array,
  export_arrayOf as arrayOf,
  export_bigint as bigint,
  export_bool as bool,
  export_checkPropTypes as checkPropTypes,
  export_default as default,
  export_element as element,
  export_elementType as elementType,
  export_exact as exact,
  export_func as func,
  export_instanceOf as instanceOf,
  export_node as node,
  export_number as number,
  export_object as object,
  export_objectOf as objectOf,
  export_oneOf as oneOf,
  export_oneOfType as oneOfType,
  export_resetWarningCache as resetWarningCache,
  export_shape as shape,
  export_string as string,
  export_symbol as symbol
};
/*! Bundled license information:

prop-types/prop-types.js:
  (*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  *)
  (** @license React v16.13.1
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
  (** @license React v16.13.1
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/

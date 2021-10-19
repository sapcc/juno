import React$1,{useContext,createContext,useState,useEffect,useMemo,createElement}from"react";import{registerConsumer}from"url-state-provider";import{useRouter as useRouter$1}from".";var RouterContext=createContext({insideRouter:!1}),useRouter=function(){var a=useContext(RouterContext);return a&&a.insideRouter||console.warn("You should not use <Route>, <Switch>, <Redirect> or <Link> outside a <Router>"),a};function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread2(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(Object(b),!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(Object(b)).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function _extends(){return _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},_extends.apply(this,arguments)}function _objectWithoutPropertiesLoose(a,b){if(null==a)return{};var c,d,e={},f=Object.keys(a);for(d=0;d<f.length;d++)c=f[d],0<=b.indexOf(c)||(e[c]=a[c]);return e}function _objectWithoutProperties(a,b){if(null==a)return{};var c,d,e=_objectWithoutPropertiesLoose(a,b);if(Object.getOwnPropertySymbols){var f=Object.getOwnPropertySymbols(a);for(d=0;d<f.length;d++)c=f[d],0<=b.indexOf(c)||Object.prototype.propertyIsEnumerable.call(a,c)&&(e[c]=a[c])}return e}function _slicedToArray(a,b){return _arrayWithHoles(a)||_iterableToArrayLimit(a,b)||_unsupportedIterableToArray(a,b)||_nonIterableRest()}function _arrayWithHoles(a){if(Array.isArray(a))return a}function _iterableToArrayLimit(a,b){var c=null==a?null:"undefined"!=typeof Symbol&&a[Symbol.iterator]||a["@@iterator"];if(null!=c){var d,e,f=[],g=!0,h=!1;try{for(c=c.call(a);!(g=(d=c.next()).done)&&(f.push(d.value),!(b&&f.length===b));g=!0);}catch(a){h=!0,e=a}finally{try{g||null==c["return"]||c["return"]()}finally{if(h)throw e}}return f}}function _unsupportedIterableToArray(a,b){if(a){if("string"==typeof a)return _arrayLikeToArray(a,b);var c=Object.prototype.toString.call(a).slice(8,-1);return"Object"===c&&a.constructor&&(c=a.constructor.name),"Map"===c||"Set"===c?Array.from(a):"Arguments"===c||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)?_arrayLikeToArray(a,b):void 0}}function _arrayLikeToArray(a,b){(null==b||b>a.length)&&(b=a.length);for(var c=0,d=Array(b);c<b;c++)d[c]=a[c];return d}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var useURLStateProvider=function(a){var b=useState(),c=_slicedToArray(b,2),d=c[0],e=c[1],f=useState(),g=_slicedToArray(f,2),h=g[0],i=g[1];return useEffect(function(){var b=registerConsumer(a),c=b.push,d=b.replace,f=b.onChange,g=b.currentState,h=f(i);i(g()||{});return e({navigateTo:function(a,b){return c({p:a,o:b})},redirectTo:function(a,b){return d({p:a,o:b})}}),h},[a]),d?{state:h,navigateTo:d.navigateTo,redirectTo:d.redirectTo}:null},Router=function(a){var b=a.stateID,c=a.children,d=useURLStateProvider(b);return d?React.createElement(RouterContext.Provider,{value:{insideRouter:!0,currentPath:d.state.p||"/",options:d.state.o,navigateTo:d.navigateTo,redirectTo:d.redirectTo}},c):null},routeMatcher=function(a,b,c){var d=["currentPath:",a,"routePath:",b];if(!b||!a)return console.info("%c"+d.join(" "),"color: #A52A2A"),[!1];c=c||{},b=b.trim(),a=a.trim();var e="^"+b.replace(/:[^\/]+/g,"(.+)");c.exact&&(e+="$");var f=new RegExp(e),g=a.match(f);if(d=d.concat(["regexString:",e]),!g)return console.info("%c"+d.join(" "),"color: #D2691E"),[!1];for(var h,j=b.split("/").filter(function(a){return a.startsWith(":")}).map(function(a){return a.replace(":","")}),k={},l=1;l<=g.length;l++)h=j[l-1],h&&(k[h]=g[l]);return d=d.concat(["routeParams",JSON.stringify(k)]),console.info("%c"+d.join(" "),"color: #7FFF00"),[!0,k]},_excluded$1=["currentPath","options"],Route=function(a){var b=a.path,c=a.exact,d=a.children,e=a.component,f=useRouter$1(),g=f.currentPath,h=f.options,i=_objectWithoutProperties(f,_excluded$1),j=useMemo(function(){return routeMatcher(g,b,{exact:c})},[g,b,c]),k=_slicedToArray(j,2),l=k[0],m=k[1];return l?React.createElement(RouterContext.Provider,{value:_objectSpread2({path:g,options:h,routeParams:m},i)},e?createElement(e):d):null},Switch=function(a){var b=a.children,c=useRouter$1(),d=c.currentPath,e=useMemo(function(){var a;return React$1.Children.forEach(b,function(b){if(!a&&React$1.isValidElement(b)&&"Route"===b.type.name){var c=routeMatcher(d,b.props.path,{exact:b.props.exact}),e=_slicedToArray(c,2),f=e[0];e[1],f&&(a=b)}}),a},[d,b]);return e?React$1.cloneElement(e):null},Redirect=function(a){var b=a.to,c=useRouter$1(),d=c.redirectTo;return useEffect(function(){d(b)},[]),null},_excluded=["to","children"],Link=function(a){var b=a.to,c=a.children,d=_objectWithoutProperties(a,_excluded),e=useRouter$1(),f=e.navigateTo;return React.createElement("a",_extends({},d,{href:"#",onClick:function(a){a.preventDefault(),f(b)}}),c)};export{Link,Redirect,Route,Router,Switch,useRouter};//# sourceMappingURL=index.js.map

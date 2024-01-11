const reduxImpl=(e,t)=>(n,r,o)=>{o.dispatch=t=>{n((n=>e(n,t)),false,t);return t};o.dispatchFromDevtools=true;return{dispatch:(...e)=>o.dispatch(...e),...t}};const e=reduxImpl;const t=new Map;const getTrackedConnectionState=e=>{const n=t.get(e);return n?Object.fromEntries(Object.entries(n.stores).map((([e,t])=>[e,t.getState()]))):{}};const extractConnectionInformation=(e,n,r)=>{if(void 0===e)return{type:"untracked",connection:n.connect(r)};const o=t.get(r.name);if(o)return{type:"tracked",store:e,...o};const s={connection:n.connect(r),stores:{}};t.set(r.name,s);return{type:"tracked",store:e,...s}};const devtoolsImpl=(e,t={})=>(n,r,o)=>{const{enabled:s,anonymousActionType:a,store:i,...l}=t;let c;try{c=(null!=s?s:"production"!==(import.meta.env&&import.meta.env.MODE))&&window.__REDUX_DEVTOOLS_EXTENSION__}catch(e){}if(!c){"production"!==(import.meta.env&&import.meta.env.MODE)&&s&&console.warn("[zustand devtools middleware] Please install/enable Redux devtools extension");return e(n,r,o)}const{connection:d,...u}=extractConnectionInformation(i,c,l);let v=true;o.setState=(e,t,s)=>{const c=n(e,t);if(!v)return c;const u=void 0===s?{type:a||"anonymous"}:"string"===typeof s?{type:s}:s;if(void 0===i){null==d?void 0:d.send(u,r());return c}null==d?void 0:d.send({...u,type:`${i}/${u.type}`},{...getTrackedConnectionState(l.name),[i]:o.getState()});return c};const setStateFromDevtools=(...e)=>{const t=v;v=false;n(...e);v=t};const m=e(o.setState,r,o);if("untracked"===u.type)null==d?void 0:d.init(m);else{u.stores[u.store]=o;null==d?void 0:d.init(Object.fromEntries(Object.entries(u.stores).map((([e,t])=>[e,e===u.store?m:t.getState()]))))}if(o.dispatchFromDevtools&&"function"===typeof o.dispatch){let e=false;const t=o.dispatch;o.dispatch=(...n)=>{if("production"!==(import.meta.env&&import.meta.env.MODE)&&"__setState"===n[0].type&&!e){console.warn('[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.');e=true}t(...n)}}d.subscribe((e=>{var t;switch(e.type){case"ACTION":if("string"!==typeof e.payload){console.error("[zustand devtools middleware] Unsupported action format");return}return parseJsonThen(e.payload,(e=>{if("__setState"!==e.type)o.dispatchFromDevtools&&"function"===typeof o.dispatch&&o.dispatch(e);else{if(void 0===i){setStateFromDevtools(e.state);return}1!==Object.keys(e.state).length&&console.error('\n                    [zustand devtools middleware] Unsupported __setState action format. \n                    When using \'store\' option in devtools(), the \'state\' should have only one key, which is a value of \'store\' that was passed in devtools(),\n                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }\n                    ');const t=e.state[i];if(void 0===t||null===t)return;JSON.stringify(o.getState())!==JSON.stringify(t)&&setStateFromDevtools(t)}}));case"DISPATCH":switch(e.payload.type){case"RESET":setStateFromDevtools(m);return void 0===i?null==d?void 0:d.init(o.getState()):null==d?void 0:d.init(getTrackedConnectionState(l.name));case"COMMIT":if(void 0===i){null==d?void 0:d.init(o.getState());return}return null==d?void 0:d.init(getTrackedConnectionState(l.name));case"ROLLBACK":return parseJsonThen(e.state,(e=>{if(void 0!==i){setStateFromDevtools(e[i]);null==d?void 0:d.init(getTrackedConnectionState(l.name))}else{setStateFromDevtools(e);null==d?void 0:d.init(o.getState())}}));case"JUMP_TO_STATE":case"JUMP_TO_ACTION":return parseJsonThen(e.state,(e=>{void 0!==i?JSON.stringify(o.getState())!==JSON.stringify(e[i])&&setStateFromDevtools(e[i]):setStateFromDevtools(e)}));case"IMPORT_STATE":{const{nextLiftedState:n}=e.payload;const r=null==(t=n.computedStates.slice(-1)[0])?void 0:t.state;if(!r)return;setStateFromDevtools(void 0===i?r:r[i]);null==d?void 0:d.send(null,n);return}case"PAUSE_RECORDING":return v=!v}return}}));return m};const n=devtoolsImpl;const parseJsonThen=(e,t)=>{let n;try{n=JSON.parse(e)}catch(e){console.error("[zustand devtools middleware] Could not parse the received json",e)}void 0!==n&&t(n)};const subscribeWithSelectorImpl=e=>(t,n,r)=>{const o=r.subscribe;r.subscribe=(e,t,n)=>{let s=e;if(t){const o=(null==n?void 0:n.equalityFn)||Object.is;let a=e(r.getState());s=n=>{const r=e(n);if(!o(a,r)){const e=a;t(a=r,e)}};(null==n?void 0:n.fireImmediately)&&t(a,a)}return o(s)};const s=e(t,n,r);return s};const r=subscribeWithSelectorImpl;const combine=(e,t)=>(...n)=>Object.assign({},e,t(...n));function createJSONStorage(e){let t;try{t=e()}catch(e){return}const n={getItem:e=>{var n;const parse=e=>null===e?null:JSON.parse(e);const r=null!=(n=t.getItem(e))?n:null;return r instanceof Promise?r.then(parse):parse(r)},setItem:(e,n)=>t.setItem(e,JSON.stringify(n)),removeItem:e=>t.removeItem(e)};return n}const toThenable=e=>t=>{try{const n=e(t);return n instanceof Promise?n:{then(e){return toThenable(e)(n)},catch(e){return this}}}catch(e){return{then(e){return this},catch(t){return toThenable(t)(e)}}}};const oldImpl=(e,t)=>(n,r,o)=>{let s={getStorage:()=>localStorage,serialize:JSON.stringify,deserialize:JSON.parse,partialize:e=>e,version:0,merge:(e,t)=>({...t,...e}),...t};let a=false;const i=new Set;const l=new Set;let c;try{c=s.getStorage()}catch(e){}if(!c)return e(((...e)=>{console.warn(`[zustand persist middleware] Unable to update item '${s.name}', the given storage is currently unavailable.`);n(...e)}),r,o);const d=toThenable(s.serialize);const setItem=()=>{const e=s.partialize({...r()});let t;const n=d({state:e,version:s.version}).then((e=>c.setItem(s.name,e))).catch((e=>{t=e}));if(t)throw t;return n};const u=o.setState;o.setState=(e,t)=>{u(e,t);void setItem()};const v=e(((...e)=>{n(...e);void setItem()}),r,o);let m;const hydrate=()=>{var e;if(!c)return;a=false;i.forEach((e=>e(r())));const t=(null==(e=s.onRehydrateStorage)?void 0:e.call(s,r()))||void 0;return toThenable(c.getItem.bind(c))(s.name).then((e=>{if(e)return s.deserialize(e)})).then((e=>{if(e){if("number"!==typeof e.version||e.version===s.version)return e.state;if(s.migrate)return s.migrate(e.state,e.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}})).then((e=>{var t;m=s.merge(e,null!=(t=r())?t:v);n(m,true);return setItem()})).then((()=>{null==t?void 0:t(m,void 0);a=true;l.forEach((e=>e(m)))})).catch((e=>{null==t?void 0:t(void 0,e)}))};o.persist={setOptions:e=>{s={...s,...e};e.getStorage&&(c=e.getStorage())},clearStorage:()=>{null==c?void 0:c.removeItem(s.name)},getOptions:()=>s,rehydrate:()=>hydrate(),hasHydrated:()=>a,onHydrate:e=>{i.add(e);return()=>{i.delete(e)}},onFinishHydration:e=>{l.add(e);return()=>{l.delete(e)}}};hydrate();return m||v};const newImpl=(e,t)=>(n,r,o)=>{let s={storage:createJSONStorage((()=>localStorage)),partialize:e=>e,version:0,merge:(e,t)=>({...t,...e}),...t};let a=false;const i=new Set;const l=new Set;let c=s.storage;if(!c)return e(((...e)=>{console.warn(`[zustand persist middleware] Unable to update item '${s.name}', the given storage is currently unavailable.`);n(...e)}),r,o);const setItem=()=>{const e=s.partialize({...r()});return c.setItem(s.name,{state:e,version:s.version})};const d=o.setState;o.setState=(e,t)=>{d(e,t);void setItem()};const u=e(((...e)=>{n(...e);void setItem()}),r,o);let v;const hydrate=()=>{var e,t;if(!c)return;a=false;i.forEach((e=>{var t;return e(null!=(t=r())?t:u)}));const o=(null==(t=s.onRehydrateStorage)?void 0:t.call(s,null!=(e=r())?e:u))||void 0;return toThenable(c.getItem.bind(c))(s.name).then((e=>{if(e){if("number"!==typeof e.version||e.version===s.version)return e.state;if(s.migrate)return s.migrate(e.state,e.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}})).then((e=>{var t;v=s.merge(e,null!=(t=r())?t:u);n(v,true);return setItem()})).then((()=>{null==o?void 0:o(v,void 0);v=r();a=true;l.forEach((e=>e(v)))})).catch((e=>{null==o?void 0:o(void 0,e)}))};o.persist={setOptions:e=>{s={...s,...e};e.storage&&(c=e.storage)},clearStorage:()=>{null==c?void 0:c.removeItem(s.name)},getOptions:()=>s,rehydrate:()=>hydrate(),hasHydrated:()=>a,onHydrate:e=>{i.add(e);return()=>{i.delete(e)}},onFinishHydration:e=>{l.add(e);return()=>{l.delete(e)}}};s.skipHydration||hydrate();return v||u};const persistImpl=(e,t)=>{if("getStorage"in t||"serialize"in t||"deserialize"in t){"production"!==(import.meta.env&&import.meta.env.MODE)&&console.warn("[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead.");return oldImpl(e,t)}return newImpl(e,t)};const o=persistImpl;export{combine,createJSONStorage,n as devtools,o as persist,e as redux,r as subscribeWithSelector};

//# sourceMappingURL=middleware.mjs.map
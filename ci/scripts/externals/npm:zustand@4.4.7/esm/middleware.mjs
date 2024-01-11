const reduxImpl=(e,t)=>(n,r,o)=>{o.dispatch=t=>{n((n=>e(n,t)),false,t);return t};o.dispatchFromDevtools=true;return{dispatch:(...e)=>o.dispatch(...e),...t}};const e=reduxImpl;const t=new Map;const getTrackedConnectionState=e=>{const n=t.get(e);return n?Object.fromEntries(Object.entries(n.stores).map((([e,t])=>[e,t.getState()]))):{}};const extractConnectionInformation=(e,n,r)=>{if(e===void 0)return{type:"untracked",connection:n.connect(r)};const o=t.get(r.name);if(o)return{type:"tracked",store:e,...o};const s={connection:n.connect(r),stores:{}};t.set(r.name,s);return{type:"tracked",store:e,...s}};const devtoolsImpl=(e,t={})=>(n,r,o)=>{const{enabled:s,anonymousActionType:i,store:a,...l}=t;let c;try{c=(s!=null?s:(import.meta.env?import.meta.env.MODE:void 0)!=="production")&&window.__REDUX_DEVTOOLS_EXTENSION__}catch(e){}if(!c){(import.meta.env?import.meta.env.MODE:void 0)!=="production"&&s&&console.warn("[zustand devtools middleware] Please install/enable Redux devtools extension");return e(n,r,o)}const{connection:d,...u}=extractConnectionInformation(a,c,l);let v=true;o.setState=(e,t,s)=>{const c=n(e,t);if(!v)return c;const u=s===void 0?{type:i||"anonymous"}:typeof s==="string"?{type:s}:s;if(a===void 0){d==null?void 0:d.send(u,r());return c}d==null?void 0:d.send({...u,type:`${a}/${u.type}`},{...getTrackedConnectionState(l.name),[a]:o.getState()});return c};const setStateFromDevtools=(...e)=>{const t=v;v=false;n(...e);v=t};const m=e(o.setState,r,o);if(u.type==="untracked")d==null?void 0:d.init(m);else{u.stores[u.store]=o;d==null?void 0:d.init(Object.fromEntries(Object.entries(u.stores).map((([e,t])=>[e,e===u.store?m:t.getState()]))))}if(o.dispatchFromDevtools&&typeof o.dispatch==="function"){let e=false;const t=o.dispatch;o.dispatch=(...n)=>{if((import.meta.env?import.meta.env.MODE:void 0)!=="production"&&n[0].type==="__setState"&&!e){console.warn('[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.');e=true}t(...n)}}d.subscribe((e=>{var t;switch(e.type){case"ACTION":if(typeof e.payload!=="string"){console.error("[zustand devtools middleware] Unsupported action format");return}return parseJsonThen(e.payload,(e=>{if(e.type!=="__setState")o.dispatchFromDevtools&&typeof o.dispatch==="function"&&o.dispatch(e);else{if(a===void 0){setStateFromDevtools(e.state);return}Object.keys(e.state).length!==1&&console.error('\n                    [zustand devtools middleware] Unsupported __setState action format. \n                    When using \'store\' option in devtools(), the \'state\' should have only one key, which is a value of \'store\' that was passed in devtools(),\n                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }\n                    ');const t=e.state[a];if(t===void 0||t===null)return;JSON.stringify(o.getState())!==JSON.stringify(t)&&setStateFromDevtools(t)}}));case"DISPATCH":switch(e.payload.type){case"RESET":setStateFromDevtools(m);return a===void 0?d==null?void 0:d.init(o.getState()):d==null?void 0:d.init(getTrackedConnectionState(l.name));case"COMMIT":if(a===void 0){d==null?void 0:d.init(o.getState());return}return d==null?void 0:d.init(getTrackedConnectionState(l.name));case"ROLLBACK":return parseJsonThen(e.state,(e=>{if(a!==void 0){setStateFromDevtools(e[a]);d==null?void 0:d.init(getTrackedConnectionState(l.name))}else{setStateFromDevtools(e);d==null?void 0:d.init(o.getState())}}));case"JUMP_TO_STATE":case"JUMP_TO_ACTION":return parseJsonThen(e.state,(e=>{a!==void 0?JSON.stringify(o.getState())!==JSON.stringify(e[a])&&setStateFromDevtools(e[a]):setStateFromDevtools(e)}));case"IMPORT_STATE":{const{nextLiftedState:n}=e.payload;const r=(t=n.computedStates.slice(-1)[0])==null?void 0:t.state;if(!r)return;setStateFromDevtools(a===void 0?r:r[a]);d==null?void 0:d.send(null,n);return}case"PAUSE_RECORDING":return v=!v}return}}));return m};const n=devtoolsImpl;const parseJsonThen=(e,t)=>{let n;try{n=JSON.parse(e)}catch(e){console.error("[zustand devtools middleware] Could not parse the received json",e)}n!==void 0&&t(n)};const subscribeWithSelectorImpl=e=>(t,n,r)=>{const o=r.subscribe;r.subscribe=(e,t,n)=>{let s=e;if(t){const o=(n==null?void 0:n.equalityFn)||Object.is;let i=e(r.getState());s=n=>{const r=e(n);if(!o(i,r)){const e=i;t(i=r,e)}};(n==null?void 0:n.fireImmediately)&&t(i,i)}return o(s)};const s=e(t,n,r);return s};const r=subscribeWithSelectorImpl;const combine=(e,t)=>(...n)=>Object.assign({},e,t(...n));function createJSONStorage(e,t){let n;try{n=e()}catch(e){return}const r={getItem:e=>{var r;const parse=e=>e===null?null:JSON.parse(e,t==null?void 0:t.reviver);const o=(r=n.getItem(e))!=null?r:null;return o instanceof Promise?o.then(parse):parse(o)},setItem:(e,r)=>n.setItem(e,JSON.stringify(r,t==null?void 0:t.replacer)),removeItem:e=>n.removeItem(e)};return r}const toThenable=e=>t=>{try{const n=e(t);return n instanceof Promise?n:{then(e){return toThenable(e)(n)},catch(e){return this}}}catch(e){return{then(e){return this},catch(t){return toThenable(t)(e)}}}};const oldImpl=(e,t)=>(n,r,o)=>{let s={getStorage:()=>localStorage,serialize:JSON.stringify,deserialize:JSON.parse,partialize:e=>e,version:0,merge:(e,t)=>({...t,...e}),...t};let i=false;const a=new Set;const l=new Set;let c;try{c=s.getStorage()}catch(e){}if(!c)return e(((...e)=>{console.warn(`[zustand persist middleware] Unable to update item '${s.name}', the given storage is currently unavailable.`);n(...e)}),r,o);const d=toThenable(s.serialize);const setItem=()=>{const e=s.partialize({...r()});let t;const n=d({state:e,version:s.version}).then((e=>c.setItem(s.name,e))).catch((e=>{t=e}));if(t)throw t;return n};const u=o.setState;o.setState=(e,t)=>{u(e,t);void setItem()};const v=e(((...e)=>{n(...e);void setItem()}),r,o);let m;const hydrate=()=>{var e;if(!c)return;i=false;a.forEach((e=>e(r())));const t=((e=s.onRehydrateStorage)==null?void 0:e.call(s,r()))||void 0;return toThenable(c.getItem.bind(c))(s.name).then((e=>{if(e)return s.deserialize(e)})).then((e=>{if(e){if(typeof e.version!=="number"||e.version===s.version)return e.state;if(s.migrate)return s.migrate(e.state,e.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}})).then((e=>{var t;m=s.merge(e,(t=r())!=null?t:v);n(m,true);return setItem()})).then((()=>{t==null?void 0:t(m,void 0);i=true;l.forEach((e=>e(m)))})).catch((e=>{t==null?void 0:t(void 0,e)}))};o.persist={setOptions:e=>{s={...s,...e};e.getStorage&&(c=e.getStorage())},clearStorage:()=>{c==null?void 0:c.removeItem(s.name)},getOptions:()=>s,rehydrate:()=>hydrate(),hasHydrated:()=>i,onHydrate:e=>{a.add(e);return()=>{a.delete(e)}},onFinishHydration:e=>{l.add(e);return()=>{l.delete(e)}}};hydrate();return m||v};const newImpl=(e,t)=>(n,r,o)=>{let s={storage:createJSONStorage((()=>localStorage)),partialize:e=>e,version:0,merge:(e,t)=>({...t,...e}),...t};let i=false;const a=new Set;const l=new Set;let c=s.storage;if(!c)return e(((...e)=>{console.warn(`[zustand persist middleware] Unable to update item '${s.name}', the given storage is currently unavailable.`);n(...e)}),r,o);const setItem=()=>{const e=s.partialize({...r()});return c.setItem(s.name,{state:e,version:s.version})};const d=o.setState;o.setState=(e,t)=>{d(e,t);void setItem()};const u=e(((...e)=>{n(...e);void setItem()}),r,o);let v;const hydrate=()=>{var e,t;if(!c)return;i=false;a.forEach((e=>{var t;return e((t=r())!=null?t:u)}));const o=((t=s.onRehydrateStorage)==null?void 0:t.call(s,(e=r())!=null?e:u))||void 0;return toThenable(c.getItem.bind(c))(s.name).then((e=>{if(e){if(typeof e.version!=="number"||e.version===s.version)return e.state;if(s.migrate)return s.migrate(e.state,e.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}})).then((e=>{var t;v=s.merge(e,(t=r())!=null?t:u);n(v,true);return setItem()})).then((()=>{o==null?void 0:o(v,void 0);v=r();i=true;l.forEach((e=>e(v)))})).catch((e=>{o==null?void 0:o(void 0,e)}))};o.persist={setOptions:e=>{s={...s,...e};e.storage&&(c=e.storage)},clearStorage:()=>{c==null?void 0:c.removeItem(s.name)},getOptions:()=>s,rehydrate:()=>hydrate(),hasHydrated:()=>i,onHydrate:e=>{a.add(e);return()=>{a.delete(e)}},onFinishHydration:e=>{l.add(e);return()=>{l.delete(e)}}};s.skipHydration||hydrate();return v||u};const persistImpl=(e,t)=>{if("getStorage"in t||"serialize"in t||"deserialize"in t){(import.meta.env?import.meta.env.MODE:void 0)!=="production"&&console.warn("[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead.");return oldImpl(e,t)}return newImpl(e,t)};const o=persistImpl;export{combine,createJSONStorage,n as devtools,o as persist,e as redux,r as subscribeWithSelector};
//# sourceMappingURL=middleware.mjs.map
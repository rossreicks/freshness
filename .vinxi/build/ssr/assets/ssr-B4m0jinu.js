import{H3Event as b,getRequestURL as O,getResponseHeaders as j,getRequestWebStream as z,getRequestHeaders as F,getResponseStatus as N,eventHandler as U}from"h3";import{getContext as Q}from"unctx";import{AsyncLocalStorage as J}from"node:async_hooks";import{isPlainArray as G,isPlainObject as q,defer as V,useRouter as _,pick as X,ScriptOnce as T,createControlledPromise as Z,RouterProvider as K,createMemoryHistory as Y,useRouterState as y,createRootRoute as ee,Outlet as te,ScrollRestoration as re,createFileRoute as ne,lazyRouteComponent as se,lazyFn as oe,createRouter as ae}from"@tanstack/react-router";import{jsxs as p,Fragment as m,jsx as u}from"react/jsx-runtime";import*as g from"react";import{createElement as P}from"react";import S from"jsesc";import ie from"tiny-invariant";import{Transform as ue,PassThrough as ce}from"node:stream";import{isbot as E}from"isbot";import x from"react-dom/server";import{Context as $}from"@tanstack/react-cross-context";function le(e,r,t){if(!t.router.isServer)return r;t.match.extracted=t.match.extracted||[];const n=t.match.extracted;return w(r,(o,a)=>{const i=o instanceof ReadableStream?"stream":o instanceof Promise?"promise":void 0;if(i){const c={dataType:e,type:i,path:a,id:n.length,value:o,matchIndex:t.match.index};if(n.push(c),i==="stream"){const[l,d]=o.tee();return c.streamState=pe({stream:d}),l}else V(o)}return o})}function de(e){const r=_(),t=r.state.matches[e.matchIndex];if(!r.isServer)return null;const n=t.extracted,[s,o]=["__beforeLoadContext","loaderData"].map(a=>n?n.reduce((i,c)=>c.dataType!==a?H(i,["temp",...c.path],void 0):i,{temp:t[a]}).temp:t[a]);if(s!==void 0||o!==void 0||n?.length){const a=`__TSR__.initMatch(${S({index:e.matchIndex,__beforeLoadContext:r.options.transformer.stringify(s),loaderData:r.options.transformer.stringify(o),extracted:n?Object.fromEntries(n.map(i=>[i.id,X(i,["type","path"])])):{}},{isScriptContext:!0,wrap:!0,json:!0})})`;return p(m,{children:[u(T,{children:a}),n?n.map(i=>i.type==="stream"?u(he,{entry:i},i.id):u(fe,{entry:i},i.id)):null]})}return null}function w(e,r,t=[]){if(G(e))return e.map((s,o)=>w(s,r,[...t,`${o}`]));if(q(e)){const s={};for(const o in e)s[o]=w(e[o],r,[...t,o]);return s}const n=r(e,t);return n!==e?n:e}function fe({entry:e}){return u("div",{className:"tsr-once",children:u(g.Suspense,{fallback:null,children:u(me,{entry:e})})})}function me({entry:e}){const r=_();if(e.value.status==="pending")throw e.value;const t=`__TSR__.resolvePromise(${S(e,{isScriptContext:!0,wrap:!0,json:!0})})`;return r.injectScript(t),u(m,{})}function he({entry:e}){ie(e.streamState,"StreamState should be defined");const r=_();return u(k,{streamState:e.streamState,children:t=>{const n=t?`__TSR__.matches[${e.matchIndex}].extracted[${e.id}].value.controller.enqueue(new TextEncoder().encode(${S(t.toString(),{isScriptContext:!0,wrap:!0,json:!0})}))`:`__TSR__.matches[${e.matchIndex}].extracted[${e.id}].value.controller.close()`;return r.injectScript(n),u(m,{})}})}function pe({stream:e}){const r={promises:[]},t=e.getReader(),n=s=>(r.promises[s]=Z(),t.read().then(({done:o,value:a})=>{if(o){r.promises[s].resolve(null),t.releaseLock();return}return r.promises[s].resolve(a),n(s+1)}));return n(0).catch(s=>{console.error("stream read error",s)}),r}function k({streamState:e,children:r,__index:t=0}){const n=e.promises[t];if(!n)return null;if(n.status==="pending")throw n;const s=n.value;return p(m,{children:[r(s),u("div",{className:"tsr-once",children:u(g.Suspense,{fallback:null,children:u(k,{streamState:e,__index:t+1,children:r})})})]})}function H(e,r,t){if(r.length===0)return t;const[n,...s]=r;return Array.isArray(e)?e.map((o,a)=>a===Number(n)?H(o,s,t):o):q(e)?{...e,[n]:H(e[n],s,t)}:e}function C(e){e.router.AfterEachMatch=de,e.router.serializer=n=>S(n,{isScriptContext:!0,wrap:!0,json:!0});const r=$.get("TanStackRouterHydrationContext",{}),t=g.useMemo(()=>{var n,s;return{router:e.router.dehydrate(),payload:(s=(n=e.router.options).dehydrate)==null?void 0:s.call(n)}},[e.router]);return u(r.Provider,{value:t,children:u(K,{router:e.router})})}function _e(e){let r;const t=A(e),n={duplex:"half",method:e.method,headers:e.headers};return e.node.req.body instanceof ArrayBuffer?new Request(t,{...n,body:e.node.req.body}):new Request(t,{...n,get body(){return r||(r=xe(e),r)}})}function ye(e){return e.web??={request:_e(e),url:A(e)},e.web.request}function ge(){return be()}const I=Symbol("$HTTPEvent");function Se(e){return typeof e=="object"&&(e instanceof b||e?.[I]instanceof b||e?.__is_event__===!0)}function R(e){return function(...r){let t=r[0];if(Se(t))r[0]=t instanceof b||t.__is_event__?t:t[I];else{if(!globalThis.app.config.server.experimental?.asyncContext)throw new Error("AsyncLocalStorage was not enabled. Use the `server.experimental.asyncContext: true` option in your app configuration to enable it. Or, pass the instance of HTTPEvent that you have as the first argument to the function.");if(t=ge(),!t)throw new Error("No HTTPEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.");r.unshift(t)}return e(...r)}}const dt=R(F),A=R(O),ft=R(N),Re=R(j),xe=R(z);function ve(){return Q("nitro-app",{asyncContext:!!globalThis.app.config.server.experimental?.asyncContext,AsyncLocalStorage:J})}function be(){return ve().use().event}function Te(e){return e instanceof Headers?new Headers(e):Array.isArray(e)?new Headers(e):typeof e=="object"?new Headers(e):new Headers}function M(...e){return e.reduce((r,t)=>{const n=Te(t);for(const[s,o]of n.entries())r.set(s,o);return r},new Headers)}function we({createRouter:e,getRouterManifest:r}){return t=>U(async n=>{const s=ye(n),o=new URL(s.url),a=o.href.replace(o.origin,""),i=Y({initialEntries:[a]}),c=e();c.serializeLoaderData=le,r&&(c.manifest=r()),c.update({history:i}),await c.load();const l=He({event:n,router:c});return await t({request:s,router:c,responseHeaders:l})})}function He(e){e.event.__tsrHeadersSent=!0;let r=M(Re(e.event),{"Content-Type":"text/html; charset=UTF-8"},...e.router.state.matches.map(n=>n.headers));const{redirect:t}=e.router.state;return t&&(r=M(r,t.headers,{Location:t.href})),r}function Ee(e){const r=L(()=>e.injectedHtml.map(t=>t()).join(""));return new ue({transform(t,n,s){r.transform(t,this.push.bind(this)).then(()=>s()).catch(o=>s(o))},flush(t){r.flush(this.push.bind(this)).then(()=>t()).catch(n=>t(n))}})}function Ce(e){const r=L(()=>e.injectedHtml.map(n=>n()).join("")),t=new TextEncoder;return new TransformStream({transform(n,s){return r.transform(n,o=>(s.enqueue(t.encode(o)),!0))},flush(n){return r.flush(s=>(n.enqueue(s),!0))}})}const Me=/(<body)/,qe=/(<\/body>)/,Pe=/(<\/html>)/,$e=/(<\/[a-zA-Z][\w:.-]*?>)/g,ke=new TextDecoder;function L(e){let r=!1,t="",n="";return{async transform(s,o){const a=t+ke.decode(s),i=a.match(Me),c=a.match(qe),l=a.match(Pe);try{if(i&&(r=!0),!r){o(a),t="";return}const d=e();if(c&&l&&c.index<l.index){const f=c.index+c[0].length,h=l.index+l[0].length,v=a.slice(0,f)+d+a.slice(f,h)+a.slice(h);o(v),t=""}else{let f,h=0;for(;(f=$e.exec(a))!==null;)h=f.index+f[0].length;if(h>0){const v=a.slice(0,h)+d+n;o(v),t=a.slice(h)}else t=a,n+=d}}catch(d){throw console.error("Error transforming HTML:",d),d}},async flush(s){t&&s(t)}}}const Ie=async({request:e,router:r,responseHeaders:t})=>{if(typeof x.renderToReadableStream=="function"){const n=await x.renderToReadableStream(u(C,{router:r}),{signal:e.signal});E(e.headers.get("User-Agent"))&&await n.allReady;const o=[Ce(r)].reduce((a,i)=>a.pipeThrough(i),n);return new Response(o,{status:r.state.statusCode,headers:t})}if(typeof x.renderToPipeableStream=="function"){const n=new ce,s=x.renderToPipeableStream(u(C,{router:r}),{...E(e.headers.get("User-Agent"))?{onAllReady(){s.pipe(n)}}:{onShellReady(){s.pipe(n)}},onError:(i,c)=>{console.log("Error in renderToPipeableStream:",i,c)}}),a=[Ee(r)].reduce((i,c)=>i.pipe(c),n);return new Response(a,{status:r.state.statusCode,headers:t})}throw new Error("No renderToReadableStream or renderToPipeableStream found in react-dom/server. Ensure you are using a version of react-dom that supports streaming.")},Ae=()=>({routes:{__root__:{filePath:"__root.tsx",children:["/"],preloads:["/_build/assets/client-nzzaGE2g.js","/_build/assets/client-wJQXdkEg.js"]},"/":{filePath:"index.tsx"}}});function Le(e){return globalThis.MANIFEST[e]}function Be(){const e=Ae(),r=e.routes.__root__=e.routes.__root__||{};r.assets=r.assets||[];const t=Le("client");return r.assets.push({tag:"script",attrs:{src:t.inputs[t.handler]?.output.path,type:"module",async:!0,suppressHydrationWarning:!0}}),e}function De(){const e=Be();return{...e,routes:Object.fromEntries(Object.entries(e.routes).map(([r,t])=>{const{preloads:n,assets:s}=t;return[r,{preloads:n,assets:s}]}))}}function B({tag:e,attrs:r,children:t}){switch(e){case"title":return u("title",{...r,suppressHydrationWarning:!0,children:t});case"meta":return u("meta",{...r,suppressHydrationWarning:!0});case"link":return u("link",{...r,suppressHydrationWarning:!0});case"style":return u("style",{...r,dangerouslySetInnerHTML:{__html:t}});case"script":return r&&r.src?u("script",{...r,suppressHydrationWarning:!0}):typeof t=="string"?u("script",{...r,dangerouslySetInnerHTML:{__html:t},suppressHydrationWarning:!0}):null;default:return null}}const We=()=>{const e=_(),r=y({select:o=>o.matches.map(a=>a.meta).filter(Boolean)}),t=g.useMemo(()=>{const o=[],a={};let i;return[...r].reverse().forEach(c=>{[...c].reverse().forEach(l=>{if(l)if(l.title)i||(i={tag:"title",children:l.title});else{const d=l.name??l.property;if(d){if(a[d])return;a[d]=!0}o.push({tag:"meta",attrs:{...l}})}})}),i&&o.push(i),o.reverse(),o},[r]),n=y({select:o=>o.matches.map(a=>a.links).filter(Boolean).flat(1).map(a=>({tag:"link",attrs:{...a}})),structuralSharing:!0}),s=y({select:o=>{const a=[];return o.matches.map(i=>e.looseRoutesById[i.routeId]).forEach(i=>{var c,l,d;return(d=(l=(c=e.manifest)==null?void 0:c.routes[i.id])==null?void 0:l.preloads)==null?void 0:d.filter(Boolean).forEach(f=>{a.push({tag:"link",attrs:{rel:"modulepreload",href:f}})})}),a},structuralSharing:!0});return ze([...t,...s,...n],o=>JSON.stringify(o))},Oe=()=>{const e=_(),r=We(),t=g.useContext($.get("TanStackRouterHydrationContext",{}));return p(m,{children:[r.map((n,s)=>P(B,{...n,key:`tsr-meta-${JSON.stringify(n)}`})),p(m,{children:[u(T,{log:!1,children:'__TSR__={matches:[],streamedValues:{},queue:[],runQueue:()=>{let e=!1;__TSR__.queue=__TSR__.queue.filter((_=>!_()||(e=!0,!1))),e&&__TSR__.runQueue()},initMatch:e=>{__TSR__.queue.push((()=>(__TSR__.matches[e.index]||(__TSR__.matches[e.index]=e,Object.entries(e.extracted).forEach((([e,_])=>{if("stream"===_.type){let e;_.value=new ReadableStream({start(_){e=_}}),_.value.controller=e}else if("promise"===_.type){let e,t;_.value=new Promise(((_,u)=>{e=_,t=u})),_.resolve=e,_.reject=t}}))),!0))),__TSR__.runQueue()},resolvePromise:e=>{__TSR__.queue.push((()=>{const _=__TSR__.matches[e.matchIndex];if(_){const t=_.extracted[e.id];if(t)return t.resolve(e.value.data),!0}return!1})),__TSR__.runQueue()},cleanScripts:()=>{document.querySelectorAll(".tsr-once").forEach((e=>{e.remove()}))}};'}),u(T,{children:`__TSR__.dehydrated = ${S(e.options.transformer.stringify(t),{isScriptContext:!0,wrap:!0,json:!0})}`})]})]})},je=()=>u(m,{children:Oe()});function ze(e,r){const t=new Set;return e.filter(n=>{const s=r(n);return t.has(s)?!1:(t.add(s),!0)})}const Fe=()=>{const e=_(),r=y({select:s=>{const o=[];return s.matches.map(a=>e.looseRoutesById[a.routeId]).forEach(a=>{var i,c,l;return(l=(c=(i=e.manifest)==null?void 0:i.routes[a.id])==null?void 0:c.assets)==null?void 0:l.filter(d=>d.tag==="script").forEach(d=>{o.push({tag:"script",attrs:d.attrs,children:d.children})})}),o},structuralSharing:!0}),{scripts:t}=y({select:s=>({scripts:s.matches.map(o=>o.scripts).filter(Boolean).flat(1).map(({children:o,...a})=>({tag:"script",attrs:{...a,suppressHydrationWarning:!0},children:o}))})}),n=[...t,...r];return u(m,{children:n.map((s,o)=>P(B,{...s,key:`tsr-scripts-${s.tag}-${o}`}))})},Ne="/_build/assets/global-BMbyHcbr.css",D=ee({head:()=>({meta:[{charSet:"utf-8"},{name:"viewport",content:"width=device-width, initial-scale=1"},{title:"Ross' Hello Fresh Recipes"}],links:[{rel:"stylesheet",href:Ne}]}),component:Ue});function Ue(){return u(Qe,{children:u(te,{})})}function Qe({children:e}){return p("html",{lang:"en",children:[u("head",{children:u(je,{})}),p("body",{children:[e,u(re,{}),u(Fe,{})]})]})}const Je=()=>import("./index-tDOaAM9_.js"),Ge=()=>import("./index-tDOaAM9_.js"),W=ne("/")({component:se(Ge,"component",()=>W.ssr),loader:oe(Je,"loader")}),Ve=W.update({id:"/",path:"/",getParentRoute:()=>D}),Xe={IndexRoute:Ve},Ze=D._addFileChildren(Xe)._addFileTypes();function Ke(){return ae({routeTree:Ze})}const mt=we({createRouter:Ke,getRouterManifest:De})(Ie);export{W as R,ft as a,be as b,dt as c,Le as g,mt as h,M as m,ye as t};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/_...404_-Dvsv8Zs0.js","assets/web-DEAY107g.js","assets/HttpStatusCode-BqGeRz4q.js","assets/index-DC0l1oKA.js","assets/markdown-CO39_19j.js","assets/markdown-CP9dM-hu.css","assets/index-DR877KqP.js","assets/caption-CCfYXQ9y.js","assets/property-F8Zh0-De.js","assets/components-CS85MpCs.js","assets/property-DcvAgm4Y.css","assets/subtitle-B5vsGLij.js","assets/index-DMoe6eu9.js","assets/v8-DAYV0zQS.js","assets/index-CZ068j4t.js","assets/index-CFOm1zNJ.js","assets/items-DJu72sNC.js","assets/index-CH0eSBV9.css","assets/index-CfjDXrhZ.js","assets/index-C69DS08Z.js","assets/index-nHSRQ3rL.js","assets/index--0d_4nIT.js","assets/index-BBfxHBbv.js","assets/index-7QsP0qdN.js","assets/index-DCg-FX6V.js","assets/index-CQxzSTbp.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{M as Ue,T as Fe,a as ue,L as M,H as je}from"./HttpStatusCode-BqGeRz4q.js";import{g as w,s as ee,m as O,i as E,r as U,t as x,l as Be,c as d,a as ke,b as T,d as He,u as Te,S as D,o as W,e as We,f as C,h as j,j as X,k as P,F as J,n as L,p as y,q as R,v as ze,$ as qe,w as q,D as te,x as Ge,y as Ke,z as Ye,A as Ze,B as Xe,C as Je,E as Qe,G as et}from"./web-DEAY107g.js";import{c as tt,a as nt,R as rt,b as it,d as ot,m as st,k as at,s as lt,e as ct,n as ut,A as B,u as Ae,f as dt}from"./components-CS85MpCs.js";const pt="modulepreload",ft=function(e){return"/maplibre-style-spec/_build/"+e},de={},b=function(t,n,r){let i=Promise.resolve();if(n&&n.length>0){const l=document.getElementsByTagName("link"),s=document.querySelector("meta[property=csp-nonce]"),o=s?.nonce||s?.getAttribute("nonce");i=Promise.all(n.map(a=>{if(a=ft(a),a in de)return;de[a]=!0;const c=a.endsWith(".css"),p=c?'[rel="stylesheet"]':"";if(!!r)for(let f=l.length-1;f>=0;f--){const u=l[f];if(u.href===a&&(!c||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${a}"]${p}`))return;const _=document.createElement("link");if(_.rel=c?"stylesheet":pt,c||(_.as="script",_.crossOrigin=""),_.href=a,o&&_.setAttribute("nonce",o),document.head.appendChild(_),c)return new Promise((f,u)=>{_.addEventListener("load",f),_.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${a}`)))})}))}return i.then(()=>t()).catch(l=>{const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=l,window.dispatchEvent(s),!s.defaultPrevented)throw l})},ne="Invariant Violation",{setPrototypeOf:ht=function(e,t){return e.__proto__=t,e}}=Object;class se extends Error{framesToPop=1;name=ne;constructor(t=ne){super(typeof t=="number"?`${ne}: ${t} (see https://github.com/apollographql/invariant-packages)`:t),ht(this,se.prototype)}}function re(e,t){if(!e)throw new se(t)}const mt=/^[A-Za-z]:\//;function _t(e=""){return e&&e.replace(/\\/g,"/").replace(mt,t=>t.toUpperCase())}const gt=/^[/\\]{2}/,vt=/^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/,bt=/^[A-Za-z]:$/,$t=function(e){if(e.length===0)return".";e=_t(e);const t=e.match(gt),n=oe(e),r=e[e.length-1]==="/";return e=yt(e,!n),e.length===0?n?"/":r?"./":".":(r&&(e+="/"),bt.test(e)&&(e+="/"),t?n?`//${e}`:`//./${e}`:n&&!oe(e)?`/${e}`:e)},Se=function(...e){if(e.length===0)return".";let t;for(const n of e)n&&n.length>0&&(t===void 0?t=n:t+=`/${n}`);return t===void 0?".":$t(t.replace(/\/\/+/g,"/"))};function yt(e,t){let n="",r=0,i=-1,l=0,s=null;for(let o=0;o<=e.length;++o){if(o<e.length)s=e[o];else{if(s==="/")break;s="/"}if(s==="/"){if(!(i===o-1||l===1))if(l===2){if(n.length<2||r!==2||n[n.length-1]!=="."||n[n.length-2]!=="."){if(n.length>2){const a=n.lastIndexOf("/");a===-1?(n="",r=0):(n=n.slice(0,a),r=n.length-1-n.lastIndexOf("/")),i=o,l=0;continue}else if(n.length>0){n="",r=0,i=o,l=0;continue}}t&&(n+=n.length>0?"/..":"..",r=2)}else n.length>0?n+=`/${e.slice(i+1,o)}`:n=e.slice(i+1,o),r=o-i-1;i=o,l=0}else s==="."&&l!==-1?++l:l=-1}return n}const oe=function(e){return vt.test(e)};function Et(e){return`virtual:${e}`}function wt(e){return e.handler?.endsWith(".html")?oe(e.handler)?e.handler:Se(e.root,e.handler):`#vinxi/handler/${e.name}`}const xt=new Proxy({},{get(e,t){return re(typeof t=="string","Bundler name should be a string"),{name:t,type:"client",handler:Et(wt({name:t})),baseURL:"/maplibre-style-spec/_build",chunks:new Proxy({},{get(n,r){re(typeof r=="string","Chunk expected");let i=Se("/maplibre-style-spec/_build",r+".mjs");return{import(){return b(()=>import(i),[])},output:{path:i}}}}),inputs:new Proxy({},{get(n,r){re(typeof r=="string","Input must be string");let i=window.manifest[r].output;return{async import(){return b(()=>import(i),[])},async assets(){return window.manifest[r].assets},output:{path:i}}}})}}});globalThis.MANIFEST=xt;function kt(e){e.forEach(t=>{if(!t.attrs.href)return;let n=document.head.querySelector(`link[href="${t.attrs.href}"]`);n||(n=document.createElement("link"),n.setAttribute("rel","preload"),n.setAttribute("as","style"),n.setAttribute("href",t.attrs.href),document.head.appendChild(n))})}var Tt=x("<style>"),At=x("<link>"),St=x("<script> ");const Ct={style:e=>(()=>{var t=w(Tt);return ee(t,O(()=>e.attrs),!1,!0),E(t,()=>e.children),U(),t})(),link:e=>(()=>{var t=w(At);return ee(t,O(()=>e.attrs),!1,!1),U(),t})(),script:e=>e.attrs.src?(()=>{var t=w(St);return ee(t,O(()=>e.attrs,{get id(){return e.key}}),!1,!0),U(),t})():null};function Nt(e){let{tag:t,attrs:{key:n,...r}={key:void 0},children:i}=e;return Ct[t]({attrs:r,key:n,children:i})}function Pt(e,t,n,r="default"){return Be(async()=>{{const l=(await e.import())[r],o=(await t.inputs?.[e.src].assets()).filter(c=>c.tag==="style"||c.attrs.rel==="stylesheet");return typeof window<"u"&&kt(o),{default:c=>[...o.map(p=>Nt(p)),d(l,c)]}}})}const F={NORMAL:0,WILDCARD:1,PLACEHOLDER:2};function Ot(e={}){const t={options:e,rootNode:Ce(),staticRoutesMap:{}},n=r=>e.strictTrailingSlash?r:r.replace(/\/$/,"")||"/";if(e.routes)for(const r in e.routes)pe(t,n(r),e.routes[r]);return{ctx:t,lookup:r=>Lt(t,n(r)),insert:(r,i)=>pe(t,n(r),i),remove:r=>Rt(t,n(r))}}function Lt(e,t){const n=e.staticRoutesMap[t];if(n)return n.data;const r=t.split("/"),i={};let l=!1,s=null,o=e.rootNode,a=null;for(let c=0;c<r.length;c++){const p=r[c];o.wildcardChildNode!==null&&(s=o.wildcardChildNode,a=r.slice(c).join("/"));const h=o.children.get(p);if(h===void 0){if(o=o.placeholderChildNode,o===null)break;o.paramName&&(i[o.paramName]=p),l=!0}else o=h}return(o===null||o.data===null)&&s!==null&&(o=s,i[o.paramName||"_"]=a,l=!0),o?l?{...o.data,params:l?i:void 0}:o.data:null}function pe(e,t,n){let r=!0;const i=t.split("/");let l=e.rootNode,s=0;for(const o of i){let a;if(a=l.children.get(o))l=a;else{const c=It(o);a=Ce({type:c,parent:l}),l.children.set(o,a),c===F.PLACEHOLDER?(a.paramName=o==="*"?`_${s++}`:o.slice(1),l.placeholderChildNode=a,r=!1):c===F.WILDCARD&&(l.wildcardChildNode=a,a.paramName=o.slice(3)||"_",r=!1),l=a}}return l.data=n,r===!0&&(e.staticRoutesMap[t]=l),l}function Rt(e,t){let n=!1;const r=t.split("/");let i=e.rootNode;for(const l of r)if(i=i.children.get(l),!i)return n;if(i.data){const l=r.at(-1)||"";i.data=null,Object.keys(i.children).length===0&&i.parent&&(i.parent.children.delete(l),i.parent.wildcardChildNode=null,i.parent.placeholderChildNode=null),n=!0}return n}function Ce(e={}){return{type:e.type||F.NORMAL,parent:e.parent||null,children:new Map,data:e.data||null,paramName:e.paramName||null,wildcardChildNode:null,placeholderChildNode:null}}function It(e){return e.startsWith("**")?F.WILDCARD:e[0]===":"||e==="*"?F.PLACEHOLDER:F.NORMAL}const Ne=[{$component:{src:"src/routes/[...404].tsx?pick=default&pick=$css",build:()=>b(()=>import("./_...404_-Dvsv8Zs0.js"),__vite__mapDeps([0,1,2])),import:()=>{const e="src/routes/[...404].tsx?pick=default&pick=$css";return b(()=>import(globalThis.MANIFEST.client.inputs[e].output.path),[])}},path:"/*404",filePath:"/home/runner/work/maplibre-style-spec/maplibre-style-spec/docs/src/routes/[...404].tsx"},{$component:{src:"src/routes/index.tsx?pick=default&pick=$css",build:()=>b(()=>import("./index-DC0l1oKA.js"),__vite__mapDeps([3,4,1,5])),import:()=>{const e="src/routes/index.tsx?pick=default&pick=$css";return b(()=>import(globalThis.MANIFEST.client.inputs[e].output.path),[])}},path:"/",filePath:"/home/runner/work/maplibre-style-spec/maplibre-style-spec/docs/src/routes/index.tsx"},{$component:{src:"src/routes/deprecations/index.tsx?pick=default&pick=$css",build:()=>b(()=>import("./index-DR877KqP.js"),__vite__mapDeps([6,1,4,5,7,8,9,10,11])),import:()=>{const e="src/routes/deprecations/index.tsx?pick=default&pick=$css";return b(()=>import(globalThis.MANIFEST.client.inputs[e].output.path),[])}},path:"/deprecations/",filePath:"/home/runner/work/maplibre-style-spec/maplibre-style-spec/docs/src/routes/deprecations/index.tsx"},{$component:{src:"src/routes/expressions/index.tsx?pick=default&pick=$css",build:()=>b(()=>import("./index-DMoe6eu9.js"),__vite__mapDeps([12,1,13,4,5,8,9,10])),import:()=>{const e="src/routes/expressions/index.tsx?pick=default&pick=$css";return b(()=>import(globalThis.MANIFEST.client.inputs[e].output.path),[])}},path:"/expressions/",filePath:"/home/runner/work/maplibre-style-spec/maplibre-style-spec/docs/src/routes/expressions/index.tsx"},{$component:{src:"src/routes/glyphs/index.tsx?pick=default&pick=$css",build:()=>b(()=>import("./index-CZ068j4t.js"),__vite__mapDeps([14,4,1,5,13])),import:()=>{const e="src/routes/glyphs/index.tsx?pick=default&pick=$css";return b(()=>import(globalThis.MANIFEST.client.inputs[e].output.path),[])}},path:"/glyphs/",filePath:"/home/runner/work/maplibre-style-spec/maplibre-style-spec/docs/src/routes/glyphs/index.tsx"},{$component:{src:"src/routes/layers/index.tsx?pick=default&pick=$css",build:()=>b(()=>import("./index-CFOm1zNJ.js"),__vite__mapDeps([15,1,4,5,13,16,8,9,10,11,7,17])),import:()=>{const e="src/routes/layers/index.tsx?pick=default&pick=$css";return b(()=>import(globalThis.MANIFEST.client.inputs[e].output.path),[])}},path:"/layers/",filePath:"/home/runner/work/maplibre-style-spec/maplibre-style-spec/docs/src/routes/layers/index.tsx"},{$component:{src:"src/routes/light/index.tsx?pick=default&pick=$css",build:()=>b(()=>import("./index-CfjDXrhZ.js"),__vite__mapDeps([18,1,4,5,13,16,8,9,10,11])),import:()=>{const e="src/routes/light/index.tsx?pick=default&pick=$css";return b(()=>import(globalThis.MANIFEST.client.inputs[e].output.path),[])}},path:"/light/",filePath:"/home/runner/work/maplibre-style-spec/maplibre-style-spec/docs/src/routes/light/index.tsx"},{$component:{src:"src/routes/root/index.tsx?pick=default&pick=$css",build:()=>b(()=>import("./index-C69DS08Z.js"),__vite__mapDeps([19,1,4,5,13,16,8,9,10,11])),import:()=>{const e="src/routes/root/index.tsx?pick=default&pick=$css";return b(()=>import(globalThis.MANIFEST.client.inputs[e].output.path),[])}},path:"/root/",filePath:"/home/runner/work/maplibre-style-spec/maplibre-style-spec/docs/src/routes/root/index.tsx"},{$component:{src:"src/routes/sky/index.tsx?pick=default&pick=$css",build:()=>b(()=>import("./index-nHSRQ3rL.js"),__vite__mapDeps([20,1,4,5,13,16,8,9,10,11])),import:()=>{const e="src/routes/sky/index.tsx?pick=default&pick=$css";return b(()=>import(globalThis.MANIFEST.client.inputs[e].output.path),[])}},path:"/sky/",filePath:"/home/runner/work/maplibre-style-spec/maplibre-style-spec/docs/src/routes/sky/index.tsx"},{$component:{src:"src/routes/sources/index.tsx?pick=default&pick=$css",build:()=>b(()=>import("./index--0d_4nIT.js"),__vite__mapDeps([21,1,4,5,13,16,8,9,10,11])),import:()=>{const e="src/routes/sources/index.tsx?pick=default&pick=$css";return b(()=>import(globalThis.MANIFEST.client.inputs[e].output.path),[])}},path:"/sources/",filePath:"/home/runner/work/maplibre-style-spec/maplibre-style-spec/docs/src/routes/sources/index.tsx"},{$component:{src:"src/routes/sprite/index.tsx?pick=default&pick=$css",build:()=>b(()=>import("./index-BBfxHBbv.js"),__vite__mapDeps([22,1,4,5,13])),import:()=>{const e="src/routes/sprite/index.tsx?pick=default&pick=$css";return b(()=>import(globalThis.MANIFEST.client.inputs[e].output.path),[])}},path:"/sprite/",filePath:"/home/runner/work/maplibre-style-spec/maplibre-style-spec/docs/src/routes/sprite/index.tsx"},{$component:{src:"src/routes/terrain/index.tsx?pick=default&pick=$css",build:()=>b(()=>import("./index-7QsP0qdN.js"),__vite__mapDeps([23,1,4,5,13,16,8,9,10,11])),import:()=>{const e="src/routes/terrain/index.tsx?pick=default&pick=$css";return b(()=>import(globalThis.MANIFEST.client.inputs[e].output.path),[])}},path:"/terrain/",filePath:"/home/runner/work/maplibre-style-spec/maplibre-style-spec/docs/src/routes/terrain/index.tsx"},{$component:{src:"src/routes/transition/index.tsx?pick=default&pick=$css",build:()=>b(()=>import("./index-DCg-FX6V.js"),__vite__mapDeps([24,1,4,5,13,16,8,9,10,11])),import:()=>{const e="src/routes/transition/index.tsx?pick=default&pick=$css";return b(()=>import(globalThis.MANIFEST.client.inputs[e].output.path),[])}},path:"/transition/",filePath:"/home/runner/work/maplibre-style-spec/maplibre-style-spec/docs/src/routes/transition/index.tsx"},{$component:{src:"src/routes/types/index.tsx?pick=default&pick=$css",build:()=>b(()=>import("./index-CQxzSTbp.js"),__vite__mapDeps([25,4,1,5])),import:()=>{const e="src/routes/types/index.tsx?pick=default&pick=$css";return b(()=>import(globalThis.MANIFEST.client.inputs[e].output.path),[])}},path:"/types/",filePath:"/home/runner/work/maplibre-style-spec/maplibre-style-spec/docs/src/routes/types/index.tsx"}],Dt=Mt(Ne.filter(e=>e.$component));function Mt(e){function t(n,r,i,l){const s=Object.values(n).find(o=>i.startsWith(o.id+"/"));return s?(t(s.children||(s.children=[]),r,i.slice(s.id.length)),n):(n.push({...r,id:i,path:i.replace(/\/\([^)/]+\)/g,"").replace(/\([^)/]+\)/g,"")}),n)}return e.sort((n,r)=>n.path.length-r.path.length).reduce((n,r)=>t(n,r,r.path,r.path),[])}function Vt(e){return e.$GET||e.$POST||e.$PUT||e.$PATCH||e.$DELETE}Ot({routes:Ne.reduce((e,t)=>{if(!Vt(t))return e;let n=t.path.replace(/\([^)/]+\)/g,"").replace(/\*([^/]*)/g,(r,i)=>`**:${i}`);if(/:[^/]*\?/g.test(n))throw new Error(`Optional parameters are not supported in API routes: ${n}`);if(e[n])throw new Error(`Duplicate API routes for "${n}" found at "${e[n].route.path}" and "${t.path}"`);return e[n]={route:t},e},{})});function Ut(){function e(n){return{...n,...n.$$route?n.$$route.require().route:void 0,info:{...n.$$route?n.$$route.require().route.info:{},filesystem:!0},component:Pt(n.$component,globalThis.MANIFEST.client,globalThis.MANIFEST.ssr),children:n.children?n.children.map(e):void 0}}return Dt.map(e)}let fe;const Ft=()=>fe||(fe=Ut()),jt="_sidebar_outer_container_1dyzj_1",Bt="_sidebar_viewport_1dyzj_9",Ht="_sidebar_inner_container_1dyzj_16",Wt="_nav_items_1dyzj_24",K={sidebar_outer_container:jt,sidebar_viewport:Bt,sidebar_inner_container:Ht,nav_items:Wt},Pe=[{title:"Introduction",path:""},{title:"Root",path:"root/"},{title:"Expressions",path:"expressions/"},{title:"Light",path:"light/"},{title:"Glyphs",path:"glyphs/"},{title:"Layers",path:"layers/"},{title:"Sources",path:"sources/"},{title:"Sprite",path:"sprite/"},{title:"Terrain",path:"terrain/"},{title:"Sky",path:"sky/"},{title:"Transition",path:"transition/"},{title:"Types",path:"types/"},{title:"Deprecations",path:"deprecations/"}],zt=e=>t=>{const{base:n}=t,r=ke(()=>t.children),i=T(()=>tt(r(),t.base||""));let l;const s=nt(e,i,()=>l,{base:n,singleFlight:t.singleFlight});return e.create&&e.create(s),d(rt.Provider,{value:s,get children(){return d(qt,{routerState:s,get root(){return t.root},get load(){return t.rootLoad},get children(){return[T(()=>(l=He())&&null),d(Gt,{routerState:s,get branches(){return i()}})]}})}})};function qt(e){const t=e.routerState.location,n=e.routerState.params,r=T(()=>e.load&&Te(()=>e.load({params:n,location:t,intent:"preload"})));return d(D,{get when(){return e.root},keyed:!0,get fallback(){return e.children},children:i=>d(i,{params:n,location:t,get data(){return r()},get children(){return e.children}})})}function Gt(e){const t=[];let n;const r=T(W(e.routerState.matches,(i,l,s)=>{let o=l&&i.length===l.length;const a=[];for(let c=0,p=i.length;c<p;c++){const h=l&&l[c],_=i[c];s&&h&&_.route.key===h.route.key?a[c]=s[c]:(o=!1,t[c]&&t[c](),We(f=>{t[c]=f,a[c]=ot(e.routerState,a[c-1]||e.routerState.base,he(()=>r()[c+1]),()=>e.routerState.matches()[c])}))}return t.splice(i.length).forEach(c=>c()),s&&o?s:(n=a[0],a)}));return he(()=>r()&&n)()}const he=e=>()=>d(D,{get when(){return e()},keyed:!0,children:t=>d(it.Provider,{value:t,get children(){return t.outlet()}})});function Kt([e,t],n,r){return[n?()=>n(e()):e,r?i=>t(r(i)):t]}function Yt(e){if(e==="#")return null;try{return document.querySelector(e)}catch{return null}}function Zt(e){let t=!1;const n=i=>typeof i=="string"?{value:i}:i,r=Kt(C(n(e.get()),{equals:(i,l)=>i.value===l.value}),void 0,i=>(!t&&e.set(i),i));return e.init&&j(e.init((i=e.get())=>{t=!0,r[1](n(i)),t=!1})),zt({signal:r,create:e.create,utils:e.utils})}function Xt(e,t,n){return e.addEventListener(t,n),()=>e.removeEventListener(t,n)}function Jt(e,t){const n=Yt(`#${e}`);n?n.scrollIntoView():t&&window.scrollTo(0,0)}const Qt=new Map;function en(e=!0,t=!1,n="/_server"){return r=>{const i=r.base.path(),l=r.navigatorFactory(r.base);let s={};function o(u){return u.namespaceURI==="http://www.w3.org/2000/svg"}function a(u){if(u.defaultPrevented||u.button!==0||u.metaKey||u.altKey||u.ctrlKey||u.shiftKey)return;const m=u.composedPath().find(A=>A instanceof Node&&A.nodeName.toUpperCase()==="A");if(!m||t&&!m.hasAttribute("link"))return;const v=o(m),g=v?m.href.baseVal:m.href;if((v?m.target.baseVal:m.target)||!g&&!m.hasAttribute("state"))return;const $=(m.getAttribute("rel")||"").split(/\s+/);if(m.hasAttribute("download")||$&&$.includes("external"))return;const S=v?new URL(g,document.baseURI):new URL(g);if(!(S.origin!==window.location.origin||i&&S.pathname&&!S.pathname.toLowerCase().startsWith(i.toLowerCase())))return[m,S]}function c(u){const m=a(u);if(!m)return;const[v,g]=m,k=r.parsePath(g.pathname+g.search+g.hash),$=v.getAttribute("state");u.preventDefault(),l(k,{resolve:!1,replace:v.hasAttribute("replace"),scroll:!v.hasAttribute("noscroll"),state:$&&JSON.parse($)})}function p(u){const m=a(u);if(!m)return;const[v,g]=m;s[g.pathname]||r.preloadRoute(g,v.getAttribute("preload")!=="false")}function h(u){const m=a(u);if(!m)return;const[v,g]=m;s[g.pathname]||(s[g.pathname]=setTimeout(()=>{r.preloadRoute(g,v.getAttribute("preload")!=="false"),delete s[g.pathname]},200))}function _(u){const m=a(u);if(!m)return;const[,v]=m;s[v.pathname]&&(clearTimeout(s[v.pathname]),delete s[v.pathname])}function f(u){if(u.defaultPrevented)return;let m=u.submitter&&u.submitter.hasAttribute("formaction")?u.submitter.getAttribute("formaction"):u.target.getAttribute("action");if(!m)return;if(!m.startsWith("https://action/")){const g=new URL(m,st);if(m=r.parsePath(g.pathname+g.search),!m.startsWith(n))return}if(u.target.method.toUpperCase()!=="POST")throw new Error("Only POST forms are supported for Actions");const v=Qt.get(m);if(v){u.preventDefault();const g=new FormData(u.target);u.submitter&&u.submitter.name&&g.append(u.submitter.name,u.submitter.value),v.call({r,f:u.target},g)}}X(["click","submit"]),document.addEventListener("click",c),e&&(document.addEventListener("mouseover",h),document.addEventListener("mouseout",_),document.addEventListener("focusin",p),document.addEventListener("touchstart",p)),document.addEventListener("submit",f),j(()=>{document.removeEventListener("click",c),e&&(document.removeEventListener("mouseover",h),document.removeEventListener("mouseout",_),document.removeEventListener("focusin",p),document.removeEventListener("touchstart",p)),document.removeEventListener("submit",f)})}}function tn(e){const t=()=>({value:window.location.pathname+window.location.search+window.location.hash,state:window.history.state}),n=ct();return Zt({get:t,set({value:r,replace:i,scroll:l,state:s}){i?window.history.replaceState(at(s),"",r):window.history.pushState(s,"",r),Jt(window.location.hash.slice(1),l),lt()},init:r=>Xt(window,"popstate",ut(r,i=>{if(i&&i<0)return!n.confirm(i);{const l=t();return!n.confirm(l.value,{state:l.state})}})),create:en(e.preload,e.explicitLinks,e.actionBase),utils:{go:r=>window.history.go(r),beforeLeave:n}})(e)}var nn=x("<aside><div><div><div><ul><!$><!/><li>"),rn=x("<li>");function on(e){return(()=>{var t=w(nn),n=t.firstChild,r=n.firstChild,i=r.firstChild,l=i.firstChild,s=l.firstChild,[o,a]=P(s.nextSibling),c=o.nextSibling;return E(l,d(J,{each:Pe,children:p=>(()=>{var h=w(rn);return E(h,d(B,{end:!0,classList:{"sidebar-link":!0},get href(){return`/${p.path}`},get children(){return p.title}})),h})()}),o,a),E(c,d(B,{target:"_blank",href:"https://github.com/maplibre/maplibre-gl-style-spec/blob/main/CHANGELOG.md",children:"Changelog"})),L(p=>{var h=`${K.sidebar_outer_container} ${e.class}`,_=`${K.sidebar_viewport}`,f=K.sidebar_inner_container,u=K.nav_items;return h!==p.e&&y(t,p.e=h),_!==p.t&&y(n,p.t=_),f!==p.a&&y(r,p.a=f),u!==p.o&&y(i,p.o=u),p},{e:void 0,t:void 0,a:void 0,o:void 0}),t})()}const sn="_toc_outer_container_nu2fg_1",an="_active_nu2fg_9",ln="_largeTOC_nu2fg_14",cn="_toc_viewport_nu2fg_18",un="_paintIcon_nu2fg_32",dn="_layoutIcon_nu2fg_33",pn="_nav_items_nu2fg_36",fn="_anchor_h1_nu2fg_62",hn="_anchor_h2_nu2fg_68",mn="_anchor_h3_nu2fg_71",_n="_header_nu2fg_84",N={toc_outer_container:sn,active:an,largeTOC:ln,toc_viewport:cn,paintIcon:un,layoutIcon:dn,nav_items:pn,anchor_h1:fn,anchor_h2:hn,anchor_h3:mn,"toc-link-transition-options":"_toc-link-transition-options_nu2fg_80",header:_n};var gn=x("<h3>On This Page"),vn=x("<nav><div><!$><!/><ul>"),bn=x("<aside><div>"),$n=x("<li>"),yn=x('<span><i class="fa-solid fa-palette">'),En=x('<span><i class="fa-solid fa-pen">');function Oe(e){const[t,n]=C(""),[r,i]=C([]),l=e.mode==="large"?"h2, h3":"h2",s=()=>{let h,_=1/0;if(r().forEach(f=>{if(f){const u=Math.abs(f.getBoundingClientRect().top);u<_&&(_=u,h=f.id)}}),n(h||""),h){const f=document.getElementById(`toc-link-${h}`);if(f){const u=f.offsetTop;a()&&(a().scrollTop=u-200)}}},o=T(()=>Ae().pathname);R(()=>{if(o()&&typeof window<"u"&&typeof document<"u"){const h=document.getElementById("ContentWindow"),_=Array.from(h.querySelectorAll(l)).map((f,u)=>{const m=f.textContent,v=f.id||(m?`${m.replace(/\s+/g,"-").toLowerCase()}-${u}`:"");return f.id||(f.id=v),{id:v,title:m}});i(_.map(({id:f})=>document.getElementById(f)))}});const[a,c]=C();R(()=>{typeof window<"u"&&typeof document<"u"&&window.addEventListener("scroll",s)}),j(()=>{typeof window<"u"&&window.removeEventListener("scroll",s)});const p=(h,_)=>{h.preventDefault();const f=document.getElementById(_);if(f){const u=f.offsetTop+60;window.scrollTop=u,window.document.body.scrollTop=u,window.document.documentElement.scrollTop=u,history.pushState(null,"",`${location.pathname}#${_}`)}};return(()=>{var h=w(bn),_=h.firstChild;return ze(c,_),_.style.setProperty("scroll-behavior","smooth"),E(_,d(D,{get when(){return r().length>0},get children(){var f=w(vn),u=f.firstChild,m=u.firstChild,[v,g]=P(m.nextSibling),k=v.nextSibling;return E(u,d(D,{get when(){return e.mode==="large"},get children(){var $=w(gn);return $.$$click=()=>{document.documentElement.scrollTop=0},$.style.setProperty("cursor","pointer"),L(()=>y($,N.header)),U(),$}}),v,g),E(k,d(J,{get each(){return r()},children:$=>(()=>{var S=w($n);return E(S,d(B,{get id(){return`toc-link-${$.id}`},href:"#",get classList(){return{[N.anchor_h1]:$.tagName==="H1",[N.anchor_h2]:$.tagName==="H2",[N.anchor_h3]:$.tagName==="H3",[N.active]:$.id===t()}},onClick:A=>p(A,$.id),get children(){return[T(()=>T(()=>!!$.id.startsWith("paint-"))()?(()=>{var A=w(yn);return L(()=>y(A,N.paintIcon)),A})():null),T(()=>T(()=>!!$.id.startsWith("layout-"))()?(()=>{var A=w(En);return L(()=>y(A,N.layoutIcon)),A})():null),T(()=>$.innerText)]}})),S})()})),L(()=>y(u,N.nav_items)),f}})),L(f=>{var u=`${e.class} ${N.toc_outer_container} ${N[`${e.mode}TOC`]}`,m=`${e.class} ${N.toc_viewport}`;return u!==f.e&&y(h,f.e=u),m!==f.t&&y(_,f.t=m),f},{e:void 0,t:void 0}),h})()}X(["click"]);const wn="_toc_accordion_jxdfs_2",xn="_scroll_to_top_jxdfs_12",kn="_main_content_container_jxdfs_29",Tn="_main_content_padding_container_jxdfs_40",An="_row_jxdfs_47",Sn="_doc_items_jxdfs_51",Cn="_github_link_jxdfs_62",I={toc_accordion:wn,scroll_to_top:xn,main_content_container:kn,"header-anchor":"_header-anchor_jxdfs_37",main_content_padding_container:Tn,row:An,doc_items:Sn,github_link:Cn};function Le(e){return(...t)=>{for(const n of e)n&&n(...t)}}function Nn(e){return(...t)=>{for(let n=e.length-1;n>=0;n--){const r=e[n];r&&r(...t)}}}var z=e=>typeof e=="function"&&!e.length?e():e;function Pn(e,...t){return typeof e=="function"?e(...t):e}function Y(){return!0}var On={get(e,t,n){return t===qe?n:e.get(t)},has(e,t){return e.has(t)},set:Y,deleteProperty:Y,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:Y,deleteProperty:Y}},ownKeys(e){return e.keys()}},Ln=/((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;function me(e){const t={};let n;for(;n=Ln.exec(e);)t[n[1]]=n[2];return t}function Rn(e,t){if(typeof e=="string"){if(typeof t=="string")return`${e};${t}`;e=me(e)}else typeof t=="string"&&(t=me(t));return{...e,...t}}var ie=(e,t,n)=>{let r;for(const i of e){const l=z(i)[t];r?l&&(r=n(r,l)):r=l}return r};function In(...e){const t=Array.isArray(e[0]),n=t?e[0]:e;if(n.length===1)return n[0];const r=t&&e[1]?.reverseEventHandlers?Nn:Le,i={};for(const s of n){const o=z(s);for(const a in o)if(a[0]==="o"&&a[1]==="n"&&a[2]){const c=o[a],p=a.toLowerCase(),h=typeof c=="function"?c:Array.isArray(c)?c.length===1?c[0]:c[0].bind(void 0,c[1]):void 0;h?i[p]?i[p].push(h):i[p]=[h]:delete i[p]}}const l=O(...n);return new Proxy({get(s){if(typeof s!="string")return Reflect.get(l,s);if(s==="style")return ie(n,"style",Rn);if(s==="ref"){const o=[];for(const a of n){const c=z(a)[s];typeof c=="function"&&o.push(c)}return r(o)}if(s[0]==="o"&&s[1]==="n"&&s[2]){const o=i[s.toLowerCase()];return o?r(o):Reflect.get(l,s)}return s==="class"||s==="className"?ie(n,s,(o,a)=>`${o} ${a}`):s==="classList"?ie(n,s,(o,a)=>({...o,...a})):Reflect.get(l,s)},has(s){return Reflect.has(l,s)},keys(){return Object.keys(l)}},On)}function Re(...e){return Le(e)}function Dn(e){return Array.isArray(e)}function Mn(e){return Object.prototype.toString.call(e)==="[object String]"}function Vn(e){return typeof e=="function"}function Un(e){return t=>`${e()}-${t}`}function Fn(e,t){return t&&(Vn(t)?t(e):t[0](t[1],e)),e?.defaultPrevented}function ae(e,t){return O(e,t)}var H=new Map,_e=new Set;function ge(){if(typeof window>"u")return;const e=n=>{if(!n.target)return;let r=H.get(n.target);r||(r=new Set,H.set(n.target,r),n.target.addEventListener("transitioncancel",t)),r.add(n.propertyName)},t=n=>{if(!n.target)return;const r=H.get(n.target);if(r&&(r.delete(n.propertyName),r.size===0&&(n.target.removeEventListener("transitioncancel",t),H.delete(n.target)),H.size===0)){for(const i of _e)i();_e.clear()}};document.body.addEventListener("transitionrun",e),document.body.addEventListener("transitionend",t)}typeof document<"u"&&(document.readyState!=="loading"?ge():document.addEventListener("DOMContentLoaded",ge));function jn(e){const[t,n]=C(e.defaultValue?.()),r=T(()=>e.value?.()!==void 0),i=T(()=>r()?e.value?.():t());return[i,s=>{Te(()=>{const o=Pn(s,i());return Object.is(o,i())||(r()||n(o),e.onChange?.(o)),o})}]}function Bn(e){const[t,n]=jn(e);return[()=>t()??!1,n]}function Hn(e={}){const[t,n]=Bn({value:()=>z(e.open),defaultValue:()=>!!z(e.defaultOpen),onChange:s=>e.onOpenChange?.(s)}),r=()=>{n(!0)},i=()=>{n(!1)};return{isOpen:t,setIsOpen:n,open:r,close:i,toggle:()=>{t()?i():r()}}}/*!
 * Portions of this file are based on code from radix-ui-primitives.
 * MIT Licensed, Copyright (c) 2022 WorkOS.
 *
 * Credits to the Radix UI team:
 * https://github.com/radix-ui/primitives/blob/21a7c97dc8efa79fecca36428eec49f187294085/packages/react/presence/src/Presence.tsx
 * https://github.com/radix-ui/primitives/blob/21a7c97dc8efa79fecca36428eec49f187294085/packages/react/presence/src/useStateMachine.tsx
 */function Wn(e){const[t,n]=C();let r={},i=e(),l="none";const[s,o]=zn(e()?"mounted":"unmounted",{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return R(W(s,a=>{const c=Z(r);l=a==="mounted"?c:"none"})),R(W(e,a=>{if(i===a)return;const c=Z(r);a?o("MOUNT"):r?.display==="none"?o("UNMOUNT"):o(i&&l!==c?"ANIMATION_OUT":"UNMOUNT"),i=a})),R(W(t,a=>{if(a){const c=h=>{const f=Z(r).includes(h.animationName);h.target===a&&f&&o("ANIMATION_END")},p=h=>{h.target===a&&(l=Z(r))};a.addEventListener("animationstart",p),a.addEventListener("animationcancel",c),a.addEventListener("animationend",c),j(()=>{a.removeEventListener("animationstart",p),a.removeEventListener("animationcancel",c),a.removeEventListener("animationend",c)})}else o("ANIMATION_END")})),{isPresent:()=>["mounted","unmountSuspended"].includes(s()),setRef:a=>{a&&(r=getComputedStyle(a)),n(a)}}}function Z(e){return e?.animationName||"none"}function zn(e,t){const n=(s,o)=>t[s][o]??s,[r,i]=C(e);return[r,s=>{i(o=>n(o,s))}]}function qn(e){return t=>(e(t),()=>e(void 0))}/*!
 * Portions of this file are based on code from ariakit.
 * MIT Licensed, Copyright (c) Diego Haz.
 *
 * Credits to the ariakit team:
 * https://github.com/ariakit/ariakit/blob/8a13899ff807bbf39f3d89d2d5964042ba4d5287/packages/ariakit-react-utils/src/hooks.ts
 */function Gn(e,t){const[n,r]=C(ve(t?.()));return R(()=>{r(e()?.tagName.toLowerCase()||ve(t?.()))}),n}function ve(e){return Mn(e)?e:void 0}function le(e){const[t,n]=q(e,["asChild","as","children"]);if(!t.asChild)return d(te,O({get component(){return t.as}},n,{get children(){return t.children}}));const r=ke(()=>t.children);if(be(r())){const i=$e(n,r()?.props??{});return d(te,i)}if(Dn(r())){const i=r().find(be);if(i){const l=()=>d(J,{get each(){return r()},children:o=>d(D,{when:o===i,fallback:o,get children(){return i.props.children}})}),s=$e(n,i?.props??{});return d(te,O(s,{children:l}))}}throw new Error("[kobalte]: Component is expected to render `asChild` but no children `As` component was found.")}const Kn=Symbol("$$KobalteAsComponent");function be(e){return e?.[Kn]===!0}function $e(e,t){return In([e,t],{reverseEventHandlers:!0})}const Ie=Ge();function De(){const e=Ke(Ie);if(e===void 0)throw new Error("[kobalte]: `useCollapsibleContext` must be used within a `Collapsible.Root` component");return e}function Yn(e){let t;const n=De(),r=ae({id:n.generateId("content")},e),[i,l]=q(r,["ref","id","style"]),s=Wn(()=>n.shouldMount()),[o,a]=C(0),[c,p]=C(0);let _=n.isOpen()||s.isPresent(),f;return Ye(()=>{const u=requestAnimationFrame(()=>{_=!1});j(()=>{cancelAnimationFrame(u)})}),R(W([()=>s.isPresent()],()=>{if(!t)return;f=f||{transitionDuration:t.style.transitionDuration,animationName:t.style.animationName},t.style.transitionDuration="0s",t.style.animationName="none";const u=t.getBoundingClientRect();a(u.height),p(u.width),_||(t.style.transitionDuration=f.transitionDuration,t.style.animationName=f.animationName)})),R(()=>j(n.registerContentId(i.id))),d(D,{get when(){return s.isPresent()},get children(){return d(le,O({as:"div",ref(u){var m=Re(v=>{s.setRef(v),t=v},i.ref);typeof m=="function"&&m(u)},get id(){return i.id},get style(){return{"--kb-collapsible-content-height":o()?`${o()}px`:void 0,"--kb-collapsible-content-width":c()?`${c()}px`:void 0,...i.style}}},()=>n.dataset(),l))}})}function Zn(e){const t=`collapsible-${Ze()}`,n=ae({id:t},e),[r,i]=q(n,["open","defaultOpen","onOpenChange","disabled","forceMount"]),[l,s]=C(),o=Hn({open:()=>r.open,defaultOpen:()=>r.defaultOpen,onOpenChange:p=>r.onOpenChange?.(p)}),a=T(()=>({"data-expanded":o.isOpen()?"":void 0,"data-closed":o.isOpen()?void 0:"","data-disabled":r.disabled?"":void 0})),c={dataset:a,isOpen:o.isOpen,disabled:()=>r.disabled??!1,shouldMount:()=>r.forceMount||o.isOpen(),contentId:l,toggle:o.toggle,generateId:Un(()=>i.id),registerContentId:qn(s)};return d(Ie.Provider,{value:c,get children(){return d(le,O({as:"div"},a,i))}})}/*!
 * Portions of this file are based on code from ariakit
 * MIT Licensed, Copyright (c) Diego Haz.
 *
 * Credits to the ariakit team:
 * https://github.com/hope-ui/hope-ui/blob/54125b130195f37161dbeeea0c21dc3b198bc3ac/packages/core/src/button/is-button.ts
 */const Xn=["button","color","file","image","reset","submit"];function Jn(e){const t=e.tagName.toLowerCase();return t==="button"?!0:t==="input"&&e.type?Xn.indexOf(e.type)!==-1:!1}function Qn(e){let t;const n=ae({type:"button"},e),[r,i]=q(n,["ref","type","disabled"]),l=Gn(()=>t,()=>"button"),s=T(()=>{const c=l();return c==null?!1:Jn({tagName:c,type:r.type})}),o=T(()=>l()==="input"),a=T(()=>l()==="a"&&t?.getAttribute("href")!=null);return d(le,O({as:"button",ref(c){var p=Re(h=>t=h,r.ref);typeof p=="function"&&p(c)},get type(){return s()||o()?r.type:void 0},get role(){return!s()&&!a()?"button":void 0},get tabIndex(){return!s()&&!a()&&!r.disabled?0:void 0},get disabled(){return s()||o()?r.disabled:void 0},get"aria-disabled"(){return!s()&&!o()&&r.disabled?!0:void 0},get"data-disabled"(){return r.disabled?"":void 0}},i))}function er(e){const t=De(),[n,r]=q(e,["onClick"]);return d(Qn,O({get"aria-expanded"(){return t.isOpen()},get"aria-controls"(){return T(()=>!!t.isOpen())()?t.contentId():void 0},get disabled(){return t.disabled()},onClick:l=>{Fn(l,n.onClick),t.toggle()}},()=>t.dataset(),r))}var tr=x('<i class="fa-solid fa-chevron-down collapsible__trigger-icon">'),ye=x('<i class="fa-brands fa-github">'),nr=x('<main><div><!$><!/><div><div id=ContentWindow></div></div><div><i class="fa-solid fa-arrow-up"></i></div><!$><!/><!$><!/>');function rr(e){const t=Ae();function n(){let r=t.pathname.split("/maplibre-style-spec")[1];return typeof r=="string"?(r.endsWith("/")||(r=`${r}/`),r.startsWith("/")||(r=`/${r}`),r):""}return(()=>{var r=w(nr),i=r.firstChild,l=i.firstChild,[s,o]=P(l.nextSibling),a=s.nextSibling,c=a.firstChild,p=a.nextSibling,h=p.nextSibling,[_,f]=P(h.nextSibling),u=_.nextSibling,[m,v]=P(u.nextSibling);return E(i,d(Zn,{class:"collapsible",get children(){return[d(er,{class:"collapsible__trigger",get children(){return["Table of contents",w(tr)]}}),d(Yn,{class:"collapsible__content",get children(){return d(Oe,{mode:"small"})}})]}}),s,o),E(c,()=>e.children),p.$$click=()=>{document.documentElement.scrollTop=0},E(i,d(B,{get class(){return I.github_link},target:"_blank",href:"https://github.com/maplibre/maplibre-style-spec",get children(){return[w(ye)," MapLibre Style repository"]}}),_,f),E(i,d(B,{get class(){return I.github_link},target:"_blank",get href(){return`https://github.com/maplibre/maplibre-style-spec/blob/main/docs/src/routes${n()}index.tsx`},get children(){return[w(ye)," Edit page"]}}),m,v),L(g=>{var k=`${I.main_content_container} ${e.class}`,$=I.main_content_padding_container,S=I.row,A=I.doc_items,G=I.scroll_to_top;return k!==g.e&&y(r,g.e=k),$!==g.t&&y(i,g.t=$),S!==g.a&&y(a,g.a=S),A!==g.o&&y(c,g.o=A),G!==g.i&&y(p,g.i=G),g},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0}),U(),r})()}X(["click"]);const ir="_app_wrap_16weg_1",or="_container_16weg_9",sr="_Drawer_16weg_16",Ee={app_wrap:ir,container:or,Drawer:sr},ar="_overlay_1979p_1",lr="_closebtn_1979p_30",cr={overlay:ar,closebtn:lr},ur="_side_menu_button_vtaa5_2",dr="_header_vtaa5_13",pr="_logo_container_vtaa5_26",fr="_logo_vtaa5_26",hr="_title_container_vtaa5_39",mr="_title_vtaa5_39",V={side_menu_button:ur,header:dr,logo_container:pr,logo:fr,title_container:hr,title:mr};var _r=x('<header><div><i class="fa-solid fa-bars"></i></div><div><img alt=logo><div><span>Style Spec');const gr="/maplibre-style-spec/maplibre-logo-dark.svg";function we(){const e=dt();return(()=>{var t=w(_r),n=t.firstChild,r=n.nextSibling,i=r.firstChild,l=i.nextSibling,s=l.firstChild;return n.$$click=()=>{Me(o=>!o)},r.$$click=()=>{e("/")},Xe(i,"src",gr),L(o=>{var a=V.header,c=V.side_menu_button,p=V.logo_container,h=V.logo,_=V.title_container,f=V.title;return a!==o.e&&y(t,o.e=a),c!==o.t&&y(n,o.t=c),p!==o.a&&y(r,o.a=p),h!==o.o&&y(i,o.o=h),_!==o.i&&y(l,o.i=_),f!==o.n&&y(s,o.n=f),o},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0}),U(),t})()}X(["click"]);var vr=x("<div><div><!$><!/><ul>"),br=x("<div id=app_wrap><!$><!/><!$><!/><div><!$><!/><!$><!/><!$><!/>"),$r=x("<li>");const[yr,Me]=C(!1);function Er(e){return(()=>{var t=w(br),n=t.firstChild,[r,i]=P(n.nextSibling),l=r.nextSibling,[s,o]=P(l.nextSibling),a=s.nextSibling,c=a.firstChild,[p,h]=P(c.nextSibling),_=p.nextSibling,[f,u]=P(_.nextSibling),m=f.nextSibling,[v,g]=P(m.nextSibling);return E(t,d(D,{get when(){return yr()},get children(){var k=w(vr),$=k.firstChild,S=$.firstChild,[A,G]=P(S.nextSibling),Ve=A.nextSibling;return E($,d(we,{}),A,G),E(Ve,d(J,{each:Pe,children:Q=>(()=>{var ce=w($r);return E(ce,d(B,{onClick:()=>{Me(!1)},get classList(){return{"sidebar-link":!0,active:`/${Q.path}`===location.pathname}},get href(){return`/${Q.path}`},get children(){return Q.title}})),ce})()})),L(()=>y(k,cr.overlay)),k}}),r,i),E(t,d(we,{}),s,o),E(a,d(on,{}),p,h),E(a,d(rr,{get children(){return e.children}}),f,u),E(a,d(Oe,{mode:"large"}),v,g),L(k=>{var $=Ee.app_wrap,S=Ee.container;return $!==k.e&&y(t,k.e=$),S!==k.t&&y(a,k.t=S),k},{e:void 0,t:void 0}),t})()}function wr(){return d(tn,{get base(){return"/maplibre-style-spec"},root:e=>d(Ue,{get children(){return[d(Fe,{children:"MapLibre Style Spec"}),d(ue,{charset:"utf-8"}),d(ue,{name:"viewport",content:"width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"}),d(M,{href:"https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap",rel:"stylesheet"}),d(M,{rel:"icon",type:"image/x-icon",get href(){return"/maplibre-style-spec/favicon.ico"}}),d(M,{href:"https://unpkg.com/@fortawesome/fontawesome-free@6.4.0/css/fontawesome.css",rel:"stylesheet"}),d(M,{href:"https://unpkg.com/@fortawesome/fontawesome-free@6.4.0/css/brands.css",rel:"stylesheet"}),d(M,{href:"https://unpkg.com/@fortawesome/fontawesome-free@6.4.0/css/solid.css",rel:"stylesheet"}),d(M,{href:"/maplibre-style-spec/root.module.css",rel:"stylesheet"}),d(Er,{get children(){return d(Je,{get children(){return e.children}})}})]}}),get children(){return d(Ft,{})}})}var xr=x("<span style=font-size:1.5em;text-align:center;position:fixed;left:0px;bottom:55%;width:100%;>");const kr=e=>{const t="Error | Uncaught Client Exception";return d(Qe,{get fallback(){return[(()=>{var n=w(xr);return E(n,t),n})(),d(je,{code:500})]},get children(){return e.children}})};function Tr(e,t){return et(e,t)}function xe(e){return e.children}function Ar(){return d(xe,{get children(){return d(xe,{get children(){return d(kr,{get children(){return d(wr,{})}})}})}})}Tr(()=>d(Ar,{}),document.getElementById("app"));const Pr=void 0;export{Pr as default};
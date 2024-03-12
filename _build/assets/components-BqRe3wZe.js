import{I as T,b as m,d as te,y as k,x as K,f as A,n as ne,u as D,J as q,o as re,K as se,L as ae,c as oe,m as N,w as ce,g as ie,s as le,r as ue,t as fe}from"./web-Btggxc92.js";function he(){let e=new Set;function t(r){return e.add(r),()=>e.delete(r)}let n=!1;function s(r,a){if(n)return!(n=!1);const o={to:r,options:a,defaultPrevented:!1,preventDefault:()=>o.defaultPrevented=!0};for(const c of e)c.listener({...o,from:c.location,retry:i=>{i&&(n=!0),c.navigate(r,{...a,resolve:!1})}});return!o.defaultPrevented}return{subscribe:t,confirm:s}}let j;function U(){(!window.history.state||window.history.state._depth==null)&&window.history.replaceState({...window.history.state,_depth:window.history.length-1},""),j=window.history.state._depth}U();function ke(e){return{...e,_depth:window.history.state&&window.history.state._depth}}function Ie(e,t){let n=!1;return()=>{const s=j;U();const r=s==null?null:j-s;if(n){n=!1;return}r&&t(r)?(n=!0,window.history.go(-r)):e()}}const de=/^(?:[a-z0-9]+:)?\/\//i,pe=/^\/+|(\/)\/+$/g,ge="http://sr";function R(e,t=!1){const n=e.replace(pe,"$1");return n?t||/^[?#]/.test(n)?n:"/"+n:""}function S(e,t,n){if(de.test(t))return;const s=R(e),r=n&&R(n);let a="";return!r||t.startsWith("/")?a=s:r.toLowerCase().indexOf(s.toLowerCase())!==0?a=s+r:a=r,(a||"/")+R(t,!a)}function me(e,t){if(e==null)throw new Error(t);return e}function ve(e,t){return R(e).replace(/\/*(\*.*)?$/g,"")+R(t)}function z(e){const t={};return e.searchParams.forEach((n,s)=>{t[s]=n}),t}function ye(e,t,n){const[s,r]=e.split("/*",2),a=s.split("/").filter(Boolean),o=a.length;return c=>{const i=c.split("/").filter(Boolean),f=i.length-o;if(f<0||f>0&&r===void 0&&!t)return null;const u={path:o?"":"/",params:{}},g=h=>n===void 0?void 0:n[h];for(let h=0;h<o;h++){const p=a[h],v=i[h],x=p[0]===":",b=x?p.slice(1):p;if(x&&F(v,g(b)))u.params[b]=v;else if(x||!F(v,p))return null;u.path+=`/${v}`}if(r){const h=f?i.slice(-f).join("/"):"";if(F(h,g(r)))u.params[r]=h;else return null}return u}}function F(e,t){const n=s=>s.localeCompare(e,void 0,{sensitivity:"base"})===0;return t===void 0?!0:typeof t=="string"?n(t):typeof t=="function"?t(e):Array.isArray(t)?t.some(n):t instanceof RegExp?t.test(e):!1}function we(e){const[t,n]=e.pattern.split("/*",2),s=t.split("/").filter(Boolean);return s.reduce((r,a)=>r+(a.startsWith(":")?2:3),s.length-(n===void 0?0:1))}function Pe(e){const t=new Map,n=te();return new Proxy({},{get(s,r){return t.has(r)||T(n,()=>t.set(r,m(()=>e()[r]))),t.get(r)()},getOwnPropertyDescriptor(){return{enumerable:!0,configurable:!0}},ownKeys(){return Reflect.ownKeys(e())}})}function H(e){let t=/(\/?\:[^\/]+)\?/.exec(e);if(!t)return[e];let n=e.slice(0,t.index),s=e.slice(t.index+t[0].length);const r=[n,n+=t[1]];for(;t=/^(\/\:[^\/]+)\?/.exec(s);)r.push(n+=t[1]),s=s.slice(t[0].length);return H(s).reduce((a,o)=>[...a,...r.map(c=>c+o)],[])}const Re=100,xe=K(),J=K(),_=()=>me(k(xe),"<A> and 'use' router primitives can be only used inside a Route."),be=()=>k(J)||_().base,Ce=e=>{const t=be();return m(()=>t.resolvePath(e()))},Ee=e=>{const t=_();return m(()=>{const n=e();return n!==void 0?t.renderPath(n):n})},Me=()=>_().navigatorFactory(),Le=()=>_().location;function Ae(e,t=""){const{component:n,load:s,children:r,info:a}=e,o=!r||Array.isArray(r)&&!r.length,c={key:e,component:n,load:s,info:a};return X(e.path).reduce((i,f)=>{for(const u of H(f)){const g=ve(t,u);let h=o?g:g.split("/*",1)[0];h=h.split("/").map(p=>p.startsWith(":")||p.startsWith("*")?p:encodeURIComponent(p)).join("/"),i.push({...c,originalPath:u,pattern:h,matcher:ye(h,!o,e.matchFilters)})}return i},[])}function Se(e,t=0){return{routes:e,score:we(e[e.length-1])*1e4-t,matcher(n){const s=[];for(let r=e.length-1;r>=0;r--){const a=e[r],o=a.matcher(n);if(!o)return null;s.unshift({...o,route:a})}return s}}}function X(e){return Array.isArray(e)?e:[e]}function _e(e,t="",n=[],s=[]){const r=X(e);for(let a=0,o=r.length;a<o;a++){const c=r[a];if(c&&typeof c=="object"){c.hasOwnProperty("path")||(c.path="");const i=Ae(c,t);for(const f of i){n.push(f);const u=Array.isArray(c.children)&&c.children.length===0;if(c.children&&!u)_e(c.children,f.pattern,n,s);else{const g=Se([...n],s.length);s.push(g)}n.pop()}}}return n.length?s:s.sort((a,o)=>o.score-a.score)}function Oe(e,t){for(let n=0,s=e.length;n<s;n++){const r=e[n].matcher(t);if(r)return r}return[]}function Be(e,t){const n=new URL(ge),s=m(i=>{const f=e();try{return new URL(f,n)}catch{return console.error(`Invalid path ${f}`),i}},n,{equals:(i,f)=>i.href===f.href}),r=m(()=>s().pathname),a=m(()=>s().search,!0),o=m(()=>s().hash),c=()=>"";return{get pathname(){return r()},get search(){return a()},get hash(){return o()},get state(){return t()},get key(){return c()},query:Pe(re(a,()=>z(s())))}}let w;function We(e,t,n,s={}){const{signal:[r,a],utils:o={}}=e,c=o.parsePath||(l=>l),i=o.renderPath||(l=>l),f=o.beforeLeave||he(),u=S("",s.base||"");if(u===void 0)throw new Error(`${u} is not a valid base path`);u&&!r().value&&a({value:u,replace:!0,scroll:!1});const[g,h]=A(!1),p=async l=>{h(!0);try{await se(l)}finally{h(!1)}},[v,x]=A(r().value),[b,I]=A(r().state),G=Be(v,b),E=[],O=A([]),M={pattern:u,params:{},path:()=>u,outlet:()=>null,resolvePath(l){return S(u,l)}};return ne(()=>{const{value:l,state:d}=r();D(()=>{l!==v()&&p(()=>{w="native",x(l),I(d),q(),O[1]([])}).then(()=>{w=void 0})})}),{base:M,location:G,isRouting:g,renderPath:i,parsePath:c,navigatorFactory:V,beforeLeave:f,preloadRoute:Z,singleFlight:s.singleFlight===void 0?!0:s.singleFlight,submissions:O};function Q(l,d,P){D(()=>{if(typeof d=="number"){d&&(o.go?o.go(d):console.warn("Router integration does not support relative routing"));return}const{replace:B,resolve:$,scroll:C,state:L}={replace:!1,resolve:!0,scroll:!0,...P},y=$?l.resolvePath(d):S("",d);if(y===void 0)throw new Error(`Path '${d}' is not a routable path`);if(E.length>=Re)throw new Error("Too many redirects");const W=v();if((y!==W||L!==b())&&!ae){if(f.confirm(y,P)){const ee=E.push({value:W,replace:B,scroll:C,state:b()});p(()=>{w="navigate",x(y),I(L),q(),O[1]([])}).then(()=>{E.length===ee&&(w=void 0,Y({value:y,state:L}))})}}})}function V(l){return l=l||k(J)||M,(d,P)=>Q(l,d,P)}function Y(l){const d=E[0];d&&((l.value!==d.value||l.state!==d.state)&&a({...l,replace:d.replace,scroll:d.scroll}),E.length=0)}function Z(l,d){const P=Oe(n(),l.pathname),B=w;w="preload";for(let $ in P){const{route:C,params:L}=P[$];C.component&&C.component.preload&&C.component.preload();const{load:y}=C;d&&y&&T(t(),()=>y({params:L,location:{pathname:l.pathname,search:l.search,hash:l.hash,query:z(l),state:null,key:""},intent:"preload"}))}w=B}}function De(e,t,n,s,r){const{base:a,location:o}=e,{pattern:c,component:i,load:f}=s().route,u=m(()=>s().path);i&&i.preload&&i.preload();const g=f?f({params:r,location:o,intent:w||"initial"}):void 0;return{parent:t,pattern:c,path:u,params:r,outlet:()=>i?oe(i,{params:r,location:o,data:g,get children(){return n()}}):n(),resolvePath(p){return S(a.path(),p,u())}}}var $e=fe("<a>");function qe(e){e=N({inactiveClass:"inactive",activeClass:"active"},e);const[,t]=ce(e,["href","state","class","activeClass","inactiveClass","end"]),n=Ce(()=>e.href),s=Ee(n),r=Le(),a=m(()=>{const o=n();if(o===void 0)return[!1,!1];const c=R(o.split(/[?#]/,1)[0]).toLowerCase(),i=R(r.pathname).toLowerCase();return[e.end?c===i:i.startsWith(c),c===i]});return(()=>{var o=ie($e);return le(o,N(t,{get href(){return s()||e.href},get state(){return JSON.stringify(e.state)},get classList(){return{...e.class&&{[e.class]:!0},[e.inactiveClass]:!a()[0],[e.activeClass]:a()[0],...t.classList}},link:"",get"aria-current"(){return a()[1]?"page":void 0}}),!1,!1),ue(),o})()}export{qe as A,xe as R,We as a,Pe as b,_e as c,J as d,De as e,he as f,Oe as g,Me as h,ke as k,ge as m,Ie as n,U as s,Le as u};

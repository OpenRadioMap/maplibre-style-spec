const a={context:void 0,registry:void 0};function M(e){a.context=e}function Ie(){return{...a.context,id:`${a.context.id}${a.context.count++}-`,count:0}}const Ve=(e,t)=>e===t,z=Symbol("solid-proxy"),De=Symbol("solid-track"),Z={equals:Ve};let K=null,Ce=Te;const j=1,X=2,Oe={owned:null,cleanups:null,context:null,owner:null},re={};var g=null;let c=null,Fe=null,w=null,O=null,A=null,ne=0;function Y(e,t){const n=w,s=g,i=e.length===0,r=t===void 0?s:t,o=i?Oe:{owned:null,cleanups:null,context:r?r.context:null,owner:r},l=i?e:()=>e(()=>E(()=>F(o)));g=o,w=null;try{return v(l,!0)}finally{w=n,g=s}}function I(e,t){t=t?Object.assign({},Z,t):Z;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=i=>(typeof i=="function"&&(c&&c.running&&c.sources.has(n)?i=i(n.tValue):i=i(n.value)),ke(n,i));return[Pe.bind(n),s]}function ge(e,t,n){const s=W(e,t,!0,j);G(s)}function H(e,t,n){const s=W(e,t,!1,j);G(s)}function He(e,t,n){Ce=Xe;const s=W(e,t,!1,j),i=B&&de(B);i&&(s.suspense=i),(!n||!n.render)&&(s.user=!0),A?A.push(s):G(s)}function k(e,t,n){n=n?Object.assign({},Z,n):Z;const s=W(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,G(s),Pe.bind(s)}function Be(e){return e&&typeof e=="object"&&"then"in e}function _e(e,t,n){let s,i,r;arguments.length===2&&typeof t=="object"||arguments.length===1?(s=!0,i=e,r=t||{}):(s=e,i=t,r=n||{});let o=null,l=re,f=null,d=!1,u=!1,h="initialValue"in r,y=typeof s=="function"&&k(s);const m=new Set,[S,$]=(r.storage||I)(r.initialValue),[T,N]=I(void 0),[C,P]=I(void 0,{equals:!1}),[L,V]=I(h?"ready":"unresolved");if(a.context){f=`${a.context.id}${a.context.count++}`;let p;r.ssrLoadFrom==="initial"?l=r.initialValue:a.load&&(p=a.load(f))&&(l=p)}function D(p,b,x,_){return o===p&&(o=null,_!==void 0&&(h=!0),(p===l||b===l)&&r.onHydrated&&queueMicrotask(()=>r.onHydrated(_,{value:b})),l=re,c&&p&&d?(c.promises.delete(p),d=!1,v(()=>{c.running=!0,he(b,x)},!1)):he(b,x)),b}function he(p,b){v(()=>{b===void 0&&$(()=>p),V(b!==void 0?"errored":h?"ready":"unresolved"),N(b);for(const x of m.keys())x.decrement();m.clear()},!1)}function se(){const p=B&&de(B),b=S(),x=T();if(x!==void 0&&!o)throw x;return w&&!w.user&&p&&ge(()=>{C(),o&&(p.resolved&&c&&d?c.promises.add(o):m.has(p)||(p.increment(),m.add(p)))}),b}function ie(p=!0){if(p!==!1&&u)return;u=!1;const b=y?y():s;if(d=c&&c.running,b==null||b===!1){D(o,E(S));return}c&&o&&c.promises.delete(o);const x=l!==re?l:E(()=>i(b,{value:S(),refetching:p}));return Be(x)?(o=x,"value"in x?(x.status==="success"?D(o,x.value,void 0,b):D(o,void 0,void 0,b),x):(u=!0,queueMicrotask(()=>u=!1),v(()=>{V(h?"refreshing":"pending"),P()},!1),x.then(_=>D(x,_,void 0,b),_=>D(x,void 0,ve(_),b)))):(D(o,x,void 0,b),x)}return Object.defineProperties(se,{state:{get:()=>L()},error:{get:()=>T()},loading:{get(){const p=L();return p==="pending"||p==="refreshing"}},latest:{get(){if(!h)return se();const p=T();if(p&&!o)throw p;return S()}}}),y?ge(()=>ie(!1)):ie(!1),[se,{refetch:ie,mutate:$}]}function E(e){if(w===null)return e();const t=w;w=null;try{return e()}finally{w=t}}function Lt(e,t,n){const s=Array.isArray(e);let i,r=n&&n.defer;return o=>{let l;if(s){l=Array(e.length);for(let d=0;d<e.length;d++)l[d]=e[d]()}else l=e();if(r)return r=!1,o;const f=E(()=>t(l,i,o));return i=l,f}}function vt(e){He(()=>E(e))}function ae(e){return g===null||(g.cleanups===null?g.cleanups=[e]:g.cleanups.push(e)),e}function qe(e,t){K||(K=Symbol("error")),g=W(void 0,void 0,!0),g.context={...g.context,[K]:[t]},c&&c.running&&c.sources.add(g);try{return e()}catch(n){J(n)}finally{g=g.owner}}function Re(){return g}function jt(e,t){const n=g,s=w;g=e,w=null;try{return v(t,!0)}catch(i){J(i)}finally{g=n,w=s}}function Mt(e){if(c&&c.running)return e(),c.done;const t=w,n=g;return Promise.resolve().then(()=>{w=t,g=n;let s;return B&&(s=c||(c={sources:new Set,effects:[],promises:new Set,disposed:new Set,queue:new Set,running:!0}),s.done||(s.done=new Promise(i=>s.resolve=i)),s.running=!0),v(e,!1),w=g=null,s?s.done:void 0})}const[It,ye]=I(!1);function Ue(e){A.push.apply(A,e),e.length=0}function $e(e,t){const n=Symbol("context");return{id:n,Provider:We(n),defaultValue:e}}function de(e){return g&&g.context&&g.context[e.id]!==void 0?g.context[e.id]:e.defaultValue}function Ge(e){const t=k(e),n=k(()=>oe(t()));return n.toArray=()=>{const s=n();return Array.isArray(s)?s:s!=null?[s]:[]},n}let B;function Ke(){return B||(B=$e())}function Pe(){const e=c&&c.running;if(this.sources&&(e?this.tState:this.state))if((e?this.tState:this.state)===j)G(this);else{const t=O;O=null,v(()=>te(this),!1),O=t}if(w){const t=this.observers?this.observers.length:0;w.sources?(w.sources.push(this),w.sourceSlots.push(t)):(w.sources=[this],w.sourceSlots=[t]),this.observers?(this.observers.push(w),this.observerSlots.push(w.sources.length-1)):(this.observers=[w],this.observerSlots=[w.sources.length-1])}return e&&c.sources.has(this)?this.tValue:this.value}function ke(e,t,n){let s=c&&c.running&&c.sources.has(e)?e.tValue:e.value;if(!e.comparator||!e.comparator(s,t)){if(c){const i=c.running;(i||!n&&c.sources.has(e))&&(c.sources.add(e),e.tValue=t),i||(e.value=t)}else e.value=t;e.observers&&e.observers.length&&v(()=>{for(let i=0;i<e.observers.length;i+=1){const r=e.observers[i],o=c&&c.running;o&&c.disposed.has(r)||((o?!r.tState:!r.state)&&(r.pure?O.push(r):A.push(r),r.observers&&Ne(r)),o?r.tState=j:r.state=j)}if(O.length>1e6)throw O=[],new Error},!1)}return t}function G(e){if(!e.fn)return;F(e);const t=ne;we(e,c&&c.running&&c.sources.has(e)?e.tValue:e.value,t),c&&!c.running&&c.sources.has(e)&&queueMicrotask(()=>{v(()=>{c&&(c.running=!0),w=g=e,we(e,e.tValue,t),w=g=null},!1)})}function we(e,t,n){let s;const i=g,r=w;w=g=e;try{s=e.fn(t)}catch(o){return e.pure&&(c&&c.running?(e.tState=j,e.tOwned&&e.tOwned.forEach(F),e.tOwned=void 0):(e.state=j,e.owned&&e.owned.forEach(F),e.owned=null)),e.updatedAt=n+1,J(o)}finally{w=r,g=i}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?ke(e,s,!0):c&&c.running&&e.pure?(c.sources.add(e),e.tValue=s):e.value=s,e.updatedAt=n)}function W(e,t,n,s=j,i){const r={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:g,context:g?g.context:null,pure:n};return c&&c.running&&(r.state=0,r.tState=s),g===null||g!==Oe&&(c&&c.running&&g.pure?g.tOwned?g.tOwned.push(r):g.tOwned=[r]:g.owned?g.owned.push(r):g.owned=[r]),r}function ee(e){const t=c&&c.running;if((t?e.tState:e.state)===0)return;if((t?e.tState:e.state)===X)return te(e);if(e.suspense&&E(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<ne);){if(t&&c.disposed.has(e))return;(t?e.tState:e.state)&&n.push(e)}for(let s=n.length-1;s>=0;s--){if(e=n[s],t){let i=e,r=n[s+1];for(;(i=i.owner)&&i!==r;)if(c.disposed.has(i))return}if((t?e.tState:e.state)===j)G(e);else if((t?e.tState:e.state)===X){const i=O;O=null,v(()=>te(e,n[0]),!1),O=i}}}function v(e,t){if(O)return e();let n=!1;t||(O=[]),A?n=!0:A=[],ne++;try{const s=e();return Ye(n),s}catch(s){n||(A=null),O=null,J(s)}}function Ye(e){if(O&&(Te(O),O=null),e)return;let t;if(c){if(!c.promises.size&&!c.queue.size){const s=c.sources,i=c.disposed;A.push.apply(A,c.effects),t=c.resolve;for(const r of A)"tState"in r&&(r.state=r.tState),delete r.tState;c=null,v(()=>{for(const r of i)F(r);for(const r of s){if(r.value=r.tValue,r.owned)for(let o=0,l=r.owned.length;o<l;o++)F(r.owned[o]);r.tOwned&&(r.owned=r.tOwned),delete r.tValue,delete r.tOwned,r.tState=0}ye(!1)},!1)}else if(c.running){c.running=!1,c.effects.push.apply(c.effects,A),A=null,ye(!0);return}}const n=A;A=null,n.length&&v(()=>Ce(n),!1),t&&t()}function Te(e){for(let t=0;t<e.length;t++)ee(e[t])}function Xe(e){let t,n=0;for(t=0;t<e.length;t++){const s=e[t];s.user?e[n++]=s:ee(s)}if(a.context){if(a.count){a.effects||(a.effects=[]),a.effects.push(...e.slice(0,n));return}else a.effects&&(e=[...a.effects,...e],n+=a.effects.length,delete a.effects);M()}for(t=0;t<n;t++)ee(e[t])}function te(e,t){const n=c&&c.running;n?e.tState=0:e.state=0;for(let s=0;s<e.sources.length;s+=1){const i=e.sources[s];if(i.sources){const r=n?i.tState:i.state;r===j?i!==t&&(!i.updatedAt||i.updatedAt<ne)&&ee(i):r===X&&te(i,t)}}}function Ne(e){const t=c&&c.running;for(let n=0;n<e.observers.length;n+=1){const s=e.observers[n];(t?!s.tState:!s.state)&&(t?s.tState=X:s.state=X,s.pure?O.push(s):A.push(s),s.observers&&Ne(s))}}function F(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const r=i.pop(),o=n.observerSlots.pop();s<i.length&&(r.sourceSlots[o]=s,i[s]=r,n.observerSlots[s]=o)}}if(c&&c.running&&e.pure){if(e.tOwned){for(t=e.tOwned.length-1;t>=0;t--)F(e.tOwned[t]);delete e.tOwned}Le(e,!0)}else if(e.owned){for(t=e.owned.length-1;t>=0;t--)F(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}c&&c.running?e.tState=0:e.state=0}function Le(e,t){if(t||(e.tState=0,c.disposed.add(e)),e.owned)for(let n=0;n<e.owned.length;n++)Le(e.owned[n])}function ve(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function me(e,t,n){try{for(const s of t)s(e)}catch(s){J(s,n&&n.owner||null)}}function J(e,t=g){const n=K&&t&&t.context&&t.context[K],s=ve(e);if(!n)throw s;A?A.push({fn(){me(s,n,t)},state:j}):me(s,n,t)}function oe(e){if(typeof e=="function"&&!e.length)return oe(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const s=oe(e[n]);Array.isArray(s)?t.push.apply(t,s):t.push(s)}return t}return e}function We(e,t){return function(s){let i;return H(()=>i=E(()=>(g.context={...g.context,[e]:s.value},Ge(()=>s.children))),void 0),i}}const Je=Symbol("fallback");function pe(e){for(let t=0;t<e.length;t++)e[t]()}function Qe(e,t,n={}){let s=[],i=[],r=[],o=0,l=t.length>1?[]:null;return ae(()=>pe(r)),()=>{let f=e()||[],d,u;return f[De],E(()=>{let y=f.length,m,S,$,T,N,C,P,L,V;if(y===0)o!==0&&(pe(r),r=[],s=[],i=[],o=0,l&&(l=[])),n.fallback&&(s=[Je],i[0]=Y(D=>(r[0]=D,n.fallback())),o=1);else if(o===0){for(i=new Array(y),u=0;u<y;u++)s[u]=f[u],i[u]=Y(h);o=y}else{for($=new Array(y),T=new Array(y),l&&(N=new Array(y)),C=0,P=Math.min(o,y);C<P&&s[C]===f[C];C++);for(P=o-1,L=y-1;P>=C&&L>=C&&s[P]===f[L];P--,L--)$[L]=i[P],T[L]=r[P],l&&(N[L]=l[P]);for(m=new Map,S=new Array(L+1),u=L;u>=C;u--)V=f[u],d=m.get(V),S[u]=d===void 0?-1:d,m.set(V,u);for(d=C;d<=P;d++)V=s[d],u=m.get(V),u!==void 0&&u!==-1?($[u]=i[d],T[u]=r[d],l&&(N[u]=l[d]),u=S[u],m.set(V,u)):r[d]();for(u=C;u<y;u++)u in $?(i[u]=$[u],r[u]=T[u],l&&(l[u]=N[u],l[u](u))):i[u]=Y(h);i=i.slice(0,o=y),s=f.slice(0)}return i});function h(y){if(r[u]=y,l){const[m,S]=I(u);return l[u]=S,t(f[u],m)}return t(f[u])}}}let je=!1;function ze(){je=!0}function Ze(e,t){if(je&&a.context){const n=a.context;M(Ie());const s=E(()=>e(t||{}));return M(n),s}return E(()=>e(t||{}))}function Q(){return!0}const fe={get(e,t,n){return t===z?n:e.get(t)},has(e,t){return t===z?!0:e.has(t)},set:Q,deleteProperty:Q,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:Q,deleteProperty:Q}},ownKeys(e){return e.keys()}};function le(e){return(e=typeof e=="function"?e():e)?e:{}}function et(){for(let e=0,t=this.length;e<t;++e){const n=this[e]();if(n!==void 0)return n}}function Vt(...e){let t=!1;for(let o=0;o<e.length;o++){const l=e[o];t=t||!!l&&z in l,e[o]=typeof l=="function"?(t=!0,k(l)):l}if(t)return new Proxy({get(o){for(let l=e.length-1;l>=0;l--){const f=le(e[l])[o];if(f!==void 0)return f}},has(o){for(let l=e.length-1;l>=0;l--)if(o in le(e[l]))return!0;return!1},keys(){const o=[];for(let l=0;l<e.length;l++)o.push(...Object.keys(le(e[l])));return[...new Set(o)]}},fe);const n={},s=Object.create(null);for(let o=e.length-1;o>=0;o--){const l=e[o];if(!l)continue;const f=Object.getOwnPropertyNames(l);for(let d=f.length-1;d>=0;d--){const u=f[d];if(u==="__proto__"||u==="constructor")continue;const h=Object.getOwnPropertyDescriptor(l,u);if(!s[u])s[u]=h.get?{enumerable:!0,configurable:!0,get:et.bind(n[u]=[h.get.bind(l)])}:h.value!==void 0?h:void 0;else{const y=n[u];y&&(h.get?y.push(h.get.bind(l)):h.value!==void 0&&y.push(()=>h.value))}}}const i={},r=Object.keys(s);for(let o=r.length-1;o>=0;o--){const l=r[o],f=s[l];f&&f.get?Object.defineProperty(i,l,f):i[l]=f?f.value:void 0}return i}function tt(e,...t){if(z in e){const i=new Set(t.length>1?t.flat():t[0]),r=t.map(o=>new Proxy({get(l){return o.includes(l)?e[l]:void 0},has(l){return o.includes(l)&&l in e},keys(){return o.filter(l=>l in e)}},fe));return r.push(new Proxy({get(o){return i.has(o)?void 0:e[o]},has(o){return i.has(o)?!1:o in e},keys(){return Object.keys(e).filter(o=>!i.has(o))}},fe)),r}const n={},s=t.map(()=>({}));for(const i of Object.getOwnPropertyNames(e)){const r=Object.getOwnPropertyDescriptor(e,i),o=!r.get&&!r.set&&r.enumerable&&r.writable&&r.configurable;let l=!1,f=0;for(const d of t)d.includes(i)&&(l=!0,o?s[f][i]=r.value:Object.defineProperty(s[f],i,r)),++f;l||(o?n[i]=r.value:Object.defineProperty(n,i,r))}return[...s,n]}function Dt(e){let t,n;const s=i=>{const r=a.context;if(r){const[l,f]=I();a.count||(a.count=0),a.count++,(n||(n=e())).then(d=>{M(r),a.count--,f(()=>d.default),M()}),t=l}else if(!t){const[l]=_e(()=>(n||(n=e())).then(f=>f.default));t=l}let o;return k(()=>(o=t())&&E(()=>{if(!r)return o(i);const l=a.context;M(r);const f=o(i);return M(l),f}))};return s.preload=()=>n||((n=e()).then(i=>t=()=>i.default),n),s}let nt=0;function Ft(){const e=a.context;return e?`${e.id}${e.count++}`:`cl-${nt++}`}const st=e=>`Stale read from <${e}>.`;function Ht(e){const t="fallback"in e&&{fallback:()=>e.fallback};return k(Qe(()=>e.each,e.children,t||void 0))}function Bt(e){const t=e.keyed,n=k(()=>e.when,void 0,{equals:(s,i)=>t?s===i:!s==!i});return k(()=>{const s=n();if(s){const i=e.children;return typeof i=="function"&&i.length>0?E(()=>i(t?s:()=>{if(!E(n))throw st("Show");return e.when})):i}return e.fallback},void 0,void 0)}let R;function _t(){R&&[...R].forEach(e=>e())}function qt(e){let t;a.context&&a.load&&(t=a.load(a.context.id+a.context.count));const[n,s]=I(t,void 0);return R||(R=new Set),R.add(s),ae(()=>R.delete(s)),k(()=>{let i;if(i=n()){const r=e.fallback;return typeof r=="function"&&r.length?E(()=>r(i,()=>s())):r}return qe(()=>e.children,s)},void 0,void 0)}const it=$e();function Rt(e){let t=0,n,s,i,r,o;const[l,f]=I(!1),d=Ke(),u={increment:()=>{++t===1&&f(!0)},decrement:()=>{--t===0&&f(!1)},inFallback:l,effects:[],resolved:!1},h=Re();if(a.context&&a.load){const S=a.context.id+a.context.count;let $=a.load(S);if($&&(typeof $!="object"||$.status!=="success"?i=$:a.gather(S)),i&&i!=="$$f"){const[T,N]=I(void 0,{equals:!1});r=T,i.then(()=>{if(a.done)return N();a.gather(S),M(s),N(),M()},C=>{o=C,N()})}}const y=de(it);y&&(n=y.register(u.inFallback));let m;return ae(()=>m&&m()),Ze(d.Provider,{value:u,get children(){return k(()=>{if(o)throw o;if(s=a.context,r)return r(),r=void 0;s&&i==="$$f"&&M();const S=k(()=>e.children);return k($=>{const T=u.inFallback(),{showContent:N=!0,showFallback:C=!0}=n?n():{};if((!T||i&&i!=="$$f")&&N)return u.resolved=!0,m&&m(),m=s=i=void 0,Ue(u.effects),S();if(C)return m?$:Y(P=>(m=P,s&&(M({id:s.id+"f",count:0}),s=void 0),e.fallback),h)})})}})}const rt=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],lt=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...rt]),ot=new Set(["innerHTML","textContent","innerText","children"]),ft=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),ut=Object.assign(Object.create(null),{class:"className",formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1}});function ct(e,t){const n=ut[e];return typeof n=="object"?n[t]?n.$:void 0:n}const at=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),dt=new Set(["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","switch","symbol","text","textPath","tref","tspan","use","view","vkern"]),ht={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function gt(e,t,n){let s=n.length,i=t.length,r=s,o=0,l=0,f=t[i-1].nextSibling,d=null;for(;o<i||l<r;){if(t[o]===n[l]){o++,l++;continue}for(;t[i-1]===n[r-1];)i--,r--;if(i===o){const u=r<s?l?n[l-1].nextSibling:n[r-l]:f;for(;l<r;)e.insertBefore(n[l++],u)}else if(r===l)for(;o<i;)(!d||!d.has(t[o]))&&t[o].remove(),o++;else if(t[o]===n[r-1]&&n[l]===t[i-1]){const u=t[--i].nextSibling;e.insertBefore(n[l++],t[o++].nextSibling),e.insertBefore(n[--r],u),t[i]=n[r]}else{if(!d){d=new Map;let h=l;for(;h<r;)d.set(n[h],h++)}const u=d.get(t[o]);if(u!=null)if(l<u&&u<r){let h=o,y=1,m;for(;++h<i&&h<r&&!((m=d.get(t[h]))==null||m!==u+y);)y++;if(y>u-l){const S=t[o];for(;l<u;)e.insertBefore(n[l++],S)}else e.replaceChild(n[l++],t[o++])}else o++;else t[o++].remove()}}}const be="_$DX_DELEGATE";function yt(e,t,n,s={}){let i;return Y(r=>{i=r,t===document?e():Et(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{i(),t.textContent=""}}function Ut(e,t,n){let s;const i=()=>{const o=document.createElement("template");return o.innerHTML=e,n?o.content.firstChild.firstChild:o.content.firstChild},r=t?()=>E(()=>document.importNode(s||(s=i()),!0)):()=>(s||(s=i())).cloneNode(!0);return r.cloneNode=r,r}function wt(e,t=window.document){const n=t[be]||(t[be]=new Set);for(let s=0,i=e.length;s<i;s++){const r=e[s];n.has(r)||(n.add(r),t.addEventListener(r,Me))}}function Gt(e,t,n){a.context&&e.isConnected||(e[t]=n)}function ue(e,t,n){a.context&&e.isConnected||(n==null?e.removeAttribute(t):e.setAttribute(t,n))}function mt(e,t,n,s){a.context&&e.isConnected||(s==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,s))}function pt(e,t){a.context&&e.isConnected||(t==null?e.removeAttribute("class"):e.className=t)}function bt(e,t,n,s){if(s)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const i=n[0];e.addEventListener(t,n[0]=r=>i.call(e,n[1],r))}else e.addEventListener(t,n)}function xt(e,t,n={}){const s=Object.keys(t||{}),i=Object.keys(n);let r,o;for(r=0,o=i.length;r<o;r++){const l=i[r];!l||l==="undefined"||t[l]||(xe(e,l,!1),delete n[l])}for(r=0,o=s.length;r<o;r++){const l=s[r],f=!!t[l];!l||l==="undefined"||n[l]===f||!f||(xe(e,l,!0),n[l]=f)}return n}function St(e,t,n){if(!t)return n?ue(e,"style"):t;const s=e.style;if(typeof t=="string")return s.cssText=t;typeof n=="string"&&(s.cssText=n=void 0),n||(n={}),t||(t={});let i,r;for(r in n)t[r]==null&&s.removeProperty(r),delete n[r];for(r in t)i=t[r],i!==n[r]&&(s.setProperty(r,i),n[r]=i);return n}function At(e,t={},n,s){const i={};return s||H(()=>i.children=U(e,t.children,i.children)),H(()=>t.ref&&t.ref(e)),H(()=>Ct(e,t,n,!0,i,!0)),i}function Kt(e,t,n){return E(()=>e(t,n))}function Et(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return U(e,t,s,n);H(i=>U(e,t(),i,n),s)}function Ct(e,t,n,s,i={},r=!1){t||(t={});for(const o in i)if(!(o in t)){if(o==="children")continue;i[o]=Se(e,o,null,i[o],n,r)}for(const o in t){if(o==="children"){s||U(e,t.children);continue}const l=t[o];i[o]=Se(e,o,l,i[o],n,r)}}function Ot(e,t,n={}){a.completed=globalThis._$HY.completed,a.events=globalThis._$HY.events,a.load=i=>globalThis._$HY.r[i],a.has=i=>i in globalThis._$HY.r,a.gather=i=>Ee(t,i),a.registry=new Map,a.context={id:n.renderId||"",count:0},Ee(t,n.renderId);const s=yt(e,t,[...t.childNodes],n);return a.context=null,s}function $t(e){let t,n;return!a.context||!(t=a.registry.get(n=kt()))?e():(a.completed&&a.completed.add(t),a.registry.delete(n),t)}function Yt(e){let t=e,n=0,s=[];if(a.context)for(;t;){if(t.nodeType===8){const i=t.nodeValue;if(i==="$")n++;else if(i==="/"){if(n===0)return[t,s];n--}}s.push(t),t=t.nextSibling}return[t,s]}function Xt(){a.events&&!a.events.queued&&(queueMicrotask(()=>{const{completed:e,events:t}=a;for(t.queued=!1;t.length;){const[n,s]=t[0];if(!e.has(n))return;Me(s),t.shift()}}),a.events.queued=!0)}function Pt(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function xe(e,t,n){const s=t.trim().split(/\s+/);for(let i=0,r=s.length;i<r;i++)e.classList.toggle(s[i],n)}function Se(e,t,n,s,i,r){let o,l,f,d,u;if(t==="style")return St(e,n,s);if(t==="classList")return xt(e,n,s);if(n===s)return s;if(t==="ref")r||n(e);else if(t.slice(0,3)==="on:"){const h=t.slice(3);s&&e.removeEventListener(h,s),n&&e.addEventListener(h,n)}else if(t.slice(0,10)==="oncapture:"){const h=t.slice(10);s&&e.removeEventListener(h,s,!0),n&&e.addEventListener(h,n,!0)}else if(t.slice(0,2)==="on"){const h=t.slice(2).toLowerCase(),y=at.has(h);if(!y&&s){const m=Array.isArray(s)?s[0]:s;e.removeEventListener(h,m)}(y||n)&&(bt(e,h,n,y),y&&wt([h]))}else if(t.slice(0,5)==="attr:")ue(e,t.slice(5),n);else if((u=t.slice(0,5)==="prop:")||(f=ot.has(t))||!i&&((d=ct(t,e.tagName))||(l=lt.has(t)))||(o=e.nodeName.includes("-"))){if(u)t=t.slice(5),l=!0;else if(a.context&&e.isConnected)return n;t==="class"||t==="className"?pt(e,n):o&&!l&&!f?e[Pt(t)]=n:e[d||t]=n}else{const h=i&&t.indexOf(":")>-1&&ht[t.split(":")[0]];h?mt(e,h,t,n):ue(e,ft[t]||t,n)}return n}function Me(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),a.registry&&!a.done&&(a.done=_$HY.done=!0);n;){const s=n[t];if(s&&!n.disabled){const i=n[`${t}Data`];if(i!==void 0?s.call(n,i,e):s.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function U(e,t,n,s,i){const r=!!a.context&&e.isConnected;if(r){!n&&(n=[...e.childNodes]);let f=[];for(let d=0;d<n.length;d++){const u=n[d];u.nodeType===8&&u.data.slice(0,2)==="!$"?u.remove():f.push(u)}n=f}for(;typeof n=="function";)n=n();if(t===n)return n;const o=typeof t,l=s!==void 0;if(e=l&&n[0]&&n[0].parentNode||e,o==="string"||o==="number"){if(r)return n;if(o==="number"&&(t=t.toString()),l){let f=n[0];f&&f.nodeType===3?f.data!==t&&(f.data=t):f=document.createTextNode(t),n=q(e,n,s,f)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||o==="boolean"){if(r)return n;n=q(e,n,s)}else{if(o==="function")return H(()=>{let f=t();for(;typeof f=="function";)f=f();n=U(e,f,n,s)}),()=>n;if(Array.isArray(t)){const f=[],d=n&&Array.isArray(n);if(ce(f,t,n,i))return H(()=>n=U(e,f,n,s,!0)),()=>n;if(r){if(!f.length)return n;if(s===void 0)return[...e.childNodes];let u=f[0],h=[u];for(;(u=u.nextSibling)!==s;)h.push(u);return n=h}if(f.length===0){if(n=q(e,n,s),l)return n}else d?n.length===0?Ae(e,f,s):gt(e,n,f):(n&&q(e),Ae(e,f));n=f}else if(t.nodeType){if(r&&t.parentNode)return n=l?[t]:t;if(Array.isArray(n)){if(l)return n=q(e,n,s,t);q(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function ce(e,t,n,s){let i=!1;for(let r=0,o=t.length;r<o;r++){let l=t[r],f=n&&n[e.length],d;if(!(l==null||l===!0||l===!1))if((d=typeof l)=="object"&&l.nodeType)e.push(l);else if(Array.isArray(l))i=ce(e,l,f)||i;else if(d==="function")if(s){for(;typeof l=="function";)l=l();i=ce(e,Array.isArray(l)?l:[l],Array.isArray(f)?f:[f])||i}else e.push(l),i=!0;else{const u=String(l);f&&f.nodeType===3&&f.data===u?e.push(f):e.push(document.createTextNode(u))}}return i}function Ae(e,t,n=null){for(let s=0,i=t.length;s<i;s++)e.insertBefore(t[s],n)}function q(e,t,n,s){if(n===void 0)return e.textContent="";const i=s||document.createTextNode("");if(t.length){let r=!1;for(let o=t.length-1;o>=0;o--){const l=t[o];if(i!==l){const f=l.parentNode===e;!r&&!o?f?e.replaceChild(i,l):e.insertBefore(i,n):f&&l.remove()}else r=!0}}else e.insertBefore(i,n);return[i]}function Ee(e,t){const n=e.querySelectorAll("*[data-hk]");for(let s=0;s<n.length;s++){const i=n[s],r=i.getAttribute("data-hk");(!t||r.startsWith(t))&&!a.registry.has(r)&&a.registry.set(r,i)}}function kt(){const e=a.context;return`${e.id}${e.count++}`}const Wt=()=>{},Jt=!1,Tt="http://www.w3.org/2000/svg";function Nt(e,t=!1){return t?document.createElementNS(Tt,e):document.createElement(e)}const Qt=(...e)=>(ze(),Ot(...e));function zt(e){const[t,n]=tt(e,["component"]),s=k(()=>t.component);return k(()=>{const i=s();switch(typeof i){case"function":return E(()=>i(n));case"string":const r=dt.has(i),o=a.context?$t():Nt(i,r);return At(o,n,r),o}})}export{z as $,Ft as A,ue as B,Rt as C,zt as D,qt as E,Ht as F,Qt as G,a as H,jt as I,_t as J,Mt as K,Jt as L,Wt as M,Gt as N,Bt as S,Ge as a,k as b,Ze as c,Re as d,Y as e,I as f,$t as g,ae as h,Et as i,wt as j,Yt as k,Dt as l,Vt as m,H as n,Lt as o,pt as p,He as q,Xt as r,At as s,Ut as t,E as u,Kt as v,tt as w,$e as x,de as y,vt as z};

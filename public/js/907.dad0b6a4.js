"use strict";(self["webpackChunkpoderjudicial"]=self["webpackChunkpoderjudicial"]||[]).push([[907],{9007:(r,t,a)=>{a.d(t,{LP:()=>s,nJ:()=>u,GJ:()=>c,IU:()=>l,xJ:()=>d,uf:()=>p});var e=a(5474),n=a(1959);a(6395);let o=(0,n.iH)(null);(0,n.iH)(!1);function s(){return u()?null:o.value.access_token}function i(){return o.value.userdata}function u(){return!o.value}function c(){return!u()&&(1===i().admin||!0===i().admin)}async function l(r,t,a){try{await e.api.post("auth/signup",{name:r,email:t,password:a});return!0}catch(n){return n.response&&401===n.response.status?"Error":"Internal error."}}async function d(r,t){console.log("iniciando sesión... plop",r,t);try{let a=await e.api.post("auth/login",{email:r,password:t});o.value=a.data}catch(a){return a.response&&401===a.response.status?"Invalid credentials":"Internal error."}}async function p(){if(!u())try{await e.api.get("auth/logout",{headers:{Authorization:"Bearer "+s()}})}catch(r){}return o=(0,n.iH)(null),!0}},8907:(r,t,a)=>{a.r(t),a.d(t,{default:()=>H});var e=a(3673),n=a(2323);const o={key:0,class:"text-center q-pa-md"},s={key:1,class:"q-pa-md row items-start q-gutter-md"},i={class:"text-h6"},u={class:"text-subtitle2 text-green"},c=(0,e.Uk)("Comprar");function l(r,t,a,l,d,p){const h=(0,e.up)("q-btn"),m=(0,e.up)("q-card-section"),w=(0,e.up)("q-separator"),g=(0,e.up)("q-card-actions"),f=(0,e.up)("q-card");return(0,e.wg)(),(0,e.iD)("div",null,[!1===r.showProducts?((0,e.wg)(),(0,e.iD)("div",o,[(0,e.Wm)(h,{color:"primary",onClick:t[0]||(t[0]=t=>r.load()),label:"ver productos"})])):((0,e.wg)(),(0,e.iD)("div",s,[((0,e.wg)(!0),(0,e.iD)(e.HY,null,(0,e.Ko)(r.products,(t=>((0,e.wg)(),(0,e.j4)(f,{class:"my-card",key:t.id},{default:(0,e.w5)((()=>[(0,e.Wm)(m,null,{default:(0,e.w5)((()=>[(0,e._)("div",i,(0,n.zw)(t.name),1),(0,e._)("div",u,(0,n.zw)(t.price)+" $",1)])),_:2},1024),(0,e.Wm)(w),(0,e.Wm)(g,{vertical:""},{default:(0,e.w5)((()=>[(0,e.Wm)(h,{flat:"",onClick:a=>r.buy(t)},{default:(0,e.w5)((()=>[c])),_:2},1032,["onClick"])])),_:2},1024)])),_:2},1024)))),128))]))])}var d=a(1959),p=a(9007),h=a(5474),m=a(6249),w=a(6417);const g=(0,e.aZ)({name:"User",setup(){return{loading:(0,d.iH)(!1),products:(0,d.iH)([]),showProducts:(0,d.iH)(!1),async load(){if(m.Z.show(),this.showProducts=!0,!(0,p.LP)())return this.$router.push({name:"login"});try{const r=await h.api.get("products",{headers:{Authorization:"Bearer "+(0,p.LP)()}});Array.isArray(r.data)&&(this.products=r.data)}catch(r){}m.Z.hide()},async buy(r){if(m.Z.show(),!(0,p.LP)())return this.$router.push({name:"login"});try{console.log((0,p.LP)());await h.api.post("boughts/"+r.id,{},{headers:{Authorization:"Bearer "+(0,p.LP)()}});w.Z.create({color:"positive",message:"Producto comprado"})}catch(t){w.Z.create({color:"negative",message:"Ocurrió un error al comprar el producto."})}m.Z.hide()}}},mounted(){if(!(0,p.LP)())return this.$router.push({name:"login"})}});var f=a(4260),y=a(6114),v=a(151),Z=a(5589),k=a(5869),P=a(9367),C=a(7518),b=a.n(C);const q=(0,f.Z)(g,[["render",l]]),H=q;b()(g,"components",{QBtn:y.Z,QCard:v.Z,QCardSection:Z.Z,QSeparator:k.Z,QCardActions:P.Z})}}]);
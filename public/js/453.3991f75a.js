"use strict";(self["webpackChunkpoderjudicial"]=self["webpackChunkpoderjudicial"]||[]).push([[453],{9007:(e,t,n)=>{n.d(t,{LP:()=>o,nJ:()=>r,GJ:()=>s,IU:()=>c,xJ:()=>p,uf:()=>d});var a=n(5474),i=n(1959);n(6395);let l=(0,i.iH)(null);(0,i.iH)(!1);function o(){return r()?null:l.value.access_token}function u(){return l.value.userdata}function r(){return!l.value}function s(){return!r()&&(1===u().admin||!0===u().admin)}async function c(e,t,n){try{await a.api.post("auth/signup",{name:e,email:t,password:n});return!0}catch(i){return i.response&&401===i.response.status?"Error":"Internal error."}}async function p(e,t){console.log("iniciando sesión... plop",e,t);try{let n=await a.api.post("auth/login",{email:e,password:t});l.value=n.data}catch(n){return n.response&&401===n.response.status?"Invalid credentials":"Internal error."}}async function d(){if(!r())try{await a.api.get("auth/logout",{headers:{Authorization:"Bearer "+o()}})}catch(e){}return l=(0,i.iH)(null),!0}},7453:(e,t,n)=>{n.r(t),n.d(t,{default:()=>J});var a=n(3673),i=n(8880);const l=(0,a.Uk)(" Poder Judicial "),o={key:0},u={key:1},r=(0,a.Uk)(" Essential Links ");function s(e,t,n,s,c,p){const d=(0,a.up)("q-btn"),m=(0,a.up)("q-toolbar-title"),w=(0,a.up)("q-toolbar"),f=(0,a.up)("q-header"),g=(0,a.up)("q-item-label"),v=(0,a.up)("EssentialLink"),k=(0,a.up)("q-list"),h=(0,a.up)("q-drawer"),y=(0,a.up)("router-view"),W=(0,a.up)("q-page-container"),q=(0,a.up)("q-layout");return(0,a.wg)(),(0,a.j4)(q,{view:"lHh Lpr lFf"},{default:(0,a.w5)((()=>[(0,a.Wm)(f,{elevated:""},{default:(0,a.w5)((()=>[(0,a.Wm)(w,null,{default:(0,a.w5)((()=>[(0,a.Wm)(d,{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu",onClick:e.toggleLeftDrawer},null,8,["onClick"]),(0,a.Wm)(m,null,{default:(0,a.w5)((()=>[l])),_:1}),e.isGuest()?((0,a.wg)(),(0,a.iD)("div",o," - ")):((0,a.wg)(),(0,a.iD)("div",u," ¡Bienvenido nuevamente!. "))])),_:1})])),_:1}),(0,a.Wm)(h,{modelValue:e.leftDrawerOpen,"onUpdate:modelValue":t[0]||(t[0]=t=>e.leftDrawerOpen=t),"show-if-above":"",bordered:""},{default:(0,a.w5)((()=>[(0,a.Wm)(k,null,{default:(0,a.w5)((()=>[(0,a.Wm)(g,{header:""},{default:(0,a.w5)((()=>[r])),_:1}),(0,a.wy)((0,a.Wm)(v,{title:"Iniciar Sesión",icon:"school",caption:"Conecte con su cuenta",to:{name:"login"}},null,512),[[i.F8,e.isGuest()]]),(0,a.wy)((0,a.Wm)(v,{title:"Registrarse",icon:"school",caption:"Cree su cuenta grátis",to:{name:"signup"}},null,512),[[i.F8,e.isGuest()]]),(0,a.wy)((0,a.Wm)(v,{title:"Comprar",icon:"school",caption:"Compre productos en nuestra plataforma",to:{name:"user"}},null,512),[[i.F8,!e.isGuest()&&!e.isAdmin()]]),(0,a.wy)((0,a.Wm)(v,{title:"Facturación",icon:"school",caption:"Genere y revise facturas",to:{name:"admin"}},null,512),[[i.F8,!e.isGuest()&&e.isAdmin()]]),(0,a.wy)((0,a.Wm)(v,{title:"Salir",icon:"school",caption:"Cierre sesión en el dispositivo",to:{name:"signout"}},null,512),[[i.F8,!e.isGuest()]])])),_:1})])),_:1},8,["modelValue"]),(0,a.Wm)(W,null,{default:(0,a.w5)((()=>[(0,a.Wm)(y)])),_:1})])),_:1})}var c=n(2323);function p(e,t,n,i,l,o){const u=(0,a.up)("q-icon"),r=(0,a.up)("q-item-section"),s=(0,a.up)("q-item-label"),p=(0,a.up)("q-item");return(0,a.wg)(),(0,a.j4)(p,{clickable:"",tag:"a",target:"_blank",to:e.link},{default:(0,a.w5)((()=>[e.icon?((0,a.wg)(),(0,a.j4)(r,{key:0,avatar:""},{default:(0,a.w5)((()=>[(0,a.Wm)(u,{name:e.icon},null,8,["name"])])),_:1})):(0,a.kq)("",!0),(0,a.Wm)(r,null,{default:(0,a.w5)((()=>[(0,a.Wm)(s,null,{default:(0,a.w5)((()=>[(0,a.Uk)((0,c.zw)(e.title),1)])),_:1}),(0,a.Wm)(s,{caption:""},{default:(0,a.w5)((()=>[(0,a.Uk)((0,c.zw)(e.caption),1)])),_:1})])),_:1})])),_:1},8,["to"])}const d=(0,a.aZ)({name:"EssentialLink",props:{title:{type:String,required:!0},caption:{type:String,default:""},link:{type:String,default:"#"},icon:{type:String,default:""}}});var m=n(4260),w=n(3414),f=n(2035),g=n(4554),v=n(2350),k=n(7518),h=n.n(k);const y=(0,m.Z)(d,[["render",p]]),W=y;h()(d,"components",{QItem:w.Z,QItemSection:f.Z,QIcon:g.Z,QItemLabel:v.Z});var q=n(1959),Z=n(9007);const b=[{title:"Docs",caption:"quasar.dev",icon:"school",link:"https://quasar.dev"}],_=(0,a.aZ)({name:"MainLayout",components:{EssentialLink:W},setup(){const e=(0,q.iH)(!1);return{user:!1,essentialLinks:b,leftDrawerOpen:e,toggleLeftDrawer(){e.value=!e.value},isGuest:Z.nJ,isAdmin:Z.GJ}}});var L=n(3066),Q=n(3812),C=n(9570),G=n(6114),I=n(3747),D=n(5400),F=n(7011),S=n(2652);const H=(0,m.Z)(_,[["render",s]]),J=H;h()(_,"components",{QLayout:L.Z,QHeader:Q.Z,QToolbar:C.Z,QBtn:G.Z,QToolbarTitle:I.Z,QDrawer:D.Z,QList:F.Z,QItemLabel:v.Z,QPageContainer:S.Z})}}]);
import './polyfills.server.mjs';
import{a as D}from"./chunk-E5WLEZGJ.mjs";import{a as v}from"./chunk-MVP5PD6J.mjs";import"./chunk-BS4R6EWL.mjs";import{A as F,y as h}from"./chunk-HO6XFDP7.mjs";import"./chunk-MWOARE3M.mjs";import{d as u}from"./chunk-LP4PQ3FH.mjs";import"./chunk-J2Z2G5EJ.mjs";import"./chunk-EPHM4TKN.mjs";import"./chunk-25BIHLEM.mjs";import"./chunk-YG54OGXN.mjs";import"./chunk-7PKCKWUI.mjs";import{b as y}from"./chunk-OD2CM6PR.mjs";import"./chunk-5UD5BCU7.mjs";import"./chunk-AZ43DKBQ.mjs";import"./chunk-ES72LBKA.mjs";import{c as S,h as g}from"./chunk-M3KATLBG.mjs";import"./chunk-CFEMM5MG.mjs";import{Ib as d,Jb as f,Kb as r,da as b,db as s,eb as l,jc as m,na as n,oa as C,rd as c,yb as p}from"./chunk-T443Y2IT.mjs";import"./chunk-VVCT4QZE.mjs";var A=(()=>{let t=class t{constructor(){}ngOnInit(){}};t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=n({type:t,selectors:[["app-portal-de-transparencia-administrativo-index"]],standalone:!0,features:[m],decls:1,vars:0,template:function(e,a){e&1&&r(0,"router-outlet")},dependencies:[g,S]});let i=t;return i})();var T=(()=>{let t=class t{constructor(o){this.fb=o,this.filtroForm=this.fb.group({ataDaSessao:[""],day:[""],month:[""],year:[""],file:[null]}),this.dynamicFields=[{name:"ataDaSessao",type:"text",label:"Ata da Sess\xE3o"},{name:"dataDaSessao",type:"text",label:"Data da Sess\xE3o"},{name:"file",type:"file",fileType:"complex",label:""}]}onFileChange(o,e){if(o.target.files.length>0){let a=o.target.files[0];this.filtroForm.patchValue({[e]:a})}}onFormSubmit(){}};t.\u0275fac=function(e){return new(e||t)(l(h))},t.\u0275cmp=n({type:t,selectors:[["app-atas-sessao-administrativo"]],standalone:!0,features:[m],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,a){e&1&&(d(0,"div",0),r(1,"app-layout-forms-adm",1),f()),e&2&&(s(),p("titulo_pagina","Ata das Sess\xF5es")("dynamicFields",a.dynamicFields)("form",a.filtroForm))},dependencies:[v,c,F,y,u]});let i=t;return i})();var I=(()=>{let t=class t{constructor(o){this.fb=o,this.filtroForm=this.fb.group({ataDaSessao:[""],day:[""],month:[""],year:[""],file:[null]}),this.dynamicFields=[{name:"tipoDoContrato",type:"text",label:"Tipo do contrato"},{name:"descricaoDoAto",type:"text",label:"Descri\xE7\xE3o do ATO"},{name:"dataDaSessao",type:"text",label:"Data da Sess\xE3o"},{name:"file",type:"file",fileType:"complex",label:""}]}onFileChange(o,e){if(o.target.files.length>0){let a=o.target.files[0];this.filtroForm.patchValue({[e]:a})}}onFormSubmit(){}};t.\u0275fac=function(e){return new(e||t)(l(h))},t.\u0275cmp=n({type:t,selectors:[["app-atos-admissionais-administrativo"]],standalone:!0,features:[m],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,a){e&1&&(d(0,"div",0),r(1,"app-layout-forms-adm",1),f()),e&2&&(s(),p("titulo_pagina","Atos Admissionais")("dynamicFields",a.dynamicFields)("form",a.filtroForm))},dependencies:[v,c,F,y,u]});let i=t;return i})();var B=(()=>{let t=class t{constructor(o){this.fb=o,this.filtroForm=this.fb.group({ataDaSessao:[""],day:[""],month:[""],year:[""],file:[null]}),this.dynamicFields=[{name:"titulo",type:"text",label:"T\xEDtulo"},{name:"dataDaSessao",type:"text",label:"Data da Sess\xE3o"},{name:"file",type:"file",fileType:"complex",label:""}]}onFileChange(o,e){if(o.target.files.length>0){let a=o.target.files[0];this.filtroForm.patchValue({[e]:a})}}onFormSubmit(){}};t.\u0275fac=function(e){return new(e||t)(l(h))},t.\u0275cmp=n({type:t,selectors:[["app-audiencia-publica-administrativo"]],standalone:!0,features:[m],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,a){e&1&&(d(0,"div",0),r(1,"app-layout-forms-adm",1),f()),e&2&&(s(),p("titulo_pagina","Audi\xEAncia P\xFAblica")("dynamicFields",a.dynamicFields)("form",a.filtroForm))},dependencies:[v,c,F,y,u]});let i=t;return i})();var j=[{path:"",component:A,children:[{path:"",redirectTo:"ata-das-sessoes",pathMatch:"full"},{path:"ata-das-sessoes",component:T},{path:"atos-admissionais",component:I},{path:"audiencia-publica",component:B},{path:"balancete",component:D}]}],at=(()=>{let t=class t{};t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=C({type:t}),t.\u0275inj=b({imports:[g.forChild(j),g]});let i=t;return i})();export{at as PortaldeTransparenciaAdministrativoRoutingModule};
import{c as g}from"./chunk-V4U57SR7.js";import"./chunk-ATKVUY2I.js";import"./chunk-SZQP653L.js";import{d as c}from"./chunk-UQATQPBB.js";import"./chunk-KPTVKJ3O.js";import{b as y}from"./chunk-CXLRO57P.js";import{A as h,y as F}from"./chunk-IJZ4HYT7.js";import"./chunk-5KYYMLWY.js";import"./chunk-AESYL7IM.js";import"./chunk-YZ53B5AH.js";import"./chunk-NCG5LLV2.js";import"./chunk-SX67IA55.js";import"./chunk-PRNQMGEJ.js";import"./chunk-P4NFZZZH.js";import{Jb as s,Kb as p,Lb as d,eb as m,fb as r,kc as f,kd as u,ra as n,zb as l}from"./chunk-KBXIU5KM.js";var E=(()=>{let t=class t{constructor(o){this.fb=o,this.filtroForm=this.fb.group({ataDaSessao:[""],day:[""],month:[""],year:[""],file:[null]}),this.dynamicFields=[{name:"ementa",type:"text",label:"Ementa"},{name:"numero",type:"text",label:"N\xFAmero"},{name:"data",type:"text",label:"Data"},{name:"file",type:"file",fileType:"complex",label:"Arquivo da Mo\xE7\xE3o"}]}onFileChange(o){let e=o.target.files[0];e&&this.filtroForm.patchValue({file:e})}onFormSubmit(){}};t.\u0275fac=function(e){return new(e||t)(r(F))},t.\u0275cmp=n({type:t,selectors:[["app-mocoes-administrativo"]],standalone:!0,features:[f],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,a){e&1&&(s(0,"div",0),d(1,"app-layout-forms-adm",1),p()),e&2&&(m(),l("titulo_pagina","Mo\xE7\xF5es")("dynamicFields",a.dynamicFields)("form",a.filtroForm))},dependencies:[u,h,y,c,g],styles:[".bkg-administrativo{height:auto}  form{padding:70px}  form label{display:flex;justify-content:center;color:#000;font-size:20.418px;font-weight:700}"]});let i=t;return i})();export{E as MocoesAdministrativoComponent};
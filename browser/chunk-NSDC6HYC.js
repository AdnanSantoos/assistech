import{c as h}from"./chunk-V4U57SR7.js";import"./chunk-ATKVUY2I.js";import"./chunk-SZQP653L.js";import{d as c}from"./chunk-UQATQPBB.js";import"./chunk-KPTVKJ3O.js";import{b as y}from"./chunk-CXLRO57P.js";import{A as v,y as F}from"./chunk-IJZ4HYT7.js";import"./chunk-5KYYMLWY.js";import"./chunk-AESYL7IM.js";import"./chunk-YZ53B5AH.js";import"./chunk-NCG5LLV2.js";import"./chunk-SX67IA55.js";import"./chunk-PRNQMGEJ.js";import"./chunk-P4NFZZZH.js";import{Jb as s,Kb as d,Lb as p,eb as n,fb as m,kc as f,kd as u,ra as r,zb as l}from"./chunk-KBXIU5KM.js";var L=(()=>{let t=class t{constructor(i){this.fb=i,this.filtroForm=this.fb.group({ataDaSessao:[""],day:[""],month:[""],year:[""],file:[null]}),this.dynamicFields=[{name:"numeroDaSessao",type:"text",label:"N\xBA da Sess\xE3o"},{name:"data",type:"text",label:"Data"},{name:"file",type:"file",fileType:"complex",label:"Arquivo da Lista de Presen\xE7a"}]}onFileChange(i){let e=i.target.files[0];e&&this.filtroForm.patchValue({file:e})}onFormSubmit(){}};t.\u0275fac=function(e){return new(e||t)(m(F))},t.\u0275cmp=r({type:t,selectors:[["app-lista-presenca-administrativo"]],standalone:!0,features:[f],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,a){e&1&&(s(0,"div",0),p(1,"app-layout-forms-adm",1),d()),e&2&&(n(),l("titulo_pagina","Lista de Presen\xE7a")("dynamicFields",a.dynamicFields)("form",a.filtroForm))},dependencies:[u,v,y,c,h]});let o=t;return o})();export{L as ListaPresencaAdministrativoComponent};
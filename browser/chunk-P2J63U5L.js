import{c as b}from"./chunk-V4U57SR7.js";import"./chunk-ATKVUY2I.js";import"./chunk-SZQP653L.js";import{d as u}from"./chunk-UQATQPBB.js";import"./chunk-KPTVKJ3O.js";import{b as y}from"./chunk-CXLRO57P.js";import{A as F,y as v}from"./chunk-IJZ4HYT7.js";import"./chunk-5KYYMLWY.js";import"./chunk-AESYL7IM.js";import"./chunk-YZ53B5AH.js";import"./chunk-NCG5LLV2.js";import"./chunk-SX67IA55.js";import"./chunk-PRNQMGEJ.js";import"./chunk-P4NFZZZH.js";import{Jb as s,Kb as p,Lb as d,eb as m,fb as r,kc as f,kd as c,ra as a,zb as l}from"./chunk-KBXIU5KM.js";var j=(()=>{let o=class o{constructor(t){this.fb=t,this.filtroForm=this.fb.group({ataDaSessao:[""],day:[""],month:[""],year:[""],file:[null]}),this.dynamicFields=[{name:"conveniado",type:"text",label:"Conveniado"},{name:"situacao",type:"text",label:"Situa\xE7\xE3o"},{name:"numeroDoProcesso",type:"text",label:"N\xBA do Processo"},{name:"numeroDoConvenio",type:"text",label:"N\xBA do Conv\xEAnio"},{name:"objeto",type:"text",label:"Objeto"},{name:"file",type:"file",fileType:"complex",label:""}]}onFileChange(t){let e=t.target.files[0];e&&this.filtroForm.patchValue({file:e})}onFormSubmit(){}};o.\u0275fac=function(e){return new(e||o)(r(v))},o.\u0275cmp=a({type:o,selectors:[["app-convenios-administrativo"]],standalone:!0,features:[f],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,n){e&1&&(s(0,"div",0),d(1,"app-layout-forms-adm",1),p()),e&2&&(m(),l("titulo_pagina","Conv\xEAnios")("dynamicFields",n.dynamicFields)("form",n.filtroForm))},dependencies:[c,F,y,u,b]});let i=o;return i})();export{j as ConveniosAdministrativoComponent};
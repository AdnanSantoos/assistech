import{c as v}from"./chunk-A7QVIPDE.js";import"./chunk-VSDVXBEH.js";import"./chunk-XKMICYN5.js";import{d as u}from"./chunk-K7FLGZSF.js";import"./chunk-B5HY4UA5.js";import{b as y}from"./chunk-K6EDBKEC.js";import{A as h,y as F}from"./chunk-HM4BWDZW.js";import"./chunk-K4R3D5ZZ.js";import"./chunk-AESYL7IM.js";import"./chunk-DINQQFAT.js";import"./chunk-NCG5LLV2.js";import"./chunk-ED2VMB6M.js";import"./chunk-VA4QILT7.js";import"./chunk-ANPXE5MR.js";import{Jb as s,Kb as d,Lb as p,eb as r,fb as m,kc as f,md as c,ra as n,zb as l}from"./chunk-BB3Q7Q4Q.js";var T=(()=>{let e=class e{constructor(i){this.fb=i,this.filtroForm=this.fb.group({ataDaSessao:[""],day:[""],month:[""],year:[""],file:[null]}),this.dynamicFields=[{name:"tituloDaNoticia",type:"text",label:"T\xEDtulo da not\xEDcia"},{name:"textoDaNoticia",type:"textarea",label:"Texto da not\xEDcia"},{name:"file",type:"file",fileType:"complex",label:""}]}onFileChange(i){let t=i.target.files[0];t&&this.filtroForm.patchValue({file:t})}onFormSubmit(){}};e.\u0275fac=function(t){return new(t||e)(m(F))},e.\u0275cmp=n({type:e,selectors:[["app-noticias-administrativo"]],standalone:!0,features:[f],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(t,a){t&1&&(s(0,"div",0),p(1,"app-layout-forms-adm",1),d()),t&2&&(r(),l("titulo_pagina","Not\xEDcias de itaberaba")("dynamicFields",a.dynamicFields)("form",a.filtroForm))},dependencies:[c,h,y,u,v]});let o=e;return o})();export{T as NoticiasAdministrativoComponent};
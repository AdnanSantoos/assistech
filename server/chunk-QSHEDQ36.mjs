import './polyfills.server.mjs';
import{c as h}from"./chunk-UPXHKHKH.mjs";import"./chunk-VYRD63QA.mjs";import{A as v,y as F}from"./chunk-KOHOVKG4.mjs";import"./chunk-DFQ2AXWX.mjs";import{d as u}from"./chunk-D6QAECO7.mjs";import"./chunk-C4BKMEJ5.mjs";import"./chunk-3JUGSVLW.mjs";import"./chunk-KX5L3JXB.mjs";import"./chunk-YG54OGXN.mjs";import"./chunk-T2BHHK3S.mjs";import{b as y}from"./chunk-LUFFFVZ5.mjs";import"./chunk-I3725CSD.mjs";import"./chunk-AZ43DKBQ.mjs";import"./chunk-MBK5J4M7.mjs";import"./chunk-CM3HZ6AD.mjs";import"./chunk-NY5AIG2Z.mjs";import{Ib as f,Jb as s,Kb as d,db as r,eb as n,jc as p,na as m,rd as c,yb as l}from"./chunk-K6K74AZI.mjs";import"./chunk-VVCT4QZE.mjs";var A=(()=>{let t=class t{constructor(o){this.fb=o,this.filtroForm=this.fb.group({ataDaSessao:[""],day:[""],month:[""],year:[""],file:[null]}),this.dynamicFields=[{name:"nome",type:"text",label:"Nome"},{name:"data",type:"text",label:"Data"},{name:"file",type:"file",fileType:"complex",label:"Arquivo do Of\xEDcio"}]}onFileChange(o){let e=o.target.files[0];e&&this.filtroForm.patchValue({file:e})}onFormSubmit(){}};t.\u0275fac=function(e){return new(e||t)(n(F))},t.\u0275cmp=m({type:t,selectors:[["app-oficio-administrativo"]],standalone:!0,features:[p],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,a){e&1&&(f(0,"div",0),d(1,"app-layout-forms-adm",1),s()),e&2&&(r(),l("titulo_pagina","Of\xEDcio")("dynamicFields",a.dynamicFields)("form",a.filtroForm))},dependencies:[c,v,y,u,h]});let i=t;return i})();export{A as OficioAdministrativoComponent};
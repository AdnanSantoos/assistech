import './polyfills.server.mjs';
import{c as h}from"./chunk-PNI7DVVX.mjs";import"./chunk-GQ5VW6DQ.mjs";import{A as g,y}from"./chunk-HKPF4WWF.mjs";import"./chunk-C5FWYDD3.mjs";import{d as c}from"./chunk-23X2HCAU.mjs";import"./chunk-JKO6VWIZ.mjs";import"./chunk-55IKNV4Z.mjs";import"./chunk-HV42ZY6N.mjs";import"./chunk-YG54OGXN.mjs";import"./chunk-BVX2OMUG.mjs";import{b as F}from"./chunk-VOE2BQPC.mjs";import"./chunk-JMSXMNLZ.mjs";import"./chunk-AZ43DKBQ.mjs";import"./chunk-5EAGQFV4.mjs";import"./chunk-DMMZOU22.mjs";import"./chunk-EVPDCH5S.mjs";import{Ib as s,Jb as p,Kb as f,db as r,eb as m,jc as d,na as n,ud as u,yb as l}from"./chunk-6ZJAAIVQ.mjs";import"./chunk-VVCT4QZE.mjs";var x=(()=>{let e=class e{constructor(t){this.fb=t,this.filtroForm=this.fb.group({ano:[""],file:[null]}),this.dynamicFields=[{name:"ano",type:"text",label:"ANO"},{name:"file",type:"file",fileType:"complex",label:""}]}onFileChange(t,o){if(t.target.files.length>0){let i=t.target.files[0];this.filtroForm.patchValue({[o]:i})}}onFormSubmit(){}};e.\u0275fac=function(o){return new(o||e)(m(y))},e.\u0275cmp=n({type:e,selectors:[["app-balanco-anual-administrativo"]],standalone:!0,features:[d],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(o,i){o&1&&(s(0,"div",0),f(1,"app-layout-forms-adm",1),p()),o&2&&(r(),l("titulo_pagina","Balan\xE7o Anual")("dynamicFields",i.dynamicFields)("form",i.filtroForm))},dependencies:[h,u,g,F,c]});let a=e;return a})();export{x as BalancoAnualAdministrativoComponent};
import './polyfills.server.mjs';
import{a as h}from"./chunk-URJ5OL4I.mjs";import"./chunk-6BLE2IAG.mjs";import{v as y,x as g}from"./chunk-L24UFQXH.mjs";import"./chunk-YYS6VNPJ.mjs";import{d as c}from"./chunk-OW5TL5LT.mjs";import"./chunk-SHA7NF75.mjs";import"./chunk-DIEPAU2N.mjs";import"./chunk-DMBMNNNW.mjs";import"./chunk-YG54OGXN.mjs";import"./chunk-EOZR4FD7.mjs";import{b as F}from"./chunk-KMBW6API.mjs";import"./chunk-27AQMWLD.mjs";import"./chunk-AZ43DKBQ.mjs";import"./chunk-U2J3I5RH.mjs";import"./chunk-2SGBOMMT.mjs";import"./chunk-45EKGY5G.mjs";import{Ib as s,Jb as p,Kb as f,db as r,eb as m,jc as d,na as n,pd as u,yb as l}from"./chunk-QF5IABGI.mjs";import"./chunk-VVCT4QZE.mjs";var x=(()=>{let e=class e{constructor(t){this.fb=t,this.filtroForm=this.fb.group({ano:[""],file:[null]}),this.dynamicFields=[{name:"ano",type:"text",label:"ANO"},{name:"file",type:"file",fileType:"complex",label:""}]}onFileChange(t,o){if(t.target.files.length>0){let i=t.target.files[0];this.filtroForm.patchValue({[o]:i})}}onFormSubmit(){}};e.\u0275fac=function(o){return new(o||e)(m(y))},e.\u0275cmp=n({type:e,selectors:[["app-balanco-anual-administrativo"]],standalone:!0,features:[d],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(o,i){o&1&&(s(0,"div",0),f(1,"app-layout-forms-adm",1),p()),o&2&&(r(),l("titulo_pagina","Balan\xE7o Anual")("dynamicFields",i.dynamicFields)("form",i.filtroForm))},dependencies:[h,u,g,F,c]});let a=e;return a})();export{x as BalancoAnualAdministrativoComponent};
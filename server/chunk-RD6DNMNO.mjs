import './polyfills.server.mjs';
import{a as h}from"./chunk-MVP5PD6J.mjs";import"./chunk-BS4R6EWL.mjs";import{A as g,y}from"./chunk-HO6XFDP7.mjs";import"./chunk-MWOARE3M.mjs";import{d as c}from"./chunk-LP4PQ3FH.mjs";import"./chunk-J2Z2G5EJ.mjs";import"./chunk-EPHM4TKN.mjs";import"./chunk-25BIHLEM.mjs";import"./chunk-YG54OGXN.mjs";import"./chunk-7PKCKWUI.mjs";import{b as F}from"./chunk-OD2CM6PR.mjs";import"./chunk-5UD5BCU7.mjs";import"./chunk-AZ43DKBQ.mjs";import"./chunk-ES72LBKA.mjs";import"./chunk-M3KATLBG.mjs";import"./chunk-CFEMM5MG.mjs";import{Ib as s,Jb as p,Kb as f,db as r,eb as m,jc as d,na as n,rd as u,yb as l}from"./chunk-T443Y2IT.mjs";import"./chunk-VVCT4QZE.mjs";var x=(()=>{let e=class e{constructor(t){this.fb=t,this.filtroForm=this.fb.group({ano:[""],file:[null]}),this.dynamicFields=[{name:"ano",type:"text",label:"ANO"},{name:"file",type:"file",fileType:"complex",label:""}]}onFileChange(t,o){if(t.target.files.length>0){let i=t.target.files[0];this.filtroForm.patchValue({[o]:i})}}onFormSubmit(){}};e.\u0275fac=function(o){return new(o||e)(m(y))},e.\u0275cmp=n({type:e,selectors:[["app-balanco-anual-administrativo"]],standalone:!0,features:[d],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(o,i){o&1&&(s(0,"div",0),f(1,"app-layout-forms-adm",1),p()),o&2&&(r(),l("titulo_pagina","Balan\xE7o Anual")("dynamicFields",i.dynamicFields)("form",i.filtroForm))},dependencies:[h,u,g,F,c]});let a=e;return a})();export{x as BalancoAnualAdministrativoComponent};
import './polyfills.server.mjs';
import{c as g}from"./chunk-6LTPTM5H.mjs";import"./chunk-4K67BGW7.mjs";import{A as h,y as F}from"./chunk-2MPLUYNX.mjs";import"./chunk-FLQGBKJ4.mjs";import{d as c}from"./chunk-PPRSLT7A.mjs";import"./chunk-M4KBKZFS.mjs";import"./chunk-PZWENLJ4.mjs";import"./chunk-WVKLJT27.mjs";import"./chunk-YG54OGXN.mjs";import"./chunk-HJHBO2VC.mjs";import{b as y}from"./chunk-LLM2LSHQ.mjs";import"./chunk-AHGYEQMX.mjs";import"./chunk-AZ43DKBQ.mjs";import"./chunk-XZJRAFFU.mjs";import"./chunk-BHRHL7EK.mjs";import"./chunk-2A2H562Z.mjs";import{Ib as s,Jb as p,Kb as d,db as m,eb as r,jc as f,na as n,td as u,yb as l}from"./chunk-56EBF6KU.mjs";import"./chunk-VVCT4QZE.mjs";var E=(()=>{let t=class t{constructor(o){this.fb=o,this.filtroForm=this.fb.group({ataDaSessao:[""],day:[""],month:[""],year:[""],file:[null]}),this.dynamicFields=[{name:"ementa",type:"text",label:"Ementa"},{name:"numero",type:"text",label:"N\xFAmero"},{name:"data",type:"text",label:"Data"},{name:"file",type:"file",fileType:"complex",label:"Arquivo da Mo\xE7\xE3o"}]}onFileChange(o){let e=o.target.files[0];e&&this.filtroForm.patchValue({file:e})}onFormSubmit(){}};t.\u0275fac=function(e){return new(e||t)(r(F))},t.\u0275cmp=n({type:t,selectors:[["app-mocoes-administrativo"]],standalone:!0,features:[f],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,a){e&1&&(s(0,"div",0),d(1,"app-layout-forms-adm",1),p()),e&2&&(m(),l("titulo_pagina","Mo\xE7\xF5es")("dynamicFields",a.dynamicFields)("form",a.filtroForm))},dependencies:[u,h,y,c,g],styles:[".bkg-administrativo{height:auto}  form{padding:70px}  form label{display:flex;justify-content:center;color:#000;font-size:20.418px;font-weight:700}"]});let i=t;return i})();export{E as MocoesAdministrativoComponent};
import{a as b}from"./chunk-2LZR7QXM.js";import"./chunk-SJPXE3HJ.js";import"./chunk-G2RJANIJ.js";import{d as u}from"./chunk-ACXJEE35.js";import"./chunk-INGDBOAW.js";import{b as y}from"./chunk-XVE2YS6Y.js";import{A as v,y as F}from"./chunk-3OQ4JZRI.js";import"./chunk-GLX7DXJV.js";import"./chunk-AESYL7IM.js";import"./chunk-ILL4UPNS.js";import"./chunk-NCG5LLV2.js";import"./chunk-DK3NSDED.js";import"./chunk-QPHDV5KX.js";import"./chunk-T33T73IG.js";import{Jb as s,Kb as d,Lb as p,eb as n,fb as m,kc as f,kd as c,ra as r,zb as l}from"./chunk-EIVOTMOT.js";var j=(()=>{let t=class t{constructor(i){this.fb=i,this.filtroForm=this.fb.group({ataDaSessao:[""],day:[""],month:[""],year:[""],file:[null]}),this.dynamicFields=[{name:"numeroDaLicitacao",type:"text",label:"N\xBA da licita\xE7\xE3o"},{name:"objeto",type:"text",label:"Objeto"},{name:"status",type:"text",label:"Status"},{name:"file",type:"file",fileType:"complex",label:"Anexar arquivo"}]}onFileChange(i){let e=i.target.files[0];e&&this.filtroForm.patchValue({file:e})}onFormSubmit(){}};t.\u0275fac=function(e){return new(e||t)(m(F))},t.\u0275cmp=r({type:t,selectors:[["app-editais-licitacoes-administrativo"]],standalone:!0,features:[f],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,a){e&1&&(s(0,"div",0),p(1,"app-layout-forms-adm",1),d()),e&2&&(n(),l("titulo_pagina","Editais das Licita\xE7\xF5es")("dynamicFields",a.dynamicFields)("form",a.filtroForm))},dependencies:[c,v,y,u,b]});let o=t;return o})();export{j as EditaisLicitacoesAdministrativoComponent};
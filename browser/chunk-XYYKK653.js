import{c as v}from"./chunk-ACPQLNJ2.js";import"./chunk-E3L3BBCP.js";import"./chunk-737ECZJJ.js";import{d as f}from"./chunk-3EP5USAO.js";import"./chunk-JH3NOZ7V.js";import{b}from"./chunk-D34OALG6.js";import{A as g,y}from"./chunk-EKWBU37W.js";import"./chunk-OJRSRKRG.js";import"./chunk-AESYL7IM.js";import"./chunk-6ZCP5URB.js";import"./chunk-NCG5LLV2.js";import"./chunk-UFNKQZMC.js";import"./chunk-OHIPPJC7.js";import"./chunk-TKLJK2XU.js";import{Jb as d,Kb as p,Lb as s,eb as n,fb as r,kc as c,nd as u,ra as l,zb as m}from"./chunk-3R3OWISE.js";var A=(()=>{let a=class a{constructor(t){this.fb=t,this.filtroForm=this.fb.group({ataDaSessao:[""],day:[""],month:[""],year:[""],file:[null]}),this.dynamicFields=[{name:"numeroDaContratacao",type:"text",label:"N\xBA da contrata\xE7\xE3o"},{name:"numeroDoProcesso",type:"text",label:"N\xBA da contrata\xE7\xE3o"},{name:"dataDaPublicacao",type:"text",label:"Data da Publica\xE7\xE3o"},{name:"objeto",type:"text",label:"objeto"},{name:"modalidade",type:"text",label:"modalidade"},{name:"status",type:"text",label:"status"},{name:"numeroDaDispensa",type:"text",label:"n\xBA da dispensa"},{name:"localDeExecucao",type:"text",label:"Local de Execu\xE7\xE3o"},{name:"fiscal",type:"text",label:"fiscal"},{name:"possuiSRP",type:"select",label:"Possui SRP?",options:[{value:"categoria1",label:"Categoria 1"},{value:"categoria2",label:"Categoria 2"},{value:"categoria3",label:"Categoria 3"}]},{name:"possuiAditivo",type:"select",label:"Possui Aditivo?",options:[{value:"categoria1",label:"Categoria 1"},{value:"categoria2",label:"Categoria 2"},{value:"categoria3",label:"Categoria 3"}]},{name:"contratada",type:"text",label:"contratada"},{name:"contratoProcedimentoNaIntegra",type:"file",fileType:"simple",label:"Contrato: Procedimento na integra"},{name:"valorDoContrato",type:"text",label:"Valor do Contrato"},{name:"tipoEspecie",type:"text",label:"Tipo Esp\xE9cie"},{name:"numeroDoContratoAdtivado",type:"text",label:"N\xFAmero do contrato Adtivado"},{name:"valorDoAdtivado",type:"text",label:"Valor do Adtivado"},{name:"fundamentoLegal",type:"text",label:"Fundamento Legal"},{name:"file",type:"file",fileType:"complex",label:""}]}onFileChange(t){let e=t.target.files[0];e&&this.filtroForm.patchValue({file:e})}onFormSubmit(){}};a.\u0275fac=function(e){return new(e||a)(r(y))},a.\u0275cmp=l({type:a,selectors:[["app-contratacao-direta-administrativo"]],standalone:!0,features:[c],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,i){e&1&&(d(0,"div",0),s(1,"app-layout-forms-adm",1),p()),e&2&&(n(),m("titulo_pagina","Contrata\xE7\xE3o Direta")("dynamicFields",i.dynamicFields)("form",i.filtroForm))},dependencies:[u,g,b,f,v]});let o=a;return o})();export{A as ContratacaoDiretaAdministrativoComponent};
import{c as v}from"./chunk-ACPQLNJ2.js";import"./chunk-E3L3BBCP.js";import"./chunk-737ECZJJ.js";import{d as u}from"./chunk-3EP5USAO.js";import"./chunk-JH3NOZ7V.js";import{b as y}from"./chunk-D34OALG6.js";import{A as F,y as b}from"./chunk-EKWBU37W.js";import"./chunk-OJRSRKRG.js";import"./chunk-AESYL7IM.js";import"./chunk-6ZCP5URB.js";import"./chunk-NCG5LLV2.js";import"./chunk-UFNKQZMC.js";import"./chunk-OHIPPJC7.js";import"./chunk-TKLJK2XU.js";import{Jb as d,Kb as p,Lb as s,eb as m,fb as n,kc as c,nd as f,ra as l,zb as r}from"./chunk-3R3OWISE.js";var A=(()=>{let t=class t{constructor(a){this.fb=a,this.filtroForm=this.fb.group({ataDaSessao:[""],day:[""],month:[""],year:[""],file:[null]}),this.dynamicFields=[{name:"renavam",type:"text",label:"Renavam"},{name:"dataAquisicao",type:"text",label:"Data da Aquisi\xE7\xE3o"},{name:"marcaModelo",type:"text",label:"Marca/Modelo"},{name:"placa",type:"text",label:"Placa"},{name:"chassi",type:"text",label:"Chassi"},{name:"anoModelo",type:"text",label:"Ano Modelo"},{name:"cor",type:"text",label:"Cor"},{name:"veiculo",type:"text",label:"Ve\xEDculo"},{name:"setorUtilidade",type:"text",label:"Setor de Utilidade"},{name:"origem",type:"text",label:"Origem"},{name:"licenciamento",type:"text",label:"Licenciamento"},{name:"quilometragem",type:"text",label:"Quilometragem"},{name:"file",type:"file",fileType:"complex",label:""}]}onFileChange(a){let e=a.target.files[0];e&&this.filtroForm.patchValue({file:e})}onFormSubmit(){}};t.\u0275fac=function(e){return new(e||t)(n(b))},t.\u0275cmp=l({type:t,selectors:[["app-dados-da-frota-administrativo"]],standalone:!0,features:[c],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,i){e&1&&(d(0,"div",0),s(1,"app-layout-forms-adm",1),p()),e&2&&(m(),r("titulo_pagina","Dados da Frota")("dynamicFields",i.dynamicFields)("form",i.filtroForm))},dependencies:[f,F,y,u,v]});let o=t;return o})();export{A as DadosDaFrotaAdministrativoComponent};
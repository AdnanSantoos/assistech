import{a as P,b as j}from"./chunk-P25RV5T6.js";import{a as F}from"./chunk-7B23W6FA.js";import"./chunk-KZFE5MKM.js";import"./chunk-W4YBRYX4.js";import{d as f}from"./chunk-UOMWRKSI.js";import"./chunk-ZXHJ6WKH.js";import{b as u}from"./chunk-PUYQUYIW.js";import{e as M,v as y,x as v}from"./chunk-YJCVG7BX.js";import{a as D}from"./chunk-4UYWOGWU.js";import"./chunk-AESYL7IM.js";import"./chunk-3U5W7T3B.js";import"./chunk-NCG5LLV2.js";import"./chunk-QRKV4BHJ.js";import{c as E,g as C}from"./chunk-NSXOA4LZ.js";import"./chunk-W2IVR2VP.js";import{Jb as d,Kb as p,Lb as g,Sb as S,eb as l,fb as r,ha as L,id as c,kc as m,ra as n,sa as B,zb as s}from"./chunk-U67GV5TG.js";var w=(()=>{let t=class t{constructor(o){this.fb=o,this.filtroForm=this.fb.group({linkComissao:[""]}),this.dynamicFields=[{name:"linkComissao",type:"text",label:"Adicionar Link da Comiss\xE3o"}]}onFileChange(o,e){if(o.target.files.length>0){let i=o.target.files[0];this.filtroForm.patchValue({[e]:i})}}onFormSubmit(){}};t.\u0275fac=function(e){return new(e||t)(r(y))},t.\u0275cmp=n({type:t,selectors:[["app-adicionar-comissoes-administrativo"]],standalone:!0,features:[m],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,i){e&1&&(d(0,"div",0),g(1,"app-layout-forms-adm",1),p()),e&2&&(l(),s("titulo_pagina","Comiss\xF5es")("dynamicFields",i.dynamicFields)("form",i.filtroForm))},dependencies:[c,v,f,u,F]});let a=t;return a})();var R=(()=>{let t=class t{constructor(o){this.fb=o,this.filtroForm=this.fb.group({horaAtividade:[""],description:[""],date:[""]}),this.dynamicFields=[{name:"horaAtividade",type:"text",label:"hora da atividade"},{name:"description",type:"textarea",label:"Descri\xE7\xE3o da atividade"},{name:"date",type:"date",label:"Data"}]}onFileChange(o,e){if(o.target.files.length>0){let i=o.target.files[0];this.filtroForm.patchValue({[e]:i})}}onFormSubmit(){}};t.\u0275fac=function(e){return new(e||t)(r(y))},t.\u0275cmp=n({type:t,selectors:[["app-agenda-do-presidente-administrativo"]],standalone:!0,features:[m],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,i){e&1&&(d(0,"div",0),g(1,"app-layout-forms-adm",1),p()),e&2&&(l(),s("titulo_pagina","Agenda do Presidente")("dynamicFields",i.dynamicFields)("form",i.filtroForm))},dependencies:[c,f,u,F]});let a=t;return a})();var V=(()=>{let t=class t{constructor(){}ngOnInit(){}};t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=n({type:t,selectors:[["app-pncp-administrativo-index"]],standalone:!0,features:[m],decls:1,vars:0,template:function(e,i){e&1&&g(0,"router-outlet")},dependencies:[C,E]});let a=t;return a})();var k=(()=>{let t=class t{constructor(o){this.fb=o,this.filtroForm=this.fb.group({ataDaSessao:[""],day:[""],month:[""],year:[""],file:[null]}),this.dynamicFields=[{name:"numeroDaLicitacao",type:"text",label:"N\xBA da licita\xE7\xE3o"},{name:"objetoLicitacao",type:"text",label:"Objeto da licita\xE7\xE3o"},{name:"dataDaLicitacao",type:"text",label:"Data da Licita\xE7\xE3o"},{name:"modalidade",type:"text",label:"Modalidade"},{name:"srp",type:"text",label:"SRP"},{name:"file",type:"file",fileType:"complex",label:"Contrato: Procedimento na \xEDntegra"},{name:"status",type:"text",label:"Status"},{name:"orgao",type:"text",label:"\xD3rg\xE3o"},{name:"numeroDoProcessoAdministrativo",type:"text",label:"N\xBA do processo administrativo"},{name:"numeroDoEdital",type:"text",label:"N\xBA do edital"},{name:"localDeExecucaoDoContrato",type:"text",label:"Local de execu\xE7\xE3o do contrato"},{name:"dataDaPublicacao",type:"text",label:"Data da publica\xE7\xE3o"},{name:"vigencia",type:"text",label:"Vig\xEAncia"},{name:"previsaoOrcamentaria",type:"text",label:"Previs\xE3o or\xE7ament\xE1ria"},{name:"fiscal",type:"text",label:"Fiscal"},{name:"possuiAditivo",type:"text",label:"Possui Aditivo?"},{name:"file",type:"file",fileType:"complex",label:"Arquivo do processo"}]}onFileChange(o){let e=o.target.files[0];e&&this.filtroForm.patchValue({file:e})}onFormSubmit(){}};t.\u0275fac=function(e){return new(e||t)(r(y))},t.\u0275cmp=n({type:t,selectors:[["app-licitacoes-administrativo"]],standalone:!0,features:[m],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,i){e&1&&(d(0,"div",0),g(1,"app-layout-forms-adm",1),p()),e&2&&(l(),s("titulo_pagina","Licita\xE7\xF5es")("dynamicFields",i.dynamicFields)("form",i.filtroForm))},dependencies:[c,v,u,f,F]});let a=t;return a})();var O=(()=>{let t=class t{constructor(o){this.fb=o,this.filtroForm=this.fb.group({ataDaSessao:[""],day:[""],month:[""],year:[""],file:[null]}),this.dynamicFields=[{name:"selecioneLista",title:"Selecione Contrato",type:"file",fileType:"complex",label:"Selecione na Lista",nameButton:"Selecione na Lista"},{name:"receitaDespesa",type:"toggle",label:"Receita/Despesa"},{name:"tipoContrato",type:"select",label:"Tipo do Contrato",options:[{value:"tipo1",label:"Tipo 1"},{value:"tipo2",label:"Tipo 2"},{value:"tipo3",label:"Tipo 3"}]},{name:"categoriaProcesso",type:"select",label:"Categoria do Processo",options:[{value:"categoria1",label:"Categoria 1"},{value:"categoria2",label:"Categoria 2"},{value:"categoria3",label:"Categoria 3"}]},{name:"numContrato",type:"text",label:"N\xFAmero do contrato ou empenho"},{name:"anoContrato",type:"text",label:"Ano do contrato"},{name:"numProcesso",type:"text",label:"N\xFAmero do processo"},{name:"tipoPessoa",type:"select",label:"Tipo da Pessoa",options:[{value:"tipo1",label:"Tipo 1"},{value:"tipo2",label:"Tipo 2"},{value:"tipo3",label:"Tipo 3"}]},{name:"numCNPJCPF",type:"text",label:"N\xFAmero do CNPJ/CPF do fornecedor/prestador"},{name:"nomerazao",type:"text",label:"Nome ou Raz\xE3o Social"},{name:"ValorInicialContrato",type:"text",label:"Valor Inicial do contrato"},{name:"valParcela",type:"text",label:"Valor da parcela"},{name:"valGlobContrato",type:"text",label:"Valor Global do Contrato"},{name:"valAcumuladoContrato",type:"text",label:"Valor acumulado do contrato"},{name:"tipoFornecedor",type:"select",label:"Tipo de fornecedor subcontratado",options:[{value:"tipo1",label:"Tipo 1"},{value:"tipo2",label:"Tipo 2"},{value:"tipo3",label:"Tipo 3"}]},{name:"numCNPJFornecSubcontratado",type:"text",label:"N\xFAmero do CNPJ/CPF do fornecedor/prestador subcontratado"},{name:"nomeFornecedorSub",type:"text",label:"Nome do fornecedor subcontratado"},{name:"identificadorContrato",type:"text",label:"Identificador do Contrato"},{name:"urfInformacoesContrato",type:"text",label:"URF COM INFORMA\xC7\xD5ES DO CONTRATO"},{name:"dataAssinatura",type:"date",label:"Data de assinatura do contrato"},{name:"dataAssinaturaContrato",type:"date",label:"Data de assinatura do contrato"},{name:"dataFinalVigencia",type:"date",label:"Data final da vig\xEAncia"}]}onFileChange(o){let e=o.target.files[0];e&&this.filtroForm.patchValue({file:e})}onFormSubmit(){}};t.\u0275fac=function(e){return new(e||t)(r(y))},t.\u0275cmp=n({type:t,selectors:[["app-contratos-administrativo"]],standalone:!0,features:[m],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,i){e&1&&(d(0,"div",0),g(1,"app-layout-forms-adm",1),p()),e&2&&(l(),s("titulo_pagina","Dados do Contratos")("dynamicFields",i.dynamicFields)("form",i.filtroForm))},dependencies:[c,v,u,f,F],styles:[".bg-pagina-interna .formulario-component{max-width:100%!important}  form .form-grid .full-width{grid-column:span 1!important}  .upload-content,   .upload-title{display:none!important}"]});let a=t;return a})();var x=class{static toSubmit(t){return{agency:t.agency,agency_country_register:t.agency_country_register}}};var q=(()=>{let t=class t{constructor(o,e,i){this.fb=o,this.unidadesService=e,this.toastr=i,this.filtroForm=this.fb.group({agency:["",[M.required]],agency_country_register:["",[M.required]]}),this.dynamicFields=[{name:"agency",type:"text",label:"\xD3rg\xE3o",placeholder:"Digite o \xF3rg\xE3o",required:!0},{name:"agency_country_register",type:"text",label:"CNPJ",placeholder:"Digite o CNPJ",required:!0}]}onFormSubmit(o){if(this.filtroForm.valid){let e=x.toSubmit(o);this.unidadesService.createUnidade(e).subscribe({next:()=>{this.toastr.success("Unidade criada com sucesso!","Sucesso"),this.filtroForm.reset()},error:()=>{this.toastr.error("Erro ao criar unidade. Tente novamente.","Erro")}})}else this.toastr.warning("Preencha todos os campos obrigat\xF3rios!","Aten\xE7\xE3o")}};t.\u0275fac=function(e){return new(e||t)(r(y),r(P),r(D))},t.\u0275cmp=n({type:t,selectors:[["app-adicionar-unidades-administrativo"]],standalone:!0,features:[m],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"formSubmit","titulo_pagina","dynamicFields","form"]],template:function(e,i){e&1&&(d(0,"div",0)(1,"app-layout-forms-adm",1),S("formSubmit",function(T){return i.onFormSubmit(T)}),p()()),e&2&&(l(),s("titulo_pagina","Adicionar Unidade")("dynamicFields",i.dynamicFields)("form",i.filtroForm))},dependencies:[F,c,v,u,f],styles:["@media (max-width: 768px){  .formulario-component{padding:0!important}}"]});let a=t;return a})();var A=class{static toSubmit(t){return{country_register:t.country_register}}};var N=(()=>{let t=class t{constructor(o,e,i){this.fb=o,this.orgaosService=e,this.toastr=i,this.dynamicFields=[{name:"country_register",type:"text",label:"CNPJ",required:!0}],this.filtroForm=this.fb.group({}),this.initFormFields()}ngOnInit(){}initFormFields(){this.dynamicFields.forEach(o=>{this.filtroForm.addControl(o.name,this.fb.control("",o.required?M.required:null))})}onFormSubmit(o){if(this.filtroForm.valid){let e=A.toSubmit(o);this.orgaosService.createOrgao(e).subscribe({next:()=>{this.toastr.success("\xD3rg\xE3o criado com sucesso!","Sucesso"),this.filtroForm.reset()},error:()=>{this.toastr.error("Erro ao criar \xF3rg\xE3o. Tente novamente.","Erro")}})}else this.toastr.warning("Preencha o campo obrigat\xF3rio!","Aten\xE7\xE3o")}};t.\u0275fac=function(e){return new(e||t)(r(y),r(j),r(D))},t.\u0275cmp=n({type:t,selectors:[["app-adicionar-orgao-administrativo"]],standalone:!0,features:[m],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"formSubmit","titulo_pagina","dynamicFields","form"]],template:function(e,i){e&1&&(d(0,"div",0)(1,"app-layout-forms-adm",1),S("formSubmit",function(T){return i.onFormSubmit(T)}),p()()),e&2&&(l(),s("titulo_pagina","Adicionar \xD3rg\xE3o")("dynamicFields",i.dynamicFields)("form",i.filtroForm))},dependencies:[c,v,u,f,F],styles:["@media (max-width: 768px){  .formulario-component{padding:0!important}}"]});let a=t;return a})();var _=(()=>{let t=class t{constructor(o){this.fb=o,this.filtroForm=this.fb.group({carta:[""]}),this.dynamicFields=[{name:"carta",type:"file",fileType:"complex",label:"Anexar Carta"}]}onFileChange(o,e){if(o.target.files.length>0){let i=o.target.files[0];this.filtroForm.patchValue({[e]:i})}}onFormSubmit(){}};t.\u0275fac=function(e){return new(e||t)(r(y))},t.\u0275cmp=n({type:t,selectors:[["app-carta-de-servicos-administrativo"]],standalone:!0,features:[m],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,i){e&1&&(d(0,"div",0),g(1,"app-layout-forms-adm",1),p()),e&2&&(l(),s("titulo_pagina","Carta de Servi\xE7os")("dynamicFields",i.dynamicFields)("form",i.filtroForm))},dependencies:[c,v,f,u,F]});let a=t;return a})();var J=(()=>{let t=class t{constructor(o){this.fb=o,this.filtroForm=this.fb.group({dataCota:[""],arquivo:[""]}),this.dynamicFields=[{name:"dataCota",type:"date",label:"Data da Cota"},{name:"arquivo",type:"file",fileType:"complex",label:"Arquivo"}]}onFileChange(o,e){if(o.target.files.length>0){let i=o.target.files[0];this.filtroForm.patchValue({[e]:i})}}onFormSubmit(){}};t.\u0275fac=function(e){return new(e||t)(r(y))},t.\u0275cmp=n({type:t,selectors:[["app-cotas-para-servico-parlamentar-administrativo"]],standalone:!0,features:[m],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,i){e&1&&(d(0,"div",0),g(1,"app-layout-forms-adm",1),p()),e&2&&(l(),s("titulo_pagina","Cotas para servi\xE7o parlamentar")("dynamicFields",i.dynamicFields)("form",i.filtroForm))},dependencies:[c,v,f,u,F]});let a=t;return a})();var U=(()=>{let t=class t{constructor(o){this.fb=o,this.filtroForm=this.fb.group({adicionarLinkPaginaDados:[""],informacoesAdicionais:[""]}),this.dynamicFields=[{name:"adicionarLinkPaginaDados",type:"text",label:"Adicionar Link da P\xE1gina de dados"},{name:"informacoesAdicionais",type:"textarea",label:"Informa\xE7\xF5es Adicionais"}]}onFileChange(o,e){if(o.target.files.length>0){let i=o.target.files[0];this.filtroForm.patchValue({[e]:i})}}onFormSubmit(){}};t.\u0275fac=function(e){return new(e||t)(r(y))},t.\u0275cmp=n({type:t,selectors:[["app-dados-abertos-administrativo"]],standalone:!0,features:[m],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,i){e&1&&(d(0,"div",0),g(1,"app-layout-forms-adm",1),p()),e&2&&(l(),s("titulo_pagina","Dados Abertos")("dynamicFields",i.dynamicFields)("form",i.filtroForm))},dependencies:[c,v,f,u,F]});let a=t;return a})();var G=(()=>{let t=class t{constructor(o){this.fb=o,this.filtroForm=this.fb.group({tipo:[""],autoria:[""],numeroDescricao:[""],dataDocumento:[""],file:[""]}),this.dynamicFields=[{name:"tipo",type:"text",label:"Tipo"},{name:"autoria",type:"text",label:"Autoria"},{name:"numeroDescricao",type:"text",label:"N\xFAmero/Descri\xE7\xE3o"},{name:"dataDocumento",type:"date",label:"data do documento"},{name:"file",type:"file",fileType:"complex",label:"arquivo"}]}onFileChange(o,e){if(o.target.files.length>0){let i=o.target.files[0];this.filtroForm.patchValue({[e]:i})}}onFormSubmit(){}};t.\u0275fac=function(e){return new(e||t)(r(y))},t.\u0275cmp=n({type:t,selectors:[["app-adicionar-documentos-administrativos"]],standalone:!0,features:[m],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,i){e&1&&(d(0,"div",0),g(1,"app-layout-forms-adm",1),p()),e&2&&(l(),s("titulo_pagina","Documentos administrativos")("dynamicFields",i.dynamicFields)("form",i.filtroForm))},dependencies:[c,v,f,u,F]});let a=t;return a})();var z=(()=>{let t=class t{constructor(o){this.fb=o,this.filtroForm=this.fb.group({grauSigilo:[""],data:[""],file:[""],description:[""]}),this.dynamicFields=[{name:"grauSigilo",type:"text",label:"Grau de Sigilo"},{name:"description",type:"textarea",label:"Descri\xE7\xE3o"},{name:"data",type:"date",label:"data"},{name:"file",type:"file",fileType:"complex",label:"arquivo"}]}onFileChange(o,e){if(o.target.files.length>0){let i=o.target.files[0];this.filtroForm.patchValue({[e]:i})}}onFormSubmit(){}};t.\u0275fac=function(e){return new(e||t)(r(y))},t.\u0275cmp=n({type:t,selectors:[["app-informacoes-sigilosas-administrativo"]],standalone:!0,features:[m],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,i){e&1&&(d(0,"div",0),g(1,"app-layout-forms-adm",1),p()),e&2&&(l(),s("titulo_pagina","Informa\xE7\xF5es Sigilosas")("dynamicFields",i.dynamicFields)("form",i.filtroForm))},dependencies:[c,v,f,u,F]});let a=t;return a})();var H=(()=>{let t=class t{constructor(o){this.fb=o,this.filtroForm=this.fb.group({pessoaResponsavel:[""],file:[""]}),this.dynamicFields=[{name:"pessoaResponsavel",type:"textarea",label:"Pessoa respons\xE1vel e os dados"},{name:"file",type:"file",fileType:"complex",label:"arquivo"}]}onFileChange(o,e){if(o.target.files.length>0){let i=o.target.files[0];this.filtroForm.patchValue({[e]:i})}}onFormSubmit(){}};t.\u0275fac=function(e){return new(e||t)(r(y))},t.\u0275cmp=n({type:t,selectors:[["app-lgpd-administrativo"]],standalone:!0,features:[m],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,i){e&1&&(d(0,"div",0),g(1,"app-layout-forms-adm",1),p()),e&2&&(l(),s("titulo_pagina","LGPD")("dynamicFields",i.dynamicFields)("form",i.filtroForm))},dependencies:[c,v,f,u,F]});let a=t;return a})();var K=(()=>{let t=class t{constructor(o){this.fb=o,this.filtroForm=this.fb.group({data:[""],file:[""],description:[""]}),this.dynamicFields=[{name:"description",type:"textarea",label:"Descri\xE7\xE3o"},{name:"data",type:"date",label:"data"},{name:"file",type:"file",fileType:"complex",label:"arquivo"}]}onFileChange(o,e){if(o.target.files.length>0){let i=o.target.files[0];this.filtroForm.patchValue({[e]:i})}}onFormSubmit(){}};t.\u0275fac=function(e){return new(e||t)(r(y))},t.\u0275cmp=n({type:t,selectors:[["app-julgamento-contas-administrativo"]],standalone:!0,features:[m],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,i){e&1&&(d(0,"div",0),g(1,"app-layout-forms-adm",1),p()),e&2&&(l(),s("titulo_pagina","Julgamento de contas")("dynamicFields",i.dynamicFields)("form",i.filtroForm))},dependencies:[c,v,f,u,F]});let a=t;return a})();var Q=(()=>{let t=class t{constructor(o){this.fb=o,this.filtroForm=this.fb.group({titulo:[""],data:[""],file:[""],description:[""]}),this.dynamicFields=[{name:"titulo",type:"text",label:"T\xEDtulo"},{name:"description",type:"textarea",label:"Disp\xF5e Sobre"},{name:"data",type:"date",label:"data"},{name:"file",type:"file",fileType:"complex",label:"arquivo"}]}onFileChange(o,e){if(o.target.files.length>0){let i=o.target.files[0];this.filtroForm.patchValue({[e]:i})}}onFormSubmit(){}};t.\u0275fac=function(e){return new(e||t)(r(y))},t.\u0275cmp=n({type:t,selectors:[["app-cadastrar-ldo-administrativo"]],standalone:!0,features:[m],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,i){e&1&&(d(0,"div",0),g(1,"app-layout-forms-adm",1),p()),e&2&&(l(),s("titulo_pagina","Cadastrar LDO")("dynamicFields",i.dynamicFields)("form",i.filtroForm))},dependencies:[c,v,f,u,F]});let a=t;return a})();var W=(()=>{let t=class t{constructor(o){this.fb=o,this.filtroForm=this.fb.group({titulo:[""],data:[""],file:[""],description:[""]}),this.dynamicFields=[{name:"titulo",type:"text",label:"T\xEDtulo"},{name:"description",type:"textarea",label:"Disp\xF5e Sobre"},{name:"data",type:"date",label:"data"},{name:"file",type:"file",fileType:"complex",label:"arquivo"}]}onFileChange(o,e){if(o.target.files.length>0){let i=o.target.files[0];this.filtroForm.patchValue({[e]:i})}}onFormSubmit(){}};t.\u0275fac=function(e){return new(e||t)(r(y))},t.\u0275cmp=n({type:t,selectors:[["app-cadastrar-loa-administrativo"]],standalone:!0,features:[m],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,i){e&1&&(d(0,"div",0),g(1,"app-layout-forms-adm",1),p()),e&2&&(l(),s("titulo_pagina","Cadastrar LOA")("dynamicFields",i.dynamicFields)("form",i.filtroForm))},dependencies:[c,v,f,u,F]});let a=t;return a})();var I=(()=>{let t=class t{constructor(o){this.fb=o,this.filtroForm=this.fb.group({titulo:[""],data:[""],file:[""],description:[""]}),this.dynamicFields=[{name:"titulo",type:"text",label:"T\xEDtulo"},{name:"description",type:"textarea",label:"Disp\xF5e Sobre"},{name:"data",type:"date",label:"data"},{name:"file",type:"file",fileType:"complex",label:"arquivo"}]}onFileChange(o,e){if(o.target.files.length>0){let i=o.target.files[0];this.filtroForm.patchValue({[e]:i})}}onFormSubmit(){}};t.\u0275fac=function(e){return new(e||t)(r(y))},t.\u0275cmp=n({type:t,selectors:[["app-cadastrar-lei-organica-administrativo"]],standalone:!0,features:[m],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,i){e&1&&(d(0,"div",0),g(1,"app-layout-forms-adm",1),p()),e&2&&(l(),s("titulo_pagina","Cadastrar Lei org\xE2nica")("dynamicFields",i.dynamicFields)("form",i.filtroForm))},dependencies:[c,v,f,u,F]});let a=t;return a})();var X=(()=>{let t=class t{constructor(o){this.fb=o,this.filtroForm=this.fb.group({titulo:[""],file:[""]}),this.dynamicFields=[{name:"titulo",type:"text",label:"T\xEDtulo da Lista"},{name:"file",type:"file",fileType:"complex",label:"arquivo"}]}onFileChange(o,e){if(o.target.files.length>0){let i=o.target.files[0];this.filtroForm.patchValue({[e]:i})}}onFormSubmit(){}};t.\u0275fac=function(e){return new(e||t)(r(y))},t.\u0275cmp=n({type:t,selectors:[["app-cadastrar-lista-preposicoes-administrativo"]],standalone:!0,features:[m],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,i){e&1&&(d(0,"div",0),g(1,"app-layout-forms-adm",1),p()),e&2&&(l(),s("titulo_pagina","Lista de Preposi\xE7\xF5es e Presen\xE7a")("dynamicFields",i.dynamicFields)("form",i.filtroForm))},dependencies:[c,v,f,u,F]});let a=t;return a})();var Y=(()=>{let t=class t{constructor(o){this.fb=o,this.filtroForm=this.fb.group({data:[""],file:[""]}),this.dynamicFields=[{name:"data",type:"date",label:"data"},{name:"file",type:"file",fileType:"complex",label:"arquivo"}]}onFileChange(o,e){if(o.target.files.length>0){let i=o.target.files[0];this.filtroForm.patchValue({[e]:i})}}onFormSubmit(){}};t.\u0275fac=function(e){return new(e||t)(r(y))},t.\u0275cmp=n({type:t,selectors:[["app-ordem-cronologica-administrativo"]],standalone:!0,features:[m],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,i){e&1&&(d(0,"div",0),g(1,"app-layout-forms-adm",1),p()),e&2&&(l(),s("titulo_pagina","Ordem cronol\xF3gica dos pagamentos")("dynamicFields",i.dynamicFields)("form",i.filtroForm))},dependencies:[c,v,f,u,F]});let a=t;return a})();var Z=(()=>{let t=class t{constructor(o){this.fb=o,this.filtroForm=this.fb.group({titulo:[""],data:[""],file:[""],description:[""]}),this.dynamicFields=[{name:"informeDadosOuvidoria",type:"textarea",label:"Informe dados sobre a ouvidoria"},{name:"data",type:"date",label:"data",page:"ouvidoria"},{name:"file",type:"file",fileType:"complex",label:"arquivo..."}]}onFileChange(o,e){if(o.target.files.length>0){let i=o.target.files[0];this.filtroForm.patchValue({[e]:i})}}onFormSubmit(){}};t.\u0275fac=function(e){return new(e||t)(r(y))},t.\u0275cmp=n({type:t,selectors:[["app-ouvidoria-administrativo"]],standalone:!0,features:[m],decls:2,vars:3,consts:[[1,"bkg-administrativo"],["app-formulario","",3,"titulo_pagina","dynamicFields","form"]],template:function(e,i){e&1&&(d(0,"div",0),g(1,"app-layout-forms-adm",1),p()),e&2&&(l(),s("titulo_pagina","Ouvidoria")("dynamicFields",i.dynamicFields)("form",i.filtroForm))},dependencies:[c,v,f,u,F],styles:["h1{color:#000;font-size:15px;font-style:normal;font-weight:800;line-height:122.487%;text-transform:uppercase}"]});let a=t;return a})();var et=[{path:"",component:V,children:[{path:"",redirectTo:"orgaos",pathMatch:"full"},{path:"adicionar-orgaos",component:N},{path:"adicionar-unidades",component:q},{path:"adicionar-licitacoes",component:k},{path:"adicionar-contratos",component:O},{path:"adicionar-agenda-do-presidente",component:R},{path:"adicionar-carta-servicos",component:_},{path:"adicionar-comissoes",component:w},{path:"adicionar-cotas-para-servico-parlamentar",component:J},{path:"adicionar-dados-abertos",component:U},{path:"adicionar-documentos-administrativos",component:G},{path:"adicionar-informacoes-sigilosas",component:z},{path:"adicionar-julgamentos-contas",component:K},{path:"adicionar-ldo",component:Q},{path:"adicionar-loa",component:W},{path:"adicionar-lei-organica",component:I},{path:"adicionar-legislacao",component:I},{path:"adicionar-lista-preposicao-presenca",component:X},{path:"adicionar-ordem-cronologica-pagamentos",component:Y},{path:"adicionar-ouvidoria",component:Z},{path:"adicionar-lgpd",component:H}]}],Oo=(()=>{let t=class t{};t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=B({type:t}),t.\u0275inj=L({imports:[C.forChild(et),C]});let a=t;return a})();export{Oo as PncpAdministrativoRoutingModule};
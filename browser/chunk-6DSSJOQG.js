import"./chunk-7PBE3EFL.js";import{a as de,b as pe,e as fe,f as ue,g as be,h as _e}from"./chunk-OEBQWMXH.js";import{i as I,j as ce}from"./chunk-B45GTQ5R.js";import{c as me}from"./chunk-KBSIUQDT.js";import"./chunk-E3L3BBCP.js";import"./chunk-737ECZJJ.js";import{c as J,d as K}from"./chunk-3EP5USAO.js";import"./chunk-JH3NOZ7V.js";import{a as Q,b as X}from"./chunk-D34OALG6.js";import{A as se,c as Z,e as ee,g as te,h as ie,j as O,l as oe,p as ne,r as re,v as ae,y as le}from"./chunk-EKWBU37W.js";import{a as Y}from"./chunk-OJRSRKRG.js";import"./chunk-AESYL7IM.js";import"./chunk-6ZCP5URB.js";import{a as V}from"./chunk-NCG5LLV2.js";import"./chunk-UFNKQZMC.js";import{c as H,d as W,g as F}from"./chunk-OHIPPJC7.js";import{b as z}from"./chunk-TKLJK2XU.js";import{Aa as b,Ba as _,Jb as l,Kb as a,Lb as h,Pb as A,Sb as g,Ub as f,Zc as L,a as S,bc as q,bd as U,cc as s,cd as $,dc as N,eb as p,ec as P,fb as C,ga as D,ha as j,jc as R,kc as E,la as v,nd as G,ra as w,sa as T,vc as B,xb as x,zb as u}from"./chunk-3R3OWISE.js";var ge=(()=>{let t=class t{constructor(){}ngOnInit(){}};t.\u0275fac=function(i){return new(i||t)},t.\u0275cmp=w({type:t,selectors:[["app-diario-oficial-administrativo-index"]],standalone:!0,features:[E],decls:1,vars:0,template:function(i,n){i&1&&h(0,"router-outlet")},dependencies:[F,H]});let o=t;return o})();var y=class{static toSubmit(t){console.log(t);let r=new FormData,e=S({},t);return r.append("date",e.date),r.append("description",e.description),e.files&&e.files.length>0?e.files.forEach(i=>{r.append("files[]",i)}):console.error("Nenhum arquivo foi selecionado."),r}};var ve=(()=>{let t=class t{constructor(e){this._http=e}publicarDiarioOficial(e){return this._http.post(`${V.apiUrl}/tenants/${V.tenant}/diario-oficial/official-gazettes`,e)}};t.\u0275fac=function(i){return new(i||t)(v(z))},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let o=t;return o})();var he=(()=>{let t=class t{constructor(e,i,n,d){this._repository=e,this._router=i,this._toastr=n,this._location=d}goBack(){this._location.back()}publicarDiarioOficial(e){this._repository.publicarDiarioOficial(e).subscribe({next:i=>{this._toastr.success(i.message||"Publica\xE7\xE3o realizada com sucesso!","Sucesso"),this.goBack()},error:i=>{let n=i?.error?.message||"Ocorreu um erro!";this._toastr.error(n,"Erro")}})}};t.\u0275fac=function(i){return new(i||t)(v(ve),v(W),v(Y),v(L))},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let o=t;return o})();function De(o,t){if(o&1&&(l(0,"p"),s(1),a()),o&2){let r,e=f(2);p(),P(" ",(r=e.formAgendado.get("files"))==null?null:r.value.name," ")}}function we(o,t){if(o&1){let r=A();l(0,"tr")(1,"td",27),s(2),a(),l(3,"td")(4,"div",28)(5,"div",29)(6,"a",30),g("click",function(){let i=b(r).$implicit,n=f(4);return _(n.viewFile(i))}),l(7,"mat-icon"),s(8,"visibility"),a()()(),l(9,"div",29)(10,"button",31),g("click",function(){let i=b(r).index,n=f(4);return _(n.removeFile(i))}),h(11,"img",32),a()()()()()}if(o&2){let r=t.$implicit;p(2),N(r.name)}}function Ae(o,t){if(o&1&&(l(0,"table",25)(1,"thead")(2,"tr")(3,"th"),s(4,"Arquivos Anexados"),a(),l(5,"th"),s(6,"A\xE7\xF5es"),a()()(),l(7,"tbody"),x(8,we,12,1,"tr",26),a()()),o&2){let r=f(3);p(8),u("ngForOf",r.selectedFiles)}}function Ee(o,t){if(o&1&&(l(0,"div",22)(1,"p",23),s(2),h(3,"br"),s(4," Tipos de arquivo aceitos: "),l(5,"strong"),s(6,".PDF"),a()(),x(7,Ae,9,1,"table",24),a()),o&2){let r=f(2);p(2),P(" ",r.nameFile||"Nenhum arquivo selecionado"," "),p(5),u("ngIf",r.selectedFiles.length>0)}}function Oe(o,t){if(o&1){let r=A();l(0,"div",4)(1,"h4",5),s(2,"Agendar Publica\xE7\xE3o"),a(),l(3,"button",6),g("click",function(){b(r);let i=f();return _(i.modalRef==null?null:i.modalRef.hide())}),l(4,"span",7),s(5,"\xD7"),a()()(),l(6,"div",8)(7,"form",9),g("ngSubmit",function(){b(r);let i=f();return _(i.onSubmitAgendado())}),l(8,"div",10)(9,"label",11),s(10,"Data Agendada"),a(),h(11,"input",12),a(),l(12,"div",10)(13,"label",13),s(14,"Arquivo"),a(),l(15,"input",14),g("change",function(i){b(r);let n=f();return _(n.onFileChangeAgendado(i,"file"))}),a(),x(16,De,2,1,"p",15),a(),l(17,"div",10)(18,"label",16),s(19,"Descri\xE7\xE3o"),a(),h(20,"textarea",17),a(),l(21,"div",18)(22,"button",19),s(23," Confirmar Agendamento "),a(),l(24,"button",20),s(25," Cancelar "),a()()(),x(26,Ee,8,2,"div",21),a()}if(o&2){let r,e=f();p(7),u("formGroup",e.formAgendado),p(4),u("minDate",e.minDate)("bsConfig",e.bsConfig),p(5),u("ngIf",(r=e.formAgendado.get("files"))==null?null:r.value),p(6),u("disabled",!e.formAgendado.valid),p(4),u("ngIf",e.selectedFiles.length>0)}}de("pt-br",pe);var xe=(()=>{let t=class t{constructor(e,i,n,d){this._localeService=e,this.fb=i,this._modalService=n,this._publicarService=d,this.filtroForm=this.fb.group({}),this.formAgendado=this.fb.group({files:new O(""),date:new O(""),description:new O("")}),this.nameFile=null,this.selectedFiles=[],this.minDate=new Date,this.bsConfig=Object.assign({},{containerClass:"theme-default"}),this.dynamicFields=[{name:"date",type:"date",label:"Data",required:!0,value:new Date,disabled:!0},{name:"description",type:"textarea",label:"Descri\xE7\xE3o",required:!0},{name:"files",type:"file",fileType:"complex",label:"Arquivo",required:!0}],e.use("pt-br"),this.dynamicFields.forEach(m=>{let c=m.required?[ee.required]:[];m.type==="file"?this.filtroForm.addControl(m.name,this.fb.control(null,c)):m.type==="checkbox"?this.filtroForm.addControl(m.name,this.fb.control(!1,c)):m.type==="date"?this.filtroForm.addControl(m.name,this.fb.control({value:new Date,disabled:!0},c)):this.filtroForm.addControl(m.name,this.fb.control("teste",c))})}ngOnInit(){}onFormSubmit(e){let i=y.toSubmit(e);this._publicarService.publicarDiarioOficial(i)}onSubmitAgendado(){if(this.formAgendado.valid){let e=S({},this.formAgendado.getRawValue());Object.keys(e).forEach(i=>{this.formAgendado.get(i)?.value instanceof Date&&(e[i]=this.formAgendado.get(i)?.value.toISOString())}),this._publicarService.publicarDiarioOficial(y.toSubmit(e))}}onFileChangeAgendado(e,i){let n=e.target.files,d=[],m=[];if(n&&n.length>0){for(let c=0;c<n.length;c++){let M=n[c];M.type==="application/pdf"?d.push(M):m.push(M.name)}d.length>0&&(this.selectedFiles=d,this.nameFile=d.map(c=>c.name).join(", "),this.formAgendado.controls.files.setValue(this.selectedFiles),this.formAgendado.get(i)?.updateValueAndValidity()),m.length>0&&alert(`Os seguintes arquivos n\xE3o s\xE3o PDFs e foram ignorados: ${m.join(", ")}`)}}viewFile(e){let i=URL.createObjectURL(e),n=window.open(i,"_blank");if(n){let d=setInterval(()=>{n.closed&&clearInterval(d)},500)}}removeFile(e){this.selectedFiles.splice(e,1),this.selectedFiles.length===0&&(this.nameFile=null)}openModal(e){this.modalRef=this._modalService.show(e,Object.assign({},{class:"modal-lg"}))}};t.\u0275fac=function(i){return new(i||t)(C(fe),C(le),C(I),C(he))},t.\u0275cmp=w({type:t,selectors:[["app-publicar-diario-oficial-administrativo"]],standalone:!0,features:[R([I]),E],decls:6,vars:3,consts:[["template",""],[1,"bkg-administrativo"],["app-formulario","",3,"formSubmit","titulo_pagina","dynamicFields","form"],[1,"btn","btn-dark","btn-agendar",3,"click"],[1,"modal-header"],[1,"modal-title","pull-left"],["type","button","aria-label","Close",1,"btn-close","close","pull-right",3,"click"],["aria-hidden","true",1,"visually-hidden"],[1,"modal-body"],[3,"ngSubmit","formGroup"],[1,"mb-3"],["for","dataAgendada"],["type","text","placeholder","Data","formControlName","date","bsDatepicker","",1,"form-control",3,"minDate","bsConfig"],["for","fileUpload2"],["type","file","id","fileUpload2","accept",".pdf","formControlName","files",1,"form-control",3,"change"],[4,"ngIf"],["for","description"],["id","description","formControlName","description","required","",1,"form-control"],[1,"d-flex","justify-content-center","align-items-center","flex-column","gap-2","w-100","mt-3"],["type","submit","data-bs-dismiss","modal",1,"btn","btn-lg","btn-dark","w-100",3,"disabled"],["type","button","data-bs-dismiss","modal",1,"btn","btn-lg","btn-outline-dark","w-100"],["class","upload-content",4,"ngIf"],[1,"upload-content"],[1,"file-upload-instructions"],["class","table table-bordered table-sm mt-5",4,"ngIf"],[1,"table","table-bordered","table-sm","mt-5"],[4,"ngFor","ngForOf"],[1,"p-3"],[1,"row"],[1,"col"],["mat-icon-button","","color","accent",3,"click"],[1,"btn-format","btn-format","btn-remove","mt-2",3,"click"],["src","../../../../../assets/icons/remove-icon.svg","alt","Remover"]],template:function(i,n){if(i&1){let d=A();l(0,"div",1)(1,"app-layout-forms-adm",2),g("formSubmit",function(c){return b(d),_(n.onFormSubmit(c))}),a(),l(2,"button",3),g("click",function(){b(d);let c=q(5);return _(n.openModal(c))}),s(3," Agendar publica\xE7\xE3o"),a()(),x(4,Oe,27,6,"ng-template",null,0,B)}i&2&&(p(),u("titulo_pagina","Publicar no di\xE1rio oficial")("dynamicFields",n.dynamicFields)("form",n.filtroForm))},dependencies:[G,U,$,se,oe,Z,te,ie,ae,ne,re,ce,X,Q,K,J,_e,ue,be,me],styles:[".bkg-administrativo[_ngcontent-%COMP%]{position:relative}.bkg-administrativo[_ngcontent-%COMP%]   .btn-agendar[_ngcontent-%COMP%]{position:absolute;bottom:94px;right:44px}.btn-dark[_ngcontent-%COMP%]:hover{background-color:#057a0b}  .mat-mdc-form-field .mdc-text-field__input{text-align:center!important;color:#000!important}"]});let o=t;return o})();var Ie=[{path:"",component:ge,children:[{path:"",redirectTo:"gerenciar",pathMatch:"full"},{path:"publicar",component:xe}]}],lt=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=T({type:t}),t.\u0275inj=j({imports:[F.forChild(Ie),F]});let o=t;return o})();export{lt as DiarioOficialAdministrativoRoutingModule};
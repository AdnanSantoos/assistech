import './polyfills.server.mjs';
import{a as fe,b as P,e as ue,f as be,g as _e,h as ge}from"./chunk-Y2MQ642V.mjs";import{i as E,j as pe}from"./chunk-H62SANPH.mjs";import{c as de}from"./chunk-DNXLFQ73.mjs";import"./chunk-GQ5VW6DQ.mjs";import{A as me,c as te,e as ie,g as oe,h as ne,j as k,l as re,p as ae,r as le,v as ce,y as se}from"./chunk-HKPF4WWF.mjs";import"./chunk-E6GKQ2BG.mjs";import{c as J,d as K}from"./chunk-23X2HCAU.mjs";import{a as ee}from"./chunk-ASEWUHNV.mjs";import"./chunk-55IKNV4Z.mjs";import"./chunk-HV42ZY6N.mjs";import"./chunk-YG54OGXN.mjs";import"./chunk-U7GKTG2D.mjs";import{a as Q,b as X}from"./chunk-VOE2BQPC.mjs";import{a as Y,b as Z}from"./chunk-ABCNLK2Q.mjs";import"./chunk-5EAGQFV4.mjs";import{c as H,e as W,h as F}from"./chunk-DMMZOU22.mjs";import{b as z}from"./chunk-EVPDCH5S.mjs";import{Ib as l,Jb as a,Kb as v,Ob as w,Rb as g,Tb as f,ac as T,bc as c,ca as y,cc as R,da as V,db as p,dc as M,eb as C,ed as N,ha as h,ic as q,id as U,jc as A,jd as G,na as D,oa as j,uc as B,ud as $,wa as u,wb as x,xa as b,yb as _}from"./chunk-6ZJAAIVQ.mjs";import{a as S}from"./chunk-VVCT4QZE.mjs";var he=(()=>{let i=class i{constructor(){}ngOnInit(){}};i.\u0275fac=function(t){return new(t||i)},i.\u0275cmp=D({type:i,selectors:[["app-diario-oficial-administrativo-index"]],standalone:!0,features:[A],decls:1,vars:0,template:function(t,r){t&1&&v(0,"router-outlet")},dependencies:[F,H]});let o=i;return o})();var L=class{static toSubmit(i){console.log(i);let n=new FormData,e=S({},i);return n.append("date",e.date),n.append("description",e.description),e.files&&e.files.length>0?e.files.forEach(t=>{n.append("files[]",t)}):console.error("Nenhum arquivo foi selecionado."),n}};var ve=(()=>{let i=class i{constructor(e,t){this._http=e,this._tenantService=t}publicarDiarioOficial(e){return this._http.post(`${Y.API_URL}/tenants/${this._tenantService.getTenant()}/diario-oficial/official-gazettes`,e)}};i.\u0275fac=function(t){return new(t||i)(h(z),h(Z))},i.\u0275prov=y({token:i,factory:i.\u0275fac,providedIn:"root"});let o=i;return o})();var xe=(()=>{let i=class i{constructor(e,t,r,d){this._repository=e,this._router=t,this._toastr=r,this._location=d}goBack(){this._location.back()}publicarDiarioOficial(e){this._repository.publicarDiarioOficial(e).subscribe({next:t=>{this._toastr.success(t.message||"Publica\xE7\xE3o realizada com sucesso!","Sucesso"),this.goBack()},error:t=>{let r=t?.error?.message||"Ocorreu um erro!";this._toastr.error(r,"Erro")}})}};i.\u0275fac=function(t){return new(t||i)(h(ve),h(W),h(ee),h(N))},i.\u0275prov=y({token:i,factory:i.\u0275fac,providedIn:"root"});let o=i;return o})();function De(o,i){if(o&1&&(l(0,"p"),c(1),a()),o&2){let n,e=f(2);p(),M(" ",(n=e.formAgendado.get("files"))==null?null:n.value.name," ")}}function we(o,i){if(o&1){let n=w();l(0,"tr")(1,"td",27),c(2),a(),l(3,"td")(4,"div",28)(5,"div",29)(6,"a",30),g("click",function(){let t=u(n).$implicit,r=f(4);return b(r.viewFile(t))}),l(7,"mat-icon"),c(8,"visibility"),a()()(),l(9,"div",29)(10,"button",31),g("click",function(){let t=u(n).index,r=f(4);return b(r.removeFile(t))}),v(11,"img",32),a()()()()()}if(o&2){let n=i.$implicit;p(2),R(n.name)}}function Ae(o,i){if(o&1&&(l(0,"table",25)(1,"thead")(2,"tr")(3,"th"),c(4,"Arquivos Anexados"),a(),l(5,"th"),c(6,"A\xE7\xF5es"),a()()(),l(7,"tbody"),x(8,we,12,1,"tr",26),a()()),o&2){let n=f(3);p(8),_("ngForOf",n.selectedFiles)}}function ke(o,i){if(o&1&&(l(0,"div",22)(1,"p",23),c(2),v(3,"br"),c(4," Tipos de arquivo aceitos: "),l(5,"strong"),c(6,".PDF"),a()(),x(7,Ae,9,1,"table",24),a()),o&2){let n=f(2);p(2),M(" ",n.nameFile||"Nenhum arquivo selecionado"," "),p(5),_("ngIf",n.selectedFiles.length>0)}}function Ee(o,i){if(o&1){let n=w();l(0,"div",4)(1,"h4",5),c(2,"Agendar Publica\xE7\xE3o"),a(),l(3,"button",6),g("click",function(){u(n);let t=f();return b(t.modalRef==null?null:t.modalRef.hide())}),l(4,"span",7),c(5,"\xD7"),a()()(),l(6,"div",8)(7,"form",9),g("ngSubmit",function(){u(n);let t=f();return b(t.onSubmitAgendado())}),l(8,"div",10)(9,"label",11),c(10,"Data Agendada"),a(),v(11,"input",12),a(),l(12,"div",10)(13,"label",13),c(14,"Arquivo"),a(),l(15,"input",14),g("change",function(t){u(n);let r=f();return b(r.onFileChangeAgendado(t,"file"))}),a(),x(16,De,2,1,"p",15),a(),l(17,"div",10)(18,"label",16),c(19,"Descri\xE7\xE3o"),a(),v(20,"textarea",17),a(),l(21,"div",18)(22,"button",19),c(23," Confirmar Agendamento "),a(),l(24,"button",20),g("click",function(){u(n);let t=f();return b(t.closeModal())}),c(25," Cancelar "),a()()(),x(26,ke,8,2,"div",21),a()}if(o&2){let n,e=f();p(7),_("formGroup",e.formAgendado),p(4),_("minDate",e.minDate)("bsConfig",e.bsConfig),p(5),_("ngIf",(n=e.formAgendado.get("files"))==null?null:n.value),p(6),_("disabled",!e.formAgendado.valid),p(4),_("ngIf",e.selectedFiles.length>0)}}fe("pt-br",P);var Ce=(()=>{let i=class i{constructor(e,t,r,d){this._localeService=e,this.fb=t,this._modalService=r,this._publicarService=d,this.filtroForm=this.fb.group({}),this.formAgendado=this.fb.group({files:new k(""),date:new k(""),description:new k("")}),this.nameFile=null,this.selectedFiles=[],this.minDate=new Date,this.bsConfig=Object.assign({},{containerClass:"theme-default"}),this.dynamicFields=[{name:"date",type:"date",label:"Data",required:!0,value:new Date,disabled:!0},{name:"description",type:"textarea",label:"Descri\xE7\xE3o",required:!0},{name:"files",type:"file",fileType:"complex",label:"Arquivo",required:!0}],e.use("pt-br"),this.dynamicFields.forEach(s=>{let m=s.required?[ie.required]:[];s.type==="file"?this.filtroForm.addControl(s.name,this.fb.control(null,m)):s.type==="checkbox"?this.filtroForm.addControl(s.name,this.fb.control(!1,m)):s.type==="date"?this.filtroForm.addControl(s.name,this.fb.control({value:new Date,disabled:!0},m)):this.filtroForm.addControl(s.name,this.fb.control("teste",m))})}ngOnInit(){}onFormSubmit(e){let t=L.toSubmit(e);this._publicarService.publicarDiarioOficial(t)}onSubmitAgendado(){if(this.formAgendado.valid){let e=S({},this.formAgendado.getRawValue());Object.keys(e).forEach(t=>{this.formAgendado.get(t)?.value instanceof Date&&(e[t]=this.formAgendado.get(t)?.value.toISOString())}),this._publicarService.publicarDiarioOficial(L.toSubmit(e))}}onFileChangeAgendado(e,t){let r=e.target.files,d=[],s=[];if(r&&r.length>0){for(let m=0;m<r.length;m++){let I=r[m];I.type==="application/pdf"?d.push(I):s.push(I.name)}d.length>0&&(this.selectedFiles=d,this.nameFile=d.map(m=>m.name).join(", "),this.formAgendado.controls.files.setValue(this.selectedFiles),this.formAgendado.get(t)?.updateValueAndValidity()),s.length>0&&alert(`Os seguintes arquivos n\xE3o s\xE3o PDFs e foram ignorados: ${s.join(", ")}`)}}viewFile(e){let t=URL.createObjectURL(e),r=window.open(t,"_blank");if(r){let d=setInterval(()=>{r.closed&&clearInterval(d)},500)}}removeFile(e){this.selectedFiles.splice(e,1),this.selectedFiles.length===0&&(this.nameFile=null)}openModal(e){this.modalRef=this._modalService.show(e,Object.assign({},{class:"modal-lg"}))}closeModal(){this.modalRef&&(this.modalRef.hide(),this.modalRef=void 0)}};i.\u0275fac=function(t){return new(t||i)(C(ue),C(se),C(E),C(xe))},i.\u0275cmp=D({type:i,selectors:[["app-publicar-diario-oficial-administrativo"]],standalone:!0,features:[q([E]),A],decls:6,vars:3,consts:[["template",""],[1,"bkg-administrativo"],["app-formulario","",3,"formSubmit","titulo_pagina","dynamicFields","form"],[1,"btn","btn-dark","btn-agendar",3,"click"],[1,"modal-header"],[1,"modal-title","pull-left"],["type","button","aria-label","Close",1,"btn-close","close","pull-right",3,"click"],["aria-hidden","true",1,"visually-hidden"],[1,"modal-body"],[3,"ngSubmit","formGroup"],[1,"mb-3"],["for","dataAgendada"],["type","text","placeholder","Data","formControlName","date","bsDatepicker","",1,"form-control",3,"minDate","bsConfig"],["for","fileUpload2"],["type","file","id","fileUpload2","accept",".pdf","formControlName","files",1,"form-control",3,"change"],[4,"ngIf"],["for","description"],["id","description","formControlName","description","required","",1,"form-control"],[1,"d-flex","justify-content-center","align-items-center","flex-column","gap-2","w-100","mt-3"],["type","submit","data-bs-dismiss","modal",1,"btn","btn-lg","btn-dark","w-100",3,"disabled"],["type","button","data-bs-dismiss","modal",1,"btn","btn-lg","btn-outline-dark","w-100",3,"click"],["class","upload-content",4,"ngIf"],[1,"upload-content"],[1,"file-upload-instructions"],["class","table table-bordered table-sm mt-5",4,"ngIf"],[1,"table","table-bordered","table-sm","mt-5"],[4,"ngFor","ngForOf"],[1,"p-3"],[1,"row"],[1,"col"],["mat-icon-button","","color","accent",3,"click"],[1,"btn-format","btn-format","btn-remove","mt-2",3,"click"],["src","../../../../../assets/icons/remove-icon.svg","alt","Remover"]],template:function(t,r){if(t&1){let d=w();l(0,"div",1)(1,"app-layout-forms-adm",2),g("formSubmit",function(m){return u(d),b(r.onFormSubmit(m))}),a(),l(2,"button",3),g("click",function(){u(d);let m=T(5);return b(r.openModal(m))}),c(3," Agendar publica\xE7\xE3o"),a()(),x(4,Ee,27,6,"ng-template",null,0,B)}t&2&&(p(),_("titulo_pagina","Publicar no di\xE1rio oficial")("dynamicFields",r.dynamicFields)("form",r.filtroForm))},dependencies:[$,U,G,me,re,te,oe,ne,ce,ae,le,pe,X,Q,K,J,ge,be,_e,de],styles:[".bkg-administrativo[_ngcontent-%COMP%]{position:relative}.bkg-administrativo[_ngcontent-%COMP%]   .btn-agendar[_ngcontent-%COMP%]{position:absolute;bottom:94px;right:44px}.btn-dark[_ngcontent-%COMP%]:hover{background-color:#057a0b}  .mat-mdc-form-field .mdc-text-field__input{text-align:center!important;color:#000!important}"]});let o=i;return o})();var Oe=[{path:"",component:he,children:[{path:"",redirectTo:"gerenciar",pathMatch:"full"},{path:"publicar",component:Ce}]}],ti=(()=>{let i=class i{};i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=j({type:i}),i.\u0275inj=V({imports:[F.forChild(Oe),F]});let o=i;return o})();export{ti as DiarioOficialAdministrativoRoutingModule};
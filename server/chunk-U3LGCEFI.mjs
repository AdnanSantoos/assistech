import './polyfills.server.mjs';
import{a as pe,b as V,c as fe,d as ue,e as be,f as _e}from"./chunk-WIEWFIIC.mjs";import"./chunk-QXDUZG5Y.mjs";import{i as k,j as de}from"./chunk-PFD4TLKP.mjs";import{a as me}from"./chunk-MVP5PD6J.mjs";import"./chunk-BS4R6EWL.mjs";import{A as se,c as ee,e as te,g as ie,h as oe,j as E,l as ne,p as re,r as ae,v as le,y as ce}from"./chunk-HO6XFDP7.mjs";import"./chunk-MWOARE3M.mjs";import{c as K,d as Q}from"./chunk-LP4PQ3FH.mjs";import{a as Z}from"./chunk-J2Z2G5EJ.mjs";import"./chunk-EPHM4TKN.mjs";import"./chunk-25BIHLEM.mjs";import"./chunk-YG54OGXN.mjs";import"./chunk-7PKCKWUI.mjs";import{a as X,b as Y}from"./chunk-OD2CM6PR.mjs";import"./chunk-5UD5BCU7.mjs";import{a as P}from"./chunk-AZ43DKBQ.mjs";import"./chunk-ES72LBKA.mjs";import{c as W,e as J,h as F}from"./chunk-M3KATLBG.mjs";import{b as H}from"./chunk-CFEMM5MG.mjs";import{Ib as l,Jb as a,Kb as v,Ob as w,Rb as g,Tb as f,ac as q,bc as c,ca as S,cc as B,da as j,db as p,dc as M,dd as U,eb as C,ha as h,hd as G,ic as N,id as $,jc as A,na as D,oa as T,rd as z,tc as R,wa as b,wb as x,xa as _,yb as u}from"./chunk-T443Y2IT.mjs";import{a as y}from"./chunk-VVCT4QZE.mjs";var ge=(()=>{let t=class t{constructor(){}ngOnInit(){}};t.\u0275fac=function(i){return new(i||t)},t.\u0275cmp=D({type:t,selectors:[["app-diario-oficial-administrativo-index"]],standalone:!0,features:[A],decls:1,vars:0,template:function(i,n){i&1&&v(0,"router-outlet")},dependencies:[F,W]});let o=t;return o})();var L=class{static toSubmit(t){console.log(t);let r=new FormData,e=y({},t);return r.append("date",e.date),r.append("description",e.description),e.files&&e.files.length>0?e.files.forEach(i=>{r.append("files[]",i)}):console.error("Nenhum arquivo foi selecionado."),r}};var he=(()=>{let t=class t{constructor(e){this._http=e}publicarDiarioOficial(e){return this._http.post(`${P.apiUrl}/tenants/${P.tenant}/diario-oficial/official-gazettes`,e)}};t.\u0275fac=function(i){return new(i||t)(h(H))},t.\u0275prov=S({token:t,factory:t.\u0275fac,providedIn:"root"});let o=t;return o})();var ve=(()=>{let t=class t{constructor(e,i,n,d){this._repository=e,this._router=i,this._toastr=n,this._location=d}goBack(){this._location.back()}publicarDiarioOficial(e){this._repository.publicarDiarioOficial(e).subscribe({next:i=>{this._toastr.success(i.message||"Publica\xE7\xE3o realizada com sucesso!","Sucesso"),this.goBack()},error:i=>{let n=i?.error?.message||"Ocorreu um erro!";this._toastr.error(n,"Erro")}})}};t.\u0275fac=function(i){return new(i||t)(h(he),h(J),h(Z),h(U))},t.\u0275prov=S({token:t,factory:t.\u0275fac,providedIn:"root"});let o=t;return o})();function Se(o,t){if(o&1&&(l(0,"p"),c(1),a()),o&2){let r,e=f(2);p(),M(" ",(r=e.formAgendado.get("files"))==null?null:r.value.name," ")}}function De(o,t){if(o&1){let r=w();l(0,"tr")(1,"td",27),c(2),a(),l(3,"td")(4,"div",28)(5,"div",29)(6,"a",30),g("click",function(){let i=b(r).$implicit,n=f(4);return _(n.viewFile(i))}),l(7,"mat-icon"),c(8,"visibility"),a()()(),l(9,"div",29)(10,"button",31),g("click",function(){let i=b(r).index,n=f(4);return _(n.removeFile(i))}),v(11,"img",32),a()()()()()}if(o&2){let r=t.$implicit;p(2),B(r.name)}}function we(o,t){if(o&1&&(l(0,"table",25)(1,"thead")(2,"tr")(3,"th"),c(4,"Arquivos Anexados"),a(),l(5,"th"),c(6,"A\xE7\xF5es"),a()()(),l(7,"tbody"),x(8,De,12,1,"tr",26),a()()),o&2){let r=f(3);p(8),u("ngForOf",r.selectedFiles)}}function Ae(o,t){if(o&1&&(l(0,"div",22)(1,"p",23),c(2),v(3,"br"),c(4," Tipos de arquivo aceitos: "),l(5,"strong"),c(6,".PDF"),a()(),x(7,we,9,1,"table",24),a()),o&2){let r=f(2);p(2),M(" ",r.nameFile||"Nenhum arquivo selecionado"," "),p(5),u("ngIf",r.selectedFiles.length>0)}}function Ee(o,t){if(o&1){let r=w();l(0,"div",4)(1,"h4",5),c(2,"Agendar Publica\xE7\xE3o"),a(),l(3,"button",6),g("click",function(){b(r);let i=f();return _(i.modalRef==null?null:i.modalRef.hide())}),l(4,"span",7),c(5,"\xD7"),a()()(),l(6,"div",8)(7,"form",9),g("ngSubmit",function(){b(r);let i=f();return _(i.onSubmitAgendado())}),l(8,"div",10)(9,"label",11),c(10,"Data Agendada"),a(),v(11,"input",12),a(),l(12,"div",10)(13,"label",13),c(14,"Arquivo"),a(),l(15,"input",14),g("change",function(i){b(r);let n=f();return _(n.onFileChangeAgendado(i,"file"))}),a(),x(16,Se,2,1,"p",15),a(),l(17,"div",10)(18,"label",16),c(19,"Descri\xE7\xE3o"),a(),v(20,"textarea",17),a(),l(21,"div",18)(22,"button",19),c(23," Confirmar Agendamento "),a(),l(24,"button",20),c(25," Cancelar "),a()()(),x(26,Ae,8,2,"div",21),a()}if(o&2){let r,e=f();p(7),u("formGroup",e.formAgendado),p(4),u("minDate",e.minDate)("bsConfig",e.bsConfig),p(5),u("ngIf",(r=e.formAgendado.get("files"))==null?null:r.value),p(6),u("disabled",!e.formAgendado.valid),p(4),u("ngIf",e.selectedFiles.length>0)}}pe("pt-br",V);var xe=(()=>{let t=class t{constructor(e,i,n,d){this._localeService=e,this.fb=i,this._modalService=n,this._publicarService=d,this.filtroForm=this.fb.group({}),this.formAgendado=this.fb.group({files:new E(""),date:new E(""),description:new E("")}),this.nameFile=null,this.selectedFiles=[],this.minDate=new Date,this.bsConfig=Object.assign({},{containerClass:"theme-default"}),this.dynamicFields=[{name:"date",type:"date",label:"Data",required:!0,value:new Date,disabled:!0},{name:"description",type:"textarea",label:"Descri\xE7\xE3o",required:!0},{name:"files",type:"file",fileType:"complex",label:"Arquivo",required:!0}],e.use("pt-br"),this.dynamicFields.forEach(s=>{let m=s.required?[te.required]:[];s.type==="file"?this.filtroForm.addControl(s.name,this.fb.control(null,m)):s.type==="checkbox"?this.filtroForm.addControl(s.name,this.fb.control(!1,m)):s.type==="date"?this.filtroForm.addControl(s.name,this.fb.control({value:new Date,disabled:!0},m)):this.filtroForm.addControl(s.name,this.fb.control("teste",m))})}ngOnInit(){}onFormSubmit(e){let i=L.toSubmit(e);this._publicarService.publicarDiarioOficial(i)}onSubmitAgendado(){if(this.formAgendado.valid){let e=y({},this.formAgendado.getRawValue());Object.keys(e).forEach(i=>{this.formAgendado.get(i)?.value instanceof Date&&(e[i]=this.formAgendado.get(i)?.value.toISOString())}),this._publicarService.publicarDiarioOficial(L.toSubmit(e))}}onFileChangeAgendado(e,i){let n=e.target.files,d=[],s=[];if(n&&n.length>0){for(let m=0;m<n.length;m++){let I=n[m];I.type==="application/pdf"?d.push(I):s.push(I.name)}d.length>0&&(this.selectedFiles=d,this.nameFile=d.map(m=>m.name).join(", "),this.formAgendado.controls.files.setValue(this.selectedFiles),this.formAgendado.get(i)?.updateValueAndValidity()),s.length>0&&alert(`Os seguintes arquivos n\xE3o s\xE3o PDFs e foram ignorados: ${s.join(", ")}`)}}viewFile(e){let i=URL.createObjectURL(e),n=window.open(i,"_blank");if(n){let d=setInterval(()=>{n.closed&&clearInterval(d)},500)}}removeFile(e){this.selectedFiles.splice(e,1),this.selectedFiles.length===0&&(this.nameFile=null)}openModal(e){this.modalRef=this._modalService.show(e,Object.assign({},{class:"modal-lg"}))}};t.\u0275fac=function(i){return new(i||t)(C(fe),C(ce),C(k),C(ve))},t.\u0275cmp=D({type:t,selectors:[["app-publicar-diario-oficial-administrativo"]],standalone:!0,features:[N([k]),A],decls:6,vars:3,consts:[["template",""],[1,"bkg-administrativo"],["app-formulario","",3,"formSubmit","titulo_pagina","dynamicFields","form"],[1,"btn","btn-dark","btn-agendar",3,"click"],[1,"modal-header"],[1,"modal-title","pull-left"],["type","button","aria-label","Close",1,"btn-close","close","pull-right",3,"click"],["aria-hidden","true",1,"visually-hidden"],[1,"modal-body"],[3,"ngSubmit","formGroup"],[1,"mb-3"],["for","dataAgendada"],["type","text","placeholder","Data","formControlName","date","bsDatepicker","",1,"form-control",3,"minDate","bsConfig"],["for","fileUpload2"],["type","file","id","fileUpload2","accept",".pdf","formControlName","files",1,"form-control",3,"change"],[4,"ngIf"],["for","description"],["id","description","formControlName","description","required","",1,"form-control"],[1,"d-flex","justify-content-center","align-items-center","flex-column","gap-2","w-100","mt-3"],["type","submit","data-bs-dismiss","modal",1,"btn","btn-lg","btn-dark","w-100",3,"disabled"],["type","button","data-bs-dismiss","modal",1,"btn","btn-lg","btn-outline-dark","w-100"],["class","upload-content",4,"ngIf"],[1,"upload-content"],[1,"file-upload-instructions"],["class","table table-bordered table-sm mt-5",4,"ngIf"],[1,"table","table-bordered","table-sm","mt-5"],[4,"ngFor","ngForOf"],[1,"p-3"],[1,"row"],[1,"col-2"],["mat-icon-button","","color","accent",3,"click"],[1,"btn-format","btn-format","btn-remove","mt-2",3,"click"],["src","../../../../../assets/icons/remove-icon.svg","alt","Remover"]],template:function(i,n){if(i&1){let d=w();l(0,"div",1)(1,"app-layout-forms-adm",2),g("formSubmit",function(m){return b(d),_(n.onFormSubmit(m))}),a(),l(2,"button",3),g("click",function(){b(d);let m=q(5);return _(n.openModal(m))}),c(3," Agendar publica\xE7\xE3o"),a()(),x(4,Ee,27,6,"ng-template",null,0,R)}i&2&&(p(),u("titulo_pagina","Publicar no di\xE1rio oficial")("dynamicFields",n.dynamicFields)("form",n.filtroForm))},dependencies:[z,G,$,se,ne,ee,ie,oe,le,re,ae,de,Y,X,Q,K,_e,ue,be,me],styles:[".bkg-administrativo[_ngcontent-%COMP%]{position:relative}.bkg-administrativo[_ngcontent-%COMP%]   .btn-agendar[_ngcontent-%COMP%]{position:absolute;bottom:94px;right:44px}"]});let o=t;return o})();var ke=[{path:"",component:ge,children:[{path:"",redirectTo:"gerenciar",pathMatch:"full"},{path:"publicar",component:xe}]}],Zt=(()=>{let t=class t{};t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=T({type:t}),t.\u0275inj=j({imports:[F.forChild(ke),F]});let o=t;return o})();export{Zt as DiarioOficialAdministrativoRoutingModule};
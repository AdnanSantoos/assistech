import './polyfills.server.mjs';
import{b as $,d as q}from"./chunk-D6QAECO7.mjs";import{c as Q}from"./chunk-C4BKMEJ5.mjs";import{a as D}from"./chunk-3JUGSVLW.mjs";import{c as U,d as O,f as x,g as v,i as k}from"./chunk-YG54OGXN.mjs";import{a as G,b as H}from"./chunk-LUFFFVZ5.mjs";import{a as K}from"./chunk-I3725CSD.mjs";import{a as B,e as X,f as J}from"./chunk-CM3HZ6AD.mjs";import{$a as I,Ib as e,Jb as o,Kb as d,Lb as f,Mb as P,Ob as b,Rb as h,Tb as m,ac as S,bc as g,cc as T,db as c,dd as z,eb as p,gd as A,ic as E,id as V,jc as R,lc as L,mc as j,na as y,rd as F,tc as N,wa as u,wb as _,xa as C,yb as l}from"./chunk-K6K74AZI.mjs";var Y=(t,i)=>({"justify-content-center":t,"justify-content-between":i}),Z=t=>({ativo:t});function tt(t,i){if(t&1&&(e(0,"div",21)(1,"h6",22),g(2,"Seja Bem Vindo,"),o(),e(3,"h2",23),g(4),o()()),t&2){let s=m();c(4),T(s.logoText2)}}function nt(t,i){t&1&&(e(0,"a",24),d(1,"img",25),e(2,"p"),g(3,"eSIC"),o()())}function et(t,i){t&1&&(e(0,"a",26),d(1,"img",27),o())}function ot(t,i){if(t&1){let s=b();f(0),e(1,"div",29),h("click",function(){u(s);let a=m(2);return C(a.navigate())}),d(2,"div",30),e(3,"div",31),g(4,"fazer login"),o()(),P()}}function it(t,i){if(t&1){let s=b();e(0,"div",32)(1,"div",33),h("click",function(){u(s);let a=m(2);return C(a.logout())}),d(2,"img",34),e(3,"div",31),g(4," Sair "),o()()()}}function at(t,i){if(t&1&&(f(0),_(1,ot,5,0,"ng-container",28)(2,it,5,0,"ng-template",null,0,N),P()),t&2){let s=S(3),n=m();c(),l("ngIf",!n.isAdmRoute)("ngIfElse",s)}}function rt(t,i){if(t&1){let s=b();e(0,"div",35)(1,"button",36),h("click",function(){u(s);let a=m();return C(a.toggleMenu())}),e(2,"mat-icon"),g(3,"menu"),o()()()}}var ft=(()=>{let i=class i{constructor(n,a,r,w){this.router=n,this.location=a,this.tenantService=r,this._loginService=w,this.mobile=!1,this.logoText1="",this.logoText2="",this.tipoRota=null,this.isAdmRoute=!1,this.isLoginRoute=!1,this.isDiarioRoute=!1,this.isPortalTransparencia=!1,this.loggedInUserEmail=null,this.logo=null;let W=this.location.path();this.checkRoute(W),this.tenantService.state$.subscribe(M=>{this.logo=M?.logo,this.logoText2=M?.name,this.tenant=M?.slug})}ngOnInit(){this.router.events.subscribe(n=>{n instanceof B&&this.checkRoute(n.url)})}navigate(){let n=localStorage.getItem("authToken");console.log(n),n?this.router.navigate(["adm/dashboard-administrativo/home"]):this.router.navigate(["/adm/login"])}checkRoute(n){this.isAdmRoute=n.includes("/adm"),this.isPortalTransparencia=n.includes("/trn"),this.isLoginRoute=n.includes("/adm/login"),this.isDiarioRoute=n.includes("/diario-oficial"),this.isAdmRoute?this.logoText1="Portal Administrativo":this.isPortalTransparencia?this.logoText1="Portal de Transpar\xEAncia":this.logoText1="DI\xC1RIO MUNICIPAL DA  C\xC2MARA DE"}toggleMenu(){this.mobile=!this.mobile}logout(){this._loginService.logout(this.tenant)}getLoggedInUserEmail(){let n=localStorage.getItem("loggedInUser");if(n){let a=JSON.parse(n);this.loggedInUserEmail=a.email}}};i.\u0275fac=function(a){return new(a||i)(p(X),p(z),p(K),p(Q))},i.\u0275cmp=y({type:i,selectors:[["app-navbar"]],standalone:!0,features:[E([D]),R],decls:25,vars:13,consts:[["deslogarTemplate",""],[1,"bkg-header","geral"],[1,"container","align"],[1,"ps-0","row","align-items-center","pb-4",3,"ngClass"],[1,"ps-0","col-8","d-flex","col-md-4","logo-mobile","align-items-center","w-auto","ml-auto","mr-auto"],["routerLink","/home",1,"logo-container"],[1,"logo"],["alt","","onError","this.src='../../../../assets/logos/pwr.webp';",3,"src"],["class","d-lg-flex d-none flex-column ms-4 mt-3 text-light logado",4,"ngIf"],[1,"col","col-md-8","campos-direita"],[1,"buttons-header"],["href","https://esic.cge.ro.gov.br/","target","_blank","class","btn-padrao button-ecac",4,"ngIf"],["href","https://radardatransparencia.atricon.org.br/radar-da-transparencia-publica.html","target","_blank","class","btn-padrao button-radar",4,"ngIf"],[4,"ngIf"],["class","col col-md-4 menu",4,"ngIf"],[1,"campos-mobile",3,"ngClass"],["mat-icon-button","","aria-label","menu",3,"click"],[1,"menu-content"],["href","https://esic.cge.ro.gov.br/",1,"item"],["href","https://radardatransparencia.atricon.org.br/radar-da-transparencia-publica.html",1,"item"],["routerLink","/adm/login",1,"item"],[1,"d-lg-flex","d-none","flex-column","ms-4","mt-3","text-light","logado"],[1,"m-0","text-uppercase"],[1,"m-0","bold"],["href","https://esic.cge.ro.gov.br/","target","_blank",1,"btn-padrao","button-ecac"],["src","../../../../assets/logos/ecac.webp","alt","Logo Ecac"],["href","https://radardatransparencia.atricon.org.br/radar-da-transparencia-publica.html","target","_blank",1,"btn-padrao","button-radar"],["src","../../../../assets/logos/radar-transparencia.webp","alt","Logo Radar"],[4,"ngIf","ngIfElse"],[1,"btn-padrao__hover","button-login",3,"click"],[1,"btn-padrao__perfil-icon"],[1,"btn-padrao__text"],[1,"deslogar","me-4"],[1,"btn-padrao__hover","d-flex","flex-row","button-login",3,"click"],["src","../../../../assets/icons/deslogar.svg","alt","",1,"btn-padrao__icon"],[1,"col","col-md-4","menu"],["mat-icon-button","","aria-label","menu",1,"menu-branco",3,"click"]],template:function(a,r){a&1&&(e(0,"div",1)(1,"div",2)(2,"div",3)(3,"div",4)(4,"div",5)(5,"div",6),d(6,"img",7),o()(),_(7,tt,5,1,"div",8),o(),e(8,"div",9)(9,"div",10),_(10,nt,4,0,"a",11)(11,et,2,0,"a",12)(12,at,4,2,"ng-container",13),o()(),_(13,rt,4,0,"div",14),o()()(),e(14,"div",15)(15,"button",16),h("click",function(){return r.toggleMenu()}),e(16,"mat-icon"),g(17,"close"),o()(),e(18,"div",17)(19,"a",18),g(20,"eSIC"),o(),e(21,"a",19),g(22,"Radar de transparencia p\xFAblica"),o(),e(23,"div",20),g(24,"Login"),o()()()),a&2&&(c(2),l("ngClass",j(8,Y,r.isLoginRoute,!r.isLoginRoute)),c(4),l("src",r.logo,I),c(),l("ngIf",!r.isLoginRoute&&r.isAdmRoute),c(3),l("ngIf",r.isPortalTransparencia),c(),l("ngIf",r.isPortalTransparencia),c(),l("ngIf",!r.isLoginRoute),c(),l("ngIf",!r.isLoginRoute),c(),l("ngClass",L(11,Z,r.mobile)))},dependencies:[q,$,H,G,F,A,V,J],styles:['.bkg-header[_ngcontent-%COMP%]{width:100%;height:max-content;background-color:#225ec9;background-image:linear-gradient(90deg,#225fc9d5,#33ceffb3),url("./media/bkg-header-D7F276P2.webp");background-position:50%;background-size:cover;background-repeat:no-repeat;background-blend-mode:normal;padding-top:15px}.bkg-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#225ec9;text-align:center;font-style:normal;font-weight:700;line-height:122.487%;text-transform:uppercase}.bkg-header[_ngcontent-%COMP%]   .logo-container[_ngcontent-%COMP%]{background-color:#fff;display:flex;padding:5px 15px;border-radius:10px;max-height:75px;justify-content:center;cursor:pointer;align-items:center}.bkg-header[_ngcontent-%COMP%]   .logo-container[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:75px;padding:5px}.bkg-header[_ngcontent-%COMP%]   .logo-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0}.bkg-header[_ngcontent-%COMP%]   .logo-container[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%]{display:flex;flex-direction:column;font-weight:700;line-height:122.487%;align-items:center;justify-content:center;margin-left:15px}.bkg-header[_ngcontent-%COMP%]   .logo-container[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%]   .text1[_ngcontent-%COMP%]{font-size:10px}.bkg-header[_ngcontent-%COMP%]   .logo-container[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%]   .text2[_ngcontent-%COMP%]{font-size:30.199px;margin-top:-5px}.bkg-header[_ngcontent-%COMP%]   .logado[_ngcontent-%COMP%]   h6[_ngcontent-%COMP%]{color:#000;font-size:12.225px;font-style:normal;font-weight:600;line-height:122.487%}.bkg-header[_ngcontent-%COMP%]   .logado[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:#000;font-size:23.348px;font-style:normal;font-weight:700;line-height:122.487%}.bkg-header[_ngcontent-%COMP%]   .buttons-header[_ngcontent-%COMP%]{display:flex;gap:10px}.bkg-header[_ngcontent-%COMP%]   .buttons-header[_ngcontent-%COMP%]   .deslogar[_ngcontent-%COMP%]{max-width:120px;background-color:#000;border-radius:15px;display:flex;align-items:center;justify-content:center}.bkg-header[_ngcontent-%COMP%]   .buttons-header[_ngcontent-%COMP%]   .deslogar[_ngcontent-%COMP%]   .button-login[_ngcontent-%COMP%]{max-width:100%}.bkg-header[_ngcontent-%COMP%]   .buttons-header[_ngcontent-%COMP%]   .deslogar[_ngcontent-%COMP%]   .btn-padrao__hover[_ngcontent-%COMP%]{padding:10px 15px;margin-left:0;justify-content:space-between;background-color:#000;color:#fff;width:78px}.bkg-header[_ngcontent-%COMP%]   .buttons-header[_ngcontent-%COMP%]   .deslogar[_ngcontent-%COMP%]   .btn-padrao__hover[_ngcontent-%COMP%]   .btn-padrao__icon[_ngcontent-%COMP%]{width:18.003px;height:22.458px;background:none}.bkg-header[_ngcontent-%COMP%]   .buttons-header[_ngcontent-%COMP%]   .deslogar[_ngcontent-%COMP%]   .btn-padrao__hover[_ngcontent-%COMP%]   .btn-padrao__text[_ngcontent-%COMP%]{color:#fff}.bkg-header[_ngcontent-%COMP%]   .buttons-header[_ngcontent-%COMP%]   .button-ecac[_ngcontent-%COMP%]{display:flex;flex-direction:column;max-width:103px;text-decoration:none}.bkg-header[_ngcontent-%COMP%]   .buttons-header[_ngcontent-%COMP%]   .button-ecac[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:51px;height:52px}.bkg-header[_ngcontent-%COMP%]   .buttons-header[_ngcontent-%COMP%]   .button-ecac[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{text-transform:none;font-size:15.302px;margin:0}.bkg-header[_ngcontent-%COMP%]   .buttons-header[_ngcontent-%COMP%]   .button-radar[_ngcontent-%COMP%]{text-decoration:none}.bkg-header[_ngcontent-%COMP%]   .buttons-header[_ngcontent-%COMP%]   .button-login[_ngcontent-%COMP%]{max-width:100px;width:100%;margin-left:70px;display:flex;flex-direction:column;min-height:40px}.bkg-header[_ngcontent-%COMP%]   .buttons-header[_ngcontent-%COMP%]   .button-login[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-size:10px}.bkg-header[_ngcontent-%COMP%]   .campos-direita[_ngcontent-%COMP%]{display:flex;width:auto}.menu[_ngcontent-%COMP%], .campos-mobile[_ngcontent-%COMP%]{display:none}@media (max-width: 768px){.bkg-header[_ngcontent-%COMP%]{height:max-content;padding-bottom:5px}.bkg-header[_ngcontent-%COMP%]   .logo-container[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{width:30px}.bkg-header[_ngcontent-%COMP%]   .logo-container[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:35px}.bkg-header[_ngcontent-%COMP%]   .logo-container[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%]   .text1[_ngcontent-%COMP%]{font-size:11px}.bkg-header[_ngcontent-%COMP%]   .logo-container[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%]   .text2[_ngcontent-%COMP%]{font-size:20px}.bkg-header[_ngcontent-%COMP%]   .menu[_ngcontent-%COMP%]{display:flex;justify-content:flex-end}.bkg-header[_ngcontent-%COMP%]   .menu-branco[_ngcontent-%COMP%]{color:#fff}.bkg-header[_ngcontent-%COMP%]   .campos-direita[_ngcontent-%COMP%]{display:none}.bkg-header[_ngcontent-%COMP%]   .buttons-header[_ngcontent-%COMP%]{justify-content:center;padding-bottom:10px;flex-wrap:wrap;padding-top:10px}.bkg-header[_ngcontent-%COMP%]   .logo-container[_ngcontent-%COMP%]{justify-content:center;align-items:center}.bkg-header[_ngcontent-%COMP%]   .logo-mobile[_ngcontent-%COMP%]{justify-content:center;width:70%!important;margin-left:10px}.bkg-header[_ngcontent-%COMP%]   .align[_ngcontent-%COMP%]{justify-content:center;padding-top:10px}.campos-mobile[_ngcontent-%COMP%]{display:block;position:fixed;top:0;right:0;width:250px;height:100%;background-color:#fff;box-shadow:0 2px 5px #0003;transform:translate(100%);transition:transform .3s ease-in-out;z-index:999}.campos-mobile.ativo[_ngcontent-%COMP%]{transform:translate(0)}.campos-mobile[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{position:absolute;top:10px;right:10px}.campos-mobile[_ngcontent-%COMP%]   .menu-content[_ngcontent-%COMP%]{padding:50px}.campos-mobile[_ngcontent-%COMP%]   .menu-content[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]{font-size:14px;cursor:pointer;margin-bottom:15px}}@media (min-width: 768px) and (max-width: 992px){.bkg-header[_ngcontent-%COMP%]   .logo-container[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{width:32px}.bkg-header[_ngcontent-%COMP%]   .logo-container[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:30px}.bkg-header[_ngcontent-%COMP%]   .logo-container[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%]   .text1[_ngcontent-%COMP%]{font-size:12px}.bkg-header[_ngcontent-%COMP%]   .logo-container[_ngcontent-%COMP%]   .logo-text[_ngcontent-%COMP%]   .text2[_ngcontent-%COMP%]{font-size:20px}.bkg-header[_ngcontent-%COMP%]   .buttons-header[_ngcontent-%COMP%]   .button-ecac[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:25px;height:26px}.bkg-header[_ngcontent-%COMP%]   .buttons-header[_ngcontent-%COMP%]   .button-radar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100px;height:30px}.bkg-header[_ngcontent-%COMP%]   .buttons-header[_ngcontent-%COMP%]   .button-login[_ngcontent-%COMP%]{margin-left:0;padding:20px}.bkg-header[_ngcontent-%COMP%]   .buttons-header[_ngcontent-%COMP%]   .btn-padrao[_ngcontent-%COMP%]{padding:15px}}'],data:{animation:[U("toggleMenu",[v("inactive",x({opacity:0,transform:"translateX(-100%)"})),v("active",x({opacity:1,transform:"translateX(0)"})),k("inactive => active",[O("300ms ease-in")]),k("active => inactive",[O("300ms ease-out")])])]}});let t=i;return t})();export{ft as a};
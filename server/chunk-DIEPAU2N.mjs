import './polyfills.server.mjs';
import{f as D,g as r,h as a,m as I,n as s,p as g,u as M}from"./chunk-DMBMNNNW.mjs";import{h as N,j as y}from"./chunk-45EKGY5G.mjs";import{La as c,Yc as A,ca as d,da as u,ha as o,hb as p,ia as f,jb as l,mb as v,oa as m}from"./chunk-QF5IABGI.mjs";var j=(()=>{let e=class e extends s{constructor(i,n,S){super(i,n,S,f(p,{optional:!0}))}ngOnDestroy(){this.flush()}};e.\u0275fac=function(n){return new(n||e)(o(A),o(r),o(a))},e.\u0275prov=d({token:e,factory:e.\u0275fac});let t=e;return t})();function F(){return new I}function T(t,e,E){return new M(t,e,E)}var R=[{provide:a,useFactory:F},{provide:s,useClass:j},{provide:l,useFactory:T,deps:[N,s,v]}],O=[{provide:r,useFactory:()=>new g},{provide:c,useValue:"BrowserAnimations"},...R],h=[{provide:r,useClass:D},{provide:c,useValue:"NoopAnimations"},...R],B=(()=>{let e=class e{static withConfig(i){return{ngModule:e,providers:i.disableAnimations?h:O}}};e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=m({type:e}),e.\u0275inj=u({providers:O,imports:[y]});let t=e;return t})();function L(){return[...h]}export{B as a,L as b};
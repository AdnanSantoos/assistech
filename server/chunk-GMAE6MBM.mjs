import './polyfills.server.mjs';
import{a}from"./chunk-AZ43DKBQ.mjs";import{a as s,b as c}from"./chunk-45EKGY5G.mjs";import{ca as o,ha as n}from"./chunk-QF5IABGI.mjs";var m=(()=>{let t=class t{constructor(r){this._http=r,this.baseUrl=`${a.apiUrl}/tenants/${a.tenant}/pncp/units?agency_country_register=`}getUnidade(r){let i=new s().set("page",r.toString());return this._http.get(this.baseUrl,{params:i})}createUnidade(r){return this._http.post(this.baseUrl,r)}};t.\u0275fac=function(i){return new(i||t)(n(c))},t.\u0275prov=o({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();var y=(()=>{let t=class t{constructor(r){this._repository=r}getUnidade(r){return this._repository.getUnidade(r)}createUnidade(r){return this._repository.createUnidade(r)}};t.\u0275fac=function(i){return new(i||t)(n(m))},t.\u0275prov=o({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();var f=(()=>{let t=class t{constructor(r){this._http=r,this.baseUrl=`${a.apiUrl}/tenants/${a.tenant}/pncp/agencies`}getOrgaos(r){let i=new s().set("page",r.toString());return this._http.get(this.baseUrl,{params:i})}createOrgao(r){return this._http.post(this.baseUrl,r)}};t.\u0275fac=function(i){return new(i||t)(n(c))},t.\u0275prov=o({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();var I=(()=>{let t=class t{constructor(r){this._repository=r}getOrgaos(r){return this._repository.getOrgaos(r)}createOrgao(r){return this._repository.createOrgao(r)}};t.\u0275fac=function(i){return new(i||t)(n(f))},t.\u0275prov=o({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();export{y as a,I as b};
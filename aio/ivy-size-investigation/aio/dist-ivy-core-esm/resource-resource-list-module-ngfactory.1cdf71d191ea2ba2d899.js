(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{uway:function(e,r,t){"use strict";t.r(r);var o=t("9Fkm"),n=(t("vl6T"),t("Ip0R")),c=(t("NgAY"),t("bu3Y")),i=t("utQS"),a=t("vAGR"),s=t("kJP+"),u=t("pntl"),f=t("9V+E"),l=t("cAkM"),d=t("hBBi"),p=t("u5e0"),v=t("ZKjc"),g=t("SbnR"),h=t("yXTP"),b=(t("i+1A"),t("ZOsF"),t("67Y/")),y=t("kR3u"),m=t("jn67"),w=t("Szuv"),k=t("jh4x"),j=t("t/Na"),O=m.a+"resources.json",C=function(){function e(e){this.http=e,this.categories=this.getCategories()}return e.prototype.getCategories=function(){var e=this.http.get(O).pipe(Object(b.a)(function(e){return r=e,Object.keys(r).map(function(e){var t=r[e];return{id:R(e),title:e,order:t.order,subCategories:F(t.subCategories,e)}}).sort(S);var r}),Object(y.a)());return e.connect(),e},e.ngInjectableDef=w.c({token:e,factory:function(r){return new(r||e)(k.a(j.a))},providedIn:null}),e}();function F(e,r){return Object.keys(e).map(function(t){var o=e[t];return{id:R(t),title:t,order:o.order,resources:I(o.resources,t,r)}}).sort(S)}function I(e,r,t){return Object.keys(e).map(function(o){var n=e[o];return n.category=t,n.subCategory=r,n.id=R(o),n}).sort(D)}function S(e,r){return e.order===r.order?D(e,r):e.order>r.order?1:-1}function D(e,r){return e.title.toUpperCase()>r.title.toUpperCase()?1:-1}function R(e){return e.toLowerCase().replace(/\s+/g,"-")}var A=[1,"resources-container"],N=[1,"l-flex--column"],P=["class","showcase",4,"ngFor","ngForOf"],T=[1,"showcase"],$=[1,"c-resource-header"],x=[1,"h-anchor-offset",3,"id"],B=[1,"shadow-1"],J=[4,"ngFor","ngForOf"],M=[1,"subcategory-title"],Y=["class","c-resource",4,"ngIf"],E=[1,"c-resource"],L=["target","_blank",1,"l-flex--column","resource-row-link",3,"href"],U=[1,"resource-description"];function Z(e,r){if(1&e&&(c.e(0,"div",E),c.e(1,"a",L),c.e(2,"div"),c.e(3,"h4"),i.a(4),c.c(),c.e(5,"p",U),i.a(6),c.c(),c.c(),c.c(),c.c()),2&e){var t=a.a().$implicit;s.a(1),u.c(1,"href",u.a(t.url),f.f),s.a(4),i.b(4,l.a("",t.title,"")),s.a(6),i.b(6,l.a("",t.desc||"No Description",""))}}function q(e,r){if(1&e&&(c.e(0,"div"),d.d(1,Z,7,3,"div",Y),c.c()),2&e){var t=r.$implicit;s.a(1),u.c(1,"ngIf",u.a(t.rev))}}function z(e,r){if(1&e&&(c.e(0,"div"),c.a(1,"a",x),c.e(2,"h3",M),i.a(3),c.c(),d.d(4,q,2,1,"div",J),c.c()),2&e){var t=r.$implicit;s.a(1),u.c(1,"id",l.a("",t.id,"")),s.a(3),i.b(3,l.a("",t.title,"")),s.a(4),u.c(4,"ngForOf",u.a(t.resources))}}function G(e,r){if(1&e&&(c.e(0,"div",T),c.e(1,"header",$),c.a(2,"a",x),c.e(3,"h2"),i.a(4),c.c(),c.c(),c.e(5,"div",B),d.d(6,z,5,3,"div",J),c.c(),c.c()),2&e){var t=r.$implicit;s.a(2),u.c(2,"id",l.a("",t.id,"")),s.a(4),i.b(4,l.a("",t.title,"")),s.a(6),u.c(6,"ngForOf",u.a(t.subCategories))}}var K=function(){function e(e,r){this.resourceService=r,this.scrollPos=0,this.location=e.pathname.replace(/^\/+/,"")}return e.prototype.href=function(e){return this.location+"#"+e.id},e.prototype.ngOnInit=function(){var e=this;this.resourceService.categories.subscribe(function(r){return e.categories=r})},e.prototype.onScroll=function(e){this.scrollPos=e&&(e.scrollTop||e.body.scrollTop)||0},e.ngComponentDef=p.b({type:e,selectors:[["aio-resource-list"]],factory:function(r){return new(r||e)(v.a(n.q),v.a(C))},hostBindings:function(e,r,t){1&e&&g.b("scroll",function(e){return r.onScroll(e.target)},!1,h.i)},consts:3,vars:1,template:function(e,r){1&e&&(c.e(0,"div",A),c.e(1,"div",N),d.d(2,G,7,3,"div",P),c.c(),c.c()),2&e&&(s.a(2),u.c(2,"ngForOf",u.a(r.categories)))},directives:[n.j,n.k],encapsulation:2}),e}(),Q=function(){function e(){this.customElementComponent=K}return e.ngModuleDef=p.d({type:e}),e.ngInjectorDef=w.d({factory:function(r){return new(r||e)},providers:[C],imports:[[n.c]]}),e}();t.d(r,"ResourceListModuleNgFactory",function(){return V});var V=new o.a(Q)}}]);
//# sourceMappingURL=resource-resource-list-module-ngfactory.1cdf71d191ea2ba2d899.js.map
(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"ll+R":function(n,l,u){"use strict";u.r(l);var t=u("CcnG"),o=function(){function n(n,l){this.contributorService=n,this.locationService=l}return n.prototype.ngOnInit=function(){var n=this,l=this.locationService.search().group||"";this.contributorService.contributors.subscribe(function(u){n.groups=u,n.groupNames=u.map(function(n){return n.name}),n.selectGroup(l)})},n.prototype.selectGroup=function(n){n=n.toLowerCase(),this.selectedGroup=this.groups.find(function(l){return l.name.toLowerCase()===n})||this.groups[0],this.locationService.setSearch("",{group:this.selectedGroup.name})},n}(),r=function(){return function(){this.customElementComponent=o}}(),i=u("Mr+X"),e=u("SMsm"),c=u("Ip0R"),s=u("jn67"),a=function(){function n(){this.noPicture="_no-one.png",this.pictureBase=s.a+"images/bios/"}return n.prototype.flipCard=function(n){n.isFlipped=!n.isFlipped},n}(),b=t.rb({encapsulation:2,styles:[],data:{}});function p(n){return t.Ob(0,[(n()(),t.ub(0,0,null,null,1,"a",[["class","info-item"],["mat-button",""]],null,null,null,null,null)),(n()(),t.Mb(-1,null,[" View Bio "]))],null,null)}function f(n){return t.Ob(0,[(n()(),t.ub(0,0,null,null,2,"a",[["class","info-item icon"],["mat-icon-button",""],["target","_blank"]],[[8,"href",4]],[[null,"click"]],function(n,l,u){var t=!0;return"click"===l&&(t=!1!==u.stopPropagation()&&t),t},null,null)),(n()(),t.ub(1,0,null,null,1,"mat-icon",[["class","mat-icon"],["role","img"],["svgIcon","logos:twitter"]],[[2,"mat-icon-inline",null]],null,null,i.b,i.a)),t.tb(2,9158656,null,0,e.b,[t.k,e.d,[8,null],[2,e.a]],{svgIcon:[0,"svgIcon"]},null)],function(n,l){n(l,2,0,"logos:twitter")},function(n,l){n(l,0,0,t.zb(1,"https://twitter.com/",l.component.person.twitter,"")),n(l,1,0,t.Gb(l,2).inline)})}function m(n){return t.Ob(0,[(n()(),t.ub(0,0,null,null,3,"a",[["class","info-item icon"],["mat-icon-button",""],["target","_blank"]],[[8,"href",4]],[[null,"click"]],function(n,l,u){var t=!0;return"click"===l&&(t=!1!==u.stopPropagation()&&t),t},null,null)),(n()(),t.ub(1,0,null,null,2,"mat-icon",[["class","link-icon mat-icon"],["role","img"]],[[2,"mat-icon-inline",null]],null,null,i.b,i.a)),t.tb(2,9158656,null,0,e.b,[t.k,e.d,[8,null],[2,e.a]],null,null),(n()(),t.Mb(-1,0,["link"]))],function(n,l){n(l,2,0)},function(n,l){n(l,0,0,t.zb(1,"",l.component.person.website,"")),n(l,1,0,t.Gb(l,2).inline)})}function g(n){return t.Ob(0,[(n()(),t.ub(0,0,null,null,4,"div",[["class","card-back"]],null,[[null,"click"]],function(n,l,u){var t=!0,o=n.component;return"click"===l&&(t=!1!==o.flipCard(o.person)&&t),t},null,null)),(n()(),t.ub(1,0,null,null,1,"h3",[],null,null,null,null,null)),(n()(),t.Mb(2,null,["",""])),(n()(),t.ub(3,0,null,null,1,"p",[["class","contributor-bio"]],null,null,null,null,null)),(n()(),t.Mb(4,null,["",""]))],null,function(n,l){var u=l.component;n(l,2,0,u.person.name),n(l,4,0,u.person.bio)})}function d(n){return t.Ob(0,[(n()(),t.ub(0,0,null,null,16,"div",[["class","contributor-card"]],null,null,null,null,null)),t.Jb(512,null,c.w,c.x,[t.t,t.u,t.k,t.F]),t.tb(2,278528,null,0,c.i,[c.w],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),t.Ib(3,{flipped:0}),(n()(),t.ub(4,0,null,null,10,"div",[["class","card-front"]],null,[[null,"click"]],function(n,l,u){var t=!0,o=n.component;return"click"===l&&(t=!1!==o.flipCard(o.person)&&t),t},null,null)),(n()(),t.ub(5,0,null,null,1,"h3",[],null,null,null,null,null)),(n()(),t.Mb(6,null,["",""])),(n()(),t.ub(7,0,null,null,7,"div",[["class","contributor-image"]],[[4,"background-image",null]],null,null,null,null)),(n()(),t.ub(8,0,null,null,6,"div",[["class","contributor-info"]],null,null,null,null,null)),(n()(),t.ib(16777216,null,null,1,null,p)),t.tb(10,16384,null,0,c.k,[t.R,t.O],{ngIf:[0,"ngIf"]},null),(n()(),t.ib(16777216,null,null,1,null,f)),t.tb(12,16384,null,0,c.k,[t.R,t.O],{ngIf:[0,"ngIf"]},null),(n()(),t.ib(16777216,null,null,1,null,m)),t.tb(14,16384,null,0,c.k,[t.R,t.O],{ngIf:[0,"ngIf"]},null),(n()(),t.ib(16777216,null,null,1,null,g)),t.tb(16,16384,null,0,c.k,[t.R,t.O],{ngIf:[0,"ngIf"]},null)],function(n,l){var u=l.component,t=n(l,3,0,u.person.isFlipped);n(l,2,0,"contributor-card",t),n(l,10,0,u.person.bio),n(l,12,0,u.person.twitter),n(l,14,0,u.person.website),n(l,16,0,u.person.isFlipped)},function(n,l){var u=l.component;n(l,6,0,u.person.name),n(l,7,0,"url("+u.pictureBase+(u.person.picture||u.noPicture)+")")})}var v=u("67Y/"),h=u("kR3u"),k=s.a+"contributors.json",O=["Angular","Collaborators","GDE"],w=function(){function n(n){this.http=n,this.contributors=this.getContributors()}return n.prototype.getContributors=function(){var n=this.http.get(k).pipe(Object(v.a)(function(n){var l={};return Object.keys(n).forEach(function(u){var t=n[u];t.groups.forEach(function(n){(l[n]||(l[n]=[])).push(t)})}),l}),Object(v.a)(function(n){return Object.keys(n).map(function(l){var u=O.indexOf(l);return{name:l,order:-1===u?O.length:u,contributors:n[l].sort(I)}}).sort(C)}),Object(h.a)());return n.connect(),n},n}();function I(n,l){return n.name.toUpperCase()>l.name.toUpperCase()?1:-1}function C(n,l){return n.order===l.order?n.name>l.name?1:-1:n.order>l.order?1:-1}var j=u("/lUL"),E=t.rb({encapsulation:2,styles:[],data:{}});function G(n){return t.Ob(0,[(n()(),t.ub(0,0,null,null,1,"a",[["class","button mat-button filter-button"]],[[2,"selected",null]],[[null,"click"]],function(n,l,u){var t=!0;return"click"===l&&(t=!1!==n.component.selectGroup(n.context.$implicit)&&t),t},null,null)),(n()(),t.Mb(1,null,["",""]))],null,function(n,l){n(l,0,0,l.context.$implicit==l.component.selectedGroup.name),n(l,1,0,l.context.$implicit)})}function F(n){return t.Ob(0,[(n()(),t.ub(0,0,null,null,1,"aio-contributor",[],null,null,null,d,b)),t.tb(1,49152,null,0,a,[],{person:[0,"person"]},null)],function(n,l){n(l,1,0,l.context.$implicit)},null)}function y(n){return t.Ob(0,[(n()(),t.ub(0,0,null,null,3,"section",[["class","grid-fluid"]],null,null,null,null,null)),(n()(),t.ub(1,0,null,null,2,"div",[["class","contributor-group"]],null,null,null,null,null)),(n()(),t.ib(16777216,null,null,1,null,F)),t.tb(3,278528,null,0,c.j,[t.R,t.O,t.t],{ngForOf:[0,"ngForOf"]},null)],function(n,l){n(l,3,0,l.component.selectedGroup.contributors)},null)}function R(n){return t.Ob(0,[(n()(),t.ub(0,0,null,null,2,"div",[["class","flex-center group-buttons"]],null,null,null,null,null)),(n()(),t.ib(16777216,null,null,1,null,G)),t.tb(2,278528,null,0,c.j,[t.R,t.O,t.t],{ngForOf:[0,"ngForOf"]},null),(n()(),t.ib(16777216,null,null,1,null,y)),t.tb(4,16384,null,0,c.k,[t.R,t.O],{ngIf:[0,"ngIf"]},null)],function(n,l){var u=l.component;n(l,2,0,u.groupNames),n(l,4,0,u.selectedGroup)},null)}function M(n){return t.Ob(0,[(n()(),t.ub(0,0,null,null,1,"aio-contributor-list",[],null,null,null,R,E)),t.tb(1,114688,null,0,o,[w,j.a],null,null)],function(n,l){n(l,1,0)},null)}var x=t.pb("aio-contributor-list",o,M,{},{},[]),S=u("t/Na"),B=u("Fzqc"),L=u("Wf4p"),N=u("ZYjt");u.d(l,"ContributorListModuleNgFactory",function(){return P});var P=t.qb(r,[],function(n){return t.Db([t.Eb(512,t.j,t.db,[[8,[x]],[3,t.j],t.y]),t.Eb(4608,c.m,c.l,[t.v,[2,c.B]]),t.Eb(4608,w,w,[S.c]),t.Eb(1073742336,c.c,c.c,[]),t.Eb(1073742336,B.a,B.a,[]),t.Eb(1073742336,L.c,L.c,[[2,L.a],[2,N.f]]),t.Eb(1073742336,e.c,e.c,[]),t.Eb(1073742336,r,r,[])])})}}]);
//# sourceMappingURL=contributor-contributor-list-module-ngfactory.007c299f103f2a0f2b6f.js.map
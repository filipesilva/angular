(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"/CO3":function(t,e,l){"use strict";l.r(e);var n=l("CcnG"),i=l("mrSG"),u=l("S5bw"),s=l("dzgT"),a=l("67Y/"),o=function(){return function(){this.query="",this.status="all",this.type="all"}}(),c=function(){function t(t,e){this.apiService=t,this.locationService=e,this.showStatusMenu=!1,this.showTypeMenu=!1,this.criteriaSubject=new u.a(1),this.searchCriteria=new o,this.types=[{value:"all",title:"All"},{value:"class",title:"Class"},{value:"const",title:"Const"},{value:"decorator",title:"Decorator"},{value:"directive",title:"Directive"},{value:"enum",title:"Enum"},{value:"function",title:"Function"},{value:"interface",title:"Interface"},{value:"pipe",title:"Pipe"},{value:"ngmodule",title:"NgModule"},{value:"type-alias",title:"Type alias"},{value:"package",title:"Package"}],this.statuses=[{value:"all",title:"All"},{value:"deprecated",title:"Deprecated"},{value:"security-risk",title:"Security Risk"}]}return t.prototype.ngOnInit=function(){var t=this;this.filteredSections=Object(s.a)(this.apiService.sections,this.criteriaSubject).pipe(Object(a.a)(function(t){return{sections:t[0],criteria:t[1]}}),Object(a.a)(function(e){return e.sections.map(function(l){return i.a({},l,{items:t.filterSection(l,e.criteria)})})})),this.initializeSearchCriteria()},t.prototype.setQuery=function(t){this.setSearchCriteria({query:(t||"").toLowerCase().trim()})},t.prototype.setStatus=function(t){this.toggleStatusMenu(),this.status=t,this.setSearchCriteria({status:t.value})},t.prototype.setType=function(t){this.toggleTypeMenu(),this.type=t,this.setSearchCriteria({type:t.value})},t.prototype.toggleStatusMenu=function(){this.showStatusMenu=!this.showStatusMenu},t.prototype.toggleTypeMenu=function(){this.showTypeMenu=!this.showTypeMenu},t.prototype.filterSection=function(t,e){var l=e.query,n=e.status,i=e.type,u=t.items.filter(function(e){return("all"===i||i===e.docType)&&("all"===n||n===e.stability||"security-risk"===n&&e.securityRisk)&&(!l||-1!==t.name.indexOf(l)||-1!==e.name.indexOf(l))});return u.length?u:"package"!==i||l&&-1===t.name.indexOf(l)?null:[]},t.prototype.initializeSearchCriteria=function(){var t=this.locationService.search(),e=t.status,l=t.type,n=(t.query||"").toLowerCase();this.queryEl.nativeElement.value=n,this.status=this.statuses.find(function(t){return t.value===e})||this.statuses[0],this.type=this.types.find(function(t){return t.value===l})||this.types[0],this.searchCriteria={query:n,status:this.status.value,type:this.type.value},this.criteriaSubject.next(this.searchCriteria)},t.prototype.setLocationSearch=function(){var t=this.searchCriteria,e=t.status,l=t.type;this.locationService.setSearch("API Search",{query:t.query||void 0,status:"all"!==e?e:void 0,type:"all"!==l?l:void 0})},t.prototype.setSearchCriteria=function(t){this.criteriaSubject.next(Object.assign(this.searchCriteria,t)),this.setLocationSearch()},t}(),r=function(){return function(){this.customElementComponent=c}}(),p=l("Ip0R"),h=l("1nbL"),b=l("x4lQ"),f=l("K9Ia"),y=l("ny24"),d=l("xMyE"),m=l("jn67"),g=function(){function t(t,e){this.http=t,this.logger=e,this.apiBase=m.b+"api/",this.apiListJsonDefault="api-list.json",this.firstTime=!0,this.onDestroy=new f.a,this.sectionsSubject=new u.a(1),this._sections=this.sectionsSubject.pipe(Object(y.a)(this.onDestroy))}return Object.defineProperty(t.prototype,"sections",{get:function(){var t=this;return this.firstTime&&(this.firstTime=!1,this.fetchSections(),this._sections.subscribe(function(e){return t.logger.log("ApiService got API sections")})),this._sections.pipe(Object(d.a)(function(t){t.forEach(function(t){t.deprecated=!!t.items&&t.items.every(function(t){return"deprecated"===t.stability})})}))},enumerable:!0,configurable:!0}),t.prototype.ngOnDestroy=function(){this.onDestroy.next()},t.prototype.fetchSections=function(t){var e=this,l=this.apiBase+(t||this.apiListJsonDefault);this.http.get(l).pipe(Object(y.a)(this.onDestroy),Object(d.a)(function(){return e.logger.log("Got API sections from "+l)})).subscribe(function(t){return e.sectionsSubject.next(t)},function(t){throw e.logger.error(t),t})},t}(),v=l("/lUL"),S=n.rb({encapsulation:2,styles:[],data:{}});function O(t){return n.Ob(0,[(t()(),n.ub(0,0,null,null,2,"h2",[],null,null,null,null,null)),(t()(),n.ub(1,0,null,null,1,"a",[],[[8,"href",4],[2,"deprecated-api-item",null]],null,null,null,null)),(t()(),n.Mb(2,null,["",""]))],null,function(t,e){t(e,1,0,e.parent.context.$implicit.path,e.parent.context.$implicit.deprecated),t(e,2,0,e.parent.context.$implicit.title)})}function w(t){return n.Ob(0,[(t()(),n.ub(0,0,null,null,4,null,null,null,null,null,null,null)),(t()(),n.ub(1,0,null,null,3,"li",[["class","api-item"]],null,null,null,null,null)),(t()(),n.ub(2,0,null,null,2,"a",[],[[8,"href",4],[2,"deprecated-api-item",null]],null,null,null,null)),(t()(),n.ub(3,0,null,null,0,"span",[],[[8,"className",0]],null,null,null,null)),(t()(),n.Mb(4,null,[" "," "]))],null,function(t,e){t(e,2,0,e.context.$implicit.path,"deprecated"===e.context.$implicit.stability),t(e,3,0,n.zb(1,"symbol ",e.context.$implicit.docType,"")),t(e,4,0,e.context.$implicit.title)})}function E(t){return n.Ob(0,[(t()(),n.ub(0,0,null,null,2,"ul",[["class","api-list"]],null,null,null,null,null)),(t()(),n.ib(16777216,null,null,1,null,w)),n.tb(2,278528,null,0,p.j,[n.R,n.O,n.t],{ngForOf:[0,"ngForOf"]},null)],function(t,e){t(e,2,0,e.parent.context.$implicit.items)},null)}function k(t){return n.Ob(0,[(t()(),n.ub(0,0,null,null,4,"div",[],null,null,null,null,null)),(t()(),n.ib(16777216,null,null,1,null,O)),n.tb(2,16384,null,0,p.k,[n.R,n.O],{ngIf:[0,"ngIf"]},null),(t()(),n.ib(16777216,null,null,1,null,E)),n.tb(4,16384,null,0,p.k,[n.R,n.O],{ngIf:[0,"ngIf"]},null)],function(t,e){t(e,2,0,e.context.$implicit.items),t(e,4,0,null==e.context.$implicit.items?null:e.context.$implicit.items.length)},null)}function j(t){return n.Ob(0,[n.Kb(402653184,1,{queryEl:0}),(t()(),n.ub(1,0,null,null,8,"div",[["class","l-flex-wrap api-filter"]],null,null,null,null,null)),(t()(),n.ub(2,0,null,null,1,"aio-select",[["label","Type:"]],null,[[null,"change"],["document","click"],["document","keydown.escape"]],function(t,e,l){var i=!0,u=t.component;return"document:click"===e&&(i=!1!==n.Gb(t,3).onClick(l.target)&&i),"document:keydown.escape"===e&&(i=!1!==n.Gb(t,3).onKeyDown()&&i),"change"===e&&(i=!1!==u.setType(l.option)&&i),i},h.b,h.a)),n.tb(3,114688,null,0,b.a,[n.k],{selected:[0,"selected"],options:[1,"options"],showSymbol:[2,"showSymbol"],label:[3,"label"]},{change:"change"}),(t()(),n.ub(4,0,null,null,1,"aio-select",[["label","Status:"]],null,[[null,"change"],["document","click"],["document","keydown.escape"]],function(t,e,l){var i=!0,u=t.component;return"document:click"===e&&(i=!1!==n.Gb(t,5).onClick(l.target)&&i),"document:keydown.escape"===e&&(i=!1!==n.Gb(t,5).onKeyDown()&&i),"change"===e&&(i=!1!==u.setStatus(l.option)&&i),i},h.b,h.a)),n.tb(5,114688,null,0,b.a,[n.k],{selected:[0,"selected"],options:[1,"options"],label:[2,"label"],disabled:[3,"disabled"]},{change:"change"}),(t()(),n.ub(6,0,null,null,3,"div",[["class","form-search"]],null,null,null,null,null)),(t()(),n.ub(7,0,[[1,0],["filter",1]],null,0,"input",[["placeholder","Filter"]],null,[[null,"input"]],function(t,e,l){var n=!0;return"input"===e&&(n=!1!==t.component.setQuery(l.target.value)&&n),n},null,null)),(t()(),n.ub(8,0,null,null,1,"i",[["class","material-icons"]],null,null,null,null,null)),(t()(),n.Mb(-1,null,["search"])),(t()(),n.ub(10,0,null,null,3,"article",[["class","api-list-container l-content-small docs-content"]],null,null,null,null,null)),(t()(),n.ib(16777216,null,null,2,null,k)),n.tb(12,278528,null,0,p.j,[n.R,n.O,n.t],{ngForOf:[0,"ngForOf"]},null),n.Hb(131072,p.b,[n.h])],function(t,e){var l=e.component;t(e,3,0,l.type,l.types,!0,"Type:"),t(e,5,0,l.status,l.statuses,"Status:","package"===l.type.value),t(e,12,0,n.Nb(e,12,0,n.Gb(e,13).transform(l.filteredSections)))},null)}function C(t){return n.Ob(0,[(t()(),n.ub(0,0,null,null,1,"aio-api-list",[],null,null,null,j,S)),n.tb(1,114688,null,0,c,[g,v.a],null,null)],function(t,e){t(e,1,0)},null)}var x=n.pb("aio-api-list",c,C,{},{},[]),T=l("t/Na"),M=l("vHPH"),D=l("PCNd");l.d(e,"ApiListModuleNgFactory",function(){return I});var I=n.qb(r,[],function(t){return n.Db([n.Eb(512,n.j,n.db,[[8,[x]],[3,n.j],n.y]),n.Eb(4608,p.m,p.l,[n.v,[2,p.B]]),n.Eb(4608,T.h,T.n,[p.d,n.C,T.l]),n.Eb(4608,T.o,T.o,[T.h,T.m]),n.Eb(5120,T.a,function(t){return[t]},[T.o]),n.Eb(4608,T.k,T.k,[]),n.Eb(6144,T.i,null,[T.k]),n.Eb(4608,T.g,T.g,[T.i]),n.Eb(6144,T.b,null,[T.g]),n.Eb(4608,T.f,T.j,[T.b,n.r]),n.Eb(4608,T.c,T.c,[T.f]),n.Eb(135680,g,g,[T.c,M.a]),n.Eb(1073742336,p.c,p.c,[]),n.Eb(1073742336,D.a,D.a,[]),n.Eb(1073742336,T.e,T.e,[]),n.Eb(1073742336,T.d,T.d,[]),n.Eb(1073742336,r,r,[]),n.Eb(256,T.l,"XSRF-TOKEN",[]),n.Eb(256,T.m,"X-XSRF-TOKEN",[])])})}}]);
//# sourceMappingURL=api-api-list-module-ngfactory.e4d8ea8437773179882c.js.map
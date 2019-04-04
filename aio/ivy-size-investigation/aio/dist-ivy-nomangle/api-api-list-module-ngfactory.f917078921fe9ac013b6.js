(window.webpackJsonp = window.webpackJsonp || []).push([ [ 3 ], {
    "/CO3": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var core = __webpack_require__("CcnG"), common = __webpack_require__("Ip0R"), fesm5_http = __webpack_require__("t/Na"), shared_module = __webpack_require__("PCNd"), tslib_es6 = __webpack_require__("mrSG"), ReplaySubject = __webpack_require__("S5bw"), combineLatest = __webpack_require__("dzgT"), map = __webpack_require__("67Y/"), Subject = __webpack_require__("K9Ia"), takeUntil = __webpack_require__("ny24"), tap = __webpack_require__("xMyE"), document_service = __webpack_require__("jn67"), logger_service = __webpack_require__("vHPH"), api_service_ApiService = function() {
            function ApiService(http, logger) {
                this.http = http, this.logger = logger, this.apiBase = document_service.b + "api/", 
                this.apiListJsonDefault = "api-list.json", this.firstTime = !0, this.onDestroy = new Subject.a(), 
                this.sectionsSubject = new ReplaySubject.a(1), this._sections = this.sectionsSubject.pipe(Object(takeUntil.a)(this.onDestroy));
            }
            return Object.defineProperty(ApiService.prototype, "sections", {
                get: function() {
                    var _this = this;
                    return this.firstTime && (this.firstTime = !1, this.fetchSections(), this._sections.subscribe(function(sections) {
                        return _this.logger.log("ApiService got API sections");
                    })), this._sections.pipe(Object(tap.a)(function(sections) {
                        sections.forEach(function(section) {
                            section.deprecated = !!section.items && section.items.every(function(item) {
                                return "deprecated" === item.stability;
                            });
                        });
                    }));
                },
                enumerable: !0,
                configurable: !0
            }), ApiService.prototype.ngOnDestroy = function() {
                this.onDestroy.next();
            }, ApiService.prototype.fetchSections = function(src) {
                var _this = this, url = this.apiBase + (src || this.apiListJsonDefault);
                this.http.get(url).pipe(Object(takeUntil.a)(this.onDestroy), Object(tap.a)(function() {
                    return _this.logger.log("Got API sections from " + url);
                })).subscribe(function(sections) {
                    return _this.sectionsSubject.next(sections);
                }, function(err) {
                    throw _this.logger.error(err), err;
                });
            }, ApiService.ngInjectableDef = core.ib({
                token: ApiService,
                factory: function(t) {
                    return new (t || ApiService)(core.nb(fesm5_http.a), core.nb(logger_service.a));
                },
                providedIn: null
            }), ApiService;
        }(), location_service = __webpack_require__("/lUL"), select_component = __webpack_require__("x4lQ"), _c0 = [ "filter" ], _c1 = [ 1, "l-flex-wrap", "api-filter" ], _c2 = [ "label", "Type:", 3, "options", "selected", "showSymbol", "change" ], _c3 = [ "label", "Status:", 3, "options", "selected", "disabled", "change" ], _c4 = [ 1, "form-search" ], _c5 = [ "placeholder", "Filter", 3, "input" ], _c6 = [ "filter", "" ], _c7 = [ 1, "material-icons" ], _c8 = [ 1, "api-list-container", "l-content-small", "docs-content" ], _c9 = [ 4, "ngFor", "ngForOf" ], _c10 = [ 4, "ngIf" ], _c11 = [ "class", "api-list", 4, "ngIf" ], _c12 = [ 3, "href" ], _c13 = [ "deprecated-api-item" ];
        function ApiListComponent_div_9_h2_1_Template(rf, ctx) {
            if (1 & rf && (core.Yb(0, "h2"), core.Yb(1, "a", _c12), core.ac(_c13), core.Kc(2), 
            core.Qb(), core.Qb()), 2 & rf) {
                var section_r75 = core.rc().$implicit;
                core.Nb(1, 0, section_r75.deprecated), core.bc(1), core.Ec(1), core.Xb(1, "href", core.Bb(section_r75.path), core.Dc), 
                core.Ec(2), core.Lc(2, core.hc("", section_r75.title, ""));
            }
        }
        var _c14 = [ 1, "api-list" ], _c15 = [ 1, "api-item" ];
        function ApiListComponent_div_9_ul_2_ng_container_1_Template(rf, ctx) {
            if (1 & rf && (core.Pb(0), core.Yb(1, "li", _c15), core.Yb(2, "a", _c12), core.ac(_c13), 
            core.Yb(3, "span"), core.ac(), core.Qb(), core.Kc(4), core.Qb(), core.Qb(), core.Ob()), 
            2 & rf) {
                var item_r80 = ctx.$implicit;
                core.Nb(2, 0, "deprecated" === item_r80.stability), core.bc(2), core.Ec(2), core.Xb(2, "href", core.Bb(item_r80.path), core.Dc), 
                core.cc(3, core.hc("symbol ", item_r80.docType, "")), core.bc(3), core.Ec(4), core.Lc(4, core.hc(" ", item_r80.title, " "));
            }
        }
        function ApiListComponent_div_9_ul_2_Template(rf, ctx) {
            if (1 & rf && (core.Yb(0, "ul", _c14), core.Ic(1, ApiListComponent_div_9_ul_2_ng_container_1_Template, 5, 3, "ng-container", _c9), 
            core.Qb()), 2 & rf) {
                var section_r75 = core.rc().$implicit;
                core.Ec(1), core.Xb(1, "ngForOf", core.Bb(section_r75.items));
            }
        }
        function ApiListComponent_div_9_Template(rf, ctx) {
            if (1 & rf && (core.Yb(0, "div"), core.Ic(1, ApiListComponent_div_9_h2_1_Template, 3, 2, "h2", _c10), 
            core.Ic(2, ApiListComponent_div_9_ul_2_Template, 2, 1, "ul", _c11), core.Qb()), 
            2 & rf) {
                var section_r75 = ctx.$implicit;
                core.Ec(1), core.Xb(1, "ngIf", core.Bb(section_r75.items)), core.Ec(2), core.Xb(2, "ngIf", core.Bb(null == section_r75.items ? null : section_r75.items.length));
            }
        }
        var SearchCriteria = function() {
            return function() {
                this.query = "", this.status = "all", this.type = "all";
            };
        }(), api_list_component_ApiListComponent = function() {
            function ApiListComponent(apiService, locationService) {
                this.apiService = apiService, this.locationService = locationService, this.showStatusMenu = !1, 
                this.showTypeMenu = !1, this.criteriaSubject = new ReplaySubject.a(1), this.searchCriteria = new SearchCriteria(), 
                this.types = [ {
                    value: "all",
                    title: "All"
                }, {
                    value: "class",
                    title: "Class"
                }, {
                    value: "const",
                    title: "Const"
                }, {
                    value: "decorator",
                    title: "Decorator"
                }, {
                    value: "directive",
                    title: "Directive"
                }, {
                    value: "enum",
                    title: "Enum"
                }, {
                    value: "function",
                    title: "Function"
                }, {
                    value: "interface",
                    title: "Interface"
                }, {
                    value: "pipe",
                    title: "Pipe"
                }, {
                    value: "ngmodule",
                    title: "NgModule"
                }, {
                    value: "type-alias",
                    title: "Type alias"
                }, {
                    value: "package",
                    title: "Package"
                } ], this.statuses = [ {
                    value: "all",
                    title: "All"
                }, {
                    value: "deprecated",
                    title: "Deprecated"
                }, {
                    value: "security-risk",
                    title: "Security Risk"
                } ];
            }
            return ApiListComponent.prototype.ngOnInit = function() {
                var _this = this;
                this.filteredSections = Object(combineLatest.a)(this.apiService.sections, this.criteriaSubject).pipe(Object(map.a)(function(results) {
                    return {
                        sections: results[0],
                        criteria: results[1]
                    };
                }), Object(map.a)(function(results) {
                    return results.sections.map(function(section) {
                        return tslib_es6.a({}, section, {
                            items: _this.filterSection(section, results.criteria)
                        });
                    });
                })), this.initializeSearchCriteria();
            }, ApiListComponent.prototype.setQuery = function(query) {
                this.setSearchCriteria({
                    query: (query || "").toLowerCase().trim()
                });
            }, ApiListComponent.prototype.setStatus = function(status) {
                this.toggleStatusMenu(), this.status = status, this.setSearchCriteria({
                    status: status.value
                });
            }, ApiListComponent.prototype.setType = function(type) {
                this.toggleTypeMenu(), this.type = type, this.setSearchCriteria({
                    type: type.value
                });
            }, ApiListComponent.prototype.toggleStatusMenu = function() {
                this.showStatusMenu = !this.showStatusMenu;
            }, ApiListComponent.prototype.toggleTypeMenu = function() {
                this.showTypeMenu = !this.showTypeMenu;
            }, ApiListComponent.prototype.filterSection = function(section, _a) {
                var query = _a.query, status = _a.status, type = _a.type, items = section.items.filter(function(item) {
                    return ("all" === type || type === item.docType) && ("all" === status || status === item.stability || "security-risk" === status && item.securityRisk) && (!query || -1 !== section.name.indexOf(query) || -1 !== item.name.indexOf(query));
                });
                return items.length ? items : "package" !== type || query && -1 === section.name.indexOf(query) ? null : [];
            }, ApiListComponent.prototype.initializeSearchCriteria = function() {
                var _a = this.locationService.search(), status = _a.status, type = _a.type, q = (_a.query || "").toLowerCase();
                this.queryEl.nativeElement.value = q, this.status = this.statuses.find(function(x) {
                    return x.value === status;
                }) || this.statuses[0], this.type = this.types.find(function(x) {
                    return x.value === type;
                }) || this.types[0], this.searchCriteria = {
                    query: q,
                    status: this.status.value,
                    type: this.type.value
                }, this.criteriaSubject.next(this.searchCriteria);
            }, ApiListComponent.prototype.setLocationSearch = function() {
                var _a = this.searchCriteria, status = _a.status, type = _a.type;
                this.locationService.setSearch("API Search", {
                    query: _a.query || void 0,
                    status: "all" !== status ? status : void 0,
                    type: "all" !== type ? type : void 0
                });
            }, ApiListComponent.prototype.setSearchCriteria = function(criteria) {
                this.criteriaSubject.next(Object.assign(this.searchCriteria, criteria)), this.setLocationSearch();
            }, ApiListComponent.ngComponentDef = core.Gb({
                type: ApiListComponent,
                selectors: [ [ "aio-api-list" ] ],
                factory: function(t) {
                    return new (t || ApiListComponent)(core.Kb(api_service_ApiService), core.Kb(location_service.a));
                },
                viewQuery: function(rf, ctx) {
                    var _t;
                    1 & rf && core.Mc(_c0, !0, null), 2 & rf && core.xc(_t = core.oc()) && (ctx.queryEl = _t.first);
                },
                consts: 11,
                vars: 9,
                template: function(rf, ctx) {
                    1 & rf && (core.Yb(0, "div", _c1), core.Yb(1, "aio-select", _c2), core.mc("change", function($event) {
                        return ctx.setType($event.option);
                    }), core.Qb(), core.Yb(2, "aio-select", _c3), core.mc("change", function($event) {
                        return ctx.setStatus($event.option);
                    }), core.Qb(), core.Yb(3, "div", _c4), core.Yb(4, "input", _c5, _c6), core.mc("input", function($event) {
                        return ctx.setQuery($event.target.value);
                    }), core.Qb(), core.Yb(6, "i", _c7), core.Kc(7, "search"), core.Qb(), core.Qb(), 
                    core.Qb(), core.Yb(8, "article", _c8), core.Ic(9, ApiListComponent_div_9_Template, 3, 2, "div", _c9), 
                    core.sc(10, "async"), core.Qb()), 2 & rf && (core.Ec(1), core.Xb(1, "options", core.Bb(ctx.types)), 
                    core.Xb(1, "selected", core.Bb(ctx.type)), core.Xb(1, "showSymbol", core.Bb(!0)), 
                    core.Ec(2), core.Xb(2, "options", core.Bb(ctx.statuses)), core.Xb(2, "selected", core.Bb(ctx.status)), 
                    core.Xb(2, "disabled", core.Bb("package" === ctx.type.value)), core.Ec(9), core.Xb(9, "ngForOf", core.Bb(core.tc(10, 7, ctx.filteredSections))));
                },
                directives: [ select_component.a, common.j, common.k ],
                pipes: [ common.b ],
                encapsulation: 2
            }), ApiListComponent;
        }(), api_list_module_ApiListModule = function() {
            function ApiListModule() {
                this.customElementComponent = api_list_component_ApiListComponent;
            }
            return ApiListModule.ngModuleDef = core.Ib({
                type: ApiListModule
            }), ApiListModule.ngInjectorDef = core.jb({
                factory: function(t) {
                    return new (t || ApiListModule)();
                },
                providers: [ api_service_ApiService ],
                imports: [ [ common.c, shared_module.a, fesm5_http.b ] ]
            }), ApiListModule;
        }();
        __webpack_require__.d(__webpack_exports__, "ApiListModuleNgFactory", function() {
            return ApiListModuleNgFactory;
        });
        var ApiListModuleNgFactory = new core.ub(api_list_module_ApiListModule);
    }
} ]);
//# sourceMappingURL=api-api-list-module-ngfactory.f917078921fe9ac013b6.js.map
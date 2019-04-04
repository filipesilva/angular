(window.webpackJsonp = window.webpackJsonp || []).push([ [ 3 ], {
    "/CO3": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var core = __webpack_require__("CcnG"), tslib_es6 = __webpack_require__("mrSG"), ReplaySubject = __webpack_require__("S5bw"), combineLatest = __webpack_require__("dzgT"), map = __webpack_require__("67Y/"), SearchCriteria = function() {
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
            }, ApiListComponent;
        }(), api_list_module_ApiListModule = function() {
            return function() {
                this.customElementComponent = api_list_component_ApiListComponent;
            };
        }(), common = __webpack_require__("Ip0R"), select_component_ngfactory = __webpack_require__("1nbL"), select_component = __webpack_require__("x4lQ"), Subject = __webpack_require__("K9Ia"), takeUntil = __webpack_require__("ny24"), tap = __webpack_require__("xMyE"), document_service = __webpack_require__("jn67"), api_service_ApiService = function() {
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
            }, ApiService;
        }(), location_service = __webpack_require__("/lUL"), RenderType_ApiListComponent = core.rb({
            encapsulation: 2,
            styles: [],
            data: {}
        });
        function View_ApiListComponent_2(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 2, "h2", [], null, null, null, null, null)), (_l()(), 
            core.ub(1, 0, null, null, 1, "a", [], [ [ 8, "href", 4 ], [ 2, "deprecated-api-item", null ] ], null, null, null, null)), (_l()(), 
            core.Mb(2, null, [ "", "" ])) ], null, function(_ck, _v) {
                _ck(_v, 1, 0, _v.parent.context.$implicit.path, _v.parent.context.$implicit.deprecated), 
                _ck(_v, 2, 0, _v.parent.context.$implicit.title);
            });
        }
        function View_ApiListComponent_4(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 4, null, null, null, null, null, null, null)), (_l()(), 
            core.ub(1, 0, null, null, 3, "li", [ [ "class", "api-item" ] ], null, null, null, null, null)), (_l()(), 
            core.ub(2, 0, null, null, 2, "a", [], [ [ 8, "href", 4 ], [ 2, "deprecated-api-item", null ] ], null, null, null, null)), (_l()(), 
            core.ub(3, 0, null, null, 0, "span", [], [ [ 8, "className", 0 ] ], null, null, null, null)), (_l()(), 
            core.Mb(4, null, [ " ", " " ])) ], null, function(_ck, _v) {
                _ck(_v, 2, 0, _v.context.$implicit.path, "deprecated" === _v.context.$implicit.stability), 
                _ck(_v, 3, 0, core.zb(1, "symbol ", _v.context.$implicit.docType, "")), _ck(_v, 4, 0, _v.context.$implicit.title);
            });
        }
        function View_ApiListComponent_3(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 2, "ul", [ [ "class", "api-list" ] ], null, null, null, null, null)), (_l()(), 
            core.ib(16777216, null, null, 1, null, View_ApiListComponent_4)), core.tb(2, 278528, null, 0, common.j, [ core.R, core.O, core.t ], {
                ngForOf: [ 0, "ngForOf" ]
            }, null) ], function(_ck, _v) {
                _ck(_v, 2, 0, _v.parent.context.$implicit.items);
            }, null);
        }
        function View_ApiListComponent_1(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 4, "div", [], null, null, null, null, null)), (_l()(), 
            core.ib(16777216, null, null, 1, null, View_ApiListComponent_2)), core.tb(2, 16384, null, 0, common.k, [ core.R, core.O ], {
                ngIf: [ 0, "ngIf" ]
            }, null), (_l()(), core.ib(16777216, null, null, 1, null, View_ApiListComponent_3)), core.tb(4, 16384, null, 0, common.k, [ core.R, core.O ], {
                ngIf: [ 0, "ngIf" ]
            }, null) ], function(_ck, _v) {
                _ck(_v, 2, 0, _v.context.$implicit.items), _ck(_v, 4, 0, null == _v.context.$implicit.items ? null : _v.context.$implicit.items.length);
            }, null);
        }
        function View_ApiListComponent_0(_l) {
            return core.Ob(0, [ core.Kb(402653184, 1, {
                queryEl: 0
            }), (_l()(), core.ub(1, 0, null, null, 8, "div", [ [ "class", "l-flex-wrap api-filter" ] ], null, null, null, null, null)), (_l()(), 
            core.ub(2, 0, null, null, 1, "aio-select", [ [ "label", "Type:" ] ], null, [ [ null, "change" ], [ "document", "click" ], [ "document", "keydown.escape" ] ], function(_v, en, $event) {
                var ad = !0, _co = _v.component;
                return "document:click" === en && (ad = !1 !== core.Gb(_v, 3).onClick($event.target) && ad), 
                "document:keydown.escape" === en && (ad = !1 !== core.Gb(_v, 3).onKeyDown() && ad), 
                "change" === en && (ad = !1 !== _co.setType($event.option) && ad), ad;
            }, select_component_ngfactory.b, select_component_ngfactory.a)), core.tb(3, 114688, null, 0, select_component.a, [ core.k ], {
                selected: [ 0, "selected" ],
                options: [ 1, "options" ],
                showSymbol: [ 2, "showSymbol" ],
                label: [ 3, "label" ]
            }, {
                change: "change"
            }), (_l()(), core.ub(4, 0, null, null, 1, "aio-select", [ [ "label", "Status:" ] ], null, [ [ null, "change" ], [ "document", "click" ], [ "document", "keydown.escape" ] ], function(_v, en, $event) {
                var ad = !0, _co = _v.component;
                return "document:click" === en && (ad = !1 !== core.Gb(_v, 5).onClick($event.target) && ad), 
                "document:keydown.escape" === en && (ad = !1 !== core.Gb(_v, 5).onKeyDown() && ad), 
                "change" === en && (ad = !1 !== _co.setStatus($event.option) && ad), ad;
            }, select_component_ngfactory.b, select_component_ngfactory.a)), core.tb(5, 114688, null, 0, select_component.a, [ core.k ], {
                selected: [ 0, "selected" ],
                options: [ 1, "options" ],
                label: [ 2, "label" ],
                disabled: [ 3, "disabled" ]
            }, {
                change: "change"
            }), (_l()(), core.ub(6, 0, null, null, 3, "div", [ [ "class", "form-search" ] ], null, null, null, null, null)), (_l()(), 
            core.ub(7, 0, [ [ 1, 0 ], [ "filter", 1 ] ], null, 0, "input", [ [ "placeholder", "Filter" ] ], null, [ [ null, "input" ] ], function(_v, en, $event) {
                var ad = !0;
                return "input" === en && (ad = !1 !== _v.component.setQuery($event.target.value) && ad), 
                ad;
            }, null, null)), (_l()(), core.ub(8, 0, null, null, 1, "i", [ [ "class", "material-icons" ] ], null, null, null, null, null)), (_l()(), 
            core.Mb(-1, null, [ "search" ])), (_l()(), core.ub(10, 0, null, null, 3, "article", [ [ "class", "api-list-container l-content-small docs-content" ] ], null, null, null, null, null)), (_l()(), 
            core.ib(16777216, null, null, 2, null, View_ApiListComponent_1)), core.tb(12, 278528, null, 0, common.j, [ core.R, core.O, core.t ], {
                ngForOf: [ 0, "ngForOf" ]
            }, null), core.Hb(131072, common.b, [ core.h ]) ], function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 3, 0, _co.type, _co.types, !0, "Type:"), _ck(_v, 5, 0, _co.status, _co.statuses, "Status:", "package" === _co.type.value), 
                _ck(_v, 12, 0, core.Nb(_v, 12, 0, core.Gb(_v, 13).transform(_co.filteredSections)));
            }, null);
        }
        function View_ApiListComponent_Host_0(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 1, "aio-api-list", [], null, null, null, View_ApiListComponent_0, RenderType_ApiListComponent)), core.tb(1, 114688, null, 0, api_list_component_ApiListComponent, [ api_service_ApiService, location_service.a ], null, null) ], function(_ck, _v) {
                _ck(_v, 1, 0);
            }, null);
        }
        var ApiListComponentNgFactory = core.pb("aio-api-list", api_list_component_ApiListComponent, View_ApiListComponent_Host_0, {}, {}, []), fesm5_http = __webpack_require__("t/Na"), logger_service = __webpack_require__("vHPH"), shared_module = __webpack_require__("PCNd");
        __webpack_require__.d(__webpack_exports__, "ApiListModuleNgFactory", function() {
            return ApiListModuleNgFactory;
        });
        var ApiListModuleNgFactory = core.qb(api_list_module_ApiListModule, [], function(_l) {
            return core.Db([ core.Eb(512, core.j, core.db, [ [ 8, [ ApiListComponentNgFactory ] ], [ 3, core.j ], core.y ]), core.Eb(4608, common.m, common.l, [ core.v, [ 2, common.B ] ]), core.Eb(4608, fesm5_http.h, fesm5_http.n, [ common.d, core.C, fesm5_http.l ]), core.Eb(4608, fesm5_http.o, fesm5_http.o, [ fesm5_http.h, fesm5_http.m ]), core.Eb(5120, fesm5_http.a, function(p0_0) {
                return [ p0_0 ];
            }, [ fesm5_http.o ]), core.Eb(4608, fesm5_http.k, fesm5_http.k, []), core.Eb(6144, fesm5_http.i, null, [ fesm5_http.k ]), core.Eb(4608, fesm5_http.g, fesm5_http.g, [ fesm5_http.i ]), core.Eb(6144, fesm5_http.b, null, [ fesm5_http.g ]), core.Eb(4608, fesm5_http.f, fesm5_http.j, [ fesm5_http.b, core.r ]), core.Eb(4608, fesm5_http.c, fesm5_http.c, [ fesm5_http.f ]), core.Eb(135680, api_service_ApiService, api_service_ApiService, [ fesm5_http.c, logger_service.a ]), core.Eb(1073742336, common.c, common.c, []), core.Eb(1073742336, shared_module.a, shared_module.a, []), core.Eb(1073742336, fesm5_http.e, fesm5_http.e, []), core.Eb(1073742336, fesm5_http.d, fesm5_http.d, []), core.Eb(1073742336, api_list_module_ApiListModule, api_list_module_ApiListModule, []), core.Eb(256, fesm5_http.l, "XSRF-TOKEN", []), core.Eb(256, fesm5_http.m, "X-XSRF-TOKEN", []) ]);
        });
    }
} ]);
//# sourceMappingURL=api-api-list-module-ngfactory.52e9ff3daffceac5e8a0.js.map
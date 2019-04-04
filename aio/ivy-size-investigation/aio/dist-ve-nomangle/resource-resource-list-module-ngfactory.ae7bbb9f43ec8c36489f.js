(window.webpackJsonp = window.webpackJsonp || []).push([ [ 10 ], {
    uway: function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var core = __webpack_require__("CcnG"), ResourceListComponent = function() {
            function ResourceListComponent(location, resourceService) {
                this.resourceService = resourceService, this.scrollPos = 0, this.location = location.pathname.replace(/^\/+/, "");
            }
            return ResourceListComponent.prototype.href = function(cat) {
                return this.location + "#" + cat.id;
            }, ResourceListComponent.prototype.ngOnInit = function() {
                var _this = this;
                this.resourceService.categories.subscribe(function(cats) {
                    return _this.categories = cats;
                });
            }, ResourceListComponent.prototype.onScroll = function(target) {
                this.scrollPos = target && (target.scrollTop || target.body.scrollTop) || 0;
            }, ResourceListComponent;
        }(), resource_list_module_ResourceListModule = function() {
            return function() {
                this.customElementComponent = ResourceListComponent;
            };
        }(), common = __webpack_require__("Ip0R"), map = __webpack_require__("67Y/"), publishLast = __webpack_require__("kR3u"), resourcesPath = __webpack_require__("jn67").a + "resources.json", resource_service_ResourceService = function() {
            function ResourceService(http) {
                this.http = http, this.categories = this.getCategories();
            }
            return ResourceService.prototype.getCategories = function() {
                var categories = this.http.get(resourcesPath).pipe(Object(map.a)(function(data) {
                    return categoryJson = data, Object.keys(categoryJson).map(function(catKey) {
                        var cat = categoryJson[catKey];
                        return {
                            id: makeId(catKey),
                            title: catKey,
                            order: cat.order,
                            subCategories: mkSubCategories(cat.subCategories, catKey)
                        };
                    }).sort(compareCats);
                    var categoryJson;
                }), Object(publishLast.a)());
                return categories.connect(), categories;
            }, ResourceService;
        }();
        function mkSubCategories(subCategoryJson, catKey) {
            return Object.keys(subCategoryJson).map(function(subKey) {
                var sub = subCategoryJson[subKey];
                return {
                    id: makeId(subKey),
                    title: subKey,
                    order: sub.order,
                    resources: mkResources(sub.resources, subKey, catKey)
                };
            }).sort(compareCats);
        }
        function mkResources(resourceJson, subKey, catKey) {
            return Object.keys(resourceJson).map(function(resKey) {
                var res = resourceJson[resKey];
                return res.category = catKey, res.subCategory = subKey, res.id = makeId(resKey), 
                res;
            }).sort(compareTitles);
        }
        function compareCats(l, r) {
            return l.order === r.order ? compareTitles(l, r) : l.order > r.order ? 1 : -1;
        }
        function compareTitles(l, r) {
            return l.title.toUpperCase() > r.title.toUpperCase() ? 1 : -1;
        }
        function makeId(title) {
            return title.toLowerCase().replace(/\s+/g, "-");
        }
        var RenderType_ResourceListComponent = core.rb({
            encapsulation: 2,
            styles: [],
            data: {}
        });
        function View_ResourceListComponent_4(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 6, "div", [ [ "class", "c-resource" ] ], null, null, null, null, null)), (_l()(), 
            core.ub(1, 0, null, null, 5, "a", [ [ "class", "l-flex--column resource-row-link" ], [ "target", "_blank" ] ], [ [ 8, "href", 4 ] ], null, null, null, null)), (_l()(), 
            core.ub(2, 0, null, null, 4, "div", [], null, null, null, null, null)), (_l()(), 
            core.ub(3, 0, null, null, 1, "h4", [], null, null, null, null, null)), (_l()(), 
            core.Mb(4, null, [ "", "" ])), (_l()(), core.ub(5, 0, null, null, 1, "p", [ [ "class", "resource-description" ] ], null, null, null, null, null)), (_l()(), 
            core.Mb(6, null, [ "", "" ])) ], null, function(_ck, _v) {
                _ck(_v, 1, 0, _v.parent.context.$implicit.url), _ck(_v, 4, 0, _v.parent.context.$implicit.title), 
                _ck(_v, 6, 0, _v.parent.context.$implicit.desc || "No Description");
            });
        }
        function View_ResourceListComponent_3(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 2, "div", [], null, null, null, null, null)), (_l()(), 
            core.ib(16777216, null, null, 1, null, View_ResourceListComponent_4)), core.tb(2, 16384, null, 0, common.k, [ core.R, core.O ], {
                ngIf: [ 0, "ngIf" ]
            }, null) ], function(_ck, _v) {
                _ck(_v, 2, 0, _v.context.$implicit.rev);
            }, null);
        }
        function View_ResourceListComponent_2(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 5, "div", [], null, null, null, null, null)), (_l()(), 
            core.ub(1, 0, null, null, 0, "a", [ [ "class", "h-anchor-offset" ] ], [ [ 8, "id", 0 ] ], null, null, null, null)), (_l()(), 
            core.ub(2, 0, null, null, 1, "h3", [ [ "class", "subcategory-title" ] ], null, null, null, null, null)), (_l()(), 
            core.Mb(3, null, [ "", "" ])), (_l()(), core.ib(16777216, null, null, 1, null, View_ResourceListComponent_3)), core.tb(5, 278528, null, 0, common.j, [ core.R, core.O, core.t ], {
                ngForOf: [ 0, "ngForOf" ]
            }, null) ], function(_ck, _v) {
                _ck(_v, 5, 0, _v.context.$implicit.resources);
            }, function(_ck, _v) {
                _ck(_v, 1, 0, core.zb(1, "", _v.context.$implicit.id, "")), _ck(_v, 3, 0, _v.context.$implicit.title);
            });
        }
        function View_ResourceListComponent_1(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 7, "div", [ [ "class", "showcase" ] ], null, null, null, null, null)), (_l()(), 
            core.ub(1, 0, null, null, 3, "header", [ [ "class", "c-resource-header" ] ], null, null, null, null, null)), (_l()(), 
            core.ub(2, 0, null, null, 0, "a", [ [ "class", "h-anchor-offset" ] ], [ [ 8, "id", 0 ] ], null, null, null, null)), (_l()(), 
            core.ub(3, 0, null, null, 1, "h2", [], null, null, null, null, null)), (_l()(), 
            core.Mb(4, null, [ "", "" ])), (_l()(), core.ub(5, 0, null, null, 2, "div", [ [ "class", "shadow-1" ] ], null, null, null, null, null)), (_l()(), 
            core.ib(16777216, null, null, 1, null, View_ResourceListComponent_2)), core.tb(7, 278528, null, 0, common.j, [ core.R, core.O, core.t ], {
                ngForOf: [ 0, "ngForOf" ]
            }, null) ], function(_ck, _v) {
                _ck(_v, 7, 0, _v.context.$implicit.subCategories);
            }, function(_ck, _v) {
                _ck(_v, 2, 0, core.zb(1, "", _v.context.$implicit.id, "")), _ck(_v, 4, 0, _v.context.$implicit.title);
            });
        }
        function View_ResourceListComponent_0(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 3, "div", [ [ "class", "resources-container" ] ], null, null, null, null, null)), (_l()(), 
            core.ub(1, 0, null, null, 2, "div", [ [ "class", "l-flex--column" ] ], null, null, null, null, null)), (_l()(), 
            core.ib(16777216, null, null, 1, null, View_ResourceListComponent_1)), core.tb(3, 278528, null, 0, common.j, [ core.R, core.O, core.t ], {
                ngForOf: [ 0, "ngForOf" ]
            }, null) ], function(_ck, _v) {
                _ck(_v, 3, 0, _v.component.categories);
            }, null);
        }
        function View_ResourceListComponent_Host_0(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 1, "aio-resource-list", [], null, [ [ "window", "scroll" ] ], function(_v, en, $event) {
                var ad = !0;
                return "window:scroll" === en && (ad = !1 !== core.Gb(_v, 1).onScroll($event.target) && ad), 
                ad;
            }, View_ResourceListComponent_0, RenderType_ResourceListComponent)), core.tb(1, 114688, null, 0, ResourceListComponent, [ common.s, resource_service_ResourceService ], null, null) ], function(_ck, _v) {
                _ck(_v, 1, 0);
            }, null);
        }
        var ResourceListComponentNgFactory = core.pb("aio-resource-list", ResourceListComponent, View_ResourceListComponent_Host_0, {}, {}, []), http = __webpack_require__("t/Na");
        __webpack_require__.d(__webpack_exports__, "ResourceListModuleNgFactory", function() {
            return ResourceListModuleNgFactory;
        });
        var ResourceListModuleNgFactory = core.qb(resource_list_module_ResourceListModule, [], function(_l) {
            return core.Db([ core.Eb(512, core.j, core.db, [ [ 8, [ ResourceListComponentNgFactory ] ], [ 3, core.j ], core.y ]), core.Eb(4608, common.m, common.l, [ core.v, [ 2, common.B ] ]), core.Eb(4608, resource_service_ResourceService, resource_service_ResourceService, [ http.c ]), core.Eb(1073742336, common.c, common.c, []), core.Eb(1073742336, resource_list_module_ResourceListModule, resource_list_module_ResourceListModule, []) ]);
        });
    }
} ]);
//# sourceMappingURL=resource-resource-list-module-ngfactory.ae7bbb9f43ec8c36489f.js.map
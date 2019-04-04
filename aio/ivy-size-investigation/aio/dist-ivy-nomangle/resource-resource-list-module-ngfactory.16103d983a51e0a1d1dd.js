(window.webpackJsonp = window.webpackJsonp || []).push([ [ 10 ], {
    uway: function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var core = __webpack_require__("CcnG"), common = __webpack_require__("Ip0R"), map = __webpack_require__("67Y/"), publishLast = __webpack_require__("kR3u"), document_service = __webpack_require__("jn67"), http = __webpack_require__("t/Na"), resourcesPath = document_service.a + "resources.json", resource_service_ResourceService = function() {
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
            }, ResourceService.ngInjectableDef = core.ib({
                token: ResourceService,
                factory: function(t) {
                    return new (t || ResourceService)(core.nb(http.a));
                },
                providedIn: null
            }), ResourceService;
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
        var _c0 = [ 1, "resources-container" ], _c1 = [ 1, "l-flex--column" ], _c2 = [ "class", "showcase", 4, "ngFor", "ngForOf" ], _c3 = [ 1, "showcase" ], _c4 = [ 1, "c-resource-header" ], _c5 = [ 1, "h-anchor-offset", 3, "id" ], _c6 = [ 1, "shadow-1" ], _c7 = [ 4, "ngFor", "ngForOf" ], _c8 = [ 1, "subcategory-title" ], _c9 = [ "class", "c-resource", 4, "ngIf" ], _c10 = [ 1, "c-resource" ], _c11 = [ "target", "_blank", 1, "l-flex--column", "resource-row-link", 3, "href" ], _c12 = [ 1, "resource-description" ];
        function ResourceListComponent_div_2_div_6_div_4_div_1_Template(rf, ctx) {
            if (1 & rf && (core.Yb(0, "div", _c10), core.Yb(1, "a", _c11), core.Yb(2, "div"), 
            core.Yb(3, "h4"), core.Kc(4), core.Qb(), core.Yb(5, "p", _c12), core.Kc(6), core.Qb(), 
            core.Qb(), core.Qb(), core.Qb()), 2 & rf) {
                var resource_r122 = core.rc().$implicit;
                core.Ec(1), core.Xb(1, "href", core.Bb(resource_r122.url), core.Dc), core.Ec(4), 
                core.Lc(4, core.hc("", resource_r122.title, "")), core.Ec(6), core.Lc(6, core.hc("", resource_r122.desc || "No Description", ""));
            }
        }
        function ResourceListComponent_div_2_div_6_div_4_Template(rf, ctx) {
            if (1 & rf && (core.Yb(0, "div"), core.Ic(1, ResourceListComponent_div_2_div_6_div_4_div_1_Template, 7, 3, "div", _c9), 
            core.Qb()), 2 & rf) {
                var resource_r122 = ctx.$implicit;
                core.Ec(1), core.Xb(1, "ngIf", core.Bb(resource_r122.rev));
            }
        }
        function ResourceListComponent_div_2_div_6_Template(rf, ctx) {
            if (1 & rf && (core.Yb(0, "div"), core.Lb(1, "a", _c5), core.Yb(2, "h3", _c8), core.Kc(3), 
            core.Qb(), core.Ic(4, ResourceListComponent_div_2_div_6_div_4_Template, 2, 1, "div", _c7), 
            core.Qb()), 2 & rf) {
                var subCategory_r120 = ctx.$implicit;
                core.Ec(1), core.Xb(1, "id", core.hc("", subCategory_r120.id, "")), core.Ec(3), 
                core.Lc(3, core.hc("", subCategory_r120.title, "")), core.Ec(4), core.Xb(4, "ngForOf", core.Bb(subCategory_r120.resources));
            }
        }
        function ResourceListComponent_div_2_Template(rf, ctx) {
            if (1 & rf && (core.Yb(0, "div", _c3), core.Yb(1, "header", _c4), core.Lb(2, "a", _c5), 
            core.Yb(3, "h2"), core.Kc(4), core.Qb(), core.Qb(), core.Yb(5, "div", _c6), core.Ic(6, ResourceListComponent_div_2_div_6_Template, 5, 3, "div", _c7), 
            core.Qb(), core.Qb()), 2 & rf) {
                var category_r118 = ctx.$implicit;
                core.Ec(2), core.Xb(2, "id", core.hc("", category_r118.id, "")), core.Ec(4), core.Lc(4, core.hc("", category_r118.title, "")), 
                core.Ec(6), core.Xb(6, "ngForOf", core.Bb(category_r118.subCategories));
            }
        }
        var resource_list_component_ResourceListComponent = function() {
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
            }, ResourceListComponent.ngComponentDef = core.Gb({
                type: ResourceListComponent,
                selectors: [ [ "aio-resource-list" ] ],
                factory: function(t) {
                    return new (t || ResourceListComponent)(core.Kb(common.q), core.Kb(resource_service_ResourceService));
                },
                hostBindings: function(rf, ctx, elIndex) {
                    1 & rf && core.mc("scroll", function($event) {
                        return ctx.onScroll($event.target);
                    }, !1, core.Ac);
                },
                consts: 3,
                vars: 1,
                template: function(rf, ctx) {
                    1 & rf && (core.Yb(0, "div", _c0), core.Yb(1, "div", _c1), core.Ic(2, ResourceListComponent_div_2_Template, 7, 3, "div", _c2), 
                    core.Qb(), core.Qb()), 2 & rf && (core.Ec(2), core.Xb(2, "ngForOf", core.Bb(ctx.categories)));
                },
                directives: [ common.j, common.k ],
                encapsulation: 2
            }), ResourceListComponent;
        }(), resource_list_module_ResourceListModule = function() {
            function ResourceListModule() {
                this.customElementComponent = resource_list_component_ResourceListComponent;
            }
            return ResourceListModule.ngModuleDef = core.Ib({
                type: ResourceListModule
            }), ResourceListModule.ngInjectorDef = core.jb({
                factory: function(t) {
                    return new (t || ResourceListModule)();
                },
                providers: [ resource_service_ResourceService ],
                imports: [ [ common.c ] ]
            }), ResourceListModule;
        }();
        __webpack_require__.d(__webpack_exports__, "ResourceListModuleNgFactory", function() {
            return ResourceListModuleNgFactory;
        });
        var ResourceListModuleNgFactory = new core.ub(resource_list_module_ResourceListModule);
    }
} ]);
//# sourceMappingURL=resource-resource-list-module-ngfactory.16103d983a51e0a1d1dd.js.map
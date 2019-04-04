(window.webpackJsonp = window.webpackJsonp || []).push([ [ 11 ], {
    "8YE0": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var core = __webpack_require__("CcnG"), common = __webpack_require__("Ip0R"), shared_module = __webpack_require__("PCNd"), switchMap = __webpack_require__("15JJ"), location_service = __webpack_require__("/lUL"), search_service = __webpack_require__("to4i"), search_results_component = __webpack_require__("LwjS"), _c0 = [ 1, "embedded", 3, "searchResults" ], file_not_found_search_component_FileNotFoundSearchComponent = function() {
            function FileNotFoundSearchComponent(location, search) {
                this.location = location, this.search = search;
            }
            return FileNotFoundSearchComponent.prototype.ngOnInit = function() {
                var _this = this;
                this.searchResults = this.location.currentPath.pipe(Object(switchMap.a)(function(path) {
                    var query = path.split(/\W+/).join(" ");
                    return _this.search.search(query);
                }));
            }, FileNotFoundSearchComponent.ngComponentDef = core.Gb({
                type: FileNotFoundSearchComponent,
                selectors: [ [ "aio-file-not-found-search" ] ],
                factory: function(t) {
                    return new (t || FileNotFoundSearchComponent)(core.Kb(location_service.a), core.Kb(search_service.a));
                },
                consts: 4,
                vars: 3,
                template: function(rf, ctx) {
                    1 & rf && (core.Yb(0, "p"), core.Kc(1, "Let's see if any of these search results help..."), 
                    core.Qb(), core.Lb(2, "aio-search-results", _c0), core.sc(3, "async")), 2 & rf && (core.Ec(2), 
                    core.Xb(2, "searchResults", core.Bb(core.tc(3, 1, ctx.searchResults))));
                },
                directives: [ search_results_component.a ],
                pipes: [ common.b ],
                encapsulation: 2
            }), FileNotFoundSearchComponent;
        }(), file_not_found_search_module_FileNotFoundSearchModule = function() {
            function FileNotFoundSearchModule() {
                this.customElementComponent = file_not_found_search_component_FileNotFoundSearchComponent;
            }
            return FileNotFoundSearchModule.ngModuleDef = core.Ib({
                type: FileNotFoundSearchModule
            }), FileNotFoundSearchModule.ngInjectorDef = core.jb({
                factory: function(t) {
                    return new (t || FileNotFoundSearchModule)();
                },
                imports: [ [ common.c, shared_module.a ] ]
            }), FileNotFoundSearchModule;
        }();
        __webpack_require__.d(__webpack_exports__, "FileNotFoundSearchModuleNgFactory", function() {
            return FileNotFoundSearchModuleNgFactory;
        });
        var FileNotFoundSearchModuleNgFactory = new core.ub(file_not_found_search_module_FileNotFoundSearchModule);
    }
} ]);
//# sourceMappingURL=search-file-not-found-search-module-ngfactory.6693fd20a29c7c944972.js.map
(window.webpackJsonp = window.webpackJsonp || []).push([ [ 11 ], {
    "8YE0": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var core = __webpack_require__("CcnG"), switchMap = __webpack_require__("15JJ"), file_not_found_search_component_FileNotFoundSearchComponent = function() {
            function FileNotFoundSearchComponent(location, search) {
                this.location = location, this.search = search;
            }
            return FileNotFoundSearchComponent.prototype.ngOnInit = function() {
                var _this = this;
                this.searchResults = this.location.currentPath.pipe(Object(switchMap.a)(function(path) {
                    var query = path.split(/\W+/).join(" ");
                    return _this.search.search(query);
                }));
            }, FileNotFoundSearchComponent;
        }(), file_not_found_search_module_FileNotFoundSearchModule = function() {
            return function() {
                this.customElementComponent = file_not_found_search_component_FileNotFoundSearchComponent;
            };
        }(), search_results_component_ngfactory = __webpack_require__("f9xn"), search_results_component = __webpack_require__("LwjS"), common = __webpack_require__("Ip0R"), location_service = __webpack_require__("/lUL"), search_service = __webpack_require__("to4i"), RenderType_FileNotFoundSearchComponent = core.rb({
            encapsulation: 2,
            styles: [],
            data: {}
        });
        function View_FileNotFoundSearchComponent_0(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 1, "p", [], null, null, null, null, null)), (_l()(), 
            core.Mb(-1, null, [ "Let's see if any of these search results help..." ])), (_l()(), 
            core.ub(2, 0, null, null, 2, "aio-search-results", [ [ "class", "embedded" ] ], null, null, null, search_results_component_ngfactory.b, search_results_component_ngfactory.a)), core.tb(3, 573440, null, 0, search_results_component.a, [], {
                searchResults: [ 0, "searchResults" ]
            }, null), core.Hb(131072, common.b, [ core.h ]) ], function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 3, 0, core.Nb(_v, 3, 0, core.Gb(_v, 4).transform(_co.searchResults)));
            }, null);
        }
        function View_FileNotFoundSearchComponent_Host_0(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 1, "aio-file-not-found-search", [], null, null, null, View_FileNotFoundSearchComponent_0, RenderType_FileNotFoundSearchComponent)), core.tb(1, 114688, null, 0, file_not_found_search_component_FileNotFoundSearchComponent, [ location_service.a, search_service.a ], null, null) ], function(_ck, _v) {
                _ck(_v, 1, 0);
            }, null);
        }
        var FileNotFoundSearchComponentNgFactory = core.pb("aio-file-not-found-search", file_not_found_search_component_FileNotFoundSearchComponent, View_FileNotFoundSearchComponent_Host_0, {}, {}, []), shared_module = __webpack_require__("PCNd");
        __webpack_require__.d(__webpack_exports__, "FileNotFoundSearchModuleNgFactory", function() {
            return FileNotFoundSearchModuleNgFactory;
        });
        var FileNotFoundSearchModuleNgFactory = core.qb(file_not_found_search_module_FileNotFoundSearchModule, [], function(_l) {
            return core.Db([ core.Eb(512, core.j, core.db, [ [ 8, [ FileNotFoundSearchComponentNgFactory ] ], [ 3, core.j ], core.y ]), core.Eb(4608, common.m, common.l, [ core.v, [ 2, common.B ] ]), core.Eb(1073742336, common.c, common.c, []), core.Eb(1073742336, shared_module.a, shared_module.a, []), core.Eb(1073742336, file_not_found_search_module_FileNotFoundSearchModule, file_not_found_search_module_FileNotFoundSearchModule, []) ]);
        });
    }
} ]);
//# sourceMappingURL=search-file-not-found-search-module-ngfactory.7e4a0bb122a5231a5caa.js.map
(window.webpackJsonp = window.webpackJsonp || []).push([ [ 7 ], {
    Rz96: function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var core = __webpack_require__("CcnG"), document_service = __webpack_require__("jn67");
        function getAttrValue(attrs, attr) {
            var key = "string" == typeof attr ? attr : attr.find(function(a) {
                return attrs.hasOwnProperty(a.toLowerCase());
            });
            return void 0 === key ? void 0 : attrs[key.toLowerCase()];
        }
        function boolFromValue(attrValue, def) {
            return void 0 === def && (def = !1), void 0 === attrValue ? def : "false" !== attrValue.trim();
        }
        var LIVE_EXAMPLE_BASE = document_service.a + "live-examples/", ZIP_BASE = document_service.a + "zips/", live_example_component_LiveExampleComponent = function() {
            function LiveExampleComponent(elementRef, location) {
                var attrs = function(el) {
                    for (var attrMap = {}, _i = 0, _a = elementRef instanceof core.k ? elementRef.nativeElement.attributes : elementRef.attributes; _i < _a.length; _i++) {
                        var attr = _a[_i];
                        attrMap[attr.name.toLowerCase()] = attr.value;
                    }
                    return attrMap;
                }(), exampleDir = this.getExampleDir(attrs, location.path(!1)), stackblitzName = this.getStackblitzName(attrs);
                this.mode = this.getMode(attrs), this.enableDownload = this.getEnableDownload(attrs), 
                this.stackblitz = this.getStackblitz(exampleDir, stackblitzName, "embedded" === this.mode), 
                this.zip = this.getZip(exampleDir, stackblitzName), this.title = this.getTitle(attrs);
            }
            return LiveExampleComponent.prototype.ngAfterContentInit = function() {
                var textContent = this.content.nativeElement.textContent.trim();
                textContent && (this.title = textContent);
            }, LiveExampleComponent.prototype.getEnableDownload = function(attrs) {
                return !boolFromValue(getAttrValue(attrs, "noDownload"));
            }, LiveExampleComponent.prototype.getExampleDir = function(attrs, path) {
                var exampleDir = getAttrValue(attrs, "name");
                if (!exampleDir) {
                    var match = path.match(/[^\/?#]+(?=\/?(?:\?|#|$))/);
                    exampleDir = match ? match[0] : "index";
                }
                return exampleDir.trim();
            }, LiveExampleComponent.prototype.getMode = function(attrs) {
                var downloadOnly = boolFromValue(getAttrValue(attrs, "downloadOnly")), isEmbedded = boolFromValue(getAttrValue(attrs, "embedded"));
                return downloadOnly ? "downloadOnly" : isEmbedded ? "embedded" : "default";
            }, LiveExampleComponent.prototype.getStackblitz = function(exampleDir, stackblitzName, isEmbedded) {
                return "" + LIVE_EXAMPLE_BASE + exampleDir + "/" + stackblitzName + "stackblitz.html" + (isEmbedded ? "?ctl=1" : "");
            }, LiveExampleComponent.prototype.getStackblitzName = function(attrs) {
                var attrValue = (getAttrValue(attrs, "stackblitz") || "").trim();
                return attrValue && attrValue + ".";
            }, LiveExampleComponent.prototype.getTitle = function(attrs) {
                return (getAttrValue(attrs, "title") || "live example").trim();
            }, LiveExampleComponent.prototype.getZip = function(exampleDir, stackblitzName) {
                var zipName = exampleDir.split("/")[0];
                return "" + ZIP_BASE + exampleDir + "/" + stackblitzName + zipName + ".zip";
            }, LiveExampleComponent;
        }(), EmbeddedStackblitzComponent = function() {
            function EmbeddedStackblitzComponent() {}
            return EmbeddedStackblitzComponent.prototype.ngAfterViewInit = function() {
                this.iframe && (this.iframe.nativeElement.src = this.src);
            }, EmbeddedStackblitzComponent;
        }(), live_example_module_LiveExampleModule = function() {
            return function() {
                this.customElementComponent = live_example_component_LiveExampleComponent;
            };
        }(), common = __webpack_require__("Ip0R"), RenderType_LiveExampleComponent = core.rb({
            encapsulation: 2,
            styles: [],
            data: {}
        });
        function View_LiveExampleComponent_2(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 4, "p", [], null, null, null, null, null)), (_l()(), 
            core.Mb(-1, null, [ " You can also " ])), (_l()(), core.ub(2, 0, null, null, 1, "a", [ [ "download", "" ], [ "title", "Download example" ] ], [ [ 8, "href", 4 ] ], null, null, null, null)), (_l()(), 
            core.Mb(-1, null, [ "download this example" ])), (_l()(), core.Mb(-1, null, [ ". " ])) ], null, function(_ck, _v) {
                _ck(_v, 2, 0, _v.component.zip);
            });
        }
        function View_LiveExampleComponent_1(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 5, "span", [], null, null, null, null, null)), (_l()(), 
            core.ub(1, 0, null, null, 2, "div", [], [ [ 8, "title", 0 ] ], null, null, null, null)), (_l()(), 
            core.ub(2, 0, null, null, 1, "aio-embedded-stackblitz", [], null, null, null, View_EmbeddedStackblitzComponent_0, RenderType_EmbeddedStackblitzComponent)), core.tb(3, 4243456, null, 0, EmbeddedStackblitzComponent, [], {
                src: [ 0, "src" ]
            }, null), (_l()(), core.ib(16777216, null, null, 1, null, View_LiveExampleComponent_2)), core.tb(5, 16384, null, 0, common.k, [ core.R, core.O ], {
                ngIf: [ 0, "ngIf" ]
            }, null) ], function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 3, 0, _co.stackblitz), _ck(_v, 5, 0, _co.enableDownload);
            }, function(_ck, _v) {
                _ck(_v, 1, 0, core.zb(1, "", _v.component.title, ""));
            });
        }
        function View_LiveExampleComponent_3(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 2, "span", [], null, null, null, null, null)), (_l()(), 
            core.ub(1, 0, null, null, 1, "a", [ [ "download", "" ] ], [ [ 8, "href", 4 ], [ 8, "title", 0 ] ], null, null, null, null)), (_l()(), 
            core.Mb(2, null, [ "", "" ])) ], null, function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 1, 0, _co.zip, core.zb(1, "", _co.title, "")), _ck(_v, 2, 0, _co.title);
            });
        }
        function View_LiveExampleComponent_5(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 3, "span", [], null, null, null, null, null)), (_l()(), 
            core.Mb(-1, null, [ " / " ])), (_l()(), core.ub(2, 0, null, null, 1, "a", [ [ "download", "" ], [ "title", "Download example" ] ], [ [ 8, "href", 4 ] ], null, null, null, null)), (_l()(), 
            core.Mb(-1, null, [ "download example" ])) ], null, function(_ck, _v) {
                _ck(_v, 2, 0, _v.component.zip);
            });
        }
        function View_LiveExampleComponent_4(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 4, "span", [], null, null, null, null, null)), (_l()(), 
            core.ub(1, 0, null, null, 1, "a", [ [ "target", "_blank" ] ], [ [ 8, "href", 4 ], [ 8, "title", 0 ] ], null, null, null, null)), (_l()(), 
            core.Mb(2, null, [ "", "" ])), (_l()(), core.ib(16777216, null, null, 1, null, View_LiveExampleComponent_5)), core.tb(4, 16384, null, 0, common.k, [ core.R, core.O ], {
                ngIf: [ 0, "ngIf" ]
            }, null) ], function(_ck, _v) {
                _ck(_v, 4, 0, _v.component.enableDownload);
            }, function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 1, 0, _co.stackblitz, core.zb(1, "", _co.title, "")), _ck(_v, 2, 0, _co.title);
            });
        }
        function View_LiveExampleComponent_0(_l) {
            return core.Ob(0, [ core.Kb(402653184, 1, {
                content: 0
            }), (_l()(), core.ub(1, 0, [ [ 1, 0 ], [ "content", 1 ] ], null, 1, "span", [ [ "style", "display: none" ] ], null, null, null, null, null)), core.Fb(null, 0), (_l()(), 
            core.ub(3, 0, null, null, 7, "span", [], null, null, null, null, null)), core.tb(4, 16384, null, 0, common.o, [], {
                ngSwitch: [ 0, "ngSwitch" ]
            }, null), (_l()(), core.ib(16777216, null, null, 1, null, View_LiveExampleComponent_1)), core.tb(6, 278528, null, 0, common.p, [ core.R, core.O, common.o ], {
                ngSwitchCase: [ 0, "ngSwitchCase" ]
            }, null), (_l()(), core.ib(16777216, null, null, 1, null, View_LiveExampleComponent_3)), core.tb(8, 278528, null, 0, common.p, [ core.R, core.O, common.o ], {
                ngSwitchCase: [ 0, "ngSwitchCase" ]
            }, null), (_l()(), core.ib(16777216, null, null, 1, null, View_LiveExampleComponent_4)), core.tb(10, 16384, null, 0, common.q, [ core.R, core.O, common.o ], null, null) ], function(_ck, _v) {
                _ck(_v, 4, 0, _v.component.mode), _ck(_v, 6, 0, "embedded"), _ck(_v, 8, 0, "downloadOnly");
            }, null);
        }
        function View_LiveExampleComponent_Host_0(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 1, "live-example", [], null, null, null, View_LiveExampleComponent_0, RenderType_LiveExampleComponent)), core.tb(1, 1097728, null, 0, live_example_component_LiveExampleComponent, [ core.k, common.g ], null, null) ], null, null);
        }
        var LiveExampleComponentNgFactory = core.pb("live-example", live_example_component_LiveExampleComponent, View_LiveExampleComponent_Host_0, {}, {}, [ "*" ]), RenderType_EmbeddedStackblitzComponent = core.rb({
            encapsulation: 0,
            styles: [ "iframe[_ngcontent-%COMP%] { min-height: 400px; }" ],
            data: {}
        });
        function View_EmbeddedStackblitzComponent_0(_l) {
            return core.Ob(0, [ core.Kb(402653184, 1, {
                iframe: 0
            }), (_l()(), core.ub(1, 0, [ [ 1, 0 ], [ "iframe", 1 ] ], null, 0, "iframe", [ [ "frameborder", "0" ], [ "height", "100%" ], [ "width", "100%" ] ], null, null, null, null, null)) ], null, null);
        }
        __webpack_require__.d(__webpack_exports__, "LiveExampleModuleNgFactory", function() {
            return LiveExampleModuleNgFactory;
        });
        var LiveExampleModuleNgFactory = core.qb(live_example_module_LiveExampleModule, [], function(_l) {
            return core.Db([ core.Eb(512, core.j, core.db, [ [ 8, [ LiveExampleComponentNgFactory ] ], [ 3, core.j ], core.y ]), core.Eb(4608, common.m, common.l, [ core.v, [ 2, common.B ] ]), core.Eb(1073742336, common.c, common.c, []), core.Eb(1073742336, live_example_module_LiveExampleModule, live_example_module_LiveExampleModule, []) ]);
        });
    }
} ]);
//# sourceMappingURL=live-example-live-example-module-ngfactory.f936847326be82dae17c.js.map
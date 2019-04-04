(window.webpackJsonp = window.webpackJsonp || []).push([ [ 7 ], {
    Rz96: function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var core = __webpack_require__("CcnG"), common = __webpack_require__("Ip0R"), document_service = __webpack_require__("jn67");
        function getAttrValue(attrs, attr) {
            var key = "string" == typeof attr ? attr : attr.find(function(a) {
                return attrs.hasOwnProperty(a.toLowerCase());
            });
            return void 0 === key ? void 0 : attrs[key.toLowerCase()];
        }
        function boolFromValue(attrValue, def) {
            return void 0 === def && (def = !1), void 0 === attrValue ? def : "false" !== attrValue.trim();
        }
        var _c0 = [ "content" ], _c1 = [ 2, "display", "none" ], _c2 = [ "content", "" ], _c3 = [ 3, "ngSwitch" ], _c4 = [ 4, "ngSwitchCase" ], _c5 = [ 4, "ngSwitchDefault" ], _c6 = [ 3, "title" ], _c7 = [ 3, "src" ], _c8 = [ 4, "ngIf" ], _c9 = [ "download", "", "title", "Download example", 3, "href" ];
        function LiveExampleComponent_span_4_p_3_Template(rf, ctx) {
            if (1 & rf && (core.Yb(0, "p"), core.Kc(1, " You can also "), core.Yb(2, "a", _c9), 
            core.Kc(3, "download this example"), core.Qb(), core.Kc(4, ". "), core.Qb()), 2 & rf) {
                var ctx_r114 = core.rc(2);
                core.Ec(2), core.Xb(2, "href", core.Bb(ctx_r114.zip), core.Dc);
            }
        }
        function LiveExampleComponent_span_4_Template(rf, ctx) {
            if (1 & rf && (core.Yb(0, "span"), core.Yb(1, "div", _c6), core.Lb(2, "aio-embedded-stackblitz", _c7), 
            core.Qb(), core.Ic(3, LiveExampleComponent_span_4_p_3_Template, 5, 1, "p", _c8), 
            core.Qb()), 2 & rf) {
                var ctx_r111 = core.rc();
                core.Ec(1), core.Xb(1, "title", core.hc("", ctx_r111.title, "")), core.Ec(2), core.Xb(2, "src", core.Bb(ctx_r111.stackblitz)), 
                core.Ec(3), core.Xb(3, "ngIf", core.Bb(ctx_r111.enableDownload));
            }
        }
        var _c10 = [ "download", "", 3, "href", "title" ];
        function LiveExampleComponent_span_5_Template(rf, ctx) {
            if (1 & rf && (core.Yb(0, "span"), core.Yb(1, "a", _c10), core.Kc(2), core.Qb(), 
            core.Qb()), 2 & rf) {
                var ctx_r112 = core.rc();
                core.Ec(1), core.Xb(1, "href", core.Bb(ctx_r112.zip), core.Dc), core.Xb(1, "title", core.hc("", ctx_r112.title, "")), 
                core.Ec(2), core.Lc(2, core.hc("", ctx_r112.title, ""));
            }
        }
        var _c11 = [ "target", "_blank", 3, "href", "title" ];
        function LiveExampleComponent_span_6_span_3_Template(rf, ctx) {
            if (1 & rf && (core.Yb(0, "span"), core.Kc(1, " / "), core.Yb(2, "a", _c9), core.Kc(3, "download example"), 
            core.Qb(), core.Qb()), 2 & rf) {
                var ctx_r115 = core.rc(2);
                core.Ec(2), core.Xb(2, "href", core.Bb(ctx_r115.zip), core.Dc);
            }
        }
        function LiveExampleComponent_span_6_Template(rf, ctx) {
            if (1 & rf && (core.Yb(0, "span"), core.Yb(1, "a", _c11), core.Kc(2), core.Qb(), 
            core.Ic(3, LiveExampleComponent_span_6_span_3_Template, 4, 1, "span", _c8), core.Qb()), 
            2 & rf) {
                var ctx_r113 = core.rc();
                core.Ec(1), core.Xb(1, "href", core.Bb(ctx_r113.stackblitz), core.Dc), core.Xb(1, "title", core.hc("", ctx_r113.title, "")), 
                core.Ec(2), core.Lc(2, core.hc("", ctx_r113.title, "")), core.Ec(3), core.Xb(3, "ngIf", core.Bb(ctx_r113.enableDownload));
            }
        }
        var _c12 = [], _c13 = [ "iframe" ], _c14 = [ "frameborder", "0", "width", "100%", "height", "100%" ], _c15 = [ "iframe", "" ], LIVE_EXAMPLE_BASE = document_service.a + "live-examples/", ZIP_BASE = document_service.a + "zips/", live_example_component_LiveExampleComponent = function() {
            function LiveExampleComponent(elementRef, location) {
                var attrs = function(el) {
                    for (var attrMap = {}, _i = 0, _a = elementRef instanceof core.q ? elementRef.nativeElement.attributes : elementRef.attributes; _i < _a.length; _i++) {
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
            }, LiveExampleComponent.ngComponentDef = core.Gb({
                type: LiveExampleComponent,
                selectors: [ [ "live-example" ] ],
                factory: function(t) {
                    return new (t || LiveExampleComponent)(core.Kb(core.q), core.Kb(common.g));
                },
                viewQuery: function(rf, ctx) {
                    var _t;
                    1 & rf && core.Mc(_c0, !0, null), 2 & rf && core.xc(_t = core.oc()) && (ctx.content = _t.first);
                },
                ngContentSelectors: _c12,
                consts: 7,
                vars: 3,
                template: function(rf, ctx) {
                    1 & rf && (core.vc(), core.Yb(0, "span", _c1, _c2), core.uc(2), core.Qb(), core.Yb(3, "span", _c3), 
                    core.Ic(4, LiveExampleComponent_span_4_Template, 4, 3, "span", _c4), core.Ic(5, LiveExampleComponent_span_5_Template, 3, 3, "span", _c4), 
                    core.Ic(6, LiveExampleComponent_span_6_Template, 4, 4, "span", _c5), core.Qb()), 
                    2 & rf && (core.Ec(3), core.Xb(3, "ngSwitch", core.Bb(ctx.mode)), core.Ec(4), core.Xb(4, "ngSwitchCase", core.Bb("embedded")), 
                    core.Ec(5), core.Xb(5, "ngSwitchCase", core.Bb("downloadOnly")));
                },
                directives: function() {
                    return [ common.m, common.n, common.o, live_example_component_EmbeddedStackblitzComponent, common.k ];
                },
                encapsulation: 2
            }), LiveExampleComponent;
        }(), live_example_component_EmbeddedStackblitzComponent = function() {
            function EmbeddedStackblitzComponent() {}
            return EmbeddedStackblitzComponent.prototype.ngAfterViewInit = function() {
                this.iframe && (this.iframe.nativeElement.src = this.src);
            }, EmbeddedStackblitzComponent.ngComponentDef = core.Gb({
                type: EmbeddedStackblitzComponent,
                selectors: [ [ "aio-embedded-stackblitz" ] ],
                factory: function(t) {
                    return new (t || EmbeddedStackblitzComponent)();
                },
                viewQuery: function(rf, ctx) {
                    var _t;
                    1 & rf && core.Mc(_c13, !0, null), 2 & rf && core.xc(_t = core.oc()) && (ctx.iframe = _t.first);
                },
                inputs: {
                    src: "src"
                },
                consts: 2,
                vars: 0,
                template: function(rf, ctx) {
                    1 & rf && core.Lb(0, "iframe", _c14, _c15);
                },
                styles: [ "iframe[_ngcontent-%COMP%] { min-height: 400px; }" ]
            }), EmbeddedStackblitzComponent;
        }(), live_example_module_LiveExampleModule = function() {
            function LiveExampleModule() {
                this.customElementComponent = live_example_component_LiveExampleComponent;
            }
            return LiveExampleModule.ngModuleDef = core.Ib({
                type: LiveExampleModule
            }), LiveExampleModule.ngInjectorDef = core.jb({
                factory: function(t) {
                    return new (t || LiveExampleModule)();
                },
                imports: [ [ common.c ] ]
            }), LiveExampleModule;
        }();
        __webpack_require__.d(__webpack_exports__, "LiveExampleModuleNgFactory", function() {
            return LiveExampleModuleNgFactory;
        });
        var LiveExampleModuleNgFactory = new core.ub(live_example_module_LiveExampleModule);
    }
} ]);
//# sourceMappingURL=live-example-live-example-module-ngfactory.ac55f849b2253eeba468.js.map
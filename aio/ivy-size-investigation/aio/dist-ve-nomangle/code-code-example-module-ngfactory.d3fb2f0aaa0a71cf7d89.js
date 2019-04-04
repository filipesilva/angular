(window.webpackJsonp = window.webpackJsonp || []).push([ [ 4 ], {
    zZvA: function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var core = __webpack_require__("CcnG"), CodeExampleComponent = function() {
            function CodeExampleComponent() {
                this._path = "", this.isAvoid = !1;
            }
            return Object.defineProperty(CodeExampleComponent.prototype, "header", {
                get: function() {
                    return this._header;
                },
                set: function(header) {
                    this._header = header, this.classes = {
                        "headed-code": !!this.header,
                        "simple-code": !this.header
                    };
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(CodeExampleComponent.prototype, "path", {
                get: function() {
                    return this._path;
                },
                set: function(path) {
                    this._path = path, this.isAvoid = -1 !== this.path.indexOf(".avoid.");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(CodeExampleComponent.prototype, "hidecopy", {
                get: function() {
                    return this._hidecopy;
                },
                set: function(hidecopy) {
                    this._hidecopy = null != hidecopy && "" + hidecopy != "false";
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(CodeExampleComponent.prototype, "hyphenatedHideCopy", {
                set: function(hidecopy) {
                    this.hidecopy = hidecopy;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(CodeExampleComponent.prototype, "capitalizedHideCopy", {
                set: function(hidecopy) {
                    this.hidecopy = hidecopy;
                },
                enumerable: !0,
                configurable: !0
            }), CodeExampleComponent.prototype.ngAfterViewInit = function() {
                this.aioCode.code = this.content.nativeElement.innerHTML;
            }, CodeExampleComponent;
        }(), code_example_module_CodeExampleModule = function() {
            return function() {
                this.customElementComponent = CodeExampleComponent;
            };
        }(), index_ngfactory = __webpack_require__("xYTU"), code_component_ngfactory = __webpack_require__("0GXo"), common = __webpack_require__("Ip0R"), code_component = __webpack_require__("6CTB"), snack_bar_es5 = __webpack_require__("vARd"), pretty_printer_service = __webpack_require__("vVVL"), copier_service = __webpack_require__("/ck9"), logger_service = __webpack_require__("vHPH"), RenderType_CodeExampleComponent = core.rb({
            encapsulation: 2,
            styles: [],
            data: {}
        });
        function View_CodeExampleComponent_1(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 1, "header", [], null, null, null, null, null)), (_l()(), 
            core.Mb(1, null, [ "", "" ])) ], null, function(_ck, _v) {
                _ck(_v, 1, 0, _v.component.header);
            });
        }
        function View_CodeExampleComponent_0(_l) {
            return core.Ob(0, [ core.Kb(402653184, 1, {
                content: 0
            }), core.Kb(402653184, 2, {
                aioCode: 0
            }), (_l()(), core.ub(2, 0, [ [ 1, 0 ], [ "content", 1 ] ], null, 1, "div", [ [ "style", "display: none" ] ], null, null, null, null, null)), core.Fb(null, 0), (_l()(), 
            core.ib(16777216, null, null, 1, null, View_CodeExampleComponent_1)), core.tb(5, 16384, null, 0, common.k, [ core.R, core.O ], {
                ngIf: [ 0, "ngIf" ]
            }, null), (_l()(), core.ub(6, 0, null, null, 3, "aio-code", [], null, null, null, code_component_ngfactory.c, code_component_ngfactory.b)), core.Jb(512, null, common.w, common.x, [ core.t, core.u, core.k, core.F ]), core.tb(8, 278528, null, 0, common.i, [ common.w ], {
                ngClass: [ 0, "ngClass" ]
            }, null), core.tb(9, 573440, [ [ 2, 4 ] ], 0, code_component.a, [ snack_bar_es5.b, pretty_printer_service.a, copier_service.a, logger_service.a ], {
                hideCopy: [ 0, "hideCopy" ],
                language: [ 1, "language" ],
                linenums: [ 2, "linenums" ],
                path: [ 3, "path" ],
                region: [ 4, "region" ],
                header: [ 5, "header" ]
            }, null) ], function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 5, 0, _co.header), _ck(_v, 8, 0, _co.classes), _ck(_v, 9, 0, _co.hidecopy, _co.language, _co.linenums, _co.path, _co.region, _co.header);
            }, null);
        }
        function View_CodeExampleComponent_Host_0(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 1, "code-example", [], [ [ 2, "avoidFile", null ] ], null, null, View_CodeExampleComponent_0, RenderType_CodeExampleComponent)), core.tb(1, 4243456, null, 0, CodeExampleComponent, [], null, null) ], null, function(_ck, _v) {
                _ck(_v, 0, 0, core.Gb(_v, 1).isAvoid);
            });
        }
        var CodeExampleComponentNgFactory = core.pb("code-example", CodeExampleComponent, View_CodeExampleComponent_Host_0, {
            language: "language",
            linenums: "linenums",
            region: "region",
            header: "header",
            path: "path",
            hidecopy: "hidecopy",
            hyphenatedHideCopy: "hide-copy",
            capitalizedHideCopy: "hideCopy"
        }, {}, [ "*" ]), overlay_es5 = __webpack_require__("eDkP"), bidi_es5 = __webpack_require__("Fzqc"), portal_es5 = __webpack_require__("4c35"), platform_es5 = __webpack_require__("dWZg"), scrolling_es5 = __webpack_require__("qAlS"), core_es5 = __webpack_require__("Wf4p"), platform_browser = __webpack_require__("ZYjt"), button_es5 = __webpack_require__("UodH"), code_module = __webpack_require__("V90o");
        __webpack_require__.d(__webpack_exports__, "CodeExampleModuleNgFactory", function() {
            return CodeExampleModuleNgFactory;
        });
        var CodeExampleModuleNgFactory = core.qb(code_example_module_CodeExampleModule, [], function(_l) {
            return core.Db([ core.Eb(512, core.j, core.db, [ [ 8, [ index_ngfactory.a, index_ngfactory.b, code_component_ngfactory.a, CodeExampleComponentNgFactory ] ], [ 3, core.j ], core.y ]), core.Eb(4608, common.m, common.l, [ core.v, [ 2, common.B ] ]), core.Eb(4608, overlay_es5.a, overlay_es5.a, [ overlay_es5.g, overlay_es5.c, core.j, overlay_es5.f, overlay_es5.d, core.r, core.A, common.d, bidi_es5.b, [ 2, common.g ] ]), core.Eb(5120, overlay_es5.h, overlay_es5.i, [ overlay_es5.a ]), core.Eb(4608, pretty_printer_service.a, pretty_printer_service.a, [ logger_service.a ]), core.Eb(4608, copier_service.a, copier_service.a, []), core.Eb(1073742336, common.c, common.c, []), core.Eb(1073742336, bidi_es5.a, bidi_es5.a, []), core.Eb(1073742336, portal_es5.g, portal_es5.g, []), core.Eb(1073742336, platform_es5.b, platform_es5.b, []), core.Eb(1073742336, scrolling_es5.c, scrolling_es5.c, []), core.Eb(1073742336, overlay_es5.e, overlay_es5.e, []), core.Eb(1073742336, core_es5.c, core_es5.c, [ [ 2, core_es5.a ], [ 2, platform_browser.f ] ]), core.Eb(1073742336, core_es5.e, core_es5.e, []), core.Eb(1073742336, button_es5.c, button_es5.c, []), core.Eb(1073742336, snack_bar_es5.e, snack_bar_es5.e, []), core.Eb(1073742336, code_module.a, code_module.a, []), core.Eb(1073742336, code_example_module_CodeExampleModule, code_example_module_CodeExampleModule, []) ]);
        });
    }
} ]);
//# sourceMappingURL=code-code-example-module-ngfactory.d3fb2f0aaa0a71cf7d89.js.map
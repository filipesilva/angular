(window.webpackJsonp = window.webpackJsonp || []).push([ [ 4 ], {
    zZvA: function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var core = __webpack_require__("CcnG"), common = __webpack_require__("Ip0R"), code_component = __webpack_require__("6CTB"), _c0 = [ "content" ], _c1 = [ "avoidFile" ], _c2 = [ 2, "display", "none" ], _c3 = [ "content", "" ], _c4 = [ 4, "ngIf" ], _c5 = [ 3, "ngClass", "language", "linenums", "path", "region", "hideCopy", "header" ];
        function CodeExampleComponent_header_3_Template(rf, ctx) {
            if (1 & rf && (core.Yb(0, "header"), core.Kc(1), core.Qb()), 2 & rf) {
                var ctx_r87 = core.rc();
                core.Ec(1), core.Lc(1, core.hc("", ctx_r87.header, ""));
            }
        }
        var _c6 = [], code_example_component_CodeExampleComponent = function() {
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
            }, CodeExampleComponent.ngComponentDef = core.Gb({
                type: CodeExampleComponent,
                selectors: [ [ "code-example" ] ],
                factory: function(t) {
                    return new (t || CodeExampleComponent)();
                },
                viewQuery: function(rf, ctx) {
                    var _t;
                    1 & rf && (core.Mc(_c0, !0, null), core.Mc(code_component.a, !0, null)), 2 & rf && (core.xc(_t = core.oc()) && (ctx.content = _t.first), 
                    core.xc(_t = core.oc()) && (ctx.aioCode = _t.first));
                },
                hostBindings: function(rf, ctx, elIndex) {
                    1 & rf && core.Ub(_c1), 2 & rf && (core.Sb(0, ctx.isAvoid), core.Vb());
                },
                inputs: {
                    language: "language",
                    linenums: "linenums",
                    region: "region",
                    header: "header",
                    path: "path",
                    hidecopy: "hidecopy",
                    hyphenatedHideCopy: [ "hide-copy", "hyphenatedHideCopy" ],
                    capitalizedHideCopy: [ "hideCopy", "capitalizedHideCopy" ]
                },
                ngContentSelectors: _c6,
                consts: 5,
                vars: 8,
                template: function(rf, ctx) {
                    1 & rf && (core.vc(), core.Yb(0, "div", _c2, _c3), core.uc(2), core.Qb(), core.Ic(3, CodeExampleComponent_header_3_Template, 2, 1, "header", _c4), 
                    core.Lb(4, "aio-code", _c5)), 2 & rf && (core.Ec(3), core.Xb(3, "ngIf", core.Bb(ctx.header)), 
                    core.Ec(4), core.Xb(4, "ngClass", core.Bb(ctx.classes)), core.Xb(4, "language", core.Bb(ctx.language)), 
                    core.Xb(4, "linenums", core.Bb(ctx.linenums)), core.Xb(4, "path", core.Bb(ctx.path)), 
                    core.Xb(4, "region", core.Bb(ctx.region)), core.Xb(4, "hideCopy", core.Bb(ctx.hidecopy)), 
                    core.Xb(4, "header", core.Bb(ctx.header)));
                },
                directives: [ common.k, code_component.a, common.i ],
                encapsulation: 2
            }), CodeExampleComponent;
        }(), code_module = __webpack_require__("V90o"), code_example_module_CodeExampleModule = function() {
            function CodeExampleModule() {
                this.customElementComponent = code_example_component_CodeExampleComponent;
            }
            return CodeExampleModule.ngModuleDef = core.Ib({
                type: CodeExampleModule
            }), CodeExampleModule.ngInjectorDef = core.jb({
                factory: function(t) {
                    return new (t || CodeExampleModule)();
                },
                imports: [ [ common.c, code_module.a ] ]
            }), CodeExampleModule;
        }();
        __webpack_require__.d(__webpack_exports__, "CodeExampleModuleNgFactory", function() {
            return CodeExampleModuleNgFactory;
        });
        var CodeExampleModuleNgFactory = new core.ub(code_example_module_CodeExampleModule);
    }
} ]);
//# sourceMappingURL=code-code-example-module-ngfactory.aba715b9adfefa3eeb0c.js.map
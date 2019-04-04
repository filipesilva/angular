(window.webpackJsonp = window.webpackJsonp || []).push([ [ 1 ], {
    "/ck9": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return CopierService;
        });
        var CopierService = function() {
            function CopierService() {}
            return CopierService.prototype.createFake = function(text) {
                var docElem = document.documentElement, isRTL = "rtl" === docElem.getAttribute("dir");
                this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", 
                this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", 
                this.fakeElem.style.position = "absolute", this.fakeElem.style[isRTL ? "right" : "left"] = "-9999px";
                var yPosition = window.pageYOffset || docElem.scrollTop;
                this.fakeElem.style.top = yPosition + "px", this.fakeElem.setAttribute("readonly", ""), 
                this.fakeElem.value = text, document.body.appendChild(this.fakeElem), this.fakeElem.select(), 
                this.fakeElem.setSelectionRange(0, this.fakeElem.value.length);
            }, CopierService.prototype.removeFake = function() {
                this.fakeElem && (document.body.removeChild(this.fakeElem), this.fakeElem = null);
            }, CopierService.prototype.copyText = function(text) {
                try {
                    return this.createFake(text), document.execCommand("copy");
                } catch (err) {
                    return !1;
                } finally {
                    this.removeFake();
                }
            }, CopierService;
        }();
    },
    "0GXo": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return RenderType_CodeComponent;
        }), __webpack_require__.d(__webpack_exports__, "c", function() {
            return View_CodeComponent_0;
        }), __webpack_require__.d(__webpack_exports__, "a", function() {
            return CodeComponentNgFactory;
        });
        var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("CcnG"), _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("Ip0R"), _code_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("6CTB"), _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("vARd"), _pretty_printer_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("vVVL"), _shared_copier_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("/ck9"), _shared_logger_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("vHPH"), RenderType_CodeComponent = _angular_core__WEBPACK_IMPORTED_MODULE_0__.rb({
            encapsulation: 2,
            styles: [],
            data: {}
        });
        function View_CodeComponent_1(_l) {
            return _angular_core__WEBPACK_IMPORTED_MODULE_0__.Ob(0, [ (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__.ub(0, 0, null, null, 4, "button", [ [ "class", "material-icons copy-button no-print" ], [ "title", "Copy code snippet" ] ], [ [ 1, "aria-label", 0 ] ], [ [ null, "click" ] ], function(_v, en, $event) {
                var ad = !0;
                return "click" === en && (ad = !1 !== _v.component.doCopy() && ad), ad;
            }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__.Mb(-1, null, [ "\n        " ])), (_l()(), 
            _angular_core__WEBPACK_IMPORTED_MODULE_0__.ub(2, 0, null, null, 1, "span", [ [ "aria-hidden", "true" ] ], null, null, null, null, null)), (_l()(), 
            _angular_core__WEBPACK_IMPORTED_MODULE_0__.Mb(-1, null, [ "content_copy" ])), (_l()(), 
            _angular_core__WEBPACK_IMPORTED_MODULE_0__.Mb(-1, null, [ "\n      " ])) ], null, function(_ck, _v) {
                _ck(_v, 0, 0, _v.component.ariaLabel);
            });
        }
        function View_CodeComponent_0(_l) {
            return _angular_core__WEBPACK_IMPORTED_MODULE_0__.Ob(0, [ _angular_core__WEBPACK_IMPORTED_MODULE_0__.Kb(402653184, 1, {
                codeContainer: 0
            }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__.ub(1, 0, null, null, 6, "pre", [], [ [ 8, "className", 0 ] ], null, null, null, null)), (_l()(), 
            _angular_core__WEBPACK_IMPORTED_MODULE_0__.Mb(-1, null, [ "      " ])), (_l()(), 
            _angular_core__WEBPACK_IMPORTED_MODULE_0__.ib(16777216, null, null, 1, null, View_CodeComponent_1)), _angular_core__WEBPACK_IMPORTED_MODULE_0__.tb(4, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_1__.k, [ _angular_core__WEBPACK_IMPORTED_MODULE_0__.R, _angular_core__WEBPACK_IMPORTED_MODULE_0__.O ], {
                ngIf: [ 0, "ngIf" ]
            }, null), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__.Mb(-1, null, [ "\n      " ])), (_l()(), 
            _angular_core__WEBPACK_IMPORTED_MODULE_0__.ub(6, 0, [ [ 1, 0 ], [ "codeContainer", 1 ] ], null, 0, "code", [ [ "class", "animated fadeIn" ] ], null, null, null, null, null)), (_l()(), 
            _angular_core__WEBPACK_IMPORTED_MODULE_0__.Mb(-1, null, [ "\n    " ])) ], function(_ck, _v) {
                _ck(_v, 4, 0, !_v.component.hideCopy);
            }, function(_ck, _v) {
                _ck(_v, 1, 0, _angular_core__WEBPACK_IMPORTED_MODULE_0__.zb(1, "prettyprint lang-", _v.component.language, ""));
            });
        }
        function View_CodeComponent_Host_0(_l) {
            return _angular_core__WEBPACK_IMPORTED_MODULE_0__.Ob(0, [ (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__.ub(0, 0, null, null, 1, "aio-code", [], null, null, null, View_CodeComponent_0, RenderType_CodeComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_0__.tb(1, 573440, null, 0, _code_component__WEBPACK_IMPORTED_MODULE_2__.a, [ _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__.b, _pretty_printer_service__WEBPACK_IMPORTED_MODULE_4__.a, _shared_copier_service__WEBPACK_IMPORTED_MODULE_5__.a, _shared_logger_service__WEBPACK_IMPORTED_MODULE_6__.a ], null, null) ], null, null);
        }
        var CodeComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__.pb("aio-code", _code_component__WEBPACK_IMPORTED_MODULE_2__.a, View_CodeComponent_Host_0, {
            hideCopy: "hideCopy",
            language: "language",
            linenums: "linenums",
            path: "path",
            region: "region",
            header: "header"
        }, {
            codeFormatted: "codeFormatted"
        }, []);
    },
    "4c35": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return ComponentPortal;
        }), __webpack_require__.d(__webpack_exports__, "h", function() {
            return TemplatePortal;
        }), __webpack_require__.d(__webpack_exports__, "a", function() {
            return BasePortalOutlet;
        }), __webpack_require__.d(__webpack_exports__, "e", function() {
            return DomPortalOutlet;
        }), __webpack_require__.d(__webpack_exports__, "b", function() {
            return CdkPortal;
        }), __webpack_require__.d(__webpack_exports__, "c", function() {
            return CdkPortalOutlet;
        }), __webpack_require__.d(__webpack_exports__, "g", function() {
            return PortalModule;
        }), __webpack_require__.d(__webpack_exports__, "f", function() {
            return PortalInjector;
        });
        var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("mrSG"), _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("CcnG");
        function throwPortalAlreadyAttachedError() {
            throw Error("Host already has a portal attached");
        }
        var Portal = function() {
            function Portal() {}
            return Portal.prototype.attach = function(host) {
                return null == host && function() {
                    throw Error("Attempting to attach a portal to a null PortalOutlet");
                }(), host.hasAttached() && throwPortalAlreadyAttachedError(), this._attachedHost = host, 
                host.attach(this);
            }, Portal.prototype.detach = function() {
                var host = this._attachedHost;
                null == host ? function() {
                    throw Error("Attempting to detach a portal that is not attached to a host");
                }() : (this._attachedHost = null, host.detach());
            }, Object.defineProperty(Portal.prototype, "isAttached", {
                get: function() {
                    return null != this._attachedHost;
                },
                enumerable: !0,
                configurable: !0
            }), Portal.prototype.setAttachedHost = function(host) {
                this._attachedHost = host;
            }, Portal;
        }(), ComponentPortal = function(_super) {
            function ComponentPortal(component, viewContainerRef, injector, componentFactoryResolver) {
                var _this = _super.call(this) || this;
                return _this.component = component, _this.viewContainerRef = viewContainerRef, _this.injector = injector, 
                _this.componentFactoryResolver = componentFactoryResolver, _this;
            }
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__.c)(ComponentPortal, _super), ComponentPortal;
        }(Portal), TemplatePortal = function(_super) {
            function TemplatePortal(template, viewContainerRef, context) {
                var _this = _super.call(this) || this;
                return _this.templateRef = template, _this.viewContainerRef = viewContainerRef, 
                _this.context = context, _this;
            }
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__.c)(TemplatePortal, _super), Object.defineProperty(TemplatePortal.prototype, "origin", {
                get: function() {
                    return this.templateRef.elementRef;
                },
                enumerable: !0,
                configurable: !0
            }), TemplatePortal.prototype.attach = function(host, context) {
                return void 0 === context && (context = this.context), this.context = context, _super.prototype.attach.call(this, host);
            }, TemplatePortal.prototype.detach = function() {
                return this.context = void 0, _super.prototype.detach.call(this);
            }, TemplatePortal;
        }(Portal), BasePortalOutlet = function() {
            function BasePortalOutlet() {
                this._isDisposed = !1;
            }
            return BasePortalOutlet.prototype.hasAttached = function() {
                return !!this._attachedPortal;
            }, BasePortalOutlet.prototype.attach = function(portal) {
                return portal || function() {
                    throw Error("Must provide a portal to attach");
                }(), this.hasAttached() && throwPortalAlreadyAttachedError(), this._isDisposed && function() {
                    throw Error("This PortalOutlet has already been disposed");
                }(), portal instanceof ComponentPortal ? (this._attachedPortal = portal, this.attachComponentPortal(portal)) : portal instanceof TemplatePortal ? (this._attachedPortal = portal, 
                this.attachTemplatePortal(portal)) : void function() {
                    throw Error("Attempting to attach an unknown Portal type. BasePortalOutlet accepts either a ComponentPortal or a TemplatePortal.");
                }();
            }, BasePortalOutlet.prototype.detach = function() {
                this._attachedPortal && (this._attachedPortal.setAttachedHost(null), this._attachedPortal = null), 
                this._invokeDisposeFn();
            }, BasePortalOutlet.prototype.dispose = function() {
                this.hasAttached() && this.detach(), this._invokeDisposeFn(), this._isDisposed = !0;
            }, BasePortalOutlet.prototype.setDisposeFn = function(fn) {
                this._disposeFn = fn;
            }, BasePortalOutlet.prototype._invokeDisposeFn = function() {
                this._disposeFn && (this._disposeFn(), this._disposeFn = null);
            }, BasePortalOutlet;
        }(), DomPortalOutlet = function(_super) {
            function DomPortalOutlet(outletElement, _componentFactoryResolver, _appRef, _defaultInjector) {
                var _this = _super.call(this) || this;
                return _this.outletElement = outletElement, _this._componentFactoryResolver = _componentFactoryResolver, 
                _this._appRef = _appRef, _this._defaultInjector = _defaultInjector, _this;
            }
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__.c)(DomPortalOutlet, _super), DomPortalOutlet.prototype.attachComponentPortal = function(portal) {
                var componentRef, _this = this, componentFactory = (portal.componentFactoryResolver || this._componentFactoryResolver).resolveComponentFactory(portal.component);
                return portal.viewContainerRef ? (componentRef = portal.viewContainerRef.createComponent(componentFactory, portal.viewContainerRef.length, portal.injector || portal.viewContainerRef.injector), 
                this.setDisposeFn(function() {
                    return componentRef.destroy();
                })) : (componentRef = componentFactory.create(portal.injector || this._defaultInjector), 
                this._appRef.attachView(componentRef.hostView), this.setDisposeFn(function() {
                    _this._appRef.detachView(componentRef.hostView), componentRef.destroy();
                })), this.outletElement.appendChild(this._getComponentRootNode(componentRef)), componentRef;
            }, DomPortalOutlet.prototype.attachTemplatePortal = function(portal) {
                var _this = this, viewContainer = portal.viewContainerRef, viewRef = viewContainer.createEmbeddedView(portal.templateRef, portal.context);
                return viewRef.detectChanges(), viewRef.rootNodes.forEach(function(rootNode) {
                    return _this.outletElement.appendChild(rootNode);
                }), this.setDisposeFn(function() {
                    var index = viewContainer.indexOf(viewRef);
                    -1 !== index && viewContainer.remove(index);
                }), viewRef;
            }, DomPortalOutlet.prototype.dispose = function() {
                _super.prototype.dispose.call(this), null != this.outletElement.parentNode && this.outletElement.parentNode.removeChild(this.outletElement);
            }, DomPortalOutlet.prototype._getComponentRootNode = function(componentRef) {
                return componentRef.hostView.rootNodes[0];
            }, DomPortalOutlet;
        }(BasePortalOutlet), CdkPortal = function(_super) {
            function CdkPortal(templateRef, viewContainerRef) {
                return _super.call(this, templateRef, viewContainerRef) || this;
            }
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__.c)(CdkPortal, _super), CdkPortal;
        }(TemplatePortal), CdkPortalOutlet = function(_super) {
            function CdkPortalOutlet(_componentFactoryResolver, _viewContainerRef) {
                var _this = _super.call(this) || this;
                return _this._componentFactoryResolver = _componentFactoryResolver, _this._viewContainerRef = _viewContainerRef, 
                _this._isInitialized = !1, _this.attached = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.m(), 
                _this;
            }
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__.c)(CdkPortalOutlet, _super), Object.defineProperty(CdkPortalOutlet.prototype, "portal", {
                get: function() {
                    return this._attachedPortal;
                },
                set: function(portal) {
                    (!this.hasAttached() || portal || this._isInitialized) && (this.hasAttached() && _super.prototype.detach.call(this), 
                    portal && _super.prototype.attach.call(this, portal), this._attachedPortal = portal);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(CdkPortalOutlet.prototype, "attachedRef", {
                get: function() {
                    return this._attachedRef;
                },
                enumerable: !0,
                configurable: !0
            }), CdkPortalOutlet.prototype.ngOnInit = function() {
                this._isInitialized = !0;
            }, CdkPortalOutlet.prototype.ngOnDestroy = function() {
                _super.prototype.dispose.call(this), this._attachedPortal = null, this._attachedRef = null;
            }, CdkPortalOutlet.prototype.attachComponentPortal = function(portal) {
                portal.setAttachedHost(this);
                var viewContainerRef = null != portal.viewContainerRef ? portal.viewContainerRef : this._viewContainerRef, componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component), ref = viewContainerRef.createComponent(componentFactory, viewContainerRef.length, portal.injector || viewContainerRef.injector);
                return _super.prototype.setDisposeFn.call(this, function() {
                    return ref.destroy();
                }), this._attachedPortal = portal, this._attachedRef = ref, this.attached.emit(ref), 
                ref;
            }, CdkPortalOutlet.prototype.attachTemplatePortal = function(portal) {
                var _this = this;
                portal.setAttachedHost(this);
                var viewRef = this._viewContainerRef.createEmbeddedView(portal.templateRef, portal.context);
                return _super.prototype.setDisposeFn.call(this, function() {
                    return _this._viewContainerRef.clear();
                }), this._attachedPortal = portal, this._attachedRef = viewRef, this.attached.emit(viewRef), 
                viewRef;
            }, CdkPortalOutlet;
        }(BasePortalOutlet), PortalModule = function() {
            return function() {};
        }(), PortalInjector = function() {
            function PortalInjector(_parentInjector, _customTokens) {
                this._parentInjector = _parentInjector, this._customTokens = _customTokens;
            }
            return PortalInjector.prototype.get = function(token, notFoundValue) {
                var value = this._customTokens.get(token);
                return void 0 !== value ? value : this._parentInjector.get(token, notFoundValue);
            }, PortalInjector;
        }();
    },
    "6CTB": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return CodeComponent;
        });
        var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("CcnG"), rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("xMyE"), CodeComponent = function() {
            function CodeComponent(snackbar, pretty, copier, logger) {
                this.snackbar = snackbar, this.pretty = pretty, this.copier = copier, this.logger = logger, 
                this.ariaLabel = "", this.codeFormatted = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.m();
            }
            return Object.defineProperty(CodeComponent.prototype, "code", {
                get: function() {
                    return this._code;
                },
                set: function(code) {
                    this._code = code, this._code && this._code.trim() ? this.formatDisplayedCode() : this.showMissingCodeMessage();
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(CodeComponent.prototype, "header", {
                get: function() {
                    return this._header;
                },
                set: function(header) {
                    this._header = header, this.ariaLabel = this.header ? "Copy code snippet from " + this.header : "";
                },
                enumerable: !0,
                configurable: !0
            }), CodeComponent.prototype.ngOnChanges = function() {
                this.code && this.formatDisplayedCode();
            }, CodeComponent.prototype.formatDisplayedCode = function() {
                var indent, lines, _this = this, leftAlignedCode = (indent = Number.MAX_VALUE, (lines = this.code.split("\n")).forEach(function(line) {
                    var lineIndent = line.search(/\S/);
                    -1 !== lineIndent && (indent = Math.min(lineIndent, indent));
                }), lines.map(function(line) {
                    return line.substr(indent);
                }).join("\n").trim());
                this.setCodeHtml(leftAlignedCode), this.codeText = this.getCodeText(), this.pretty.formatCode(leftAlignedCode, this.language, this.getLinenums(leftAlignedCode)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.a)(function() {
                    return _this.codeFormatted.emit();
                })).subscribe(function(c) {
                    return _this.setCodeHtml(c);
                }, function(err) {});
            }, CodeComponent.prototype.showMissingCodeMessage = function() {
                var src = this.path ? this.path + (this.region ? "#" + this.region : "") : "";
                this.setCodeHtml('<p class="code-missing">The code sample is missing' + (src ? " for\n" + src : ".") + "</p>");
            }, CodeComponent.prototype.setCodeHtml = function(formattedCode) {
                this.codeContainer.nativeElement.innerHTML = formattedCode;
            }, CodeComponent.prototype.getCodeText = function() {
                return this.codeContainer.nativeElement.textContent;
            }, CodeComponent.prototype.doCopy = function() {
                var code = this.codeText;
                this.copier.copyText(code) ? (this.logger.log("Copied code to clipboard:", code), 
                this.snackbar.open("Code Copied", "", {
                    duration: 800
                })) : (this.logger.error(new Error('ERROR copying code to clipboard: "' + code + '"')), 
                this.snackbar.open("Copy failed. Please try again!", "", {
                    duration: 800
                }));
            }, CodeComponent.prototype.getLinenums = function(code) {
                var linenums = "boolean" == typeof this.linenums ? this.linenums : "true" === this.linenums || "false" !== this.linenums && ("string" == typeof this.linenums ? parseInt(this.linenums, 10) : this.linenums);
                return null == linenums || isNaN(linenums) ? (code.match(/\n/g) || []).length > 10 : linenums;
            }, CodeComponent;
        }();
    },
    KQya: function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var tslib_es6 = __webpack_require__("mrSG"), nextHandle = 1, tasksByHandle = {}, AsapAction_AsapAction = function(_super) {
            function AsapAction(scheduler, work) {
                var _this = _super.call(this, scheduler, work) || this;
                return _this.scheduler = scheduler, _this.work = work, _this;
            }
            return tslib_es6.c(AsapAction, _super), AsapAction.prototype.requestAsyncId = function(scheduler, id, delay) {
                return void 0 === delay && (delay = 0), null !== delay && delay > 0 ? _super.prototype.requestAsyncId.call(this, scheduler, id, delay) : (scheduler.actions.push(this), 
                scheduler.scheduled || (scheduler.scheduled = (cb = scheduler.flush.bind(scheduler, null), 
                handle = nextHandle++, tasksByHandle[handle] = cb, Promise.resolve().then(function() {
                    return function(handle) {
                        var cb = tasksByHandle[handle];
                        cb && cb();
                    }(handle);
                }), handle)));
                var cb, handle;
            }, AsapAction.prototype.recycleAsyncId = function(scheduler, id, delay) {
                if (void 0 === delay && (delay = 0), null !== delay && delay > 0 || null === delay && this.delay > 0) return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
                0 === scheduler.actions.length && (delete tasksByHandle[id], scheduler.scheduled = void 0);
            }, AsapAction;
        }(__webpack_require__("h9Dq").a), AsapScheduler_AsapScheduler = function(_super) {
            function AsapScheduler() {
                return null !== _super && _super.apply(this, arguments) || this;
            }
            return tslib_es6.c(AsapScheduler, _super), AsapScheduler.prototype.flush = function(action) {
                this.active = !0, this.scheduled = void 0;
                var error, actions = this.actions, index = -1, count = actions.length;
                action = action || actions.shift();
                do {
                    if (error = action.execute(action.state, action.delay)) break;
                } while (++index < count && (action = actions.shift()));
                if (this.active = !1, error) {
                    for (;++index < count && (action = actions.shift()); ) action.unsubscribe();
                    throw error;
                }
            }, AsapScheduler;
        }(__webpack_require__("CS9Q").a);
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return asap;
        });
        var asap = new AsapScheduler_AsapScheduler(AsapAction_AsapAction);
    },
    V90o: function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return CodeModule;
        });
        var CodeModule = function() {
            return function() {};
        }();
    },
    eDkP: function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return Overlay;
        }), __webpack_require__.d(__webpack_exports__, "c", function() {
            return OverlayContainer;
        }), __webpack_require__.d(__webpack_exports__, "d", function() {
            return OverlayKeyboardDispatcher;
        }), __webpack_require__.d(__webpack_exports__, "f", function() {
            return OverlayPositionBuilder;
        }), __webpack_require__.d(__webpack_exports__, "b", function() {
            return OverlayConfig;
        }), __webpack_require__.d(__webpack_exports__, "g", function() {
            return ScrollStrategyOptions;
        }), __webpack_require__.d(__webpack_exports__, "e", function() {
            return OverlayModule;
        }), __webpack_require__.d(__webpack_exports__, "h", function() {
            return CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY;
        }), __webpack_require__.d(__webpack_exports__, "i", function() {
            return CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY;
        });
        var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("n6gG"), _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("qAlS"), _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("Ip0R"), _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("CcnG"), tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("mrSG"), rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("K9Ia"), rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("pugT"), rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("6blF"), rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("p0ib"), rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("t9fZ"), rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("ny24"), _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("dWZg"), _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("4c35"), BlockScrollStrategy = (__webpack_require__("YSh2"), 
        function() {
            function BlockScrollStrategy(_viewportRuler, document) {
                this._viewportRuler = _viewportRuler, this._previousHTMLStyles = {
                    top: "",
                    left: ""
                }, this._isEnabled = !1, this._document = document;
            }
            return BlockScrollStrategy.prototype.attach = function() {}, BlockScrollStrategy.prototype.enable = function() {
                if (this._canBeEnabled()) {
                    var root = this._document.documentElement;
                    this._previousScrollPosition = this._viewportRuler.getViewportScrollPosition(), 
                    this._previousHTMLStyles.left = root.style.left || "", this._previousHTMLStyles.top = root.style.top || "", 
                    root.style.left = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__.c)(-this._previousScrollPosition.left), 
                    root.style.top = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__.c)(-this._previousScrollPosition.top), 
                    root.classList.add("cdk-global-scrollblock"), this._isEnabled = !0;
                }
            }, BlockScrollStrategy.prototype.disable = function() {
                if (this._isEnabled) {
                    var html = this._document.documentElement, htmlStyle = html.style, bodyStyle = this._document.body.style, previousHtmlScrollBehavior = htmlStyle.scrollBehavior || "", previousBodyScrollBehavior = bodyStyle.scrollBehavior || "";
                    this._isEnabled = !1, htmlStyle.left = this._previousHTMLStyles.left, htmlStyle.top = this._previousHTMLStyles.top, 
                    html.classList.remove("cdk-global-scrollblock"), htmlStyle.scrollBehavior = bodyStyle.scrollBehavior = "auto", 
                    window.scroll(this._previousScrollPosition.left, this._previousScrollPosition.top), 
                    htmlStyle.scrollBehavior = previousHtmlScrollBehavior, bodyStyle.scrollBehavior = previousBodyScrollBehavior;
                }
            }, BlockScrollStrategy.prototype._canBeEnabled = function() {
                if (this._document.documentElement.classList.contains("cdk-global-scrollblock") || this._isEnabled) return !1;
                var body = this._document.body, viewport = this._viewportRuler.getViewportSize();
                return body.scrollHeight > viewport.height || body.scrollWidth > viewport.width;
            }, BlockScrollStrategy;
        }());
        function getMatScrollStrategyAlreadyAttachedError() {
            return Error("Scroll strategy has already been attached.");
        }
        var CloseScrollStrategy = function() {
            function CloseScrollStrategy(_scrollDispatcher, _ngZone, _viewportRuler, _config) {
                var _this = this;
                this._scrollDispatcher = _scrollDispatcher, this._ngZone = _ngZone, this._viewportRuler = _viewportRuler, 
                this._config = _config, this._scrollSubscription = null, this._detach = function() {
                    _this.disable(), _this._overlayRef.hasAttached() && _this._ngZone.run(function() {
                        return _this._overlayRef.detach();
                    });
                };
            }
            return CloseScrollStrategy.prototype.attach = function(overlayRef) {
                if (this._overlayRef) throw getMatScrollStrategyAlreadyAttachedError();
                this._overlayRef = overlayRef;
            }, CloseScrollStrategy.prototype.enable = function() {
                var _this = this;
                if (!this._scrollSubscription) {
                    var stream = this._scrollDispatcher.scrolled(0);
                    this._config && this._config.threshold && this._config.threshold > 1 ? (this._initialScrollPosition = this._viewportRuler.getViewportScrollPosition().top, 
                    this._scrollSubscription = stream.subscribe(function() {
                        var scrollPosition = _this._viewportRuler.getViewportScrollPosition().top;
                        Math.abs(scrollPosition - _this._initialScrollPosition) > _this._config.threshold ? _this._detach() : _this._overlayRef.updatePosition();
                    })) : this._scrollSubscription = stream.subscribe(this._detach);
                }
            }, CloseScrollStrategy.prototype.disable = function() {
                this._scrollSubscription && (this._scrollSubscription.unsubscribe(), this._scrollSubscription = null);
            }, CloseScrollStrategy;
        }(), NoopScrollStrategy = function() {
            function NoopScrollStrategy() {}
            return NoopScrollStrategy.prototype.enable = function() {}, NoopScrollStrategy.prototype.disable = function() {}, 
            NoopScrollStrategy.prototype.attach = function() {}, NoopScrollStrategy;
        }();
        function isElementScrolledOutsideView(element, scrollContainers) {
            return scrollContainers.some(function(containerBounds) {
                return element.bottom < containerBounds.top || element.top > containerBounds.bottom || element.right < containerBounds.left || element.left > containerBounds.right;
            });
        }
        function isElementClippedByScrolling(element, scrollContainers) {
            return scrollContainers.some(function(scrollContainerRect) {
                return element.top < scrollContainerRect.top || element.bottom > scrollContainerRect.bottom || element.left < scrollContainerRect.left || element.right > scrollContainerRect.right;
            });
        }
        var RepositionScrollStrategy = function() {
            function RepositionScrollStrategy(_scrollDispatcher, _viewportRuler, _ngZone, _config) {
                this._scrollDispatcher = _scrollDispatcher, this._viewportRuler = _viewportRuler, 
                this._ngZone = _ngZone, this._config = _config, this._scrollSubscription = null;
            }
            return RepositionScrollStrategy.prototype.attach = function(overlayRef) {
                if (this._overlayRef) throw getMatScrollStrategyAlreadyAttachedError();
                this._overlayRef = overlayRef;
            }, RepositionScrollStrategy.prototype.enable = function() {
                var _this = this;
                this._scrollSubscription || (this._scrollSubscription = this._scrollDispatcher.scrolled(this._config ? this._config.scrollThrottle : 0).subscribe(function() {
                    if (_this._overlayRef.updatePosition(), _this._config && _this._config.autoClose) {
                        var overlayRect = _this._overlayRef.overlayElement.getBoundingClientRect(), _a = _this._viewportRuler.getViewportSize(), width = _a.width, height = _a.height;
                        isElementScrolledOutsideView(overlayRect, [ {
                            width: width,
                            height: height,
                            bottom: height,
                            right: width,
                            top: 0,
                            left: 0
                        } ]) && (_this.disable(), _this._ngZone.run(function() {
                            return _this._overlayRef.detach();
                        }));
                    }
                }));
            }, RepositionScrollStrategy.prototype.disable = function() {
                this._scrollSubscription && (this._scrollSubscription.unsubscribe(), this._scrollSubscription = null);
            }, RepositionScrollStrategy;
        }(), ScrollStrategyOptions = function() {
            function ScrollStrategyOptions(_scrollDispatcher, _viewportRuler, _ngZone, document) {
                var _this = this;
                this._scrollDispatcher = _scrollDispatcher, this._viewportRuler = _viewportRuler, 
                this._ngZone = _ngZone, this.noop = function() {
                    return new NoopScrollStrategy();
                }, this.close = function(config) {
                    return new CloseScrollStrategy(_this._scrollDispatcher, _this._ngZone, _this._viewportRuler, config);
                }, this.block = function() {
                    return new BlockScrollStrategy(_this._viewportRuler, _this._document);
                }, this.reposition = function(config) {
                    return new RepositionScrollStrategy(_this._scrollDispatcher, _this._viewportRuler, _this._ngZone, config);
                }, this._document = document;
            }
            return ScrollStrategyOptions.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__.V)({
                factory: function() {
                    return new ScrollStrategyOptions(Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__.Y)(_angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_1__.b), Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__.Y)(_angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_1__.e), Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__.Y)(_angular_core__WEBPACK_IMPORTED_MODULE_3__.A), Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__.Y)(_angular_common__WEBPACK_IMPORTED_MODULE_2__.d));
                },
                token: ScrollStrategyOptions,
                providedIn: "root"
            }), ScrollStrategyOptions;
        }(), OverlayConfig = function() {
            return function(config) {
                var _this = this;
                this.scrollStrategy = new NoopScrollStrategy(), this.panelClass = "", this.hasBackdrop = !1, 
                this.backdropClass = "cdk-overlay-dark-backdrop", this.disposeOnNavigation = !1, 
                config && Object.keys(config).forEach(function(k) {
                    void 0 !== config[k] && (_this[k] = config[k]);
                });
            };
        }(), ConnectionPositionPair = function() {
            return function(origin, overlay, offsetX, offsetY, panelClass) {
                this.offsetX = offsetX, this.offsetY = offsetY, this.panelClass = panelClass, this.originX = origin.originX, 
                this.originY = origin.originY, this.overlayX = overlay.overlayX, this.overlayY = overlay.overlayY;
            };
        }(), ConnectedOverlayPositionChange = function() {
            return function(connectionPair, scrollableViewProperties) {
                this.connectionPair = connectionPair, this.scrollableViewProperties = scrollableViewProperties;
            };
        }();
        function validateVerticalPosition(property, value) {
            if ("top" !== value && "bottom" !== value && "center" !== value) throw Error("ConnectedPosition: Invalid " + property + ' "' + value + '". Expected "top", "bottom" or "center".');
        }
        function validateHorizontalPosition(property, value) {
            if ("start" !== value && "end" !== value && "center" !== value) throw Error("ConnectedPosition: Invalid " + property + ' "' + value + '". Expected "start", "end" or "center".');
        }
        var OverlayKeyboardDispatcher = function() {
            function OverlayKeyboardDispatcher(document) {
                var _this = this;
                this._attachedOverlays = [], this._keydownListener = function(event) {
                    for (var overlays = _this._attachedOverlays, i = overlays.length - 1; i > -1; i--) if (overlays[i]._keydownEventSubscriptions > 0) {
                        overlays[i]._keydownEvents.next(event);
                        break;
                    }
                }, this._document = document;
            }
            return OverlayKeyboardDispatcher.prototype.ngOnDestroy = function() {
                this._detach();
            }, OverlayKeyboardDispatcher.prototype.add = function(overlayRef) {
                this.remove(overlayRef), this._isAttached || (this._document.body.addEventListener("keydown", this._keydownListener, !0), 
                this._isAttached = !0), this._attachedOverlays.push(overlayRef);
            }, OverlayKeyboardDispatcher.prototype.remove = function(overlayRef) {
                var index = this._attachedOverlays.indexOf(overlayRef);
                index > -1 && this._attachedOverlays.splice(index, 1), 0 === this._attachedOverlays.length && this._detach();
            }, OverlayKeyboardDispatcher.prototype._detach = function() {
                this._isAttached && (this._document.body.removeEventListener("keydown", this._keydownListener, !0), 
                this._isAttached = !1);
            }, OverlayKeyboardDispatcher.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__.V)({
                factory: function() {
                    return new OverlayKeyboardDispatcher(Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__.Y)(_angular_common__WEBPACK_IMPORTED_MODULE_2__.d));
                },
                token: OverlayKeyboardDispatcher,
                providedIn: "root"
            }), OverlayKeyboardDispatcher;
        }(), OverlayContainer = function() {
            function OverlayContainer(_document) {
                this._document = _document;
            }
            return OverlayContainer.prototype.ngOnDestroy = function() {
                this._containerElement && this._containerElement.parentNode && this._containerElement.parentNode.removeChild(this._containerElement);
            }, OverlayContainer.prototype.getContainerElement = function() {
                return this._containerElement || this._createContainer(), this._containerElement;
            }, OverlayContainer.prototype._createContainer = function() {
                var container = this._document.createElement("div");
                container.classList.add("cdk-overlay-container"), this._document.body.appendChild(container), 
                this._containerElement = container;
            }, OverlayContainer.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__.V)({
                factory: function() {
                    return new OverlayContainer(Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__.Y)(_angular_common__WEBPACK_IMPORTED_MODULE_2__.d));
                },
                token: OverlayContainer,
                providedIn: "root"
            }), OverlayContainer;
        }(), OverlayRef = function() {
            function OverlayRef(_portalOutlet, _host, _pane, _config, _ngZone, _keyboardDispatcher, _document, _location) {
                var _this = this;
                this._portalOutlet = _portalOutlet, this._host = _host, this._pane = _pane, this._config = _config, 
                this._ngZone = _ngZone, this._keyboardDispatcher = _keyboardDispatcher, this._document = _document, 
                this._location = _location, this._backdropElement = null, this._backdropClick = new rxjs__WEBPACK_IMPORTED_MODULE_5__.a(), 
                this._attachments = new rxjs__WEBPACK_IMPORTED_MODULE_5__.a(), this._detachments = new rxjs__WEBPACK_IMPORTED_MODULE_5__.a(), 
                this._locationChanges = rxjs__WEBPACK_IMPORTED_MODULE_6__.a.EMPTY, this._keydownEventsObservable = rxjs__WEBPACK_IMPORTED_MODULE_7__.a.create(function(observer) {
                    var subscription = _this._keydownEvents.subscribe(observer);
                    return _this._keydownEventSubscriptions++, function() {
                        subscription.unsubscribe(), _this._keydownEventSubscriptions--;
                    };
                }), this._keydownEvents = new rxjs__WEBPACK_IMPORTED_MODULE_5__.a(), this._keydownEventSubscriptions = 0, 
                _config.scrollStrategy && _config.scrollStrategy.attach(this), this._positionStrategy = _config.positionStrategy;
            }
            return Object.defineProperty(OverlayRef.prototype, "overlayElement", {
                get: function() {
                    return this._pane;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(OverlayRef.prototype, "backdropElement", {
                get: function() {
                    return this._backdropElement;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(OverlayRef.prototype, "hostElement", {
                get: function() {
                    return this._host;
                },
                enumerable: !0,
                configurable: !0
            }), OverlayRef.prototype.attach = function(portal) {
                var _this = this, attachResult = this._portalOutlet.attach(portal);
                return this._positionStrategy && this._positionStrategy.attach(this), !this._host.parentElement && this._previousHostParent && this._previousHostParent.appendChild(this._host), 
                this._updateStackingOrder(), this._updateElementSize(), this._updateElementDirection(), 
                this._config.scrollStrategy && this._config.scrollStrategy.enable(), this._ngZone.onStable.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.a)(1)).subscribe(function() {
                    _this.hasAttached() && _this.updatePosition();
                }), this._togglePointerEvents(!0), this._config.hasBackdrop && this._attachBackdrop(), 
                this._config.panelClass && this._toggleClasses(this._pane, this._config.panelClass, !0), 
                this._attachments.next(), this._keyboardDispatcher.add(this), this._config.disposeOnNavigation && this._location && (this._locationChanges = this._location.subscribe(function() {
                    return _this.dispose();
                })), attachResult;
            }, OverlayRef.prototype.detach = function() {
                if (this.hasAttached()) {
                    this.detachBackdrop(), this._togglePointerEvents(!1), this._positionStrategy && this._positionStrategy.detach && this._positionStrategy.detach(), 
                    this._config.scrollStrategy && this._config.scrollStrategy.disable();
                    var detachmentResult = this._portalOutlet.detach();
                    return this._detachments.next(), this._keyboardDispatcher.remove(this), this._detachContentWhenStable(), 
                    this._locationChanges.unsubscribe(), detachmentResult;
                }
            }, OverlayRef.prototype.dispose = function() {
                var isAttached = this.hasAttached();
                this._positionStrategy && this._positionStrategy.dispose(), this._config.scrollStrategy && this._config.scrollStrategy.disable(), 
                this.detachBackdrop(), this._locationChanges.unsubscribe(), this._keyboardDispatcher.remove(this), 
                this._portalOutlet.dispose(), this._attachments.complete(), this._backdropClick.complete(), 
                this._keydownEvents.complete(), this._host && this._host.parentNode && (this._host.parentNode.removeChild(this._host), 
                this._host = null), this._previousHostParent = this._pane = null, isAttached && this._detachments.next(), 
                this._detachments.complete();
            }, OverlayRef.prototype.hasAttached = function() {
                return this._portalOutlet.hasAttached();
            }, OverlayRef.prototype.backdropClick = function() {
                return this._backdropClick.asObservable();
            }, OverlayRef.prototype.attachments = function() {
                return this._attachments.asObservable();
            }, OverlayRef.prototype.detachments = function() {
                return this._detachments.asObservable();
            }, OverlayRef.prototype.keydownEvents = function() {
                return this._keydownEventsObservable;
            }, OverlayRef.prototype.getConfig = function() {
                return this._config;
            }, OverlayRef.prototype.updatePosition = function() {
                this._positionStrategy && this._positionStrategy.apply();
            }, OverlayRef.prototype.updatePositionStrategy = function(strategy) {
                strategy !== this._positionStrategy && (this._positionStrategy && this._positionStrategy.dispose(), 
                this._positionStrategy = strategy, this.hasAttached() && (strategy.attach(this), 
                this.updatePosition()));
            }, OverlayRef.prototype.updateSize = function(sizeConfig) {
                this._config = Object(tslib__WEBPACK_IMPORTED_MODULE_4__.a)({}, this._config, sizeConfig), 
                this._updateElementSize();
            }, OverlayRef.prototype.setDirection = function(dir) {
                this._config = Object(tslib__WEBPACK_IMPORTED_MODULE_4__.a)({}, this._config, {
                    direction: dir
                }), this._updateElementDirection();
            }, OverlayRef.prototype.getDirection = function() {
                var direction = this._config.direction;
                return direction ? "string" == typeof direction ? direction : direction.value : "ltr";
            }, OverlayRef.prototype._updateElementDirection = function() {
                this._host.setAttribute("dir", this.getDirection());
            }, OverlayRef.prototype._updateElementSize = function() {
                var style = this._pane.style;
                style.width = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__.c)(this._config.width), 
                style.height = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__.c)(this._config.height), 
                style.minWidth = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__.c)(this._config.minWidth), 
                style.minHeight = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__.c)(this._config.minHeight), 
                style.maxWidth = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__.c)(this._config.maxWidth), 
                style.maxHeight = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__.c)(this._config.maxHeight);
            }, OverlayRef.prototype._togglePointerEvents = function(enablePointer) {
                this._pane.style.pointerEvents = enablePointer ? "auto" : "none";
            }, OverlayRef.prototype._attachBackdrop = function() {
                var _this = this;
                this._backdropElement = this._document.createElement("div"), this._backdropElement.classList.add("cdk-overlay-backdrop"), 
                this._config.backdropClass && this._toggleClasses(this._backdropElement, this._config.backdropClass, !0), 
                this._host.parentElement.insertBefore(this._backdropElement, this._host), this._backdropElement.addEventListener("click", function(event) {
                    return _this._backdropClick.next(event);
                }), "undefined" != typeof requestAnimationFrame ? this._ngZone.runOutsideAngular(function() {
                    requestAnimationFrame(function() {
                        _this._backdropElement && _this._backdropElement.classList.add("cdk-overlay-backdrop-showing");
                    });
                }) : this._backdropElement.classList.add("cdk-overlay-backdrop-showing");
            }, OverlayRef.prototype._updateStackingOrder = function() {
                this._host.nextSibling && this._host.parentNode.appendChild(this._host);
            }, OverlayRef.prototype.detachBackdrop = function() {
                var _this = this, backdropToDetach = this._backdropElement;
                if (backdropToDetach) {
                    var timeoutId_1 = void 0, finishDetach_1 = function() {
                        backdropToDetach && backdropToDetach.parentNode && backdropToDetach.parentNode.removeChild(backdropToDetach), 
                        _this._backdropElement == backdropToDetach && (_this._backdropElement = null), clearTimeout(timeoutId_1);
                    };
                    backdropToDetach.classList.remove("cdk-overlay-backdrop-showing"), this._config.backdropClass && this._toggleClasses(backdropToDetach, this._config.backdropClass, !1), 
                    this._ngZone.runOutsideAngular(function() {
                        backdropToDetach.addEventListener("transitionend", finishDetach_1);
                    }), backdropToDetach.style.pointerEvents = "none", timeoutId_1 = this._ngZone.runOutsideAngular(function() {
                        return setTimeout(finishDetach_1, 500);
                    });
                }
            }, OverlayRef.prototype._toggleClasses = function(element, cssClasses, isAdd) {
                var classList = element.classList;
                Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__.a)(cssClasses).forEach(function(cssClass) {
                    isAdd ? classList.add(cssClass) : classList.remove(cssClass);
                });
            }, OverlayRef.prototype._detachContentWhenStable = function() {
                var _this = this;
                this._ngZone.runOutsideAngular(function() {
                    var subscription = _this._ngZone.onStable.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.a)(Object(rxjs__WEBPACK_IMPORTED_MODULE_8__.a)(_this._attachments, _this._detachments))).subscribe(function() {
                        _this._pane && _this._host && 0 !== _this._pane.children.length || (_this._pane && _this._config.panelClass && _this._toggleClasses(_this._pane, _this._config.panelClass, !1), 
                        _this._host && _this._host.parentElement && (_this._previousHostParent = _this._host.parentElement, 
                        _this._previousHostParent.removeChild(_this._host)), subscription.unsubscribe());
                    });
                });
            }, OverlayRef;
        }(), FlexibleConnectedPositionStrategy = function() {
            function FlexibleConnectedPositionStrategy(connectedTo, _viewportRuler, _document, _platform, _overlayContainer) {
                var _this = this;
                this._viewportRuler = _viewportRuler, this._document = _document, this._platform = _platform, 
                this._overlayContainer = _overlayContainer, this._lastBoundingBoxSize = {
                    width: 0,
                    height: 0
                }, this._isPushed = !1, this._canPush = !0, this._growAfterOpen = !1, this._hasFlexibleDimensions = !0, 
                this._positionLocked = !1, this._viewportMargin = 0, this.scrollables = [], this._preferredPositions = [], 
                this._positionChanges = new rxjs__WEBPACK_IMPORTED_MODULE_5__.a(), this._resizeSubscription = rxjs__WEBPACK_IMPORTED_MODULE_6__.a.EMPTY, 
                this._offsetX = 0, this._offsetY = 0, this._positionChangeSubscriptions = 0, this._appliedPanelClasses = [], 
                this.positionChanges = rxjs__WEBPACK_IMPORTED_MODULE_7__.a.create(function(observer) {
                    var subscription = _this._positionChanges.subscribe(observer);
                    return _this._positionChangeSubscriptions++, function() {
                        subscription.unsubscribe(), _this._positionChangeSubscriptions--;
                    };
                }), this.setOrigin(connectedTo);
            }
            return Object.defineProperty(FlexibleConnectedPositionStrategy.prototype, "positions", {
                get: function() {
                    return this._preferredPositions;
                },
                enumerable: !0,
                configurable: !0
            }), FlexibleConnectedPositionStrategy.prototype.attach = function(overlayRef) {
                var _this = this;
                if (this._overlayRef && overlayRef !== this._overlayRef) throw Error("This position strategy is already attached to an overlay");
                this._validatePositions(), overlayRef.hostElement.classList.add("cdk-overlay-connected-position-bounding-box"), 
                this._overlayRef = overlayRef, this._boundingBox = overlayRef.hostElement, this._pane = overlayRef.overlayElement, 
                this._isDisposed = !1, this._isInitialRender = !0, this._lastPosition = null, this._resizeSubscription.unsubscribe(), 
                this._resizeSubscription = this._viewportRuler.change().subscribe(function() {
                    _this._isInitialRender = !0, _this.apply();
                });
            }, FlexibleConnectedPositionStrategy.prototype.apply = function() {
                if (!(this._isDisposed || this._platform && !this._platform.isBrowser)) if (!this._isInitialRender && this._positionLocked && this._lastPosition) this.reapplyLastPosition(); else {
                    this._clearPanelClasses(), this._resetOverlayElementStyles(), this._resetBoundingBoxStyles(), 
                    this._viewportRect = this._getNarrowedViewportRect(), this._originRect = this._origin.getBoundingClientRect(), 
                    this._overlayRect = this._pane.getBoundingClientRect();
                    for (var fallback, originRect = this._originRect, overlayRect = this._overlayRect, viewportRect = this._viewportRect, flexibleFits = [], _i = 0, _a = this._preferredPositions; _i < _a.length; _i++) {
                        var pos = _a[_i], originPoint = this._getOriginPoint(originRect, pos), overlayPoint = this._getOverlayPoint(originPoint, overlayRect, pos), overlayFit = this._getOverlayFit(overlayPoint, overlayRect, viewportRect, pos);
                        if (overlayFit.isCompletelyWithinViewport) return this._isPushed = !1, void this._applyPosition(pos, originPoint);
                        this._canFitWithFlexibleDimensions(overlayFit, overlayPoint, viewportRect) ? flexibleFits.push({
                            position: pos,
                            origin: originPoint,
                            overlayRect: overlayRect,
                            boundingBoxRect: this._calculateBoundingBoxRect(originPoint, pos)
                        }) : (!fallback || fallback.overlayFit.visibleArea < overlayFit.visibleArea) && (fallback = {
                            overlayFit: overlayFit,
                            overlayPoint: overlayPoint,
                            originPoint: originPoint,
                            position: pos,
                            overlayRect: overlayRect
                        });
                    }
                    if (flexibleFits.length) {
                        for (var bestFit = null, bestScore = -1, _b = 0, flexibleFits_1 = flexibleFits; _b < flexibleFits_1.length; _b++) {
                            var fit = flexibleFits_1[_b], score = fit.boundingBoxRect.width * fit.boundingBoxRect.height * (fit.position.weight || 1);
                            score > bestScore && (bestScore = score, bestFit = fit);
                        }
                        return this._isPushed = !1, void this._applyPosition(bestFit.position, bestFit.origin);
                    }
                    if (this._canPush) return this._isPushed = !0, void this._applyPosition(fallback.position, fallback.originPoint);
                    this._applyPosition(fallback.position, fallback.originPoint);
                }
            }, FlexibleConnectedPositionStrategy.prototype.detach = function() {
                this._clearPanelClasses(), this._lastPosition = null, this._previousPushAmount = null, 
                this._resizeSubscription.unsubscribe();
            }, FlexibleConnectedPositionStrategy.prototype.dispose = function() {
                this._isDisposed || (this._boundingBox && extendStyles(this._boundingBox.style, {
                    top: "",
                    left: "",
                    right: "",
                    bottom: "",
                    height: "",
                    width: "",
                    alignItems: "",
                    justifyContent: ""
                }), this._pane && this._resetOverlayElementStyles(), this._overlayRef && this._overlayRef.hostElement.classList.remove("cdk-overlay-connected-position-bounding-box"), 
                this.detach(), this._positionChanges.complete(), this._overlayRef = this._boundingBox = null, 
                this._isDisposed = !0);
            }, FlexibleConnectedPositionStrategy.prototype.reapplyLastPosition = function() {
                if (!this._isDisposed && (!this._platform || this._platform.isBrowser)) {
                    this._originRect = this._origin.getBoundingClientRect(), this._overlayRect = this._pane.getBoundingClientRect(), 
                    this._viewportRect = this._getNarrowedViewportRect();
                    var lastPosition = this._lastPosition || this._preferredPositions[0], originPoint = this._getOriginPoint(this._originRect, lastPosition);
                    this._applyPosition(lastPosition, originPoint);
                }
            }, FlexibleConnectedPositionStrategy.prototype.withScrollableContainers = function(scrollables) {
                this.scrollables = scrollables;
            }, FlexibleConnectedPositionStrategy.prototype.withPositions = function(positions) {
                return this._preferredPositions = positions, -1 === positions.indexOf(this._lastPosition) && (this._lastPosition = null), 
                this._validatePositions(), this;
            }, FlexibleConnectedPositionStrategy.prototype.withViewportMargin = function(margin) {
                return this._viewportMargin = margin, this;
            }, FlexibleConnectedPositionStrategy.prototype.withFlexibleDimensions = function(flexibleDimensions) {
                return void 0 === flexibleDimensions && (flexibleDimensions = !0), this._hasFlexibleDimensions = flexibleDimensions, 
                this;
            }, FlexibleConnectedPositionStrategy.prototype.withGrowAfterOpen = function(growAfterOpen) {
                return void 0 === growAfterOpen && (growAfterOpen = !0), this._growAfterOpen = growAfterOpen, 
                this;
            }, FlexibleConnectedPositionStrategy.prototype.withPush = function(canPush) {
                return void 0 === canPush && (canPush = !0), this._canPush = canPush, this;
            }, FlexibleConnectedPositionStrategy.prototype.withLockedPosition = function(isLocked) {
                return void 0 === isLocked && (isLocked = !0), this._positionLocked = isLocked, 
                this;
            }, FlexibleConnectedPositionStrategy.prototype.setOrigin = function(origin) {
                return this._origin = origin instanceof _angular_core__WEBPACK_IMPORTED_MODULE_3__.k ? origin.nativeElement : origin, 
                this;
            }, FlexibleConnectedPositionStrategy.prototype.withDefaultOffsetX = function(offset) {
                return this._offsetX = offset, this;
            }, FlexibleConnectedPositionStrategy.prototype.withDefaultOffsetY = function(offset) {
                return this._offsetY = offset, this;
            }, FlexibleConnectedPositionStrategy.prototype.withTransformOriginOn = function(selector) {
                return this._transformOriginSelector = selector, this;
            }, FlexibleConnectedPositionStrategy.prototype._getOriginPoint = function(originRect, pos) {
                var x;
                if ("center" == pos.originX) x = originRect.left + originRect.width / 2; else {
                    var startX = this._isRtl() ? originRect.right : originRect.left, endX = this._isRtl() ? originRect.left : originRect.right;
                    x = "start" == pos.originX ? startX : endX;
                }
                return {
                    x: x,
                    y: "center" == pos.originY ? originRect.top + originRect.height / 2 : "top" == pos.originY ? originRect.top : originRect.bottom
                };
            }, FlexibleConnectedPositionStrategy.prototype._getOverlayPoint = function(originPoint, overlayRect, pos) {
                var overlayStartX;
                return overlayStartX = "center" == pos.overlayX ? -overlayRect.width / 2 : "start" === pos.overlayX ? this._isRtl() ? -overlayRect.width : 0 : this._isRtl() ? 0 : -overlayRect.width, 
                {
                    x: originPoint.x + overlayStartX,
                    y: originPoint.y + ("center" == pos.overlayY ? -overlayRect.height / 2 : "top" == pos.overlayY ? 0 : -overlayRect.height)
                };
            }, FlexibleConnectedPositionStrategy.prototype._getOverlayFit = function(point, overlay, viewport, position) {
                var x = point.x, y = point.y, offsetX = this._getOffset(position, "x"), offsetY = this._getOffset(position, "y");
                offsetX && (x += offsetX), offsetY && (y += offsetY);
                var topOverflow = 0 - y, bottomOverflow = y + overlay.height - viewport.height, visibleWidth = this._subtractOverflows(overlay.width, 0 - x, x + overlay.width - viewport.width), visibleHeight = this._subtractOverflows(overlay.height, topOverflow, bottomOverflow), visibleArea = visibleWidth * visibleHeight;
                return {
                    visibleArea: visibleArea,
                    isCompletelyWithinViewport: overlay.width * overlay.height === visibleArea,
                    fitsInViewportVertically: visibleHeight === overlay.height,
                    fitsInViewportHorizontally: visibleWidth == overlay.width
                };
            }, FlexibleConnectedPositionStrategy.prototype._canFitWithFlexibleDimensions = function(fit, point, viewport) {
                if (this._hasFlexibleDimensions) {
                    var availableHeight = viewport.bottom - point.y, availableWidth = viewport.right - point.x, minHeight = this._overlayRef.getConfig().minHeight, minWidth = this._overlayRef.getConfig().minWidth;
                    return (fit.fitsInViewportVertically || null != minHeight && minHeight <= availableHeight) && (fit.fitsInViewportHorizontally || null != minWidth && minWidth <= availableWidth);
                }
            }, FlexibleConnectedPositionStrategy.prototype._pushOverlayOnScreen = function(start, overlay, scrollPosition) {
                if (this._previousPushAmount && this._positionLocked) return {
                    x: start.x + this._previousPushAmount.x,
                    y: start.y + this._previousPushAmount.y
                };
                var pushX, pushY, viewport = this._viewportRect, overflowRight = Math.max(start.x + overlay.width - viewport.right, 0), overflowBottom = Math.max(start.y + overlay.height - viewport.bottom, 0), overflowTop = Math.max(viewport.top - scrollPosition.top - start.y, 0), overflowLeft = Math.max(viewport.left - scrollPosition.left - start.x, 0);
                return this._previousPushAmount = {
                    x: pushX = overlay.width < viewport.width ? overflowLeft || -overflowRight : start.x < this._viewportMargin ? viewport.left - scrollPosition.left - start.x : 0,
                    y: pushY = overlay.height < viewport.height ? overflowTop || -overflowBottom : start.y < this._viewportMargin ? viewport.top - scrollPosition.top - start.y : 0
                }, {
                    x: start.x + pushX,
                    y: start.y + pushY
                };
            }, FlexibleConnectedPositionStrategy.prototype._applyPosition = function(position, originPoint) {
                if (this._setTransformOrigin(position), this._setOverlayElementStyles(originPoint, position), 
                this._setBoundingBoxStyles(originPoint, position), position.panelClass && this._addPanelClasses(position.panelClass), 
                this._lastPosition = position, this._positionChangeSubscriptions > 0) {
                    var scrollableViewProperties = this._getScrollVisibility(), changeEvent = new ConnectedOverlayPositionChange(position, scrollableViewProperties);
                    this._positionChanges.next(changeEvent);
                }
                this._isInitialRender = !1;
            }, FlexibleConnectedPositionStrategy.prototype._setTransformOrigin = function(position) {
                if (this._transformOriginSelector) {
                    var xOrigin, elements = this._boundingBox.querySelectorAll(this._transformOriginSelector), yOrigin = position.overlayY;
                    xOrigin = "center" === position.overlayX ? "center" : this._isRtl() ? "start" === position.overlayX ? "right" : "left" : "start" === position.overlayX ? "left" : "right";
                    for (var i = 0; i < elements.length; i++) elements[i].style.transformOrigin = xOrigin + " " + yOrigin;
                }
            }, FlexibleConnectedPositionStrategy.prototype._calculateBoundingBoxRect = function(origin, position) {
                var height, top, bottom, width, left, right, viewport = this._viewportRect, isRtl = this._isRtl();
                if ("top" === position.overlayY) top = origin.y, height = viewport.bottom - origin.y; else if ("bottom" === position.overlayY) height = viewport.height - (bottom = viewport.height - origin.y + 2 * this._viewportMargin) + this._viewportMargin; else {
                    var smallestDistanceToViewportEdge = Math.min(viewport.bottom - origin.y + viewport.top, origin.y), previousHeight = this._lastBoundingBoxSize.height;
                    top = origin.y - smallestDistanceToViewportEdge, (height = 2 * smallestDistanceToViewportEdge) > previousHeight && !this._isInitialRender && !this._growAfterOpen && (top = origin.y - previousHeight / 2);
                }
                if ("end" === position.overlayX && !isRtl || "start" === position.overlayX && isRtl) right = viewport.right - origin.x + this._viewportMargin, 
                width = origin.x - viewport.left; else if ("start" === position.overlayX && !isRtl || "end" === position.overlayX && isRtl) left = origin.x, 
                width = viewport.right - origin.x; else {
                    smallestDistanceToViewportEdge = Math.min(viewport.right - origin.x + viewport.left, origin.x);
                    var previousWidth = this._lastBoundingBoxSize.width;
                    left = origin.x - smallestDistanceToViewportEdge, (width = 2 * smallestDistanceToViewportEdge) > previousWidth && !this._isInitialRender && !this._growAfterOpen && (left = origin.x - previousWidth / 2);
                }
                return {
                    top: top,
                    left: left,
                    bottom: bottom,
                    right: right,
                    width: width,
                    height: height
                };
            }, FlexibleConnectedPositionStrategy.prototype._setBoundingBoxStyles = function(origin, position) {
                var boundingBoxRect = this._calculateBoundingBoxRect(origin, position);
                this._isInitialRender || this._growAfterOpen || (boundingBoxRect.height = Math.min(boundingBoxRect.height, this._lastBoundingBoxSize.height), 
                boundingBoxRect.width = Math.min(boundingBoxRect.width, this._lastBoundingBoxSize.width));
                var styles = {};
                if (this._hasExactPosition()) styles.top = styles.left = "0", styles.bottom = styles.right = "", 
                styles.width = styles.height = "100%"; else {
                    var maxHeight = this._overlayRef.getConfig().maxHeight, maxWidth = this._overlayRef.getConfig().maxWidth;
                    styles.height = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__.c)(boundingBoxRect.height), 
                    styles.top = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__.c)(boundingBoxRect.top), 
                    styles.bottom = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__.c)(boundingBoxRect.bottom), 
                    styles.width = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__.c)(boundingBoxRect.width), 
                    styles.left = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__.c)(boundingBoxRect.left), 
                    styles.right = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__.c)(boundingBoxRect.right), 
                    styles.alignItems = "center" === position.overlayX ? "center" : "end" === position.overlayX ? "flex-end" : "flex-start", 
                    styles.justifyContent = "center" === position.overlayY ? "center" : "bottom" === position.overlayY ? "flex-end" : "flex-start", 
                    maxHeight && (styles.maxHeight = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__.c)(maxHeight)), 
                    maxWidth && (styles.maxWidth = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__.c)(maxWidth));
                }
                this._lastBoundingBoxSize = boundingBoxRect, extendStyles(this._boundingBox.style, styles);
            }, FlexibleConnectedPositionStrategy.prototype._resetBoundingBoxStyles = function() {
                extendStyles(this._boundingBox.style, {
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    height: "",
                    width: "",
                    alignItems: "",
                    justifyContent: ""
                });
            }, FlexibleConnectedPositionStrategy.prototype._resetOverlayElementStyles = function() {
                extendStyles(this._pane.style, {
                    top: "",
                    left: "",
                    bottom: "",
                    right: "",
                    position: ""
                });
            }, FlexibleConnectedPositionStrategy.prototype._setOverlayElementStyles = function(originPoint, position) {
                var styles = {};
                if (this._hasExactPosition()) {
                    var scrollPosition = this._viewportRuler.getViewportScrollPosition();
                    extendStyles(styles, this._getExactOverlayY(position, originPoint, scrollPosition)), 
                    extendStyles(styles, this._getExactOverlayX(position, originPoint, scrollPosition));
                } else styles.position = "static";
                var transformString = "", offsetX = this._getOffset(position, "x"), offsetY = this._getOffset(position, "y");
                offsetX && (transformString += "translateX(" + offsetX + "px) "), offsetY && (transformString += "translateY(" + offsetY + "px)"), 
                styles.transform = transformString.trim(), this._hasFlexibleDimensions && this._overlayRef.getConfig().maxHeight && (styles.maxHeight = ""), 
                this._hasFlexibleDimensions && this._overlayRef.getConfig().maxWidth && (styles.maxWidth = ""), 
                extendStyles(this._pane.style, styles);
            }, FlexibleConnectedPositionStrategy.prototype._getExactOverlayY = function(position, originPoint, scrollPosition) {
                var styles = {
                    top: null,
                    bottom: null
                }, overlayPoint = this._getOverlayPoint(originPoint, this._overlayRect, position);
                this._isPushed && (overlayPoint = this._pushOverlayOnScreen(overlayPoint, this._overlayRect, scrollPosition));
                var virtualKeyboardOffset = this._overlayContainer ? this._overlayContainer.getContainerElement().getBoundingClientRect().top : 0;
                return overlayPoint.y -= virtualKeyboardOffset, "bottom" === position.overlayY ? styles.bottom = this._document.documentElement.clientHeight - (overlayPoint.y + this._overlayRect.height) + "px" : styles.top = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__.c)(overlayPoint.y), 
                styles;
            }, FlexibleConnectedPositionStrategy.prototype._getExactOverlayX = function(position, originPoint, scrollPosition) {
                var styles = {
                    left: null,
                    right: null
                }, overlayPoint = this._getOverlayPoint(originPoint, this._overlayRect, position);
                return this._isPushed && (overlayPoint = this._pushOverlayOnScreen(overlayPoint, this._overlayRect, scrollPosition)), 
                "right" == (this._isRtl() ? "end" === position.overlayX ? "left" : "right" : "end" === position.overlayX ? "right" : "left") ? styles.right = this._document.documentElement.clientWidth - (overlayPoint.x + this._overlayRect.width) + "px" : styles.left = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__.c)(overlayPoint.x), 
                styles;
            }, FlexibleConnectedPositionStrategy.prototype._getScrollVisibility = function() {
                var originBounds = this._origin.getBoundingClientRect(), overlayBounds = this._pane.getBoundingClientRect(), scrollContainerBounds = this.scrollables.map(function(scrollable) {
                    return scrollable.getElementRef().nativeElement.getBoundingClientRect();
                });
                return {
                    isOriginClipped: isElementClippedByScrolling(originBounds, scrollContainerBounds),
                    isOriginOutsideView: isElementScrolledOutsideView(originBounds, scrollContainerBounds),
                    isOverlayClipped: isElementClippedByScrolling(overlayBounds, scrollContainerBounds),
                    isOverlayOutsideView: isElementScrolledOutsideView(overlayBounds, scrollContainerBounds)
                };
            }, FlexibleConnectedPositionStrategy.prototype._subtractOverflows = function(length) {
                for (var overflows = [], _i = 1; _i < arguments.length; _i++) overflows[_i - 1] = arguments[_i];
                return overflows.reduce(function(currentValue, currentOverflow) {
                    return currentValue - Math.max(currentOverflow, 0);
                }, length);
            }, FlexibleConnectedPositionStrategy.prototype._getNarrowedViewportRect = function() {
                var width = this._document.documentElement.clientWidth, height = this._document.documentElement.clientHeight, scrollPosition = this._viewportRuler.getViewportScrollPosition();
                return {
                    top: scrollPosition.top + this._viewportMargin,
                    left: scrollPosition.left + this._viewportMargin,
                    right: scrollPosition.left + width - this._viewportMargin,
                    bottom: scrollPosition.top + height - this._viewportMargin,
                    width: width - 2 * this._viewportMargin,
                    height: height - 2 * this._viewportMargin
                };
            }, FlexibleConnectedPositionStrategy.prototype._isRtl = function() {
                return "rtl" === this._overlayRef.getDirection();
            }, FlexibleConnectedPositionStrategy.prototype._hasExactPosition = function() {
                return !this._hasFlexibleDimensions || this._isPushed;
            }, FlexibleConnectedPositionStrategy.prototype._getOffset = function(position, axis) {
                return "x" === axis ? null == position.offsetX ? this._offsetX : position.offsetX : null == position.offsetY ? this._offsetY : position.offsetY;
            }, FlexibleConnectedPositionStrategy.prototype._validatePositions = function() {
                if (!this._preferredPositions.length) throw Error("FlexibleConnectedPositionStrategy: At least one position is required.");
                this._preferredPositions.forEach(function(pair) {
                    validateHorizontalPosition("originX", pair.originX), validateVerticalPosition("originY", pair.originY), 
                    validateHorizontalPosition("overlayX", pair.overlayX), validateVerticalPosition("overlayY", pair.overlayY);
                });
            }, FlexibleConnectedPositionStrategy.prototype._addPanelClasses = function(cssClasses) {
                var _this = this;
                this._pane && Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__.a)(cssClasses).forEach(function(cssClass) {
                    -1 === _this._appliedPanelClasses.indexOf(cssClass) && (_this._appliedPanelClasses.push(cssClass), 
                    _this._pane.classList.add(cssClass));
                });
            }, FlexibleConnectedPositionStrategy.prototype._clearPanelClasses = function() {
                var _this = this;
                this._pane && (this._appliedPanelClasses.forEach(function(cssClass) {
                    return _this._pane.classList.remove(cssClass);
                }), this._appliedPanelClasses = []);
            }, FlexibleConnectedPositionStrategy;
        }();
        function extendStyles(dest, source) {
            for (var key in source) source.hasOwnProperty(key) && (dest[key] = source[key]);
            return dest;
        }
        var ConnectedPositionStrategy = function() {
            function ConnectedPositionStrategy(originPos, overlayPos, connectedTo, viewportRuler, document, platform) {
                this._preferredPositions = [], this._positionStrategy = new FlexibleConnectedPositionStrategy(connectedTo, viewportRuler, document, platform).withFlexibleDimensions(!1).withPush(!1).withViewportMargin(0), 
                this.withFallbackPosition(originPos, overlayPos);
            }
            return Object.defineProperty(ConnectedPositionStrategy.prototype, "_isRtl", {
                get: function() {
                    return "rtl" === this._overlayRef.getDirection();
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(ConnectedPositionStrategy.prototype, "onPositionChange", {
                get: function() {
                    return this._positionStrategy.positionChanges;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(ConnectedPositionStrategy.prototype, "positions", {
                get: function() {
                    return this._preferredPositions;
                },
                enumerable: !0,
                configurable: !0
            }), ConnectedPositionStrategy.prototype.attach = function(overlayRef) {
                this._overlayRef = overlayRef, this._positionStrategy.attach(overlayRef), this._direction && (overlayRef.setDirection(this._direction), 
                this._direction = null);
            }, ConnectedPositionStrategy.prototype.dispose = function() {
                this._positionStrategy.dispose();
            }, ConnectedPositionStrategy.prototype.detach = function() {
                this._positionStrategy.detach();
            }, ConnectedPositionStrategy.prototype.apply = function() {
                this._positionStrategy.apply();
            }, ConnectedPositionStrategy.prototype.recalculateLastPosition = function() {
                this._positionStrategy.reapplyLastPosition();
            }, ConnectedPositionStrategy.prototype.withScrollableContainers = function(scrollables) {
                this._positionStrategy.withScrollableContainers(scrollables);
            }, ConnectedPositionStrategy.prototype.withFallbackPosition = function(originPos, overlayPos, offsetX, offsetY) {
                var position = new ConnectionPositionPair(originPos, overlayPos, offsetX, offsetY);
                return this._preferredPositions.push(position), this._positionStrategy.withPositions(this._preferredPositions), 
                this;
            }, ConnectedPositionStrategy.prototype.withDirection = function(dir) {
                return this._overlayRef ? this._overlayRef.setDirection(dir) : this._direction = dir, 
                this;
            }, ConnectedPositionStrategy.prototype.withOffsetX = function(offset) {
                return this._positionStrategy.withDefaultOffsetX(offset), this;
            }, ConnectedPositionStrategy.prototype.withOffsetY = function(offset) {
                return this._positionStrategy.withDefaultOffsetY(offset), this;
            }, ConnectedPositionStrategy.prototype.withLockedPosition = function(isLocked) {
                return this._positionStrategy.withLockedPosition(isLocked), this;
            }, ConnectedPositionStrategy.prototype.withPositions = function(positions) {
                return this._preferredPositions = positions.slice(), this._positionStrategy.withPositions(this._preferredPositions), 
                this;
            }, ConnectedPositionStrategy.prototype.setOrigin = function(origin) {
                return this._positionStrategy.setOrigin(origin), this;
            }, ConnectedPositionStrategy;
        }(), GlobalPositionStrategy = function() {
            function GlobalPositionStrategy() {
                this._cssPosition = "static", this._topOffset = "", this._bottomOffset = "", this._leftOffset = "", 
                this._rightOffset = "", this._alignItems = "", this._justifyContent = "", this._width = "", 
                this._height = "";
            }
            return GlobalPositionStrategy.prototype.attach = function(overlayRef) {
                var config = overlayRef.getConfig();
                this._overlayRef = overlayRef, this._width && !config.width && overlayRef.updateSize({
                    width: this._width
                }), this._height && !config.height && overlayRef.updateSize({
                    height: this._height
                }), overlayRef.hostElement.classList.add("cdk-global-overlay-wrapper"), this._isDisposed = !1;
            }, GlobalPositionStrategy.prototype.top = function(value) {
                return void 0 === value && (value = ""), this._bottomOffset = "", this._topOffset = value, 
                this._alignItems = "flex-start", this;
            }, GlobalPositionStrategy.prototype.left = function(value) {
                return void 0 === value && (value = ""), this._rightOffset = "", this._leftOffset = value, 
                this._justifyContent = "flex-start", this;
            }, GlobalPositionStrategy.prototype.bottom = function(value) {
                return void 0 === value && (value = ""), this._topOffset = "", this._bottomOffset = value, 
                this._alignItems = "flex-end", this;
            }, GlobalPositionStrategy.prototype.right = function(value) {
                return void 0 === value && (value = ""), this._leftOffset = "", this._rightOffset = value, 
                this._justifyContent = "flex-end", this;
            }, GlobalPositionStrategy.prototype.width = function(value) {
                return void 0 === value && (value = ""), this._overlayRef ? this._overlayRef.updateSize({
                    width: value
                }) : this._width = value, this;
            }, GlobalPositionStrategy.prototype.height = function(value) {
                return void 0 === value && (value = ""), this._overlayRef ? this._overlayRef.updateSize({
                    height: value
                }) : this._height = value, this;
            }, GlobalPositionStrategy.prototype.centerHorizontally = function(offset) {
                return void 0 === offset && (offset = ""), this.left(offset), this._justifyContent = "center", 
                this;
            }, GlobalPositionStrategy.prototype.centerVertically = function(offset) {
                return void 0 === offset && (offset = ""), this.top(offset), this._alignItems = "center", 
                this;
            }, GlobalPositionStrategy.prototype.apply = function() {
                if (this._overlayRef && this._overlayRef.hasAttached()) {
                    var styles = this._overlayRef.overlayElement.style, parentStyles = this._overlayRef.hostElement.style, config = this._overlayRef.getConfig();
                    styles.position = this._cssPosition, styles.marginLeft = "100%" === config.width ? "0" : this._leftOffset, 
                    styles.marginTop = "100%" === config.height ? "0" : this._topOffset, styles.marginBottom = this._bottomOffset, 
                    styles.marginRight = this._rightOffset, "100%" === config.width ? parentStyles.justifyContent = "flex-start" : "center" === this._justifyContent ? parentStyles.justifyContent = "center" : "rtl" === this._overlayRef.getConfig().direction ? "flex-start" === this._justifyContent ? parentStyles.justifyContent = "flex-end" : "flex-end" === this._justifyContent && (parentStyles.justifyContent = "flex-start") : parentStyles.justifyContent = this._justifyContent, 
                    parentStyles.alignItems = "100%" === config.height ? "flex-start" : this._alignItems;
                }
            }, GlobalPositionStrategy.prototype.dispose = function() {
                if (!this._isDisposed && this._overlayRef) {
                    var styles = this._overlayRef.overlayElement.style, parent = this._overlayRef.hostElement, parentStyles = parent.style;
                    parent.classList.remove("cdk-global-overlay-wrapper"), parentStyles.justifyContent = parentStyles.alignItems = styles.marginTop = styles.marginBottom = styles.marginLeft = styles.marginRight = styles.position = "", 
                    this._overlayRef = null, this._isDisposed = !0;
                }
            }, GlobalPositionStrategy;
        }(), OverlayPositionBuilder = function() {
            function OverlayPositionBuilder(_viewportRuler, _document, _platform, _overlayContainer) {
                this._viewportRuler = _viewportRuler, this._document = _document, this._platform = _platform, 
                this._overlayContainer = _overlayContainer;
            }
            return OverlayPositionBuilder.prototype.global = function() {
                return new GlobalPositionStrategy();
            }, OverlayPositionBuilder.prototype.connectedTo = function(elementRef, originPos, overlayPos) {
                return new ConnectedPositionStrategy(originPos, overlayPos, elementRef, this._viewportRuler, this._document);
            }, OverlayPositionBuilder.prototype.flexibleConnectedTo = function(elementRef) {
                return new FlexibleConnectedPositionStrategy(elementRef, this._viewportRuler, this._document, this._platform, this._overlayContainer);
            }, OverlayPositionBuilder.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__.V)({
                factory: function() {
                    return new OverlayPositionBuilder(Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__.Y)(_angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_1__.e), Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__.Y)(_angular_common__WEBPACK_IMPORTED_MODULE_2__.d), Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__.Y)(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_11__.a, 8), Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__.Y)(OverlayContainer, 8));
                },
                token: OverlayPositionBuilder,
                providedIn: "root"
            }), OverlayPositionBuilder;
        }(), nextUniqueId = 0, Overlay = function() {
            function Overlay(scrollStrategies, _overlayContainer, _componentFactoryResolver, _positionBuilder, _keyboardDispatcher, _injector, _ngZone, _document, _directionality, _location) {
                this.scrollStrategies = scrollStrategies, this._overlayContainer = _overlayContainer, 
                this._componentFactoryResolver = _componentFactoryResolver, this._positionBuilder = _positionBuilder, 
                this._keyboardDispatcher = _keyboardDispatcher, this._injector = _injector, this._ngZone = _ngZone, 
                this._document = _document, this._directionality = _directionality, this._location = _location;
            }
            return Overlay.prototype.create = function(config) {
                var host = this._createHostElement(), pane = this._createPaneElement(host), portalOutlet = this._createPortalOutlet(pane), overlayConfig = new OverlayConfig(config);
                return overlayConfig.direction = overlayConfig.direction || this._directionality.value, 
                new OverlayRef(portalOutlet, host, pane, overlayConfig, this._ngZone, this._keyboardDispatcher, this._document, this._location);
            }, Overlay.prototype.position = function() {
                return this._positionBuilder;
            }, Overlay.prototype._createPaneElement = function(host) {
                var pane = this._document.createElement("div");
                return pane.id = "cdk-overlay-" + nextUniqueId++, pane.classList.add("cdk-overlay-pane"), 
                host.appendChild(pane), pane;
            }, Overlay.prototype._createHostElement = function() {
                var host = this._document.createElement("div");
                return this._overlayContainer.getContainerElement().appendChild(host), host;
            }, Overlay.prototype._createPortalOutlet = function(pane) {
                return this._appRef || (this._appRef = this._injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_3__.g)), 
                new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_12__.e(pane, this._componentFactoryResolver, this._appRef, this._injector);
            }, Overlay;
        }(), CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY = new _angular_core__WEBPACK_IMPORTED_MODULE_3__.q("cdk-connected-overlay-scroll-strategy");
        function CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
            return function() {
                return overlay.scrollStrategies.reposition();
            };
        }
        var OverlayModule = function() {
            return function() {};
        }();
    },
    vARd: function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        var mediaQueryStyleNode, Subject = __webpack_require__("K9Ia"), core = __webpack_require__("CcnG"), tslib_es6 = (__webpack_require__("ihYY"), 
        __webpack_require__("mrSG")), portal_es5 = __webpack_require__("4c35"), take = __webpack_require__("t9fZ"), takeUntil = __webpack_require__("ny24"), overlay_es5 = __webpack_require__("eDkP"), a11y_es5 = __webpack_require__("lLAP"), platform_es5 = __webpack_require__("dWZg"), combineLatest = __webpack_require__("dzgT"), asap = __webpack_require__("KQya"), Observable = __webpack_require__("6blF"), isArray = __webpack_require__("isby"), isFunction = __webpack_require__("2Bdj"), map = __webpack_require__("67Y/"), debounceTime = __webpack_require__("Gi3i"), startWith = __webpack_require__("p0Sj"), coercion_es5 = __webpack_require__("n6gG"), mediaQueriesForWebkitCompatibility = new Set(), layout_es5_MediaMatcher = function() {
            function MediaMatcher(platform) {
                this.platform = platform, this._matchMedia = this.platform.isBrowser && window.matchMedia ? window.matchMedia.bind(window) : noopMatchMedia;
            }
            return MediaMatcher.prototype.matchMedia = function(query) {
                return this.platform.WEBKIT && function(query) {
                    if (!mediaQueriesForWebkitCompatibility.has(query)) try {
                        mediaQueryStyleNode || ((mediaQueryStyleNode = document.createElement("style")).setAttribute("type", "text/css"), 
                        document.head.appendChild(mediaQueryStyleNode)), mediaQueryStyleNode.sheet && (mediaQueryStyleNode.sheet.insertRule("@media " + query + " {.fx-query-test{ }}", 0), 
                        mediaQueriesForWebkitCompatibility.add(query));
                    } catch (e) {
                        console.error(e);
                    }
                }(query), this._matchMedia(query);
            }, MediaMatcher.ngInjectableDef = Object(core.V)({
                factory: function() {
                    return new MediaMatcher(Object(core.Y)(platform_es5.a));
                },
                token: MediaMatcher,
                providedIn: "root"
            }), MediaMatcher;
        }();
        function noopMatchMedia(query) {
            return {
                matches: "all" === query || "" === query,
                media: query,
                addListener: function() {},
                removeListener: function() {}
            };
        }
        var layout_es5_BreakpointObserver = function() {
            function BreakpointObserver(mediaMatcher, zone) {
                this.mediaMatcher = mediaMatcher, this.zone = zone, this._queries = new Map(), this._destroySubject = new Subject.a();
            }
            return BreakpointObserver.prototype.ngOnDestroy = function() {
                this._destroySubject.next(), this._destroySubject.complete();
            }, BreakpointObserver.prototype.isMatched = function(value) {
                var _this = this;
                return splitQueries(Object(coercion_es5.a)(value)).some(function(mediaQuery) {
                    return _this._registerQuery(mediaQuery).mql.matches;
                });
            }, BreakpointObserver.prototype.observe = function(value) {
                var _this = this, observables = splitQueries(Object(coercion_es5.a)(value)).map(function(query) {
                    return _this._registerQuery(query).observable;
                });
                return Object(combineLatest.a)(observables).pipe(Object(debounceTime.a)(0, asap.a), Object(map.a)(function(breakpointStates) {
                    var response = {
                        matches: !1,
                        breakpoints: {}
                    };
                    return breakpointStates.forEach(function(state) {
                        response.matches = response.matches || state.matches, response.breakpoints[state.query] = state.matches;
                    }), response;
                }));
            }, BreakpointObserver.prototype._registerQuery = function(query) {
                var _this = this;
                if (this._queries.has(query)) return this._queries.get(query);
                var queryListener, mql = this.mediaMatcher.matchMedia(query), output = {
                    observable: function fromEventPattern(addHandler, removeHandler, resultSelector) {
                        return resultSelector ? fromEventPattern(addHandler, removeHandler).pipe(Object(map.a)(function(args) {
                            return Object(isArray.a)(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
                        })) : new Observable.a(function(subscriber) {
                            var retValue, handler = function() {
                                for (var e = [], _i = 0; _i < arguments.length; _i++) e[_i] = arguments[_i];
                                return subscriber.next(1 === e.length ? e[0] : e);
                            };
                            try {
                                retValue = addHandler(handler);
                            } catch (err) {
                                return void subscriber.error(err);
                            }
                            if (Object(isFunction.a)(removeHandler)) return function() {
                                return removeHandler(handler, retValue);
                            };
                        });
                    }(function(listener) {
                        mql.addListener(queryListener = function(e) {
                            return _this.zone.run(function() {
                                return listener(e);
                            });
                        });
                    }, function() {
                        return mql.removeListener(queryListener);
                    }).pipe(Object(takeUntil.a)(this._destroySubject), Object(startWith.a)(mql), Object(map.a)(function(nextMql) {
                        return {
                            query: query,
                            matches: nextMql.matches
                        };
                    })),
                    mql: mql
                };
                return this._queries.set(query, output), output;
            }, BreakpointObserver.ngInjectableDef = Object(core.V)({
                factory: function() {
                    return new BreakpointObserver(Object(core.Y)(layout_es5_MediaMatcher), Object(core.Y)(core.A));
                },
                token: BreakpointObserver,
                providedIn: "root"
            }), BreakpointObserver;
        }();
        function splitQueries(queries) {
            return queries.map(function(query) {
                return query.split(",");
            }).reduce(function(a1, a2) {
                return a1.concat(a2);
            }).map(function(query) {
                return query.trim();
            });
        }
        __webpack_require__.d(__webpack_exports__, "e", function() {
            return MatSnackBarModule;
        }), __webpack_require__.d(__webpack_exports__, "b", function() {
            return snack_bar_es5_MatSnackBar;
        }), __webpack_require__.d(__webpack_exports__, "d", function() {
            return snack_bar_es5_MatSnackBarContainer;
        }), __webpack_require__.d(__webpack_exports__, "a", function() {
            return MAT_SNACK_BAR_DATA;
        }), __webpack_require__.d(__webpack_exports__, "c", function() {
            return MatSnackBarConfig;
        }), __webpack_require__.d(__webpack_exports__, "f", function() {
            return snack_bar_es5_MatSnackBarRef;
        }), __webpack_require__.d(__webpack_exports__, "g", function() {
            return SimpleSnackBar;
        });
        var snack_bar_es5_MatSnackBarRef = function() {
            function MatSnackBarRef(containerInstance, _overlayRef) {
                var _this = this;
                this._overlayRef = _overlayRef, this._afterDismissed = new Subject.a(), this._afterOpened = new Subject.a(), 
                this._onAction = new Subject.a(), this._dismissedByAction = !1, this.containerInstance = containerInstance, 
                this.onAction().subscribe(function() {
                    return _this.dismiss();
                }), containerInstance._onExit.subscribe(function() {
                    return _this._finishDismiss();
                });
            }
            return MatSnackBarRef.prototype.dismiss = function() {
                this._afterDismissed.closed || this.containerInstance.exit(), clearTimeout(this._durationTimeoutId);
            }, MatSnackBarRef.prototype.dismissWithAction = function() {
                this._onAction.closed || (this._dismissedByAction = !0, this._onAction.next(), this._onAction.complete());
            }, MatSnackBarRef.prototype.closeWithAction = function() {
                this.dismissWithAction();
            }, MatSnackBarRef.prototype._dismissAfter = function(duration) {
                var _this = this;
                this._durationTimeoutId = setTimeout(function() {
                    return _this.dismiss();
                }, duration);
            }, MatSnackBarRef.prototype._open = function() {
                this._afterOpened.closed || (this._afterOpened.next(), this._afterOpened.complete());
            }, MatSnackBarRef.prototype._finishDismiss = function() {
                this._overlayRef.dispose(), this._onAction.closed || this._onAction.complete(), 
                this._afterDismissed.next({
                    dismissedByAction: this._dismissedByAction
                }), this._afterDismissed.complete(), this._dismissedByAction = !1;
            }, MatSnackBarRef.prototype.afterDismissed = function() {
                return this._afterDismissed.asObservable();
            }, MatSnackBarRef.prototype.afterOpened = function() {
                return this.containerInstance._onEnter;
            }, MatSnackBarRef.prototype.onAction = function() {
                return this._onAction.asObservable();
            }, MatSnackBarRef;
        }(), MAT_SNACK_BAR_DATA = new core.q("MatSnackBarData"), MatSnackBarConfig = function() {
            return function() {
                this.politeness = "assertive", this.announcementMessage = "", this.duration = 0, 
                this.data = null, this.horizontalPosition = "center", this.verticalPosition = "bottom";
            };
        }(), SimpleSnackBar = function() {
            function SimpleSnackBar(snackBarRef, data) {
                this.snackBarRef = snackBarRef, this.data = data;
            }
            return SimpleSnackBar.prototype.action = function() {
                this.snackBarRef.dismissWithAction();
            }, Object.defineProperty(SimpleSnackBar.prototype, "hasAction", {
                get: function() {
                    return !!this.data.action;
                },
                enumerable: !0,
                configurable: !0
            }), SimpleSnackBar;
        }(), snack_bar_es5_MatSnackBarContainer = function(_super) {
            function MatSnackBarContainer(_ngZone, _elementRef, _changeDetectorRef, snackBarConfig) {
                var _this = _super.call(this) || this;
                return _this._ngZone = _ngZone, _this._elementRef = _elementRef, _this._changeDetectorRef = _changeDetectorRef, 
                _this.snackBarConfig = snackBarConfig, _this._destroyed = !1, _this._onExit = new Subject.a(), 
                _this._onEnter = new Subject.a(), _this._animationState = "void", _this;
            }
            return Object(tslib_es6.c)(MatSnackBarContainer, _super), MatSnackBarContainer.prototype.attachComponentPortal = function(portal) {
                return this._assertNotAttached(), this._applySnackBarClasses(), this._portalOutlet.attachComponentPortal(portal);
            }, MatSnackBarContainer.prototype.attachTemplatePortal = function(portal) {
                return this._assertNotAttached(), this._applySnackBarClasses(), this._portalOutlet.attachTemplatePortal(portal);
            }, MatSnackBarContainer.prototype.onAnimationEnd = function(event) {
                var toState = event.toState;
                if (("void" === toState && "void" !== event.fromState || "hidden" === toState) && this._completeExit(), 
                "visible" === toState) {
                    var onEnter_1 = this._onEnter;
                    this._ngZone.run(function() {
                        onEnter_1.next(), onEnter_1.complete();
                    });
                }
            }, MatSnackBarContainer.prototype.enter = function() {
                this._destroyed || (this._animationState = "visible", this._changeDetectorRef.detectChanges());
            }, MatSnackBarContainer.prototype.exit = function() {
                return this._animationState = "hidden", this._onExit;
            }, MatSnackBarContainer.prototype.ngOnDestroy = function() {
                this._destroyed = !0, this._completeExit();
            }, MatSnackBarContainer.prototype._completeExit = function() {
                var _this = this;
                this._ngZone.onMicrotaskEmpty.asObservable().pipe(Object(take.a)(1)).subscribe(function() {
                    _this._onExit.next(), _this._onExit.complete();
                });
            }, MatSnackBarContainer.prototype._applySnackBarClasses = function() {
                var element = this._elementRef.nativeElement, panelClasses = this.snackBarConfig.panelClass;
                panelClasses && (Array.isArray(panelClasses) ? panelClasses.forEach(function(cssClass) {
                    return element.classList.add(cssClass);
                }) : element.classList.add(panelClasses)), "center" === this.snackBarConfig.horizontalPosition && element.classList.add("mat-snack-bar-center"), 
                "top" === this.snackBarConfig.verticalPosition && element.classList.add("mat-snack-bar-top");
            }, MatSnackBarContainer.prototype._assertNotAttached = function() {
                if (this._portalOutlet.hasAttached()) throw Error("Attempting to attach snack bar content after content is already attached");
            }, MatSnackBarContainer;
        }(portal_es5.a), MatSnackBarModule = function() {
            return function() {};
        }(), MAT_SNACK_BAR_DEFAULT_OPTIONS = new core.q("mat-snack-bar-default-options", {
            providedIn: "root",
            factory: function() {
                return new MatSnackBarConfig();
            }
        }), snack_bar_es5_MatSnackBar = function() {
            function MatSnackBar(_overlay, _live, _injector, _breakpointObserver, _parentSnackBar, _defaultConfig) {
                this._overlay = _overlay, this._live = _live, this._injector = _injector, this._breakpointObserver = _breakpointObserver, 
                this._parentSnackBar = _parentSnackBar, this._defaultConfig = _defaultConfig, this._snackBarRefAtThisLevel = null;
            }
            return Object.defineProperty(MatSnackBar.prototype, "_openedSnackBarRef", {
                get: function() {
                    var parent = this._parentSnackBar;
                    return parent ? parent._openedSnackBarRef : this._snackBarRefAtThisLevel;
                },
                set: function(value) {
                    this._parentSnackBar ? this._parentSnackBar._openedSnackBarRef = value : this._snackBarRefAtThisLevel = value;
                },
                enumerable: !0,
                configurable: !0
            }), MatSnackBar.prototype.openFromComponent = function(component, config) {
                return this._attach(component, config);
            }, MatSnackBar.prototype.openFromTemplate = function(template, config) {
                return this._attach(template, config);
            }, MatSnackBar.prototype.open = function(message, action, config) {
                void 0 === action && (action = "");
                var _config = Object(tslib_es6.a)({}, this._defaultConfig, config);
                return _config.data = {
                    message: message,
                    action: action
                }, _config.announcementMessage || (_config.announcementMessage = message), this.openFromComponent(SimpleSnackBar, _config);
            }, MatSnackBar.prototype.dismiss = function() {
                this._openedSnackBarRef && this._openedSnackBarRef.dismiss();
            }, MatSnackBar.prototype.ngOnDestroy = function() {
                this._snackBarRefAtThisLevel && this._snackBarRefAtThisLevel.dismiss();
            }, MatSnackBar.prototype._attachSnackBarContainer = function(overlayRef, config) {
                var injector = new portal_es5.f(config && config.viewContainerRef && config.viewContainerRef.injector || this._injector, new WeakMap([ [ MatSnackBarConfig, config ] ])), containerPortal = new portal_es5.d(snack_bar_es5_MatSnackBarContainer, config.viewContainerRef, injector), containerRef = overlayRef.attach(containerPortal);
                return containerRef.instance.snackBarConfig = config, containerRef.instance;
            }, MatSnackBar.prototype._attach = function(content, userConfig) {
                var config = Object(tslib_es6.a)({}, new MatSnackBarConfig(), this._defaultConfig, userConfig), overlayRef = this._createOverlay(config), container = this._attachSnackBarContainer(overlayRef, config), snackBarRef = new snack_bar_es5_MatSnackBarRef(container, overlayRef);
                if (content instanceof core.O) {
                    var portal = new portal_es5.h(content, null, {
                        $implicit: config.data,
                        snackBarRef: snackBarRef
                    });
                    snackBarRef.instance = container.attachTemplatePortal(portal);
                } else {
                    var injector = this._createInjector(config, snackBarRef), contentRef = (portal = new portal_es5.d(content, void 0, injector), 
                    container.attachComponentPortal(portal));
                    snackBarRef.instance = contentRef.instance;
                }
                return this._breakpointObserver.observe("(max-width: 599px) and (orientation: portrait), (max-width: 959px) and (orientation: landscape)").pipe(Object(takeUntil.a)(overlayRef.detachments().pipe(Object(take.a)(1)))).subscribe(function(state$$1) {
                    state$$1.matches ? overlayRef.overlayElement.classList.add("mat-snack-bar-handset") : overlayRef.overlayElement.classList.remove("mat-snack-bar-handset");
                }), this._animateSnackBar(snackBarRef, config), this._openedSnackBarRef = snackBarRef, 
                this._openedSnackBarRef;
            }, MatSnackBar.prototype._animateSnackBar = function(snackBarRef, config) {
                var _this = this;
                snackBarRef.afterDismissed().subscribe(function() {
                    _this._openedSnackBarRef == snackBarRef && (_this._openedSnackBarRef = null);
                }), this._openedSnackBarRef ? (this._openedSnackBarRef.afterDismissed().subscribe(function() {
                    snackBarRef.containerInstance.enter();
                }), this._openedSnackBarRef.dismiss()) : snackBarRef.containerInstance.enter(), 
                config.duration && config.duration > 0 && snackBarRef.afterOpened().subscribe(function() {
                    return snackBarRef._dismissAfter(config.duration);
                }), config.announcementMessage && this._live.announce(config.announcementMessage, config.politeness);
            }, MatSnackBar.prototype._createOverlay = function(config) {
                var overlayConfig = new overlay_es5.b();
                overlayConfig.direction = config.direction;
                var positionStrategy = this._overlay.position().global(), isRtl = "rtl" === config.direction, isLeft = "left" === config.horizontalPosition || "start" === config.horizontalPosition && !isRtl || "end" === config.horizontalPosition && isRtl, isRight = !isLeft && "center" !== config.horizontalPosition;
                return isLeft ? positionStrategy.left("0") : isRight ? positionStrategy.right("0") : positionStrategy.centerHorizontally(), 
                "top" === config.verticalPosition ? positionStrategy.top("0") : positionStrategy.bottom("0"), 
                overlayConfig.positionStrategy = positionStrategy, this._overlay.create(overlayConfig);
            }, MatSnackBar.prototype._createInjector = function(config, snackBarRef) {
                return new portal_es5.f(config && config.viewContainerRef && config.viewContainerRef.injector || this._injector, new WeakMap([ [ snack_bar_es5_MatSnackBarRef, snackBarRef ], [ MAT_SNACK_BAR_DATA, config.data ] ]));
            }, MatSnackBar.ngInjectableDef = Object(core.V)({
                factory: function() {
                    return new MatSnackBar(Object(core.Y)(overlay_es5.a), Object(core.Y)(a11y_es5.f), Object(core.Y)(core.o), Object(core.Y)(layout_es5_BreakpointObserver), Object(core.Y)(MatSnackBar, 12), Object(core.Y)(MAT_SNACK_BAR_DEFAULT_OPTIONS));
                },
                token: MatSnackBar,
                providedIn: MatSnackBarModule
            }), MatSnackBar;
        }();
    },
    vVVL: function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return PrettyPrinter;
        });
        var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0/uQ"), rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("S1nX"), rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("67Y/"), rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("P6uZ"), PrettyPrinter = function() {
            function PrettyPrinter(logger) {
                this.logger = logger, this.prettyPrintOne = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__.a)(this.getPrettyPrintOne()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.a)());
            }
            return PrettyPrinter.prototype.getPrettyPrintOne = function() {
                var _this = this, ppo = window.prettyPrintOne;
                return ppo ? Promise.resolve(ppo) : __webpack_require__.e(14).then(__webpack_require__.t.bind(null, "Ue1H", 7)).then(function() {
                    return window.prettyPrintOne;
                }, function(err) {
                    var msg = "Cannot get prettify.js from server: " + err.message;
                    return _this.logger.error(new Error(msg)), function() {
                        throw new Error(msg);
                    };
                });
            }, PrettyPrinter.prototype.formatCode = function(code, language, linenums) {
                return this.prettyPrintOne.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.a)(function(ppo) {
                    try {
                        return ppo(code, language, linenums);
                    } catch (err) {
                        var msg = "Could not format code that begins '" + code.substr(0, 50) + "...'.";
                        throw console.error(msg, err), new Error(msg);
                    }
                }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.a)());
            }, PrettyPrinter;
        }();
    },
    xYTU: function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return MatSnackBarContainerNgFactory;
        }), __webpack_require__.d(__webpack_exports__, "b", function() {
            return SimpleSnackBarNgFactory;
        });
        var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("CcnG"), _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("vARd"), _angular_common__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_require__("eDkP"), 
        __webpack_require__("Ip0R")), _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_require__("Fzqc"), 
        __webpack_require__("4c35")), _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("dWZg"), _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = (__webpack_require__("qAlS"), 
        __webpack_require__("Wf4p"), __webpack_require__("ZYjt"), __webpack_require__("UodH")), _button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("bujt"), _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("lLAP"), _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("wFw1"), RenderType_MatSnackBarContainer = _angular_core__WEBPACK_IMPORTED_MODULE_0__.rb({
            encapsulation: 2,
            styles: [ ".mat-snack-bar-container{border-radius:4px;box-sizing:border-box;display:block;margin:24px;max-width:33vw;min-width:344px;padding:14px 16px;min-height:48px;transform-origin:center}@media screen and (-ms-high-contrast:active){.mat-snack-bar-container{border:solid 1px}}.mat-snack-bar-handset{width:100%}.mat-snack-bar-handset .mat-snack-bar-container{margin:8px;max-width:100%;width:100%}" ],
            data: {
                animation: [ {
                    type: 7,
                    name: "state",
                    definitions: [ {
                        type: 0,
                        name: "void, hidden",
                        styles: {
                            type: 6,
                            styles: {
                                transform: "scale(0.8)",
                                opacity: 0
                            },
                            offset: null
                        },
                        options: void 0
                    }, {
                        type: 0,
                        name: "visible",
                        styles: {
                            type: 6,
                            styles: {
                                transform: "scale(1)",
                                opacity: 1
                            },
                            offset: null
                        },
                        options: void 0
                    }, {
                        type: 1,
                        expr: "* => visible",
                        animation: {
                            type: 4,
                            styles: null,
                            timings: "150ms cubic-bezier(0, 0, 0.2, 1)"
                        },
                        options: null
                    }, {
                        type: 1,
                        expr: "* => void, * => hidden",
                        animation: {
                            type: 4,
                            styles: {
                                type: 6,
                                styles: {
                                    opacity: 0
                                },
                                offset: null
                            },
                            timings: "75ms cubic-bezier(0.4, 0.0, 1, 1)"
                        },
                        options: null
                    } ],
                    options: {}
                } ]
            }
        });
        function View_MatSnackBarContainer_1(_l) {
            return _angular_core__WEBPACK_IMPORTED_MODULE_0__.Ob(0, [ (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__.ib(0, null, null, 0)) ], null, null);
        }
        function View_MatSnackBarContainer_0(_l) {
            return _angular_core__WEBPACK_IMPORTED_MODULE_0__.Ob(2, [ _angular_core__WEBPACK_IMPORTED_MODULE_0__.Kb(402653184, 1, {
                _portalOutlet: 0
            }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__.ib(16777216, null, null, 1, null, View_MatSnackBarContainer_1)), _angular_core__WEBPACK_IMPORTED_MODULE_0__.tb(2, 212992, [ [ 1, 4 ] ], 0, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_5__.c, [ _angular_core__WEBPACK_IMPORTED_MODULE_0__.j, _angular_core__WEBPACK_IMPORTED_MODULE_0__.R ], {
                portal: [ 0, "portal" ]
            }, null) ], function(_ck, _v) {
                _ck(_v, 2, 0, "");
            }, null);
        }
        function View_MatSnackBarContainer_Host_0(_l) {
            return _angular_core__WEBPACK_IMPORTED_MODULE_0__.Ob(0, [ (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__.ub(0, 0, null, null, 1, "snack-bar-container", [ [ "class", "mat-snack-bar-container" ], [ "role", "alert" ] ], [ [ 40, "@state", 0 ] ], [ [ "component", "@state.done" ] ], function(_v, en, $event) {
                var ad = !0;
                return "component:@state.done" === en && (ad = !1 !== _angular_core__WEBPACK_IMPORTED_MODULE_0__.Gb(_v, 1).onAnimationEnd($event) && ad), 
                ad;
            }, View_MatSnackBarContainer_0, RenderType_MatSnackBarContainer)), _angular_core__WEBPACK_IMPORTED_MODULE_0__.tb(1, 180224, null, 0, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_1__.d, [ _angular_core__WEBPACK_IMPORTED_MODULE_0__.A, _angular_core__WEBPACK_IMPORTED_MODULE_0__.k, _angular_core__WEBPACK_IMPORTED_MODULE_0__.h, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_1__.c ], null, null) ], null, function(_ck, _v) {
                _ck(_v, 0, 0, _angular_core__WEBPACK_IMPORTED_MODULE_0__.Gb(_v, 1)._animationState);
            });
        }
        var MatSnackBarContainerNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__.pb("snack-bar-container", _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_1__.d, View_MatSnackBarContainer_Host_0, {}, {}, []), RenderType_SimpleSnackBar = _angular_core__WEBPACK_IMPORTED_MODULE_0__.rb({
            encapsulation: 2,
            styles: [ ".mat-simple-snackbar{display:flex;justify-content:space-between;align-items:center;height:100%;line-height:20px;opacity:1}.mat-simple-snackbar-action{flex-shrink:0;margin:-8px -8px -8px 8px}.mat-simple-snackbar-action button{max-height:36px;min-width:0}[dir=rtl] .mat-simple-snackbar-action{margin-left:-8px;margin-right:8px}" ],
            data: {}
        });
        function View_SimpleSnackBar_1(_l) {
            return _angular_core__WEBPACK_IMPORTED_MODULE_0__.Ob(0, [ (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__.ub(0, 0, null, null, 3, "div", [ [ "class", "mat-simple-snackbar-action" ] ], null, null, null, null, null)), (_l()(), 
            _angular_core__WEBPACK_IMPORTED_MODULE_0__.ub(1, 0, null, null, 2, "button", [ [ "mat-button", "" ] ], [ [ 8, "disabled", 0 ], [ 2, "_mat-animation-noopable", null ] ], [ [ null, "click" ] ], function(_v, en, $event) {
                var ad = !0;
                return "click" === en && (ad = !1 !== _v.component.action() && ad), ad;
            }, _button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_11__.b, _button_typings_index_ngfactory__WEBPACK_IMPORTED_MODULE_11__.a)), _angular_core__WEBPACK_IMPORTED_MODULE_0__.tb(2, 180224, null, 0, _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.b, [ _angular_core__WEBPACK_IMPORTED_MODULE_0__.k, _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_6__.a, _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_12__.d, [ 2, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_13__.a ] ], null, null), (_l()(), 
            _angular_core__WEBPACK_IMPORTED_MODULE_0__.Mb(3, 0, [ "", "" ])) ], null, function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 1, 0, _angular_core__WEBPACK_IMPORTED_MODULE_0__.Gb(_v, 2).disabled || null, "NoopAnimations" === _angular_core__WEBPACK_IMPORTED_MODULE_0__.Gb(_v, 2)._animationMode), 
                _ck(_v, 3, 0, _co.data.action);
            });
        }
        function View_SimpleSnackBar_0(_l) {
            return _angular_core__WEBPACK_IMPORTED_MODULE_0__.Ob(2, [ (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__.ub(0, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), 
            _angular_core__WEBPACK_IMPORTED_MODULE_0__.Mb(1, null, [ "", "" ])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__.ib(16777216, null, null, 1, null, View_SimpleSnackBar_1)), _angular_core__WEBPACK_IMPORTED_MODULE_0__.tb(3, 16384, null, 0, _angular_common__WEBPACK_IMPORTED_MODULE_3__.k, [ _angular_core__WEBPACK_IMPORTED_MODULE_0__.R, _angular_core__WEBPACK_IMPORTED_MODULE_0__.O ], {
                ngIf: [ 0, "ngIf" ]
            }, null) ], function(_ck, _v) {
                _ck(_v, 3, 0, _v.component.hasAction);
            }, function(_ck, _v) {
                _ck(_v, 1, 0, _v.component.data.message);
            });
        }
        function View_SimpleSnackBar_Host_0(_l) {
            return _angular_core__WEBPACK_IMPORTED_MODULE_0__.Ob(0, [ (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_0__.ub(0, 0, null, null, 1, "simple-snack-bar", [ [ "class", "mat-simple-snackbar" ] ], null, null, null, View_SimpleSnackBar_0, RenderType_SimpleSnackBar)), _angular_core__WEBPACK_IMPORTED_MODULE_0__.tb(1, 49152, null, 0, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_1__.g, [ _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_1__.f, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_1__.a ], null, null) ], null, null);
        }
        var SimpleSnackBarNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__.pb("simple-snack-bar", _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_1__.g, View_SimpleSnackBar_Host_0, {}, {}, []);
    }
} ]);
//# sourceMappingURL=default~code-code-example-module-ngfactory~code-code-tabs-module-ngfactory.3b1385d423abe2a113d3.js.map
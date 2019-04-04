(window.webpackJsonp = window.webpackJsonp || []).push([ [ 5 ], {
    kF7p: function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var core = __webpack_require__("CcnG"), common = __webpack_require__("Ip0R"), code_component = __webpack_require__("6CTB"), core_es5 = __webpack_require__("Wf4p");
        const _c12 = [ 1, "mat-card" ], _c13 = [ [ [ "mat-card-footer" ] ] ], _c14 = [ "mat-card-footer" ];
        var card_es5_MatCard = function() {
            function MatCard() {}
            return MatCard.ngComponentDef = core.Gb({
                type: MatCard,
                selectors: [ [ "mat-card" ] ],
                factory: function(t) {
                    return new (t || MatCard)();
                },
                hostBindings: function(rf, ctx, elIndex) {
                    1 & rf && core.Rb(_c12);
                },
                exportAs: [ "matCard" ],
                ngContentSelectors: _c14,
                consts: 2,
                vars: 0,
                template: function(rf, ctx) {
                    1 & rf && (core.vc(_c13, _c14), core.uc(0), core.uc(1, 1));
                },
                styles: [ ".mat-card{transition:box-shadow 280ms cubic-bezier(.4,0,.2,1);display:block;position:relative;padding:16px;border-radius:4px}.mat-card .mat-divider-horizontal{position:absolute;left:0;width:100%}[dir=rtl] .mat-card .mat-divider-horizontal{left:auto;right:0}.mat-card .mat-divider-horizontal.mat-divider-inset{position:static;margin:0}[dir=rtl] .mat-card .mat-divider-horizontal.mat-divider-inset{margin-right:0}@media screen and (-ms-high-contrast:active){.mat-card{outline:solid 1px}}.mat-card-actions,.mat-card-content,.mat-card-subtitle{display:block;margin-bottom:16px}.mat-card-title{display:block;margin-bottom:8px}.mat-card-actions{margin-left:-8px;margin-right:-8px;padding:8px 0}.mat-card-actions-align-end{display:flex;justify-content:flex-end}.mat-card-image{width:calc(100% + 32px);margin:0 -16px 16px -16px}.mat-card-footer{display:block;margin:0 -16px -16px -16px}.mat-card-actions .mat-button,.mat-card-actions .mat-raised-button{margin:0 8px}.mat-card-header{display:flex;flex-direction:row}.mat-card-header .mat-card-title{margin-bottom:12px}.mat-card-header-text{margin:0 16px}.mat-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-card-title-group{display:flex;justify-content:space-between}.mat-card-sm-image{width:80px;height:80px}.mat-card-md-image{width:112px;height:112px}.mat-card-lg-image{width:152px;height:152px}.mat-card-xl-image{width:240px;height:240px;margin:-8px}.mat-card-title-group>.mat-card-xl-image{margin:-8px 0 8px 0}@media (max-width:599px){.mat-card-title-group{margin:0}.mat-card-xl-image{margin-left:0;margin-right:0}}.mat-card-content>:first-child,.mat-card>:first-child{margin-top:0}.mat-card-content>:last-child:not(.mat-card-footer),.mat-card>:last-child:not(.mat-card-footer){margin-bottom:0}.mat-card-image:first-child{margin-top:-16px;border-top-left-radius:inherit;border-top-right-radius:inherit}.mat-card>.mat-card-actions:last-child{margin-bottom:-8px;padding-bottom:0}.mat-card-actions .mat-button:first-child,.mat-card-actions .mat-raised-button:first-child{margin-left:0;margin-right:0}.mat-card-title{margin-bottom:8px}.mat-card-subtitle:not(:first-child),.mat-card-title:not(:first-child){margin-top:-4px}.mat-card-header .mat-card-subtitle:not(:first-child){margin-top:-8px}.mat-card>.mat-card-xl-image:first-child{margin-top:-8px}.mat-card>.mat-card-xl-image:last-child{margin-bottom:-8px}" ],
                encapsulation: 2,
                changeDetection: 0
            }), MatCard;
        }(), card_es5_MatCardModule = function() {
            function MatCardModule() {}
            return MatCardModule.ngModuleDef = core.Ib({
                type: MatCardModule
            }), MatCardModule.ngInjectorDef = core.jb({
                factory: function(t) {
                    return new (t || MatCardModule)();
                },
                imports: [ [ core_es5.b ], core_es5.b ]
            }), MatCardModule;
        }(), observers_es5 = __webpack_require__("M2Lx"), a11y_es5 = __webpack_require__("lLAP"), portal_es5 = __webpack_require__("4c35"), tslib_es6 = __webpack_require__("mrSG"), Subject = __webpack_require__("K9Ia"), Subscription = __webpack_require__("pugT"), of = __webpack_require__("F/XL"), merge = __webpack_require__("p0ib"), animations = __webpack_require__("ihYY"), bidi_es5 = __webpack_require__("Fzqc"), startWith = __webpack_require__("p0Sj"), takeUntil = __webpack_require__("ny24"), coercion_es5 = __webpack_require__("n6gG"), keycodes_es5 = __webpack_require__("YSh2"), scrolling_es5 = __webpack_require__("qAlS");
        __webpack_require__("dWZg");
        const tabs_es5_c0 = [ 1, "mat-ink-bar" ];
        function MatTab_ng_template_0_Template(rf, ctx) {
            1 & rf && core.uc(0);
        }
        const tabs_es5_c1 = [], tabs_es5_c2 = [ 1, "mat-tab-body" ], tabs_es5_c3 = [ 1, "mat-tab-body-content", 3 ], tabs_es5_c4 = [ "content", "" ], tabs_es5_c5 = [ "matTabBodyHost", "" ];
        function MatTabBody_ng_template_2_Template(rf, ctx) {}
        const tabs_es5_c6 = [ "mat-tab-disabled" ], tabs_es5_c7 = [ "tabListContainer" ], tabs_es5_c8 = [ "tabList" ], tabs_es5_c9 = [ 1, "mat-tab-header" ], tabs_es5_c10 = [ "mat-tab-header-pagination-controls-enabled", "mat-tab-header-rtl" ], tabs_es5_c11 = [ "aria-hidden", "true", "mat-ripple", "", 1, "mat-tab-header-pagination", "mat-tab-header-pagination-before", "mat-elevation-z4", 3, "matRippleDisabled", "click" ], tabs_es5_c12 = [ 1, "mat-tab-header-pagination-chevron" ], tabs_es5_c13 = [ 1, "mat-tab-label-container", 3, "keydown" ], tabs_es5_c14 = [ "tabListContainer", "" ], tabs_es5_c15 = [ "role", "tablist", 1, "mat-tab-list", 3, "cdkObserveContent" ], tabs_es5_c16 = [ "tabList", "" ], tabs_es5_c17 = [ 1, "mat-tab-labels" ], tabs_es5_c18 = [ "aria-hidden", "true", "mat-ripple", "", 1, "mat-tab-header-pagination", "mat-tab-header-pagination-after", "mat-elevation-z4", 3, "matRippleDisabled", "click" ], tabs_es5_c19 = [ "mat-tab-header-pagination-disabled" ], tabs_es5_c20 = [ "tabBodyWrapper" ], tabs_es5_c21 = [ "tabHeader" ], _c22 = [ 1, "mat-tab-group" ], _c23 = [ "mat-tab-group-dynamic-height", "mat-tab-group-inverted-header" ], _c24 = [ 3, "selectedIndex", "disableRipple", "indexFocused", "selectFocusedIndex" ], _c25 = [ "tabHeader", "" ], _c26 = [ "class", "mat-tab-label", "role", "tab", "matTabLabelWrapper", "", "mat-ripple", "", "cdkMonitorElementFocus", "", 3, "id", "tabIndex", "aria-posinset", "aria-setsize", "aria-controls", "aria-selected", "aria-label", "aria-labelledby", "mat-tab-label-active", "disabled", "matRippleDisabled", "click", 4, "ngFor", "ngForOf" ], _c27 = [ 1, "mat-tab-body-wrapper" ], _c28 = [ "tabBodyWrapper", "" ], _c29 = [ "role", "tabpanel", 3, "id", "aria-labelledby", "mat-tab-body-active", "content", "position", "origin", "_onCentered", "_onCentering", 4, "ngFor", "ngForOf" ], _c30 = [ "role", "tab", "matTabLabelWrapper", "", "mat-ripple", "", "cdkMonitorElementFocus", "", 1, "mat-tab-label", 3, "id", "tabIndex", "aria-posinset", "aria-setsize", "aria-controls", "aria-selected", "aria-label", "aria-labelledby", "disabled", "matRippleDisabled", "click" ], _c31 = [ 1, "mat-tab-label-content" ], _c32 = [ 3, "ngIf" ], _c33 = [ 3, "cdkPortalOutlet" ];
        function MatTabGroup_div_2_ng_template_2_ng_template_0_Template(rf, ctx) {}
        function MatTabGroup_div_2_ng_template_2_Template(rf, ctx) {
            if (1 & rf && core.Ic(0, MatTabGroup_div_2_ng_template_2_ng_template_0_Template, 0, 0, "ng-template", _c33), 
            2 & rf) {
                const tab_r348 = core.rc().$implicit;
                core.Ec(0), core.Xb(0, "cdkPortalOutlet", core.Bb(tab_r348.templateLabel));
            }
        }
        function MatTabGroup_div_2_ng_template_3_Template(rf, ctx) {
            if (1 & rf && core.Kc(0), 2 & rf) {
                const tab_r348 = core.rc().$implicit;
                core.Ec(0), core.Lc(0, core.hc("", tab_r348.textLabel, ""));
            }
        }
        const _c34 = [ "mat-tab-label-active" ];
        function MatTabGroup_div_2_Template(rf, ctx) {
            if (1 & rf) {
                const _r356 = core.dc();
                core.Yb(0, "div", _c30), core.ac(_c34), core.mc("click", function($event) {
                    core.Bc(_r356);
                    const tab_r348 = ctx.$implicit, i_r349 = ctx.index, ctx_r355 = core.rc(), _r344 = core.yc(1);
                    return ctx_r355._handleClick(tab_r348, _r344, i_r349);
                }), core.Yb(1, "div", _c31), core.Ic(2, MatTabGroup_div_2_ng_template_2_Template, 1, 1, "ng-template", _c32), 
                core.Ic(3, MatTabGroup_div_2_ng_template_3_Template, 1, 1, "ng-template", _c32), 
                core.Qb(), core.Qb();
            }
            if (2 & rf) {
                const tab_r348 = ctx.$implicit, i_r349 = ctx.index, ctx_r345 = core.rc();
                core.Nb(0, 0, ctx_r345.selectedIndex == i_r349), core.bc(0), core.Ec(0), core.Xb(0, "id", core.Bb(ctx_r345._getTabLabelId(i_r349))), 
                core.Mb(0, "tabIndex", core.Bb(ctx_r345._getTabIndex(tab_r348, i_r349))), core.Mb(0, "aria-posinset", core.Bb(i_r349 + 1)), 
                core.Mb(0, "aria-setsize", core.Bb(ctx_r345._tabs.length)), core.Mb(0, "aria-controls", core.Bb(ctx_r345._getTabContentId(i_r349))), 
                core.Mb(0, "aria-selected", core.Bb(ctx_r345.selectedIndex == i_r349)), core.Mb(0, "aria-label", core.Bb(tab_r348.ariaLabel || null)), 
                core.Mb(0, "aria-labelledby", core.Bb(!tab_r348.ariaLabel && tab_r348.ariaLabelledby ? tab_r348.ariaLabelledby : null)), 
                core.Xb(0, "disabled", core.Bb(tab_r348.disabled)), core.Xb(0, "matRippleDisabled", core.Bb(tab_r348.disabled || ctx_r345.disableRipple)), 
                core.Ec(2), core.Xb(2, "ngIf", core.Bb(tab_r348.templateLabel)), core.Ec(3), core.Xb(3, "ngIf", core.Bb(!tab_r348.templateLabel));
            }
        }
        const _c35 = [ "role", "tabpanel", 3, "id", "aria-labelledby", "content", "position", "origin", "_onCentered", "_onCentering" ], _c36 = [ "mat-tab-body-active" ];
        function MatTabGroup_mat_tab_body_5_Template(rf, ctx) {
            if (1 & rf) {
                const _r360 = core.dc();
                core.Yb(0, "mat-tab-body", _c35), core.ac(_c36), core.mc("_onCentered", function($event) {
                    return core.Bc(_r360), core.rc()._removeTabBodyWrapperHeight();
                }), core.mc("_onCentering", function($event) {
                    return core.Bc(_r360), core.rc()._setTabBodyWrapperHeight($event);
                }), core.Qb();
            }
            if (2 & rf) {
                const tab_r357 = ctx.$implicit, i_r358 = ctx.index, ctx_r347 = core.rc();
                core.Nb(0, 0, ctx_r347.selectedIndex == i_r358), core.bc(0), core.Ec(0), core.Xb(0, "id", core.Bb(ctx_r347._getTabContentId(i_r358))), 
                core.Mb(0, "aria-labelledby", core.Bb(ctx_r347._getTabLabelId(i_r358))), core.Xb(0, "content", core.Bb(tab_r357.content)), 
                core.Xb(0, "position", core.Bb(tab_r357.position)), core.Xb(0, "origin", core.Bb(tab_r357.origin));
            }
        }
        var _MAT_INK_BAR_POSITIONER = new core.z("MatInkBarPositioner", {
            providedIn: "root",
            factory: function() {
                return function(element) {
                    return {
                        left: element ? (element.offsetLeft || 0) + "px" : "0",
                        width: element ? (element.offsetWidth || 0) + "px" : "0"
                    };
                };
            }
        }), tabs_es5_MatInkBar = function() {
            function MatInkBar(_elementRef, _ngZone, _inkBarPositioner) {
                this._elementRef = _elementRef, this._ngZone = _ngZone, this._inkBarPositioner = _inkBarPositioner;
            }
            return MatInkBar.prototype.alignToElement = function(element) {
                var _this = this;
                this.show(), "undefined" != typeof requestAnimationFrame ? this._ngZone.runOutsideAngular(function() {
                    requestAnimationFrame(function() {
                        return _this._setStyles(element);
                    });
                }) : this._setStyles(element);
            }, MatInkBar.prototype.show = function() {
                this._elementRef.nativeElement.style.visibility = "visible";
            }, MatInkBar.prototype.hide = function() {
                this._elementRef.nativeElement.style.visibility = "hidden";
            }, MatInkBar.prototype._setStyles = function(element) {
                var positions = this._inkBarPositioner(element), inkBar = this._elementRef.nativeElement;
                inkBar.style.left = positions.left, inkBar.style.width = positions.width;
            }, MatInkBar.ngDirectiveDef = core.Hb({
                type: MatInkBar,
                selectors: [ [ "mat-ink-bar" ] ],
                factory: function(t) {
                    return new (t || MatInkBar)(core.Kb(core.q), core.Kb(core.K), core.Kb(_MAT_INK_BAR_POSITIONER));
                },
                hostBindings: function(rf, ctx, elIndex) {
                    1 & rf && core.Rb(tabs_es5_c0);
                }
            }), MatInkBar;
        }(), tabs_es5_MatTabContent = function() {
            function MatTabContent(template) {
                this.template = template;
            }
            return MatTabContent.ngDirectiveDef = core.Hb({
                type: MatTabContent,
                selectors: [ [ "", "matTabContent", "" ] ],
                factory: function(t) {
                    return new (t || MatTabContent)(core.Kb(core.Z));
                }
            }), MatTabContent;
        }(), tabs_es5_MatTabLabel = function(_super) {
            function MatTabLabel() {
                return null !== _super && _super.apply(this, arguments) || this;
            }
            Object(tslib_es6.c)(MatTabLabel, _super), MatTabLabel.ngDirectiveDef = core.Hb({
                type: MatTabLabel,
                selectors: [ [ "", "mat-tab-label", "" ], [ "", "matTabLabel", "" ] ],
                factory: function(t) {
                    return \u0275MatTabLabel_BaseFactory(t || MatTabLabel);
                },
                features: [ core.tb ]
            });
            const \u0275MatTabLabel_BaseFactory = core.ec(MatTabLabel);
            return MatTabLabel;
        }(portal_es5.b), MatTabBase = function() {
            return function() {};
        }(), tabs_es5_MatTab = function(_super) {
            function MatTab(_viewContainerRef) {
                var _this = _super.call(this) || this;
                return _this._viewContainerRef = _viewContainerRef, _this.textLabel = "", _this._contentPortal = null, 
                _this._stateChanges = new Subject.a(), _this.position = null, _this.origin = null, 
                _this.isActive = !1, _this;
            }
            return Object(tslib_es6.c)(MatTab, _super), Object.defineProperty(MatTab.prototype, "content", {
                get: function() {
                    return this._contentPortal;
                },
                enumerable: !0,
                configurable: !0
            }), MatTab.prototype.ngOnChanges = function(changes) {
                (changes.hasOwnProperty("textLabel") || changes.hasOwnProperty("disabled")) && this._stateChanges.next();
            }, MatTab.prototype.ngOnDestroy = function() {
                this._stateChanges.complete();
            }, MatTab.prototype.ngOnInit = function() {
                this._contentPortal = new portal_es5.i(this._explicitContent || this._implicitContent, this._viewContainerRef);
            }, MatTab.ngComponentDef = core.Gb({
                type: MatTab,
                selectors: [ [ "mat-tab" ] ],
                factory: function(t) {
                    return new (t || MatTab)(core.Kb(core.eb));
                },
                contentQueries: function(rf, ctx, dirIndex) {
                    var _t;
                    1 & rf && (core.Eb(dirIndex, tabs_es5_MatTabLabel, !0, null), core.Eb(dirIndex, tabs_es5_MatTabContent, !0, core.Z)), 
                    2 & rf && (core.xc(_t = core.nc()) && (ctx.templateLabel = _t.first), core.xc(_t = core.nc()) && (ctx._explicitContent = _t.first));
                },
                viewQuery: function(rf, ctx) {
                    var _t;
                    1 & rf && core.Mc(core.Z, !0, null), 2 & rf && core.xc(_t = core.oc()) && (ctx._implicitContent = _t.first);
                },
                inputs: {
                    disabled: "disabled",
                    textLabel: [ "label", "textLabel" ],
                    ariaLabel: [ "aria-label", "ariaLabel" ],
                    ariaLabelledby: [ "aria-labelledby", "ariaLabelledby" ]
                },
                exportAs: [ "matTab" ],
                features: [ core.tb, core.vb() ],
                ngContentSelectors: tabs_es5_c1,
                consts: 1,
                vars: 0,
                template: function(rf, ctx) {
                    1 & rf && (core.vc(), core.Ic(0, MatTab_ng_template_0_Template, 1, 0, "ng-template"));
                },
                encapsulation: 2,
                changeDetection: 0
            }), MatTab;
        }(Object(core_es5.h)(MatTabBase)), matTabsAnimations = {
            translateTab: Object(animations.j)("translateTab", [ Object(animations.g)("center, void, left-origin-center, right-origin-center", Object(animations.h)({
                transform: "none"
            })), Object(animations.g)("left", Object(animations.h)({
                transform: "translate3d(-100%, 0, 0)",
                minHeight: "1px"
            })), Object(animations.g)("right", Object(animations.h)({
                transform: "translate3d(100%, 0, 0)",
                minHeight: "1px"
            })), Object(animations.i)("* => left, * => right, left => center, right => center", Object(animations.e)("500ms cubic-bezier(0.35, 0, 0.25, 1)")), Object(animations.i)("void => left-origin-center", [ Object(animations.h)({
                transform: "translate3d(-100%, 0, 0)"
            }), Object(animations.e)("500ms cubic-bezier(0.35, 0, 0.25, 1)") ]), Object(animations.i)("void => right-origin-center", [ Object(animations.h)({
                transform: "translate3d(100%, 0, 0)"
            }), Object(animations.e)("500ms cubic-bezier(0.35, 0, 0.25, 1)") ]) ])
        }, tabs_es5_MatTabBodyPortal = function(_super) {
            function MatTabBodyPortal(componentFactoryResolver, viewContainerRef, _host) {
                var _this = _super.call(this, componentFactoryResolver, viewContainerRef) || this;
                return _this._host = _host, _this._centeringSub = Subscription.a.EMPTY, _this._leavingSub = Subscription.a.EMPTY, 
                _this;
            }
            return Object(tslib_es6.c)(MatTabBodyPortal, _super), MatTabBodyPortal.prototype.ngOnInit = function() {
                var _this = this;
                _super.prototype.ngOnInit.call(this), this._centeringSub = this._host._beforeCentering.pipe(Object(startWith.a)(this._host._isCenterPosition(this._host._position))).subscribe(function(isCentering) {
                    isCentering && !_this.hasAttached() && _this.attach(_this._host._content);
                }), this._leavingSub = this._host._afterLeavingCenter.subscribe(function() {
                    _this.detach();
                });
            }, MatTabBodyPortal.prototype.ngOnDestroy = function() {
                _super.prototype.ngOnDestroy.call(this), this._centeringSub.unsubscribe(), this._leavingSub.unsubscribe();
            }, MatTabBodyPortal.ngDirectiveDef = core.Hb({
                type: MatTabBodyPortal,
                selectors: [ [ "", "matTabBodyHost", "" ] ],
                factory: function(t) {
                    return new (t || MatTabBodyPortal)(core.Kb(core.m), core.Kb(core.eb), core.Kb(Object(core.lb)(function() {
                        return tabs_es5_MatTabBody;
                    })));
                },
                features: [ core.tb ]
            }), MatTabBodyPortal;
        }(portal_es5.c), tabs_es5_MatTabBody = function() {
            function MatTabBody(_elementRef, _dir, changeDetectorRef) {
                var _this = this;
                this._elementRef = _elementRef, this._dir = _dir, this._dirChangeSubscription = Subscription.a.EMPTY, 
                this._onCentering = new core.s(), this._beforeCentering = new core.s(), this._afterLeavingCenter = new core.s(), 
                this._onCentered = new core.s(!0), this._dir && changeDetectorRef && (this._dirChangeSubscription = this._dir.change.subscribe(function(dir) {
                    _this._computePositionAnimationState(dir), changeDetectorRef.markForCheck();
                }));
            }
            return Object.defineProperty(MatTabBody.prototype, "position", {
                set: function(position) {
                    this._positionIndex = position, this._computePositionAnimationState();
                },
                enumerable: !0,
                configurable: !0
            }), MatTabBody.prototype.ngOnInit = function() {
                "center" == this._position && null != this.origin && (this._position = this._computePositionFromOrigin());
            }, MatTabBody.prototype.ngOnDestroy = function() {
                this._dirChangeSubscription.unsubscribe();
            }, MatTabBody.prototype._onTranslateTabStarted = function(e) {
                var isCentering = this._isCenterPosition(e.toState);
                this._beforeCentering.emit(isCentering), isCentering && this._onCentering.emit(this._elementRef.nativeElement.clientHeight);
            }, MatTabBody.prototype._onTranslateTabComplete = function(e) {
                this._isCenterPosition(e.toState) && this._isCenterPosition(this._position) && this._onCentered.emit(), 
                this._isCenterPosition(e.fromState) && !this._isCenterPosition(this._position) && this._afterLeavingCenter.emit();
            }, MatTabBody.prototype._getLayoutDirection = function() {
                return this._dir && "rtl" === this._dir.value ? "rtl" : "ltr";
            }, MatTabBody.prototype._isCenterPosition = function(position) {
                return "center" == position || "left-origin-center" == position || "right-origin-center" == position;
            }, MatTabBody.prototype._computePositionAnimationState = function(dir) {
                void 0 === dir && (dir = this._getLayoutDirection()), this._position = this._positionIndex < 0 ? "ltr" == dir ? "left" : "right" : this._positionIndex > 0 ? "ltr" == dir ? "right" : "left" : "center";
            }, MatTabBody.prototype._computePositionFromOrigin = function() {
                var dir = this._getLayoutDirection();
                return "ltr" == dir && this.origin <= 0 || "rtl" == dir && this.origin > 0 ? "left-origin-center" : "right-origin-center";
            }, MatTabBody.ngComponentDef = core.Gb({
                type: MatTabBody,
                selectors: [ [ "mat-tab-body" ] ],
                factory: function(t) {
                    return new (t || MatTabBody)(core.Kb(core.q), core.Kb(bidi_es5.b, 8), core.Kb(core.j));
                },
                viewQuery: function(rf, ctx) {
                    var _t;
                    1 & rf && core.Mc(portal_es5.f, !0, null), 2 & rf && core.xc(_t = core.oc()) && (ctx._portalHost = _t.first);
                },
                hostBindings: function(rf, ctx, elIndex) {
                    1 & rf && core.Rb(tabs_es5_c2);
                },
                inputs: {
                    position: "position",
                    _content: [ "content", "_content" ],
                    origin: "origin"
                },
                outputs: {
                    _onCentering: "_onCentering",
                    _beforeCentering: "_beforeCentering",
                    _afterLeavingCenter: "_afterLeavingCenter",
                    _onCentered: "_onCentered"
                },
                consts: 3,
                vars: 1,
                template: function(rf, ctx) {
                    1 & rf && (core.Yb(0, "div", tabs_es5_c3, tabs_es5_c4), core.mc("@translateTab.start", function($event) {
                        return ctx._onTranslateTabStarted($event);
                    }), core.mc("@translateTab.done", function($event) {
                        return ctx._onTranslateTabComplete($event);
                    }), core.Ic(2, MatTabBody_ng_template_2_Template, 0, 0, "ng-template", tabs_es5_c5), 
                    core.Qb()), 2 & rf && (core.Ec(0), core.Xb(0, "@translateTab", core.Bb(ctx._position)));
                },
                directives: [ tabs_es5_MatTabBodyPortal ],
                styles: [ ".mat-tab-body-content{height:100%;overflow:auto}.mat-tab-group-dynamic-height .mat-tab-body-content{overflow:hidden}" ],
                encapsulation: 2,
                data: {
                    animation: [ matTabsAnimations.translateTab ]
                },
                changeDetection: 0
            }), MatTabBody;
        }(), MatTabLabelWrapperBase = function() {
            return function() {};
        }(), tabs_es5_MatTabLabelWrapper = function(_super) {
            function MatTabLabelWrapper(elementRef) {
                var _this = _super.call(this) || this;
                return _this.elementRef = elementRef, _this;
            }
            return Object(tslib_es6.c)(MatTabLabelWrapper, _super), MatTabLabelWrapper.prototype.focus = function() {
                this.elementRef.nativeElement.focus();
            }, MatTabLabelWrapper.prototype.getOffsetLeft = function() {
                return this.elementRef.nativeElement.offsetLeft;
            }, MatTabLabelWrapper.prototype.getOffsetWidth = function() {
                return this.elementRef.nativeElement.offsetWidth;
            }, MatTabLabelWrapper.ngDirectiveDef = core.Hb({
                type: MatTabLabelWrapper,
                selectors: [ [ "", "matTabLabelWrapper", "" ] ],
                factory: function(t) {
                    return new (t || MatTabLabelWrapper)(core.Kb(core.q));
                },
                hostBindings: function(rf, ctx, elIndex) {
                    1 & rf && (core.Ab(1), core.Ub(tabs_es5_c6)), 2 & rf && (core.Mb(elIndex, "aria-disabled", core.Bb(!!ctx.disabled)), 
                    core.Sb(0, ctx.disabled), core.Vb());
                },
                inputs: {
                    disabled: "disabled"
                },
                features: [ core.tb ]
            }), MatTabLabelWrapper;
        }(Object(core_es5.h)(MatTabLabelWrapperBase)), MatTabHeaderBase = function() {
            return function() {};
        }(), tabs_es5_MatTabHeader = function(_super) {
            function MatTabHeader(_elementRef, _changeDetectorRef, _viewportRuler, _dir, _ngZone) {
                var _this = _super.call(this) || this;
                return _this._elementRef = _elementRef, _this._changeDetectorRef = _changeDetectorRef, 
                _this._viewportRuler = _viewportRuler, _this._dir = _dir, _this._ngZone = _ngZone, 
                _this._scrollDistance = 0, _this._selectedIndexChanged = !1, _this._destroyed = new Subject.a(), 
                _this._showPaginationControls = !1, _this._disableScrollAfter = !0, _this._disableScrollBefore = !0, 
                _this._selectedIndex = 0, _this.selectFocusedIndex = new core.s(), _this.indexFocused = new core.s(), 
                _this;
            }
            return Object(tslib_es6.c)(MatTabHeader, _super), Object.defineProperty(MatTabHeader.prototype, "selectedIndex", {
                get: function() {
                    return this._selectedIndex;
                },
                set: function(value) {
                    value = Object(coercion_es5.d)(value), this._selectedIndexChanged = this._selectedIndex != value, 
                    this._selectedIndex = value, this._keyManager && this._keyManager.updateActiveItemIndex(value);
                },
                enumerable: !0,
                configurable: !0
            }), MatTabHeader.prototype.ngAfterContentChecked = function() {
                this._tabLabelCount != this._labelWrappers.length && (this._updatePagination(), 
                this._tabLabelCount = this._labelWrappers.length, this._changeDetectorRef.markForCheck()), 
                this._selectedIndexChanged && (this._scrollToLabel(this._selectedIndex), this._checkScrollingControls(), 
                this._alignInkBarToSelectedTab(), this._selectedIndexChanged = !1, this._changeDetectorRef.markForCheck()), 
                this._scrollDistanceChanged && (this._updateTabScrollPosition(), this._scrollDistanceChanged = !1, 
                this._changeDetectorRef.markForCheck());
            }, MatTabHeader.prototype._handleKeydown = function(event) {
                switch (event.keyCode) {
                  case keycodes_es5.f:
                    this._keyManager.setFirstItemActive(), event.preventDefault();
                    break;

                  case keycodes_es5.c:
                    this._keyManager.setLastItemActive(), event.preventDefault();
                    break;

                  case keycodes_es5.d:
                  case keycodes_es5.j:
                    this.selectFocusedIndex.emit(this.focusIndex), event.preventDefault();
                    break;

                  default:
                    this._keyManager.onKeydown(event);
                }
            }, MatTabHeader.prototype.ngAfterContentInit = function() {
                var _this = this, dirChange = this._dir ? this._dir.change : Object(of.a)(null), resize = this._viewportRuler.change(150), realign = function() {
                    _this._updatePagination(), _this._alignInkBarToSelectedTab();
                };
                this._keyManager = new a11y_es5.c(this._labelWrappers).withHorizontalOrientation(this._getLayoutDirection()).withWrap(), 
                this._keyManager.updateActiveItem(0), "undefined" != typeof requestAnimationFrame ? requestAnimationFrame(realign) : realign(), 
                Object(merge.a)(dirChange, resize).pipe(Object(takeUntil.a)(this._destroyed)).subscribe(function() {
                    realign(), _this._keyManager.withHorizontalOrientation(_this._getLayoutDirection());
                }), this._keyManager.change.pipe(Object(takeUntil.a)(this._destroyed)).subscribe(function(newFocusIndex) {
                    _this.indexFocused.emit(newFocusIndex), _this._setTabFocus(newFocusIndex);
                });
            }, MatTabHeader.prototype.ngOnDestroy = function() {
                this._destroyed.next(), this._destroyed.complete();
            }, MatTabHeader.prototype._onContentChanges = function() {
                var _this = this, zoneCallback = function() {
                    _this._updatePagination(), _this._alignInkBarToSelectedTab(), _this._changeDetectorRef.markForCheck();
                };
                this._ngZone ? this._ngZone.run(zoneCallback) : zoneCallback();
            }, MatTabHeader.prototype._updatePagination = function() {
                this._checkPaginationEnabled(), this._checkScrollingControls(), this._updateTabScrollPosition();
            }, Object.defineProperty(MatTabHeader.prototype, "focusIndex", {
                get: function() {
                    return this._keyManager ? this._keyManager.activeItemIndex : 0;
                },
                set: function(value) {
                    this._isValidIndex(value) && this.focusIndex !== value && this._keyManager && this._keyManager.setActiveItem(value);
                },
                enumerable: !0,
                configurable: !0
            }), MatTabHeader.prototype._isValidIndex = function(index) {
                if (!this._labelWrappers) return !0;
                var tab = this._labelWrappers ? this._labelWrappers.toArray()[index] : null;
                return !!tab && !tab.disabled;
            }, MatTabHeader.prototype._setTabFocus = function(tabIndex) {
                if (this._showPaginationControls && this._scrollToLabel(tabIndex), this._labelWrappers && this._labelWrappers.length) {
                    this._labelWrappers.toArray()[tabIndex].focus();
                    var containerEl = this._tabListContainer.nativeElement, dir = this._getLayoutDirection();
                    containerEl.scrollLeft = "ltr" == dir ? 0 : containerEl.scrollWidth - containerEl.offsetWidth;
                }
            }, MatTabHeader.prototype._getLayoutDirection = function() {
                return this._dir && "rtl" === this._dir.value ? "rtl" : "ltr";
            }, MatTabHeader.prototype._updateTabScrollPosition = function() {
                var scrollDistance = this.scrollDistance, translateX = "ltr" === this._getLayoutDirection() ? -scrollDistance : scrollDistance;
                this._tabList.nativeElement.style.transform = "translateX(" + translateX + "px)";
            }, Object.defineProperty(MatTabHeader.prototype, "scrollDistance", {
                get: function() {
                    return this._scrollDistance;
                },
                set: function(v) {
                    this._scrollDistance = Math.max(0, Math.min(this._getMaxScrollDistance(), v)), this._scrollDistanceChanged = !0, 
                    this._checkScrollingControls();
                },
                enumerable: !0,
                configurable: !0
            }), MatTabHeader.prototype._scrollHeader = function(scrollDir) {
                this.scrollDistance += ("before" == scrollDir ? -1 : 1) * this._tabListContainer.nativeElement.offsetWidth / 3;
            }, MatTabHeader.prototype._scrollToLabel = function(labelIndex) {
                var selectedLabel = this._labelWrappers ? this._labelWrappers.toArray()[labelIndex] : null;
                if (selectedLabel) {
                    var labelBeforePos, labelAfterPos, viewLength = this._tabListContainer.nativeElement.offsetWidth;
                    "ltr" == this._getLayoutDirection() ? labelAfterPos = (labelBeforePos = selectedLabel.getOffsetLeft()) + selectedLabel.getOffsetWidth() : labelBeforePos = (labelAfterPos = this._tabList.nativeElement.offsetWidth - selectedLabel.getOffsetLeft()) - selectedLabel.getOffsetWidth();
                    var beforeVisiblePos = this.scrollDistance, afterVisiblePos = this.scrollDistance + viewLength;
                    labelBeforePos < beforeVisiblePos ? this.scrollDistance -= beforeVisiblePos - labelBeforePos + 60 : labelAfterPos > afterVisiblePos && (this.scrollDistance += labelAfterPos - afterVisiblePos + 60);
                }
            }, MatTabHeader.prototype._checkPaginationEnabled = function() {
                var isEnabled = this._tabList.nativeElement.scrollWidth > this._elementRef.nativeElement.offsetWidth;
                isEnabled || (this.scrollDistance = 0), isEnabled !== this._showPaginationControls && this._changeDetectorRef.markForCheck(), 
                this._showPaginationControls = isEnabled;
            }, MatTabHeader.prototype._checkScrollingControls = function() {
                this._disableScrollBefore = 0 == this.scrollDistance, this._disableScrollAfter = this.scrollDistance == this._getMaxScrollDistance(), 
                this._changeDetectorRef.markForCheck();
            }, MatTabHeader.prototype._getMaxScrollDistance = function() {
                return this._tabList.nativeElement.scrollWidth - this._tabListContainer.nativeElement.offsetWidth || 0;
            }, MatTabHeader.prototype._alignInkBarToSelectedTab = function() {
                var selectedLabelWrapper = this._labelWrappers && this._labelWrappers.length ? this._labelWrappers.toArray()[this.selectedIndex].elementRef.nativeElement : null;
                this._inkBar.alignToElement(selectedLabelWrapper);
            }, MatTabHeader.ngComponentDef = core.Gb({
                type: MatTabHeader,
                selectors: [ [ "mat-tab-header" ] ],
                factory: function(t) {
                    return new (t || MatTabHeader)(core.Kb(core.q), core.Kb(core.j), core.Kb(scrolling_es5.e), core.Kb(bidi_es5.b, 8), core.Kb(core.K));
                },
                contentQueries: function(rf, ctx, dirIndex) {
                    var _t;
                    1 & rf && core.Eb(dirIndex, tabs_es5_MatTabLabelWrapper, !1, null), 2 & rf && core.xc(_t = core.nc()) && (ctx._labelWrappers = _t);
                },
                viewQuery: function(rf, ctx) {
                    var _t;
                    1 & rf && (core.Mc(tabs_es5_MatInkBar, !0, null), core.Mc(tabs_es5_c7, !0, null), 
                    core.Mc(tabs_es5_c8, !0, null)), 2 & rf && (core.xc(_t = core.oc()) && (ctx._inkBar = _t.first), 
                    core.xc(_t = core.oc()) && (ctx._tabListContainer = _t.first), core.xc(_t = core.oc()) && (ctx._tabList = _t.first));
                },
                hostBindings: function(rf, ctx, elIndex) {
                    1 & rf && (core.Rb(tabs_es5_c9), core.Ub(tabs_es5_c10)), 2 & rf && (core.Sb(0, ctx._showPaginationControls), 
                    core.Sb(1, "rtl" == ctx._getLayoutDirection()), core.Vb());
                },
                inputs: {
                    disableRipple: "disableRipple",
                    selectedIndex: "selectedIndex"
                },
                outputs: {
                    selectFocusedIndex: "selectFocusedIndex",
                    indexFocused: "indexFocused"
                },
                features: [ core.tb ],
                ngContentSelectors: tabs_es5_c1,
                consts: 11,
                vars: 2,
                template: function(rf, ctx) {
                    1 & rf && (core.vc(), core.Yb(0, "div", tabs_es5_c11), core.ac(tabs_es5_c19), core.mc("click", function($event) {
                        return ctx._scrollHeader("before");
                    }), core.Lb(1, "div", tabs_es5_c12), core.Qb(), core.Yb(2, "div", tabs_es5_c13, tabs_es5_c14), 
                    core.mc("keydown", function($event) {
                        return ctx._handleKeydown($event);
                    }), core.Yb(4, "div", tabs_es5_c15, tabs_es5_c16), core.mc("cdkObserveContent", function($event) {
                        return ctx._onContentChanges();
                    }), core.Yb(6, "div", tabs_es5_c17), core.uc(7), core.Qb(), core.Lb(8, "mat-ink-bar"), 
                    core.Qb(), core.Qb(), core.Yb(9, "div", tabs_es5_c18), core.ac(tabs_es5_c19), core.mc("click", function($event) {
                        return ctx._scrollHeader("after");
                    }), core.Lb(10, "div", tabs_es5_c12), core.Qb()), 2 & rf && (core.Nb(0, 0, ctx._disableScrollBefore), 
                    core.bc(0), core.Ec(0), core.Xb(0, "matRippleDisabled", core.Bb(ctx._disableScrollBefore || ctx.disableRipple)), 
                    core.Nb(9, 0, ctx._disableScrollAfter), core.bc(9), core.Ec(9), core.Xb(9, "matRippleDisabled", core.Bb(ctx._disableScrollAfter || ctx.disableRipple)));
                },
                directives: [ core_es5.c, observers_es5.a, tabs_es5_MatInkBar ],
                styles: [ ".mat-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mat-tab-label{height:48px;padding:0 24px;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;display:inline-flex;justify-content:center;align-items:center;white-space:nowrap;position:relative}.mat-tab-label:focus{outline:0}.mat-tab-label:focus:not(.mat-tab-disabled){opacity:1}@media screen and (-ms-high-contrast:active){.mat-tab-label:focus{outline:dotted 2px}}.mat-tab-label.mat-tab-disabled{cursor:default}@media screen and (-ms-high-contrast:active){.mat-tab-label.mat-tab-disabled{opacity:.5}}.mat-tab-label .mat-tab-label-content{display:inline-flex;justify-content:center;align-items:center;white-space:nowrap}@media screen and (-ms-high-contrast:active){.mat-tab-label{opacity:1}}@media (max-width:599px){.mat-tab-label{min-width:72px}}.mat-ink-bar{position:absolute;bottom:0;height:2px;transition:.5s cubic-bezier(.35,0,.25,1)}.mat-tab-group-inverted-header .mat-ink-bar{bottom:auto;top:0}@media screen and (-ms-high-contrast:active){.mat-ink-bar{outline:solid 2px;height:0}}.mat-tab-header-pagination{position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2}.mat-tab-header-pagination-controls-enabled .mat-tab-header-pagination{display:flex}.mat-tab-header-pagination-before,.mat-tab-header-rtl .mat-tab-header-pagination-after{padding-left:4px}.mat-tab-header-pagination-before .mat-tab-header-pagination-chevron,.mat-tab-header-rtl .mat-tab-header-pagination-after .mat-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-tab-header-pagination-after,.mat-tab-header-rtl .mat-tab-header-pagination-before{padding-right:4px}.mat-tab-header-pagination-after .mat-tab-header-pagination-chevron,.mat-tab-header-rtl .mat-tab-header-pagination-before .mat-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;content:'';height:8px;width:8px}.mat-tab-header-pagination-disabled{box-shadow:none;cursor:default}.mat-tab-label-container{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mat-tab-list{flex-grow:1;position:relative;transition:transform .5s cubic-bezier(.35,0,.25,1)}.mat-tab-labels{display:flex}[mat-align-tabs=center] .mat-tab-labels{justify-content:center}[mat-align-tabs=end] .mat-tab-labels{justify-content:flex-end}" ],
                encapsulation: 2,
                changeDetection: 0
            }), MatTabHeader;
        }(Object(core_es5.g)(MatTabHeaderBase)), nextId = 0, MatTabChangeEvent = function() {
            return function() {};
        }(), MatTabGroupBase = function() {
            return function(_elementRef) {
                this._elementRef = _elementRef;
            };
        }(), tabs_es5_MatTabGroup = function(_super) {
            function MatTabGroup(elementRef, _changeDetectorRef) {
                var _this = _super.call(this, elementRef) || this;
                return _this._changeDetectorRef = _changeDetectorRef, _this._indexToSelect = 0, 
                _this._tabBodyWrapperHeight = 0, _this._tabsSubscription = Subscription.a.EMPTY, 
                _this._tabLabelSubscription = Subscription.a.EMPTY, _this._dynamicHeight = !1, _this._selectedIndex = null, 
                _this.headerPosition = "above", _this.selectedIndexChange = new core.s(), _this.focusChange = new core.s(), 
                _this.animationDone = new core.s(), _this.selectedTabChange = new core.s(!0), _this._groupId = nextId++, 
                _this;
            }
            return Object(tslib_es6.c)(MatTabGroup, _super), Object.defineProperty(MatTabGroup.prototype, "dynamicHeight", {
                get: function() {
                    return this._dynamicHeight;
                },
                set: function(value) {
                    this._dynamicHeight = Object(coercion_es5.b)(value);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(MatTabGroup.prototype, "selectedIndex", {
                get: function() {
                    return this._selectedIndex;
                },
                set: function(value) {
                    this._indexToSelect = Object(coercion_es5.d)(value, null);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(MatTabGroup.prototype, "backgroundColor", {
                get: function() {
                    return this._backgroundColor;
                },
                set: function(value) {
                    var nativeElement = this._elementRef.nativeElement;
                    nativeElement.classList.remove("mat-background-" + this.backgroundColor), value && nativeElement.classList.add("mat-background-" + value), 
                    this._backgroundColor = value;
                },
                enumerable: !0,
                configurable: !0
            }), MatTabGroup.prototype.ngAfterContentChecked = function() {
                var _this = this, indexToSelect = this._indexToSelect = this._clampTabIndex(this._indexToSelect);
                if (this._selectedIndex != indexToSelect) {
                    var isFirstRun_1 = null == this._selectedIndex;
                    isFirstRun_1 || this.selectedTabChange.emit(this._createChangeEvent(indexToSelect)), 
                    Promise.resolve().then(function() {
                        _this._tabs.forEach(function(tab, index) {
                            return tab.isActive = index === indexToSelect;
                        }), isFirstRun_1 || _this.selectedIndexChange.emit(indexToSelect);
                    });
                }
                this._tabs.forEach(function(tab, index) {
                    tab.position = index - indexToSelect, null == _this._selectedIndex || 0 != tab.position || tab.origin || (tab.origin = indexToSelect - _this._selectedIndex);
                }), this._selectedIndex !== indexToSelect && (this._selectedIndex = indexToSelect, 
                this._changeDetectorRef.markForCheck());
            }, MatTabGroup.prototype.ngAfterContentInit = function() {
                var _this = this;
                this._subscribeToTabLabels(), this._tabsSubscription = this._tabs.changes.subscribe(function() {
                    if (_this._clampTabIndex(_this._indexToSelect) === _this._selectedIndex) for (var tabs = _this._tabs.toArray(), i = 0; i < tabs.length; i++) if (tabs[i].isActive) {
                        _this._indexToSelect = _this._selectedIndex = i;
                        break;
                    }
                    _this._subscribeToTabLabels(), _this._changeDetectorRef.markForCheck();
                });
            }, MatTabGroup.prototype.ngOnDestroy = function() {
                this._tabsSubscription.unsubscribe(), this._tabLabelSubscription.unsubscribe();
            }, MatTabGroup.prototype.realignInkBar = function() {
                this._tabHeader && this._tabHeader._alignInkBarToSelectedTab();
            }, MatTabGroup.prototype._focusChanged = function(index) {
                this.focusChange.emit(this._createChangeEvent(index));
            }, MatTabGroup.prototype._createChangeEvent = function(index) {
                var event = new MatTabChangeEvent();
                return event.index = index, this._tabs && this._tabs.length && (event.tab = this._tabs.toArray()[index]), 
                event;
            }, MatTabGroup.prototype._subscribeToTabLabels = function() {
                var _this = this;
                this._tabLabelSubscription && this._tabLabelSubscription.unsubscribe(), this._tabLabelSubscription = merge.a.apply(void 0, this._tabs.map(function(tab) {
                    return tab._stateChanges;
                })).subscribe(function() {
                    return _this._changeDetectorRef.markForCheck();
                });
            }, MatTabGroup.prototype._clampTabIndex = function(index) {
                return Math.min(this._tabs.length - 1, Math.max(index || 0, 0));
            }, MatTabGroup.prototype._getTabLabelId = function(i) {
                return "mat-tab-label-" + this._groupId + "-" + i;
            }, MatTabGroup.prototype._getTabContentId = function(i) {
                return "mat-tab-content-" + this._groupId + "-" + i;
            }, MatTabGroup.prototype._setTabBodyWrapperHeight = function(tabHeight) {
                if (this._dynamicHeight && this._tabBodyWrapperHeight) {
                    var wrapper = this._tabBodyWrapper.nativeElement;
                    wrapper.style.height = this._tabBodyWrapperHeight + "px", this._tabBodyWrapper.nativeElement.offsetHeight && (wrapper.style.height = tabHeight + "px");
                }
            }, MatTabGroup.prototype._removeTabBodyWrapperHeight = function() {
                this._tabBodyWrapperHeight = this._tabBodyWrapper.nativeElement.clientHeight, this._tabBodyWrapper.nativeElement.style.height = "", 
                this.animationDone.emit();
            }, MatTabGroup.prototype._handleClick = function(tab, tabHeader, idx) {
                tab.disabled || (this.selectedIndex = tabHeader.focusIndex = idx);
            }, MatTabGroup.prototype._getTabIndex = function(tab, idx) {
                return tab.disabled ? null : this.selectedIndex === idx ? 0 : -1;
            }, MatTabGroup.ngComponentDef = core.Gb({
                type: MatTabGroup,
                selectors: [ [ "mat-tab-group" ] ],
                factory: function(t) {
                    return new (t || MatTabGroup)(core.Kb(core.q), core.Kb(core.j));
                },
                contentQueries: function(rf, ctx, dirIndex) {
                    var _t;
                    1 & rf && core.Eb(dirIndex, tabs_es5_MatTab, !1, null), 2 & rf && core.xc(_t = core.nc()) && (ctx._tabs = _t);
                },
                viewQuery: function(rf, ctx) {
                    var _t;
                    1 & rf && (core.Mc(tabs_es5_c20, !0, null), core.Mc(tabs_es5_c21, !0, null)), 2 & rf && (core.xc(_t = core.oc()) && (ctx._tabBodyWrapper = _t.first), 
                    core.xc(_t = core.oc()) && (ctx._tabHeader = _t.first));
                },
                hostBindings: function(rf, ctx, elIndex) {
                    1 & rf && (core.Rb(_c22), core.Ub(_c23)), 2 & rf && (core.Sb(0, ctx.dynamicHeight), 
                    core.Sb(1, "below" === ctx.headerPosition), core.Vb());
                },
                inputs: {
                    color: "color",
                    disableRipple: "disableRipple",
                    dynamicHeight: "dynamicHeight",
                    selectedIndex: "selectedIndex",
                    backgroundColor: "backgroundColor",
                    headerPosition: "headerPosition"
                },
                outputs: {
                    selectedIndexChange: "selectedIndexChange",
                    focusChange: "focusChange",
                    animationDone: "animationDone",
                    selectedTabChange: "selectedTabChange"
                },
                exportAs: [ "matTabGroup" ],
                features: [ core.tb ],
                consts: 6,
                vars: 4,
                template: function(rf, ctx) {
                    1 & rf && (core.Yb(0, "mat-tab-header", _c24, _c25), core.mc("indexFocused", function($event) {
                        return ctx._focusChanged($event);
                    }), core.mc("selectFocusedIndex", function($event) {
                        return ctx.selectedIndex = $event;
                    }), core.Ic(2, MatTabGroup_div_2_Template, 4, 12, "div", _c26), core.Qb(), core.Yb(3, "div", _c27, _c28), 
                    core.Ic(5, MatTabGroup_mat_tab_body_5_Template, 1, 5, "mat-tab-body", _c29), core.Qb()), 
                    2 & rf && (core.Ec(0), core.Xb(0, "selectedIndex", core.Bb(ctx.selectedIndex)), 
                    core.Xb(0, "disableRipple", core.Bb(ctx.disableRipple)), core.Ec(2), core.Xb(2, "ngForOf", core.Bb(ctx._tabs)), 
                    core.Ec(5), core.Xb(5, "ngForOf", core.Bb(ctx._tabs)));
                },
                directives: [ tabs_es5_MatTabHeader, tabs_es5_MatTabLabelWrapper, core_es5.c, a11y_es5.b, common.j, common.k, portal_es5.c, tabs_es5_MatTabBody ],
                styles: [ ".mat-tab-group{display:flex;flex-direction:column}.mat-tab-group.mat-tab-group-inverted-header{flex-direction:column-reverse}.mat-tab-label{height:48px;padding:0 24px;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;display:inline-flex;justify-content:center;align-items:center;white-space:nowrap;position:relative}.mat-tab-label:focus{outline:0}.mat-tab-label:focus:not(.mat-tab-disabled){opacity:1}@media screen and (-ms-high-contrast:active){.mat-tab-label:focus{outline:dotted 2px}}.mat-tab-label.mat-tab-disabled{cursor:default}@media screen and (-ms-high-contrast:active){.mat-tab-label.mat-tab-disabled{opacity:.5}}.mat-tab-label .mat-tab-label-content{display:inline-flex;justify-content:center;align-items:center;white-space:nowrap}@media screen and (-ms-high-contrast:active){.mat-tab-label{opacity:1}}@media (max-width:599px){.mat-tab-label{padding:0 12px}}@media (max-width:959px){.mat-tab-label{padding:0 12px}}.mat-tab-group[mat-stretch-tabs]>.mat-tab-header .mat-tab-label{flex-basis:0;flex-grow:1}.mat-tab-body-wrapper{position:relative;overflow:hidden;display:flex;transition:height .5s cubic-bezier(.35,0,.25,1)}.mat-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;flex-basis:100%}.mat-tab-body.mat-tab-body-active{position:relative;overflow-x:hidden;overflow-y:auto;z-index:1;flex-grow:1}.mat-tab-group.mat-tab-group-dynamic-height .mat-tab-body.mat-tab-body-active{overflow-y:hidden}" ],
                encapsulation: 2,
                changeDetection: 0
            }), MatTabGroup;
        }(Object(core_es5.f)(Object(core_es5.g)(MatTabGroupBase), "primary")), tabs_es5_MatTabsModule = function() {
            function MatTabsModule() {}
            return MatTabsModule.ngModuleDef = core.Ib({
                type: MatTabsModule
            }), MatTabsModule.ngInjectorDef = core.jb({
                factory: function(t) {
                    return new (t || MatTabsModule)();
                },
                imports: [ [ common.c, core_es5.b, portal_es5.h, core_es5.d, observers_es5.c, a11y_es5.a ], core_es5.b ]
            }), MatTabsModule;
        }(), code_tabs_component_c0 = [ "content" ], code_tabs_component_c1 = [ 2, "display", "none" ], code_tabs_component_c2 = [ "content", "" ], code_tabs_component_c3 = [ "disableRipple", "", 1, "code-tab-group" ], code_tabs_component_c4 = [ "style", "overflow-y: hidden;", 4, "ngFor", "ngForOf" ], code_tabs_component_c5 = [ 2, "overflow-y", "hidden" ], code_tabs_component_c6 = [ "mat-tab-label", "" ], code_tabs_component_c7 = [ 3, "language", "linenums", "path", "region", "header" ];
        function CodeTabsComponent_mat_tab_5_ng_template_1_Template(rf, ctx) {
            if (1 & rf && (core.Yb(0, "span"), core.ac(), core.Kc(1), core.Qb()), 2 & rf) {
                var tab_r90 = core.rc().$implicit;
                core.cc(0, core.hc("", tab_r90.class, "")), core.bc(0), core.Ec(1), core.Lc(1, core.hc("", tab_r90.header, ""));
            }
        }
        function CodeTabsComponent_mat_tab_5_Template(rf, ctx) {
            if (1 & rf && (core.Yb(0, "mat-tab", code_tabs_component_c5), core.Ic(1, CodeTabsComponent_mat_tab_5_ng_template_1_Template, 2, 2, "ng-template", code_tabs_component_c6), 
            core.Yb(2, "aio-code", code_tabs_component_c7), core.ac(), core.Qb(), core.Qb()), 
            2 & rf) {
                var tab_r90 = ctx.$implicit;
                core.cc(2, core.hc("", tab_r90.class, "")), core.bc(2), core.Ec(2), core.Xb(2, "language", core.Bb(tab_r90.language)), 
                core.Xb(2, "linenums", core.Bb(tab_r90.linenums)), core.Xb(2, "path", core.Bb(tab_r90.path)), 
                core.Xb(2, "region", core.Bb(tab_r90.region)), core.Xb(2, "header", core.Bb(tab_r90.header));
            }
        }
        var code_tabs_component_c8 = [], code_tabs_component_CodeTabsComponent = function() {
            function CodeTabsComponent() {}
            return CodeTabsComponent.prototype.ngOnInit = function() {
                this.tabs = [];
                for (var codeExamples = this.content.nativeElement.querySelectorAll("code-pane"), i = 0; i < codeExamples.length; i++) this.tabs.push(this.getTabInfo(codeExamples[i]));
            }, CodeTabsComponent.prototype.ngAfterViewInit = function() {
                var _this = this;
                this.codeComponents.toArray().forEach(function(codeComponent, i) {
                    codeComponent.code = _this.tabs[i].code;
                });
            }, CodeTabsComponent.prototype.getTabInfo = function(tabContent) {
                return {
                    class: tabContent.getAttribute("class"),
                    code: tabContent.innerHTML,
                    language: tabContent.getAttribute("language"),
                    linenums: tabContent.getAttribute("linenums") || this.linenums,
                    path: tabContent.getAttribute("path") || "",
                    region: tabContent.getAttribute("region") || "",
                    header: tabContent.getAttribute("header")
                };
            }, CodeTabsComponent.ngComponentDef = core.Gb({
                type: CodeTabsComponent,
                selectors: [ [ "code-tabs" ] ],
                factory: function(t) {
                    return new (t || CodeTabsComponent)();
                },
                viewQuery: function(rf, ctx) {
                    var _t;
                    1 & rf && (core.Mc(code_tabs_component_c0, !0, null), core.Mc(code_component.a, !0, null)), 
                    2 & rf && (core.xc(_t = core.oc()) && (ctx.content = _t.first), core.xc(_t = core.oc()) && (ctx.codeComponents = _t));
                },
                inputs: {
                    linenums: "linenums"
                },
                ngContentSelectors: code_tabs_component_c8,
                consts: 6,
                vars: 1,
                template: function(rf, ctx) {
                    1 & rf && (core.vc(), core.Yb(0, "div", code_tabs_component_c1, code_tabs_component_c2), 
                    core.uc(2), core.Qb(), core.Yb(3, "mat-card"), core.Yb(4, "mat-tab-group", code_tabs_component_c3), 
                    core.Ic(5, CodeTabsComponent_mat_tab_5_Template, 3, 6, "mat-tab", code_tabs_component_c4), 
                    core.Qb(), core.Qb()), 2 & rf && (core.Ec(5), core.Xb(5, "ngForOf", core.Bb(ctx.tabs)));
                },
                directives: [ card_es5_MatCard, tabs_es5_MatTabGroup, common.j, tabs_es5_MatTab, tabs_es5_MatTabLabel, code_component.a ],
                encapsulation: 2
            }), CodeTabsComponent;
        }(), code_module = __webpack_require__("V90o"), code_tabs_module_CodeTabsModule = function() {
            function CodeTabsModule() {
                this.customElementComponent = code_tabs_component_CodeTabsComponent;
            }
            return CodeTabsModule.ngModuleDef = core.Ib({
                type: CodeTabsModule
            }), CodeTabsModule.ngInjectorDef = core.jb({
                factory: function(t) {
                    return new (t || CodeTabsModule)();
                },
                imports: [ [ common.c, card_es5_MatCardModule, tabs_es5_MatTabsModule, code_module.a ] ]
            }), CodeTabsModule;
        }();
        __webpack_require__.d(__webpack_exports__, "CodeTabsModuleNgFactory", function() {
            return CodeTabsModuleNgFactory;
        });
        var CodeTabsModuleNgFactory = new core.ub(code_tabs_module_CodeTabsModule);
    }
} ]);
//# sourceMappingURL=code-code-tabs-module-ngfactory.4f4b4d669a773def95b5.js.map
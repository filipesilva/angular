const sidenav_es5_c0 = [ 1, "mat-drawer-content" ], sidenav_es5_c1 = [ "margin-left", "margin-right" ], sidenav_es5_c2 = [], sidenav_es5_c3 = [ "tabIndex", "-1", 1, "mat-drawer" ], sidenav_es5_c4 = [ "mat-drawer-end", "mat-drawer-over", "mat-drawer-push", "mat-drawer-side" ], sidenav_es5_c5 = [ 1, "mat-drawer-inner-container" ], sidenav_es5_c6 = [ 1, "mat-drawer-container" ], sidenav_es5_c7 = [ "mat-drawer-container-explicit-backdrop" ], sidenav_es5_c8 = [ "class", "mat-drawer-backdrop", 3, "mat-drawer-shown", "click", 4, "ngIf" ], sidenav_es5_c9 = [ 4, "ngIf" ], sidenav_es5_c10 = [ 1, "mat-drawer-backdrop", 3, "click" ], _c11 = [ "mat-drawer-shown" ];
function MatDrawerContainer_div_0_Template(rf, ctx) {
    if (1 & rf) {
        const _r207 = core.dc();
        core.Yb(0, "div", sidenav_es5_c10), core.ac(_c11), core.mc("click", function($event) {
            return core.Bc(_r207), core.rc()._onBackdropClicked();
        }), core.Qb();
    }
    if (2 & rf) {
        const ctx_r204 = core.rc();
        core.Nb(0, 0, ctx_r204._isShowingBackdrop()), core.bc(0);
    }
}
function MatDrawerContainer_mat_drawer_content_3_Template(rf, ctx) {
    1 & rf && (core.Yb(0, "mat-drawer-content"), core.uc(1), core.Qb());
}
const _c12 = [ [ [ "mat-drawer" ] ], [ [ "mat-drawer-content" ] ] ], _c13 = [ "mat-drawer", "mat-drawer-content" ], _c14 = [ 1, "mat-drawer-content", "mat-sidenav-content" ], _c15 = [ "tabIndex", "-1", 1, "mat-drawer", "mat-sidenav" ], _c16 = [ "mat-drawer-end", "mat-drawer-over", "mat-drawer-push", "mat-drawer-side", "mat-sidenav-fixed" ], _c17 = [ "top", "bottom" ], _c18 = [ 1, "mat-drawer-container", "mat-sidenav-container" ], _c19 = [ "cdkScrollable", "", 4, "ngIf" ];
function MatSidenavContainer_div_0_Template(rf, ctx) {
    if (1 & rf) {
        const _r211 = core.dc();
        core.Yb(0, "div", sidenav_es5_c10), core.ac(_c11), core.mc("click", function($event) {
            return core.Bc(_r211), core.rc()._onBackdropClicked();
        }), core.Qb();
    }
    if (2 & rf) {
        const ctx_r208 = core.rc();
        core.Nb(0, 0, ctx_r208._isShowingBackdrop()), core.bc(0);
    }
}
const _c20 = [ "cdkScrollable", "" ];
function MatSidenavContainer_mat_sidenav_content_3_Template(rf, ctx) {
    1 & rf && (core.Yb(0, "mat-sidenav-content", _c20), core.uc(1), core.Qb());
}
const _c21 = [ [ [ "mat-sidenav" ] ], [ [ "mat-sidenav-content" ] ] ], _c22 = [ "mat-sidenav", "mat-sidenav-content" ];
var matDrawerAnimations = {
    transformDrawer: Object(fesm5_animations.j)("transform", [ Object(fesm5_animations.g)("open, open-instant", Object(fesm5_animations.h)({
        transform: "none",
        visibility: "visible"
    })), Object(fesm5_animations.g)("void", Object(fesm5_animations.h)({
        "box-shadow": "none",
        visibility: "hidden"
    })), Object(fesm5_animations.i)("void => open-instant", Object(fesm5_animations.e)("0ms")), Object(fesm5_animations.i)("void <=> open, open-instant => void", Object(fesm5_animations.e)("400ms cubic-bezier(0.25, 0.8, 0.25, 1)")) ])
};
function throwMatDuplicatedDrawerError(position) {
    throw Error("A drawer was already declared for 'position=\"" + position + "\"'");
}
var MAT_DRAWER_DEFAULT_AUTOSIZE = new core.z("MAT_DRAWER_DEFAULT_AUTOSIZE", {
    providedIn: "root",
    factory: function() {
        return !1;
    }
}), sidenav_es5_MatDrawerContent = function(_super) {
    function MatDrawerContent(_changeDetectorRef, _container, elementRef, scrollDispatcher, ngZone) {
        var _this = _super.call(this, elementRef, scrollDispatcher, ngZone) || this;
        return _this._changeDetectorRef = _changeDetectorRef, _this._container = _container, 
        _this;
    }
    return Object(tslib_es6.c)(MatDrawerContent, _super), MatDrawerContent.prototype.ngAfterContentInit = function() {
        var _this = this;
        this._container._contentMarginChanges.subscribe(function() {
            _this._changeDetectorRef.markForCheck();
        });
    }, MatDrawerContent.ngComponentDef = core.Gb({
        type: MatDrawerContent,
        selectors: [ [ "mat-drawer-content" ] ],
        factory: function(t) {
            return new (t || MatDrawerContent)(core.Kb(core.j), core.Kb(Object(core.lb)(function() {
                return sidenav_es5_MatDrawerContainer;
            })), core.Kb(core.q), core.Kb(scrolling_es5.b), core.Kb(core.K));
        },
        hostBindings: function(rf, ctx, elIndex) {
            1 & rf && (core.Rb(sidenav_es5_c0), core.Ub(null, sidenav_es5_c1)), 2 & rf && (core.Tb(0, ctx._container._contentMargins.left, "px"), 
            core.Tb(1, ctx._container._contentMargins.right, "px"), core.Vb());
        },
        features: [ core.tb ],
        ngContentSelectors: sidenav_es5_c2,
        consts: 1,
        vars: 0,
        template: function(rf, ctx) {
            1 & rf && (core.vc(), core.uc(0));
        },
        encapsulation: 2,
        changeDetection: 0
    }), MatDrawerContent;
}(scrolling_es5.a), sidenav_es5_MatDrawer = function() {
    function MatDrawer(_elementRef, _focusTrapFactory, _focusMonitor, _platform, _ngZone, _doc) {
        var _this = this;
        this._elementRef = _elementRef, this._focusTrapFactory = _focusTrapFactory, this._focusMonitor = _focusMonitor, 
        this._platform = _platform, this._ngZone = _ngZone, this._doc = _doc, this._elementFocusedBeforeDrawerWasOpened = null, 
        this._enableAnimations = !1, this._position = "start", this._mode = "over", this._disableClose = !1, 
        this._autoFocus = !0, this._animationStarted = new core.s(), this._animationState = "void", 
        this.openedChange = new core.s(!0), this.onPositionChanged = new core.s(), this._modeChanged = new Subject.a(), 
        this._opened = !1, this.openedChange.subscribe(function(opened) {
            opened ? (_this._doc && (_this._elementFocusedBeforeDrawerWasOpened = _this._doc.activeElement), 
            _this._isFocusTrapEnabled && _this._focusTrap && _this._trapFocus()) : _this._restoreFocus();
        }), this._ngZone.runOutsideAngular(function() {
            Object(fromEvent.a)(_this._elementRef.nativeElement, "keydown").pipe(Object(filter.a)(function(event) {
                return event.keyCode === keycodes_es5.e && !_this.disableClose;
            })).subscribe(function(event) {
                return _this._ngZone.run(function() {
                    _this.close(), event.stopPropagation();
                });
            });
        });
    }
    return Object.defineProperty(MatDrawer.prototype, "position", {
        get: function() {
            return this._position;
        },
        set: function(value) {
            (value = "end" === value ? "end" : "start") != this._position && (this._position = value, 
            this.onPositionChanged.emit());
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(MatDrawer.prototype, "mode", {
        get: function() {
            return this._mode;
        },
        set: function(value) {
            this._mode = value, this._modeChanged.next();
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(MatDrawer.prototype, "disableClose", {
        get: function() {
            return this._disableClose;
        },
        set: function(value) {
            this._disableClose = Object(coercion_es5.b)(value);
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(MatDrawer.prototype, "autoFocus", {
        get: function() {
            return this._autoFocus;
        },
        set: function(value) {
            this._autoFocus = Object(coercion_es5.b)(value);
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(MatDrawer.prototype, "_openedStream", {
        get: function() {
            return this.openedChange.pipe(Object(filter.a)(function(o) {
                return o;
            }), Object(map.a)(function() {}));
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(MatDrawer.prototype, "openedStart", {
        get: function() {
            return this._animationStarted.pipe(Object(filter.a)(function(e) {
                return e.fromState !== e.toState && 0 === e.toState.indexOf("open");
            }), Object(map.a)(function() {}));
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(MatDrawer.prototype, "_closedStream", {
        get: function() {
            return this.openedChange.pipe(Object(filter.a)(function(o) {
                return !o;
            }), Object(map.a)(function() {}));
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(MatDrawer.prototype, "closedStart", {
        get: function() {
            return this._animationStarted.pipe(Object(filter.a)(function(e) {
                return e.fromState !== e.toState && "void" === e.toState;
            }), Object(map.a)(function() {}));
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(MatDrawer.prototype, "_isFocusTrapEnabled", {
        get: function() {
            return this.opened && "side" !== this.mode;
        },
        enumerable: !0,
        configurable: !0
    }), MatDrawer.prototype._trapFocus = function() {
        var _this = this;
        this.autoFocus && this._focusTrap.focusInitialElementWhenReady().then(function(hasMovedFocus) {
            hasMovedFocus || "function" != typeof _this._elementRef.nativeElement.focus || _this._elementRef.nativeElement.focus();
        });
    }, MatDrawer.prototype._restoreFocus = function() {
        if (this.autoFocus) {
            var activeEl = this._doc && this._doc.activeElement;
            activeEl && this._elementRef.nativeElement.contains(activeEl) && (this._elementFocusedBeforeDrawerWasOpened instanceof HTMLElement ? this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened, this._openedVia) : this._elementRef.nativeElement.blur()), 
            this._elementFocusedBeforeDrawerWasOpened = null, this._openedVia = null;
        }
    }, MatDrawer.prototype.ngAfterContentInit = function() {
        this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement), 
        this._focusTrap.enabled = this._isFocusTrapEnabled;
    }, MatDrawer.prototype.ngAfterContentChecked = function() {
        this._platform.isBrowser && (this._enableAnimations = !0);
    }, MatDrawer.prototype.ngOnDestroy = function() {
        this._focusTrap && this._focusTrap.destroy();
    }, Object.defineProperty(MatDrawer.prototype, "opened", {
        get: function() {
            return this._opened;
        },
        set: function(value) {
            this.toggle(Object(coercion_es5.b)(value));
        },
        enumerable: !0,
        configurable: !0
    }), MatDrawer.prototype.open = function(openedVia) {
        return this.toggle(!0, openedVia);
    }, MatDrawer.prototype.close = function() {
        return this.toggle(!1);
    }, MatDrawer.prototype.toggle = function(isOpen, openedVia) {
        var _this = this;
        return void 0 === isOpen && (isOpen = !this.opened), void 0 === openedVia && (openedVia = "program"), 
        this._opened = isOpen, isOpen ? (this._animationState = this._enableAnimations ? "open" : "open-instant", 
        this._openedVia = openedVia) : (this._animationState = "void", this._restoreFocus()), 
        this._focusTrap && (this._focusTrap.enabled = this._isFocusTrapEnabled), new Promise(function(resolve) {
            _this.openedChange.pipe(Object(take.a)(1)).subscribe(function(open) {
                return resolve(open ? "open" : "close");
            });
        });
    }, MatDrawer.prototype._onAnimationStart = function(event) {
        this._animationStarted.emit(event);
    }, MatDrawer.prototype._onAnimationEnd = function(event) {
        var fromState = event.fromState, toState = event.toState;
        (0 === toState.indexOf("open") && "void" === fromState || "void" === toState && 0 === fromState.indexOf("open")) && this.openedChange.emit(this._opened);
    }, Object.defineProperty(MatDrawer.prototype, "_width", {
        get: function() {
            return this._elementRef.nativeElement && this._elementRef.nativeElement.offsetWidth || 0;
        },
        enumerable: !0,
        configurable: !0
    }), MatDrawer.ngComponentDef = core.Gb({
        type: MatDrawer,
        selectors: [ [ "mat-drawer" ] ],
        factory: function(t) {
            return new (t || MatDrawer)(core.Kb(core.q), core.Kb(a11y_es5.e), core.Kb(a11y_es5.d), core.Kb(platform_es5.a), core.Kb(core.K), core.Kb(common.d, 8));
        },
        hostBindings: function(rf, ctx, elIndex) {
            1 & rf && (core.Ab(2), core.Cb("@transform.start", function($event) {
                return ctx._onAnimationStart($event);
            }), core.Cb("@transform.done", function($event) {
                return ctx._onAnimationEnd($event);
            }), core.Rb(sidenav_es5_c3), core.Ub(sidenav_es5_c4)), 2 & rf && (core.Db(elIndex, "@transform", core.Bb(ctx._animationState), null, !0), 
            core.Mb(elIndex, "align", core.Bb(null)), core.Sb(0, "end" === ctx.position), core.Sb(1, "over" === ctx.mode), 
            core.Sb(2, "push" === ctx.mode), core.Sb(3, "side" === ctx.mode), core.Vb());
        },
        inputs: {
            position: "position",
            mode: "mode",
            disableClose: "disableClose",
            autoFocus: "autoFocus",
            opened: "opened"
        },
        outputs: {
            openedChange: "openedChange",
            onPositionChanged: "positionChanged",
            _openedStream: "opened",
            openedStart: "openedStart",
            _closedStream: "closed",
            closedStart: "closedStart"
        },
        exportAs: [ "matDrawer" ],
        ngContentSelectors: sidenav_es5_c2,
        consts: 2,
        vars: 0,
        template: function(rf, ctx) {
            1 & rf && (core.vc(), core.Yb(0, "div", sidenav_es5_c5), core.uc(1), core.Qb());
        },
        encapsulation: 2,
        data: {
            animation: [ matDrawerAnimations.transformDrawer ]
        },
        changeDetection: 0
    }), MatDrawer;
}(), sidenav_es5_MatDrawerContainer = function() {
    function MatDrawerContainer(_dir, _element, _ngZone, _changeDetectorRef, defaultAutosize, _animationMode) {
        void 0 === defaultAutosize && (defaultAutosize = !1);
        var _this = this;
        this._dir = _dir, this._element = _element, this._ngZone = _ngZone, this._changeDetectorRef = _changeDetectorRef, 
        this._animationMode = _animationMode, this.backdropClick = new core.s(), this._destroyed = new Subject.a(), 
        this._doCheckSubject = new Subject.a(), this._contentMargins = {
            left: null,
            right: null
        }, this._contentMarginChanges = new Subject.a(), _dir && _dir.change.pipe(Object(takeUntil.a)(this._destroyed)).subscribe(function() {
            _this._validateDrawers(), _this._updateContentMargins();
        }), this._autosize = defaultAutosize;
    }
    return Object.defineProperty(MatDrawerContainer.prototype, "start", {
        get: function() {
            return this._start;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(MatDrawerContainer.prototype, "end", {
        get: function() {
            return this._end;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(MatDrawerContainer.prototype, "autosize", {
        get: function() {
            return this._autosize;
        },
        set: function(value) {
            this._autosize = Object(coercion_es5.b)(value);
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(MatDrawerContainer.prototype, "hasBackdrop", {
        get: function() {
            return null == this._backdropOverride ? !this._start || "side" !== this._start.mode || !this._end || "side" !== this._end.mode : this._backdropOverride;
        },
        set: function(value) {
            this._backdropOverride = null == value ? null : Object(coercion_es5.b)(value);
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(MatDrawerContainer.prototype, "scrollable", {
        get: function() {
            return this._userContent || this._content;
        },
        enumerable: !0,
        configurable: !0
    }), MatDrawerContainer.prototype.ngAfterContentInit = function() {
        var _this = this;
        this._drawers.changes.pipe(Object(startWith.a)(null)).subscribe(function() {
            _this._validateDrawers(), _this._drawers.forEach(function(drawer) {
                _this._watchDrawerToggle(drawer), _this._watchDrawerPosition(drawer), _this._watchDrawerMode(drawer);
            }), (!_this._drawers.length || _this._isDrawerOpen(_this._start) || _this._isDrawerOpen(_this._end)) && _this._updateContentMargins(), 
            _this._changeDetectorRef.markForCheck();
        }), this._doCheckSubject.pipe(Object(debounceTime.a)(10), Object(takeUntil.a)(this._destroyed)).subscribe(function() {
            return _this._updateContentMargins();
        });
    }, MatDrawerContainer.prototype.ngOnDestroy = function() {
        this._doCheckSubject.complete(), this._destroyed.next(), this._destroyed.complete();
    }, MatDrawerContainer.prototype.open = function() {
        this._drawers.forEach(function(drawer) {
            return drawer.open();
        });
    }, MatDrawerContainer.prototype.close = function() {
        this._drawers.forEach(function(drawer) {
            return drawer.close();
        });
    }, MatDrawerContainer.prototype.ngDoCheck = function() {
        var _this = this;
        this._autosize && this._isPushed() && this._ngZone.runOutsideAngular(function() {
            return _this._doCheckSubject.next();
        });
    }, MatDrawerContainer.prototype._watchDrawerToggle = function(drawer) {
        var _this = this;
        drawer._animationStarted.pipe(Object(takeUntil.a)(this._drawers.changes), Object(filter.a)(function(event) {
            return event.fromState !== event.toState;
        })).subscribe(function(event) {
            "open-instant" !== event.toState && "NoopAnimations" !== _this._animationMode && _this._element.nativeElement.classList.add("mat-drawer-transition"), 
            _this._updateContentMargins(), _this._changeDetectorRef.markForCheck();
        }), "side" !== drawer.mode && drawer.openedChange.pipe(Object(takeUntil.a)(this._drawers.changes)).subscribe(function() {
            return _this._setContainerClass(drawer.opened);
        });
    }, MatDrawerContainer.prototype._watchDrawerPosition = function(drawer) {
        var _this = this;
        drawer && drawer.onPositionChanged.pipe(Object(takeUntil.a)(this._drawers.changes)).subscribe(function() {
            _this._ngZone.onMicrotaskEmpty.asObservable().pipe(Object(take.a)(1)).subscribe(function() {
                _this._validateDrawers();
            });
        });
    }, MatDrawerContainer.prototype._watchDrawerMode = function(drawer) {
        var _this = this;
        drawer && drawer._modeChanged.pipe(Object(takeUntil.a)(Object(merge.a)(this._drawers.changes, this._destroyed))).subscribe(function() {
            _this._updateContentMargins(), _this._changeDetectorRef.markForCheck();
        });
    }, MatDrawerContainer.prototype._setContainerClass = function(isAdd) {
        isAdd ? this._element.nativeElement.classList.add("mat-drawer-opened") : this._element.nativeElement.classList.remove("mat-drawer-opened");
    }, MatDrawerContainer.prototype._validateDrawers = function() {
        var _this = this;
        this._start = this._end = null, this._drawers.forEach(function(drawer) {
            "end" == drawer.position ? (null != _this._end && throwMatDuplicatedDrawerError("end"), 
            _this._end = drawer) : (null != _this._start && throwMatDuplicatedDrawerError("start"), 
            _this._start = drawer);
        }), this._right = this._left = null, this._dir && "rtl" === this._dir.value ? (this._left = this._end, 
        this._right = this._start) : (this._left = this._start, this._right = this._end);
    }, MatDrawerContainer.prototype._isPushed = function() {
        return this._isDrawerOpen(this._start) && "over" != this._start.mode || this._isDrawerOpen(this._end) && "over" != this._end.mode;
    }, MatDrawerContainer.prototype._onBackdropClicked = function() {
        this.backdropClick.emit(), this._closeModalDrawer();
    }, MatDrawerContainer.prototype._closeModalDrawer = function() {
        var _this = this;
        [ this._start, this._end ].filter(function(drawer) {
            return drawer && !drawer.disableClose && _this._canHaveBackdrop(drawer);
        }).forEach(function(drawer) {
            return drawer.close();
        });
    }, MatDrawerContainer.prototype._isShowingBackdrop = function() {
        return this._isDrawerOpen(this._start) && this._canHaveBackdrop(this._start) || this._isDrawerOpen(this._end) && this._canHaveBackdrop(this._end);
    }, MatDrawerContainer.prototype._canHaveBackdrop = function(drawer) {
        return "side" !== drawer.mode || !!this._backdropOverride;
    }, MatDrawerContainer.prototype._isDrawerOpen = function(drawer) {
        return null != drawer && drawer.opened;
    }, MatDrawerContainer.prototype._updateContentMargins = function() {
        var _this = this, left = 0, right = 0;
        if (this._left && this._left.opened && ("side" == this._left.mode ? left += this._left._width : "push" == this._left.mode && (left += width = this._left._width, 
        right -= width)), this._right && this._right.opened) if ("side" == this._right.mode) right += this._right._width; else if ("push" == this._right.mode) {
            var width;
            right += width = this._right._width, left -= width;
        }
        right = right || null, (left = left || null) === this._contentMargins.left && right === this._contentMargins.right || (this._contentMargins = {
            left: left,
            right: right
        }, this._ngZone.run(function() {
            return _this._contentMarginChanges.next(_this._contentMargins);
        }));
    }, MatDrawerContainer.ngComponentDef = core.Gb({
        type: MatDrawerContainer,
        selectors: [ [ "mat-drawer-container" ] ],
        factory: function(t) {
            return new (t || MatDrawerContainer)(core.Kb(bidi_es5.b, 8), core.Kb(core.q), core.Kb(core.K), core.Kb(core.j), core.Kb(MAT_DRAWER_DEFAULT_AUTOSIZE), core.Kb(animations.a, 8));
        },
        contentQueries: function(rf, ctx, dirIndex) {
            var _t;
            1 & rf && (core.Eb(dirIndex, sidenav_es5_MatDrawerContent, !0, null), core.Eb(dirIndex, sidenav_es5_MatDrawer, !1, null)), 
            2 & rf && (core.xc(_t = core.nc()) && (ctx._content = _t.first), core.xc(_t = core.nc()) && (ctx._drawers = _t));
        },
        viewQuery: function(rf, ctx) {
            var _t;
            1 & rf && core.Mc(sidenav_es5_MatDrawerContent, !0, null), 2 & rf && core.xc(_t = core.oc()) && (ctx._userContent = _t.first);
        },
        hostBindings: function(rf, ctx, elIndex) {
            1 & rf && (core.Rb(sidenav_es5_c6), core.Ub(sidenav_es5_c7)), 2 & rf && (core.Sb(0, ctx._backdropOverride), 
            core.Vb());
        },
        inputs: {
            autosize: "autosize",
            hasBackdrop: "hasBackdrop"
        },
        outputs: {
            backdropClick: "backdropClick"
        },
        exportAs: [ "matDrawerContainer" ],
        ngContentSelectors: _c13,
        consts: 4,
        vars: 2,
        template: function(rf, ctx) {
            1 & rf && (core.vc(_c12, _c13), core.Ic(0, MatDrawerContainer_div_0_Template, 1, 0, "div", sidenav_es5_c8), 
            core.uc(1, 1), core.uc(2, 2), core.Ic(3, MatDrawerContainer_mat_drawer_content_3_Template, 2, 0, "mat-drawer-content", sidenav_es5_c9)), 
            2 & rf && (core.Ec(0), core.Xb(0, "ngIf", core.Bb(ctx.hasBackdrop)), core.Ec(3), 
            core.Xb(3, "ngIf", core.Bb(!ctx._content)));
        },
        directives: [ common.k, sidenav_es5_MatDrawerContent ],
        styles: [ ".mat-drawer-container{position:relative;z-index:1;box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-drawer-container[fullscreen]{top:0;left:0;right:0;bottom:0;position:absolute}.mat-drawer-container[fullscreen].mat-drawer-opened{overflow:hidden}.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side{z-index:3}.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,.mat-drawer-container.ng-animate-disabled .mat-drawer-content,.ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,.ng-animate-disabled .mat-drawer-container .mat-drawer-content{transition:none}.mat-drawer-backdrop{top:0;left:0;right:0;bottom:0;position:absolute;display:block;z-index:3;visibility:hidden}.mat-drawer-backdrop.mat-drawer-shown{visibility:visible}.mat-drawer-transition .mat-drawer-backdrop{transition-duration:.4s;transition-timing-function:cubic-bezier(.25,.8,.25,1);transition-property:background-color,visibility}@media screen and (-ms-high-contrast:active){.mat-drawer-backdrop{opacity:.5}}.mat-drawer-content{position:relative;z-index:1;display:block;height:100%;overflow:auto}.mat-drawer-transition .mat-drawer-content{transition-duration:.4s;transition-timing-function:cubic-bezier(.25,.8,.25,1);transition-property:transform,margin-left,margin-right}.mat-drawer{position:relative;z-index:4;display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%,0,0)}@media screen and (-ms-high-contrast:active){.mat-drawer,[dir=rtl] .mat-drawer.mat-drawer-end{border-right:solid 1px currentColor}}@media screen and (-ms-high-contrast:active){.mat-drawer.mat-drawer-end,[dir=rtl] .mat-drawer{border-left:solid 1px currentColor;border-right:none}}.mat-drawer.mat-drawer-side{z-index:2}.mat-drawer.mat-drawer-end{right:0;transform:translate3d(100%,0,0)}[dir=rtl] .mat-drawer{transform:translate3d(100%,0,0)}[dir=rtl] .mat-drawer.mat-drawer-end{left:0;right:auto;transform:translate3d(-100%,0,0)}.mat-drawer-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.mat-sidenav-fixed{position:fixed}" ],
        encapsulation: 2,
        changeDetection: 0
    }), MatDrawerContainer;
}(), sidenav_es5_MatSidenavContent = function(_super) {
    function MatSidenavContent(changeDetectorRef, container, elementRef, scrollDispatcher, ngZone) {
        return _super.call(this, changeDetectorRef, container, elementRef, scrollDispatcher, ngZone) || this;
    }
    return Object(tslib_es6.c)(MatSidenavContent, _super), MatSidenavContent.ngComponentDef = core.Gb({
        type: MatSidenavContent,
        selectors: [ [ "mat-sidenav-content" ] ],
        factory: function(t) {
            return new (t || MatSidenavContent)(core.Kb(core.j), core.Kb(Object(core.lb)(function() {
                return sidenav_es5_MatSidenavContainer;
            })), core.Kb(core.q), core.Kb(scrolling_es5.b), core.Kb(core.K));
        },
        hostBindings: function(rf, ctx, elIndex) {
            1 & rf && (core.Rb(_c14), core.Ub(null, sidenav_es5_c1)), 2 & rf && (core.Tb(0, ctx._container._contentMargins.left, "px"), 
            core.Tb(1, ctx._container._contentMargins.right, "px"), core.Vb());
        },
        features: [ core.tb ],
        ngContentSelectors: sidenav_es5_c2,
        consts: 1,
        vars: 0,
        template: function(rf, ctx) {
            1 & rf && (core.vc(), core.uc(0));
        },
        encapsulation: 2,
        changeDetection: 0
    }), MatSidenavContent;
}(sidenav_es5_MatDrawerContent), sidenav_es5_MatSidenav = function(_super) {
    function MatSidenav() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        return _this._fixedInViewport = !1, _this._fixedTopGap = 0, _this._fixedBottomGap = 0, 
        _this;
    }
    Object(tslib_es6.c)(MatSidenav, _super), Object.defineProperty(MatSidenav.prototype, "fixedInViewport", {
        get: function() {
            return this._fixedInViewport;
        },
        set: function(value) {
            this._fixedInViewport = Object(coercion_es5.b)(value);
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(MatSidenav.prototype, "fixedTopGap", {
        get: function() {
            return this._fixedTopGap;
        },
        set: function(value) {
            this._fixedTopGap = Object(coercion_es5.d)(value);
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(MatSidenav.prototype, "fixedBottomGap", {
        get: function() {
            return this._fixedBottomGap;
        },
        set: function(value) {
            this._fixedBottomGap = Object(coercion_es5.d)(value);
        },
        enumerable: !0,
        configurable: !0
    }), MatSidenav.ngComponentDef = core.Gb({
        type: MatSidenav,
        selectors: [ [ "mat-sidenav" ] ],
        factory: function(t) {
            return \u0275MatSidenav_BaseFactory(t || MatSidenav);
        },
        hostBindings: function(rf, ctx, elIndex) {
            1 & rf && (core.Ab(2), core.Cb("@transform.start", function($event) {
                return ctx._onAnimationStart($event);
            }), core.Cb("@transform.done", function($event) {
                return ctx._onAnimationEnd($event);
            }), core.Rb(_c15), core.Ub(_c16, _c17)), 2 & rf && (core.Db(elIndex, "@transform", core.Bb(ctx._animationState), null, !0), 
            core.Mb(elIndex, "align", core.Bb(null)), core.Tb(0, ctx.fixedInViewport ? ctx.fixedTopGap : null, "px"), 
            core.Tb(1, ctx.fixedInViewport ? ctx.fixedBottomGap : null, "px"), core.Sb(0, "end" === ctx.position), 
            core.Sb(1, "over" === ctx.mode), core.Sb(2, "push" === ctx.mode), core.Sb(3, "side" === ctx.mode), 
            core.Sb(4, ctx.fixedInViewport), core.Vb());
        },
        inputs: {
            fixedInViewport: "fixedInViewport",
            fixedTopGap: "fixedTopGap",
            fixedBottomGap: "fixedBottomGap"
        },
        exportAs: [ "matSidenav" ],
        features: [ core.tb ],
        ngContentSelectors: sidenav_es5_c2,
        consts: 2,
        vars: 0,
        template: function(rf, ctx) {
            1 & rf && (core.vc(), core.Yb(0, "div", sidenav_es5_c5), core.uc(1), core.Qb());
        },
        encapsulation: 2,
        data: {
            animation: [ matDrawerAnimations.transformDrawer ]
        },
        changeDetection: 0
    });
    const \u0275MatSidenav_BaseFactory = core.ec(MatSidenav);
    return MatSidenav;
}(sidenav_es5_MatDrawer), sidenav_es5_MatSidenavContainer = function(_super) {
    function MatSidenavContainer() {
        return null !== _super && _super.apply(this, arguments) || this;
    }
    Object(tslib_es6.c)(MatSidenavContainer, _super), MatSidenavContainer.ngComponentDef = core.Gb({
        type: MatSidenavContainer,
        selectors: [ [ "mat-sidenav-container" ] ],
        factory: function(t) {
            return \u0275MatSidenavContainer_BaseFactory(t || MatSidenavContainer);
        },
        contentQueries: function(rf, ctx, dirIndex) {
            var _t;
            1 & rf && (core.Eb(dirIndex, sidenav_es5_MatSidenavContent, !0, null), core.Eb(dirIndex, sidenav_es5_MatSidenav, !1, null)), 
            2 & rf && (core.xc(_t = core.nc()) && (ctx._content = _t.first), core.xc(_t = core.nc()) && (ctx._drawers = _t));
        },
        hostBindings: function(rf, ctx, elIndex) {
            1 & rf && (core.Rb(_c18), core.Ub(sidenav_es5_c7)), 2 & rf && (core.Sb(0, ctx._backdropOverride), 
            core.Vb());
        },
        exportAs: [ "matSidenavContainer" ],
        features: [ core.tb ],
        ngContentSelectors: _c22,
        consts: 4,
        vars: 2,
        template: function(rf, ctx) {
            1 & rf && (core.vc(_c21, _c22), core.Ic(0, MatSidenavContainer_div_0_Template, 1, 0, "div", sidenav_es5_c8), 
            core.uc(1, 1), core.uc(2, 2), core.Ic(3, MatSidenavContainer_mat_sidenav_content_3_Template, 2, 0, "mat-sidenav-content", _c19)), 
            2 & rf && (core.Ec(0), core.Xb(0, "ngIf", core.Bb(ctx.hasBackdrop)), core.Ec(3), 
            core.Xb(3, "ngIf", core.Bb(!ctx._content)));
        },
        directives: [ common.k, scrolling_es5.a, sidenav_es5_MatSidenavContent ],
        styles: [ ".mat-drawer-container{position:relative;z-index:1;box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-drawer-container[fullscreen]{top:0;left:0;right:0;bottom:0;position:absolute}.mat-drawer-container[fullscreen].mat-drawer-opened{overflow:hidden}.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side{z-index:3}.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,.mat-drawer-container.ng-animate-disabled .mat-drawer-content,.ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,.ng-animate-disabled .mat-drawer-container .mat-drawer-content{transition:none}.mat-drawer-backdrop{top:0;left:0;right:0;bottom:0;position:absolute;display:block;z-index:3;visibility:hidden}.mat-drawer-backdrop.mat-drawer-shown{visibility:visible}.mat-drawer-transition .mat-drawer-backdrop{transition-duration:.4s;transition-timing-function:cubic-bezier(.25,.8,.25,1);transition-property:background-color,visibility}@media screen and (-ms-high-contrast:active){.mat-drawer-backdrop{opacity:.5}}.mat-drawer-content{position:relative;z-index:1;display:block;height:100%;overflow:auto}.mat-drawer-transition .mat-drawer-content{transition-duration:.4s;transition-timing-function:cubic-bezier(.25,.8,.25,1);transition-property:transform,margin-left,margin-right}.mat-drawer{position:relative;z-index:4;display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%,0,0)}@media screen and (-ms-high-contrast:active){.mat-drawer,[dir=rtl] .mat-drawer.mat-drawer-end{border-right:solid 1px currentColor}}@media screen and (-ms-high-contrast:active){.mat-drawer.mat-drawer-end,[dir=rtl] .mat-drawer{border-left:solid 1px currentColor;border-right:none}}.mat-drawer.mat-drawer-side{z-index:2}.mat-drawer.mat-drawer-end{right:0;transform:translate3d(100%,0,0)}[dir=rtl] .mat-drawer{transform:translate3d(100%,0,0)}[dir=rtl] .mat-drawer.mat-drawer-end{left:0;right:auto;transform:translate3d(-100%,0,0)}.mat-drawer-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.mat-sidenav-fixed{position:fixed}" ],
        encapsulation: 2,
        changeDetection: 0
    });
    const \u0275MatSidenavContainer_BaseFactory = core.ec(MatSidenavContainer);
    return MatSidenavContainer;
}(sidenav_es5_MatDrawerContainer), sidenav_es5_MatSidenavModule = function() {
    function MatSidenavModule() {}
    return MatSidenavModule.ngModuleDef = core.Ib({
        type: MatSidenavModule
    }), MatSidenavModule.ngInjectorDef = core.jb({
        factory: function(t) {
            return new (t || MatSidenavModule)();
        },
        imports: [ [ common.c, core_es5.b, scrolling_es5.c, platform_es5.b ], core_es5.b ]
    }), MatSidenavModule;
}();
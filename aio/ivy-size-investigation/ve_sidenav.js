function throwMatDuplicatedDrawerError(position) {
    throw Error("A drawer was already declared for 'position=\"" + position + "\"'");
}
var MAT_DRAWER_DEFAULT_AUTOSIZE = new core.q("MAT_DRAWER_DEFAULT_AUTOSIZE", {
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
    }, MatDrawerContent;
}(scrolling_es5.a), sidenav_es5_MatDrawer = function() {
    function MatDrawer(_elementRef, _focusTrapFactory, _focusMonitor, _platform, _ngZone, _doc) {
        var _this = this;
        this._elementRef = _elementRef, this._focusTrapFactory = _focusTrapFactory, this._focusMonitor = _focusMonitor, 
        this._platform = _platform, this._ngZone = _ngZone, this._doc = _doc, this._elementFocusedBeforeDrawerWasOpened = null, 
        this._enableAnimations = !1, this._position = "start", this._mode = "over", this._disableClose = !1, 
        this._autoFocus = !0, this._animationStarted = new core.m(), this._animationState = "void", 
        this.openedChange = new core.m(!0), this.onPositionChanged = new core.m(), this._modeChanged = new Subject.a(), 
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
    }), MatDrawer;
}(), sidenav_es5_MatDrawerContainer = function() {
    function MatDrawerContainer(_dir, _element, _ngZone, _changeDetectorRef, defaultAutosize, _animationMode) {
        void 0 === defaultAutosize && (defaultAutosize = !1);
        var _this = this;
        this._dir = _dir, this._element = _element, this._ngZone = _ngZone, this._changeDetectorRef = _changeDetectorRef, 
        this._animationMode = _animationMode, this.backdropClick = new core.m(), this._destroyed = new Subject.a(), 
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
    }, MatDrawerContainer;
}(), sidenav_es5_MatSidenavContent = function(_super) {
    function MatSidenavContent(changeDetectorRef, container, elementRef, scrollDispatcher, ngZone) {
        return _super.call(this, changeDetectorRef, container, elementRef, scrollDispatcher, ngZone) || this;
    }
    return Object(tslib_es6.c)(MatSidenavContent, _super), MatSidenavContent;
}(sidenav_es5_MatDrawerContent), sidenav_es5_MatSidenav = function(_super) {
    function MatSidenav() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        return _this._fixedInViewport = !1, _this._fixedTopGap = 0, _this._fixedBottomGap = 0, 
        _this;
    }
    return Object(tslib_es6.c)(MatSidenav, _super), Object.defineProperty(MatSidenav.prototype, "fixedInViewport", {
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
    }), MatSidenav;
}(sidenav_es5_MatDrawer), sidenav_es5_MatSidenavContainer = function(_super) {
    function MatSidenavContainer() {
        return null !== _super && _super.apply(this, arguments) || this;
    }
    return Object(tslib_es6.c)(MatSidenavContainer, _super), MatSidenavContainer;
}(sidenav_es5_MatDrawerContainer), MatSidenavModule = function() {
    return function() {};
}(), RenderType_MatSidenavContent = core.rb({
    encapsulation: 2,
    styles: [],
    data: {}
});
function View_MatSidenavContent_0(_l) {
    return core.Ob(2, [ core.Fb(null, 0) ], null, null);
}
var RenderType_MatSidenav = core.rb({
    encapsulation: 2,
    styles: [],
    data: {
        animation: [ {
            type: 7,
            name: "transform",
            definitions: [ {
                type: 0,
                name: "open, open-instant",
                styles: {
                    type: 6,
                    styles: {
                        transform: "none",
                        visibility: "visible"
                    },
                    offset: null
                },
                options: void 0
            }, {
                type: 0,
                name: "void",
                styles: {
                    type: 6,
                    styles: {
                        "box-shadow": "none",
                        visibility: "hidden"
                    },
                    offset: null
                },
                options: void 0
            }, {
                type: 1,
                expr: "void => open-instant",
                animation: {
                    type: 4,
                    styles: null,
                    timings: "0ms"
                },
                options: null
            }, {
                type: 1,
                expr: "void <=> open, open-instant => void",
                animation: {
                    type: 4,
                    styles: null,
                    timings: "400ms cubic-bezier(0.25, 0.8, 0.25, 1)"
                },
                options: null
            } ],
            options: {}
        } ]
    }
});
function View_MatSidenav_0(_l) {
    return core.Ob(2, [ (_l()(), core.ub(0, 0, null, null, 1, "div", [ [ "class", "mat-drawer-inner-container" ] ], null, null, null, null, null)), core.Fb(null, 0) ], null, null);
}
var RenderType_MatSidenavContainer = core.rb({
    encapsulation: 2,
    styles: [ ".mat-drawer-container{position:relative;z-index:1;box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-drawer-container[fullscreen]{top:0;left:0;right:0;bottom:0;position:absolute}.mat-drawer-container[fullscreen].mat-drawer-opened{overflow:hidden}.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side{z-index:3}.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,.mat-drawer-container.ng-animate-disabled .mat-drawer-content,.ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,.ng-animate-disabled .mat-drawer-container .mat-drawer-content{transition:none}.mat-drawer-backdrop{top:0;left:0;right:0;bottom:0;position:absolute;display:block;z-index:3;visibility:hidden}.mat-drawer-backdrop.mat-drawer-shown{visibility:visible}.mat-drawer-transition .mat-drawer-backdrop{transition-duration:.4s;transition-timing-function:cubic-bezier(.25,.8,.25,1);transition-property:background-color,visibility}@media screen and (-ms-high-contrast:active){.mat-drawer-backdrop{opacity:.5}}.mat-drawer-content{position:relative;z-index:1;display:block;height:100%;overflow:auto}.mat-drawer-transition .mat-drawer-content{transition-duration:.4s;transition-timing-function:cubic-bezier(.25,.8,.25,1);transition-property:transform,margin-left,margin-right}.mat-drawer{position:relative;z-index:4;display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%,0,0)}@media screen and (-ms-high-contrast:active){.mat-drawer,[dir=rtl] .mat-drawer.mat-drawer-end{border-right:solid 1px currentColor}}@media screen and (-ms-high-contrast:active){.mat-drawer.mat-drawer-end,[dir=rtl] .mat-drawer{border-left:solid 1px currentColor;border-right:none}}.mat-drawer.mat-drawer-side{z-index:2}.mat-drawer.mat-drawer-end{right:0;transform:translate3d(100%,0,0)}[dir=rtl] .mat-drawer{transform:translate3d(100%,0,0)}[dir=rtl] .mat-drawer.mat-drawer-end{left:0;right:auto;transform:translate3d(-100%,0,0)}.mat-drawer-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.mat-sidenav-fixed{position:fixed}" ],
    data: {}
});
function View_MatSidenavContainer_1(_l) {
    return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 0, "div", [ [ "class", "mat-drawer-backdrop" ] ], [ [ 2, "mat-drawer-shown", null ] ], [ [ null, "click" ] ], function(_v, en, $event) {
        var ad = !0;
        return "click" === en && (ad = !1 !== _v.component._onBackdropClicked() && ad), 
        ad;
    }, null, null)) ], null, function(_ck, _v) {
        _ck(_v, 0, 0, _v.component._isShowingBackdrop());
    });
}
function View_MatSidenavContainer_2(_l) {
    return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 3, "mat-sidenav-content", [ [ "cdkScrollable", "" ], [ "class", "mat-drawer-content mat-sidenav-content" ] ], [ [ 4, "margin-left", "px" ], [ 4, "margin-right", "px" ] ], null, null, View_MatSidenavContent_0, RenderType_MatSidenavContent)), core.tb(1, 212992, null, 0, scrolling_es5.a, [ core.k, scrolling_es5.b, core.A, [ 2, bidi_es5.b ] ], null, null), core.tb(2, 1294336, null, 0, sidenav_es5_MatSidenavContent, [ core.h, sidenav_es5_MatSidenavContainer, core.k, scrolling_es5.b, core.A ], null, null), core.Fb(0, 2) ], function(_ck, _v) {
        _ck(_v, 1, 0), _ck(_v, 2, 0);
    }, function(_ck, _v) {
        _ck(_v, 0, 0, core.Gb(_v, 2)._container._contentMargins.left, core.Gb(_v, 2)._container._contentMargins.right);
    });
}
function View_MatSidenavContainer_0(_l) {
    return core.Ob(2, [ core.Kb(402653184, 1, {
        _userContent: 0
    }), (_l()(), core.ib(16777216, null, null, 1, null, View_MatSidenavContainer_1)), core.tb(2, 16384, null, 0, common.k, [ core.R, core.O ], {
        ngIf: [ 0, "ngIf" ]
    }, null), core.Fb(null, 0), core.Fb(null, 1), (_l()(), core.ib(16777216, null, null, 1, null, View_MatSidenavContainer_2)), core.tb(6, 16384, null, 0, common.k, [ core.R, core.O ], {
        ngIf: [ 0, "ngIf" ]
    }, null) ], function(_ck, _v) {
        var _co = _v.component;
        _ck(_v, 2, 0, _co.hasBackdrop), _ck(_v, 6, 0, !_co._content);
    }, null);
}
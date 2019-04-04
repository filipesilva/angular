(window.webpackJsonp = window.webpackJsonp || []).push([ [ 5 ], {
    M2Lx: function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return MutationObserverFactory;
        }), __webpack_require__.d(__webpack_exports__, "b", function() {
            return ContentObserver;
        }), __webpack_require__.d(__webpack_exports__, "a", function() {
            return CdkObserveContent;
        }), __webpack_require__.d(__webpack_exports__, "d", function() {
            return ObserversModule;
        });
        var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("n6gG"), _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("CcnG"), rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("6blF"), rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("K9Ia"), rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("Gi3i"), MutationObserverFactory = function() {
            function MutationObserverFactory() {}
            return MutationObserverFactory.prototype.create = function(callback) {
                return "undefined" == typeof MutationObserver ? null : new MutationObserver(callback);
            }, MutationObserverFactory.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__.V)({
                factory: function() {
                    return new MutationObserverFactory();
                },
                token: MutationObserverFactory,
                providedIn: "root"
            }), MutationObserverFactory;
        }(), ContentObserver = function() {
            function ContentObserver(_mutationObserverFactory) {
                this._mutationObserverFactory = _mutationObserverFactory, this._observedElements = new Map();
            }
            return ContentObserver.prototype.ngOnDestroy = function() {
                var _this = this;
                this._observedElements.forEach(function(_, element) {
                    return _this._cleanupObserver(element);
                });
            }, ContentObserver.prototype.observe = function(elementOrRef) {
                var _this = this, element = elementOrRef instanceof _angular_core__WEBPACK_IMPORTED_MODULE_1__.k ? elementOrRef.nativeElement : elementOrRef;
                return rxjs__WEBPACK_IMPORTED_MODULE_2__.a.create(function(observer) {
                    var subscription = _this._observeElement(element).subscribe(observer);
                    return function() {
                        subscription.unsubscribe(), _this._unobserveElement(element);
                    };
                });
            }, ContentObserver.prototype._observeElement = function(element) {
                if (this._observedElements.has(element)) this._observedElements.get(element).count++; else {
                    var stream_1 = new rxjs__WEBPACK_IMPORTED_MODULE_3__.a(), observer = this._mutationObserverFactory.create(function(mutations) {
                        return stream_1.next(mutations);
                    });
                    observer && observer.observe(element, {
                        characterData: !0,
                        childList: !0,
                        subtree: !0
                    }), this._observedElements.set(element, {
                        observer: observer,
                        stream: stream_1,
                        count: 1
                    });
                }
                return this._observedElements.get(element).stream;
            }, ContentObserver.prototype._unobserveElement = function(element) {
                this._observedElements.has(element) && (this._observedElements.get(element).count--, 
                this._observedElements.get(element).count || this._cleanupObserver(element));
            }, ContentObserver.prototype._cleanupObserver = function(element) {
                if (this._observedElements.has(element)) {
                    var _a = this._observedElements.get(element), observer = _a.observer, stream = _a.stream;
                    observer && observer.disconnect(), stream.complete(), this._observedElements.delete(element);
                }
            }, ContentObserver.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__.V)({
                factory: function() {
                    return new ContentObserver(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__.Y)(MutationObserverFactory));
                },
                token: ContentObserver,
                providedIn: "root"
            }), ContentObserver;
        }(), CdkObserveContent = function() {
            function CdkObserveContent(_contentObserver, _elementRef, _ngZone) {
                this._contentObserver = _contentObserver, this._elementRef = _elementRef, this._ngZone = _ngZone, 
                this.event = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.m(), this._disabled = !1, 
                this._currentSubscription = null;
            }
            return Object.defineProperty(CdkObserveContent.prototype, "disabled", {
                get: function() {
                    return this._disabled;
                },
                set: function(value) {
                    this._disabled = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__.b)(value), 
                    this._disabled ? this._unsubscribe() : this._subscribe();
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(CdkObserveContent.prototype, "debounce", {
                get: function() {
                    return this._debounce;
                },
                set: function(value) {
                    this._debounce = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_0__.d)(value), 
                    this._subscribe();
                },
                enumerable: !0,
                configurable: !0
            }), CdkObserveContent.prototype.ngAfterContentInit = function() {
                this._currentSubscription || this.disabled || this._subscribe();
            }, CdkObserveContent.prototype.ngOnDestroy = function() {
                this._unsubscribe();
            }, CdkObserveContent.prototype._subscribe = function() {
                var _this = this;
                this._unsubscribe();
                var stream = this._contentObserver.observe(this._elementRef);
                this._ngZone.runOutsideAngular(function() {
                    _this._currentSubscription = (_this.debounce ? stream.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.a)(_this.debounce)) : stream).subscribe(_this.event);
                });
            }, CdkObserveContent.prototype._unsubscribe = function() {
                this._currentSubscription && this._currentSubscription.unsubscribe();
            }, CdkObserveContent;
        }(), ObserversModule = function() {
            return function() {};
        }();
    },
    kF7p: function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var core = __webpack_require__("CcnG"), CodeTabsComponent = function() {
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
            }, CodeTabsComponent;
        }(), code_tabs_module_CodeTabsModule = function() {
            return function() {
                this.customElementComponent = CodeTabsComponent;
            };
        }(), index_ngfactory = __webpack_require__("xYTU"), code_component_ngfactory = __webpack_require__("0GXo"), tslib_es6 = __webpack_require__("mrSG"), portal_es5 = __webpack_require__("4c35"), core_es5 = __webpack_require__("Wf4p"), Subject = __webpack_require__("K9Ia"), Subscription = __webpack_require__("pugT"), of = __webpack_require__("F/XL"), merge = __webpack_require__("p0ib"), startWith = (__webpack_require__("ihYY"), 
        __webpack_require__("p0Sj")), takeUntil = __webpack_require__("ny24"), coercion_es5 = __webpack_require__("n6gG"), keycodes_es5 = __webpack_require__("YSh2"), a11y_es5 = __webpack_require__("lLAP"), _MAT_INK_BAR_POSITIONER = new core.q("MatInkBarPositioner", {
            providedIn: "root",
            factory: function() {
                return function(element) {
                    return {
                        left: element ? (element.offsetLeft || 0) + "px" : "0",
                        width: element ? (element.offsetWidth || 0) + "px" : "0"
                    };
                };
            }
        }), MatInkBar = function() {
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
            }, MatInkBar;
        }(), tabs_es5_MatTabLabel = function(_super) {
            function MatTabLabel() {
                return null !== _super && _super.apply(this, arguments) || this;
            }
            return Object(tslib_es6.c)(MatTabLabel, _super), MatTabLabel;
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
                this._contentPortal = new portal_es5.h(this._explicitContent || this._implicitContent, this._viewContainerRef);
            }, MatTab;
        }(Object(core_es5.i)(MatTabBase)), tabs_es5_MatTabBodyPortal = function(_super) {
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
            }, MatTabBodyPortal;
        }(portal_es5.c), tabs_es5_MatTabBody = function() {
            function MatTabBody(_elementRef, _dir, changeDetectorRef) {
                var _this = this;
                this._elementRef = _elementRef, this._dir = _dir, this._dirChangeSubscription = Subscription.a.EMPTY, 
                this._onCentering = new core.m(), this._beforeCentering = new core.m(), this._afterLeavingCenter = new core.m(), 
                this._onCentered = new core.m(!0), this._dir && changeDetectorRef && (this._dirChangeSubscription = this._dir.change.subscribe(function(dir) {
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
            }, MatTabBody;
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
            }, MatTabLabelWrapper;
        }(Object(core_es5.i)(MatTabLabelWrapperBase)), MatTabHeaderBase = function() {
            return function() {};
        }(), tabs_es5_MatTabHeader = function(_super) {
            function MatTabHeader(_elementRef, _changeDetectorRef, _viewportRuler, _dir, _ngZone) {
                var _this = _super.call(this) || this;
                return _this._elementRef = _elementRef, _this._changeDetectorRef = _changeDetectorRef, 
                _this._viewportRuler = _viewportRuler, _this._dir = _dir, _this._ngZone = _ngZone, 
                _this._scrollDistance = 0, _this._selectedIndexChanged = !1, _this._destroyed = new Subject.a(), 
                _this._showPaginationControls = !1, _this._disableScrollAfter = !0, _this._disableScrollBefore = !0, 
                _this._selectedIndex = 0, _this.selectFocusedIndex = new core.m(), _this.indexFocused = new core.m(), 
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
            }, MatTabHeader;
        }(Object(core_es5.h)(MatTabHeaderBase)), nextId = 0, MatTabChangeEvent = function() {
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
                _this.headerPosition = "above", _this.selectedIndexChange = new core.m(), _this.focusChange = new core.m(), 
                _this.animationDone = new core.m(), _this.selectedTabChange = new core.m(!0), _this._groupId = nextId++, 
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
            }, MatTabGroup;
        }(Object(core_es5.g)(Object(core_es5.h)(MatTabGroupBase), "primary")), MatTabsModule = function() {
            return function() {};
        }(), common = __webpack_require__("Ip0R"), observers_es5 = __webpack_require__("M2Lx"), bidi_es5 = __webpack_require__("Fzqc"), platform_browser = __webpack_require__("ZYjt"), platform_es5 = __webpack_require__("dWZg"), fesm5_animations = __webpack_require__("wFw1"), scrolling_es5 = __webpack_require__("qAlS"), RenderType_MatTabGroup = core.rb({
            encapsulation: 2,
            styles: [ ".mat-tab-group{display:flex;flex-direction:column}.mat-tab-group.mat-tab-group-inverted-header{flex-direction:column-reverse}.mat-tab-label{height:48px;padding:0 24px;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;display:inline-flex;justify-content:center;align-items:center;white-space:nowrap;position:relative}.mat-tab-label:focus{outline:0}.mat-tab-label:focus:not(.mat-tab-disabled){opacity:1}@media screen and (-ms-high-contrast:active){.mat-tab-label:focus{outline:dotted 2px}}.mat-tab-label.mat-tab-disabled{cursor:default}@media screen and (-ms-high-contrast:active){.mat-tab-label.mat-tab-disabled{opacity:.5}}.mat-tab-label .mat-tab-label-content{display:inline-flex;justify-content:center;align-items:center;white-space:nowrap}@media screen and (-ms-high-contrast:active){.mat-tab-label{opacity:1}}@media (max-width:599px){.mat-tab-label{padding:0 12px}}@media (max-width:959px){.mat-tab-label{padding:0 12px}}.mat-tab-group[mat-stretch-tabs]>.mat-tab-header .mat-tab-label{flex-basis:0;flex-grow:1}.mat-tab-body-wrapper{position:relative;overflow:hidden;display:flex;transition:height .5s cubic-bezier(.35,0,.25,1)}.mat-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden;flex-basis:100%}.mat-tab-body.mat-tab-body-active{position:relative;overflow-x:hidden;overflow-y:auto;z-index:1;flex-grow:1}.mat-tab-group.mat-tab-group-dynamic-height .mat-tab-body.mat-tab-body-active{overflow-y:hidden}" ],
            data: {}
        });
        function View_MatTabGroup_3(_l) {
            return core.Ob(0, [ (_l()(), core.ib(0, null, null, 0)) ], null, null);
        }
        function View_MatTabGroup_2(_l) {
            return core.Ob(0, [ (_l()(), core.ib(16777216, null, null, 1, null, View_MatTabGroup_3)), core.tb(1, 212992, null, 0, portal_es5.c, [ core.j, core.R ], {
                portal: [ 0, "portal" ]
            }, null), (_l()(), core.ib(0, null, null, 0)) ], function(_ck, _v) {
                _ck(_v, 1, 0, _v.parent.context.$implicit.templateLabel);
            }, null);
        }
        function View_MatTabGroup_4(_l) {
            return core.Ob(0, [ (_l()(), core.Mb(0, null, [ "", "" ])) ], null, function(_ck, _v) {
                _ck(_v, 0, 0, _v.parent.context.$implicit.textLabel);
            });
        }
        function View_MatTabGroup_1(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 8, "div", [ [ "cdkMonitorElementFocus", "" ], [ "class", "mat-tab-label mat-ripple" ], [ "mat-ripple", "" ], [ "matTabLabelWrapper", "" ], [ "role", "tab" ] ], [ [ 8, "id", 0 ], [ 1, "tabIndex", 0 ], [ 1, "aria-posinset", 0 ], [ 1, "aria-setsize", 0 ], [ 1, "aria-controls", 0 ], [ 1, "aria-selected", 0 ], [ 1, "aria-label", 0 ], [ 1, "aria-labelledby", 0 ], [ 2, "mat-tab-label-active", null ], [ 2, "mat-ripple-unbounded", null ], [ 2, "mat-tab-disabled", null ], [ 1, "aria-disabled", 0 ] ], [ [ null, "click" ] ], function(_v, en, $event) {
                var ad = !0;
                return "click" === en && (ad = !1 !== _v.component._handleClick(_v.context.$implicit, core.Gb(_v.parent, 3), _v.context.index) && ad), 
                ad;
            }, null, null)), core.tb(1, 212992, null, 0, core_es5.d, [ core.k, core.A, platform_es5.a, [ 2, core_es5.b ], [ 2, fesm5_animations.a ] ], {
                disabled: [ 0, "disabled" ]
            }, null), core.tb(2, 147456, null, 0, a11y_es5.b, [ core.k, a11y_es5.d ], null, null), core.tb(3, 16384, [ [ 3, 4 ] ], 0, tabs_es5_MatTabLabelWrapper, [ core.k ], {
                disabled: [ 0, "disabled" ]
            }, null), (_l()(), core.ub(4, 0, null, null, 4, "div", [ [ "class", "mat-tab-label-content" ] ], null, null, null, null, null)), (_l()(), 
            core.ib(16777216, null, null, 1, null, View_MatTabGroup_2)), core.tb(6, 16384, null, 0, common.k, [ core.R, core.O ], {
                ngIf: [ 0, "ngIf" ]
            }, null), (_l()(), core.ib(16777216, null, null, 1, null, View_MatTabGroup_4)), core.tb(8, 16384, null, 0, common.k, [ core.R, core.O ], {
                ngIf: [ 0, "ngIf" ]
            }, null) ], function(_ck, _v) {
                _ck(_v, 1, 0, _v.context.$implicit.disabled || _v.component.disableRipple), _ck(_v, 3, 0, _v.context.$implicit.disabled), 
                _ck(_v, 6, 0, _v.context.$implicit.templateLabel), _ck(_v, 8, 0, !_v.context.$implicit.templateLabel);
            }, function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 0, 1, [ _co._getTabLabelId(_v.context.index), _co._getTabIndex(_v.context.$implicit, _v.context.index), _v.context.index + 1, _co._tabs.length, _co._getTabContentId(_v.context.index), _co.selectedIndex == _v.context.index, _v.context.$implicit.ariaLabel || null, !_v.context.$implicit.ariaLabel && _v.context.$implicit.ariaLabelledby ? _v.context.$implicit.ariaLabelledby : null, _co.selectedIndex == _v.context.index, core.Gb(_v, 1).unbounded, core.Gb(_v, 3).disabled, !!core.Gb(_v, 3).disabled ]);
            });
        }
        function View_MatTabGroup_5(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 1, "mat-tab-body", [ [ "class", "mat-tab-body" ], [ "role", "tabpanel" ] ], [ [ 8, "id", 0 ], [ 1, "aria-labelledby", 0 ], [ 2, "mat-tab-body-active", null ] ], [ [ null, "_onCentered" ], [ null, "_onCentering" ] ], function(_v, en, $event) {
                var ad = !0, _co = _v.component;
                return "_onCentered" === en && (ad = !1 !== _co._removeTabBodyWrapperHeight() && ad), 
                "_onCentering" === en && (ad = !1 !== _co._setTabBodyWrapperHeight($event) && ad), 
                ad;
            }, View_MatTabBody_0, RenderType_MatTabBody)), core.tb(1, 245760, null, 0, tabs_es5_MatTabBody, [ core.k, [ 2, bidi_es5.b ], core.h ], {
                _content: [ 0, "_content" ],
                origin: [ 1, "origin" ],
                position: [ 2, "position" ]
            }, {
                _onCentering: "_onCentering",
                _onCentered: "_onCentered"
            }) ], function(_ck, _v) {
                _ck(_v, 1, 0, _v.context.$implicit.content, _v.context.$implicit.origin, _v.context.$implicit.position);
            }, function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 0, 0, _co._getTabContentId(_v.context.index), _co._getTabLabelId(_v.context.index), _co.selectedIndex == _v.context.index);
            });
        }
        function View_MatTabGroup_0(_l) {
            return core.Ob(2, [ core.Kb(402653184, 1, {
                _tabBodyWrapper: 0
            }), core.Kb(402653184, 2, {
                _tabHeader: 0
            }), (_l()(), core.ub(2, 0, null, null, 4, "mat-tab-header", [ [ "class", "mat-tab-header" ] ], [ [ 2, "mat-tab-header-pagination-controls-enabled", null ], [ 2, "mat-tab-header-rtl", null ] ], [ [ null, "indexFocused" ], [ null, "selectFocusedIndex" ] ], function(_v, en, $event) {
                var ad = !0, _co = _v.component;
                return "indexFocused" === en && (ad = !1 !== _co._focusChanged($event) && ad), "selectFocusedIndex" === en && (ad = !1 !== (_co.selectedIndex = $event) && ad), 
                ad;
            }, View_MatTabHeader_0, RenderType_MatTabHeader)), core.tb(3, 3325952, [ [ 2, 4 ], [ "tabHeader", 4 ] ], 1, tabs_es5_MatTabHeader, [ core.k, core.h, scrolling_es5.e, [ 2, bidi_es5.b ], core.A ], {
                disableRipple: [ 0, "disableRipple" ],
                selectedIndex: [ 1, "selectedIndex" ]
            }, {
                selectFocusedIndex: "selectFocusedIndex",
                indexFocused: "indexFocused"
            }), core.Kb(603979776, 3, {
                _labelWrappers: 1
            }), (_l()(), core.ib(16777216, null, 0, 1, null, View_MatTabGroup_1)), core.tb(6, 278528, null, 0, common.j, [ core.R, core.O, core.t ], {
                ngForOf: [ 0, "ngForOf" ]
            }, null), (_l()(), core.ub(7, 0, [ [ 1, 0 ], [ "tabBodyWrapper", 1 ] ], null, 2, "div", [ [ "class", "mat-tab-body-wrapper" ] ], null, null, null, null, null)), (_l()(), 
            core.ib(16777216, null, null, 1, null, View_MatTabGroup_5)), core.tb(9, 278528, null, 0, common.j, [ core.R, core.O, core.t ], {
                ngForOf: [ 0, "ngForOf" ]
            }, null) ], function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 3, 0, _co.disableRipple, _co.selectedIndex), _ck(_v, 6, 0, _co._tabs), _ck(_v, 9, 0, _co._tabs);
            }, function(_ck, _v) {
                _ck(_v, 2, 0, core.Gb(_v, 3)._showPaginationControls, "rtl" == core.Gb(_v, 3)._getLayoutDirection());
            });
        }
        var RenderType_MatTabBody = core.rb({
            encapsulation: 2,
            styles: [ ".mat-tab-body-content{height:100%;overflow:auto}.mat-tab-group-dynamic-height .mat-tab-body-content{overflow:hidden}" ],
            data: {
                animation: [ {
                    type: 7,
                    name: "translateTab",
                    definitions: [ {
                        type: 0,
                        name: "center, void, left-origin-center, right-origin-center",
                        styles: {
                            type: 6,
                            styles: {
                                transform: "none"
                            },
                            offset: null
                        },
                        options: void 0
                    }, {
                        type: 0,
                        name: "left",
                        styles: {
                            type: 6,
                            styles: {
                                transform: "translate3d(-100%, 0, 0)",
                                minHeight: "1px"
                            },
                            offset: null
                        },
                        options: void 0
                    }, {
                        type: 0,
                        name: "right",
                        styles: {
                            type: 6,
                            styles: {
                                transform: "translate3d(100%, 0, 0)",
                                minHeight: "1px"
                            },
                            offset: null
                        },
                        options: void 0
                    }, {
                        type: 1,
                        expr: "* => left, * => right, left => center, right => center",
                        animation: {
                            type: 4,
                            styles: null,
                            timings: "500ms cubic-bezier(0.35, 0, 0.25, 1)"
                        },
                        options: null
                    }, {
                        type: 1,
                        expr: "void => left-origin-center",
                        animation: [ {
                            type: 6,
                            styles: {
                                transform: "translate3d(-100%, 0, 0)"
                            },
                            offset: null
                        }, {
                            type: 4,
                            styles: null,
                            timings: "500ms cubic-bezier(0.35, 0, 0.25, 1)"
                        } ],
                        options: null
                    }, {
                        type: 1,
                        expr: "void => right-origin-center",
                        animation: [ {
                            type: 6,
                            styles: {
                                transform: "translate3d(100%, 0, 0)"
                            },
                            offset: null
                        }, {
                            type: 4,
                            styles: null,
                            timings: "500ms cubic-bezier(0.35, 0, 0.25, 1)"
                        } ],
                        options: null
                    } ],
                    options: {}
                } ]
            }
        });
        function View_MatTabBody_1(_l) {
            return core.Ob(0, [ (_l()(), core.ib(0, null, null, 0)) ], null, null);
        }
        function View_MatTabBody_0(_l) {
            return core.Ob(2, [ core.Kb(402653184, 1, {
                _portalHost: 0
            }), (_l()(), core.ub(1, 0, [ [ "content", 1 ] ], null, 2, "div", [ [ "class", "mat-tab-body-content" ] ], [ [ 24, "@translateTab", 0 ] ], [ [ null, "@translateTab.start" ], [ null, "@translateTab.done" ] ], function(_v, en, $event) {
                var ad = !0, _co = _v.component;
                return "@translateTab.start" === en && (ad = !1 !== _co._onTranslateTabStarted($event) && ad), 
                "@translateTab.done" === en && (ad = !1 !== _co._onTranslateTabComplete($event) && ad), 
                ad;
            }, null, null)), (_l()(), core.ib(16777216, null, null, 1, null, View_MatTabBody_1)), core.tb(3, 212992, null, 0, tabs_es5_MatTabBodyPortal, [ core.j, core.R, tabs_es5_MatTabBody ], null, null) ], function(_ck, _v) {
                _ck(_v, 3, 0);
            }, function(_ck, _v) {
                _ck(_v, 1, 0, _v.component._position);
            });
        }
        var RenderType_MatTabHeader = core.rb({
            encapsulation: 2,
            styles: [ ".mat-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mat-tab-label{height:48px;padding:0 24px;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;display:inline-flex;justify-content:center;align-items:center;white-space:nowrap;position:relative}.mat-tab-label:focus{outline:0}.mat-tab-label:focus:not(.mat-tab-disabled){opacity:1}@media screen and (-ms-high-contrast:active){.mat-tab-label:focus{outline:dotted 2px}}.mat-tab-label.mat-tab-disabled{cursor:default}@media screen and (-ms-high-contrast:active){.mat-tab-label.mat-tab-disabled{opacity:.5}}.mat-tab-label .mat-tab-label-content{display:inline-flex;justify-content:center;align-items:center;white-space:nowrap}@media screen and (-ms-high-contrast:active){.mat-tab-label{opacity:1}}@media (max-width:599px){.mat-tab-label{min-width:72px}}.mat-ink-bar{position:absolute;bottom:0;height:2px;transition:.5s cubic-bezier(.35,0,.25,1)}.mat-tab-group-inverted-header .mat-ink-bar{bottom:auto;top:0}@media screen and (-ms-high-contrast:active){.mat-ink-bar{outline:solid 2px;height:0}}.mat-tab-header-pagination{position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2}.mat-tab-header-pagination-controls-enabled .mat-tab-header-pagination{display:flex}.mat-tab-header-pagination-before,.mat-tab-header-rtl .mat-tab-header-pagination-after{padding-left:4px}.mat-tab-header-pagination-before .mat-tab-header-pagination-chevron,.mat-tab-header-rtl .mat-tab-header-pagination-after .mat-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-tab-header-pagination-after,.mat-tab-header-rtl .mat-tab-header-pagination-before{padding-right:4px}.mat-tab-header-pagination-after .mat-tab-header-pagination-chevron,.mat-tab-header-rtl .mat-tab-header-pagination-before .mat-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;content:'';height:8px;width:8px}.mat-tab-header-pagination-disabled{box-shadow:none;cursor:default}.mat-tab-label-container{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mat-tab-list{flex-grow:1;position:relative;transition:transform .5s cubic-bezier(.35,0,.25,1)}.mat-tab-labels{display:flex}[mat-align-tabs=center] .mat-tab-labels{justify-content:center}[mat-align-tabs=end] .mat-tab-labels{justify-content:flex-end}" ],
            data: {}
        });
        function View_MatTabHeader_0(_l) {
            return core.Ob(2, [ core.Kb(402653184, 1, {
                _inkBar: 0
            }), core.Kb(402653184, 2, {
                _tabListContainer: 0
            }), core.Kb(402653184, 3, {
                _tabList: 0
            }), (_l()(), core.ub(3, 0, null, null, 2, "div", [ [ "aria-hidden", "true" ], [ "class", "mat-tab-header-pagination mat-tab-header-pagination-before mat-elevation-z4 mat-ripple" ], [ "mat-ripple", "" ] ], [ [ 2, "mat-tab-header-pagination-disabled", null ], [ 2, "mat-ripple-unbounded", null ] ], [ [ null, "click" ] ], function(_v, en, $event) {
                var ad = !0;
                return "click" === en && (ad = !1 !== _v.component._scrollHeader("before") && ad), 
                ad;
            }, null, null)), core.tb(4, 212992, null, 0, core_es5.d, [ core.k, core.A, platform_es5.a, [ 2, core_es5.b ], [ 2, fesm5_animations.a ] ], {
                disabled: [ 0, "disabled" ]
            }, null), (_l()(), core.ub(5, 0, null, null, 0, "div", [ [ "class", "mat-tab-header-pagination-chevron" ] ], null, null, null, null, null)), (_l()(), 
            core.ub(6, 0, [ [ 2, 0 ], [ "tabListContainer", 1 ] ], null, 6, "div", [ [ "class", "mat-tab-label-container" ] ], null, [ [ null, "keydown" ] ], function(_v, en, $event) {
                var ad = !0;
                return "keydown" === en && (ad = !1 !== _v.component._handleKeydown($event) && ad), 
                ad;
            }, null, null)), (_l()(), core.ub(7, 0, [ [ 3, 0 ], [ "tabList", 1 ] ], null, 5, "div", [ [ "class", "mat-tab-list" ], [ "role", "tablist" ] ], null, [ [ null, "cdkObserveContent" ] ], function(_v, en, $event) {
                var ad = !0;
                return "cdkObserveContent" === en && (ad = !1 !== _v.component._onContentChanges() && ad), 
                ad;
            }, null, null)), core.tb(8, 1196032, null, 0, observers_es5.a, [ observers_es5.b, core.k, core.A ], null, {
                event: "cdkObserveContent"
            }), (_l()(), core.ub(9, 0, null, null, 1, "div", [ [ "class", "mat-tab-labels" ] ], null, null, null, null, null)), core.Fb(null, 0), (_l()(), 
            core.ub(11, 0, null, null, 1, "mat-ink-bar", [ [ "class", "mat-ink-bar" ] ], null, null, null, null, null)), core.tb(12, 16384, [ [ 1, 4 ] ], 0, MatInkBar, [ core.k, core.A, _MAT_INK_BAR_POSITIONER ], null, null), (_l()(), 
            core.ub(13, 0, null, null, 2, "div", [ [ "aria-hidden", "true" ], [ "class", "mat-tab-header-pagination mat-tab-header-pagination-after mat-elevation-z4 mat-ripple" ], [ "mat-ripple", "" ] ], [ [ 2, "mat-tab-header-pagination-disabled", null ], [ 2, "mat-ripple-unbounded", null ] ], [ [ null, "click" ] ], function(_v, en, $event) {
                var ad = !0;
                return "click" === en && (ad = !1 !== _v.component._scrollHeader("after") && ad), 
                ad;
            }, null, null)), core.tb(14, 212992, null, 0, core_es5.d, [ core.k, core.A, platform_es5.a, [ 2, core_es5.b ], [ 2, fesm5_animations.a ] ], {
                disabled: [ 0, "disabled" ]
            }, null), (_l()(), core.ub(15, 0, null, null, 0, "div", [ [ "class", "mat-tab-header-pagination-chevron" ] ], null, null, null, null, null)) ], function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 4, 0, _co._disableScrollBefore || _co.disableRipple), _ck(_v, 14, 0, _co._disableScrollAfter || _co.disableRipple);
            }, function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 3, 0, _co._disableScrollBefore, core.Gb(_v, 4).unbounded), _ck(_v, 13, 0, _co._disableScrollAfter, core.Gb(_v, 14).unbounded);
            });
        }
        var RenderType_MatTab = core.rb({
            encapsulation: 2,
            styles: [],
            data: {}
        });
        function View_MatTab_1(_l) {
            return core.Ob(0, [ core.Fb(null, 0), (_l()(), core.ib(0, null, null, 0)) ], null, null);
        }
        function View_MatTab_0(_l) {
            return core.Ob(2, [ core.Kb(402653184, 1, {
                _implicitContent: 0
            }), (_l()(), core.ib(0, [ [ 1, 2 ] ], null, 0, null, View_MatTab_1)) ], null, null);
        }
        var code_component = __webpack_require__("6CTB"), snack_bar_es5 = __webpack_require__("vARd"), pretty_printer_service = __webpack_require__("vVVL"), copier_service = __webpack_require__("/ck9"), logger_service = __webpack_require__("vHPH"), MatCard = function() {
            return function() {};
        }(), MatCardModule = function() {
            return function() {};
        }(), RenderType_MatCard = core.rb({
            encapsulation: 2,
            styles: [ ".mat-card{transition:box-shadow 280ms cubic-bezier(.4,0,.2,1);display:block;position:relative;padding:16px;border-radius:4px}.mat-card .mat-divider-horizontal{position:absolute;left:0;width:100%}[dir=rtl] .mat-card .mat-divider-horizontal{left:auto;right:0}.mat-card .mat-divider-horizontal.mat-divider-inset{position:static;margin:0}[dir=rtl] .mat-card .mat-divider-horizontal.mat-divider-inset{margin-right:0}@media screen and (-ms-high-contrast:active){.mat-card{outline:solid 1px}}.mat-card-actions,.mat-card-content,.mat-card-subtitle{display:block;margin-bottom:16px}.mat-card-title{display:block;margin-bottom:8px}.mat-card-actions{margin-left:-8px;margin-right:-8px;padding:8px 0}.mat-card-actions-align-end{display:flex;justify-content:flex-end}.mat-card-image{width:calc(100% + 32px);margin:0 -16px 16px -16px}.mat-card-footer{display:block;margin:0 -16px -16px -16px}.mat-card-actions .mat-button,.mat-card-actions .mat-raised-button{margin:0 8px}.mat-card-header{display:flex;flex-direction:row}.mat-card-header .mat-card-title{margin-bottom:12px}.mat-card-header-text{margin:0 16px}.mat-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-card-title-group{display:flex;justify-content:space-between}.mat-card-sm-image{width:80px;height:80px}.mat-card-md-image{width:112px;height:112px}.mat-card-lg-image{width:152px;height:152px}.mat-card-xl-image{width:240px;height:240px;margin:-8px}.mat-card-title-group>.mat-card-xl-image{margin:-8px 0 8px 0}@media (max-width:599px){.mat-card-title-group{margin:0}.mat-card-xl-image{margin-left:0;margin-right:0}}.mat-card-content>:first-child,.mat-card>:first-child{margin-top:0}.mat-card-content>:last-child:not(.mat-card-footer),.mat-card>:last-child:not(.mat-card-footer){margin-bottom:0}.mat-card-image:first-child{margin-top:-16px;border-top-left-radius:inherit;border-top-right-radius:inherit}.mat-card>.mat-card-actions:last-child{margin-bottom:-8px;padding-bottom:0}.mat-card-actions .mat-button:first-child,.mat-card-actions .mat-raised-button:first-child{margin-left:0;margin-right:0}.mat-card-title{margin-bottom:8px}.mat-card-subtitle:not(:first-child),.mat-card-title:not(:first-child){margin-top:-4px}.mat-card-header .mat-card-subtitle:not(:first-child){margin-top:-8px}.mat-card>.mat-card-xl-image:first-child{margin-top:-8px}.mat-card>.mat-card-xl-image:last-child{margin-bottom:-8px}" ],
            data: {}
        });
        function View_MatCard_0(_l) {
            return core.Ob(2, [ core.Fb(null, 0), core.Fb(null, 1) ], null, null);
        }
        var RenderType_CodeTabsComponent = core.rb({
            encapsulation: 2,
            styles: [],
            data: {}
        });
        function View_CodeTabsComponent_2(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 1, "span", [], [ [ 8, "className", 0 ] ], null, null, null, null)), (_l()(), 
            core.Mb(1, null, [ "", "" ])) ], null, function(_ck, _v) {
                _ck(_v, 0, 0, core.zb(1, "", _v.parent.context.$implicit.class, "")), _ck(_v, 1, 0, _v.parent.context.$implicit.header);
            });
        }
        function View_CodeTabsComponent_1(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 16777216, null, null, 7, "mat-tab", [ [ "style", "overflow-y: hidden;" ] ], null, null, null, View_MatTab_0, RenderType_MatTab)), core.tb(1, 770048, [ [ 3, 4 ] ], 2, tabs_es5_MatTab, [ core.R ], null, null), core.Kb(335544320, 4, {
                templateLabel: 0
            }), core.Kb(335544320, 5, {
                _explicitContent: 0
            }), (_l()(), core.ib(16777216, null, 0, 1, null, View_CodeTabsComponent_2)), core.tb(5, 16384, [ [ 4, 4 ] ], 0, tabs_es5_MatTabLabel, [ core.O, core.R ], null, null), (_l()(), 
            core.ub(6, 0, null, 0, 1, "aio-code", [], [ [ 8, "className", 0 ] ], null, null, code_component_ngfactory.c, code_component_ngfactory.b)), core.tb(7, 573440, [ [ 2, 4 ] ], 0, code_component.a, [ snack_bar_es5.b, pretty_printer_service.a, copier_service.a, logger_service.a ], {
                language: [ 0, "language" ],
                linenums: [ 1, "linenums" ],
                path: [ 2, "path" ],
                region: [ 3, "region" ],
                header: [ 4, "header" ]
            }, null), (_l()(), core.ib(0, null, null, 0)) ], function(_ck, _v) {
                _ck(_v, 1, 0), _ck(_v, 7, 0, _v.context.$implicit.language, _v.context.$implicit.linenums, _v.context.$implicit.path, _v.context.$implicit.region, _v.context.$implicit.header);
            }, function(_ck, _v) {
                _ck(_v, 6, 0, core.zb(1, "", _v.context.$implicit.class, ""));
            });
        }
        function View_CodeTabsComponent_0(_l) {
            return core.Ob(0, [ core.Kb(402653184, 1, {
                content: 0
            }), core.Kb(671088640, 2, {
                codeComponents: 1
            }), (_l()(), core.ub(2, 0, [ [ 1, 0 ], [ "content", 1 ] ], null, 1, "div", [ [ "style", "display: none" ] ], null, null, null, null, null)), core.Fb(null, 0), (_l()(), 
            core.ub(4, 0, null, null, 6, "mat-card", [ [ "class", "mat-card" ] ], null, null, null, View_MatCard_0, RenderType_MatCard)), core.tb(5, 49152, null, 0, MatCard, [], null, null), (_l()(), 
            core.ub(6, 0, null, 0, 4, "mat-tab-group", [ [ "class", "code-tab-group mat-tab-group" ], [ "disableRipple", "" ] ], [ [ 2, "mat-tab-group-dynamic-height", null ], [ 2, "mat-tab-group-inverted-header", null ] ], null, null, View_MatTabGroup_0, RenderType_MatTabGroup)), core.tb(7, 3325952, null, 1, tabs_es5_MatTabGroup, [ core.k, core.h ], {
                disableRipple: [ 0, "disableRipple" ]
            }, null), core.Kb(603979776, 3, {
                _tabs: 1
            }), (_l()(), core.ib(16777216, null, null, 1, null, View_CodeTabsComponent_1)), core.tb(10, 278528, null, 0, common.j, [ core.R, core.O, core.t ], {
                ngForOf: [ 0, "ngForOf" ]
            }, null) ], function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 7, 0, ""), _ck(_v, 10, 0, _co.tabs);
            }, function(_ck, _v) {
                _ck(_v, 6, 0, core.Gb(_v, 7).dynamicHeight, "below" === core.Gb(_v, 7).headerPosition);
            });
        }
        function View_CodeTabsComponent_Host_0(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 1, "code-tabs", [], null, null, null, View_CodeTabsComponent_0, RenderType_CodeTabsComponent)), core.tb(1, 4308992, null, 0, CodeTabsComponent, [], null, null) ], function(_ck, _v) {
                _ck(_v, 1, 0);
            }, null);
        }
        var CodeTabsComponentNgFactory = core.pb("code-tabs", CodeTabsComponent, View_CodeTabsComponent_Host_0, {
            linenums: "linenums"
        }, {}, [ "*" ]), overlay_es5 = __webpack_require__("eDkP"), button_es5 = __webpack_require__("UodH"), code_module = __webpack_require__("V90o");
        __webpack_require__.d(__webpack_exports__, "CodeTabsModuleNgFactory", function() {
            return CodeTabsModuleNgFactory;
        });
        var CodeTabsModuleNgFactory = core.qb(code_tabs_module_CodeTabsModule, [], function(_l) {
            return core.Db([ core.Eb(512, core.j, core.db, [ [ 8, [ index_ngfactory.a, index_ngfactory.b, code_component_ngfactory.a, CodeTabsComponentNgFactory ] ], [ 3, core.j ], core.y ]), core.Eb(4608, common.m, common.l, [ core.v, [ 2, common.B ] ]), core.Eb(4608, observers_es5.c, observers_es5.c, []), core.Eb(4608, overlay_es5.a, overlay_es5.a, [ overlay_es5.g, overlay_es5.c, core.j, overlay_es5.f, overlay_es5.d, core.r, core.A, common.d, bidi_es5.b, [ 2, common.g ] ]), core.Eb(5120, overlay_es5.h, overlay_es5.i, [ overlay_es5.a ]), core.Eb(4608, pretty_printer_service.a, pretty_printer_service.a, [ logger_service.a ]), core.Eb(4608, copier_service.a, copier_service.a, []), core.Eb(1073742336, common.c, common.c, []), core.Eb(1073742336, bidi_es5.a, bidi_es5.a, []), core.Eb(1073742336, core_es5.c, core_es5.c, [ [ 2, core_es5.a ], [ 2, platform_browser.f ] ]), core.Eb(1073742336, MatCardModule, MatCardModule, []), core.Eb(1073742336, portal_es5.g, portal_es5.g, []), core.Eb(1073742336, platform_es5.b, platform_es5.b, []), core.Eb(1073742336, core_es5.e, core_es5.e, []), core.Eb(1073742336, observers_es5.d, observers_es5.d, []), core.Eb(1073742336, a11y_es5.a, a11y_es5.a, []), core.Eb(1073742336, MatTabsModule, MatTabsModule, []), core.Eb(1073742336, scrolling_es5.c, scrolling_es5.c, []), core.Eb(1073742336, overlay_es5.e, overlay_es5.e, []), core.Eb(1073742336, button_es5.c, button_es5.c, []), core.Eb(1073742336, snack_bar_es5.e, snack_bar_es5.e, []), core.Eb(1073742336, code_module.a, code_module.a, []), core.Eb(1073742336, code_tabs_module_CodeTabsModule, code_tabs_module_CodeTabsModule, []) ]);
        });
    }
} ]);
//# sourceMappingURL=code-code-tabs-module-ngfactory.9968672e2be4920ee825.js.map
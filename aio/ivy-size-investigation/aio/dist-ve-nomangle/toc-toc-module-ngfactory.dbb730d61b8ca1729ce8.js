(window.webpackJsonp = window.webpackJsonp || []).push([ [ 13 ], {
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
    s8K4: function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var core = __webpack_require__("CcnG"), Subject = __webpack_require__("K9Ia"), combineLatest = __webpack_require__("dzgT"), asap = __webpack_require__("KQya"), takeUntil = __webpack_require__("ny24"), tslib_es6 = __webpack_require__("mrSG"), Observable = __webpack_require__("6blF"), isNumeric = __webpack_require__("/21U"), SubscribeOnObservable_SubscribeOnObservable = function(_super) {
            function SubscribeOnObservable(source, delayTime, scheduler) {
                void 0 === delayTime && (delayTime = 0), void 0 === scheduler && (scheduler = asap.a);
                var _this = _super.call(this) || this;
                return _this.source = source, _this.delayTime = delayTime, _this.scheduler = scheduler, 
                (!Object(isNumeric.a)(delayTime) || delayTime < 0) && (_this.delayTime = 0), scheduler && "function" == typeof scheduler.schedule || (_this.scheduler = asap.a), 
                _this;
            }
            return tslib_es6.c(SubscribeOnObservable, _super), SubscribeOnObservable.create = function(source, delay, scheduler) {
                return void 0 === delay && (delay = 0), void 0 === scheduler && (scheduler = asap.a), 
                new SubscribeOnObservable(source, delay, scheduler);
            }, SubscribeOnObservable.dispatch = function(arg) {
                return this.add(arg.source.subscribe(arg.subscriber));
            }, SubscribeOnObservable.prototype._subscribe = function(subscriber) {
                return this.scheduler.schedule(SubscribeOnObservable.dispatch, this.delayTime, {
                    source: this.source,
                    subscriber: subscriber
                });
            }, SubscribeOnObservable;
        }(Observable.a), subscribeOn_SubscribeOnOperator = function() {
            function SubscribeOnOperator(scheduler, delay) {
                this.scheduler = scheduler, this.delay = delay;
            }
            return SubscribeOnOperator.prototype.call = function(subscriber, source) {
                return new SubscribeOnObservable_SubscribeOnObservable(source, this.delay, this.scheduler).subscribe(subscriber);
            }, SubscribeOnOperator;
        }(), startWith = __webpack_require__("p0Sj"), toc_component_TocComponent = function() {
            function TocComponent(scrollService, elementRef, tocService) {
                this.scrollService = scrollService, this.tocService = tocService, this.activeIndex = null, 
                this.type = "None", this.isCollapsed = !0, this.isEmbedded = !1, this.onDestroy = new Subject.a(), 
                this.primaryMax = 4, this.isEmbedded = -1 !== elementRef.nativeElement.className.indexOf("embedded");
            }
            return TocComponent.prototype.ngOnInit = function() {
                var _this = this;
                this.tocService.tocList.pipe(Object(takeUntil.a)(this.onDestroy)).subscribe(function(tocList) {
                    _this.tocList = tocList;
                    var fn, itemCount = (fn = function(item) {
                        return "h1" !== item.level;
                    }, _this.tocList.reduce(function(result, item) {
                        return fn(item) ? result + 1 : result;
                    }, 0));
                    _this.type = itemCount > 0 ? _this.isEmbedded ? itemCount > _this.primaryMax ? "EmbeddedExpandable" : "EmbeddedSimple" : "Floating" : "None";
                });
            }, TocComponent.prototype.ngAfterViewInit = function() {
                var scheduler, delay, _this = this;
                this.isEmbedded || Object(combineLatest.a)(this.tocService.activeItemIndex.pipe((scheduler = asap.a, 
                void 0 === delay && (delay = 0), function(source) {
                    return source.lift(new subscribeOn_SubscribeOnOperator(scheduler, delay));
                })), this.items.changes.pipe(Object(startWith.a)(this.items))).pipe(Object(takeUntil.a)(this.onDestroy)).subscribe(function(_a) {
                    var index = _a[0], items = _a[1];
                    if (_this.activeIndex = index, !(null === index || index >= items.length)) {
                        var e = items.toArray()[index].nativeElement, p = e.offsetParent, eRect = e.getBoundingClientRect(), pRect = p.getBoundingClientRect();
                        eRect.top >= pRect.top && eRect.bottom <= pRect.bottom || (p.scrollTop += eRect.top - pRect.top - p.clientHeight / 2);
                    }
                });
            }, TocComponent.prototype.ngOnDestroy = function() {
                this.onDestroy.next();
            }, TocComponent.prototype.toggle = function(canScroll) {
                void 0 === canScroll && (canScroll = !0), this.isCollapsed = !this.isCollapsed, 
                canScroll && this.isCollapsed && this.toTop();
            }, TocComponent.prototype.toTop = function() {
                this.scrollService.scrollToTop();
            }, TocComponent;
        }(), toc_module_TocModule = function() {
            return function() {
                this.customElementComponent = toc_component_TocComponent;
            };
        }(), index_ngfactory = __webpack_require__("Mr+X"), icon_es5 = __webpack_require__("SMsm"), common = __webpack_require__("Ip0R"), scroll_service = __webpack_require__("Faly"), toc_service = __webpack_require__("TNhP"), RenderType_TocComponent = core.rb({
            encapsulation: 2,
            styles: [],
            data: {}
        });
        function View_TocComponent_2(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 1, "div", [ [ "class", "toc-heading embedded" ] ], null, null, null, null, null)), (_l()(), 
            core.Mb(-1, null, [ " Contents " ])) ], null, null);
        }
        function View_TocComponent_3(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 3, "button", [ [ "aria-label", "Expand/collapse contents" ], [ "class", "toc-heading embedded secondary" ], [ "title", "Expand/collapse contents" ], [ "type", "button" ] ], [ [ 1, "aria-pressed", 0 ] ], [ [ null, "click" ] ], function(_v, en, $event) {
                var ad = !0;
                return "click" === en && (ad = !1 !== _v.component.toggle(!1) && ad), ad;
            }, null, null)), (_l()(), core.Mb(-1, null, [ " Contents " ])), (_l()(), core.ub(2, 0, null, null, 1, "mat-icon", [ [ "class", "rotating-icon mat-icon" ], [ "role", "img" ], [ "svgIcon", "keyboard_arrow_right" ] ], [ [ 2, "collapsed", null ], [ 2, "mat-icon-inline", null ] ], null, null, index_ngfactory.b, index_ngfactory.a)), core.tb(3, 9158656, null, 0, icon_es5.b, [ core.k, icon_es5.d, [ 8, null ], [ 2, icon_es5.a ] ], {
                svgIcon: [ 0, "svgIcon" ]
            }, null) ], function(_ck, _v) {
                _ck(_v, 3, 0, "keyboard_arrow_right");
            }, function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 0, 0, !_co.isCollapsed), _ck(_v, 2, 0, _co.isCollapsed, core.Gb(_v, 3).inline);
            });
        }
        function View_TocComponent_5(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, [ [ 1, 0 ], [ "tocItem", 1 ] ], null, 1, "li", [], [ [ 8, "title", 0 ], [ 8, "className", 0 ], [ 2, "secondary", null ], [ 2, "active", null ] ], null, null, null, null)), (_l()(), 
            core.ub(1, 0, null, null, 0, "a", [], [ [ 8, "href", 4 ], [ 8, "innerHTML", 1 ] ], null, null, null, null)) ], null, function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 0, 0, core.zb(1, "", _v.parent.context.$implicit.title, ""), core.zb(1, "", _v.parent.context.$implicit.level, ""), "EmbeddedExpandable" === _co.type && _v.parent.context.index >= _co.primaryMax, _v.parent.context.index === _co.activeIndex), 
                _ck(_v, 1, 0, _v.parent.context.$implicit.href, _v.parent.context.$implicit.content);
            });
        }
        function View_TocComponent_4(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 2, null, null, null, null, null, null, null)), (_l()(), 
            core.ib(16777216, null, null, 1, null, View_TocComponent_5)), core.tb(2, 16384, null, 0, common.k, [ core.R, core.O ], {
                ngIf: [ 0, "ngIf" ]
            }, null), (_l()(), core.ib(0, null, null, 0)) ], function(_ck, _v) {
                _ck(_v, 2, 0, "Floating" === _v.component.type || "h1" !== _v.context.$implicit.level);
            }, null);
        }
        function View_TocComponent_6(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 0, "button", [ [ "aria-label", "Expand/collapse contents" ], [ "class", "toc-more-items embedded material-icons" ], [ "title", "Expand/collapse contents" ], [ "type", "button" ] ], [ [ 2, "collapsed", null ], [ 1, "aria-pressed", 0 ] ], [ [ null, "click" ] ], function(_v, en, $event) {
                var ad = !0;
                return "click" === en && (ad = !1 !== _v.component.toggle() && ad), ad;
            }, null, null)) ], null, function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 0, 0, _co.isCollapsed, !_co.isCollapsed);
            });
        }
        function View_TocComponent_1(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 9, "div", [ [ "class", "toc-inner no-print" ] ], [ [ 2, "collapsed", null ] ], null, null, null, null)), (_l()(), 
            core.ib(16777216, null, null, 1, null, View_TocComponent_2)), core.tb(2, 16384, null, 0, common.k, [ core.R, core.O ], {
                ngIf: [ 0, "ngIf" ]
            }, null), (_l()(), core.ib(16777216, null, null, 1, null, View_TocComponent_3)), core.tb(4, 16384, null, 0, common.k, [ core.R, core.O ], {
                ngIf: [ 0, "ngIf" ]
            }, null), (_l()(), core.ub(5, 0, null, null, 2, "ul", [ [ "class", "toc-list" ] ], [ [ 2, "embedded", null ] ], null, null, null, null)), (_l()(), 
            core.ib(16777216, null, null, 1, null, View_TocComponent_4)), core.tb(7, 278528, null, 0, common.j, [ core.R, core.O, core.t ], {
                ngForOf: [ 0, "ngForOf" ]
            }, null), (_l()(), core.ib(16777216, null, null, 1, null, View_TocComponent_6)), core.tb(9, 16384, null, 0, common.k, [ core.R, core.O ], {
                ngIf: [ 0, "ngIf" ]
            }, null) ], function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 2, 0, "EmbeddedSimple" === _co.type), _ck(_v, 4, 0, "EmbeddedExpandable" === _co.type), 
                _ck(_v, 7, 0, _co.tocList), _ck(_v, 9, 0, "EmbeddedExpandable" === _co.type);
            }, function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 0, 0, _co.isCollapsed), _ck(_v, 5, 0, "Floating" !== _co.type);
            });
        }
        function View_TocComponent_0(_l) {
            return core.Ob(0, [ core.Kb(671088640, 1, {
                items: 1
            }), (_l()(), core.ib(16777216, null, null, 1, null, View_TocComponent_1)), core.tb(2, 16384, null, 0, common.k, [ core.R, core.O ], {
                ngIf: [ 0, "ngIf" ]
            }, null) ], function(_ck, _v) {
                _ck(_v, 2, 0, "None" !== _v.component.type);
            }, null);
        }
        function View_TocComponent_Host_0(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 1, "aio-toc", [], null, null, null, View_TocComponent_0, RenderType_TocComponent)), core.tb(1, 4440064, null, 0, toc_component_TocComponent, [ scroll_service.a, core.k, toc_service.a ], null, null) ], function(_ck, _v) {
                _ck(_v, 1, 0);
            }, null);
        }
        var TocComponentNgFactory = core.pb("aio-toc", toc_component_TocComponent, View_TocComponent_Host_0, {}, {}, []), bidi_es5 = __webpack_require__("Fzqc"), core_es5 = __webpack_require__("Wf4p"), platform_browser = __webpack_require__("ZYjt");
        __webpack_require__.d(__webpack_exports__, "TocModuleNgFactory", function() {
            return TocModuleNgFactory;
        });
        var TocModuleNgFactory = core.qb(toc_module_TocModule, [], function(_l) {
            return core.Db([ core.Eb(512, core.j, core.db, [ [ 8, [ TocComponentNgFactory ] ], [ 3, core.j ], core.y ]), core.Eb(4608, common.m, common.l, [ core.v, [ 2, common.B ] ]), core.Eb(1073742336, common.c, common.c, []), core.Eb(1073742336, bidi_es5.a, bidi_es5.a, []), core.Eb(1073742336, core_es5.c, core_es5.c, [ [ 2, core_es5.a ], [ 2, platform_browser.f ] ]), core.Eb(1073742336, icon_es5.c, icon_es5.c, []), core.Eb(1073742336, toc_module_TocModule, toc_module_TocModule, []) ]);
        });
    }
} ]);
//# sourceMappingURL=toc-toc-module-ngfactory.dbb730d61b8ca1729ce8.js.map
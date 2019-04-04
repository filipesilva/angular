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
        var core = __webpack_require__("CcnG"), common = __webpack_require__("Ip0R"), icon_es5 = __webpack_require__("SMsm"), Subject = __webpack_require__("K9Ia"), combineLatest = __webpack_require__("dzgT"), asap = __webpack_require__("KQya"), takeUntil = __webpack_require__("ny24"), tslib_es6 = __webpack_require__("mrSG"), Observable = __webpack_require__("6blF"), isNumeric = __webpack_require__("/21U"), SubscribeOnObservable_SubscribeOnObservable = function(_super) {
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
        }(), startWith = __webpack_require__("p0Sj"), scroll_service = __webpack_require__("Faly"), toc_service = __webpack_require__("TNhP"), _c0 = [ "tocItem" ], _c1 = [ "class", "toc-inner no-print", 3, "collapsed", 4, "ngIf" ], _c2 = [ 1, "toc-inner", "no-print" ], _c3 = [ "class", "toc-heading embedded", 4, "ngIf" ], _c4 = [ "type", "button", "class", "toc-heading embedded secondary", "title", "Expand/collapse contents", "aria-label", "Expand/collapse contents", 3, "aria-pressed", "click", 4, "ngIf" ], _c5 = [ 1, "toc-list" ], _c6 = [ 4, "ngFor", "ngForOf" ], _c7 = [ "type", "button", "class", "toc-more-items embedded material-icons", "title", "Expand/collapse contents", "aria-label", "Expand/collapse contents", 3, "collapsed", "aria-pressed", "click", 4, "ngIf" ], _c8 = [ 1, "toc-heading", "embedded" ];
        function TocComponent_div_0_div_1_Template(rf, ctx) {
            1 & rf && (core.Yb(0, "div", _c8), core.Kc(1, " Contents "), core.Qb());
        }
        var _c9 = [ "type", "button", "title", "Expand/collapse contents", "aria-label", "Expand/collapse contents", 1, "toc-heading", "embedded", "secondary", 3, "aria-pressed", "click" ], _c10 = [ "svgIcon", "keyboard_arrow_right", 1, "rotating-icon" ], _c11 = [ "collapsed" ];
        function TocComponent_div_0_button_2_Template(rf, ctx) {
            if (1 & rf) {
                var _r131 = core.dc();
                core.Yb(0, "button", _c9), core.mc("click", function($event) {
                    return core.Bc(_r131), core.rc(2).toggle(!1);
                }), core.Kc(1, " Contents "), core.Yb(2, "mat-icon", _c10), core.ac(_c11), core.Qb(), 
                core.Qb();
            }
            if (2 & rf) {
                var ctx_r127 = core.rc(2);
                core.Ec(0), core.Mb(0, "aria-pressed", core.Bb(!ctx_r127.isCollapsed)), core.Nb(2, 0, ctx_r127.isCollapsed), 
                core.bc(2);
            }
        }
        var _c12 = [ 3, "title", "class", "secondary", "active", 4, "ngIf" ], _c13 = [ 3, "title" ], _c14 = [ "tocItem", "" ], _c15 = [ 3, "href", "innerHTML" ], _c16 = [ "secondary", "active" ];
        function TocComponent_div_0_ng_container_4_li_1_Template(rf, ctx) {
            if (1 & rf && (core.Yb(0, "li", _c13, _c14), core.ac(_c16), core.Lb(2, "a", _c15), 
            core.Qb()), 2 & rf) {
                var ctx_r136 = core.rc(), toc_r132 = ctx_r136.$implicit, i_r133 = ctx_r136.index, ctx_r134 = core.rc(2);
                core.cc(0, core.hc("", toc_r132.level, "")), core.Nb(0, 0, "EmbeddedExpandable" === ctx_r134.type && i_r133 >= ctx_r134.primaryMax), 
                core.Nb(0, 1, i_r133 === ctx_r134.activeIndex), core.bc(0), core.Ec(0), core.Xb(0, "title", core.hc("", toc_r132.title, "")), 
                core.Ec(2), core.Xb(2, "href", core.Bb(toc_r132.href), core.Dc), core.Xb(2, "innerHTML", core.Bb(toc_r132.content), core.Cc);
            }
        }
        function TocComponent_div_0_ng_container_4_Template(rf, ctx) {
            if (1 & rf && (core.Pb(0), core.Ic(1, TocComponent_div_0_ng_container_4_li_1_Template, 3, 4, "li", _c12), 
            core.Ob()), 2 & rf) {
                var toc_r132 = ctx.$implicit, ctx_r128 = core.rc(2);
                core.Ec(1), core.Xb(1, "ngIf", core.Bb("Floating" === ctx_r128.type || "h1" !== toc_r132.level));
            }
        }
        var _c17 = [ "type", "button", "title", "Expand/collapse contents", "aria-label", "Expand/collapse contents", 1, "toc-more-items", "embedded", "material-icons", 3, "aria-pressed", "click" ];
        function TocComponent_div_0_button_5_Template(rf, ctx) {
            if (1 & rf) {
                var _r138 = core.dc();
                core.Yb(0, "button", _c17), core.ac(_c11), core.mc("click", function($event) {
                    return core.Bc(_r138), core.rc(2).toggle();
                }), core.Qb();
            }
            if (2 & rf) {
                var ctx_r129 = core.rc(2);
                core.Nb(0, 0, ctx_r129.isCollapsed), core.bc(0), core.Ec(0), core.Mb(0, "aria-pressed", core.Bb(!ctx_r129.isCollapsed));
            }
        }
        var _c18 = [ "embedded" ];
        function TocComponent_div_0_Template(rf, ctx) {
            if (1 & rf && (core.Yb(0, "div", _c2), core.ac(_c11), core.Ic(1, TocComponent_div_0_div_1_Template, 2, 0, "div", _c3), 
            core.Ic(2, TocComponent_div_0_button_2_Template, 3, 1, "button", _c4), core.Yb(3, "ul", _c5), 
            core.ac(_c18), core.Ic(4, TocComponent_div_0_ng_container_4_Template, 2, 1, "ng-container", _c6), 
            core.Qb(), core.Ic(5, TocComponent_div_0_button_5_Template, 1, 1, "button", _c7), 
            core.Qb()), 2 & rf) {
                var ctx_r125 = core.rc();
                core.Nb(0, 0, ctx_r125.isCollapsed), core.bc(0), core.Ec(1), core.Xb(1, "ngIf", core.Bb("EmbeddedSimple" === ctx_r125.type)), 
                core.Ec(2), core.Xb(2, "ngIf", core.Bb("EmbeddedExpandable" === ctx_r125.type)), 
                core.Nb(3, 0, "Floating" !== ctx_r125.type), core.bc(3), core.Ec(4), core.Xb(4, "ngForOf", core.Bb(ctx_r125.tocList)), 
                core.Ec(5), core.Xb(5, "ngIf", core.Bb("EmbeddedExpandable" === ctx_r125.type));
            }
        }
        var toc_component_TocComponent = function() {
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
            }, TocComponent.ngComponentDef = core.Gb({
                type: TocComponent,
                selectors: [ [ "aio-toc" ] ],
                factory: function(t) {
                    return new (t || TocComponent)(core.Kb(scroll_service.a), core.Kb(core.q), core.Kb(toc_service.a));
                },
                viewQuery: function(rf, ctx) {
                    var _t;
                    1 & rf && core.Mc(_c0, !0, null), 2 & rf && core.xc(_t = core.oc()) && (ctx.items = _t);
                },
                consts: 1,
                vars: 1,
                template: function(rf, ctx) {
                    1 & rf && core.Ic(0, TocComponent_div_0_Template, 6, 4, "div", _c1), 2 & rf && (core.Ec(0), 
                    core.Xb(0, "ngIf", core.Bb("None" !== ctx.type)));
                },
                directives: [ common.k, common.j, icon_es5.a ],
                encapsulation: 2
            }), TocComponent;
        }(), toc_module_TocModule = function() {
            function TocModule() {
                this.customElementComponent = toc_component_TocComponent;
            }
            return TocModule.ngModuleDef = core.Ib({
                type: TocModule
            }), TocModule.ngInjectorDef = core.jb({
                factory: function(t) {
                    return new (t || TocModule)();
                },
                imports: [ [ common.c, icon_es5.b ] ]
            }), TocModule;
        }();
        __webpack_require__.d(__webpack_exports__, "TocModuleNgFactory", function() {
            return TocModuleNgFactory;
        });
        var TocModuleNgFactory = new core.ub(toc_module_TocModule);
    }
} ]);
//# sourceMappingURL=toc-toc-module-ngfactory.d2008309e6cdf01590c5.js.map
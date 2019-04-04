(window.webpackJsonp = window.webpackJsonp || []).push([ [ 2 ], {
    WoO9: function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var core = __webpack_require__("CcnG"), common = __webpack_require__("Ip0R"), http = __webpack_require__("t/Na"), shared_module = __webpack_require__("PCNd"), catchError = __webpack_require__("9Z1F"), map = __webpack_require__("67Y/"), document_service = __webpack_require__("jn67"), logger_service = __webpack_require__("vHPH"), _c0 = [ "class", "homepage-container", 4, "ngIf" ], _c1 = [ 1, "homepage-container" ], _c2 = [ 1, "announcement-bar" ], _c3 = [ "alt", "", 3, "src" ], _c4 = [ 3, "innerHTML" ], _c5 = [ 1, "button", 3, "href" ];
        function AnnouncementBarComponent_div_0_Template(rf, ctx) {
            if (1 & rf && (core.Yb(0, "div", _c1), core.Yb(1, "div", _c2), core.Lb(2, "img", _c3), 
            core.Lb(3, "p", _c4), core.Yb(4, "a", _c5), core.Kc(5, "Learn More"), core.Qb(), 
            core.Qb(), core.Qb()), 2 & rf) {
                var ctx_r72 = core.rc();
                core.Ec(2), core.Xb(2, "src", core.Bb(ctx_r72.announcement.imageUrl), core.Dc), 
                core.Ec(3), core.Xb(3, "innerHTML", core.Bb(ctx_r72.announcement.message), core.Cc), 
                core.Ec(4), core.Xb(4, "href", core.Bb(ctx_r72.announcement.linkUrl), core.Dc);
            }
        }
        var announcementsPath = document_service.a + "announcements.json", announcement_bar_component_AnnouncementBarComponent = function() {
            function AnnouncementBarComponent(http, logger) {
                this.http = http, this.logger = logger;
            }
            return AnnouncementBarComponent.prototype.ngOnInit = function() {
                var _this = this;
                this.http.get(announcementsPath).pipe(Object(catchError.a)(function(error) {
                    return _this.logger.error(new Error(announcementsPath + " request failed: " + error.message)), 
                    [];
                }), Object(map.a)(function(announcements) {
                    return _this.findCurrentAnnouncement(announcements);
                }), Object(catchError.a)(function(error) {
                    return _this.logger.error(new Error(announcementsPath + " contains invalid data: " + error.message)), 
                    [];
                })).subscribe(function(announcement) {
                    return _this.announcement = announcement;
                });
            }, AnnouncementBarComponent.prototype.findCurrentAnnouncement = function(announcements) {
                return announcements.filter(function(announcement) {
                    return new Date(announcement.startDate).valueOf() < Date.now();
                }).filter(function(announcement) {
                    return new Date(announcement.endDate).valueOf() > Date.now();
                })[0];
            }, AnnouncementBarComponent.ngComponentDef = core.Gb({
                type: AnnouncementBarComponent,
                selectors: [ [ "aio-announcement-bar" ] ],
                factory: function(t) {
                    return new (t || AnnouncementBarComponent)(core.Kb(http.a), core.Kb(logger_service.a));
                },
                consts: 1,
                vars: 1,
                template: function(rf, ctx) {
                    1 & rf && core.Ic(0, AnnouncementBarComponent_div_0_Template, 6, 3, "div", _c0), 
                    2 & rf && (core.Ec(0), core.Xb(0, "ngIf", core.Bb(ctx.announcement)));
                },
                directives: [ common.k ],
                encapsulation: 2
            }), AnnouncementBarComponent;
        }(), announcement_bar_module_AnnouncementBarModule = function() {
            function AnnouncementBarModule() {
                this.customElementComponent = announcement_bar_component_AnnouncementBarComponent;
            }
            return AnnouncementBarModule.ngModuleDef = core.Ib({
                type: AnnouncementBarModule
            }), AnnouncementBarModule.ngInjectorDef = core.jb({
                factory: function(t) {
                    return new (t || AnnouncementBarModule)();
                },
                imports: [ [ common.c, shared_module.a, http.b ] ]
            }), AnnouncementBarModule;
        }();
        __webpack_require__.d(__webpack_exports__, "AnnouncementBarModuleNgFactory", function() {
            return AnnouncementBarModuleNgFactory;
        });
        var AnnouncementBarModuleNgFactory = new core.ub(announcement_bar_module_AnnouncementBarModule);
    }
} ]);
//# sourceMappingURL=announcement-bar-announcement-bar-module-ngfactory.18594646f329e1628f36.js.map
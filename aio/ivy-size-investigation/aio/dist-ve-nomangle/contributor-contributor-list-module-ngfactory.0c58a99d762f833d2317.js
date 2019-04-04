(window.webpackJsonp = window.webpackJsonp || []).push([ [ 6 ], {
    "ll+R": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var core = __webpack_require__("CcnG"), ContributorListComponent = function() {
            function ContributorListComponent(contributorService, locationService) {
                this.contributorService = contributorService, this.locationService = locationService;
            }
            return ContributorListComponent.prototype.ngOnInit = function() {
                var _this = this, groupName = this.locationService.search().group || "";
                this.contributorService.contributors.subscribe(function(grps) {
                    _this.groups = grps, _this.groupNames = grps.map(function(g) {
                        return g.name;
                    }), _this.selectGroup(groupName);
                });
            }, ContributorListComponent.prototype.selectGroup = function(name) {
                name = name.toLowerCase(), this.selectedGroup = this.groups.find(function(g) {
                    return g.name.toLowerCase() === name;
                }) || this.groups[0], this.locationService.setSearch("", {
                    group: this.selectedGroup.name
                });
            }, ContributorListComponent;
        }(), contributor_list_module_ContributorListModule = function() {
            return function() {
                this.customElementComponent = ContributorListComponent;
            };
        }(), index_ngfactory = __webpack_require__("Mr+X"), icon_es5 = __webpack_require__("SMsm"), common = __webpack_require__("Ip0R"), document_service = __webpack_require__("jn67"), contributor_component_ContributorComponent = function() {
            function ContributorComponent() {
                this.noPicture = "_no-one.png", this.pictureBase = document_service.a + "images/bios/";
            }
            return ContributorComponent.prototype.flipCard = function(person) {
                person.isFlipped = !person.isFlipped;
            }, ContributorComponent;
        }(), RenderType_ContributorComponent = core.rb({
            encapsulation: 2,
            styles: [],
            data: {}
        });
        function View_ContributorComponent_1(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 1, "a", [ [ "class", "info-item" ], [ "mat-button", "" ] ], null, null, null, null, null)), (_l()(), 
            core.Mb(-1, null, [ " View Bio " ])) ], null, null);
        }
        function View_ContributorComponent_2(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 2, "a", [ [ "class", "info-item icon" ], [ "mat-icon-button", "" ], [ "target", "_blank" ] ], [ [ 8, "href", 4 ] ], [ [ null, "click" ] ], function(_v, en, $event) {
                var ad = !0;
                return "click" === en && (ad = !1 !== $event.stopPropagation() && ad), ad;
            }, null, null)), (_l()(), core.ub(1, 0, null, null, 1, "mat-icon", [ [ "class", "mat-icon" ], [ "role", "img" ], [ "svgIcon", "logos:twitter" ] ], [ [ 2, "mat-icon-inline", null ] ], null, null, index_ngfactory.b, index_ngfactory.a)), core.tb(2, 9158656, null, 0, icon_es5.b, [ core.k, icon_es5.d, [ 8, null ], [ 2, icon_es5.a ] ], {
                svgIcon: [ 0, "svgIcon" ]
            }, null) ], function(_ck, _v) {
                _ck(_v, 2, 0, "logos:twitter");
            }, function(_ck, _v) {
                _ck(_v, 0, 0, core.zb(1, "https://twitter.com/", _v.component.person.twitter, "")), 
                _ck(_v, 1, 0, core.Gb(_v, 2).inline);
            });
        }
        function View_ContributorComponent_3(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 3, "a", [ [ "class", "info-item icon" ], [ "mat-icon-button", "" ], [ "target", "_blank" ] ], [ [ 8, "href", 4 ] ], [ [ null, "click" ] ], function(_v, en, $event) {
                var ad = !0;
                return "click" === en && (ad = !1 !== $event.stopPropagation() && ad), ad;
            }, null, null)), (_l()(), core.ub(1, 0, null, null, 2, "mat-icon", [ [ "class", "link-icon mat-icon" ], [ "role", "img" ] ], [ [ 2, "mat-icon-inline", null ] ], null, null, index_ngfactory.b, index_ngfactory.a)), core.tb(2, 9158656, null, 0, icon_es5.b, [ core.k, icon_es5.d, [ 8, null ], [ 2, icon_es5.a ] ], null, null), (_l()(), 
            core.Mb(-1, 0, [ "link" ])) ], function(_ck, _v) {
                _ck(_v, 2, 0);
            }, function(_ck, _v) {
                _ck(_v, 0, 0, core.zb(1, "", _v.component.person.website, "")), _ck(_v, 1, 0, core.Gb(_v, 2).inline);
            });
        }
        function View_ContributorComponent_4(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 4, "div", [ [ "class", "card-back" ] ], null, [ [ null, "click" ] ], function(_v, en, $event) {
                var ad = !0, _co = _v.component;
                return "click" === en && (ad = !1 !== _co.flipCard(_co.person) && ad), ad;
            }, null, null)), (_l()(), core.ub(1, 0, null, null, 1, "h3", [], null, null, null, null, null)), (_l()(), 
            core.Mb(2, null, [ "", "" ])), (_l()(), core.ub(3, 0, null, null, 1, "p", [ [ "class", "contributor-bio" ] ], null, null, null, null, null)), (_l()(), 
            core.Mb(4, null, [ "", "" ])) ], null, function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 2, 0, _co.person.name), _ck(_v, 4, 0, _co.person.bio);
            });
        }
        function View_ContributorComponent_0(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 16, "div", [ [ "class", "contributor-card" ] ], null, null, null, null, null)), core.Jb(512, null, common.w, common.x, [ core.t, core.u, core.k, core.F ]), core.tb(2, 278528, null, 0, common.i, [ common.w ], {
                klass: [ 0, "klass" ],
                ngClass: [ 1, "ngClass" ]
            }, null), core.Ib(3, {
                flipped: 0
            }), (_l()(), core.ub(4, 0, null, null, 10, "div", [ [ "class", "card-front" ] ], null, [ [ null, "click" ] ], function(_v, en, $event) {
                var ad = !0, _co = _v.component;
                return "click" === en && (ad = !1 !== _co.flipCard(_co.person) && ad), ad;
            }, null, null)), (_l()(), core.ub(5, 0, null, null, 1, "h3", [], null, null, null, null, null)), (_l()(), 
            core.Mb(6, null, [ "", "" ])), (_l()(), core.ub(7, 0, null, null, 7, "div", [ [ "class", "contributor-image" ] ], [ [ 4, "background-image", null ] ], null, null, null, null)), (_l()(), 
            core.ub(8, 0, null, null, 6, "div", [ [ "class", "contributor-info" ] ], null, null, null, null, null)), (_l()(), 
            core.ib(16777216, null, null, 1, null, View_ContributorComponent_1)), core.tb(10, 16384, null, 0, common.k, [ core.R, core.O ], {
                ngIf: [ 0, "ngIf" ]
            }, null), (_l()(), core.ib(16777216, null, null, 1, null, View_ContributorComponent_2)), core.tb(12, 16384, null, 0, common.k, [ core.R, core.O ], {
                ngIf: [ 0, "ngIf" ]
            }, null), (_l()(), core.ib(16777216, null, null, 1, null, View_ContributorComponent_3)), core.tb(14, 16384, null, 0, common.k, [ core.R, core.O ], {
                ngIf: [ 0, "ngIf" ]
            }, null), (_l()(), core.ib(16777216, null, null, 1, null, View_ContributorComponent_4)), core.tb(16, 16384, null, 0, common.k, [ core.R, core.O ], {
                ngIf: [ 0, "ngIf" ]
            }, null) ], function(_ck, _v) {
                var _co = _v.component, currVal_1 = _ck(_v, 3, 0, _co.person.isFlipped);
                _ck(_v, 2, 0, "contributor-card", currVal_1), _ck(_v, 10, 0, _co.person.bio), _ck(_v, 12, 0, _co.person.twitter), 
                _ck(_v, 14, 0, _co.person.website), _ck(_v, 16, 0, _co.person.isFlipped);
            }, function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 6, 0, _co.person.name), _ck(_v, 7, 0, "url(" + _co.pictureBase + (_co.person.picture || _co.noPicture) + ")");
            });
        }
        var map = __webpack_require__("67Y/"), publishLast = __webpack_require__("kR3u"), contributorsPath = document_service.a + "contributors.json", knownGroups = [ "Angular", "Collaborators", "GDE" ], contributor_service_ContributorService = function() {
            function ContributorService(http) {
                this.http = http, this.contributors = this.getContributors();
            }
            return ContributorService.prototype.getContributors = function() {
                var contributors = this.http.get(contributorsPath).pipe(Object(map.a)(function(contribs) {
                    var contribMap = {};
                    return Object.keys(contribs).forEach(function(key) {
                        var contributor = contribs[key];
                        contributor.groups.forEach(function(group) {
                            (contribMap[group] || (contribMap[group] = [])).push(contributor);
                        });
                    }), contribMap;
                }), Object(map.a)(function(cmap) {
                    return Object.keys(cmap).map(function(key) {
                        var order = knownGroups.indexOf(key);
                        return {
                            name: key,
                            order: -1 === order ? knownGroups.length : order,
                            contributors: cmap[key].sort(compareContributors)
                        };
                    }).sort(compareGroups);
                }), Object(publishLast.a)());
                return contributors.connect(), contributors;
            }, ContributorService;
        }();
        function compareContributors(l, r) {
            return l.name.toUpperCase() > r.name.toUpperCase() ? 1 : -1;
        }
        function compareGroups(l, r) {
            return l.order === r.order ? l.name > r.name ? 1 : -1 : l.order > r.order ? 1 : -1;
        }
        var location_service = __webpack_require__("/lUL"), RenderType_ContributorListComponent = core.rb({
            encapsulation: 2,
            styles: [],
            data: {}
        });
        function View_ContributorListComponent_1(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 1, "a", [ [ "class", "button mat-button filter-button" ] ], [ [ 2, "selected", null ] ], [ [ null, "click" ] ], function(_v, en, $event) {
                var ad = !0;
                return "click" === en && (ad = !1 !== _v.component.selectGroup(_v.context.$implicit) && ad), 
                ad;
            }, null, null)), (_l()(), core.Mb(1, null, [ "", "" ])) ], null, function(_ck, _v) {
                _ck(_v, 0, 0, _v.context.$implicit == _v.component.selectedGroup.name), _ck(_v, 1, 0, _v.context.$implicit);
            });
        }
        function View_ContributorListComponent_3(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 1, "aio-contributor", [], null, null, null, View_ContributorComponent_0, RenderType_ContributorComponent)), core.tb(1, 49152, null, 0, contributor_component_ContributorComponent, [], {
                person: [ 0, "person" ]
            }, null) ], function(_ck, _v) {
                _ck(_v, 1, 0, _v.context.$implicit);
            }, null);
        }
        function View_ContributorListComponent_2(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 3, "section", [ [ "class", "grid-fluid" ] ], null, null, null, null, null)), (_l()(), 
            core.ub(1, 0, null, null, 2, "div", [ [ "class", "contributor-group" ] ], null, null, null, null, null)), (_l()(), 
            core.ib(16777216, null, null, 1, null, View_ContributorListComponent_3)), core.tb(3, 278528, null, 0, common.j, [ core.R, core.O, core.t ], {
                ngForOf: [ 0, "ngForOf" ]
            }, null) ], function(_ck, _v) {
                _ck(_v, 3, 0, _v.component.selectedGroup.contributors);
            }, null);
        }
        function View_ContributorListComponent_0(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 2, "div", [ [ "class", "flex-center group-buttons" ] ], null, null, null, null, null)), (_l()(), 
            core.ib(16777216, null, null, 1, null, View_ContributorListComponent_1)), core.tb(2, 278528, null, 0, common.j, [ core.R, core.O, core.t ], {
                ngForOf: [ 0, "ngForOf" ]
            }, null), (_l()(), core.ib(16777216, null, null, 1, null, View_ContributorListComponent_2)), core.tb(4, 16384, null, 0, common.k, [ core.R, core.O ], {
                ngIf: [ 0, "ngIf" ]
            }, null) ], function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 2, 0, _co.groupNames), _ck(_v, 4, 0, _co.selectedGroup);
            }, null);
        }
        function View_ContributorListComponent_Host_0(_l) {
            return core.Ob(0, [ (_l()(), core.ub(0, 0, null, null, 1, "aio-contributor-list", [], null, null, null, View_ContributorListComponent_0, RenderType_ContributorListComponent)), core.tb(1, 114688, null, 0, ContributorListComponent, [ contributor_service_ContributorService, location_service.a ], null, null) ], function(_ck, _v) {
                _ck(_v, 1, 0);
            }, null);
        }
        var ContributorListComponentNgFactory = core.pb("aio-contributor-list", ContributorListComponent, View_ContributorListComponent_Host_0, {}, {}, []), http = __webpack_require__("t/Na"), bidi_es5 = __webpack_require__("Fzqc"), core_es5 = __webpack_require__("Wf4p"), platform_browser = __webpack_require__("ZYjt");
        __webpack_require__.d(__webpack_exports__, "ContributorListModuleNgFactory", function() {
            return ContributorListModuleNgFactory;
        });
        var ContributorListModuleNgFactory = core.qb(contributor_list_module_ContributorListModule, [], function(_l) {
            return core.Db([ core.Eb(512, core.j, core.db, [ [ 8, [ ContributorListComponentNgFactory ] ], [ 3, core.j ], core.y ]), core.Eb(4608, common.m, common.l, [ core.v, [ 2, common.B ] ]), core.Eb(4608, contributor_service_ContributorService, contributor_service_ContributorService, [ http.c ]), core.Eb(1073742336, common.c, common.c, []), core.Eb(1073742336, bidi_es5.a, bidi_es5.a, []), core.Eb(1073742336, core_es5.c, core_es5.c, [ [ 2, core_es5.a ], [ 2, platform_browser.f ] ]), core.Eb(1073742336, icon_es5.c, icon_es5.c, []), core.Eb(1073742336, contributor_list_module_ContributorListModule, contributor_list_module_ContributorListModule, []) ]);
        });
    }
} ]);
//# sourceMappingURL=contributor-contributor-list-module-ngfactory.0c58a99d762f833d2317.js.map
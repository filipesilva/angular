(window.webpackJsonp = window.webpackJsonp || []).push([ [ 6 ], {
    "ll+R": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var core = __webpack_require__("CcnG"), common = __webpack_require__("Ip0R"), icon_es5 = __webpack_require__("SMsm"), map = __webpack_require__("67Y/"), publishLast = __webpack_require__("kR3u"), document_service = __webpack_require__("jn67"), http = __webpack_require__("t/Na"), contributorsPath = document_service.a + "contributors.json", knownGroups = [ "Angular", "Collaborators", "GDE" ], contributor_service_ContributorService = function() {
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
            }, ContributorService.ngInjectableDef = core.ib({
                token: ContributorService,
                factory: function(t) {
                    return new (t || ContributorService)(core.nb(http.a));
                },
                providedIn: null
            }), ContributorService;
        }();
        function compareContributors(l, r) {
            return l.name.toUpperCase() > r.name.toUpperCase() ? 1 : -1;
        }
        function compareGroups(l, r) {
            return l.order === r.order ? l.name > r.name ? 1 : -1 : l.order > r.order ? 1 : -1;
        }
        var location_service = __webpack_require__("/lUL"), _c0 = [ 1, "contributor-card", 3, "ngClass" ], _c1 = [ 1, "card-front", 3, "click" ], _c2 = [ 1, "contributor-image" ], _c3 = [ 1, "contributor-info" ], _c4 = [ "mat-button", "", "class", "info-item", 4, "ngIf" ], _c5 = [ "mat-icon-button", "", "class", "info-item icon", "target", "_blank", 3, "href", "click", 4, "ngIf" ], _c6 = [ "class", "card-back", 3, "click", 4, "ngIf" ], _c7 = [ "mat-button", "", 1, "info-item" ];
        function ContributorComponent_a_6_Template(rf, ctx) {
            1 & rf && (core.Yb(0, "a", _c7), core.Kc(1, " View Bio "), core.Qb());
        }
        var _c8 = [ "mat-icon-button", "", "target", "_blank", 1, "info-item", "icon", 3, "href", "click" ], _c9 = [ "svgIcon", "logos:twitter" ];
        function ContributorComponent_a_7_Template(rf, ctx) {
            if (1 & rf) {
                var _r105 = core.dc();
                core.Yb(0, "a", _c8), core.mc("click", function($event) {
                    return core.Bc(_r105), $event.stopPropagation();
                }), core.Lb(1, "mat-icon", _c9), core.Qb();
            }
            if (2 & rf) {
                var ctx_r101 = core.rc();
                core.Ec(0), core.Xb(0, "href", core.hc("https://twitter.com/", ctx_r101.person.twitter, ""), core.Dc);
            }
        }
        var _c10 = [ 1, "link-icon" ];
        function ContributorComponent_a_8_Template(rf, ctx) {
            if (1 & rf) {
                var _r107 = core.dc();
                core.Yb(0, "a", _c8), core.mc("click", function($event) {
                    return core.Bc(_r107), $event.stopPropagation();
                }), core.Yb(1, "mat-icon", _c10), core.Kc(2, "link"), core.Qb(), core.Qb();
            }
            if (2 & rf) {
                var ctx_r102 = core.rc();
                core.Ec(0), core.Xb(0, "href", core.hc("", ctx_r102.person.website, ""), core.Dc);
            }
        }
        var _c11 = [ 1, "card-back", 3, "click" ], _c12 = [ 1, "contributor-bio" ];
        function ContributorComponent_div_9_Template(rf, ctx) {
            if (1 & rf) {
                var _r109 = core.dc();
                core.Yb(0, "div", _c11), core.mc("click", function($event) {
                    core.Bc(_r109);
                    var ctx_r108 = core.rc();
                    return ctx_r108.flipCard(ctx_r108.person);
                }), core.Yb(1, "h3"), core.Kc(2), core.Qb(), core.Yb(3, "p", _c12), core.Kc(4), 
                core.Qb(), core.Qb();
            }
            if (2 & rf) {
                var ctx_r103 = core.rc();
                core.Ec(2), core.Lc(2, core.hc("", ctx_r103.person.name, "")), core.Ec(4), core.Lc(4, core.hc("", ctx_r103.person.bio, ""));
            }
        }
        var _c13 = [ "background-image" ], _c14 = function(a0) {
            return {
                flipped: a0
            };
        }, contributor_component_ContributorComponent = function() {
            function ContributorComponent() {
                this.noPicture = "_no-one.png", this.pictureBase = document_service.a + "images/bios/";
            }
            return ContributorComponent.prototype.flipCard = function(person) {
                person.isFlipped = !person.isFlipped;
            }, ContributorComponent.ngComponentDef = core.Gb({
                type: ContributorComponent,
                selectors: [ [ "aio-contributor" ] ],
                factory: function(t) {
                    return new (t || ContributorComponent)();
                },
                inputs: {
                    person: "person"
                },
                consts: 10,
                vars: 8,
                template: function(rf, ctx) {
                    1 & rf && (core.Yb(0, "div", _c0), core.Yb(1, "div", _c1), core.mc("click", function($event) {
                        return ctx.flipCard(ctx.person);
                    }), core.Yb(2, "h3"), core.Kc(3), core.Qb(), core.Yb(4, "div", _c2), core.ac(null, _c13, core.Fb), 
                    core.Yb(5, "div", _c3), core.Ic(6, ContributorComponent_a_6_Template, 2, 0, "a", _c4), 
                    core.Ic(7, ContributorComponent_a_7_Template, 2, 1, "a", _c5), core.Ic(8, ContributorComponent_a_8_Template, 3, 1, "a", _c5), 
                    core.Qb(), core.Qb(), core.Qb(), core.Ic(9, ContributorComponent_div_9_Template, 5, 2, "div", _c6), 
                    core.Qb()), 2 & rf && (core.Ec(0), core.Xb(0, "ngClass", core.Bb(core.wc(6, _c14, ctx.person.isFlipped))), 
                    core.Ec(3), core.Lc(3, core.hc("", ctx.person.name, "")), core.Zb(4, 0, "url(" + ctx.pictureBase + (ctx.person.picture || ctx.noPicture) + ")"), 
                    core.bc(4), core.Ec(6), core.Xb(6, "ngIf", core.Bb(ctx.person.bio)), core.Ec(7), 
                    core.Xb(7, "ngIf", core.Bb(ctx.person.twitter)), core.Ec(8), core.Xb(8, "ngIf", core.Bb(ctx.person.website)), 
                    core.Ec(9), core.Xb(9, "ngIf", core.Bb(ctx.person.isFlipped)));
                },
                directives: [ common.i, common.k, icon_es5.a ],
                encapsulation: 2
            }), ContributorComponent;
        }(), contributor_list_component_c0 = [ 1, "flex-center", "group-buttons" ], contributor_list_component_c1 = [ "class", "button mat-button filter-button", 3, "selected", "click", 4, "ngFor", "ngForOf" ], contributor_list_component_c2 = [ "class", "grid-fluid", 4, "ngIf" ], contributor_list_component_c3 = [ 1, "button", "mat-button", "filter-button", 3, "click" ], contributor_list_component_c4 = [ "selected" ];
        function ContributorListComponent_a_1_Template(rf, ctx) {
            if (1 & rf) {
                var _r97 = core.dc();
                core.Yb(0, "a", contributor_list_component_c3), core.ac(contributor_list_component_c4), 
                core.mc("click", function($event) {
                    core.Bc(_r97);
                    var name_r95 = ctx.$implicit;
                    return core.rc().selectGroup(name_r95);
                }), core.Kc(1), core.Qb();
            }
            if (2 & rf) {
                var name_r95 = ctx.$implicit, ctx_r93 = core.rc();
                core.Nb(0, 0, name_r95 == ctx_r93.selectedGroup.name), core.bc(0), core.Ec(1), core.Lc(1, core.hc("", name_r95, ""));
            }
        }
        var contributor_list_component_c5 = [ 1, "grid-fluid" ], contributor_list_component_c6 = [ 1, "contributor-group" ], contributor_list_component_c7 = [ 3, "person", 4, "ngFor", "ngForOf" ], contributor_list_component_c8 = [ 3, "person" ];
        function ContributorListComponent_section_2_aio_contributor_2_Template(rf, ctx) {
            if (1 & rf && core.Lb(0, "aio-contributor", contributor_list_component_c8), 2 & rf) {
                var person_r99 = ctx.$implicit;
                core.Ec(0), core.Xb(0, "person", core.Bb(person_r99));
            }
        }
        function ContributorListComponent_section_2_Template(rf, ctx) {
            if (1 & rf && (core.Yb(0, "section", contributor_list_component_c5), core.Yb(1, "div", contributor_list_component_c6), 
            core.Ic(2, ContributorListComponent_section_2_aio_contributor_2_Template, 1, 1, "aio-contributor", contributor_list_component_c7), 
            core.Qb(), core.Qb()), 2 & rf) {
                var ctx_r94 = core.rc();
                core.Ec(2), core.Xb(2, "ngForOf", core.Bb(ctx_r94.selectedGroup.contributors));
            }
        }
        var contributor_list_component_ContributorListComponent = function() {
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
            }, ContributorListComponent.ngComponentDef = core.Gb({
                type: ContributorListComponent,
                selectors: [ [ "aio-contributor-list" ] ],
                factory: function(t) {
                    return new (t || ContributorListComponent)(core.Kb(contributor_service_ContributorService), core.Kb(location_service.a));
                },
                consts: 3,
                vars: 2,
                template: function(rf, ctx) {
                    1 & rf && (core.Yb(0, "div", contributor_list_component_c0), core.Ic(1, ContributorListComponent_a_1_Template, 2, 1, "a", contributor_list_component_c1), 
                    core.Qb(), core.Ic(2, ContributorListComponent_section_2_Template, 3, 1, "section", contributor_list_component_c2)), 
                    2 & rf && (core.Ec(1), core.Xb(1, "ngForOf", core.Bb(ctx.groupNames)), core.Ec(2), 
                    core.Xb(2, "ngIf", core.Bb(ctx.selectedGroup)));
                },
                directives: [ common.j, common.k, contributor_component_ContributorComponent ],
                encapsulation: 2
            }), ContributorListComponent;
        }(), contributor_list_module_ContributorListModule = function() {
            function ContributorListModule() {
                this.customElementComponent = contributor_list_component_ContributorListComponent;
            }
            return ContributorListModule.ngModuleDef = core.Ib({
                type: ContributorListModule
            }), ContributorListModule.ngInjectorDef = core.jb({
                factory: function(t) {
                    return new (t || ContributorListModule)();
                },
                providers: [ contributor_service_ContributorService ],
                imports: [ [ common.c, icon_es5.b ] ]
            }), ContributorListModule;
        }();
        __webpack_require__.d(__webpack_exports__, "ContributorListModuleNgFactory", function() {
            return ContributorListModuleNgFactory;
        });
        var ContributorListModuleNgFactory = new core.ub(contributor_list_module_ContributorListModule);
    }
} ]);
//# sourceMappingURL=contributor-contributor-list-module-ngfactory.35fb0d3d61ee1db0e1b7.js.map
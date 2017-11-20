"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var adherent_component_1 = require("./adherent.component");
var list_1 = require("./list");
var detail_1 = require("./detail");
var ajout_1 = require("./ajout");
var modifier_1 = require("./modifier");
exports.routes = [
    { path: 'adherent', component: adherent_component_1.AdherentComponent, children: [
            { path: '', component: list_1.AdherentListComponent },
            { path: 'modifier/:id', component: modifier_1.AdherentModifierComponent },
            { path: 'ajout', component: ajout_1.AdherentAjoutComponent },
            { path: ':id', component: detail_1.AdherentDetailComponent },
            { path: '**', redirectTo: '' }
        ] },
];
var AdherentRoutingModule = (function () {
    function AdherentRoutingModule() {
    }
    return AdherentRoutingModule;
}());
AdherentRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(exports.routes)],
        exports: [router_1.RouterModule]
    })
], AdherentRoutingModule);
exports.AdherentRoutingModule = AdherentRoutingModule;

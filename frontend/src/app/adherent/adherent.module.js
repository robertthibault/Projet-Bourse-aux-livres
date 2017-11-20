"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var adherent_routes_1 = require("./adherent.routes");
var adherent_component_1 = require("./adherent.component");
var list_1 = require("./list");
var detail_1 = require("./detail");
var adherent_detail_view_component_1 = require("./detail/view/adherent-detail-view.component");
var ajout_1 = require("./ajout");
var modifier_1 = require("./modifier");
var adherent_service_1 = require("./adherent.service");
var eleve_service_1 = require("../eleve/eleve.service");
var primeng_1 = require("primeng/primeng");
/*
*  Component used to display data tables
*/
var ngx_datatable_1 = require("@swimlane/ngx-datatable");
var eleve_modifier_component_1 = require("../eleve/modifier/eleve-modifier.component");
var datatable_1 = require("primeng/components/datatable/datatable");
var AdherentModule = (function () {
    function AdherentModule() {
    }
    return AdherentModule;
}());
AdherentModule.routes = adherent_routes_1.routes;
AdherentModule = __decorate([
    core_1.NgModule({
        declarations: [
            // Components / Directives/ Pipes
            adherent_component_1.AdherentComponent,
            list_1.AdherentListComponent,
            detail_1.AdherentDetailComponent,
            ajout_1.AdherentAjoutComponent,
            modifier_1.AdherentModifierComponent,
            eleve_modifier_component_1.EleveModifierComponent,
            adherent_detail_view_component_1.AdherentDetailViewComponent
        ],
        imports: [
            ngx_datatable_1.NgxDatatableModule,
            common_1.CommonModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            router_1.RouterModule.forChild(adherent_routes_1.routes),
            datatable_1.DataTableModule,
            primeng_1.TabViewModule
        ],
        providers: [
            adherent_service_1.AdherentService,
            eleve_service_1.EleveService
        ]
    })
], AdherentModule);
exports.AdherentModule = AdherentModule;

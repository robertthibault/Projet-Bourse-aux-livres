"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var eleve_service_1 = require("../../eleve/eleve.service");
var AdherentDetailComponent = (function () {
    function AdherentDetailComponent(route, router, adherentService, eleveService) {
        this.route = route;
        this.router = router;
        this.adherentService = adherentService;
        this.eleveService = eleveService;
        this.offset = 0;
        this.limit = 10;
        // public selectedEleve = [];
        this.cache = [];
    }
    AdherentDetailComponent.prototype.ngOnInit = function () {
        this.columns = [
            { name: 'Identifiant', prop: 'id' },
            { name: 'Nom', prop: 'nom' },
            { name: 'Prenom', prop: 'prenom' },
            {
                cellTemplate: this.actionLink,
                name: 'Action'
            },
        ];
        this.id = +this.route.snapshot.params['id'];
        this.getAdherent(this.id);
        this.getElevesByIdAdherent();
    };
    AdherentDetailComponent.prototype.getAdherent = function (id) {
        var _this = this;
        this.adherentService.getAdherent(id)
            .then(function (adherent) { return _this.adherent = adherent; });
    };
    AdherentDetailComponent.prototype.logAdherent = function () {
        console.log(this.adherent);
    };
    AdherentDetailComponent.prototype.getElevesByIdAdherent = function () {
        var _this = this;
        this.eleveService.getElevesByIdAdherent(this.id).then(function (lesEleves) {
            return _this.lesElevesDeLAdherent = lesEleves;
        });
    };
    AdherentDetailComponent.prototype.back = function () {
        this.router.navigate(['/adherent']);
    };
    AdherentDetailComponent.prototype.edit = function () {
        this.router.navigate(['/adherent/modifier', this.adherent.id]);
    };
    return AdherentDetailComponent;
}());
__decorate([
    core_1.ViewChild('actionLink')
], AdherentDetailComponent.prototype, "actionLink", void 0);
__decorate([
    core_1.ViewChild('table')
], AdherentDetailComponent.prototype, "table", void 0);
AdherentDetailComponent = __decorate([
    core_1.Component({
        selector: 'adherent-detail',
        templateUrl: './adherent-detail.component.html',
        providers: [eleve_service_1.EleveService]
    })
], AdherentDetailComponent);
exports.AdherentDetailComponent = AdherentDetailComponent;

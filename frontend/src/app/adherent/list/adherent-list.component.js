"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var isNumeric_1 = require("rxjs/util/isNumeric");
var AdherentListComponent = (function () {
    function AdherentListComponent(router, adherentService) {
        this.router = router;
        this.adherentService = adherentService;
        this.offset = 0;
        this.limit = 3;
        this.selectedAdherent = [];
        this.cache = [];
    }
    AdherentListComponent.prototype.ngOnInit = function () {
        this.columns = [
            { name: 'Identifiant', prop: 'id' },
            { name: 'Nom', prop: 'nom' },
            { name: 'Prenom', prop: 'prenom' },
            {
                cellTemplate: this.actionLink,
                name: 'Action'
            },
        ];
        this.getAdherents();
    };
    AdherentListComponent.prototype.getAdherents = function () {
        var _this = this;
        this.adherentService.getAdherents()
            .then(function (adherents) {
            _this.adherents = adherents;
            _this.cache = adherents;
        });
    };
    AdherentListComponent.prototype.onSelect = function (selected) {
        // this.selectedAdherent = selected;
    };
    AdherentListComponent.prototype.updateFilter = function (event) {
        var val = event.target.value.toLowerCase();
        // filter our data
        var temp = this.cache.filter(function (d) {
            if (isNumeric_1.isNumeric(val)) {
                return d.id.indexOf(val) !== -1 || !val;
            }
            else {
                return d.nom.toLowerCase().indexOf(val) !== -1 || !val;
            }
        });
        // update the rows
        this.adherents = temp;
        // console.log('updateFilter - filtered data', this.adherents );
        this.table.offset = 0;
    };
    AdherentListComponent.prototype.edit = function (id) {
        this.router.navigate(['/adherent/modifier', id]);
    };
    AdherentListComponent.prototype.create = function () {
        this.router.navigate(['/adherent/ajout']);
    };
    AdherentListComponent.prototype.show = function (id) {
        this.router.navigate(['/adherent', id]);
    };
    return AdherentListComponent;
}());
__decorate([
    core_1.ViewChild('actionLink')
], AdherentListComponent.prototype, "actionLink", void 0);
__decorate([
    core_1.ViewChild('table')
], AdherentListComponent.prototype, "table", void 0);
AdherentListComponent = __decorate([
    core_1.Component({
        selector: 'adherents',
        templateUrl: './adherent-list.component.html',
        styleUrls: ['./adherent-list.component.css']
    })
], AdherentListComponent);
exports.AdherentListComponent = AdherentListComponent;

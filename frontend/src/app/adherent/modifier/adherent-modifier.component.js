"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AdherentModifierComponent = (function () {
    function AdherentModifierComponent(route, router, adhService, fb) {
        this.route = route;
        this.router = router;
        this.adhService = adhService;
        this.fb = fb;
    }
    AdherentModifierComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.adhService.getAdherent(this.route.snapshot.params['id'])
            .then(function (adh) {
            _this.adherent = adh;
            _this.form = _this.fb.group({
                nom: [_this.adherent.nom, [forms_1.Validators.required]],
                prenom: [_this.adherent.prenom, forms_1.Validators.required],
                adresse: [_this.adherent.adresse, forms_1.Validators.required],
                codePostal: [_this.adherent.codePostal, forms_1.Validators.required],
                ville: [_this.adherent.ville, forms_1.Validators.required],
                tel: [_this.adherent.tel, forms_1.Validators.required],
                tel2: [_this.adherent.tel2, forms_1.Validators.required],
                mail: [_this.adherent.mail, forms_1.Validators.required],
                comite: [_this.adherent.comite, forms_1.Validators.required],
                conseil: [_this.adherent.conseil, forms_1.Validators.required]
            });
        });
    };
    AdherentModifierComponent.prototype.back = function () {
        this.router.navigate(['/adherent']);
    };
    AdherentModifierComponent.prototype.cancel = function () {
        this.router.navigate(['/adherent', this.adherent.id]);
    };
    AdherentModifierComponent.prototype.save = function () {
        var _this = this;
        var modified = [];
        modified['id'] = this.adherent.id;
        // Init of the values to be understood by the API
        this.form.value.comite = (this.form.value.comite ? 1 : 0);
        this.form.value.conseil = (this.form.value.conseil ? 1 : 0);
        Object.keys(this.form.value).forEach(function (attr) {
            if (_this.form.value[attr] !== _this.adherent[attr]) {
                modified[attr] = _this.form.value[attr];
            }
        });
        this.adhService.update(modified).then(function (res) {
            if (res) {
                _this.router.navigate(['/adherent', res.id]);
            }
            else {
                console.log('Erreur');
            }
        });
    };
    return AdherentModifierComponent;
}());
AdherentModifierComponent = __decorate([
    core_1.Component({
        selector: 'adherent-modifier',
        templateUrl: './adherent-modifier.component.html'
    })
], AdherentModifierComponent);
exports.AdherentModifierComponent = AdherentModifierComponent;

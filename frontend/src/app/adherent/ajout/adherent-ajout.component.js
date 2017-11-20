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
var AdherentAjoutComponent = (function () {
    function AdherentAjoutComponent(router, adherentService, fb) {
        this.router = router;
        this.adherentService = adherentService;
        this.fb = fb;
    }
    AdherentAjoutComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            nom: ['', [forms_1.Validators.required]],
            prenom: ['', forms_1.Validators.required],
            adresse: ['', forms_1.Validators.required],
            codePostal: ['', forms_1.Validators.required],
            ville: ['', forms_1.Validators.required],
            tel1: ['', forms_1.Validators.required],
            tel2: ['', forms_1.Validators.required],
            email: ['', forms_1.Validators.required],
            comite: [0, forms_1.Validators.required],
            conseil: [0, forms_1.Validators.required]
        });
    };
    AdherentAjoutComponent.prototype.back = function () {
        this.router.navigate(['/adherent']);
    };
    AdherentAjoutComponent.prototype.save = function () {
        var _this = this;
        // Init of the values to be understood by the URL
        this.form.value.comite = (this.form.value.comite ? 1 : 0);
        this.form.value.conseil = (this.form.value.conseil ? 1 : 0);
        this.adherentService.create(this.form.value).then(function (res) {
            _this.router.navigate(['/adherent', res.id]);
        });
    };
    return AdherentAjoutComponent;
}());
AdherentAjoutComponent = __decorate([
    core_1.Component({
        selector: 'adherent-ajout',
        templateUrl: './adherent-ajout.component.html'
    })
], AdherentAjoutComponent);
exports.AdherentAjoutComponent = AdherentAjoutComponent;

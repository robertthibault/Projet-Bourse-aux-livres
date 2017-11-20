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
var EleveModifierComponent = (function () {
    function EleveModifierComponent(route, router, clsService, fb) {
        this.route = route;
        this.router = router;
        this.clsService = clsService;
        this.fb = fb;
    }
    EleveModifierComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.clsService.getEleve(this.route.snapshot.params['id'])
            .then(function (eleve) {
            _this.eleve = eleve;
            _this.form = _this.fb.group({
                nom: [_this.eleve.nom, [forms_1.Validators.required]],
                prenom: [_this.eleve.prenom, [forms_1.Validators.required]],
                dateNaissance: [_this.eleve.dateNaissance, [forms_1.Validators.required]],
                mail: [_this.eleve.mail, [forms_1.Validators.required]],
                tel: [_this.eleve.tel, [forms_1.Validators.required]],
                remarques: [_this.eleve.remarques, [forms_1.Validators.required]],
            });
        });
    };
    EleveModifierComponent.prototype.back = function () {
        this.router.navigate(['/eleve']);
    };
    EleveModifierComponent.prototype.cancel = function () {
        this.router.navigate(['/eleve', this.eleve.id]);
    };
    EleveModifierComponent.prototype.save = function () {
        var _this = this;
        var modified = [];
        modified['id'] = this.eleve.id;
        Object.keys(this.form.value).forEach(function (attr) {
            if (_this.form.value[attr] !== _this.eleve[attr]) {
                modified[attr] = _this.form.value[attr];
            }
        });
        //        if (modified != 1) {
        this.clsService
            .update(modified)
            .then(function (res) {
            if (res) {
                _this.router.navigate(['/eleve', res.id]);
            }
            else {
                console.log('Erreur');
            }
        });
        // }else{
        //  this.router.navigate(['/eleve',this.eleve.id]);
        // }
    };
    return EleveModifierComponent;
}());
EleveModifierComponent = __decorate([
    core_1.Component({
        selector: 'eleve-modifier',
        templateUrl: 'eleve-modifier.component.html'
    })
], EleveModifierComponent);
exports.EleveModifierComponent = EleveModifierComponent;

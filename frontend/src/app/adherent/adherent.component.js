"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AdherentComponent = (function () {
    function AdherentComponent() {
    }
    AdherentComponent.prototype.ngOnInit = function () {
        // TODO
    };
    return AdherentComponent;
}());
AdherentComponent = __decorate([
    core_1.Component({
        selector: 'adherent',
        template: "\n  <div class=\"container\">\n    <h2>Gestion des adh\u00E9rents</h2>\n    <div class = \"main-content\">\n      <router-outlet></router-outlet>\n    </div>\n   </div>\n  ",
    })
], AdherentComponent);
exports.AdherentComponent = AdherentComponent;

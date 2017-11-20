"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var EleveService = (function () {
    function EleveService(http) {
        this.http = http;
        this.elvUrlGET = 'http://api-bal/dispatcher.php?table=eleve'; // URL to web api
        this.elvUrlPOST = 'http://api-bal/dispatcher.php?'; // URL to web api
        this.headers = new http_1.Headers({ 'content-type': 'application/json' });
    }
    EleveService.prototype.getEleves = function () {
        return this.http.get(this.elvUrlGET)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    EleveService.prototype.getElevesByIdAdherent = function (id) {
        var paramURL = this.elvUrlGET + '&adherent=' + id;
        return this.http.get(this.elvUrlGET)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    EleveService.prototype.getEleve = function (id) {
        var paramURL = this.elvUrlGET + '&id=' + id;
        return this.http.get(paramURL)
            .toPromise()
            .then(function (response) { return response.json().data[0]; })
            .catch(this.handleError);
    };
    EleveService.prototype.update = function (changed) {
        // console.log(changed);
        var paramURL = this.elvUrlGET;
        for (var attr in changed) {
            if (attr) {
                paramURL += '&' + attr + '=' + changed[attr];
            }
        }
        // console.log(paramURL);
        return this.http
            .patch(paramURL, { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    EleveService.prototype.create = function (eleve) {
        console.log(JSON.stringify(eleve));
        eleve.table = 'eleve';
        eleve.fk_adherent = eleve.adherent.id;
        return this.http
            .post(this.elvUrlPOST, JSON.stringify(eleve), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    EleveService.prototype.handleError = function (error) {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    };
    return EleveService;
}());
EleveService = __decorate([
    core_1.Injectable()
], EleveService);
exports.EleveService = EleveService;

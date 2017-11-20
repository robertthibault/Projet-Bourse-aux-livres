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
var AdherentService = (function () {
    function AdherentService(http) {
        this.http = http;
        this.adhUrlGET = 'http://api-bal/dispatcher.php?table=adherent'; // URL to web api
        this.adhUrlPOST = 'http://api-bal/dispatcher.php?'; // URL to web api
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    AdherentService.prototype.getAdherents = function () {
        return this.http.get(this.adhUrlGET)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    AdherentService.prototype.getAdherent = function (id) {
        var paramURL = this.adhUrlGET + '&id=' + id;
        return this.http.get(paramURL)
            .toPromise()
            .then(function (response) { return response.json().data[0]; })
            .catch(this.handleError);
    };
    AdherentService.prototype.update = function (changed) {
        // console.log(changed);
        var paramURL = this.adhUrlGET;
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
    AdherentService.prototype.create = function (adherent) {
        // Precise the table name in the body to route the good model it in backend
        adherent.table = 'adherent';
        return this.http
            .post(this.adhUrlPOST, JSON.stringify(adherent), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    AdherentService.prototype.handleError = function (error) {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    };
    return AdherentService;
}());
AdherentService = __decorate([
    core_1.Injectable()
], AdherentService);
exports.AdherentService = AdherentService;

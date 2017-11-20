 import { Injectable } from '@angular/core';
import { Classe } from './classe';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ClasseService {
  private ClasseURLGET = 'http://api-bal/dispatcher.php?table=classe';  // URL to web api
  private ClasseURLPOST = 'http://api-bal/dispatcher.php?';  // URL to web api
  private headers = new Headers({ 'content-type': 'application/json' });

  constructor(private http: Http) { }

  public getClasses(): Promise<Classe[]> {
    return this.http.get(this.ClasseURLGET)
      .toPromise()
      .then((response) => response.json().data as Classe[])
      .catch(this.handleError);
  }

  public getClasse(id: number): Promise<Classe> {
    let paramURL = this.ClasseURLGET + '&id=' + id;

    return this.http.get(paramURL)
      .toPromise()
      .then((response) => response.json().data[0] as Classe)
      .catch(this.handleError)
      ;
  }

  public getClasseCouranteEleve(idElv: number): Promise<Classe> {
    let paramURL = this.ClasseURLGET + '&eleve=' + idElv;
    return this.http.get(paramURL)
      .toPromise()
      .then((response) => response.json().data[0] as Classe)
      .catch(this.handleError)
      ;
  }

  public update(classe: any): Promise<Classe> {

    let paramURL = this.ClasseURLGET;
    for (let attr in classe) {
      if (attr) {
        paramURL += '&' + attr + '=' + classe[attr];
      }
    }
    // console.log(paramURL);
    return this.http
      .patch(paramURL, { headers: this.headers })
      .toPromise()
      .then((response) => response.json().data as Classe)
      .catch(this.handleError);
  }

  public create(classe: any): Promise<Classe> {
    classe.table = 'Classe';
    return this.http
      .post(this.ClasseURLPOST, JSON.stringify(classe), { headers: this.headers })
      .toPromise()
      .then( (res) => res.json().data as Classe)
      .catch(this.handleError);
  }

  public ajoutRefLivre(idRef, idCls): Promise<Classe> {
    let classeRefLivre: any = {};
    classeRefLivre.table = 'Classe';
    classeRefLivre.id = idRef;
    classeRefLivre.classe = idCls;

    return this.http
      .post(this.ClasseURLPOST, JSON.stringify(classeRefLivre), { headers: this.headers })
      .toPromise()
      .then( (res) => res.json().data as Classe)
      .catch(this.handleError);
  }

  public supprRefLivre(id, idRef) {
    let paramURL = this.ClasseURLGET + '&id=' + id + '&reflivre=' + idRef;
    return this.http.delete(paramURL)
      .toPromise()
      .then((response) => response.json().data[0] as Classe)
      .catch(this.handleError)
      ;
  }

  private handleError(error: any) {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}

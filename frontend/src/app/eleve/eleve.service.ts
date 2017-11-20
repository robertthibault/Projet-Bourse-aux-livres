import { Injectable } from '@angular/core';
import { Eleve } from './eleve';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EleveService {
  private elvUrlGET = 'http://api-bal/dispatcher.php?table=eleve';  // URL to web api
  private elvUrlPOST = 'http://api-bal/dispatcher.php?';  // URL to web api

  private headers = new Headers({ 'content-type': 'application/json' });

  constructor(private http: Http) { }

  public getEleves(): Promise<Eleve[]> {
    return this.http.get(this.elvUrlGET)
      .toPromise()
      .then((response) => response.json().data as Eleve[])
      .catch(this.handleError);
  }

  // Ajoute une classe à un eleve par insertion dans la table de relation
  public ajoutClasse(idElv, idCls): Promise<Eleve> {
    let eleveClasse: any = {};
    eleveClasse.table = 'eleve';
    eleveClasse.id = idElv;
    eleveClasse.classe = idCls;
    return this.http
      .post(this.elvUrlPOST, JSON.stringify(eleveClasse), { headers: this.headers })
      .toPromise()
      .then( (res) => res.json().data as Eleve)
      .catch(this.handleError);
  }

    public getElevesByIdAdherent(id: number): Promise<Eleve[]> {
    let paramURL = this.elvUrlGET + '&adherent=' + id;
    return this.http.get(this.elvUrlGET)
      .toPromise()
      .then((response) => response.json().data as Eleve[])
      .catch(this.handleError);
  }

  public getEleve(id: number): Promise<Eleve> {
    let paramURL = this.elvUrlGET + '&id=' + id;
    return this.http.get(paramURL)
      .toPromise()
      .then((response) => response.json().data[0] as Eleve)
      .catch(this.handleError);
  }

  public update(changed: any[]): Promise<Eleve> {
    let paramURL = this.elvUrlGET;
    for (let attr in changed) {
      if (attr) {
        paramURL += '&' + attr + '=' + changed[attr];
      }
    }
    return this.http
      .patch(paramURL, { headers: this.headers })
      .toPromise()
      .then((response) => response.json().data as Eleve)
      .catch(this.handleError);
  }

  public create(eleve: any): Promise<Eleve> {
    eleve.table = 'eleve';
    eleve.fk_adherent = eleve.adherent.id;
    return this.http
      .post(this.elvUrlPOST, JSON.stringify(eleve), { headers: this.headers })
      .toPromise()
      .then( (res) => res.json().data as Eleve)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

}

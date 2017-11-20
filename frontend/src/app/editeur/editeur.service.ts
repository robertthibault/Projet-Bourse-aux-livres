import { Injectable } from '@angular/core';
import { Editeur } from './editeur';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EditeurService {
  private EditeurURLGET = 'http://api-bal/dispatcher.php?table=Editeur';  // URL to web api
  private EditeurURLPOST = 'http://api-bal/dispatcher.php?';  // URL to web api
  private headers = new Headers({ 'content-type': 'application/json' });

  constructor(private http: Http) { }

  public getEditeurs(): Promise<Editeur[]> {
    return this.http.get(this.EditeurURLGET)
      .toPromise()
      .then((response) => response.json().data as Editeur[])
      .catch(this.handleError);
  }

  public getEditeur(idEdt: number): Promise<Editeur> {
    let paramURL = this.EditeurURLGET + '&id=' + idEdt;

    return this.http.get(paramURL)
      .toPromise()
      .then((response) => response.json().data[0] as Editeur)
      .catch(this.handleError)
      ;
  }

  public update(changed: any[]): Promise<Editeur> {
    // console.log(changed);
    let paramURL = this.EditeurURLGET;
    for (let attr in changed) {
      if (attr) {
        paramURL += '&' + attr + '=' + changed[attr];
      }
    }
    // console.log(paramURL);
    return this.http
      .patch(paramURL, { headers: this.headers })
      .toPromise()
      .then((response) => response.json().data as Editeur)
      .catch(this.handleError);
  }

  public create(editeur: any): Promise<Editeur> {
    editeur.table = 'editeur';
    return this.http
      .post(this.EditeurURLPOST, JSON.stringify(editeur), { headers: this.headers })
      .toPromise()
      .then( (res) => res.json().data as Editeur)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}

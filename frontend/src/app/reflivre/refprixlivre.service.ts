import { Injectable } from '@angular/core';
import { RefPrixLivre } from './refprixlivre';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class RefPrixLivreService {
  private prixUrlGET = 'http://api-bal/dispatcher.php?table=refprixlivre';  // URL to web api
  private prixUrlPOST = 'http://api-bal/dispatcher.php?';  // URL to web api
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  public getRefsprixlivre(): Promise<RefPrixLivre[]> {

    return this.http.get(this.prixUrlGET)
      .toPromise()
      .then((response) => response.json().data as RefPrixLivre[])
      .catch(this.handleError);
  }

  public getRefprixlivre(id: number): Promise<RefPrixLivre> {
    let paramURL = this.prixUrlGET + '&id=' + id;

    return this.http.get(paramURL)
      .toPromise()
      .then((response) => response.json().data[0] as RefPrixLivre)
      .catch(this.handleError)
      ;
  }

  public update(changed: any[]): Promise<RefPrixLivre> {
    // console.log(changed);
    let paramURL = this.prixUrlGET;
    for (let attr in changed) {
      if (attr) {
        paramURL += '&' + attr + '=' + changed[attr];
      }
    }
    // console.log(paramURL);
    return this.http
      .patch(paramURL, { headers: this.headers })
      .toPromise()
      .then((response) => response.json().data as RefPrixLivre)
      .catch(this.handleError);
  }

  // Permet de récupérer les deux prix différents
  public getPrixSelonLivreEtat(idLivre: number): Promise<RefPrixLivre[]> {
    let paramURL = this.prixUrlGET + '&=idLivre' + id ;
    return this.http.get(paramURL)
      .toPromise()
      .then((response) => response.json().data[0] as RefPrixLivre[])
      .catch(this.handleError)
      ;
  }

  public create(refprixlivre: any): Promise<RefPrixLivre> {
    // Precise the table name in the body to route the good model it in backend
    refprixlivre.table = 'refprixlivre';
    return this.http
      .post(this.prixUrlPOST, JSON.stringify(refprixlivre), { headers: this.headers })
      .toPromise()
      .then( (res) => res.json().data as RefPrixLivre)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}

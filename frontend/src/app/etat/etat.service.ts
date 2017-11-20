import { Injectable } from '@angular/core';
import { Etat } from './etat';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EtatService {
  private EtatURLGET = 'http://api-bal/dispatcher.php?table=Etat';  // URL to web api
  private EtatURLPOST = 'http://api-bal/dispatcher.php?';  // URL to web api
  private headers = new Headers({ 'content-type': 'application/json' });

  constructor(private http: Http) { }

  public getEtats(): Promise<Etat[]> {
    return this.http.get(this.EtatURLGET)
      .toPromise()
      .then((response) => response.json().data as Etat[])
      .catch(this.handleError);
  }

  public getEtat(idEtat: number): Promise<Etat> {
    let paramURL = this.EtatURLGET + '&id=' + idEtat;

    return this.http.get(paramURL)
      .toPromise()
      .then((response) => response.json().data[0] as Etat)
      .catch(this.handleError)
      ;
  }

  public update(etat: Etat): Promise<Etat> {
    const url = `${this.EtatURLGET}/${etat.id}`;
    return this.http
      .put(url, JSON.stringify(etat), { headers: this.headers })
      .toPromise()
      .then(() => etat)
      .catch(this.handleError)
      ;
  }

  public create(etat: any): Promise<Etat> {
    etat.table = 'etat';
    return this.http
      .post(this.EtatURLPOST, JSON.stringify(etat), { headers: this.headers })
      .toPromise()
      .then( (res) => res.json().data as Etat)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}

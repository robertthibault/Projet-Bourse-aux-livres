import { Injectable } from '@angular/core';
import { Adherent } from './adherent';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AdherentService {
  private adhUrlGET = 'http://api-bal/dispatcher.php?table=adherent';  // URL to web api
  private adhUrlPOST = 'http://api-bal/dispatcher.php?';  // URL to web api
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  public getAdherents(): Promise<Adherent[]> {

    return this.http.get(this.adhUrlGET)
      .toPromise()
      .then((response) => response.json().data as Adherent[])
      .catch(this.handleError);
  }

  public getAdherent(id: number): Promise<Adherent> {
    let paramURL = this.adhUrlGET + '&id=' + id;

    return this.http.get(paramURL)
      .toPromise()
      .then((response) => response.json().data[0] as Adherent)
      .catch(this.handleError)
      ;
  }

  public update(changed: any[]): Promise<Adherent> {
    // console.log(changed);
    let paramURL = this.adhUrlGET;
    for (let attr in changed) {
      if (attr) {
        paramURL += '&' + attr + '=' + changed[attr];
      }
    }
    // console.log(paramURL);
    return this.http
      .patch(paramURL, { headers: this.headers })
      .toPromise()
      .then((response) => response.json().data as Adherent)
      .catch(this.handleError);
  }

  public create(adherent: any): Promise<Adherent> {
    // Precise the table name in the body to route the good model it in backend
    adherent.table = 'adherent';
    return this.http
      .post(this.adhUrlPOST, JSON.stringify(adherent), { headers: this.headers })
      .toPromise()
      .then( (res) => res.json().data as Adherent)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}

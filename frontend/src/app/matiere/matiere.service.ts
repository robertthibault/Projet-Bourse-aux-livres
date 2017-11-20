import { Injectable } from '@angular/core';
import { Matiere } from './matiere';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MatiereService {
  private MatiereURLGET = 'http://api-bal/dispatcher.php?table=Matiere';  // URL to web api
  private MatiereURLPOST = 'http://api-bal/dispatcher.php?';  // URL to web api
  private headers = new Headers({ 'content-type': 'application/json' });

  constructor(private http: Http) { }

  public getMatieres(): Promise<Matiere[]> {
    return this.http.get(this.MatiereURLGET)
      .toPromise()
      .then((response) => response.json().data as Matiere[])
      .catch(this.handleError);
  }

  public getMatiere(idMat: number): Promise<Matiere> {
    let paramURL = this.MatiereURLGET + '&id=' + idMat;

    return this.http.get(paramURL)
      .toPromise()
      .then((response) => response.json().data[0] as Matiere)
      .catch(this.handleError)
      ;
  }

  public update(matiere: Matiere): Promise<Matiere> {
    const url = `${this.MatiereURLGET}/${matiere.id}`;
    return this.http
      .put(url, JSON.stringify(matiere), { headers: this.headers })
      .toPromise()
      .then(() => matiere)
      .catch(this.handleError)
      ;
  }

  public create(matiere: any): Promise<Matiere> {
    matiere.table = 'matiere';
    return this.http
      .post(this.MatiereURLPOST, JSON.stringify(matiere), { headers: this.headers })
      .toPromise()
      .then( (res) => res.json().data as Matiere)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}

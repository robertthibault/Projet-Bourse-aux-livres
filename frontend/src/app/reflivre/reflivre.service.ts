import { Injectable } from '@angular/core';
import { RefLivre } from './reflivre';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class RefLivreService {
  private RefLivreURLGET = 'http://api-bal/dispatcher.php?table=RefLivre';  // URL to web api
  private RefLivreURLPOST = 'http://api-bal/dispatcher.php?';  // URL to web api
  private headers = new Headers({ 'content-type': 'application/json' });

  constructor(private http: Http) { }

  public getRefLivres(): Promise<RefLivre[]> {
    return this.http.get(this.RefLivreURLGET)
      .toPromise()
      .then((response) => response.json().data as RefLivre[])
      .catch(this.handleError);
  }

  public getRefLivre(id: number): Promise<RefLivre> {
    let paramURL = this.RefLivreURLGET + '&id=' + id;

    return this.http.get(paramURL)
      .toPromise()
      .then((response) => response.json().data[0] as RefLivre)
      .catch(this.handleError)
      ;
  }

  public getLivresClasse(idCls: number): Promise<RefLivre[]> {
    let paramURL = this.RefLivreURLGET + '&classe=' + idCls;
    return this.http.get(paramURL)
      .toPromise()
      .then((response) => response.json().data as RefLivre[])
      .catch(this.handleError);
  }

  public update(reflivre: any): Promise<RefLivre> {
      // console.log(changed);
    let paramURL = this.RefLivreURLGET;
    
    for (let attr in reflivre) {
      console.log(attr);
      if (attr === 'editeur') {
        console.log(reflivre);
        paramURL += '&' + 'fk_editeur=' + reflivre.editeur;
      }
      if (attr === 'matiere') {
        paramURL += '&' + 'fk_matiere=' + reflivre.matiere;
      } else {
        paramURL += '&' + attr + '=' + reflivre[attr];
      }

    }
    // console.log(paramURL);
    return this.http
      .patch(paramURL, { headers: this.headers })
      .toPromise()
      .then((response) => response.json().data as RefLivre)
      .catch(this.handleError);
  }

  public create(reflivre: any): Promise<RefLivre> {
    reflivre.table = 'RefLivre';
    reflivre.fk_matiere = reflivre.idMatiere;
    reflivre.fk_editeur = reflivre.idEditeur;
    return this.http
      .post(this.RefLivreURLPOST, JSON.stringify(reflivre), { headers: this.headers })
      .toPromise()
      .then( (res) => res.json().data as RefLivre)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}

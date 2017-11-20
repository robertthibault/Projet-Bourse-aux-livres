import { Injectable } from '@angular/core';
import { Livre } from './livre';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LivreService {
  private LivreURLGET = 'http://api-bal/dispatcher.php?table=livre';  // URL to web api
  private LivreURLPOST = 'http://api-bal/dispatcher.php?';  // URL to web api
  private headers = new Headers({ 'content-type': 'application/json' });

  constructor(private http: Http) { }

  public getLivres(): Promise<Livre[]> {
    return this.http.get(this.LivreURLGET)
      .toPromise()
      .then((response) => response.json().data as Livre[])
      .catch(this.handleError);
  }

  /*
    Renvoie la liste des livres revendus ou non d'un élève selon le booléen rachat
  */
  public getLivresEleveRachat(eleve: string, rachat: boolean): Promise<Livre[]> {
    let paramURL = this.LivreURLGET + '&eleve=' + eleve + '&rachat=' + ((rachat) ? '1' : '0' );
    return this.http.get(paramURL)
      .toPromise()
      .then((response) => response.json().data as Livre[])
      .catch(this.handleError);
  }

  /*
    Renvoie la liste des livres disponibles ou non selon le booléen stock
  */
  public getLivresStock(stock: boolean): Promise<Livre[]> {
    let paramURL = this.LivreURLGET + '&stock=' + ((stock) ? '1' : '0' );
    return this.http.get(paramURL)
      .toPromise()
      .then((response) => response.json().data as Livre[])
      .catch(this.handleError);
  }

  public getLivre(id: number): Promise<Livre> {
    let paramURL = this.LivreURLGET + '&id=' + id;

    return this.http.get(paramURL)
      .toPromise()
      .then((response) => response.json().data[0] as Livre)
      .catch(this.handleError)
      ;
  }

  public update(livre: any): Promise<Livre> {
    let paramURL = this.LivreURLGET;
    for (let attr in livre) {
      if (attr) {
        paramURL += '&' + attr + '=' + livre[attr];
      }
    }
    // console.log(paramURL);
    return this.http
      .patch(paramURL, { headers: this.headers })
      .toPromise()
      .then((response) => response.json().data as Livre)
      .catch(this.handleError);
  }

  public create(livre: any): Promise<Livre> {
    livre.table = 'Livre';
    livre.fk_reflivre = livre.lesRefLivres;
    livre.fk_etat = livre.lesEtats;
    return this.http
      .post(this.LivreURLPOST, JSON.stringify(livre), { headers: this.headers })
      .toPromise()
      .then( (res) => res.json().data as Livre)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

  /*
    Modifie la date des livres revendus
  */
  public setLivresEleveRachat(eleve: string, livre: string, rachat: boolean): Promise<Livre> {
     let paramURL = this.LivreURLGET + '&eleve=' + eleve + '&livre=' + livre + '&rachat=1';
     return this.http.get(paramURL)
     .toPromise()
     .then((response) => response.json().data[0] as Livre)
     .catch(this.handleError)
     ;
  }

  /*
    Insert une ligne dans l'historique des etats
  public setHistoriqueEtat(livre: string, etat: string): Promise<Livre> {
    let paramURL = this.LivreURLGET + '&livre=' + livre + '&etat=' + etat;
    return this.http.get(paramURL)
    .toPromise()
    .then((response) => response.json().data[0] as Livre)
    .catch(this.handleError)
    ;
  }
  */
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LivreService } from '../livre.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { RefLivreService } from '../../reflivre/reflivre.service';
import { EtatService } from '../../etat/etat.service';

@Component({
  selector: 'livre-ajout',
  templateUrl: './livre-ajout.component.html',
  providers: [RefLivreService, EtatService]
})

export class LivreAjoutComponent implements OnInit {

  public form: FormGroup;
  public lesEtats: SelectItem[];
  public lesRefLivres: SelectItem[];
  public selectedEtat: String;
  public selectedRefLivre: String;

  constructor(
    private router: Router,
    private livreService: LivreService,
    private fb: FormBuilder,
    private reflivreService: RefLivreService,
    private etatService: EtatService
  ) {
  }

  public ngOnInit() {
    this.getEtats();
    this.getRefLivres();
    this.form = this.fb.group({
      lesEtats: ['', Validators.required],
      lesRefLivres: ['', Validators.required],
    });
  }

  public back() {
    this.router.navigate(['/livre']);
  }

  public getEtats(): void {
    this.lesEtats = [];
    this.etatService.getEtats()
     .then((etats) => this.remplirSelectEtat(etats));
  }

  public remplirSelectEtat(etats) {
    for (let etat of etats){
      this.lesEtats.push({label: etat.libelle, value: etat.id});
    }
  }

  public getRefLivres(): void {
    this.lesRefLivres = [];
    this.reflivreService.getRefLivres()
      .then((reflivres) => this.remplirSelectRefLivres(reflivres));
  }

  public remplirSelectRefLivres(reflivres) {
    for (let reflivre of reflivres) {
      this.lesRefLivres.push({label: reflivre.libelle, value: reflivre.id});
    }
  }

  public cancel() {
    this.router.navigate(['/livre']);
  }

  public save() {
    this.livreService.create(this.form.value).then(
      (res) => {
        // TODO : check de la table pour etre sur que ca deconne pas (index sur l'id éditeur)
        this.router.navigate(['/livre', res.id]);
      }
    );
  }
}

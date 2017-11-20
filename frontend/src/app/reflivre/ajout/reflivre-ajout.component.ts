import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { MatiereService } from '../../matiere/matiere.service';
import { EditeurService } from '../../editeur/editeur.service';
import { RefLivreService } from '../reflivre.service';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'reflivre-ajout',
  templateUrl: './reflivre-ajout.component.html',
  providers: [MatiereService, EditeurService]
})

export class RefLivreAjoutComponent implements OnInit {

  public form: FormGroup;
  public lesEditeurs: SelectItem[];
  public lesMatieres: SelectItem[];
  public selectedEditeur: String;
  public selectedMatiere: String;

  constructor(
    private router: Router,
    private refLivreService: RefLivreService,
    private fb: FormBuilder,
    private matiereService: MatiereService,
    private editeurService: EditeurService,
  ) {
  }

  public ngOnInit() {
    this.getEditeurs();
    this.getMatieres();
    this.form = this.fb.group({
      libelle: ['', [Validators.required]],
      auteur: ['', Validators.required],
      idEditeur: ['', Validators.required],
      idMatiere: ['', Validators.required],
      isbn: ['', Validators.required],
    });
  }

  public back() {
    this.router.navigate(['/reflivre']);
  }

  public getMatieres(): void {
    this.lesMatieres = [];
    this.matiereService.getMatieres()
      .then((matieres) => this.remplirSelectMatiere(matieres));
  }

  public remplirSelectMatiere(matieres) {
    for (let matiere of matieres){
        this.lesMatieres.push({label: matiere.libelle, value: matiere.id});
    }
  }

  public getEditeurs(): void {
    this.lesEditeurs = [];
    this.editeurService.getEditeurs()
      .then((editeurs) => this.remplirSelectEditeurs(editeurs));
  }

  public remplirSelectEditeurs(editeurs) {
    for (let editeur of editeurs) {
      this.lesEditeurs.push({label: editeur.nom, value: editeur.id});
    }
  }

  public cancel() {
    this.router.navigate(['/reflivre']);
  }

  public save() {
    this.refLivreService.create(this.form.value).then(
      (res) => {
        // TODO : check de la table pour etre sur que ca deconne pas (index sur l'id éditeur)
        this.router.navigate(['/reflivre', res.id]);
      }
    );
  }
}

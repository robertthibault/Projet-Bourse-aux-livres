import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/primeng';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatiereService } from '../../matiere/matiere.service';
import { EditeurService } from '../../editeur/editeur.service';
import { RefLivreService } from '../reflivre.service';
import { RefLivre } from '../reflivre';

@Component({
    selector: 'livre-modifier',
    templateUrl: 'reflivre-modifier.component.html',
    providers: [MatiereService, EditeurService]
})

export class RefLivreModifierComponent implements OnInit {

    public form: FormGroup;
    public reflivre: RefLivre;
    public lesEditeurs: SelectItem[];
    public lesMatieres: SelectItem[];
    public selectedEditeur: String;
    public selectedMatiere: String;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private lvService: RefLivreService,
        private fb: FormBuilder,
        private matiereService: MatiereService,
        private editeurService: EditeurService,
    ) {
    }

    public ngOnInit() {
      this.getEditeurs();
      this.getMatieres();
      this.lvService.getRefLivre(this.route.snapshot.params['id'])
            .then((lv) => {
                this.reflivre = lv;
                this.selectedEditeur = '' + lv.editeur.id;
                this.selectedMatiere = '' + lv.matiere.id;
                console.log(this.selectedEditeur);
                this.form = this.fb.group({
                  libelle : [this.reflivre.libelle, [Validators.required]],
                  auteur : [this.reflivre.auteur, [Validators.required]],
                  editeur : ['', [Validators.required]],
                  matiere : ['', [Validators.required]],
                  isbn : [this.reflivre.isbn, [Validators.required]],
                });
            });
    }

    public back() {
        this.router.navigate(['/reflivre']);
    }

  public edit(): void {
    this.router.navigate(['/reflivre']);
  }

    public cancel() {
        this.router.navigate(['/reflivre']);
    }

    public save() {
        let modified: any = [];
        modified['id'] = this.reflivre.id;

        Object.keys(this.form.value).forEach((attr) => {
            if (this.form.value[attr] !== this.reflivre[attr]) {
                modified[attr] = this.form.value[attr];
            }
        });

        this.lvService.update(modified).then(
            (res) => {
                if (res) {
                    this.router.navigate(['/reflivre', res.id]);
                } else {
                    console.log('Erreur');
                }
            }
        );
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

}

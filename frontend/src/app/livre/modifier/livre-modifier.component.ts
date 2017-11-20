import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LivreService } from '../livre.service';
import { Livre } from '../livre';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'livre-modifier',
    templateUrl: './livre-modifier.component.html'
})

export class LivreModifierComponent implements OnInit {

    public form: FormGroup;
    public livre: Livre;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private lvService: LivreService,
        private fb: FormBuilder
    ) {
    }

    public ngOnInit() {
        this.lvService.getLivre(this.route.snapshot.params['id'])
            .then((lv) => {
                this.livre = lv;
                this.form = this.fb.group({
                  libelle : [this.livre.reflivre.libelle, [Validators.required]],
                  auteur : [this.livre.reflivre.auteur, [Validators.required]],
                  editeur : [this.livre.reflivre.editeur.nom, [Validators.required]],
                  matiere : [this.livre.reflivre.matiere.libelle, [Validators.required]],
                  isbn : [this.livre.reflivre.isbn, [Validators.required]],

                });
            });
    }

    public back() {
        this.router.navigate(['/livre']);
    }

    public cancel() {
        this.router.navigate(['/livre']);
    }

    public save() {
        let modified: any = [];
        modified['id'] = this.livre.id;

        Object.keys(this.form.value).forEach((attr) => {
            if (this.form.value[attr] !== this.livre[attr]) {
                modified[attr] = this.form.value[attr];
            }
        });

        this.lvService.update(modified).then(
            (res) => {
                if (res) {
                    this.router.navigate(['/livre', res.id]);
                } else {
                    console.log('Erreur');
                }
            }
        );
    }
}

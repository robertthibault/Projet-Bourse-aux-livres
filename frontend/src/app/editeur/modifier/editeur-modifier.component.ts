import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EditeurService } from '../editeur.service';
import { Editeur } from '../editeur';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'editeur-modifier',
    templateUrl: './editeur-modifier.component.html'
})

export class EditeurModifierComponent implements OnInit {

    public form: FormGroup;
    public editeur: Editeur;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private edtService: EditeurService,
        private fb: FormBuilder
    ) {
    }

    public ngOnInit() {
        this.edtService.getEditeur(this.route.snapshot.params['id'])
            .then((edt) => {
                this.editeur = edt;
                this.form = this.fb.group({
                  nom : [this.editeur.nom, [Validators.required]],
                });
            });
    }

    public back() {
        this.router.navigate(['/editeur']);
    }

    public cancel() {
        this.router.navigate(['/editeur']);
    }

    public save() {
        let modified: any = [];
        modified['id'] = this.editeur.id;

        Object.keys(this.form.value).forEach((attr) => {
            if (this.form.value[attr] !== this.editeur[attr]) {
                modified[attr] = this.form.value[attr];
            }
        });

        this.edtService.update(modified).then(
            (res) => {
                if (res) {
                    this.router.navigate(['/editeur', res.id]);
                } else {
                    console.log('Erreur');
                }
            }
        );
    }
}

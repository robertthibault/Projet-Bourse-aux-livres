import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatiereService } from '../matiere.service';
import { Matiere } from '../matiere';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'matiere-modifier',
    templateUrl: './matiere-modifier.component.html'
})

export class MatiereModifierComponent implements OnInit {

    public form: FormGroup;
    public matiere: Matiere;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private matService: MatiereService,
        private fb: FormBuilder
    ) {
    }

    public ngOnInit() {
        this.matService.getMatiere(this.route.snapshot.params['id'])
            .then((mat) => {
                this.matiere = mat;
                this.form = this.fb.group({
                    libelle: [this.matiere.libelle, [Validators.required]],
                });
            });
    }

    public back() {
        this.router.navigate(['/matiere']);
    }

    public cancel() {
        this.router.navigate(['/matiere']);
    }

    public save() {
        let modified: any = [];
        modified['id'] = this.matiere.id;

        Object.keys(this.form.value).forEach((attr) => {
            if (this.form.value[attr] !== this.matiere[attr]) {
                modified[attr] = this.form.value[attr];
            }
        });

        this.matService.update(modified).then(
            (res) => {
                if (res) {
                    this.router.navigate(['/matiere', res.id]);
                } else {
                    console.log('Erreur');
                }
            }
        );
    }
}

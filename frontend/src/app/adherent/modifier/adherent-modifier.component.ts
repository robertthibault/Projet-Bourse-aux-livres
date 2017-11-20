import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdherentService } from '../adherent.service';
import { Adherent } from '../adherent';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'adherent-modifier',
    templateUrl: './adherent-modifier.component.html'
})

export class AdherentModifierComponent implements OnInit {

    public form: FormGroup;
    public adherent: Adherent;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private adhService: AdherentService,
        private fb: FormBuilder
    ) {
    }

    public ngOnInit() {
        this.adhService.getAdherent(this.route.snapshot.params['id'])
            .then((adh) => {
                this.adherent = adh;
                this.form = this.fb.group({
                    nom: [this.adherent.nom, [Validators.required]],
                    prenom: [this.adherent.prenom, Validators.required],
                    adresse: [this.adherent.adresse, Validators.required],
                    codePostal: [this.adherent.codePostal, Validators.required],
                    ville: [this.adherent.ville, Validators.required],
                    tel: [this.adherent.tel, Validators.required],
                    tel2: [this.adherent.tel2, Validators.required],
                    mail: [this.adherent.mail, Validators.required],
                    comite: [this.adherent.comite, Validators.required],
                    conseil: [this.adherent.conseil, Validators.required]
                });
            });
    }

    public back() {
        this.router.navigate(['/adherent']);
    }

    public cancel() {
        this.router.navigate(['/adherent', this.adherent.id]);
    }

    public save() {
        let modified: any = [];
        modified['id'] = this.adherent.id;

        // Init of the values to be understood by the API
        this.form.value.comite = (this.form.value.comite ? 1 : 0 );
        this.form.value.conseil = (this.form.value.conseil ? 1 : 0 );

        Object.keys(this.form.value).forEach((attr) => {
            if (this.form.value[attr] !== this.adherent[attr]) {
                modified[attr] = this.form.value[attr];
            }
        });

        this.adhService.update(modified).then(
            (res) => {
                if (res) {
                    this.router.navigate(['/adherent', res.id]);
                } else {
                    console.log('Erreur');
                }
            }
        );
    }
}

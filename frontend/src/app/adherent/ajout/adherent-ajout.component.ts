import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdherentService } from '../adherent.service';
import { Adherent } from '../adherent';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'adherent-ajout',
    templateUrl: './adherent-ajout.component.html'
})

export class AdherentAjoutComponent implements OnInit {

    public form: FormGroup;

    constructor(
        private router: Router,
        private adherentService: AdherentService,
        private fb: FormBuilder
    ) {
    }

    public ngOnInit() {
        this.form = this.fb.group({
            nom: ['', [Validators.required]],
            prenom: ['', Validators.required],
            adresse: ['', Validators.required],
            codePostal: ['', Validators.required],
            ville: ['', Validators.required],
            tel1: ['', Validators.required],
            tel2: ['', Validators.required],
            email: ['', Validators.required],
            comite: [0, Validators.required],
            conseil: [0, Validators.required]
        });
    }

    public back() {
        this.router.navigate(['/adherent']);
    }
    public save() {
        // Init of the values to be understood by the URL
        this.form.value.comite = (this.form.value.comite ? 1 : 0 );
        this.form.value.conseil = (this.form.value.conseil ? 1 : 0 );

        this.adherentService.create(this.form.value).then(
            (res) => {
                this.router.navigate(['/adherent', res.id]);
            }
        );
    }
}

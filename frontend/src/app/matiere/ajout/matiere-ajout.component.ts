import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatiereService } from '../matiere.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
 selector: 'matiere-ajout',
 templateUrl: './matiere-ajout.component.html'
})

export class MatiereAjoutComponent implements OnInit {

    public form: FormGroup;

    constructor(
        private router: Router,
        private MatiereService: MatiereService,
        private fb: FormBuilder
    ) {
    }

    public ngOnInit() {
        this.form = this.fb.group({
            libelle: ['', [Validators.required]]
        });
    }
    public cancel() {
        this.router.navigate(['/matiere']);
    }

    public save() {
        this.MatiereService.create(this.form.value).then(
            (res) => {
                this.router.navigate(['/matiere', res.id]);
            }
        );
    }
}

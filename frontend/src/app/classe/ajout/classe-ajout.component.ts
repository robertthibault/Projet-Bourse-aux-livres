import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClasseService } from '../classe.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'classe-ajout',
    templateUrl: 'classe-ajout.component.html'
})

export class ClasseAjoutComponent implements OnInit {

    public form: FormGroup;

    constructor(
        private router: Router,
        private classeService: ClasseService,
        private fb: FormBuilder
    ) {
    }

    public ngOnInit() {
        this.form = this.fb.group({
            libelle: ['', [Validators.required]]

        });
    }

    public back() {
        this.router.navigate(['/classe']);
    }
    public save() {
        // Init of the values to be understood by the URL
        this.classeService.create(this.form.value).then(
            (res) => {
                this.router.navigate(['/classe', res.id]);
            }
        );
    }
}

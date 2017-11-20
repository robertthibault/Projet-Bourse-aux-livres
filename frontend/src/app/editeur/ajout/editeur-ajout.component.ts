import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditeurService } from '../editeur.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
 selector: 'editeur-ajout',
 templateUrl: './editeur-ajout.component.html'
})

export class EditeurAjoutComponent implements OnInit {

    public form: FormGroup;

    constructor(
        private router: Router,
        private EditeurService: EditeurService,
        private fb: FormBuilder
    ) {
    }

    public ngOnInit() {
        this.form = this.fb.group({
            nom: ['', [Validators.required]]
        });
    }

    public cancel () {
        this.router.navigate(['/editeur']);
    }
    public save() {
        // Init of the values to be understood by the URL

        this.EditeurService.create(this.form.value).then(
            (res) => {
                this.router.navigate(['/editeur', res.id]);
            }
        );
    }
}

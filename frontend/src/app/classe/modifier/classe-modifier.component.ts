import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClasseService } from '../classe.service';
import { Classe } from '../classe';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'classe-modifier',
    templateUrl: 'classe-modifier.component.html'
})

export class ClasseModifierComponent implements OnInit {

    public form: FormGroup;
    public classe: Classe;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private clsService: ClasseService,
        private fb: FormBuilder
    ) {
    }

    public ngOnInit() {
        this.clsService.getClasse(this.route.snapshot.params['id'])
            .then((classe) => {
                this.classe = classe;
                this.form = this.fb.group({
                    libelle: [this.classe.libelle, [Validators.required]]
                });
            });
    }

    public back() {
        this.router.navigate(['/classe']);
    }

    public cancel() {
        this.router.navigate(['/classe', this.classe.id]);
    }

    public save() {
        let modified: any = [];
        modified['id'] = this.classe.id;

        Object.keys(this.form.value).forEach((attr) => {
            if (this.form.value[attr] !== this.classe[attr]) {
                modified[attr] = this.form.value[attr];
            }
        });

        this.clsService.update(modified).then(
            (res) => {
                if (res) {
                    this.router.navigate(['/classe', res.id]);
                } else {
                    console.log('Erreur');
                }
            }
        );
    }
}

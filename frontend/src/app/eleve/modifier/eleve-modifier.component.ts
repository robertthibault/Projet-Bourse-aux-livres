                import { Component, OnInit } from '@angular/core';
                import { Router, ActivatedRoute } from '@angular/router';
                import { EleveService } from '../eleve.service';
                import { Eleve } from '../eleve';
                import { FormGroup, Validators, FormBuilder } from '@angular/forms';

                @Component({
                    selector: 'eleve-modifier',
                    templateUrl: 'eleve-modifier.component.html'
                })

                export class EleveModifierComponent implements OnInit {

                    public form: FormGroup;
                    public eleve: Eleve;

                    constructor(
                        private route: ActivatedRoute,
                        private router: Router,
                        private clsService: EleveService,
                        private fb: FormBuilder
                    ) {
                    }

                    public ngOnInit() {
                        this.clsService.getEleve(this.route.snapshot.params['id'])
                            .then((eleve) => {
                                this.eleve = eleve;
                                this.form = this.fb.group({
                                nom: [this.eleve.nom, [Validators.required]],
                                prenom: [this.eleve.prenom, [Validators.required]],
                                dateNaissance: [this.eleve.dateNaissance, [Validators.required]],
                                mail: [this.eleve.mail, [Validators.required]],
                                tel: [this.eleve.tel, [Validators.required]],
                                remarques: [this.eleve.remarques, [Validators.required]],
                                });
                            });
                    }

                    public edit(): void {
                        this.router.navigate(['/eleve']);
                    }

                    public cancel() {
                        this.router.navigate(['/eleve', this.eleve.id]);
                    }

                    public save() {
                        let modified: any = [];
                        modified['id'] = this.eleve.id;

                        Object.keys(this.form.value).forEach((attr) => {
                            if (this.form.value[attr] !== this.eleve[attr]) {
                                modified[attr] = this.form.value[attr];
                            }
                        });

                //        if (modified != 1) {
                        this.clsService
                        .update(modified)
                        .then(
                            (res) => {
                                if (res) {
                                    this.router.navigate(['/eleve', res.id]);
                                } else {
                                    console.log('Erreur');
                                }
                            }
                        );
                        // }else{
                        //  this.router.navigate(['/eleve',this.eleve.id]);
                        // }
                    }
                }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EleveService } from '../eleve.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AdherentService } from '../../adherent/adherent.service';
import { Adherent } from '../../adherent/adherent';

@Component({
    selector: 'eleve-ajout',
    templateUrl: './eleve-ajout.component.html',
    providers: [AdherentService]

})

export class EleveAjoutComponent implements OnInit {

    public form: FormGroup;
    public adherents: Adherent[];
    public selectedAdherent: Adherent;

    constructor(
        private router: Router,
        private eleveService: EleveService,
        private fb: FormBuilder,
        private adherentService: AdherentService

) {
    }

    public ngOnInit() {
      this.getAdherent();
      this.form = this.fb.group({
            nom: ['', [Validators.required]],
            prenom: ['', Validators.required],
            tel: ['', Validators.required],
            mail: ['', Validators.required],
            remarques: ['', Validators.required],
            dateNaissance: ['', Validators.required],
            adherent: ['', Validators.required]
        });
    }

    public getAdherent(): void {
      this.adherentService.getAdherents().then(
        (adherents) => {
          this.adherents = adherents;
        }
      );
    }

    public back() {
        this.router.navigate(['/eleve']);
    }
    public save() {
      if (this.selectedAdherent != null) {
        this.form.value.adherent = this.selectedAdherent;
      }

      this.eleveService.create(this.form.value).then(
        (res) => {
          this.router.navigate(['/eleve', res.id]);
        }
      );
  }
}

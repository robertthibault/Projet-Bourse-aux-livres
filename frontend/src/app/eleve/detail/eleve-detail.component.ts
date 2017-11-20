import { Component, OnInit } from '@angular/core';
import { Eleve } from '../eleve';
import { Router } from '@angular/router';
import { EleveService } from '../eleve.service';
import { ActivatedRoute } from '@angular/router';
import { AdherentService } from '../../adherent/adherent.service';
import { Adherent } from '../../adherent/adherent';

@Component({
    selector: 'eleve-detail',
    templateUrl: './eleve-detail.component.html',
    providers: [AdherentService]
})

export class EleveDetailComponent implements OnInit {
    public eleve: Eleve;
    public id: number;
    public adherents: Adherent[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private eleveService: EleveService,
        private adherentService: AdherentService,

    ) { }

    public ngOnInit(): void {
        this.id = + this.route.snapshot.params['id'];
        this.getEleve(this.id);
        this.getAdherent();
    }

    public getEleve(id: number): void {
        this.eleveService.getEleve(id)
            .then(
            (eleve) => {
                this.eleve = eleve;
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

    public edit(): void {
    this.router.navigate(['/eleve/modifier', this.eleve.id]);
  }
}

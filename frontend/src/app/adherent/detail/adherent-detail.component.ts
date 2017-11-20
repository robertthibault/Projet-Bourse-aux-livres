import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Adherent } from '../adherent';
import { Router } from '@angular/router';
import { AdherentService } from '../adherent.service';
import { ActivatedRoute } from '@angular/router';
import { EleveService } from '../../eleve/eleve.service';
import { Eleve } from '../../eleve/eleve';

@Component({
    selector: 'adherent-detail',
    templateUrl: './adherent-detail.component.html',
    providers : [EleveService]
})

export class AdherentDetailComponent implements OnInit {
    public adherent: Adherent;
    public id: number;
    public lesElevesDeLAdherent: Eleve[];

  public offset: number = 0;
  public limit: number = 10;

  @ViewChild('actionLink') public actionLink: TemplateRef<any>;
  @ViewChild('table') public table;

  public columns: any[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private adherentService: AdherentService,
        private eleveService: EleveService,

    ) { }

    public ngOnInit(): void {

      this.columns = [
        {name: 'Identifiant', prop: 'id'},
        {name: 'Nom', prop: 'nom'},
        {name: 'Prenom', prop: 'prenom'},
        {
          cellTemplate: this.actionLink,
          name: 'Action'
        },
      ];

      this.id = + this.route.snapshot.params['id'];
      this.getAdherent(this.id);
      this.getElevesByIdAdherent();
    }

    public getAdherent(id: number): void {
        this.adherentService.getAdherent(id)
        .then((adherent) => this.adherent = adherent);
    }

    public getElevesByIdAdherent() {
        this.eleveService.getElevesByIdAdherent(this.id).then(
          (lesEleves) =>
          this.lesElevesDeLAdherent = lesEleves
        );
    }

    public back() {
        this.router.navigate(['/adherent']);
    }

  public show(id: number) {
    this.router.navigate(['/eleve', id]);
  }

  public edit(): void {
        this.router.navigate(['/adherent/modifier', this.adherent.id]);
  }
}

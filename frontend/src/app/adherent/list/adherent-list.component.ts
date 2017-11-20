import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Adherent } from '../adherent';
import { AdherentService } from '../adherent.service';
import { Router } from '@angular/router';
import { isNumeric } from 'rxjs/util/isNumeric';

@Component({
  selector: 'adherents',
  templateUrl: './adherent-list.component.html',
  styleUrls: ['./adherent-list.component.css']
})

export class AdherentListComponent implements OnInit {
  public offset: number = 0;
  public limit: number = 3;

  public adherents: Adherent[];
  public selectedAdherent = [];
  public cache = [];

  @ViewChild('actionLink') public actionLink: TemplateRef<any>;
  @ViewChild('table') public table;

  public columns: any[];

  constructor(private router: Router,
              private adherentService: AdherentService) {
  }

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

    this.getAdherents();
  }

  public getAdherents(): void {
    this.adherentService.getAdherents()
      .then(
        (adherents) => {
          this.adherents = adherents;
          this.cache = adherents;
        });
  }

  public onSelect(selected: String): void {
    // this.selectedAdherent = selected;
  }

  public updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.cache.filter((d) => {

      if (isNumeric(val)) {
        return d.id.indexOf(val) !== -1 || !val;
      } else {
        return d.nom.toLowerCase().indexOf(val) !== -1 || !val;
      }
    });

    // update the rows
    this.adherents = temp;
    // console.log('updateFilter - filtered data', this.adherents );
    this.table.offset = 0 ;

  }

  public edit(id): void {
    this.router.navigate(['/adherent/modifier', id]);
  }

  public cancel(): void {
    this.router.navigate(['/adherent']);

  }
  public show(id): void {
    this.router.navigate(['/adherent', id]);
  }

  public create(): void {
    this.router.navigate(['/adherent/ajout']);
  }
}

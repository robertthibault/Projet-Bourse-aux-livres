import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Eleve } from '../eleve';
import { EleveService } from '../eleve.service';
import { Router } from '@angular/router';
import { isNumeric } from 'rxjs/util/isNumeric';

@Component({
  selector: 'eleves',
  templateUrl: './eleve-list.component.html',
  styleUrls: ['./eleve-list.component.css']
})

export class EleveListComponent implements OnInit {
  public offset: number = 0;
  public limit: number = 10;

  public eleves: Eleve[];
  public cache = [];

  @ViewChild('actionLink') public actionLink: TemplateRef<any>;
  @ViewChild('table') public table;

  public columns: any[];

  constructor(private router: Router,
              private eleveService: EleveService) {
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

    this.getEleves();
  }

  public getEleves(): void {
    this.eleveService.getEleves()
      .then(
        (eleves) => {
          this.eleves = eleves;
          this.cache = eleves;
        });
  }

  public onSelect(selected: String): void {
    // this.selectedEleve = selected;
  }

  public updateFilter(event) {
    const val = event.target.value.toLowerCase();
    console.log('val : ' + val);
    console.log(this.cache );

    // filter our data
    const temp = this.cache.filter((d) => {

      if (isNumeric(val)) {
        return d.id.indexOf(val) !== -1 || !val;
      } else {
        return d.nom.toLowerCase().indexOf(val) !== -1 || !val;
      }
    });

    // update the rows
    this.eleves = temp;
    // console.log('updateFilter - filtered data', this.adherents );
    this.table.offset = 0 ;

  }

  public edit(id): void {
    this.router.navigate(['/eleve/modifier', id]);
  }

  public create(): void {
    this.router.navigate(['/eleve/ajout']);
  }

  public show(id): void {
    console.log('Change');
    this.router.navigate(['/eleve', id]);
  }

}

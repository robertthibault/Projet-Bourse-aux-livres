import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Classe } from '../classe';
import { ClasseService } from '../classe.service';
import { Router } from '@angular/router';
import { isNumeric } from 'rxjs/util/isNumeric';

@Component({
  selector: 'classes',
  templateUrl: 'classe-list.component.html',
  styleUrls: ['classe-list.component.css']
})

export class ClasseListComponent implements OnInit {
  public offset: number = 0;
  public limit: number = 3;

  public classes: Classe[];
  public selectedClasse = [];
  public cache = [];

  @ViewChild('actionLink') public actionLink: TemplateRef<any>;
  @ViewChild('table') public table;

  public columns: any[];

  constructor(private router: Router,
              private classeService: ClasseService) {
  }

  public ngOnInit(): void {
    this.columns = [
      {name: 'Identifiant', prop: 'id'},
      {name: 'Libelle', prop: 'libelle'},
      {
        cellTemplate: this.actionLink,
        name: 'Action'
      },
    ];

    this.getClasses();
  }

  public getClasses(): void {
    this.classeService.getClasses()
      .then(
        (classes) => {
          this.classes = classes;
          this.cache = classes;
        });
  }

  public onSelect(selected: String): void {
    // this.selectedClasse = selected;
  }

  public updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.cache.filter((d) => {

      if (isNumeric(val)) {
        return d.id.indexOf(val) !== -1 || !val;
      } else {
        return d.libelle.toLowerCase().indexOf(val) !== -1 || !val;
      }
    });

    // update the rows
    this.classes = temp;
    // console.log('updateFilter - filtered data', this.classes );
    this.table.offset = 0 ;

  }

  public edit(id): void {
    this.router.navigate(['/classe/modifier', id]);
  }

  public create(): void {
    this.router.navigate(['/classe/ajout']);
  }

  public show(id): void {
    this.router.navigate(['/classe', id]);
  }

}

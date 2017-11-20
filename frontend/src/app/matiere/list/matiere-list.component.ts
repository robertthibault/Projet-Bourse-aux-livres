import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Matiere } from '../matiere';
import { MatiereService } from '../matiere.service';
import { Router } from '@angular/router';
import { isNumeric } from 'rxjs/util/isNumeric';

@Component({
  selector: 'Matiere',
  templateUrl: './matiere-list.component.html',
  styleUrls: ['./matiere-list.component.css']
})

export class MatiereListeComponent implements OnInit {
  public offset: number = 0;
  public limit: number = 5;

  public matieres: Matiere[];
  public selectedMatiere = [];
  public cache = [];

  @ViewChild('actionLink') public actionLink: TemplateRef<any>;

  public columns: any[];

  constructor(private router: Router,
              private MatiereService: MatiereService) {
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

    this.getMatiere();
  }

  public getMatiere(): void {
    this.MatiereService.getMatieres()
      .then(
        (Matieres) => {
          this.matieres = Matieres;
          this.cache = Matieres;
        });
  }

  public onSelect(selected: String): void {
    // this.selectedAdherent = selected;
  }

  public updateFilter(event) {
    const val = event.target.value;

    // filter our data
    const temp = this.cache.filter((d) => {

      if (isNumeric(val)) {
        return d.id.indexOf(val) !== -1 || !val;
      } else {
        return d.nom.toLowerCase().indexOf(val) !== -1 || !val;
      }
    });

    // update the rows
    this.matieres = temp;
    // console.log('updateFilter - filtered data', this.adherents );
  }

  public edit(id): void {
    this.router.navigate(['/matiere/modifier', id]);

  }

  public create(): void {
    this.router.navigate(['/matiere/ajout']);
  }

  public show(id): void {
    this.router.navigate(['/matiere/', id]);
  }

}

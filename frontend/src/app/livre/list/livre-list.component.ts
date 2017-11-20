import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Livre } from '../livre';
import { LivreService } from '../livre.service';
import { Router } from '@angular/router';
import { isNumeric } from 'rxjs/util/isNumeric';

@Component({
  selector: 'livres',
  templateUrl: './livre-list.component.html',
  styleUrls: ['./livre-list.component.css']
})

export class LivreListeComponent implements OnInit {
  public offset: number = 0;
  public limit: number = 5;

  public livres: Livre[];
  public cache = [];

  @ViewChild('actionLink') public actionLink: TemplateRef<any>;

  public columns: any[];

  constructor(private router: Router,
              private livreService: LivreService) {
  }

  public ngOnInit(): void {
    this.columns = [
      {name: 'Identifiant', prop: 'id'},
      {name: 'Libelle', prop: 'reflivre.libelle'},
      {name: 'Etat', prop: 'etat.libelle'},
      {name: 'ISBN', prop: 'reflivre.isbn'},
      {
        cellTemplate: this.actionLink,
        name: 'Action'
      },
    ];

    this.getLivres();
  }

  public getLivres(): void {
    this.livreService.getLivres()
      .then(
        (livres) => {
          this.livres = livres;
          this.cache = livres;
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
    this.livres = temp;
    // console.log('updateFilter - filtered data', this.adherents );
  }

  public edit(id): void {
    this.router.navigate(['/livre/modifier', id]);
  }

  public create(): void {
    this.router.navigate(['/livre/ajout']);
  }

  public show(id): void {
    this.router.navigate(['/livre/', id]);
  }

}

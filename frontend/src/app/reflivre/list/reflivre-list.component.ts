import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { RefLivre } from '../reflivre';
import { RefLivreService } from '../reflivre.service';
import { Router } from '@angular/router';

@Component({
  selector: 'reflivres',
  templateUrl: './reflivre-list.component.html',
  styleUrls: ['./reflivre-list.component.css']
})

export class RefLivreListeComponent implements OnInit {
  public offset: number = 0;
  public limit: number = 5;

  public reflivres: RefLivre[];
  public cache = [];

  @ViewChild('actionLink') public actionLink: TemplateRef<any>;

  public columns: any[];

  constructor(private router: Router,
              private reflivreService: RefLivreService) {
  }

  public ngOnInit(): void {
    this.columns = [
      {name: 'Identifiant', prop: 'id'},
      {name: 'Libelle', prop: 'libelle'},
      {name: 'ISBN', prop: 'isbn'},
      {
        cellTemplate: this.actionLink,
        name: 'Action'
      },
    ];

    this.getLivres();
  }

  public getLivres(): void {
    this.reflivreService.getRefLivres()
      .then(
        (livres) => {
          this.reflivres = livres;
          this.cache = livres;
        });
  }

  public edit(id): void {
    this.router.navigate(['/reflivre/modifier', id]);
  }

  public create(): void {
    this.router.navigate(['/reflivre/ajout']);
  }

  public show(id): void {
    this.router.navigate(['/reflivre/', id]);
  }

}

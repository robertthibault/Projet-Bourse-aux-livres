import { Component, OnInit } from '@angular/core';
import { RefLivre } from '../reflivre';
import { Router } from '@angular/router';
import { RefLivreService } from '../reflivre.service';
import { ActivatedRoute } from '@angular/router';
import { Etat } from '../Etat'
import { RefPrixLivreService } from '../refprixlivre.service'
import { RefPrixLivre } from '../refprixlivre'

@Component({
  selector: 'livre-detail',
  templateUrl: 'reflivre-detail.component.html'
  providers: [EtatService, RefPrixLivreService]

})

export class RefLivreDetailComponent implements OnInit {
  public reflivre: RefLivre;
  public id: number;
  public etats: any[]; // Liste des différents état : A REFACTO depuis le service
  public refpxlvr: RefPrixLivre[]; // Liste des prix

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private refLivreService: RefLivreService
  ) { }

  public ngOnInit(): void {
    this.id = + this.route.snapshot.params['id'];
    this.getRefLivre(this.id);

    this.etatService.getEtats()
      .then(
        (etats) => {
          this.etats = etats;
  });
  this.refpxlvrService.getPrixSelonLivreEtat(this.id)
    .then(
      (prix) => {
        this.refpxlvr = prix;
      });
}

  public getRefLivre(id: number): void {
    this.refLivreService.getRefLivre(id)
      .then(
        (reflivre) => {
          this.reflivre = reflivre;
        });
  }

  // Récupération des informations une fois le livre sélectionné sélectionné pour les étapes suivantes
   public onRowSelect(event) {
     // Récupération de la liste des prix
     this.refpxlvrService.getPrixSelonLivreEtat(this.selectLivre.id, this.selectEtat.id)
     .then(
     (prix) => {
       this.refpxlvr = prix;
     });
   }

  public back() {
    this.router.navigate(['/reflivre']);
  }
}

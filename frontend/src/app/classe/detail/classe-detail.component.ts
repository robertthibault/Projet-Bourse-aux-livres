import { Component, OnInit } from '@angular/core';
import { Classe } from '../classe';
import { Router } from '@angular/router';
import { ClasseService } from '../classe.service';
import { ActivatedRoute } from '@angular/router';
import { RefLivreService } from '../../reflivre/reflivre.service';
import { RefLivre } from '../../reflivre/reflivre';

@Component({
    selector: 'classe-detail',
    templateUrl: 'classe-detail.component.html',
    providers: [RefLivreService]
})

export class ClasseDetailComponent implements OnInit {
    public classe: Classe;
    public id: number;
    public availableLivres: RefLivre[];
    public selectedLivres: RefLivre[];
    public listeDeLivresInitiale: RefLivre[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private classeService: ClasseService,
        private refLivreService: RefLivreService,
    ) { }

    public ngOnInit(): void {

        this.selectedLivres = [];
        this.availableLivres = [];
        this.id = + this.route.snapshot.params['id'];
        this.getClasse(this.id);
        this.refLivreService.getLivresClasse(this.id).then(
          (livres) =>  {
          this.listeDeLivresInitiale = [];
          this.selectedLivres = [];
          for (let livre of livres)
          {
            this.listeDeLivresInitiale.push(livre);
            this.selectedLivres.push(livre);
          }
        }
      );
        this.getLaListeDesLivres();
    }

    public getClasse(id: number): void {
        this.classeService.getClasse(id)
            .then(
            (classe) => {
                this.classe = classe;
            });
    }

    public getLaListeDesLivres() {
      this.refLivreService.getRefLivres().then(
        (livres) => {
          for (let livre of livres){
            if (!(this.selectedLivres.filter((ref) => ref.id === livre.id).length !== 0 )) {
              this.availableLivres.push(livre);
            }
          }
          // this.availableLivres = livres
        }) ;
    }

    public back() {
        this.router.navigate(['/classe']);
    }

    public edit(): void {
        this.router.navigate(['/classe/modifier', this.classe.id]);
    }
    public save(): void {
        for (let reflivre of this.selectedLivres){
          let existeDeja: Boolean;
          for (let ref of this.listeDeLivresInitiale){
            if (ref.id === reflivre.id) {
              existeDeja = true;
            }
          }
          if (!existeDeja) {
            console.log('ca existe pas');
            this.classeService.ajoutRefLivre(reflivre.id, this.id);
          }
        }
        for (let reflivre of this.listeDeLivresInitiale){
          let existeDeja: Boolean;
          for (let ref of this.selectedLivres){
            if (ref.id === reflivre.id) {
              existeDeja = true;
            }
          }
          if (!existeDeja) {
            console.log('ca existe pas');
            this.classeService.supprRefLivre(reflivre.id, this.id);
          }
        }
        this.listeDeLivresInitiale = this.selectedLivres;
    }
}

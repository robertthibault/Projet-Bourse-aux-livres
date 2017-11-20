import { Component, OnInit } from '@angular/core';
import { PanelModule, DropdownModule } from 'primeng/primeng';
import { Livre, LivreService } from '../livre';
import { Eleve, EleveService } from '../eleve';
import { RefLivre, RefLivreService } from '../reflivre';
import { Classe, ClasseService } from '../classe';
import { Etat, EtatService } from '../etat';

@Component({
  selector: 'commande',
  templateUrl: 'commande.component.html',
    providers:  [EtatService, LivreService]
})

export class CommandeComponent implements OnInit {

  public selectEleve: Eleve; // Eleve sélectionné
  public eleves: Eleve[] ; // Listes des élèves sélectionnables
  public selectLivre: Livre; // Livre sélectionné
  public livresRendre: Livre[]; // Liste des livres à rendre par un élève sélectionné
  public livresDispos: Livre[]; // liste des livres disponibles
  public livresClasse: RefLivre[] ; // Liste des livres pour la nouvelle classe de l'élève sélectionné
  public classeElv: Classe; // La classe courante de l'élève sélectionné (MAJ après panel)
  public selectedClasse: Classe; // Classe sélectionnée dans le dropdown
  public listeClasses: any[]; // Liste de toutes les classes existantes
  public livresSelec: any[] ; // Liste des livres disponibles
  public etats: any[]; // Liste des différents état : A REFACTO depuis le service

  constructor(  private livreService: LivreService,
                private eleveService: EleveService,
                private etatService: EtatService,
                private refLivreService: RefLivreService,
                private classeService: ClasseService
  ) {
  }

  public ngOnInit(): void {
    this.etatService.getEtats()
      .then(
        (etats) => {
          this.etats = this.convertToLabelValue(etats, 'libelle', 'libelle');
    });
    this.eleveService.getEleves()
      .then(
        (eleves) => {
          this.eleves = eleves;
        });
  }

    // Récupération des informations une fois l'élève sélectionné pour les étapes suivantes
    public onRowSelect(event) {
        // Récupération des livres à rendre
        this.livreService.getLivresEleveRachat(String(this.selectEleve.id), false)
        .then(
        (livres) => {
          this.livresRendre = livres;
        });
        // Récupération de la liste des classes (pour passage)
        this.classeService.getClasses()
        .then(
        (classes) => {
          this.listeClasses = this.convertToLabelValue(classes, 'libelle', 'id');
        });
        // Récupération de la classe courante de l'élève
        this.classeService.getClasseCouranteEleve(this.selectEleve.id)
        .then(
        (clsElv) => {
          this.classeElv = clsElv;
        });
        // Récupération des livres en stock : true = livres en stock
        this.livreService.getLivresStock(true)
        .then(
        (livres) => {
          this.livresDispos = livres;
        });
      }

      public changeClasse(newClass: Classe) {
        this.eleveService.ajoutClasse(this.selectEleve.id, newClass.id)
        .then(
          (eleve) => {
            this.selectEleve = eleve;
            this.classeElv = newClass;
            // Récupération de la liste des livres selon la classe de l'élève
            this.refLivreService.getLivresClasse(this.classeElv.id)
            .then(
            (rlvCls) => {
              this.livresSelec = [];
              // Parcours des références de livres de la classe associée
              for (let rlv of rlvCls) {
                let lvrSelec: any = {} ;
                lvrSelec.reflivre = rlv;
                lvrSelec.livres = [];
                // Recherche des livres dispos de la référence
                for (let lvr of this.livresDispos){
                  if (lvr.reflivre.id === rlv.id) {
                    lvrSelec.livres.push(lvr);
                  }
                }
                lvrSelec.lvrEta = [];
                lvrSelec.lvrEta = this.convertToLabelValue(lvrSelec.livres, 'etat.libelle', 'id');
                this.livresSelec.push(lvrSelec);
              }
            });
          }
        );
      }

      /*
        Fonction ajouter la date actuelle à laquelle un livre a été rendu
      */
      public DateRachat(idlivre) {
        // this.router.navigate([LivreService, eleve, livre, rachat]);
        // Donner l'id du livre pour un élève
        this.livreService.setLivresEleveRachat(String(this.selectEleve.id), idlivre, true);
        // this.livreServive.setHistoriqueEtat(this.selectLivre.id, this.selectLivre.etat);
      }

      /*
        Fonction de transformation d'un tableau d'entités en tableau de type :
        { label, value }
        Prend en entrée les attributs à transformer et le tableau d'entités
      */
      public convertToLabelValue(toLV: any[], label: string, value: string) {
        let toDD: Array<{label: any, value: any}> = [];
        for (let item of toLV){
          toDD.push({value: this.getItemValue(item, value), label: this.getItemValue(item, label)});
        }
        return toDD;
      }

      /*
        Fonction de détection récursive d'une sous-entité
        si value = ent1.ent2.attr alors la fonction renverra item.ent1.ent2.attr
      */
      public getItemValue(item: any, value: string) {
        let splited: string[] = value.split('.');
        let itemValue: string;
        if (splited.length >= 2) {
          itemValue = this.getItemValue(item[splited.shift()], splited.join('.'));
        } else {
          itemValue = item[value];
        }
        return itemValue;
      }

      /*
        Fonction enlevant les états supérieur à un livre
      public etatinferieurEtEgale(){
        if (etats == 'Très bon'){
          etats = ['Très bon', 'Bon', 'Moyen'];
        }
        else if(etats == bon){
          etats = ['Bon', 'Moyen'];
        }
        else {
          etats = ['Moyen'];
        }
      }
      */
}

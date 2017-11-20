import { Etat } from '../etat/etat';
import { RefLivre } from '../reflivre/reflivre';

export class RefPrixLivre{
      public id: number;
      public reflivre: RefLivre;
      public etat: Etat;
      public prixvente: number;
      public prixrachat: number ;
      public annee: number;
}

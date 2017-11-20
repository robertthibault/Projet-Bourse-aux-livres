import { Etat } from '../etat/etat';
import { RefLivre } from '../reflivre/reflivre';

export class Livre {
    public id: number;
    public reflivre: RefLivre;
    public etat: Etat;
}

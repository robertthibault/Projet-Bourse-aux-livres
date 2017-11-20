import { Editeur } from '../editeur/editeur';
import { Matiere } from '../matiere/matiere';

export class RefLivre {
    public id: number;
    public libelle: String;
    public auteur: String;
    public editeur: Editeur;
    public matiere: Matiere;
    public isbn: number;
}

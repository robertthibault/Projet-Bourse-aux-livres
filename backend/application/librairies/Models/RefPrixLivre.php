<?php
namespace Models;

class RefPrixLivre extends \BALDB\RestCrud\ModelCRUD {

    public static $_COLUMN_MAPPING = array (
        'id_rpl'              =>  'id',
        'id_eta'              =>  'fk_etat',
        'id_rlv'              =>  'fk_reflivre',
        'prix_rpl_v'            =>  'prixvente',
        'prix_rpl_r'            =>  'prixrachat',
        'annee_rpl'           =>  'annee'
    );

    public $_tableName = 'ref_prix_livre_rpl';

    /*
        Fonction de traitement des requêtes filtrées
    */
    public function getSQLRequest($filters){
        $sqlBody = '';
        if (isset($filters['idLivre'])){
            $sqlBody = $this->getPrixSelonLivreEtat($filters['idLivre']);
        }
        return $sqlBody;
    }

    /*
        Renvoie la liste des prix des livres selon le livre et l'état
    */
    public function getPrixSelonLivreEtat($livre){
        return "
            SELECT rpl.id_rpl, rpl.id_eta, rpl.id_rlv, rpl.prix_rpl_v, rpl.prix_rpl_r FROM ref_prix_livre_rpl AS rpl
            WHERE rpl.id_rlv = ".$livre.";
        ";
    }

}

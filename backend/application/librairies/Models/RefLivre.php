<?php
namespace Models;

class RefLivre extends \BALDB\RestCrud\ModelCRUD {

    public static $_COLUMN_MAPPING = array (
        'id_rlv'              =>  'id',
        'libelle_rlv'         =>  'libelle',
        'auteur_rlv'          =>  'auteur',
        'id_mat'              =>  'fk_matiere',
        'isbn_rlv'            =>  'isbn',
        'id_edt'              =>  'fk_editeur'
    );

    public $_tableName = 'ref_livre_rlv';

    /*
        Fonction de traitement des requêtes filtrées
    */
    public function getSQLRequest($filters){
        $sqlBody = '';
        if (isset($filters['classe'])){
            $sqlBody = $this->getLivresByClasse($filters['classe']);
        }
        return $sqlBody;
    }

    // Filtre sur l'id adhérent - requête spécifique
    public function getLivresByClasse($idCls){
        return 'Select * 
        FROM '.$this->_tableName.' AS rlv
        JOIN rel_cls_rlv_rcr AS rcr ON rlv.`id_rlv` = rcr.id_rlv
        WHERE id_cls = '.$idCls.';';
    }
}
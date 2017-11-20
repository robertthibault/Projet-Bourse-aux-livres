<?php
namespace Models;

class Reglement extends \BALDB\RestCrud\ModelCRUD {

    public static $_COLUMN_MAPPING = array (
        'id_rgl'              =>  'id',
        'libelle_rgl'              =>  'libelle'
    );

    public $_tableName = 'reglement_rgl';

    /*
        Fonction de traitement des requêtes filtrées
    */
    public function getSQLRequest($filters){
        $sqlBody = '';
        return $sqlBody;
    }
}
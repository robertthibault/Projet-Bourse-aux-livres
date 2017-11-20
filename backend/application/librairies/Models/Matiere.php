<?php
namespace Models;

class Matiere extends \BALDB\RestCrud\ModelCRUD {

    public static $_COLUMN_MAPPING = array (
        'id_mat'              =>  'id',
        'libelle_mat'         =>  'libelle',
    );

    public $_tableName = 'matiere_mat';

    /*
        Fonction de traitement des requêtes filtrées
    */
    public function getSQLRequest($filters){
        $sqlBody = array();
        return $sqlBody;
    }
}
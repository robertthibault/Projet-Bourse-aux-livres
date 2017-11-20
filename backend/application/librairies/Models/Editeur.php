<?php
namespace Models;

class Editeur extends \BALDB\RestCrud\ModelCRUD {

    public static $_COLUMN_MAPPING = array (
        'id_edt'                =>  'id',
        'nom_edt'               =>  'nom'
    );

    public $_tableName = 'editeur_edt';
    
    /*
        Fonction de traitement des requêtes filtrées
    */
    public function getSQLRequest($filters){
        $sqlBody = '';
        return $sqlBody;
    }
}
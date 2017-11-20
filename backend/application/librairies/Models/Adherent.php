<?php
namespace Models;

class Adherent extends \BALDB\RestCrud\ModelCRUD {

    public static $_COLUMN_MAPPING = array (
        'id_adh'                =>  'id',
        'nom_adh'               =>  'nom',
        'prenom_adh'            =>  'prenom',
        'mail_adh'              =>  'mail',
        'tel_adh'               =>  'tel',
        'tel2_adh'              =>  'tel2',
        'adresse_adh'           =>  'adresse',
        'codePostal_adh'        =>  'codePostal',
        'ville_adh'             =>  'ville',
        'conseil_adh'           =>  'conseil',
        'comite_adh'            =>  'comite'
    );

    public $_tableName = 'adherent_adh';

    /*
        Fonction de traitement des requêtes filtrées
    */
    public function getSQLRequest($filters){
        $sqlBody = '';
        return $sqlBody;
    }

}
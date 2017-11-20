<?php
namespace Models;

class Etat extends \BALDB\RestCrud\ModelCRUD {

    public static $_COLUMN_MAPPING = array (
        'id_eta'                =>  'id',
        'libelle_eta'           =>  'libelle'
    ); 

    public $_tableName = 'etat_eta';
    
    /*
        Fonction de traitement des requêtes filtrées
    */
    public function getSQLRequest($filters){
        $sqlBody = '';
        // EXEMPLE
        // if (isset($params['age'])){
        //     $sqlBody = $this->getAdherentSelonAge($params['age']);
        // }
        return $sqlBody;
    }

    // EXEMPLE
    // public function getAdherentSelonAge($age){
    //     return 'Select *
    //     From '.$this->_tableName.' 
    //     where age = '.$age.';';
    // }
}
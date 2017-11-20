<?php
namespace Models;

class Eleve extends \BALDB\RestCrud\ModelCRUD {

    public static $_COLUMN_MAPPING = array (
        'id_elv'                =>  'id',
        'nom_elv'               =>  'nom',
        'prenom_elv'            =>  'prenom',
        'mail_elv'              =>  'mail',
        'tel_elv'               =>  'tel',
        'adresse_elv'           =>  'adresse',
        'remarque_elv'          =>  'remarques',
        'datenaissance_elv'     =>  'dateNaissance',
        'id_adh'                =>  'fk_adherent'
    );

    public $_tableName = 'eleve_elv';
    
    /*
        Fonction de traitement des requêtes filtrées
    */
    public function getSQLRequest($filters){
        $sqlBody = '';
        if (isset($filters['adherent'])){
            $sqlBody = $this->getElevesByIdAdherent($filters['adherent']);
        }
        return $sqlBody;
    }

    // Filtre sur l'id adhérent - requête spécifique
    public function getElevesByIdAdherent($id){
        return 'Select * 
        From '.$this->_tableName.' 
        where id_adh = '.$id.';';
    }

    public function create($params){
        if(isset($params['id']) && isset($params['classe'])){
            $pdo = \Wrappers\AppGlobals::getDb();
            $sqlBody = 'INSERT INTO rel_elv_cls_rec ( id_cls, id_elv, annee_rec ) VALUES ('
            .$params['classe'].', '.$params['id'].', YEAR(NOW()));';
            $pdo->query($sqlBody);
            // Recup element ajouté
            $rows = $pdo->query("SELECT * FROM ".$this->_tableName." WHERE ".$this->getBDDId().'='.$params['id'].';')->fetch();
            return $rows;
        }
        else{
            return parent::create($params);
        }
	}
}
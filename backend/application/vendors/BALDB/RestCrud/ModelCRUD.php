<?php 

namespace BALDB\RestCrud;

/**
* Abstract class a implémenter pour les Models paginables exposés via RestCrud\Webservice
* CONTRAINTES DE FONCTIONNEMENT :
*   - L'id du column mapping doit être nommé 'id'
*   - Les clés étrangères doivent être définies comme suit : 'fk_nomTable'
*   - La fonction getSQLRequest doit être surchargée pour toute récupération filtrée
*   - ...
 */
abstract class ModelCRUD implements \BALDB\RestCrud\iPaginableCRUD
{	

    protected $_colMap;
    
    function __construct(){
        $this->_colMap = static::$_COLUMN_MAPPING;
    }

    /*
        Fonction générique de création d'entité
        --> Analyse les paramètres pour réaliser une insertion
        REST : Verbe POST
    */
	public function create($params){
        //on récupère tous les paramètres correspondant à un champs en BDD
        $values = $this->unMapParamsToCreate($params);
            
        //on créé un tableau qui prend comme clé les colonnes de la BDD
        $cons = array();
        foreach($values as $field => $value) {
            $cons[array_search($field,$this->getColumnMapping())] = $value;
        }
        
        // Composition de la requete
        $sqlBody  = "INSERT INTO ".$this->_tableName." ( ";
        $sqlBody .= implode(", ", array_keys($cons));
        $sqlBody .= " ) VALUES ( '";
        $sqlBody .= implode("', '", $values) . "')";
                
        //Récupération de la base de données
        $pdo = \Wrappers\AppGlobals::getDb();
            
        // Insertion
        $pdo->query($sqlBody);           

        // Recup element ajouté
        $rows = $pdo->query("SELECT * FROM ".$this->_tableName." WHERE ".$this->getBDDId()."=(SELECT LAST_INSERT_ID() AS id)")->fetch();
        return $rows;
	}
	
    /*
        Fonction générique de mise à jour d'entité
        --> Analyse les paramètres pour réaliser une modification
        REST : Verbe PATCH
    */
    public function update($id, $params){

        $values = $this->unMapParamsToCreate($params);
        $cons = array();
        $sqlSet= ' SET ';
        //Création d'un tableau qui prend comme clé les colonnes de la BDD
        $i = 0;
        $len = count($values);
        foreach($values as $field => $value) {
            $cons[array_search($field,$this->getColumnMapping())] = $value;
            $sqlSet .= array_search($field,$this->getColumnMapping()).'=\''.$value.'\' ';
            if ($i !== $len-1) {
                $sqlSet .=',';
            }
            $i++;
        }
           
        $sqlBody  = "UPDATE ".$this->_tableName.$sqlSet;
        $sqlBody .= 'WHERE '.$this->getBDDId().'='.$id.';';

		//Récupération de la base de données
		$pdo = \Wrappers\AppGlobals::getDb();
		
		// Execution
        $pdo->query($sqlBody);

		// Recup element ajouté
        $rows = $pdo->query("SELECT * FROM ".$this->_tableName." WHERE ".$this->getBDDId()."=".$id.";")->fetch();
        return $rows;
    }

    /*
        Fonction génértique de suppression d'une entité
        REST : Verbe DELETE
    */
    public function remove($id){
        // Récupération de la base de données
		$pdo = \Wrappers\AppGlobals::getDb();
	
		$rows = $pdo->query("SELECT * FROM ".$this->_tableName." where ".$this->getBDDId().' = '. $id)->fetch();
	
		$sqlBody = "DELETE FROM ".$this->_tableName." WHERE ".$this->getBDDId().' = ' . $id;
		
		// Execution
        $pdo->query($sqlBody);
		
		return $rows;
    }

    public function getAll(){
        return 'SELECT * from '.$this->_tableName.';';
    }

    public function getById($id){
        return 'SELECT * from '.$this->_tableName.' 
        WHERE '.$this->getBDDId().'='.$id.';';
    }

    /*
        Fonction génértique de récupération d'entités
        REST : Verbe GET
    */
    public function getDataSet($filters = null, $sort = null, $perPage = null, $page = null){
        // Retrait du paramètre 'table' prit comme filtre 
        unset($filters['table']);
        // S'il n'y a pas d'autres paramètres que l'id : renvoi GET par défaut
        if (isset($filters['id']) && sizeof($filters) == 1){
            $sqlBody = $this->getById($filters['id']);
        }
        // S'il n'y a pas d'autres paramètres que la table : renvoi GET par défaut
        else if ($filters == null){
            $sqlBody = $this->getAll();
        }
        // S'il y a plus de paramètres, la fonction getSQLRequest prend la main
        else{
            $sqlBody = $this->getSQLRequest($filters); 
        }

        //Récupération de la base de données
		$pdo = \Wrappers\AppGlobals::getDb();
        // Execution
        return $pdo->query($sqlBody)->fetchAll();
    }

	public function getNbItems($filters){}

    /* Récupère tous les paramètres et les map avec la BDD*/
    protected function unMapParamsToCreate($params){
        $values = array();
        $colMap = $this->getColumnMapping();
        foreach($colMap as $field) {
            if (isset($params[$field])){
                $values[$field]= $params[$field];
            }
        }
        return $values;
    }

    /*
        Retourne le libelle id de la table en base de données
    */
    public function getBDDId(){
        return array_search('id', $this->getColumnMapping());
    }

    /*
        Accesseur en lecture du column mapping
    */
    public function getColumnMapping(){
        return $this->_colMap; 
    }
}
<?php
namespace Webservice;

/**
 * Classe qui permet d'exposer n'importe quelle table via une API Rest
 */
class BALWS extends \BALDB\Webservice\AbstractWS
{	
	 protected $_modelPATH;
	/**
	* Constructeur
	*/
	public function __construct()
	{			
		$params = $this->getParameters();
		$this->_modelPATH = '\\Models\\' .ucfirst($params['table']); 

		if (!file_exists(realpath('../application/librairies/Models/'.ucfirst($params['table']).'.php'))) {
			throw new \Exception('Nom de table invalide ou le fichier d\'accès à la table n\'est pas créé.');
		}
		
		//Instanciation du modèle
		$this->_model = new $this->_modelPATH();

		// Instanciation du logger		
		$logger = new \BALDB\Loggers\FileLogger(
			APP_ROOT . '/logs/logs.txt', 
			\BALDB\Loggers\abstractLogger::N_DEBUG
		);

		// D�finition des m�thodes valides
		$validMethods = array(
			self::METHOD_GET,
			self::METHOD_POST,
			self::METHOD_PATCH,
			self::METHOD_DELETE
		);
	
		// Appel du constructeur parent
		parent::__construct($logger, $validMethods);		
	}
	
	/**
	* Interfaçage GET
	*/
	protected function WSGet($rawParams) 
	{	
		//Récupération datas BDD
		$result = $this->_model->getDataSet($rawParams);

		// retour résultat sous forme de tableau
		return $this->unMapBDDResults($result);
	}

/**
	* Interfaçage POST
	*/
	protected function WSPost($rawParams) 
	{	
		$result = $this->_model->create($rawParams);
		return $this->unMapBDDOneResult($result);
	}

	/**
	* Interfaçage UPDATE
	*/
	protected function WSPatch($rawParams) 
	{	
		$id = $this->extractParameter('id',$rawParams);
		$result = $this->_model->update($id, $rawParams);
		return $this->unMapBDDOneResult($result);
	}

	/**
	* Interfaçage REMOVE
	*/
	protected function WSDelete($rawParams) 
	{	
		$id = $this->extractParameter('id',$rawParams);
		$result = $this->_model->remove($id);
		return $this->unMapBDDOneResult($result);
	}

	

	public function getParameters(){
		return parent::getParameters();
	}

	
	/**
	* Extrait un item d'un tableau
	*/	
	private function extractParameter($paramName,&$params)
	{
		// Récup de l'id
		$paramExists = isset($params['id']);
		$paramValue = $paramExists ? $params['id'] : null;
		if ($paramExists) unset($params[$paramName]);
		
		return $paramValue;		
	}
	
    	/**
	* Converti une colonne exposee par l'API en colonne BDD
	*/	
	protected function mapAPIToBDD($paramName) {		
		return $this->_argMap[$paramName];	
	}
	
	/**
	* Converti une colonne BDD en colonne exposee par l'API
	*/
	protected function mapBDDToAPI($fieldName) {
        $_colMap = $this->_model->getColumnMapping();
        return isset($_colMap[$fieldName]) ? $_colMap[$fieldName] : $fieldName ;
	}

    /**
	* Maping inverse des resultats BDD selon le mapping du projet
	*/
	protected function unMapBDDResults($rows) {
		$newRows = array();
		foreach ($rows as $pos => $row) {
			$newRows[$pos] = $this->unMapBDDOneResult($row);
		}
		return $newRows;
    }

	/*
		Récupère la sous-entité et stocke temporairement son modèle
	*/
	protected function getSubEntity($table, $id){
		$modelString = '\\Models\\'.$table;
		$subModel = new $modelString;
		// Stock temporaire du modèle initial
		$tmpModel = $this->_model;
		$this->_model = $subModel;
		// Récupération de la BDD
		$pdo = \Wrappers\AppGlobals::getDb();
		// Requêtage et unMap de l'entité récupérée'
		$subEntity = $this->unMapBDDOneResult($pdo->query($subModel->getById($id))->fetch());

		// Récupération de l'ancien modèle'
		$this->_model= $tmpModel;
		return $subEntity;
	}
	
	protected function unMapBDDOneResult($rows) {
		$newRow = array();
		if (! empty($rows)) {
			foreach ($rows as $field => $value) {
				// Récupération des sous-entités si l'on détecte une foreign key
				if(strpos($this->mapBDDToAPI($field), 'fk') !== false){
					$tableName = str_replace('fk_','',$this->mapBDDToAPI($field));
					if (isset($value)){
						//Récupération du nom de la table par suppression du prefixe
						$newRow[$tableName] = $this->getSubEntity($tableName, $value);
					}
					else{
						// Sinon, instanciation a null
						$newRow[$tableName] = $value;
					}
				}
				// Sinon ajout classique du mapping <-> value
				else{
					$newRow[$this->mapBDDToAPI($field)] = $value;
				}
			}
		}
		return $newRow;
	}
}

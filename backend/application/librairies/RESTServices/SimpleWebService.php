<?php
namespace RESTServices;

/**
 * Classe qui permet d'exposer n'importe quelle table via une API Rest
 */
class SimpleWebService extends \BALDB\RestCrud\WebService
{
	/**
	* Constructeur
	*/
	public function __construct($tableName, $tableIdField, $columnsMaping) {
				
		// Enregistrement du mapping de colonnes
		$this->_colMap = $columnsMaping;
		
		// R�cup�ration de la connexion a la bdd
		$pdo = \Wrappers\AppGlobals::getDb();
		
		// Instanciation d'un mod�le qui impl�mente IPaginableModel
		$model = new \Models\SimpleSingleTable($tableName, $tableIdField, $pdo);
		
		// R�cup�ration du logger de l'application
		$logger = \Wrappers\AppGlobals::getLogger();		
		
		// Appel du constructeur parent
		parent::__construct($model, $logger);
	}
}

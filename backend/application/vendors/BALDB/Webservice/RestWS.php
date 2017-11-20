<?php
namespace BALDB\Webservice;

/**
 * Webservice qui permet 
 * - l'exposition via une API REST d'un model BDD qui implemente iPaginableModel
 * - la gestion de la pagination 
 * - le controle des arguments en entr�e de l'api 
 * - la gestion d'un mapping model->api et api->model
 */
abstract class RestWS extends \BALDB\Webservice\AbstractWS
{
    //--------------------------------
    // CONSTANTES & VARIABLES
    //--------------------------------	
		
	// Mapping des colonnes retour MODEL -> r�ponse API
	protected $_modelMap = array();

	// Mapping des colonnes arguments API -> arguments MODEL
	protected $_argMap = array();
	
	// Model iPaginableModel
	private $_model;
	
    //-------------------------------
    // CONSTRUCTEUR
    //-------------------------------

    /**
     * Constructeur
     */
    public function __construct(
		\BALDB\Models\iPaginableModel $model, 
		\BALDB\Loggers\iLogger $logger,
		$argMap = array(),
		$modelMap = array(),
		\BALDB\Authentication\iAuthenticator $auth = null
		)
    {
        // Enregistre les parametres
        $this->_model = $model;
		$this->_argMap = $argMap;
		$this->_modelMap = $modelMap;
		
		// Compose la liste des methodes HTTP valides
		 $validMethods = array(
			AbstractWS::METHOD_GET,
			AbstractWS::METHOD_POST,
			AbstractWS::METHOD_PATCH,
			AbstractWS::METHOD_DELETE
		 );
		
		// Appel le constructeur parent		
		parent::__construct($logger, $validMethods, $auth);
    }	


    //--------------------------------
    // INTERFACAGE METHODE HTML (depuis AbstractWS)
    //--------------------------------
	
	/**
	* Point d'entr�e methode GET
	*/
	protected function WSGet($rawParams)
	{
		// R�cup de l'id
		$id = $this->extractParameter('id',$rawParams);
		
		// Appel la fonction selon la pr�sence de l'id
		if (!is_null($id)) {
			return $this->APIGetOne($id);
		} else {						
			return $this->APIGetDataSet($rawParams);
		}
	} 
	
	/**
	* Point d'entr�e methode POST
	*/	
	protected function WSPost($rawParams)
	{
		return $this->APICreate($rawParams);	
	}
	
	/**
	* Point d'entr�e methode PATCH
	*/		
	protected function WSPatch($rawParams)
	{	
		// V�rifie la pr�sence de l'id
		$this->checkRequieredParameter('id',$rawParams);
		$id = $this->extractParameter('id',$rawParams);

		// Execute la fonction
		return $this->APIUpdate($id, $rawParams);
	}
	
	/**
	* Point d'entr�e methode DELETE
	*/			
	protected function WSDelete($rawParams)
	{
		// V�rifie la pr�sence de l'id
		$this->checkRequieredParameter('id',$rawParams);
		$id = $this->extractParameter('id',$rawParams);	

		// Execute la fonction
		return $this->APIDelete($id);
	}	
	
	/**
	* V�rifie la pr�sence d'un param�tre requis
	*/
	private function checkRequieredParameter($paramName,$params)
	{
		// V�rifie la pr�sence du param�tre
		if (!isset($params[$paramName])){
			$message = "Param�tre $paramName manquant";
			throw new \Exception($message, ReturnCodes::MISSING_PARAMETERS);
		}		
	}
	
	/**
	* Extrait un item d'un tableau
	*/	
	private function extractParameter($paramName,&$params)
	{
		// R�cup de l'id
		$paramExists = isset($params['id']);
		$paramValue = $paramExists ? $params['id'] : null;
		if ($paramExists) unset($params[$paramName]);
		
		return $paramValue;		
	}
	
	
    //-------------------------------
    // INTERFACAGE AVEC LE MODEL
    //-------------------------------

    /**
     * Recupere un element
     */
    protected function APIGetOne($id)
    {
		// Delegation de contrele
		$this->beforeGetById($id);
		
		// Obtiens un element
		$item = $this->_model->getById($id);
		$item = $this->unMapBDDResults(array($item));
		$item = $item[0];
		
		// Compose et retourne la reponse OK
		return $item;      
    }	
	
    /**
     * Recupere un ensemble d'elements
     */
    protected function APIGetDataSet(array $rawParams)
    {		
		// Mapping des parametres
		$params = $this->mapParameters($rawParams, true);			
		
        // Determine les filtres, tri et pagination
        $filters = $this->prepareFilters($params);
        $sort    = $this->prepareSort($params);
        $perPage = isset($params['perPage']) ? $params['perPage'] : null;
        $page    = isset($params['page']) ? $params['page'] : null;

        // Recup des infos de pagination
        $pagination = $this->getPaginInfos($filters, $perPage, $page);

		// Delegation de contrôle
		$this->beforeGetDataSet($params);
		
        // Recup des enregistrements
        $dataSet = $this->_model->getDataSet($filters, $sort, $perPage, $pagination['currPage']);
		$dataSet = $this->unMapBDDResults($dataSet);

		// Pour l'affichage des filters et sort dans la repose, on utilise les $rawParams
		$unMapFilters = $this->prepareFilters($rawParams);
		$unMapSort    = $this->prepareSort($rawParams);
		
        // Retour resultat
        return array(
            'dataSet'  => $dataSet,
            'filters' => $unMapFilters,
            'sort'    => $unMapSort,
            'pagin'   => $pagination,
        );				  
    }

    /**
     * Cree un element
     */
    protected function APICreate($rawParams)
    {
		// Mapping des parametres
		$params = $this->mapParameters($rawParams, false);		
		
		// Delegation de contrele
		$this->beforeCreate($params);		
		
        // Ajout de l'item
        $id = $this->_model->add($params);	
		
		// Compose et retourne la reponse OK (avec l'id)
		return array('id' => $id);
    }

    /**
     * Modifie un element
     */
    protected function APIUpdate($id, $rawParams)
    {		
		// Mapping des parametres
		$params = $this->mapParameters($params, true);			

		// Delegation de controle des parametres
		$this->beforeUpdate($id, $params);
		
        // Ajout de l'item
        $this->_model->update($id, $params);		
		
		// Compose et retourne la reponse OK
		return array();
    }

    /**
     * Supprime un element
     */
    protected function APIDelete($id)
    {
		// Delegation de contrele
		$this->beforeRemove($id);
		
        // Suppression
        $this->_model->remove($id);
		
		// Compose et retourne la reponse OK
		return array();		
    }
	
	
    //-------------------------------
    // DELEGATION DE CONTROLE 
    //-------------------------------	
			
    // Une seule de ces fonctions est execut�e a chaque 'serve'
	protected function beforeCreate(&$params){}
	protected function beforeGetById(&$id){}
	protected function beforeGetDataSet(&$params){}
	protected function beforeUpdate(&$id, &$params){}
	protected function beforeRemove(&$id){}
	
	
    //-------------------------------
    // PREPARATION DES ARGUMENTS
    //-------------------------------

    /**
     * Prepare le parametre filters
     */
    private function prepareFilters($params)
    {		
        // Preparation du filtre
        $filters = array();
		
		// On prend tous les champs a l'exception de sort perPage et page
		$excluded = array('sort','perPage','page');
		foreach($params as $paramName => $paramValue) {
			if (!in_array($paramName, $excluded)){
				$filters[$paramName] = $paramValue;
			}
		}      

        // Aucun element, le filtre est null
        if (count($filters) == 0) {
            $filters = null;
        }

        // Retourne le resultat
        return $filters;
    }

    /**
     * Prepare le parametre sort
     */
    private function prepareSort($params)
    {

        // Pas de tri, on retourne null
        if (!isset($params['sort'])) {
            return null;
        }

        // Recup de la liste des tris
        $fields = explode(',', $params['sort']);

        // Formatte le tri tel qu'attendu par la classe metier
        $sort = array();
        foreach ($fields as $field) {
            $sign  = substr($field, 0, 1);
            $order = ($sign == '-') ? 'DESC' : 'ASC';
            $field = ($order == 'DESC') ? substr($field, 1) : $field;
            $sort[$field] = $order;
        }

        // Aucun element, le filtre est null
        if (count($sort) == 0) {
            $sort = null;
        }

        // Retourne le resultat
        return $sort;
    }	
	
    /**
     * Obtiens les infos de pagination
     */
    public function getPaginInfos($filters = null, $perPage = null, $page = null)
    {			
        // Obtiens le nb d'items pour ce filtrage
        $nbItems = $this->_model->getNbItems($filters);
		
		if ($nbItems > 0) {
		
			// init valeurs par defaut perPage
			$perPage = (!is_null($perPage)) ? $perPage : $nbItems;

			// Calcul du nb de pages
			$nbPages = ceil($nbItems / $perPage);

			// Calcul des position
			$curr = min($nbPages, max(1, $page));
			$prev = max(1, $curr - 1);
			$next = min($nbPages, $curr + 1);

            // Calcul des items servis
            $firstItem = (($curr -1) * $perPage) + 1;
            $lastItem = min($nbItems, $curr * $perPage);
			
		} else {
			$perPage = 0;
			$nbPages = 1;
			$curr = 1;
			$prev = 1;
			$next = 1;		
            $firstItem = 0;
            $lastItem = 0;
		}

        // Retour resultat
        return array(
            'perPage' => $perPage,
            'firstPage'     => 1,
            'prevPage'      => $prev,
            'currPage'      => $curr,
            'nextPage'      => $next,
            'lastPage'      => $nbPages,
            'totalItems'     => $nbItems,
            'firstItemSet'  => $firstItem,
            'lastItemSet'   => $lastItem
       );
    }	


    //-------------------------------
    // MAPPING DES COLONNES
    //-------------------------------		
	
	/**
	* Verifie que les parametres passes a l'API correspondent
	* - soit a des commandes API (sort/perPage/page)
	* - soit a des champs declares dans le mapping de colonnes
	*/
	private function mapParameters($params, $allowAPIParams)
	{		
		// Initialisation des parametres
		$mParams = array();		
			
		// Parcours des parametres
		foreach ($params as $paramName => $paramValue) {
			
			if ($this->apiColumnExists($paramName)) {
				
				// Le parametre est un champ a mapper, on map
				$dbColName = $this->mapAPIToBDD($paramName);
				$mParams[$dbColName] = $paramValue;				
				
			} elseif ($this->isAPICommand($paramName)) {
				
				if ($allowAPIParams) {
					
					// Le parametre est un sort on map les valeurs
					if ($paramName == 'sort') {			
						$paramValue = $this->mapSortParameter($paramValue);
					}
					
					// Le parametre est une commande API attendue, on le conserve
					$mParams[$paramName] = $paramValue;
					
				} else {
					
					// Le parametre est une commande de l'API NON attendue
					throw new \Exception(
						"Parametre inattendu : " . $paramName,
						ReturnCodes::INVALID_PARAMETERS
					);					
				}
				
			} else {
				
				// Le parametre n'est ni attendu, ni une commande de l'API
				throw new \Exception(
					"Champ de filtrage inattendu : " . $paramName,
					ReturnCodes::INVALID_PARAMETERS
				);
			}
		}
		return $mParams;		
	}
	
	/**
	* Converti une colonne exposee par l'API en colonne BDD
	*/	
	private function mapAPIToBDD($paramName) {		
		return $this->_argMap[$paramName];	
	}
	
	/**
	* Converti une colonne BDD en colonne exposee par l'API
	*/
	private function mapBDDToAPI($fieldName) {
		return isset($this->_modelMap[$fieldName]) ? $this->_modelMap[$fieldName] : $fieldName ;
	}
	
	/**
	* Determine si une colonne est exposee par l'API
	*/
	private function apiColumnExists ($paramName) {		
		return in_array($paramName,array_keys($this->_argMap));
	}
	
	/**
	* Determine si le parametre est une commande de l'API
	*/ 
	private function isAPICommand($paramName) {
		$apiCommands = array('sort','perPage','page');	
		return in_array($paramName,$apiCommands);
	}
	
	/**
	* Map les colonnes du parameter 'sort'
	*/
	private function mapSortParameter($paramValue) {
		
		// Recup de tous les champs de tri
		$fields = explode(',', $paramValue);						 
		$mFields = array();	
		foreach ($fields as $fieldName) {
			
			// Separe le signe et le parametre
			$sign = substr($fieldName, 0, 1);
			if ($sign == '-') {
				$realparamName = substr($fieldName, 1);
			} else {
				$realparamName = $fieldName;
				$sign = '';			
			}	
			
			// Le parametre de tri n'est pas attendu
			if (!$this->apiColumnExists($realparamName)){				
				throw new \Exception(
					"Champ de tri inattendu : " . $realparamName,
					ReturnCodes::INVALID_PARAMETERS
				);	
			}
			
			// Le parametre de tri est attendu, on map
			$dbColName = $this->mapAPIToBDD($realparamName);				
			$mFields[] = $sign . $dbColName;		
		}
		
		// Retour du champ recompose avec les colonnes bdd
		return implode(',',$mFields);
	}
	
	/**
	* Maping inverse des resultats BDD
	*/
	private function unMapBDDResults($rows) {
		$newRows = array();
		foreach ($rows as $pos => $row) {
			$newRow = array();
			foreach ($row as $fieldName => $fieldValue) {
				$newRow[$this->mapBDDToAPI($fieldName)] = $fieldValue;
			}
			$newRows[$pos] = $newRow;
		}
		return $newRows;
	}	


}

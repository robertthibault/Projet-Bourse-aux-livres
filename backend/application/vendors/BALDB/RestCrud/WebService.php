<?php
namespace BALDB\RestCrud;

/**
 * Webservice permettant d'exposer via une API REST 
 * un modele BDD qui implemente iPaginableCRUD
 */
class WebService
{

    //--------------------------------
    // CONSTANTES & VARIABLES
    //--------------------------------	
		
	// Mapping des colonnes API / MODEL
	protected $_colMap = array();
	
	// Model instancie
	private $_model;
	
	// Logger instancie
	private $_logger;
	
    // Wrapper pour l'acces aux superglobales
    private $_sgw;
	
	// Methodes HTTP gerees
    const METHOD_GET    = 'get';
    const METHOD_POST   = 'post';
    const METHOD_PATCH  = 'patch';
    const METHOD_DELETE = 'delete';	
    const METHOD_PUT = 'put';	
	
    // Pour debug
	const ENABLE_DEBUG_BEHAVIOR = 1;  // Active / desactive les comportements de debug
    const DBG_RND_MIN_EXEC_DELAY = 0; // Delai d'attente min avant reponse (random )
    const DBG_RND_MAX_EXEC_DELAY = 0; // Delai d'attente max avant reponse (random )
    const DBG_RND_EXEC_ERROR_PCT = 0; // Probabilite de reponse en erreur (de 0 a 1)

	
    //-------------------------------
    // CONSTRUCTEUR
    //-------------------------------

    /**
     * Constructeur
     */
    public function __construct(iPaginableCRUD $model, \BALDB\Loggers\iLogger $logger)
    {
        // Enregistre les parametres
        $this->_model = $model;
		$this->_logger = $logger;
    }	
	
	/**
	 * SETTER DU COLUMNMAPPING
	 */
	 
	 public function set_column_mapping($columnsMapping) {
		$this->_colMap = $columnsMapping;
	}	
	
    //--------------------------------
    // DISPATCH LA REQUETE VERS L'ACTION
    //--------------------------------
	
    /**
     * Traite la requete
     */
    public function serve()
    {
		// Defini un id unique de traitement (pour identification dans les logs)
		$idWS = uniqid();
		
        // Initialise le Wrapper de superglobal
        $this->_sgw = new \BALDB\Wrappers\SuperGlobals();
		
        // Initialise la reponse
        $resp = '';

        try {

			// Init decompte du temps
			$tZero = microtime();
		
            // Verification de la validite de la methode
            $method = $this->checkValidMethod();		
		
            // Recupere les params
            $rawParams = $this->getParameters();
			
			// Log le debut de traitement
			$this->_logger->info("WS($idWS) - Service de " . $this->getEndPointURL());
			$this->_logger->debug("WS($idWS) - Parametres : " . print_r($rawParams,true));

            // Dispatch l'action
            switch ($method) {
				
                case self::METHOD_GET:
					$hasId = isset($rawParams['id']);
					$id = $hasId ? $rawParams['id'] : null;		
					if ($hasId) {
						$resp = $this->APIGetOne($id);
					} else {						
						$resp = $this->APIGetDataSet($rawParams);
					}                    
                    break;
					
                case self::METHOD_POST:					
                    $resp = $this->APICreate($rawParams);
                    break;
					
                case self::METHOD_PATCH:					
                    $resp = $this->APIUpdate($id, $rawParams);
                    break;
					
                case self::METHOD_DELETE:
                    $resp = $this->APIDelete($id);
                    break;
            }

        } catch (\Exception $ex) {
	
			// Log l'exception
			$this->_logger->erreur("WS($idWS) - " . $ex->getMessage() . chr(10) . $ex->getTraceAsString());				
	
            // retourne la reponse avec un message generique et le code de l'exception
            $resp = $this->getErrorResponse("Une erreur est survenue", $ex->getCode());
			
        }
		
		// Fin decompte du temps
		$tFin = microtime();		
		$duree = $tFin - $tZero;
		
		// Log de la fin de traitement
		$this->_logger->debug("WS($idWS) - Response : " . $resp);	
		$this->_logger->detail("WS($idWS) - Termine en $duree sec. ");			

		// Retourne la reponse
        return $resp;
    }

    /**
     * Verifie si la methode HTTP est valide
     */
    protected function checkValidMethod()
    {
        // Verifie si la methode est autorisee
        $method = strtolower($this->_sgw->_server('REQUEST_METHOD'));		
		switch ($method) {
			
			// Methodes valides
			case self::METHOD_GET:
			case self::METHOD_POST:
			case self::METHOD_PATCH:
			case self::METHOD_DELETE:
				return $method;
				break;
				
			// Methode invalide
			default:
				$message = 'Methode "' . $this->_sgw->_server('REQUEST_METHOD') . '" non valide. ';
				throw new \Exception($message, ReturnCodes::INVALID_METHOD);			
				break;
		}
    }		
	
    /**
     * Obtiens les parametres
     */
    private function getParameters()
    {

        // Lecture params selon la methode
        $params = array();
        $method = strtolower($this->_sgw->_server('REQUEST_METHOD'));
        switch ($method) {
            case self::METHOD_GET:
                $params = $this->_sgw->_get();
                break;
            case self::METHOD_POST:
                $params = $this->_sgw->_post();
                break;
            case self::METHOD_PATCH:
                $params = $this->_sgw->_phpinput();
                break;
            case self::METHOD_DELETE:
                $params = $this->_sgw->_phpinput();
                break;
        }

        // Retourne le resultat
        return $params;
    }
	
    //-------------------------------
    // MAPPING DES COLONNES
    //-------------------------------		
	
	/**
	* Verifie que les parametres passes a l'API correspondent
	* - soit a des commandes API (sort/perPage/page)
	* - soit a des champs declares dans le mapping de bb
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
				
			}
		}
		return $mParams;		
	}
	
	/**
	* Converti une colonne exposee par l'API en colonne BDD
	*/	
	private function mapAPIToBDD($paramName) {		
		return $this->_colMap[$paramName];	
	}
	
	/**
	* Converti une colonne BDD en colonne exposee par l'API
	*/
	private function mapBDDToAPI($fieldName) {
		$apiMap = array_flip($this->_colMap);
		return $apiMap[$fieldName];
	}
	
	/**
	* Determine si une colonne est exposee par l'API
	*/
	private function apiColumnExists ($paramName) {		
		return in_array($paramName,array_keys($this->_colMap));
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
	
    //-------------------------------
    // DELEGATION DE CONTROLE 
    //-------------------------------	
			
	protected function beforeCreate(&$params){}
	protected function beforeGetById(&$id){}
	protected function beforeGetDataSet(&$params){}
	protected function beforeUpdate(&$id, &$params){}
	protected function beforeRemove(&$id){}
	
	
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
		return $this->getResponse($item);      
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

		// Delegation de contrele
		$this->beforeGetDataSet($params);
		
        // Recup des enregistrements
        $dataSet = $this->_model->getDataSet($filters, $sort, $perPage, $pagination['currPage']);
		$dataSet = $this->unMapBDDResults($dataSet);

		// Pour l'affichage des filters et sort dans la repose, on utilise les $rawParams
		$unMapFilters = $this->prepareFilters($rawParams);
		$unMapSort    = $this->prepareSort($rawParams);
		
        // Retour resultat
        return $this->getResponse(array(
            'dataSet'  => $dataSet,
            'filters' => $unMapFilters,
            'sort'    => $unMapSort,
            'pagin'   => $pagination,
        ));				  
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
        $id = $this->_model->create($params);	
		
		// Compose et retourne la reponse OK (avec l'id)
		return $this->getResponse(array('id' => $id));
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
		return $this->getResponse();
    }

    /**
     * Supprime un element
     */
    protected function APIDelete($id)
    {
		// Delegation de contrele
		$this->beforeRemove($id);
		
        // Suppression
        $this->_model->supprimer($id);
		
		// Compose et retourne la reponse OK
		return $this->getResponse();		
    }
	
	
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

    //--------------------------------
    // ENVOI DES REPONSES
    //--------------------------------

    /**
     * Envoie la reponse au client (json)
     */
    protected function getResponse($data = null, $code = ReturnCodes::OK)
    {
        // Structuration de la reponse
        $response = array(
            'code' => $code,
            'data' => $data,
        );
		
        // Encode en json
        $this->HTMLizeData($response);		
        $jsonResponse = json_encode($response, JSON_PRETTY_PRINT);

        // Retourne la reponse
        return $jsonResponse;
    }

    /**
     * Envoie la reponse erreur au client
     */
    protected function getErrorResponse($data, $errorCode)
    {
        // Verifie que le code ne soit pas le code OK
        if ($errorCode == ReturnCodes::OK) {
			$errorCode = ReturnCodes::UNHANDLED_ERROR;
        }

        // Envoi la reponse
        return $this->getResponse($data, $errorCode);
    }

    /**
     * Encode les caracteres html avant encoding json
     */
    protected function HTMLizeData(&$data)
    {
        array_walk_recursive($data, function (&$value) {
            $value = htmlentities($value, ENT_COMPAT | ENT_HTML401, 'ISO-8859-1');
        });
    }

    //--------------------------------
    // FONCTIONS UTILES
    //--------------------------------

    /**
     * Retourne l'URL complete du point d'acces e l'API
     */
    protected function getEndPointURL()
    {
        $uri       = $this->_sgw->_server('REQUEST_URI');
        $host      = $this->_sgw->_server('HTTP_HOST');
        $uri_parts = explode('?', $uri, 2);
        return 'http://' . $host . $uri_parts[0];
    }

    /**
     * Gere les comportements de debug
     */
    private function debugBehavior($jsonResponse)
    {
		// Delai de reponse augmente
		$rndMin = self::DBG_RND_MIN_EXEC_DELAY * 1000000;
		$rndMax = self::DBG_RND_MAX_EXEC_DELAY * 1000000;
		usleep(rand($rndMin, $rndMax));

		// Message d'erreur
		$failOdds = self::DBG_RND_EXEC_ERROR_PCT * 1000000;
		if ($failOdds > rand(0, 1000000)) {
			throw new \Exception('Erreur provoquee (debug)');
		}
		
		// Transformation du JSON
		if (self::DBG_PRETIFY_JSON) {
			$jsonPrettifier = new \BALDB\Json\Prettifier();
			$jsonResponse = $jsonPrettifier->prettify($jsonResponse);
		}
		
		// Retourne la reponse Json
		return $jsonResponse;
		
    }

}

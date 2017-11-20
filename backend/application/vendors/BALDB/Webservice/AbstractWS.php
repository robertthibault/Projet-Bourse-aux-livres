<?php
namespace BALDB\Webservice;

/**
 * Webservice qui permet :
 * - la gestion des méthodes valides GET / PUT / PATCH / POST / DELETE
 * - d'exposer 5 fonctions WSGet / WSPut / WSPatch / WSPost / WSDelete
 * - la gestion de l'authentification via iAuthenticator
 * - le formatage des réponses json
 * - la gestion des codes retour
 * - la simulation de comportements pour debug (erreurs aléatoires, temps de réponse)
 */
abstract class AbstractWS
{

    //--------------------------------
    // CONSTANTES & VARIABLES
    //--------------------------------	
	
	// Authentificateur
	private $_authenticator;
	
	// Logger instancie
	private $_logger;
	
	// Liste des méthodes valides
	private $_validMethods;
	
    // Wrapper pour l'acces aux superglobales
    private $_sgw;

    private $_model;
	
	// Methodes HTTP gerees
    const METHOD_GET    = 'get';
    const METHOD_POST   = 'post';
    const METHOD_PATCH  = 'patch';
	const METHOD_PUT  	= 'put';
    const METHOD_DELETE = 'delete';	
	
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
    public function __construct(
		\BALDB\Loggers\iLogger $logger,		
		$validMethods = array(self::METHOD_GET),
		\BALDB\Authentication\iAuthenticator $auth = null)
    {
        // Enregistre les parametres
		$this->_logger = $logger;
		$this->_validMethods = $validMethods;
		$this->_authenticator = $auth;
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
			$tZero = microtime(true);
		
            // Verification de la validite de la methode
            $method = $this->checkValidMethod();		
		
            // Recupere les params
            $rawParams = $this->getParameters();

			// Log le debut de traitement
			$this->_logger->info("WS($idWS) - Service de " . $this->getEndPointURL());
			$this->_logger->debug("WS($idWS) - Parametres : " . print_r($rawParams,true));

            // Vérifie l'authentification
			$this->checkAuthentication();

			// Délégation de contrôle
            $this->beforeExecute();
            // Dispatch l'action
            switch ($method) {
                case self::METHOD_GET:
					$resp = $this->WSGet($rawParams);                
                    break;
					
                case self::METHOD_POST:					
                    $resp = $this->WSPost($rawParams);
                    break;
					
                case self::METHOD_PATCH:					
                    $resp = $this->WSPatch($rawParams);
                    break;
					
                case self::METHOD_PUT:					
                    $resp = $this->WSPut($id, $rawParams);
                    break;
					
                case self::METHOD_DELETE:
                    $resp = $this->WSDelete($rawParams);
                    break;
            }
			// Conversion JSON
			$resp = $this->getResponse($resp);
			
			// Comportements de debug
			$this->debugBehavior($resp);			

        } catch (\Exception $ex) {
	
			// Log l'exception
			$this->_logger->erreur("WS($idWS) - " . $ex->getMessage() . chr(10) . $ex->getTraceAsString());				
	
            // retourne la reponse avec un message generique et le code de l'exception
            $resp = $this->getErrorResponse("Une erreur est survenue", $ex->getCode());
			
        }
		
		// Fin decompte du temps
		$tFin = microtime(true);
		$duree = $tFin - $tZero;
		
		// Log de la fin de traitement
		$this->_logger->debug("WS($idWS) - Response : " . $resp);	
		$this->_logger->detail("WS($idWS) - Termine en $duree sec. ");			

		// Retourne la reponse
        return $resp;
    }
	
	/**
	* Vérifie si l'utilisateur est connecté
	*/
	protected function checkAuthentication() {
		
		if (!is_null($this->_authenticator))
		{
			// Tentative de connexion
			$this->_authenticator->connect(null);
			if (!$this->_authenticator->isConnected()) {

				// Echec de connexion, reponse KO
				throw new \Exception ('Utilisateur non autorise', ReturnCodes::UNAUTHORIZED_ACCESS);
			}	
		}		
	}
	
    /**
     * Verifie si la methode HTTP est valide
     */
    protected function checkValidMethod()
    {
        // Verifie si la methode est autorisee
        $method = strtolower($this->_sgw->_server('REQUEST_METHOD'));	
		if (!in_array($method,$this->_validMethods))
		{
			// Methode invalide
			$message = 'Methode "' . $this->_sgw->_server('REQUEST_METHOD') . '" non valide. ';
			throw new \Exception($message, ReturnCodes::INVALID_METHOD);			
		}
		
		return $method;
    }		
	
    /**
     * Obtiens les parametres
     */
    protected function getParameters()
    {
        $this->_sgw = new \BALDB\Wrappers\SuperGlobals();
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
			case self::METHOD_PUT:	
            case self::METHOD_DELETE:
                $params = $this->_sgw->_phpinput();
                break;
        }
        // Retourne le resultat
        return $params;
    }
		
    //-------------------------------
    // DELEGATION DE CONTROLE 
    //-------------------------------	
			
    // Executé systématiquement a chaque 'serve'
    protected function beforeExecute(){}

	
    //-------------------------------
    // DELEGATION DE TRAITEMENT
    //-------------------------------

	protected function WSGet($rawParams){ return array(); }              
	protected function WSPost($rawParams){ return array(); }
	protected function WSPatch($rawParams){ return array(); }
	protected function WSPut($rawParams){ return array(); }
	protected function WSDelete($rawParams) { return array(); }
	
  
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
        //$this->HTMLizeData($response);		
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
            $value = htmlentities($value, ENT_COMPAT | ENT_HTML401, 'UTF-8');
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
    protected function debugBehavior()
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
    }

}

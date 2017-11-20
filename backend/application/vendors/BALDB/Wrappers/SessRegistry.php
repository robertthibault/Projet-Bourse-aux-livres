<?php
namespace BALDB\Wrappers;

/**
*
* Gestion d'un registre en session (protégé par hostName)
*
*/
class SessRegistry
{	

	// Délimiteur de clé pour l'obtention d'élements dans des tableaux imbriqués
	const KEY_DELIMITER = '/';

	//------------------------------------
	// CONSTRUCTEUR
	//------------------------------------

    public function __construct() {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();		
        }  
    }
	
	//------------------------------------
	// GETTER / SETTER
	//------------------------------------
	
	/**
	* Setter
	*/
	public function set($key, $value){
		$_SESSION[$_SERVER['HTTP_HOST']][$key] = $value;
	}
	
	/**
	* Getter
	*/
	public function get($key){
			
		// Verification présence du registre
		if (!isset($_SESSION[$_SERVER['HTTP_HOST']])) return null;
		
		// Obtentions du xPath
		$xPath = explode(self::KEY_DELIMITER,$key);
		
		// Vérification présence de la clé
		if (!isset($_SESSION[$_SERVER['HTTP_HOST']][$xPath[0]])) return null;

		// Recherche de l'élement
		$tmp = $_SESSION[$_SERVER['HTTP_HOST']];		
		for($i=0;$i<count($xPath);$i++){
			if (!isset($tmp[$xPath[$i]])) return null;
			$tmp = $tmp[$xPath[$i]];
		}

		// Retour résultat
		return $tmp;
	}	

	/**
	* Remover
	*/
	public function remove($key) {
		unset($_SESSION[$_SERVER['HTTP_HOST']][$key]);
	}
	
	//------------------------------------
	// INTERROGATIONS
	//------------------------------------	
	
	/**
	* Test d'égalité
	*/
	public function equals($key, $expected) {
		return ($this->get($key) == $expected);
	}
	
	/**
	* Test true
	*/ 
	public function isTrue($key) {
		return ($this->get($key) === true);
	}
	
	/**
	* Test false
	*/ 	
	public function isFalse($key) {
		return ($this->get($key) === false);
	}
	
	/**
	* Test d'existence
	*/
	public function isDefined($key) {
		$item = $this->get($key);
		return isset($item);
	}		
	
    /**
    * Destruction de la session
    */
	public function destroy(){
		print_r($_SESSION);
		unset($_SESSION[$_SERVER['HTTP_HOST']]);
		print_r($_SESSION);
	}

} 
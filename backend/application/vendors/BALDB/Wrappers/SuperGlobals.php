<?php
namespace BALDB\Wrappers;

/**
 * Classe Permettant l'accès aux superglobales
 */
class SuperGlobals
{
    /**
     * Accès a la varriable GET
     */
    public function _get($field = null)
    {
		  $data = filter_input_array(INPUT_GET);
		  return $this->getSpecific($data,$field);		
    }

    /**
     * Accès a la varriable POST
     */	
    public function _post($field = null)
    {
        $data= array();
        $headers = getallheaders();

        // Gestion des différents types de récupération de data
        if(isset($headers['content-type'])){
            $encodeType = isset($headers['content-type']);
        }
        else if(isset($headers['Content-Type'])){
            $encodeType = isset($headers['Content-Type']);
        }

        switch ($encodeType){
            case 'application/json':
            $data = json_decode(file_get_contents('php://input'), true);
            break;
            case 'application/x-www-form-urlencoded':
            $data = filter_input_array(INPUT_POST);
            break;
        } 
		return $this->getSpecific($data,$field);
    }

    /**
     * Accès a la varriable SERVER
     */		
    public function _server($field = null)
    {
		  $data = filter_input_array(INPUT_SERVER);
		  return $this->getSpecific($data,$field);
    }

    /**
     * Accès a la varriable PHPINPUT (pour les autres methodes HTTP)
     */		
    public function _phpinput($field = null)
    {	
        parse_str(filter_input_array(INPUT_SERVER)['QUERY_STRING'], $params);
		return $this->getSpecific($params,$field);
    }  
	
	/**
	* Retourne tout ou partie d'une variable superglobale
	*/
	public function getSpecific($data,$field)
	{
		// data est vide, on en fait un tableau
		if (!isset($data))
		{
			$data = array();
		}
		
		// field est vide, on retourne data en entier
		if (!isset($field))
		{
			return $data;
		}
		// field est valué, on retourne sa valeur ou null
		return (isset($data[$field])) ? $data[$field] : null;				
	}

}

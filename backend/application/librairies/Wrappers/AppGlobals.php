<?php
namespace Wrappers;

/**
 * Classe Permettant l'acc�s a un ensemble d'objets
 * statiques partag�s par l'application
 */
abstract class AppGlobals extends \BALDB\Wrappers\AppGlobals
{	
	/**
	* Initialisation de la configuration
	* - mini config cr�e a la vol�e pour les besoins du POC, retranscrite en CADO BDD
	* - id�alement, instancier un objet d�di�
	*/
	protected static function initConfig() 
	{
		return array (
			'DB_HOST' => 'localhost',
			'DB_NAME' => 'bal-db',
			'DB_USER' => 'bal_user',
			'DB_PASS' => '',
			'LOG_FILE' => APP_ROOT . '/logs/ini.log',
			'LOG_LEVEL' => \BALDB\Loggers\abstractLogger::N_DEBUG
		);
	}
	
	/**
	* Initialisation de la connexion BDD
	* - utilisation d'un connecteur PDO cr�e a la vol�e pour les besoins du POC
	* - id�alement, instancier un objet d�di�	
	*/
	protected static function initDb()
	{
		// Recup de la configuration
		$conf = static::getConfig();
		
        // Definition de la connexion
        $dsn     = 'mysql:dbname='.$conf['DB_NAME'].';host='.$conf['DB_HOST'].';charset=utf8';
        $options = array(
            \PDO::ATTR_TIMEOUT => 5,
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
			\PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
        );

        // Tentative de connexion
        try {			
            $db = new \PDO($dsn, $conf['DB_USER'], $conf['DB_PASS'],$options);
        } catch (\Exception $ex) {
            throw new \Exception('Impossible de se connecter � la BDD');
        }

        // Retourne la connexion
        return $db;				
	}
		
	/**
	* Initialisation du logger
	*/
	protected static function initLogger()
	{
		// Recup de la configuration
		$conf = static::getConfig();

		// Instanciation du logger		
		$logger = new \BALDB\Loggers\FileLogger(
			$conf['LOG_FILE'], 
			$conf['LOG_LEVEL']
		);
		
		// Retourne le logger
		return $logger;
	}		
}
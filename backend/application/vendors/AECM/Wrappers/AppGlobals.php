<?php
namespace BALDB\Wrappers;

/**
 * Classe Permettant l'acc�s a un ensemble d'objets
 * statiques partag�s par l'application
 */
abstract class AppGlobals {
	
	// Stockage de la configuration 
	protected static $_config = null;
	
	// Stocakge de la connexion BDD
	protected static $_db = null;
	
	// Stockage du logger
	protected static $_logger = null;
		
	
	//------------------------------
	// GETTERS
	//------------------------------
	
	public static function getConfig() 
	{
		// Initialisation si n�cessaire
		if (is_null(static::$_config)) {
			static::$_config = static::initConfig();
		}
		
		// Retourne l'objet
		return static::$_config;			
	}
	
	public static function getDb()
	{
		// Initialisation si n�cessaire
		if (is_null(static::$_db)) {
			static::$_db = static::initDb();
		}
		
		// Retourne l'objet
		return static::$_db;		
	}
	
	public static function getLogger()
	{
		// Initialisation si n�cessaire
		if (is_null(static::$_logger)) {
			static::$_logger = static::initLogger();
		}
		
		// Retourne l'objet
		return static::$_logger;				
	}
	
	//------------------------------
	// LOADERS
	//------------------------------	
	
	protected static function initConfig(){}
	protected static function initDb(){}
	protected static function initLogger(){}
	
}
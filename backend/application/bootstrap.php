<?php

//------------------------------------
// DEFINITION DE L'AUTO LOADER
//------------------------------------

// R�cup du rootPath
$rootPath = realpath(dirname(__FILE__) . '/../');
DEFINE('APP_ROOT',$rootPath);

// Ajout du dossier libraries dans l'include path
$libPath  = $rootPath . '/application/librairies/';
set_include_path(get_include_path() . PATH_SEPARATOR . $libPath);

// Ajout du dossier vendors dans l'include path
$vendorsPath = $rootPath . '/application/vendors/';
set_include_path(get_include_path() . PATH_SEPARATOR . $vendorsPath);

// D�finition de l'autoLoader
spl_autoload_register(function ($class) {

	//echo "PROBING FOR : " . $class . ')<br/>';
    if (class_exists($class)) {
        return;
    }

    $file = str_replace('\\', DIRECTORY_SEPARATOR, $class) . '.php';
	//echo "REQUIERING : " . $file . '<br/>';
	require_once ($file);	
});

//------------------------------------
// REGLAGES DU CROSS SCRIPTING
//------------------------------------

// Autorisation du cross scripting seulement entre back et front (si host diff�rents)
header('Access-Control-Allow-Credentials:true');
header('Access-Control-Allow-Origin: http://localhost:5555');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS, PATCH');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: text/html;charset=utf-8');


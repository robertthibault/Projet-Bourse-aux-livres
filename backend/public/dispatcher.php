<?php
// Force l'affichage des erreurs
ini_set('display_errors', -1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL | E_STRICT);
 
// convertit les erreurs en exceptions
set_error_handler(function($errno, $errstr, $errfile, $errline, array $errcontext) {
    // error was suppressed with the @-operator
    if (0 === error_reporting()) {
        return false;
    }
    throw new ErrorException($errstr, 0, $errno, $errfile, $errline);
});

try{
    // Bootstraping
    $bootstrapPath = realpath(dirname(__FILE__) . '/../application/bootstrap.php');
    require_once $bootstrapPath;

    // Instanciation d'un Webservice sur le modèle correspondant
    $api = new \Webservice\BALWS();
    echo $api->serve();
}
catch(Exception $e) {
    // print_r($e);
    $eWS = new \Exceptions\ErrorWS();
    $eWS->serve($e);
}

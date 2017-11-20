<?php

namespace Exceptions;

/*
    Service API de retour d'erreurs
*/
class ErrorWS
{
    /*
        Fonction de service des erreurs d'API sous type de data
        Prends en entrée une exception, la retourne en data lisible API
    */
    public function serve($exc){
        $errData= array();
        $errData['message']= $exc->getMessage();
        $errData['code']= $exc->getCode();
        $errData['file']= $exc->getFile();
        $errData['line']= $exc->getLine();
        $errData['trace']= $exc->getTrace();
        $errData['string-trace']= $exc->getTraceAsString();
        $headers = getallheaders();
        //print_r($headers);
        // $encodeType = array();

        // Gestion des différents types de récupération de data
        // if(isset($headers['content-type'])){
        //     $encodeType = $headers['content-type'];
        // }
        // else if(isset($headers['Content-Type'])){
        //     $encodeType = $headers['Content-Type'];
        // }

        // switch ($encodeType){
        //     case 'application/json':
        //     $data = json_decode(file_get_contents('php://input'), true);
        //     break;
        //     case 'application/x-www-form-urlencoded':
        //     $data = filter_input_array(INPUT_POST);
        //     break;
        // }
        echo json_encode($errData, JSON_PRETTY_PRINT);;
    }
}
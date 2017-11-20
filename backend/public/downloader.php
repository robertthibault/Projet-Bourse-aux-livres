<?php
// Bootstraping
$bootstrapPath = realpath(dirname(__FILE__) . '/../application/bootstrap.php');
require_once $bootstrapPath;

function CSVData_StatRessource($data, $exercice, $ref) {
    //Déclaration du séparateur de fichier
    $sep = '/';
    $dataCSV = array();
    $row = "";

    //Ajout première ligne header
    foreach ($ref as $refLib){
        $row .= $refLib .$sep;
    }
    $dataCSV[] .= $row;
    //Parcours de chque données de stat
    foreach ($data as $stat) {
        $row = $stat["enTete"] . $sep;
        //Pour chaque donnée, on regarde l'ensemble des mois et vérifie s'il existe une occurence
        foreach($ref as $refLib){
            $found = false;
            foreach ($stat["keyValue"] as $statKV) {
                if($statKV["key"] == $refLib){
                    $row .=  str_replace('.',',',$statKV["value"]);
                    continue;
                }
            }
            if (!$found){
                $row .= $sep ;
            }
        }
        $row .=  str_replace('.',',',$stat["total_ressource"]);
        $dataCSV[] = $row;
    }

    return $dataCSV;
}

function export_excell($data,$filters,$head) {
    $temPath = 'Statistiques_Ressources_' . $filters['detail'] . '_' . date('m_d_Y', time()) . '.csv';
    if(file_exists($temPath)){
        unlink($temPath);
    }
	
	$files = glob("*.csv");
	if ($files) {
		foreach($files as $filename) {
			unlink($filename);
		}
	}
    touch($temPath);

    //recuperation de la data et ouverture du fichier cible
    $data_aray = CSVData_StatRessource($data, $filters,$head);
    $file = fopen($temPath, "w");

    //Ecriture de la data
    foreach ($data_aray as $i => $data_string) {
		$parsed_array = explode('/', utf8_decode($data_aray[$i]));
		if ($i == 0) {
			array_unshift($parsed_array, '');
		}
        fputcsv($file, $parsed_array, ';');
    }
    //Export au navigateur pour enregistrement dans arbre perso utilisateur
    if (file_exists($temPath)) {
        header('Content-Type: application/force-download'); 
        header('Content-Disposition: attachment; filename="' . $temPath . '"');
        readfile($temPath);
    } else {
        console_log("Erreur de chargement du fichier CSV lors de sa génération.");
    }
}

    /**
     * Obtiens les parametres
     */
function getParameters()
{
        $_sgw = new \BALDB\Wrappers\SuperGlobals();
        // Lecture params selon la methode
        $params = array();
        $method = strtolower($_sgw->_server('REQUEST_METHOD'));
        switch ($method) {
            case 'get':
                $params = $_sgw->_get();
                break;
            case 'post':
			    $params = $_sgw->_post();
                break;
			case 'patch':
			case 'put':			
            case 'delete':
                $params = $_sgw->_phpinput();
                break;
        }
        // Retourne le resultat
        return $params;
}

$filters = getParameters();
if (! isset($filters["exercice"]) || !isset($filters["detail"])){
   throw new \Exception("Paramètre 'exercice' ou 'detail' manquant ",\BALDB\RestCrud\ReturnCodes::MISSING_PARAMETERS);
}

$ModelStat = new Models\statistiques();
$ModelProjet = new Models\projets();
$ref =array();
if ($filters["detail"]=="projet" || $filters["detail"]=="projets" 
||$filters["detail"]=="Projet" ||$filters["detail"]=="Projets" ){
    //Génération de la liste des projets
    $listeProjets = $ModelProjet->getDataSet($filters);
    foreach($listeProjets as $proj){
        $ref[]= $proj["prj_code_projet"];
    }
    $data = $ModelStat->getDataRessourcesProjets($filters);
}

else if ($filters["detail"]=="mois" || $filters["detail"]=="Mois" 
    ||$filters["detail"]=="annee" ||$filters["detail"]=="année" ){
    $ref = array("Janvier", "Février", "Mars", "Avril", 
                "Mai", "Juin", "Juillet","Août", 
                "Septembre", "Octobre" ,"Novembre", "Décembre");
    $data = $ModelStat->getDataRessources($filters);
}
export_excell($data,$filters,$ref);

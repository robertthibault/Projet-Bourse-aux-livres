<?php
namespace BALDB\Loggers;

abstract class abstractLogger implements iLogger
{
    // Type de log
    const L_DEBUT   = 1;
    const L_FIN     = 2;
    const L_INFO    = 11;
    const L_WARNING = 12;
    const L_ERROR   = 13;
    const L_SUCCESS = 14;
    const L_DETAIL  = 21;
    const L_DEBUG   = 31;
	
    // Niveau de log
	const N_AUCUN   =  0;  // N'affiche rien
    const N_NORMAL  = 20;  // Affiche L_INFO, L_WARNING, L_ERROR et L_SUCCESS
    const N_VERBEUX = 30;  // Affiche les précédents + L_DETAIL
    const N_DEBUG   = 40;  // Affiche les précédents + L_DEBUG

    // Niveau de log par défaut (N_NORMAL)
    private $_niveauLog = 20;

	/**
	 * Retourne les niveaux de logs autorisés
	 */
	public static function getNiveauxLog()
	{
		return array(
			'aucun' => array(
				'value' => abstractLogger::N_AUCUN,
				'label' => 'Aucun',
			),		
			'normal' => array(
				'value' => abstractLogger::N_NORMAL,
				'label' => 'Normal',
			),
			'verbeux' => array(
				'value' => abstractLogger::N_VERBEUX,
				'label' => 'Verbeux',
			),
			'debug' => array(
				'value' => abstractLogger::N_DEBUG,
				'label' => 'Debug',
			),
		);
	}
	
    /**
     * Définition du niveau de log
     */
    public function definirNiveauLog($niveauLog)
    {
        switch ($niveauLog) {

            // Enregistrement si parametre ok
			case abstractLogger::N_AUCUN:
            case abstractLogger::N_NORMAL:
            case abstractLogger::N_VERBEUX:
            case abstractLogger::N_DEBUG:
                $this->_niveauLog = $niveauLog;
                break;

            // Erreur sinon
            default :
                throw new \Exception('Niveau de log inconnu '.$niveauLog);
                break;
        }
    }

    /**
     * Fonction de log Début de traitement
     */
    public function debut($contenu)
    {
        $this->ecrireSelonType($contenu, abstractLogger::L_DEBUT);
    }

    /**
     * Fonction de log Début de traitement
     */
    public function fin($contenu)
    {
        $this->ecrireSelonType($contenu, abstractLogger::L_FIN);
    }

    /**
     * Fonction de log Info
     */
    public function info($contenu)
    {
        $this->ecrireSelonType($contenu, abstractLogger::L_INFO);
    }

    /**
     * Fonction de log Alerte
     */
    public function alerte($contenu)
    {
        $this->ecrireSelonType($contenu, abstractLogger::L_WARNING);
    }

    /**
     * Fonction de log Erreur
     */
    public function erreur($contenu)
    {
        $this->ecrireSelonType($contenu, abstractLogger::L_ERROR);
    }

    /**
     * Fonction de log Success
     */
    public function success($contenu)
    {
        $this->ecrireSelonType($contenu, abstractLogger::L_SUCCESS);
    }

    /**
     * Fonction de log Detail
     */
    public function detail($contenu)
    {
        $this->ecrireSelonType($contenu, abstractLogger::L_DETAIL);
    }

    /**
     * Fonction de log Debug
     */
    public function debug($contenu)
    {
        $this->ecrireSelonType($contenu, abstractLogger::L_DEBUG);
    }

    /**
     * Filtrage de l'écriture selon le type de log
     */
    private function ecrireSelonType($contenu, $typeLog)
    {
        // Verif niveau de log
        if ($typeLog < $this->_niveauLog) {

            // Transformation en tableau si nécessaire
            if (!is_array($contenu)) $contenu = array($contenu);

            // Ecriture de toutes les lignes
            foreach ($contenu as $ligne) {
                $this->ecrireLog($ligne, $typeLog);
            }
        }
    }

    /**
     * Ecriture dans le log
     */
    protected abstract function ecrireLog($contenu, $typeLog);
}
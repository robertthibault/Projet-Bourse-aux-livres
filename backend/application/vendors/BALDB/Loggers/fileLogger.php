<?php
namespace BALDB\Loggers;

class FileLogger extends abstractLogger implements iLogger
{
    private $_logFile;

    public function __construct($logFile, $niveauLog)
    {

        // Definition du niveau de log
        $this->definirNiveauLog($niveauLog);

        // Enregistrement parametres
        $this->_logFile = $logFile;

        // Verif fichier
        $this->verfifierFichierLog();
    }

    /**
     * Vérifie que le fichier de log soit crée avec droits d'ecriture
     */
    private function verfifierFichierLog()
    {
        if (!is_dir(dirname($this->_logFile))) {
            if (!mkdir(dirname($this->_logFile), 0777, true)) {
                throw new \Exception("Impossible de créer le dossier de log : ".dirname($this->_logFile));
            }
        }
        if (is_file($this->_logFile)) {
            if (!is_writable($this->_logFile)) {
                throw new \Exception("Impossible d'ecrire dans le fichier log : ".$this->_logFile);
            }
        } else {
            if (file_put_contents($this->_logFile, '') === false) {
                throw new \Exception("Impossible de créer le fichier de log : ".$this->_logFile);
            }
        }
    }

    /**
     * Ecris dans le fichier
     */
    protected function ecrireLog($contenu, $typeLog)
    {		
		// Définition du contenu
        $content = date("Y-m-d H:i:s").' : ';
        switch ($typeLog) {

            case abstractLogger::L_INFO:
                $content .= "INFO : $contenu";
                break;

            case abstractLogger::L_WARNING:
                $content .= "WARNING : $contenu";
                break;

            case abstractLogger::L_ERROR:
                $content .= "ERROR : $contenu";
                break;

            case abstractLogger::L_SUCCESS:
                $content .= "SUCCESS : $contenu";
                break;

            case abstractLogger::L_DETAIL:
                $content .= "DETAIL : $contenu";
                break;

            case abstractLogger::L_DEBUG:
                $content .= "DEBUG : $contenu";
                break;

            case abstractLogger::L_DEBUT:
                $content .= "DEBUT ACTION : $contenu";
                break;

            case abstractLogger::L_FIN:
                $content .= "FIN ACTION : $contenu";
                break;
        }
        $content .= chr(10);
		
        // Ecriture dans le fichier		
        file_put_contents($this->_logFile, $content, FILE_APPEND);
    }
	
    /**
     * reLog a partir d'une ligne produite par fileLogger
     */
    public static function reLog($fileLoggerFile, $logger)
    {

        $contenuFichier = file_get_contents($fileLoggerFile);
        $lignes         = explode(chr(10), $contenuFichier);
        foreach ($lignes as $ligne) {

            if (strpos($ligne, ': INFO :') !== false) {
                $logger->info($ligne);
            } elseif (strpos($ligne, ': DETAIL :') !== false) {
                $logger->detail($ligne);
            } elseif (strpos($ligne, ': DEBUG :') !== false) {
                $logger->debug($ligne);
            } elseif (strpos($ligne, ': WARNING :') !== false) {
                $logger->alerte($ligne);
            } elseif (strpos($ligne, ': ERROR :') !== false) {
                $logger->erreur($ligne);
            } elseif (strpos($ligne, ': SUCCESS :') !== false) {
                $logger->success($ligne);
            } elseif (strpos($ligne, ': DEBUT ACTION :') !== false) {
                $logger->debut($ligne);
            } elseif (strpos($ligne, ': FIN ACTION :') !== false) {
                $logger->fin($ligne);
            } else {
                $logger->info($ligne);
            }
        }
    }
	
	/**
	 * Retourne tous les logs dans un array
	 * @param string $keyword Filtre les lignes qui contiennent le mot clé $keyword
	 */
	public static function getLogs($keyword = null)
	{
		global $conf;

		$allLogs = array();

		$logsDir = $conf->get('LOG_DIR');
		$logsPaths = array_diff(scandir($logsDir), array('.', '..'));
		foreach ($logsPaths AS $logFileName) {
			$logFilePath = $logsDir.'/'.$logFileName;
			if (is_file($logFilePath)) {
				$contenuFichier = file_get_contents($logFilePath);
				$lignes = explode(chr(10), $contenuFichier);
				if (!is_null($keyword)) {
					foreach ($lignes AS $index => $ligne) {
						if (!preg_match("/$keyword/", $ligne)) {
							unset($lignes[$index]);
						}
					}
				}
				$allLogs      = array_merge($allLogs, $lignes);
			}
		}
		return $allLogs;
	}
}

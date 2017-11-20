<?php
namespace Models;

class HistoLivreEtat extends \BALDB\RestCrud\ModelCRUD {

    public static $_COLUMN_MAPPING = array (
        'id_hle'                =>  'id',
        'id_lvr'              =>  'fk_livre',
        'id_eta'           =>  'fk_etat',
        'date_hle'         =>  'date'
     );

        public $_tableName = 'histo_lvr_eta_hle';

        /*
            Fonction de traitement des requêtes filtrées
        */
        public function getSQLRequest($filters){
            $sqlBody = array();
            return $sqlBody;
        }

    }

<?php
namespace Models;

class Livre extends \BALDB\RestCrud\ModelCRUD {

    public static $_COLUMN_MAPPING = array (
        'id_lvr'                =>  'id',
        'id_eta'              =>  'fk_etat',
        'id_rlv'           =>  'fk_reflivre'
     );

        public $_tableName = 'livre_lvr';

        /*
            Fonction de traitement des requêtes filtrées
        */
        public function getSQLRequest($filters){
            $sqlBody = array();
            if (isset($filters['eleve'])){
                if (isset($filters['etat'])){
                    $sqlBody = $this->getLivresSelonEleveEtat($filters['eleve'],$filters['etat']);
                }
                else if (isset($filters['rachat'])){
                    $sqlBody = $this->getLivresSelonEleveRachat($filters['eleve'],$filters['rachat']);
                }
                else{
                    $sqlBody = $this->getLivresSelonEleve($filters['eleve']);
                }
            }
            else if (isset($filters['stock'])){
                $sqlBody = $this->getLivresStock($filters['stock']);
            }
            return $sqlBody;
        }

        public function getLivresSelonEleve($eleve){
            return "
                SELECT lvr.id_lvr, lvr.id_eta, lvr.id_rlv FROM livre_lvr AS lvr
                JOIN rel_lvr_elv_rle AS rle ON rle.id_lvr = lvr.id_lvr
                WHERE rle.id_elv = ".$eleve.";
            ";
        }

        public function getLivresSelonEleveEtat($eleve, $etat){
            return "
                SELECT lvr.id_lvr, lvr.id_eta, lvr.id_rlv FROM livre_lvr AS lvr
                JOIN rel_lvr_elv_rle AS rle ON rle.id_lvr = lvr.id_lvr
                WHERE rle.id_elv = ".$eleve." AND id_eta = ".$etat.";
            ";
        }

        /*
            Renvoie la liste des livres revendus ou non d'un élève selon le booléen rachat
        */
        public function getLivresSelonEleveRachat($eleve, $rachat){
            $rachat_sql = ($rachat) ? ' IS NOT NULL ' : ' IS NULL ';
            return "
                SELECT lvr.id_lvr, lvr.id_eta, lvr.id_rlv FROM livre_lvr AS lvr
                JOIN rel_lvr_elv_rle AS rle ON rle.id_lvr = lvr.id_lvr
                WHERE rle.id_elv = ".$eleve." AND rle.date_rachat_rle ".$rachat_sql.";
            ";
        }

        /*
            Renvoie la liste des livres disponibles ou non selon le booléen stock
        */
        public function getLivresStock($stock){
            $stock_sql = ($stock) ? ' WHERE id_rle IS NULL OR date_rachat_rle IS NOT NULL '
            : ' WHERE id_rle IS NOT NULL AND date_rachat_rle IS NULL ';

            return "
                SELECT lvr.id_lvr, lvr.id_eta, lvr.id_rlv FROM livre_lvr AS lvr
                LEFT JOIN rel_lvr_elv_rle AS rle ON rle.id_lvr = lvr.id_lvr
                ".$stock_sql.";
            ";
        }

        /*
            Modifie la date de rachat d'un livre
        */
        public function setDateRachat($eleve, $livre, $rachat){
          $rachat_sql = ($rachat) ? ' IS NOT NULL ' : ' IS NULL ';
          $date = date("Y-m-d");
          return "
              UPDATE rel_lvr_rlv_rle
              SET date_rachat_rle = ".$date."
              WHERE id_elv = ".$eleve.", id_lvr = ".$livre.";
          ";
        }

        /*
          Insert l'etat d'un livre à une date donnée
        */
        public function setHistoriqueEtatLivre($livre, $etat){
          $nbLigne = 1 + "
                SELECT COUNT(id_hle)
                FROM histo_lvr_eta_hle;";
          $date = date("Y-m-d");
          return "
              INSERT INTO histo_lvr_eta_hle(id_hle, id_lvr, id_eta, date_hle)
              VALUES
              (".$nbLigne.", ".$livre.", ".$etat.", ".$date.");";
        }


        /*
          Update la table livre_lvr pour donner à un livre son nouvelle Etat
        */
        public function setLivreEtat($livre, $etat){
          return "
              UPDATE livre_lvr
              SET id_eta = ".$etat."
              WHERE id_lvr = ".$livre.";
          ";
        }

    }

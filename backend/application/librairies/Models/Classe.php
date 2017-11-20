<?php
namespace Models;

class Classe extends \BALDB\RestCrud\ModelCRUD {

    public static $_COLUMN_MAPPING = array (
        'id_cls'              =>  'id',
        'libelle_cls'         =>  'libelle',

    );

    public $_tableName = 'classe_cls';

    /*
        Fonction de traitement des requêtes filtrées
    */
    public function getSQLRequest($filters) {
        $sqlBody = '';
        if (isset($filters['eleve'])){
            $sqlBody = $this->getClasseSelonEleve($filters['eleve']);
        }

        return $sqlBody;
    }

    // Filtre sur l'id adhérent - requête spécifique
    public function getClasseSelonEleve($elv) {
        return 'SELECT DISTINCT cls.id_cls, libelle_cls FROM '.$this->_tableName.' AS cls
                JOIN rel_elv_cls_rec AS rec ON cls.id_cls = rec.id_cls
                WHERE id_elv = '.$elv.' 
                    AND rec.annee_rec = (
                        SELECT MAX(rec.annee_rec) FROM rel_elv_cls_rec AS rec WHERE id_elv = '.$elv.'
                        );';
    }


    public function create($params){
    if(isset($params['id']) && isset($params['classe'])){
           $pdo = \Wrappers\AppGlobals::getDb();
                       $sqlBody = 'INSERT INTO rel_cls_rlv_rcr ( id_cls, id_rlv ) VALUES ('
                       .$params['classe'].', '.$params['id'].');';
                       $pdo->query($sqlBody);
                       // Recup element ajouté
            $rows = $pdo->query("SELECT * FROM rel_cls_rlv_rcr WHERE id_cls=".$params['classe']." and id_rlv= ".$params['id'].";")->fetch();
                       return $rows;
            }
            else{
                return parent::create($params);
            }
    }


    public function delete($params){
            if(isset($params['id']) && isset($params['reflivre'])){
                    $pdo = \Wrappers\AppGlobals::getDb();
                    $sqlbodyrecup=("SELECT * FROM rel_cls_rlv_rcr WHERE id_cls=".$params['id']." and id_rlv= ".$params['reflivre'].";");
                    $laRelation = $pdo->query($sqlbodyrecup);

                    $sqlBody = "delete from rel_cls_rlv_rcr WHERE id_cls=".$params['reflivre']." and id_rlv= ".$params['reflivre'].";";
                    $pdo->query($sqlBody);
                    // Recup element ajouté
                    $rows = $pdo->query("SELECT * FROM rel_cls_rlv_rcr WHERE id_cls=".$params['id']." and id_rlv= ".$params['reflivre'].";")->fetch();
                    return $laRelation;
                    }
                    else{
                        return parent::delete($params);
                    }
            }

}
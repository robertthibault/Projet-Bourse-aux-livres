<?php
namespace BALDB\Loggers;

/**
 * Interface a implémenter pour les loggers utilisés dans 45XLivraison
 */
interface iLogger
{

    public function debut($contenu);

    public function info($contenu);

    public function alerte($contenu);

    public function erreur($contenu);

    public function success($contenu);

    public function detail($contenu);

    public function fin($contenu);
	
	public function debug($contenu);
}
<?php
namespace BALDB\RestCrud;

/**
 * Interface a implémenter pour les Models paginables exposés via RestCrud\Webservice
 */
interface iPaginableCRUD
{	
	public function create($params);
	
    public function update($id, $params);

    public function remove($id);
    
    public function getById($id);
    
    public function getDataSet($filters = null, $sort = null, $perPage = null, $page = null);
    
	public function getNbItems($filters);
}
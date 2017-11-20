<?php
namespace BALDB\Webservice;

/**
 * Codes de retour de BALDB\WebService
 */
class ReturnCodes
{

    // Code de retour OK
    const OK = 0;

    // Codes d'erreur
    const INVALID_METHOD      = 1;
    const UNAUTHORIZED_ACCESS = 2;
    const MISSING_PARAMETERS  = 3;
    const INVALID_PARAMETERS  = 4;
    const UNHANDLED_ERROR     = 100;

}

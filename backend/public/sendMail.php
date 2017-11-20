<?php 



ini_set('SMTP', 'smtp6.smtpft.francetelecom.fr');
ini_set('smtp_port', '25');
ini_set('sendmail_from', 'CADO');

$to = $_POST['destinataires']; // this is your Email address
$subject = "Saisie consommés";
$message = "Message envoyé automatiquement depuis CADO. \n\n". utf8_decode($_POST['message']) . "\n\n http://dv45xasc05.rouen.francetelecom.fr/";
$headers = "De:CADO - Message automatique";
$res = mail($to,$subject,$message,$headers);
echo "" . $res;


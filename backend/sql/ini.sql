/*
SQLyog Ultimate v10.11 
MySQL - 5.7.14 : Database - bal-db
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE IF NOT EXISTS `bal-db`;

USE `bal-db`;

/*Table structure for table `adherent_adh` */

DROP TABLE IF EXISTS `adherent_adh`;

CREATE TABLE `adherent_adh` (
  `id_adh` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nom_adh` varchar(200) NOT NULL,
  `prenom_adh` varchar(200) NOT NULL,
  `adresse_adh` varchar(400) DEFAULT NULL,
  `codePostal_adh` varchar(5) DEFAULT NULL,
  `tel_adh` varchar(20) DEFAULT NULL,
  `tel2_adh` varchar(20) DEFAULT NULL,
  `mail_adh` varchar(400) DEFAULT NULL,
  `conseil_adh` tinyint(1) DEFAULT NULL,
  `comite_adh` tinyint(1) DEFAULT NULL,
  `ville_adh` varchar(50) DEFAULT NULL,
  `commentaire` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`id_adh`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Data for the table `adherent_adh` */

insert  into `adherent_adh`(`id_adh`,`nom_adh`,`prenom_adh`,`adresse_adh`,`codePostal_adh`,`tel_adh`,`tel2_adh`,`mail_adh`,`conseil_adh`,`comite_adh`,`ville_adh`,`commentaire`) values (1,'charfaoui','noujoud','50 rue kk ',NULL,'07598654',NULL,'ch@hhs.com',0,0,NULL,NULL),(2,'kadioui','hanaa','17 rue ligier',NULL,'02598756',NULL,'kad@hji.fr',NULL,NULL,NULL,NULL),(3,'dontknow','hugo','2 rue haven',NULL,'89745635',NULL,'hug@jj.fr',NULL,NULL,NULL,NULL),(4,'courbu','daniel','3 rue la vie',NULL,'12345678',NULL,'dan<àdd.com',NULL,NULL,NULL,NULL),(5,'t@t#o','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

/*Table structure for table `classe_cls` */

DROP TABLE IF EXISTS `classe_cls`;

CREATE TABLE `classe_cls` (
  `id_cls` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `libelle_cls` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_cls`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Data for the table `classe_cls` */

insert  into `classe_cls`(`id_cls`,`libelle_cls`) values (1,'2nde'),(2,'1ere S'),(3,'1ere ES'),(4,'1ere L'),(5,'Terminale S'),(6,'Terminale L'),(7,'Terminale ES'),(8,'1ere SI'),(9,'Terminale SI');

/*Table structure for table `editeur_edt` */

DROP TABLE IF EXISTS `editeur_edt`;

CREATE TABLE `editeur_edt` (
  `id_edt` int(4) NOT NULL AUTO_INCREMENT,
  `nom_edt` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id_edt`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `editeur_edt` */

insert  into `editeur_edt`(`id_edt`,`nom_edt`) values (1,'Hachette'),(2,'Hattier'),(3,'Bordas'),(4,'Nathan'),(5,'Belin'),(6,'Retz'),(7,'Magnard');

/*Table structure for table `eleve_elv` */

DROP TABLE IF EXISTS `eleve_elv`;

CREATE TABLE `eleve_elv` (
  `id_elv` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nom_elv` varchar(10) NOT NULL,
  `prenom_elv` varchar(100) NOT NULL,
  `tel_elv` varchar(20) DEFAULT NULL,
  `mail_elv` varchar(100) DEFAULT NULL,
  `id_adh` int(10) unsigned DEFAULT NULL,
  `remarque_elv` varchar(400) DEFAULT NULL,
  `datenaissance_elv` date DEFAULT NULL,
  PRIMARY KEY (`id_elv`),
  KEY `FK_elv_adh` (`id_adh`),
  CONSTRAINT `FK_elv_adh` FOREIGN KEY (`id_adh`) REFERENCES `adherent_adh` (`id_adh`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Data for the table `eleve_elv` */

insert  into `eleve_elv`(`id_elv`,`nom_elv`,`prenom_elv`,`tel_elv`,`mail_elv`,`id_adh`,`remarque_elv`,`datenaissance_elv`) values (1,'Charfaoui','karam','011111111','adherent1@adherent1.adh',1,'','2017-04-15'),(2,'Bokreta','Leila','022222222','adherent1@adherent1.adh',1,NULL,'2016-04-16'),(3,'Birou','Hugo','033333333','adherent2@adherent2.adh',2,NULL,NULL),(4,'Couvrat','Gautier','044444444','adherent2@adherent2.adh',2,NULL,'2017-04-02'),(5,'Corbu','Daniel','055555555','adherent2@adherent2.adh',2,NULL,'2017-10-20'),(7,'Khomany','Anice','066666666','sansadherent@sansadherent.adh',NULL,NULL,'2015-12-23'),(8,'BERGERON','Marine','077777777','sansadherent@sansadherent.adh',NULL,'','2016-04-16'),(9,'BIROU','Hugo','088888888','sansadherent@sansadherent.adh',NULL,'','1192-04-12');

/*Table structure for table `etat_eta` */

DROP TABLE IF EXISTS `etat_eta`;

CREATE TABLE `etat_eta` (
  `id_eta` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `libelle_eta` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_eta`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Data for the table `etat_eta` */

insert  into `etat_eta`(`id_eta`,`libelle_eta`) values (1,'Neuf'),(2,'Très bon'),(3,'Bon'),(4,'Moyen');

/*Table structure for table `histo_lvr_eta_hle` */

DROP TABLE IF EXISTS `histo_lvr_eta_hle`;

CREATE TABLE `histo_lvr_eta_hle` (
  `id_hle` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_lvr` int(10) unsigned NOT NULL,
  `id_eta` int(10) unsigned NOT NULL,
  `date_hle` date DEFAULT NULL,
  PRIMARY KEY (`id_hle`),
  KEY `FK_HLE_LVR` (`id_lvr`),
  KEY `FK_HLE_ETA` (`id_eta`),
  CONSTRAINT `FK_HLE_ETA` FOREIGN KEY (`id_eta`) REFERENCES `etat_eta` (`id_eta`),
  CONSTRAINT `FK_HLE_LVR` FOREIGN KEY (`id_lvr`) REFERENCES `livre_lvr` (`id_lvr`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `histo_lvr_eta_hle` */

/*Table structure for table `livre_lvr` */

DROP TABLE IF EXISTS `livre_lvr`;

CREATE TABLE `livre_lvr` (
  `id_lvr` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_eta` int(10) unsigned DEFAULT NULL,
  `id_rlv` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id_lvr`),
  KEY `FK_livre_lvr` (`id_eta`),
  KEY `FK_rvl_rlv` (`id_rlv`),
  CONSTRAINT `FK_livre_lvr` FOREIGN KEY (`id_eta`) REFERENCES `etat_eta` (`id_eta`),
  CONSTRAINT `FK_rvl_rlv` FOREIGN KEY (`id_rlv`) REFERENCES `ref_livre_rlv` (`id_rlv`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Data for the table `livre_lvr` */

/*Data for the table `livre_lvr` */

insert  into `livre_lvr`(`id_lvr`,`id_eta`,`id_rlv`) values (1,1,3),(2,2,1),(3,3,1),(4,2,4),(5,1,4),(6,4,4),(7,2,1),(8,1,1),(9,3,4),(10,1,4),(11,2,2),(12,2,2),(13,3,4),(14,1,3),(15,4,1),(16,2,1),(17,4,4),(18,1,2),(19,1,1),(20,2,2),(21,1,1),(22,2,1),(23,3,1),(24,1,1),(25,2,1),(26,2,2),(27,2,2),(28,2,2),(29,1,3),(30,1,3),(31,3,3),(32,4,3),(33,4,3),(34,4,4),(35,4,4),(36,1,4),(37,1,4),(38,1,5),(39,2,5),(40,2,5),(41,3,5),(42,1,6),(43,2,6),(44,3,6),(45,4,6),(46,4,6),(47,1,7),(48,1,7),(49,1,8),(50,1,8),(51,1,9),(52,1,9),(53,1,10),(54,1,11),(55,2,11),(56,2,10),(57,2,10),(58,4,10),(59,4,11),(60,3,11),(61,1,11),(62,2,11),(63,2,12),(64,3,12),(65,4,12),(66,1,12),(67,1,12),(68,1,13),(69,1,13),(70,2,13),(71,3,13),(72,4,13),(73,4,13),(74,1,14),(75,1,14),(76,2,14),(77,3,14),(78,3,15),(79,3,15),(80,4,15),(82,4,15),(83,1,15),(84,1,15),(85,1,16),(86,1,16),(87,2,16),(88,3,16),(89,4,16),(90,1,17),(91,2,17),(92,3,17),(93,3,17),(94,3,17),(95,4,18),(96,1,19),(97,1,19),(98,2,19),(99,3,19),(100,1,20),(101,2,20),(102,1,20),(103,2,20),(104,1,21),(105,1,21),(106,2,21),(107,2,21),(108,3,21),(109,4,21),(110,4,22),(111,1,22),(112,2,22),(113,3,22),(114,4,22),(115,1,23),(116,1,23),(117,2,23),(118,3,23),(119,4,23),(120,4,23),(121,1,24),(122,2,24),(123,3,24),(125,4,24),(126,1,24),(127,2,24),(128,1,25),(129,3,25),(130,1,25),(131,1,25),(132,2,25),(133,3,25),(134,1,26),(135,1,26),(136,3,26),(137,4,26),(138,1,26),(139,3,26),(140,2,26),(141,1,26),(142,3,26),(143,1,26),(144,1,27),(145,1,25),(146,2,26),(147,4,26),(148,4,27),(149,1,27),(150,4,27),(151,2,27),(152,1,28),(153,2,28),(154,3,28),(155,4,28),(156,4,28),(157,3,28),(158,1,29),(159,1,29),(160,2,29),(161,3,29),(162,4,29),(163,1,29),(164,1,30),(165,1,30),(166,2,30),(167,2,30),(168,3,30),(169,4,30),(170,4,30),(171,3,30),(172,1,30),(173,2,30);

/*Table structure for table `matiere_mat` */

DROP TABLE IF EXISTS `matiere_mat`;

CREATE TABLE `matiere_mat` (
  `id_mat` int(10) NOT NULL AUTO_INCREMENT,
  `libelle_mat` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_mat`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `matiere_mat` */

insert  into `matiere_mat`(`id_mat`,`libelle_mat`) values (1,'Anglais'),(2,'Mathématiques'),(3,'Physique/Chimie'),(4,'Français'),(5,'Sciences économiques et sociales'),(6,'Philosophie');

/*Table structure for table `ref_livre_rlv` */

DROP TABLE IF EXISTS `ref_livre_rlv`;

CREATE TABLE `ref_livre_rlv` (
  `id_rlv` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `libelle_rlv` varchar(300) DEFAULT NULL,
  `id_edt` int(4) DEFAULT NULL,
  `auteur_rlv` varchar(200) DEFAULT NULL,
  `id_mat` int(10) DEFAULT NULL,
  `isbn_rlv` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_rlv`),
  KEY `FK_rlv_edt` (`id_edt`),
  KEY `FK2` (`id_mat`),
  CONSTRAINT `FK2` FOREIGN KEY (`id_mat`) REFERENCES `matiere_mat` (`id_mat`),
  CONSTRAINT `FK_rlv_edt` FOREIGN KEY (`id_edt`) REFERENCES `editeur_edt` (`id_edt`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Data for the table `ref_livre_rlv` */

insert  into `ref_livre_rlv`(`id_rlv`,`libelle_rlv`,`id_edt`,`auteur_rlv`,`id_mat`,`isbn_rlv`) values (1,'Anglais 2nde',1,'AUTEUR',1,'LVRN01MAT1EDT1'),(2,'Anglais 1ere',1,'AUTEUR',1,'LVRN02MAT1EDT1'),(3,'Anglais Terminale',1,'AUTEUR',1,'LVRN03MAT1EDT1'),(4,'Anglais 3e Langue',1,'AUTEUR',1,'LVRN04MAT1EDT1'),(5,'Physique/Chimie 2nd',2,'AUTEUR',3,'LVRN05MAT1EDT1'),(6,'Physique/Chimie 1ère ES/L',2,'AUTEUR',3,'LVRN06MAT1EDT1'),(7,'Physique 1ere S',2,'AUTEUR',3,'LVRN07MAT1EDT1'),(8,'Chimie 1ere S',2,'AUTEUR',3,'LVRN08MAT1EDT1'),(9,'Physique Terminale S',2,'AUTEUR',3,'LVRN01MAT1EDT1'),(10,'Chimie Terminale S',2,'AUTEUR',3,'LVRN01MAT1EDT1'),(11,'Mathématiques Terminale S',3,'AUTEUR',2,'LVRN01MAT1EDT1'),(12,'Mathématiques 1ere S',3,'AUTEUR',2,'LVRN01MAT1EDT1'),(13,'Mathématiques 2nde',3,'AUTEUR',2,'LVRN01MAT1EDT1'),(14,'Mathématiques 1ere L',3,'AUTEUR',2,'LVRN01MAT1EDT1'),(15,'Mathématiques 1ere ES',3,'AUTEUR',2,'LVRN01MAT1EDT1'),(16,'Mathématiques Spe ES',3,'AUTEUR',2,'LVRN01MAT1EDT1'),(17,'Mathématiques Spe S',3,'AUTEUR',2,'LVRN01MAT1EDT1'),(18,'Français 2nde',4,'AUTEUR',4,'LVRN01MAT1EDT1'),(19,'Français 1ere S',4,'AUTEUR',4,'LVRN01MAT1EDT1'),(20,'Français 1ere L',4,'AUTEUR',4,'LVRN01MAT1EDT1'),(21,'Français 1ere ES',4,'AUTEUR',4,'LVRN01MAT1EDT1'),(22,'Français Terminale L Spe',4,'AUTEUR',4,'LVRN01MAT1EDT1'),(23,'Français Terminale L',4,'AUTEUR',4,'LVRN01MAT1EDT1'),(24,'Philosophie Terminale S/ES',5,'AUTEUR',6,'LVRN01MAT1EDT1'),(25,'Philosophie Terminale L',5,'AUTEUR',6,'LVRN01MAT1EDT1'),(26,'Philosophie Terminale Spe',5,'AUTEUR',6,'LVRN01MAT1EDT1'),(27,'Sciences économiqes et sociales 2nde',6,'AUTEUR',5,'LVRN01MAT1EDT1'),(28,'Sciences économiqes et sociales 1ere',6,'AUTEUR',5,'LVRN01MAT1EDT1'),(29,'Sciences économiqes et sociales Terminale',6,'AUTEUR',5,'LVRN01MAT1EDT1'),(30,'Sciences de l\'ingenieur Terminale',7,'AUTEUR',2,'LVRN01MAT1EDT1');

/*Table structure for table `ref_prix_livre_rpl` */

DROP TABLE IF EXISTS `ref_prix_livre_rpl`;

CREATE TABLE `ref_prix_livre_rpl` (
  `id_rpl` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_eta` int(10) unsigned DEFAULT NULL,
  `id_rlv` int(10) unsigned DEFAULT NULL,
  `prix_rpl` double DEFAULT NULL,
  `annee_rpl` year(4) DEFAULT NULL,
  PRIMARY KEY (`id_rpl`),
  KEY `FK_rpl_rlv` (`id_rlv`),
  KEY `FK_rpl_eta` (`id_eta`),
  CONSTRAINT `FK_rpl_eta` FOREIGN KEY (`id_eta`) REFERENCES `etat_eta` (`id_eta`),
  CONSTRAINT `FK_rpl_rlv` FOREIGN KEY (`id_rlv`) REFERENCES `ref_livre_rlv` (`id_rlv`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Data for the table `ref_prix_livre_rpl` */

insert  into `ref_prix_livre_rpl`(`id_rpl`,`id_eta`,`id_rlv`,`prix_rpl`,`annee_rpl`) values (1,1,1,25,2000),(2,2,1,30,2011),(3,3,4,28,2000),(4,1,4,15,2003);

/*Table structure for table `reglement_rgl` */

DROP TABLE IF EXISTS `reglement_rgl`;

CREATE TABLE `reglement_rgl` (
  `id_rgl` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `libelle_rgl` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_rgl`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `reglement_rgl` */

insert  into `reglement_rgl`(`id_rgl`,`libelle_rgl`) values (1,'Chèque'),(2,'Carte bancaire VISA'),(3,'Carte bancaire MasterCard'),(4,'Carte bancaire Autres'),(5,'Troc'),(6,'Espèces'),(7,'En nature'),(8,'Non orthodoxe (-18)'),(9,'Poulets');

/*Table structure for table `rel_cls_rlv_rcr` */

DROP TABLE IF EXISTS `rel_cls_rlv_rcr`;

CREATE TABLE `rel_cls_rlv_rcr` (
  `id_rcr` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_cls` int(10) unsigned DEFAULT NULL,
  `id_rlv` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id_rcr`),
  KEY `FK_cls_rlv` (`id_cls`),
  KEY `FK_rel_cls_rlv_rcr` (`id_rlv`),
  CONSTRAINT `FK_cls_rlv` FOREIGN KEY (`id_cls`) REFERENCES `classe_cls` (`id_cls`),
  CONSTRAINT `FK_rel_cls_rlv_rcr` FOREIGN KEY (`id_rlv`) REFERENCES `ref_livre_rlv` (`id_rlv`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Data for the table `rel_cls_rlv_rcr` */

insert  into `rel_cls_rlv_rcr`(`id_rcr`,`id_cls`,`id_rlv`) values (8,1,1),(9,2,2),(10,3,2),(11,4,2),(12,5,3),(13,6,3),(14,7,3),(15,9,3),(16,6,4),(17,5,4),(18,7,4),(19,9,4),(20,1,5),(21,3,6),(22,4,6),(23,2,7),(24,2,8),(25,5,9),(26,5,10),(27,5,11),(28,2,12),(29,1,13),(30,4,14),(31,7,15),(32,2,16),(33,3,17),(34,1,18),(35,2,19),(36,4,20),(37,3,21),(38,6,22),(39,6,23),(40,5,24),(41,6,24),(42,9,24),(43,6,25),(44,5,26),(45,6,26),(46,7,26),(47,9,26),(48,1,27),(49,3,28),(50,7,29),(51,5,30),(52,9,30);

/*Table structure for table `rel_elv_cls_rec` */

DROP TABLE IF EXISTS `rel_elv_cls_rec`;

CREATE TABLE `rel_elv_cls_rec` (
  `id_rec` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_cls` int(10) unsigned DEFAULT NULL,
  `id_elv` int(10) unsigned DEFAULT NULL,
  `annee_rec` year(4) DEFAULT NULL,
  PRIMARY KEY (`id_rec`),
  KEY `FK_rec_cls` (`id_cls`),
  KEY `FK_rec_elv` (`id_elv`),
  CONSTRAINT `FK_rec_cls` FOREIGN KEY (`id_cls`) REFERENCES `classe_cls` (`id_cls`),
  CONSTRAINT `FK_rec_elv` FOREIGN KEY (`id_elv`) REFERENCES `eleve_elv` (`id_elv`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Data for the table `rel_elv_cls_rec` */

insert  into `rel_elv_cls_rec`(`id_rec`,`id_cls`,`id_elv`,`annee_rec`) values (5,1,1,2010),(6,1,1,2011),(7,2,1,2012),(8,5,1,2013),(9,1,2,2010),(10,3,2,2011),(11,7,2,2012),(12,1,3,2010),(13,4,3,2011),(14,6,3,2012),(15,6,3,2013),(16,6,3,2013),(17,1,4,2010),(18,1,5,2010),(22,1,7,2010),(23,1,8,2010),(24,1,9,2010),(25,2,9,2011),(26,5,9,2012),(27,3,8,2011),(28,7,8,2012),(29,4,7,2011),(30,6,7,2012),(31,3,5,2011),(32,7,5,2012),(33,1,4,2010),(34,2,4,2011),(35,5,4,2012),(36,7,4,2013),(37,7,4,2014);

/*Table structure for table `rel_lvr_elv_rle` */

DROP TABLE IF EXISTS `rel_lvr_elv_rle`;

CREATE TABLE `rel_lvr_elv_rle` (
  `id_rle` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_elv` int(10) unsigned NOT NULL,
  `id_lvr` int(10) unsigned NOT NULL,
  `date_vente_rle` date DEFAULT NULL,
  `date_rachat_rle` date DEFAULT NULL,
  PRIMARY KEY (`id_rle`),
  KEY `FK_RLE_ELV` (`id_elv`),
  KEY `FK_RLE_LVR` (`id_lvr`),
  CONSTRAINT `FK_RLE_ELV` FOREIGN KEY (`id_elv`) REFERENCES `eleve_elv` (`id_elv`),
  CONSTRAINT `FK_RLE_LVR` FOREIGN KEY (`id_lvr`) REFERENCES `livre_lvr` (`id_lvr`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

/*Data for the table `rel_lvr_elv_rle` */

insert  into `rel_lvr_elv_rle`(`id_rle`,`id_elv`,`id_lvr`,`date_vente_rle`,`date_rachat_rle`) values (1,1,1,'2017-02-01',NULL),(2,1,2,'2017-04-05',NULL),(3,1,3,'2017-04-13',NULL),(4,1,4,'2017-04-13',NULL),(5,1,5,'2017-04-15',NULL),(6,3,6,'2017-04-07',NULL),(7,4,7,'2017-04-09',NULL),(8,4,8,'2017-04-03',NULL),(9,4,11,'2017-04-23','2017-07-22'),(17,5,12,'2017-04-09','2017-06-21'),(21,1,9,'2017-04-20',NULL),(22,2,10,'2017-04-03',NULL);

/*Table structure for table `utilisateur_usr` */

DROP TABLE IF EXISTS `utilisateur_usr`;

CREATE TABLE `utilisateur_usr` (
  `id_usr` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `mdp_usr` varchar(100) DEFAULT NULL,
  `nom_usr` varchar(100) DEFAULT NULL,
  `sel_usr` varchar(100) DEFAULT NULL,
  `role_usr` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_usr`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `utilisateur_usr` */

insert  into `utilisateur_usr`(`id_usr`,`mdp_usr`,`nom_usr`,`sel_usr`,`role_usr`) values (1,'admin','admin','selsel','admin'),(2,'autre','autre','lesles','autre');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

CREATE USER 'bal_user'@'localhost' IDENTIFIED WITH mysql_native_password;GRANT ALL PRIVILEGES ON *.* TO 'bal_user'@'localhost' REQUIRE NONE WITH GRANT OPTION MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;SET PASSWORD FOR 'bal_user'@'localhost' = '';
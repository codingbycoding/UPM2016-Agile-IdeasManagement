CREATE DATABASE  IF NOT EXISTS `public` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `public`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: public
-- ------------------------------------------------------
-- Server version	5.7.16-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ideas`
--

DROP TABLE IF EXISTS `ideas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ideas` (
  `idideas` int(11) NOT NULL AUTO_INCREMENT,
  `idcreator` int(11) DEFAULT NULL,
  `ideatitle` varchar(1000) NOT NULL,
  `ideadescription` varchar(1000) NOT NULL,
  `health` varchar(45) NOT NULL DEFAULT '0' COMMENT '0 false\n1 true',
  `social` varchar(45) NOT NULL DEFAULT '0' COMMENT '0 false\n1 true',
  `economic` varchar(45) NOT NULL DEFAULT '0' COMMENT '0 false\n1 true',
  `cientific` varchar(45) NOT NULL DEFAULT '0' COMMENT '0 false\n1 true',
  `educational` varchar(45) NOT NULL DEFAULT '0' COMMENT '0 false\n1 true',
  `business` varchar(45) NOT NULL DEFAULT '0' COMMENT '0 false\n1 true',
  `finance` varchar(45) NOT NULL DEFAULT '0' COMMENT '0 false\n1 true',
  `personal` varchar(45) NOT NULL DEFAULT '0' COMMENT '0 false\n1 true',
  PRIMARY KEY (`idideas`),
  UNIQUE KEY `idideas_UNIQUE` (`idideas`),
  KEY `creator_idx` (`idcreator`),
  CONSTRAINT `creator` FOREIGN KEY (`idcreator`) REFERENCES `users` (`idusers`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ideas`
--

LOCK TABLES `ideas` WRITE;
/*!40000 ALTER TABLE `ideas` DISABLE KEYS */;
INSERT INTO `ideas` VALUES (1,2,'Idea One','Description One','0','1','0','1','0','0','0','0'),(2,2,'Idea Two','Description Two','0','0','1','1','0','0','0','0'),(3,2,'Idea Three','Description Three','0','0','0','0','0','0','1','1'),(4,3,'Idea Four','Description Four','1','1','0','0','0','0','0','0');
/*!40000 ALTER TABLE `ideas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-17 15:01:40

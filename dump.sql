-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: localhost    Database: quillHash
-- ------------------------------------------------------
-- Server version	5.7.29-0ubuntu0.18.04.1

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
-- Current Database: `quillHash`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `quillHash` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `quillHash`;

--
-- Table structure for table `blockedDetails`
--

DROP TABLE IF EXISTS `blockedDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blockedDetails` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `IdOfUserThatBlocked` bigint(20) DEFAULT NULL,
  `blockedUser` varchar(100) DEFAULT NULL,
  `blockedByUSer` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IdOfUserThatBlocked` (`IdOfUserThatBlocked`),
  CONSTRAINT `blockedDetails_ibfk_1` FOREIGN KEY (`IdOfUserThatBlocked`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blockedDetails`
--

LOCK TABLES `blockedDetails` WRITE;
/*!40000 ALTER TABLE `blockedDetails` DISABLE KEYS */;
INSERT INTO `blockedDetails` VALUES (1,4,'sam',' nav'),(2,1,'shruti','sam'),(3,4,'sam',' nav');
/*!40000 ALTER TABLE `blockedDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `userId` bigint(20) NOT NULL AUTO_INCREMENT,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'$2a$10$elYAhP6H27.mJesVFnzp5eEp.HH5DTGJqumTVF6.rKl6gdcGPAF2O','s@s','sam','d529b115f9fcca199438568fd6e1a24f'),(2,'$2a$10$wlA4.E7vj22uJF0llhHIoOOKaNuF0chMYuAcdgdK36KKDxhm.WlFS','s@k','shruti','f48130914bb090542a11ff18a2463d6d'),(3,'$2a$10$fZEtidAZYuIZP2r/6sOPdeNeJHQTxKILJhhtmNSn1qY/E3FuMZduS','p@p','priyansu','ac78b322a253db6b92e4f65b85505e13'),(4,'$2a$10$LA7jPglnxRbpjvqjf/gAiu5hdXazbDayvxmthxi8QDfofBSClV7t.','n@n',' nav','20c0c367ba06ae5dcb3bcedaba842319'),(5,'$2a$10$um94mMV1nW5s/XP1n606G.CWojcpBE8kJ8zMT2N8GWTnU5rTVpp6W','a@k','abhishek','d8132fae751e61c1c83f327326afef2d'),(6,'$2a$10$f9WnGjWMw2ULlsJq9QArA.wZe0zzW6zslnTGXerxgyNjOjNftFAB6','a@a','aryan','4eb38829bc3db478c41a026fd4519d05'),(7,'$2a$10$XajBsLWqT19flaQkhE8/HelMwjSA3FibVrLYcN3qruutWAl/iT73O','t@p','tanu','8dddba743b3b44a961001ea925027c2b'),(8,'$2a$10$InxkLhqpzAU3hfU/Uyz3qeiRryWTeKnFypJEuYHUlEK/0A4VHWpoW','v@g','vidhi','30f7f3a42980f2711f1062a7a6428ec2'),(9,'$2a$10$r/Ie9pwJOITmLB/jUSvshOginNg7p7kNnlEJ.YitFx1eVCVga6Vza','a@m','archit','ccb9fe3df996de154d95af3619d0692a'),(10,'$2a$10$wfg.u5D8HkE7Wl.HZNGa/O8tGgybJ7KkVYYAiPg5vwXOPOdyPgv.C','d@g','divyanshi','b2b741c4bd176f05dd9a1b880427b1d9');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-25 11:54:25

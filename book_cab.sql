-- MySQL dump 10.13  Distrib 5.7.17, for osx10.12 (x86_64)
--
-- Host: localhost    Database: book_cab
-- ------------------------------------------------------
-- Server version	5.7.17

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
-- Table structure for table `cab_request_details`
--
DROP DATABASE IF EXISTS `book_cab`;
CREATE DATABASE `book_cab`;
USE `book_cab`;

DROP TABLE IF EXISTS `cab_request_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cab_request_details` (
  `cr_id` int(11) NOT NULL AUTO_INCREMENT,
  `cr_status` enum('Waiting','Ongoing','Complete') NOT NULL DEFAULT 'Waiting',
  `cr_customer_id` int(11) NOT NULL,
  `cr_driver_id` int(11) DEFAULT NULL,
  `cr_requested_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cr_request_accepted_time` datetime DEFAULT NULL,
  `cr_request_completed_time` datetime DEFAULT NULL,
  PRIMARY KEY (`cr_id`),
  KEY `cr_user_id_idx` (`cr_customer_id`),
  KEY `cr_driver_id_idx` (`cr_driver_id`),
  CONSTRAINT `cr_customer_id` FOREIGN KEY (`cr_customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cr_driver_id` FOREIGN KEY (`cr_driver_id`) REFERENCES `driver` (`driver_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cab_request_details`
--

LOCK TABLES `cab_request_details` WRITE;
/*!40000 ALTER TABLE `cab_request_details` DISABLE KEYS */;
INSERT INTO `cab_request_details` VALUES (49,'Complete',2,1,'2017-09-05 01:18:38','2017-09-05 01:19:45','2017-09-05 01:24:45'),(52,'Complete',6,1,'2017-09-05 01:18:50','2017-09-05 01:25:30','2017-09-05 01:30:31'),(53,'Complete',9,5,'2017-09-05 01:18:56','2017-09-05 01:19:39','2017-09-05 01:24:39'),(54,'Complete',14,2,'2017-09-05 01:19:01','2017-09-05 01:19:33','2017-09-05 01:24:33'),(55,'Complete',15,3,'2017-09-05 01:19:08','2017-09-05 01:19:49','2017-09-05 01:24:49'),(56,'Complete',16,4,'2017-09-05 01:19:22','2017-09-05 01:19:52','2017-09-05 01:24:52');
/*!40000 ALTER TABLE `cab_request_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(45) DEFAULT NULL,
  `customer_number` varchar(10) NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `customer_number_UNIQUE` (`customer_number`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (2,'Swapnil','8976543210'),(6,'Aryan','9876567654'),(8,'asdfghjkl','8976543212'),(9,'qwertyu','8716244231'),(10,'qwertyu','8716644231'),(13,'gtfrdesw','9235499884'),(14,'qwerty','9785132465'),(15,'tdfjghk','9785132463'),(16,'kjgvsigv','9876543765');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driver`
--

DROP TABLE IF EXISTS `driver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `driver` (
  `driver_id` int(11) NOT NULL AUTO_INCREMENT,
  `driver_phone_number` varchar(10) NOT NULL,
  `driver_name` varchar(45) NOT NULL,
  PRIMARY KEY (`driver_id`),
  UNIQUE KEY `driver_phone_number_UNIQUE` (`driver_phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver`
--

LOCK TABLES `driver` WRITE;
/*!40000 ALTER TABLE `driver` DISABLE KEYS */;
INSERT INTO `driver` VALUES (1,'9876543210','Driver 1'),(2,'9876543211','Driver 2'),(3,'9876543212','Driver 3'),(4,'9876543213','Driver 4'),(5,'9876543214','Driver 5');
/*!40000 ALTER TABLE `driver` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-09-05  1:43:01

-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: JobApplicationSystem
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `applicant`
--

DROP TABLE IF EXISTS `applicant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `applicant` (
  `Applicant_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Applicant_Name` varchar(100) NOT NULL,
  `Contact_Info` varchar(100) NOT NULL,
  PRIMARY KEY (`Applicant_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applicant`
--

LOCK TABLES `applicant` WRITE;
/*!40000 ALTER TABLE `applicant` DISABLE KEYS */;
INSERT INTO `applicant` VALUES (1,'John Doe','john.doe@example.com'),(2,'Jane Smith','jane.smith@example.com');
/*!40000 ALTER TABLE `applicant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documents` (
  `Documents_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Applicant_ID` int(11) NOT NULL,
  `Type` varchar(50) NOT NULL,
  `Content` text NOT NULL,
  PRIMARY KEY (`Documents_ID`),
  KEY `Applicant_ID` (`Applicant_ID`),
  CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`Applicant_ID`) REFERENCES `applicant` (`Applicant_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` VALUES (1,1,'Resume','John Doe Resume Content'),(2,2,'Cover Letter','Jane Smith Cover Letter Content');
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interview`
--

DROP TABLE IF EXISTS `interview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interview` (
  `Interview_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Interviewer_ID` int(11) NOT NULL,
  `Job_ID` int(11) NOT NULL,
  `Time` time NOT NULL,
  `Date` date NOT NULL,
  PRIMARY KEY (`Interview_ID`),
  KEY `Job_ID` (`Job_ID`),
  CONSTRAINT `interview_ibfk_1` FOREIGN KEY (`Job_ID`) REFERENCES `job` (`Job_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interview`
--

LOCK TABLES `interview` WRITE;
/*!40000 ALTER TABLE `interview` DISABLE KEYS */;
INSERT INTO `interview` VALUES (1,101,1,'10:00:00','2023-10-10'),(2,102,2,'14:00:00','2023-10-12');
/*!40000 ALTER TABLE `interview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job`
--

DROP TABLE IF EXISTS `job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job` (
  `Job_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Job_Title` varchar(100) NOT NULL,
  `Job_Description` text DEFAULT NULL,
  `Salary` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`Job_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job`
--

LOCK TABLES `job` WRITE;
/*!40000 ALTER TABLE `job` DISABLE KEYS */;
INSERT INTO `job` VALUES (1,'Software Engineer','Develop and maintain software applications.',NULL),(2,'Data Analyst','Analyze data and generate insights.',NULL);
/*!40000 ALTER TABLE `job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_offer`
--

DROP TABLE IF EXISTS `job_offer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_offer` (
  `Offer_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Job_ID` int(11) NOT NULL,
  `Applicant_ID` int(11) NOT NULL,
  `Status` enum('Pending','Accepted','Rejected') DEFAULT 'Pending',
  `Date` date NOT NULL,
  PRIMARY KEY (`Offer_ID`),
  KEY `Job_ID` (`Job_ID`),
  KEY `Applicant_ID` (`Applicant_ID`),
  CONSTRAINT `job_offer_ibfk_1` FOREIGN KEY (`Job_ID`) REFERENCES `job` (`Job_ID`),
  CONSTRAINT `job_offer_ibfk_2` FOREIGN KEY (`Applicant_ID`) REFERENCES `applicant` (`Applicant_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_offer`
--

LOCK TABLES `job_offer` WRITE;
/*!40000 ALTER TABLE `job_offer` DISABLE KEYS */;
INSERT INTO `job_offer` VALUES (1,1,1,'Pending','2023-10-15'),(2,2,2,'Accepted','2023-10-20');
/*!40000 ALTER TABLE `job_offer` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER UpdateJobOfferStatusNotification
AFTER UPDATE ON Job_Offer
FOR EACH ROW
BEGIN
    DECLARE NotificationMessage TEXT;
    IF NEW.Status <> OLD.Status THEN
        SET NotificationMessage = CONCAT('Your job offer for Job ID ', NEW.Job_ID, ' is now ', NEW.Status);
        INSERT INTO Documents (Applicant_ID, Type, Content)
        VALUES (NEW.Applicant_ID, 'Notification', NotificationMessage);
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-25 22:26:45

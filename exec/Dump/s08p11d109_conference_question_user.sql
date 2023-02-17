-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 3.36.49.147    Database: s08p11d109
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `conference_question_user`
--

DROP TABLE IF EXISTS `conference_question_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conference_question_user` (
  `conference_question_pk` int NOT NULL,
  `user_pk` int NOT NULL,
  PRIMARY KEY (`conference_question_pk`,`user_pk`),
  KEY `user_pk` (`user_pk`),
  CONSTRAINT `conference_question_user_ibfk_1` FOREIGN KEY (`conference_question_pk`) REFERENCES `conference_question` (`conference_question_pk`) ON DELETE CASCADE,
  CONSTRAINT `conference_question_user_ibfk_2` FOREIGN KEY (`user_pk`) REFERENCES `conference-user` (`user_pk`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conference_question_user`
--

LOCK TABLES `conference_question_user` WRITE;
/*!40000 ALTER TABLE `conference_question_user` DISABLE KEYS */;
INSERT INTO `conference_question_user` VALUES (3719,1),(3720,1),(3581,2),(3587,2),(3654,2),(3581,98),(3587,98),(3681,101),(3683,101),(3685,101),(3686,101),(3687,101),(3689,101),(3709,101),(3686,102),(3687,102),(3688,102),(3693,103),(3695,103),(3697,103),(3701,103),(3723,103),(3685,104),(3687,104),(3714,104),(3717,104),(3718,104),(3703,107),(3705,107);
/*!40000 ALTER TABLE `conference_question_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  9:14:30

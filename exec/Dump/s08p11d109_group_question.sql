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
-- Table structure for table `group_question`
--

DROP TABLE IF EXISTS `group_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_question` (
  `group_question_pk` int NOT NULL AUTO_INCREMENT,
  `group_question_title` varchar(100) NOT NULL,
  `group_question_contents` varchar(500) NOT NULL,
  `group_question_date` date NOT NULL,
  `group_question_update` tinyint NOT NULL DEFAULT '0',
  `group_question_like` int NOT NULL DEFAULT '0',
  `group_pk` int NOT NULL,
  `user_pk` int NOT NULL,
  PRIMARY KEY (`group_question_pk`),
  UNIQUE KEY `group_question_pk_UNIQUE` (`group_question_pk`),
  KEY `group_question.group_pk_idx` (`group_pk`),
  KEY `group_question.user_pk_idx` (`user_pk`),
  CONSTRAINT `group_question.group_pk` FOREIGN KEY (`group_pk`) REFERENCES `group-user` (`group_pk`) ON DELETE CASCADE,
  CONSTRAINT `group_question.user_pk` FOREIGN KEY (`user_pk`) REFERENCES `group-user` (`user_pk`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2027 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_question`
--

LOCK TABLES `group_question` WRITE;
/*!40000 ALTER TABLE `group_question` DISABLE KEYS */;
INSERT INTO `group_question` VALUES (1998,'string','string','2023-02-09',0,0,0,0),(2008,'1234 만든 좋아요','ㅇㅇㅇㅇ','2023-02-10',0,0,117,71),(2015,'123','123','2023-02-15',0,0,122,101),(2016,'질문입니다','질문에 대한 답변을 부탁드립니다','2023-02-15',0,0,120,97),(2017,'오늘 아침식사 메뉴는 뭔가요','궁금합니다','2023-02-15',0,0,126,103),(2020,'dsdf','sdfsdf','2023-02-16',0,0,137,101),(2021,'sdfsf','sfsfsd','2023-02-16',0,0,136,101),(2024,'글111','내용1111','2023-02-16',1,0,142,2),(2025,'질문입니다','물음에 답하여주시기 바랍니다','2023-02-16',0,0,127,103),(2026,'질문합니다','질문의 내용입니다','2023-02-16',0,0,143,103);
/*!40000 ALTER TABLE `group_question` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  9:14:31

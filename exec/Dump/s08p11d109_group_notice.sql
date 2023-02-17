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
-- Table structure for table `group_notice`
--

DROP TABLE IF EXISTS `group_notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_notice` (
  `group_notice_pk` int NOT NULL AUTO_INCREMENT,
  `group_notice_title` varchar(100) DEFAULT NULL,
  `group_notice_contents` varchar(500) DEFAULT NULL,
  `origin_filename` varchar(100) DEFAULT NULL,
  `db_filename` varchar(100) DEFAULT NULL,
  `group_notice_date` datetime NOT NULL,
  `group_pk` int NOT NULL,
  `user_pk` int NOT NULL,
  `group_notice_hit` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`group_notice_pk`),
  UNIQUE KEY `group_notice_pk_UNIQUE` (`group_notice_pk`),
  KEY `group_notice.user_pk_idx` (`user_pk`),
  KEY `group_notice.group_pk_idx` (`group_pk`),
  CONSTRAINT `group_notice.group_pk` FOREIGN KEY (`group_pk`) REFERENCES `group-user` (`group_pk`) ON DELETE CASCADE,
  CONSTRAINT `group_notice.user_pk` FOREIGN KEY (`user_pk`) REFERENCES `group-user` (`user_pk`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2941 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_notice`
--

LOCK TABLES `group_notice` WRITE;
/*!40000 ALTER TABLE `group_notice` DISABLE KEYS */;
INSERT INTO `group_notice` VALUES (2914,'string','string','string','string','2023-02-08 22:33:06',0,0,1),(2917,'ㄴㅇㅎ','ㅇㅎㅇ','','','2023-02-09 03:21:17',8,0,7),(2918,'ㅁㅁㅁ','ㅁㅁㅁㅁㅁ','','','2023-02-09 03:22:14',8,0,6),(2931,'공지사항입니다','테스트 공지사항을 작성중입니다','','','2023-02-15 06:49:32',120,97,0),(2932,'Lorem Ipsum','What is Lorem Ipsum?\nLorem Ipsum is simply dummy text of the printing and typesetting industry.','','','2023-02-15 07:21:39',120,97,1),(2933,'What is Lorem Ipsum?','What is Lorem Ipsum?\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.','','','2023-02-15 07:22:50',120,97,0),(2935,'이제부터 시시한 회의는 전부','금지안한다','','','2023-02-15 15:46:51',126,103,3),(2936,'sfdsd','sdfsdf','','','2023-02-16 08:14:05',136,101,1),(2938,'공지1','내용1\n\n1111','','','2023-02-16 12:38:01',142,1,2),(2939,'공지입니다','공지내용입니다','','','2023-02-16 13:07:54',127,103,2),(2940,'공지를 작성합니다','내용도 작성합니다','','','2023-02-16 15:35:02',143,103,1);
/*!40000 ALTER TABLE `group_notice` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  9:14:36

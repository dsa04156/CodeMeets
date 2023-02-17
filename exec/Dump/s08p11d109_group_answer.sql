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
-- Table structure for table `group_answer`
--

DROP TABLE IF EXISTS `group_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_answer` (
  `group_answer_pk` int NOT NULL AUTO_INCREMENT,
  `group_answer_contents` varchar(500) NOT NULL,
  `group_answer_date` date NOT NULL,
  `group_answer_update` tinyint NOT NULL DEFAULT '0',
  `group_answer_like` int NOT NULL,
  `group_question_pk` int NOT NULL,
  `user_pk` int NOT NULL,
  PRIMARY KEY (`group_answer_pk`),
  UNIQUE KEY `group_answer_pk_UNIQUE` (`group_answer_pk`),
  KEY `group_question.group_question_pk_idx` (`group_question_pk`),
  KEY `group-user.user_pk_idx` (`user_pk`),
  CONSTRAINT `group_answer.group_question_pk` FOREIGN KEY (`group_question_pk`) REFERENCES `group_question` (`group_question_pk`) ON DELETE CASCADE,
  CONSTRAINT `group_answer.user_pk` FOREIGN KEY (`user_pk`) REFERENCES `group-user` (`user_pk`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1827 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_answer`
--

LOCK TABLES `group_answer` WRITE;
/*!40000 ALTER TABLE `group_answer` DISABLE KEYS */;
INSERT INTO `group_answer` VALUES (1787,'1','2023-02-15',0,0,2015,101),(1788,'2','2023-02-15',0,0,2015,101),(1789,'3','2023-02-15',0,0,2015,101),(1790,'4','2023-02-15',0,0,2015,101),(1792,'답변1 입니다. 좋아요 감사합니다','2023-02-15',1,0,2016,97),(1793,'답변2 입니다','2023-02-15',0,0,2016,97),(1794,'답변3 입낟','2023-02-15',0,0,2016,97),(1795,'오늘 아침은 개구리반찬입니다','2023-02-15',0,0,2017,103),(1796,'수정정정정','2023-02-16',1,0,2020,101),(1802,'수정','2023-02-16',1,0,2020,101),(1803,'고침','2023-02-16',1,0,2020,101),(1805,'써도','2023-02-16',0,0,2020,101),(1806,'안지워짐','2023-02-16',0,0,2020,101),(1807,'댓글을','2023-02-16',0,0,2020,101),(1809,'바꿔서','2023-02-16',0,0,2020,101),(1810,'주세요','2023-02-16',0,0,2020,101),(1811,'고 쳤고','2023-02-16',0,0,2020,101),(1813,'2222','2023-02-16',0,0,2021,101),(1822,'댓111','2023-02-16',0,0,2024,2),(1823,'댓 222','2023-02-16',0,0,2024,2),(1824,'댓333','2023-02-16',0,0,2024,2),(1825,'답변입니다','2023-02-16',0,0,2025,109),(1826,'댓글의 내용입니다','2023-02-16',0,0,2026,103);
/*!40000 ALTER TABLE `group_answer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  9:14:33

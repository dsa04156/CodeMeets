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
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group` (
  `group_pk` int NOT NULL AUTO_INCREMENT,
  `group_name` varchar(100) NOT NULL,
  `group_desc` varchar(200) DEFAULT NULL,
  `manager_id` int NOT NULL,
  `group_url` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`group_pk`),
  UNIQUE KEY `group_pk_UNIQUE` (`group_pk`),
  UNIQUE KEY `group_url` (`group_url`),
  KEY `user-group_idx` (`manager_id`),
  CONSTRAINT `group.manager_id` FOREIGN KEY (`manager_id`) REFERENCES `user` (`user_pk`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` VALUES (0,'그룹없음','그룹없음',0,'nourl'),(8,'그룹만들기테스트','string',24,'rul테스트'),(9,'그룹만들기테스트2','string',24,'RandomStringUtils.randomNumeric(6)'),(10,'그룹만들기테스트3','string',24,'692427'),(11,'그룹만들기테스트3','string',24,'R**a%f H9X'),(12,'그룹만들기테스트3','string',24,'3PrCkeiGgT'),(13,'string','string',24,'K8Zqkr8GD5'),(14,'string','string',24,'bmMFBUHaSJ'),(15,'ssssss','ssssss',24,'xvWFBUO6Rp'),(16,'ssssss','ssssss',24,'J0auIUwDjT'),(17,'ttttt','ttttt',24,'m1sS43ti0B'),(18,'ttttt','ttttt',24,'87sSvszm7P'),(19,'ttttt','ttttt',24,'AOc6W7EFyV'),(20,'ttttt','ttttt',24,'icEX6iszV3'),(21,'ttttt','ttttt',24,'EhIkJ7TNEJ'),(22,'ttttt','ttttt',24,'VVlrvR6ic2'),(23,'ttttt','ttttt',24,'hQDmAJDr5Q'),(24,'ttttt','ttttt',24,'MNBnh0payW'),(25,'wwwwww','wwwww',24,'6LibGkP5u9'),(26,'wwwwww','wwwww',24,'Ukk9v3qOcK'),(27,'wwwwww','wwwww',24,'djJ0AU8DNz'),(28,'wwwwww','wwwww',24,'QmF5hsktKt'),(29,'wwwwww','wwwww',24,'QsFE1va2Fk'),(30,'wwwwww','wwwww',24,'3X6LxGkEAu'),(31,'wwwwww','wwwww',24,'r9yxD59Gu4'),(32,'zzzzz','zzzzz',24,'N8J6fYmR07'),(33,'zzzzz','zzzzz',24,'lJfqpkbbuh'),(34,'zzzzz','zzzzz',24,'IogE25xyJd'),(35,'zzzzz','zzzzz',24,'KMx7m84ctg'),(36,'zzzzz','zzzzz',24,'kLeS4izsx5'),(37,'zzzzz','zzzzz',24,'KP6BqZTdzq'),(39,'zzzzz','zzzzz',24,'cCTPofkuIH'),(40,'zzzzz','zzzzz',24,'eWdcBrchnM'),(41,'zzzzz','zzzzz',24,'QrtX3sB7kR'),(42,'fffff','fffff',24,'PmPLSR5Dzs'),(43,'fffff','fffff',24,'mZIm7yWr8z'),(44,'fffff','fffff',24,'x8x89uTbi0'),(45,'fffff','fffff',24,'ssBqMGdbOl'),(46,'fffff','fffff',24,'sVZTwRSwXV'),(47,'fffff','fffff',24,'e5cw4CA6Lr'),(48,'fffff','fffff',24,'TC2yKQbLM0'),(49,'fffff','fffff',24,'QuMRUZFuGT'),(50,'fffff','fffff',24,'piPassOTwx'),(51,'fffff','fffff',24,'aglL8ncdcL'),(52,'fffff','fffff',24,'Wg1PcbjpeE'),(53,'gggg','gggg',24,'mzmULXGuXn'),(54,'gggg','gggg',24,'qWpt82ewKy'),(55,'gggg','gggg',24,'vvuZkN0zb2'),(56,'gggg','gggg',24,'bFhI2s0scF'),(57,'gggg','gggg',24,'Ze4DDdki6b'),(58,'gggg','gggg',24,'MgwvHO1hQI'),(59,'gggg','gggg',24,'VeWHsoXir7'),(60,'gggg','gggg',24,'yERXylMBMw'),(61,'gggg','gggg',24,'C9J9lSuHI1'),(62,'그룹만든다!ㄴㄴㄴ','string',24,'J9Fa31KG2s'),(63,'그룹만든다!ㄴㄴㄴ','string',24,'AwmqowYAb9'),(64,'string','string',1,'WDY5xlsRFe'),(65,'string','string',1,'KepGc53hOY'),(66,'string','string',1,'uuWcGPFkbg'),(71,'string','string',1,'http://i8d109.p.ssafy.io/api/group/join/ZBJDAQypnm'),(73,'string','string',1,'http://localhost:18081/api/group/join/05FeXZJmBg'),(74,'string','string',1,'epzEH0WUZv'),(76,'ssssss','string',1,'ZBJDAQypnm'),(78,'ssssss','string',1,'jpHoGvpdKE'),(79,'ssssss','string',1,'sfsfsfsfsafasfdsaE'),(80,'ssssss','string',1,'http://i8d109.p.ssafy.io/api/group/join/jpHoGvpdKE'),(81,'sssssss','string',1,'hC1LPZ26Nmk'),(82,'ssssszss','string',1,'7fGYNmhfET'),(83,'string','string',1,'N770V2nBQW'),(85,'string','string',1,'XL0s7VERzr'),(88,'test','string',71,'XUqeYcTxcu'),(92,'test3','',71,'jugWzKGX07'),(93,'test4','',71,'2YOVhnjUqD'),(94,'test5','',71,'EzYrsYZ1ip'),(95,'test6','',71,'3AzaFdttua'),(96,'test7','',71,'cTulrezfks'),(97,'test8','',71,'jwV75NwFCi'),(98,'test9','',71,'uOEDgOHejq'),(99,'test10','',71,'obGQHlTgpI'),(100,'test11','',71,'zv5upcWVXf'),(101,'test111','',71,'PCLmqGnPup'),(105,'탈퇴 테스트','',1,'NoGydHUbLZ'),(106,'만든다테스트','string',1,'sd'),(107,'만든다테스트','string',1,'fKvK24aJFA'),(108,'그룹url들어감?','',1,'lPp5Ee355M'),(110,'관리자의그룹','',0,'9oJbmjOOYn'),(111,'생성자 admin01','',1,'G7s4YHLfXA'),(112,'admin01이 만듦','',1,'eEFcah6O4U'),(113,'생성 admin01','',1,'pI8jm8nuHw'),(114,'생성 더 안됨?','',1,'vJJ7tIS0KP'),(115,'jshkakao','',96,'Pk1R8wMv6K'),(116,'좋아요 테스트','',1,'VALUhBMahK'),(117,'좋아요 유저간 테스트','',1,'fOPH2u2i0S'),(118,'어드민1그룹','',1,'HTPa0CO5V7'),(119,'하이','',1,'3tvomL7eda'),(120,'테스트0210의 그룹','',97,'bTPl0Y0WvT'),(121,'jsh +','',96,'SzVIiEXXzf'),(122,'해준이 그룹','',101,'qfqRemMsUS'),(123,'0214 테스트','',1,'3ssCvfVzEI'),(124,'해주이테스트그룹','',1,'rJa0aW5x9W'),(126,'이건 테스트용 그룹','',103,'wX6YBkruo7'),(127,'코드미츠 그룹','',103,'lQwibYgOyY'),(128,'빙빙바','',1,'KfHouRZ4rU'),(129,'그룹테스트','',1,'a5RxCbg5VW'),(130,'그룹만들기','',1,'k0jS0dCvcY'),(131,'fsdfsdf','',0,'W6CLAdLuyB'),(132,'푸하하하하하하','',104,'I7Yh4i8Vjt'),(133,'생성','',101,'HwG34kDgKC'),(134,'생성','',101,'RlsfV0WdDs'),(135,'그 룹 생 성','',101,'s5lmjlpjMY'),(136,'그룹 생성성성성','',101,'LdR9XtTB4O'),(137,'생성성성성성성','',101,'6ftTuUnm2d'),(138,'rerod','',101,'RgOVj2rj35'),(139,'sdsdfs','',1,'vDRO93I0Tg'),(140,'만듦','',1,'3fYoBfXslY'),(142,'0216 그룹','',1,'OzxnKxcCGw'),(143,'이건 시나리오용 그룹','',103,'uyp36XMKwf');
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  9:14:35

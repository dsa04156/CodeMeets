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
-- Table structure for table `conference`
--

DROP TABLE IF EXISTS `conference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conference` (
  `conference_pk` int NOT NULL AUTO_INCREMENT,
  `call_start_time` datetime NOT NULL,
  `call_end_time` datetime DEFAULT NULL,
  `conference_title` varchar(100) NOT NULL,
  `conference_contents` varchar(500) NOT NULL,
  `conference_active` tinyint NOT NULL DEFAULT '1',
  `conference_url` varchar(512) NOT NULL,
  `group_pk` int NOT NULL,
  `user_pk` int NOT NULL,
  PRIMARY KEY (`conference_pk`),
  UNIQUE KEY `conference_pk_UNIQUE` (`conference_pk`),
  UNIQUE KEY `conference_url_UNIQUE` (`conference_url`),
  KEY `group-user.group_pk_idx` (`group_pk`),
  KEY `conference.user_pk_idx` (`user_pk`),
  CONSTRAINT `conference.group_pk` FOREIGN KEY (`group_pk`) REFERENCES `group-user` (`group_pk`) ON DELETE CASCADE,
  CONSTRAINT `conference.user_pk` FOREIGN KEY (`user_pk`) REFERENCES `group-user` (`user_pk`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1267 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conference`
--

LOCK TABLES `conference` WRITE;
/*!40000 ALTER TABLE `conference` DISABLE KEYS */;
INSERT INTO `conference` VALUES (1188,'2023-02-13 13:55:51',NULL,'uyj','uuij',1,'tbzRZqZvgt',8,92),(1189,'2023-02-13 13:57:39',NULL,'0210','0210',1,'84mBLKDHRf',120,97),(1190,'2023-02-13 14:00:21',NULL,'ㅁㄴㅇㅁ','ㄴㅇㅇㄴㅁㅇ',1,'bmOIRrI8G7',0,97),(1192,'2023-02-13 14:25:56',NULL,'dasds','asaa',1,'O6IrEkLESU',0,97),(1193,'2023-02-13 14:27:18',NULL,'asdas','ada',1,'XSczFxOvAI',0,97),(1194,'2023-02-13 14:27:53',NULL,'123','213123123',1,'frjcx4soS6',0,97),(1195,'2023-02-13 14:28:55',NULL,'123','1223',1,'wxT1qg3hRM',0,97),(1196,'2023-02-13 14:42:28',NULL,'1231','23122',1,'roADDHy2Ua',0,97),(1197,'2023-02-13 14:43:52',NULL,'asd','asdas',1,'8ll7jGANLR',0,97),(1198,'2023-02-13 14:45:35',NULL,'21312','31321',1,'GJWC4qZPpd',0,97),(1199,'2023-02-13 14:47:49',NULL,'13','345',1,'QQwS6c5rcM',0,97),(1200,'2023-02-13 14:51:01',NULL,'1','124124',1,'GkIJaAHE6S',0,97),(1201,'2023-02-13 14:56:42',NULL,'1','1',1,'9mdGhkk6p8',0,97),(1204,'2023-02-14 01:19:06',NULL,'123123','12312312',1,'wrc84CaBJq',0,97),(1205,'2023-02-14 01:19:22',NULL,'1123123','2131412341',1,'XxU7cw1EPh',0,97),(1207,'2023-02-14 02:12:32',NULL,'123','123',1,'KwZDNKgvGd',110,0),(1208,'2023-02-14 02:14:08',NULL,'','',1,'TlLiiIF7bJ',110,0),(1209,'2023-02-14 03:19:17',NULL,'asdasd','asdasdasdasd',1,'scjmKSjpxM',0,97),(1210,'2023-02-14 03:42:21',NULL,'지나','ㅎㅎ',1,'4IIbwNS9Qv',0,98),(1214,'2023-02-14 05:53:13',NULL,'세이하이','하남자 바보',1,'rRCXo7a6rH',0,99),(1223,'2023-02-14 08:35:09',NULL,'찡낭','ㅎㅎ',1,'oL7wELjXzu',0,98),(1225,'2023-02-14 08:44:22',NULL,'gg','',1,'0pzRgYBGii',0,98),(1233,'2023-02-14 16:09:27',NULL,'컨퍼','런스',1,'SiwpQKoiVH',0,92),(1237,'2023-02-15 04:57:30',NULL,'dasdf','asdfasf',1,'AgI1zPvvcw',0,98),(1239,'2023-02-15 08:08:06',NULL,'회의다','1234',1,'cKegtuaCAT',0,102),(1240,'2023-02-15 08:18:54',NULL,'영상','촬영용',1,'LIQ12l1aHx',0,101),(1244,'2023-02-15 15:47:42',NULL,'코드미츠 최종발표','hypeboy의 codemeets',1,'c6iCl6h76S',126,103),(1245,'2023-02-15 15:48:54',NULL,'zhemalcm','chlwhdqkfvy',1,'Emk4lUOE8f',126,103),(1246,'2023-02-15 15:51:13',NULL,'asasdasd','asdasds',1,'EOIh2oBRbh',126,103),(1248,'2023-02-16 01:13:56',NULL,'코드미츠 발표 2','코드미츠 발표 2 설명',1,'6XI6XShRND',126,103),(1251,'2023-02-16 03:14:34',NULL,'code','123',1,'ctfgsAcbcl',0,107),(1252,'2023-02-16 03:14:45',NULL,'123','123',1,'VP0dtv2hJn',0,107),(1254,'2023-02-16 04:18:56',NULL,'오주영 바보','바보야',1,'v8RL9rYRJE',0,107),(1255,'2023-02-16 04:19:37',NULL,'오주영바보','바보야',1,'P7kiitHNaX',0,107),(1256,'2023-02-16 04:56:14',NULL,'화상','채팅',1,'jk67RAtCWw',0,101),(1261,'2023-02-16 10:46:15',NULL,'회의이름','개요',1,'XGxdnhXyrm',132,104),(1262,'2023-02-16 10:51:19',NULL,'회의명 title','회의 내용 content',1,'nmJLsIj70c',132,104),(1263,'2023-02-16 12:38:51',NULL,'미팅테스트1','테스트입니다 내용content',1,'J7Xg0jN9Ph',142,1),(1264,'2023-02-16 13:01:20',NULL,'아닌밤중의회의','오후 10시 1분의 회의',1,'y0QQfX7ecT',127,103),(1265,'2023-02-16 13:14:45',NULL,'룹그 츠미드코','코드미츠 그룹',1,'z5zxyN2N64',127,103),(1266,'2023-02-16 15:30:44',NULL,'시나리오용 회의','시연 시나리오',1,'RWWeEK7jnC',143,103);
/*!40000 ALTER TABLE `conference` ENABLE KEYS */;
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

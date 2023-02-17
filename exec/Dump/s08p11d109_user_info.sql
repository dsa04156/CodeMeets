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
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_info` (
  `user_info_pk` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(30) DEFAULT NULL,
  `nickname` varchar(30) DEFAULT NULL,
  `tel` varchar(13) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `profile_photo` varchar(512) DEFAULT NULL,
  `email_public` tinyint NOT NULL DEFAULT '1',
  `tel_public` tinyint NOT NULL DEFAULT '1',
  `user_pk` int NOT NULL,
  PRIMARY KEY (`user_info_pk`),
  UNIQUE KEY `user_info_pk_UNIQUE` (`user_info_pk`),
  UNIQUE KEY `tel_UNIQUE` (`tel`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `user-user_info_idx` (`user_pk`),
  CONSTRAINT `user_info.user_pk` FOREIGN KEY (`user_pk`) REFERENCES `user` (`user_pk`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES (0,'어드민','어드민','00000000000','admin00@email.com','fbea63d6-e610-450c-af8c-b5355c75cbd0.png',1,1,0),(1,'어드민01','asd','01001010101','l@D.Cdd','36cba72c-e4e1-488e-8b7c-e75c7c3ed249.png',1,1,1),(2,'어드민02','admin02','010-0202-0202','admin02@email','caed4747-ffc2-4127-a5c5-aada4119126e.png',1,0,2),(3,'어드민03','admin03','010-0303-0303','admin03@email','',1,1,3),(4,'박해준','박박해해준준','01012345678','email입니다','fbea63d6-e610-450c-af8c-b5355c75cbd0.png',0,1,4),(5,'gowns','gownsnick','gownsph','gownsemail','fbea63d6-e610-450c-af8c-b5355c75cbd0.png',1,1,5),(6,'tjrrl','tjrrlnick','tjrrlph','tjrrlemail','fbea63d6-e610-450c-af8c-b5355c75cbd0.png',0,1,6),(7,'gudqls','gudqlsnick','gudqlsph','gudqlsemail','fbea63d6-e610-450c-af8c-b5355c75cbd0.png',0,1,7),(8,'rbgud','rbgudnick','rbgudph','rbgudemail','fbea63d6-e610-450c-af8c-b5355c75cbd0.png',0,1,9),(9,'wlsdnr','wlsdnrnick','wlsdrph','wlsdnremail','fbea63d6-e610-450c-af8c-b5355c75cbd0.png',0,1,10),(10,'tkdgk','tkdgknick','tkdgkph','tkdgkemail','fbea63d6-e610-450c-af8c-b5355c75cbd0.png',1,1,11),(11,'유저04','user04','011-0404-0404','user04@email','fbea63d6-e610-450c-af8c-b5355c75cbd0.png',1,0,12),(12,'유저05','user05','011-0505-0505','user05@email','fbea63d6-e610-450c-af8c-b5355c75cbd0.png',0,0,13),(13,'string','string','string','string','fbea63d6-e610-450c-af8c-b5355c75cbd0.png',0,0,16),(14,'xxxxxx','Unregistered','01037812731','xcvcxcv@sfn.cn','fbea63d6-e610-450c-af8c-b5355c75cbd0.png',1,1,20),(15,'sdfsfsdf','xcxc','01055554444','vnvndbwb@x.cns','fbea63d6-e610-450c-af8c-b5355c75cbd0.png',1,0,21),(16,'박해준','','01088887777','sdfnd@naavxd.cs','fbea63d6-e610-450c-af8c-b5355c75cbd0.png',1,1,22),(17,'박박해해준준','Unregistered','01099338844','emaidl@nav.cmo','fbea63d6-e610-450c-af8c-b5355c75cbd0.png',1,1,23),(18,'어드민201','admin11111','010-0101-1111','admin1111@email','fbea63d6-e610-450c-af8c-b5355c75cbd0.png',1,1,24),(19,'어드d1','dsaadmin01','010-0233-0101','dsa1234@email','fbea63d6-e610-450c-af8c-b5355c75cbd0.png',1,1,25),(20,'dddfsfsf','Unregistered','01012341234','ssafy@naver.com','fbea63d6-e610-450c-af8c-b5355c75cbd0.png',1,1,26),(23,'stri1212ng','strin3123g','stri1231ng','stri312ng','fbea63d6-e610-450c-af8c-b5355c75cbd0.png',0,0,71),(24,'전상하좌우','상하좌우전후좌우','01086300380','jsh@gmail.com','fbea63d6-e610-450c-af8c-b5355c75cbd0.png',1,0,73),(25,'mailtest','mailtest','01012341231','hb9509@gmail.com','fbea63d6-e610-450c-af8c-b5355c75cbd0.png',1,1,76),(26,'33331','strin3112231g','stri1231121ng','stri311212ng','fbea63d6-e610-450c-af8c-b5355c75cbd0.png',0,0,79),(30,'구미_1반_전상하','구미_1반_전상하',NULL,'pluxlight@gmail.com','https://lh3.googleusercontent.com/a/AEdFTp4Zp3MHDFm796hSs7eT2awaE1YpE6Cr8q-axVSg=s96-c',0,0,83),(31,'전상하','전상하',NULL,'aeoragy@gmail.com','https://lh3.googleusercontent.com/a/AEdFTp4N_h926lP9SvPGZRJ9EXh-hsw3igU7Wj1Y3JNSaQ=s96-c',0,0,84),(32,'plzgglogin','Unregistered','01038156917','plzgglogin@mail.com','',1,1,85),(35,'codemeets','codemeets',NULL,'cmcodemeets@gmail.com','https://lh3.googleusercontent.com/a/AEdFTp68Ldh6OUNpk85QqajbfeIRwnI1dMLLC21rxDw3=s96-c',1,0,92),(36,'admin0208','Unregistered','01002080208','admin0208@mail.com','',1,1,93),(39,'전상하','전상하',NULL,'aeoragy@kakao.com','http://k.kakaocdn.net/dn/iPjsL/btreK7EHI6h/kQz0PA7hXAKET5CqP2IBok/img_640x640.jpg',1,0,96),(40,'test0210','테스트0210','01002100210','test0210@email.com','',1,1,97),(41,'지나','지나지나','01075774492','jina@gmail.com','f06fef77-3afc-44f0-b2c8-b63ba761e65f.jpg',0,0,98),(42,'김지현','지현지현','01034564563','ASFE@NAVEIFD.COM','',0,0,99),(43,'test0214','테스트0214','01002140214','test0214@email.com','23816abd-2ed7-43fa-ab17-79748ad6a0fd.jpg',1,1,100),(44,'박해준','dfs','01020203040','qkrgo@nav.cm','3bce3466-d564-4bf5-89cc-b091a8127622.png',1,1,101),(45,'정진욱','정진욱','01026627747','1234@nbaver.com','',1,1,102),(46,'전상하','전상하','01003680830','testjsh@email.com','9389b5c1-c4ca-4869-892a-560cc40ba489.jpg',1,1,103),(47,'이석기','이석기','01011112222','s2blue4u@naver.com','3a0b0997-c143-411b-b187-13e768659db8.png',0,0,104),(48,'행배','행배요','01000000000','ads@asda.com','e1bfca0e-49f3-4063-91c8-5f56c0bddddb.png',1,1,105),(49,'양서정','양서정',NULL,'tjwjd4560@naver.com','http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg',1,0,106),(50,'test2','테스트','01040302312','123@asda.com','',1,1,107),(51,'박승원',NULL,NULL,'p9a3r5k0@gmail.com','https://lh3.googleusercontent.com/a/AEdFTp5Gbw7oKm9CwyXpqVS0suzQmX5x2zkoKb1DjdYL=s96-c',1,0,108),(52,'test0216','마그네슘','01002160216','test0216@email.com','a5454945-93df-488d-b18b-2fbcff80d514.jpeg',1,1,109),(53,'지 현','지 현',NULL,'spy03128@naver.com','http://k.kakaocdn.net/dn/bgohf6/btrWYMdF54M/HlPgSV4q3cRvkFaxCEBqZ1/img_640x640.jpg',1,0,110),(54,'김민지','김민지',NULL,'minji9848@naver.com','http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg',1,0,111),(55,'슥슥기','슥슥슥','01099999999','ssafy1@naver.com','eb8e2213-456e-4e5d-97c0-128bd98531d1.png',1,0,112),(56,'김동주',NULL,NULL,'jook1356@gmail.com','https://lh3.googleusercontent.com/a/AEdFTp6lTZOfRUFWzAYd5BZ6JoVsY4xRwm3Qc_4YtCrD=s96-c',1,0,113);
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  9:14:34

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema s08p11d109
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema s08p11d109
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `s08p11d109` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `s08p11d109` ;

-- -----------------------------------------------------
-- Table `s08p11d109`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s08p11d109`.`user` ;

CREATE TABLE IF NOT EXISTS `s08p11d109`.`user` (
  `user_pk` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(25) NULL DEFAULT NULL,
  `password` VARCHAR(1000) NOT NULL,
  `token` VARCHAR(256) NULL DEFAULT NULL,
  `user_active` TINYINT NULL DEFAULT '1',
  `provider` VARCHAR(15) NOT NULL DEFAULT 'codemeets',
  `provider_id` VARCHAR(50) NULL DEFAULT NULL,
  `role` VARCHAR(10) NOT NULL DEFAULT 'USER',
  PRIMARY KEY (`user_pk`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 101
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `s08p11d109`.`alarm`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s08p11d109`.`alarm` ;

CREATE TABLE IF NOT EXISTS `s08p11d109`.`alarm` (
  `alarm_pk` INT NOT NULL AUTO_INCREMENT,
  `alarm_contents` VARCHAR(100) NOT NULL,
  `alarm_time` TIMESTAMP NOT NULL,
  `alarm_read` TINYINT NOT NULL DEFAULT '0',
  `alarm_url` VARCHAR(512) NOT NULL,
  `alarm_to_id` INT NOT NULL,
  PRIMARY KEY (`alarm_pk`),
  UNIQUE INDEX `alarm_pk_UNIQUE` (`alarm_pk` ASC) VISIBLE,
  INDEX `alarm.alarm_to_id_idx` (`alarm_to_id` ASC) VISIBLE,
  CONSTRAINT `alarm.alarm_to_id`
    FOREIGN KEY (`alarm_to_id`)
    REFERENCES `s08p11d109`.`user` (`user_pk`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `s08p11d109`.`group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s08p11d109`.`group` ;

CREATE TABLE IF NOT EXISTS `s08p11d109`.`group` (
  `group_pk` INT NOT NULL AUTO_INCREMENT,
  `group_name` VARCHAR(100) NOT NULL,
  `group_desc` VARCHAR(200) NULL DEFAULT NULL,
  `manager_id` INT NOT NULL,
  `group_url` VARCHAR(512) NULL DEFAULT NULL,
  PRIMARY KEY (`group_pk`),
  UNIQUE INDEX `group_pk_UNIQUE` (`group_pk` ASC) VISIBLE,
  UNIQUE INDEX `group_url` (`group_url` ASC) VISIBLE,
  INDEX `user-group_idx` (`manager_id` ASC) VISIBLE,
  CONSTRAINT `group.manager_id`
    FOREIGN KEY (`manager_id`)
    REFERENCES `s08p11d109`.`user` (`user_pk`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 121
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `s08p11d109`.`group-user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s08p11d109`.`group-user` ;

CREATE TABLE IF NOT EXISTS `s08p11d109`.`group-user` (
  `group_user_pk` INT NOT NULL AUTO_INCREMENT,
  `group_user_position` INT NOT NULL DEFAULT '3',
  `group_pk` INT NOT NULL,
  `user_pk` INT NOT NULL,
  PRIMARY KEY (`group_user_pk`),
  UNIQUE INDEX `group_user_pk_UNIQUE` (`group_user_pk` ASC) VISIBLE,
  INDEX `user-group_user.user_pk_idx` (`user_pk` ASC) VISIBLE,
  INDEX `group-group-user.group_pk_idx` (`group_pk` ASC) VISIBLE,
  CONSTRAINT `group-user.group_pk`
    FOREIGN KEY (`group_pk`)
    REFERENCES `s08p11d109`.`group` (`group_pk`)
    ON DELETE CASCADE,
  CONSTRAINT `group-user.user_pk`
    FOREIGN KEY (`user_pk`)
    REFERENCES `s08p11d109`.`user` (`user_pk`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 201
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `s08p11d109`.`conference`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s08p11d109`.`conference` ;

CREATE TABLE IF NOT EXISTS `s08p11d109`.`conference` (
  `conference_pk` INT NOT NULL AUTO_INCREMENT,
  `call_start_time` DATETIME NOT NULL,
  `call_end_time` DATETIME NULL DEFAULT NULL,
  `conference_title` VARCHAR(100) NOT NULL,
  `conference_contents` VARCHAR(500) NOT NULL,
  `conference_active` TINYINT NOT NULL DEFAULT '1',
  `conference_url` VARCHAR(512) NOT NULL,
  `group_pk` INT NOT NULL,
  `user_pk` INT NOT NULL,
  PRIMARY KEY (`conference_pk`),
  UNIQUE INDEX `conference_pk_UNIQUE` (`conference_pk` ASC) VISIBLE,
  UNIQUE INDEX `conference_url_UNIQUE` (`conference_url` ASC) VISIBLE,
  INDEX `group-user.group_pk_idx` (`group_pk` ASC) VISIBLE,
  INDEX `conference.user_pk_idx` (`user_pk` ASC) VISIBLE,
  CONSTRAINT `conference.group_pk`
    FOREIGN KEY (`group_pk`)
    REFERENCES `s08p11d109`.`group-user` (`group_pk`)
    ON DELETE CASCADE,
  CONSTRAINT `conference.user_pk`
    FOREIGN KEY (`user_pk`)
    REFERENCES `s08p11d109`.`group-user` (`user_pk`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 1223
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `s08p11d109`.`conference-user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s08p11d109`.`conference-user` ;

CREATE TABLE IF NOT EXISTS `s08p11d109`.`conference-user` (
  `conference-user_pk` INT NOT NULL AUTO_INCREMENT,
  `conference_pk` INT NOT NULL,
  `user_pk` INT NOT NULL,
  PRIMARY KEY (`conference-user_pk`),
  UNIQUE INDEX `conference-user_pk_UNIQUE` (`conference-user_pk` ASC) VISIBLE,
  INDEX `conference-user.user_pk_idx` (`user_pk` ASC) VISIBLE,
  INDEX `conference-user.conference_pk_idx` (`conference_pk` ASC) VISIBLE,
  CONSTRAINT `conference-user.conference_pk`
    FOREIGN KEY (`conference_pk`)
    REFERENCES `s08p11d109`.`conference` (`conference_pk`)
    ON DELETE CASCADE,
  CONSTRAINT `conference-user.user_pk`
    FOREIGN KEY (`user_pk`)
    REFERENCES `s08p11d109`.`user` (`user_pk`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 1625
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `s08p11d109`.`conference_question`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s08p11d109`.`conference_question` ;

CREATE TABLE IF NOT EXISTS `s08p11d109`.`conference_question` (
  `conference_question_pk` INT NOT NULL AUTO_INCREMENT,
  `conference_question_contents` VARCHAR(500) NOT NULL,
  `conference_question_date` DATETIME NOT NULL,
  `conference_question_update` TINYINT NOT NULL DEFAULT '0',
  `conference_pk` INT NOT NULL,
  `group_pk` INT NOT NULL,
  `user_pk` INT NOT NULL,
  PRIMARY KEY (`conference_question_pk`),
  UNIQUE INDEX `conference_question_pk_UNIQUE` (`conference_question_pk` ASC) VISIBLE,
  INDEX `conference_question.conference_pk_idx` (`conference_pk` ASC) VISIBLE,
  INDEX `conference_question.group_pk_idx` (`group_pk` ASC) VISIBLE,
  INDEX `conference_question.user_pk_idx` (`user_pk` ASC) VISIBLE,
  CONSTRAINT `conference_question.conference_pk`
    FOREIGN KEY (`conference_pk`)
    REFERENCES `s08p11d109`.`conference` (`conference_pk`)
    ON DELETE CASCADE,
  CONSTRAINT `conference_question.group_pk`
    FOREIGN KEY (`group_pk`)
    REFERENCES `s08p11d109`.`group` (`group_pk`)
    ON DELETE CASCADE,
  CONSTRAINT `conference_question.user_pk`
    FOREIGN KEY (`user_pk`)
    REFERENCES `s08p11d109`.`user` (`user_pk`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 3425
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `s08p11d109`.`conference_answer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s08p11d109`.`conference_answer` ;

CREATE TABLE IF NOT EXISTS `s08p11d109`.`conference_answer` (
  `conference_answer_pk` INT NOT NULL AUTO_INCREMENT,
  `conference_answer_contents` VARCHAR(500) NOT NULL,
  `conference_answer_date` DATETIME NOT NULL,
  `conference_answer_update` TINYINT NOT NULL DEFAULT '0',
  `conference_question_pk` INT NOT NULL,
  `user_pk` INT NOT NULL,
  PRIMARY KEY (`conference_answer_pk`),
  INDEX `conference_answer.conference_question_pk_idx` (`conference_question_pk` ASC) VISIBLE,
  INDEX `conference_answer.user_pk_idx` (`user_pk` ASC) VISIBLE,
  CONSTRAINT `conference_answer.conference_question_pk`
    FOREIGN KEY (`conference_question_pk`)
    REFERENCES `s08p11d109`.`conference_question` (`conference_question_pk`)
    ON DELETE CASCADE,
  CONSTRAINT `conference_answer.user_pk`
    FOREIGN KEY (`user_pk`)
    REFERENCES `s08p11d109`.`user` (`user_pk`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 1731
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `s08p11d109`.`conference_answer_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s08p11d109`.`conference_answer_user` ;

CREATE TABLE IF NOT EXISTS `s08p11d109`.`conference_answer_user` (
  `conference_answer_pk` INT NOT NULL,
  `user_pk` INT NOT NULL,
  PRIMARY KEY (`conference_answer_pk`, `user_pk`),
  INDEX `user_pk` (`user_pk` ASC) VISIBLE,
  CONSTRAINT `conference_answer_user_ibfk_1`
    FOREIGN KEY (`conference_answer_pk`)
    REFERENCES `s08p11d109`.`conference_answer` (`conference_answer_pk`)
    ON DELETE CASCADE,
  CONSTRAINT `conference_answer_user_ibfk_2`
    FOREIGN KEY (`user_pk`)
    REFERENCES `s08p11d109`.`conference-user` (`user_pk`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `s08p11d109`.`conference_history`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s08p11d109`.`conference_history` ;

CREATE TABLE IF NOT EXISTS `s08p11d109`.`conference_history` (
  `conference_history_pk` INT NOT NULL AUTO_INCREMENT,
  `action` INT NOT NULL,
  `inserted_time` DATETIME NOT NULL,
  `conference_pk` INT NULL DEFAULT NULL,
  `user_pk` INT NULL DEFAULT NULL,
  PRIMARY KEY (`conference_history_pk`),
  UNIQUE INDEX `conference_history_UNIQUE` (`conference_history_pk` ASC) VISIBLE,
  INDEX `conference_history.conference_pk_idx` (`conference_pk` ASC) VISIBLE,
  INDEX `conference_history.user_pk_idx` (`user_pk` ASC) VISIBLE,
  CONSTRAINT `conference_history.conference_pk`
    FOREIGN KEY (`conference_pk`)
    REFERENCES `s08p11d109`.`conference-user` (`conference_pk`)
    ON DELETE CASCADE,
  CONSTRAINT `conference_history.user_pk`
    FOREIGN KEY (`user_pk`)
    REFERENCES `s08p11d109`.`conference-user` (`user_pk`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 1344
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `s08p11d109`.`conference_question_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s08p11d109`.`conference_question_user` ;

CREATE TABLE IF NOT EXISTS `s08p11d109`.`conference_question_user` (
  `conference_question_pk` INT NOT NULL,
  `user_pk` INT NOT NULL,
  PRIMARY KEY (`conference_question_pk`, `user_pk`),
  INDEX `user_pk` (`user_pk` ASC) VISIBLE,
  CONSTRAINT `conference_question_user_ibfk_1`
    FOREIGN KEY (`conference_question_pk`)
    REFERENCES `s08p11d109`.`conference_question` (`conference_question_pk`)
    ON DELETE CASCADE,
  CONSTRAINT `conference_question_user_ibfk_2`
    FOREIGN KEY (`user_pk`)
    REFERENCES `s08p11d109`.`conference-user` (`user_pk`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `s08p11d109`.`group_question`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s08p11d109`.`group_question` ;

CREATE TABLE IF NOT EXISTS `s08p11d109`.`group_question` (
  `group_question_pk` INT NOT NULL AUTO_INCREMENT,
  `group_question_title` VARCHAR(100) NOT NULL,
  `group_question_contents` VARCHAR(500) NOT NULL,
  `group_question_date` DATE NOT NULL,
  `group_question_update` TINYINT NOT NULL DEFAULT '0',
  `group_question_like` INT NOT NULL DEFAULT '0',
  `group_pk` INT NOT NULL,
  `user_pk` INT NOT NULL,
  PRIMARY KEY (`group_question_pk`),
  UNIQUE INDEX `group_question_pk_UNIQUE` (`group_question_pk` ASC) VISIBLE,
  INDEX `group_question.group_pk_idx` (`group_pk` ASC) VISIBLE,
  INDEX `group_question.user_pk_idx` (`user_pk` ASC) VISIBLE,
  CONSTRAINT `group_question.group_pk`
    FOREIGN KEY (`group_pk`)
    REFERENCES `s08p11d109`.`group-user` (`group_pk`)
    ON DELETE CASCADE,
  CONSTRAINT `group_question.user_pk`
    FOREIGN KEY (`user_pk`)
    REFERENCES `s08p11d109`.`group-user` (`user_pk`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2014
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `s08p11d109`.`group_answer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s08p11d109`.`group_answer` ;

CREATE TABLE IF NOT EXISTS `s08p11d109`.`group_answer` (
  `group_answer_pk` INT NOT NULL AUTO_INCREMENT,
  `group_answer_contents` VARCHAR(500) NOT NULL,
  `group_answer_date` DATE NOT NULL,
  `group_answer_update` TINYINT NOT NULL DEFAULT '0',
  `group_answer_like` INT NOT NULL,
  `group_question_pk` INT NOT NULL,
  `user_pk` INT NOT NULL,
  PRIMARY KEY (`group_answer_pk`),
  UNIQUE INDEX `group_answer_pk_UNIQUE` (`group_answer_pk` ASC) VISIBLE,
  INDEX `group_question.group_question_pk_idx` (`group_question_pk` ASC) VISIBLE,
  INDEX `group-user.user_pk_idx` (`user_pk` ASC) VISIBLE,
  CONSTRAINT `group_answer.group_question_pk`
    FOREIGN KEY (`group_question_pk`)
    REFERENCES `s08p11d109`.`group_question` (`group_question_pk`)
    ON DELETE CASCADE,
  CONSTRAINT `group_answer.user_pk`
    FOREIGN KEY (`user_pk`)
    REFERENCES `s08p11d109`.`group-user` (`user_pk`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 1783
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `s08p11d109`.`group_answer_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s08p11d109`.`group_answer_user` ;

CREATE TABLE IF NOT EXISTS `s08p11d109`.`group_answer_user` (
  `group_answer_pk` INT NOT NULL,
  `user_pk` INT NOT NULL,
  PRIMARY KEY (`group_answer_pk`, `user_pk`),
  INDEX `user_pk` (`user_pk` ASC) VISIBLE,
  CONSTRAINT `group_answer_user_ibfk_1`
    FOREIGN KEY (`group_answer_pk`)
    REFERENCES `s08p11d109`.`group_answer` (`group_answer_pk`)
    ON DELETE CASCADE,
  CONSTRAINT `group_answer_user_ibfk_2`
    FOREIGN KEY (`user_pk`)
    REFERENCES `s08p11d109`.`user` (`user_pk`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `s08p11d109`.`group_notice`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s08p11d109`.`group_notice` ;

CREATE TABLE IF NOT EXISTS `s08p11d109`.`group_notice` (
  `group_notice_pk` INT NOT NULL AUTO_INCREMENT,
  `group_notice_title` VARCHAR(100) NULL DEFAULT NULL,
  `group_notice_contents` VARCHAR(500) NULL DEFAULT NULL,
  `origin_filename` VARCHAR(100) NULL DEFAULT NULL,
  `db_filename` VARCHAR(100) NULL DEFAULT NULL,
  `group_notice_date` DATETIME NOT NULL,
  `group_pk` INT NOT NULL,
  `user_pk` INT NOT NULL,
  `group_notice_hit` INT NOT NULL DEFAULT '0',
  PRIMARY KEY (`group_notice_pk`),
  UNIQUE INDEX `group_notice_pk_UNIQUE` (`group_notice_pk` ASC) VISIBLE,
  INDEX `group_notice.user_pk_idx` (`user_pk` ASC) VISIBLE,
  INDEX `group_notice.group_pk_idx` (`group_pk` ASC) VISIBLE,
  CONSTRAINT `group_notice.group_pk`
    FOREIGN KEY (`group_pk`)
    REFERENCES `s08p11d109`.`group-user` (`group_pk`)
    ON DELETE CASCADE,
  CONSTRAINT `group_notice.user_pk`
    FOREIGN KEY (`user_pk`)
    REFERENCES `s08p11d109`.`group-user` (`user_pk`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2931
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `s08p11d109`.`group_question_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s08p11d109`.`group_question_user` ;

CREATE TABLE IF NOT EXISTS `s08p11d109`.`group_question_user` (
  `group_question_pk` INT NOT NULL,
  `user_pk` INT NOT NULL,
  PRIMARY KEY (`group_question_pk`, `user_pk`),
  INDEX `user_pk` (`user_pk` ASC) VISIBLE,
  CONSTRAINT `group_question_user_ibfk_1`
    FOREIGN KEY (`group_question_pk`)
    REFERENCES `s08p11d109`.`group_question` (`group_question_pk`)
    ON DELETE CASCADE,
  CONSTRAINT `group_question_user_ibfk_2`
    FOREIGN KEY (`user_pk`)
    REFERENCES `s08p11d109`.`user` (`user_pk`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `s08p11d109`.`message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s08p11d109`.`message` ;

CREATE TABLE IF NOT EXISTS `s08p11d109`.`message` (
  `message_pk` INT NOT NULL AUTO_INCREMENT,
  `room` INT NOT NULL,
  `send_pk` INT NOT NULL,
  `recv_pk` INT NOT NULL,
  `send_time` DATETIME NOT NULL,
  `read_time` DATETIME NULL DEFAULT NULL,
  `content` VARCHAR(1000) NULL DEFAULT NULL,
  `read_chk` INT NOT NULL,
  `user_pk` INT NOT NULL,
  PRIMARY KEY (`message_pk`),
  INDEX `message.user_pk` (`user_pk` ASC) VISIBLE,
  INDEX `message.send_pk` (`send_pk` ASC) VISIBLE,
  INDEX `message.recv_pk` (`recv_pk` ASC) VISIBLE,
  CONSTRAINT `message.recv_pk`
    FOREIGN KEY (`recv_pk`)
    REFERENCES `s08p11d109`.`user` (`user_pk`)
    ON DELETE CASCADE,
  CONSTRAINT `message.send_pk`
    FOREIGN KEY (`send_pk`)
    REFERENCES `s08p11d109`.`user` (`user_pk`)
    ON DELETE CASCADE,
  CONSTRAINT `message.user_pk`
    FOREIGN KEY (`user_pk`)
    REFERENCES `s08p11d109`.`user` (`user_pk`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 152
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `s08p11d109`.`user_info`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s08p11d109`.`user_info` ;

CREATE TABLE IF NOT EXISTS `s08p11d109`.`user_info` (
  `user_info_pk` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(30) NULL DEFAULT NULL,
  `nickname` VARCHAR(30) NULL DEFAULT NULL,
  `tel` VARCHAR(13) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `profile_photo` VARCHAR(512) NULL DEFAULT NULL,
  `email_public` TINYINT NOT NULL DEFAULT '1',
  `tel_public` TINYINT NOT NULL DEFAULT '1',
  `user_pk` INT NOT NULL,
  PRIMARY KEY (`user_info_pk`),
  UNIQUE INDEX `user_info_pk_UNIQUE` (`user_info_pk` ASC) VISIBLE,
  UNIQUE INDEX `tel_UNIQUE` (`tel` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `user-user_info_idx` (`user_pk` ASC) VISIBLE,
  CONSTRAINT `user_info.user_pk`
    FOREIGN KEY (`user_pk`)
    REFERENCES `s08p11d109`.`user` (`user_pk`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 44
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

USE `s08p11d109` ;

-- -----------------------------------------------------
-- procedure myFunction
-- -----------------------------------------------------

USE `s08p11d109`;
DROP procedure IF EXISTS `s08p11d109`.`myFunction`;

DELIMITER $$
USE `s08p11d109`$$
CREATE DEFINER=`ssafy`@`%` PROCEDURE `myFunction`()
BEGIN
    DECLARE i INT DEFAULT 998; -- ⓑ i변수 선언, defalt값으로 1설정
    WHILE (i <= 1800) DO -- ⓒ for문 작성(i가 1000이 될 때까지 반복)
       insert into `group_answer`(group_answer_contents,group_answer_date,group_answer_like,group_question_pk,user_pk)  values (concat(i),now(),0,i,1);
        SET i = i + 1; -- ⓔ i값에 1더해주고 WHILE문 처음으로 이동
    END WHILE;
END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

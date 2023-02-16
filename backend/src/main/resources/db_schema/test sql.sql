use s08p11d109;

select *
from user;

select *
from user_info;

select *
from user natural join user_info;

delete from user where user_pk > 3;
delete from user_info where user_pk > 3;

ALTER TABLE `user_info` AUTO_INCREMENT = 4;
ALTER TABLE `user` AUTO_INCREMENT = 4;

select *
from user_info
where user_pk = 1;

select user_pk
from user
where user_id = 'test01';


ALTER TABLE `s08p11d109`.`user` 
CHANGE `token` `token` VARCHAR(256);

ALTER TABLE `s08p11d109`.`user` 
CHANGE `password` `password` VARCHAR(1000);

ALTER TABLE `s08p11d109`.`user_info` 
CHANGE `profile_public` `email_public` TINYINT NOT NULL DEFAULT 1;

ALTER TABLE `s08p11d109`.`user_info` 
ADD `tel_public` TINYINT NOT NULL DEFAULT 1;

ALTER TABLE  `s08p11d109`.`conference_question`
DROP `conference_question_like`;

ALTER TABLE  `s08p11d109`.`conference_answer`
DROP `conference_answer_like`;

ALTER TABLE `s08p11d109`.`conference_answer`
CHANGE `conference_answer_pk` `conference_answer_pk` INT NOT NULL AUTO_INCREMENT;

ALTER TABLE `s08p11d109`.`user_info`
CHANGE `user_name` `user_name` VARCHAR(30);

ALTER TABLE `s08p11d109`.`user_info`
CHANGE `nickname` `nickname` VARCHAR(30);

ALTER TABLE `s08p11d109`.`user`
CHANGE `user_id` `user_id` VARCHAR(25);

ALTER TABLE `s08p11d109`.`user` 
ADD `provider` VARCHAR(20) NOT NULL DEFAULT 'codemeets';

ALTER TABLE `s08p11d109`.`user`
CHANGE `provider` `provider` VARCHAR(15) NOT NULL DEFAULT 'codemeets';

ALTER TABLE `s08p11d109`.`user`
CHANGE `user_id` `user_id` VARCHAR(25);

ALTER TABLE `s08p11d109`.`user` 
ADD `provider_id` VARCHAR(50) NULL;

ALTER TABLE `s08p11d109`.`user`
ADD `role` VARCHAR(10) NOT NULL DEFAULT 'USER';

START TRANSACTION;
	INSERT INTO `s08p11d109`.`user`(user_id, `password`, token, user_active) 
	VALUES('test03', '1234', 'token', 1);
    
	INSERT INTO `s08p11d109`.`user_info` (user_name, nickname, tel, email, profile_photo, profile_public, user_pk) 
    VALUES('테스트03', '테스트닉네임03', '010-0303-0303', '이메일03@주소', '프로필사진', 1, (SELECT user_pk 
    FROM user 
    WHERE user_id = 'test03'));
    
COMMIT;

UPDATE user
SET user_active = 1
WHERE user_pk = 3;

select engine, support from information_schema.engines where support='DEFAULT';

ALTER TABLE user_info
MODIFY nickname varchar(16);

INSERT ALL
INTO `user`(user_id, `password`, token, user_active) VALUES('test03', '1234', 'token', 1)
INTO `user_info` (user_name, nickname, tel, email, profile_photo, profile_public, user_pk) VALUES('테스트03', '테스트닉네임03', '010-0303-0303', '이메일03@주소', '프로필사진', 1, (SELECT user_pk 
    FROM user 
    WHERE user_id = 'test03'))user_info
SELECT *
FROM DUAL;

SELECT *
FROM `group`;

SELECT *
FROM group_notice;

SELECT *
FROM `group_notice`
WHERE group_pk = 24
ORDER BY group_notice_pk DESC
LIMIT 1 , 10;

INSERT INTO `group-user` (`group_user_position`, `group_pk`, `user_pk`, `user_id`, `user_name`)
VALUES (1, 24, 4, 'admin03', '1');


INSERT INTO `group_notice` (group_notice_title, group_notice_contents, upload_file, group_notice_date, 
group_pk, user_pk, group_notice_hit)
VALUES ('테스트공지', '테스트는거꾸로해도테스트가 아니네', '""', now(), 24, 3, 0);


UPDATE `group_notice`
SET group_notice_hit = group_notice_hit + 1
WHERE group_notice_pk = 1;

UPDATE `group_notice`
SET group_notice_title = "수정한 공지 제목",
group_notice_contents = "이건 지금 수정한 테스트 공지",
upload_file = '\"\"'
WHERE group_notice_pk = 1;


DELETE FROM `group_notice` 
WHERE group_notice_pk = 3;

SELECT con.group_pk, con.conference_pk, con.call_start_time, con.conference_title, con.conference_active, gro.group_name, gro.group_url
FROM conference as con NATURAL JOIN `group` as gro
WHERE user_pk = 3
ORDER BY call_start_time DESC;

SELECT *
FROM conference as con NATURAL JOIN `group` as gro
WHERE user_pk = 3
ORDER BY call_start_time DESC;

SELECT con.group_pk, con.conference_pk, date_format(con.call_start_time, "%Y-%m-%d") as call_start_time,
 con.conference_title, con.conference_active, gro.group_name, gro.group_url, count(*) OVER() AS total
FROM `conference` as con NATURAL JOIN `group` as gro
WHERE con.conference_pk in (
	SELECT conference_pk
	FROM `conference-user`
	WHERE user_pk = 3
	)
	AND
	con.group_pk = 2
ORDER BY call_start_time DESC
LIMIT 0, 100;


-- 본인 질문 기록 조회
-- 답글 수 추가

SELECT Q.conference_question_pk, Q.conference_question_contents, Q.conference_question_date,
Q.conference_question_update, Q.conference_pk, Q.group_pk, Q.user_pk, count(A.conference_answer_pk) answer_cnt,
	(SELECT count(*) 
    FROM conference_question_user L 
    WHERE Q.conference_question_pk = L.conference_question_pk) conference_question_like_cnt,
count(*) OVER() AS total
FROM `conference_question` Q LEFT JOIN `conference_answer` A
on Q.conference_question_pk = A.conference_question_pk
WHERE Q.user_pk = 3
GROUP BY Q.conference_question_pk, Q.conference_question_contents, Q.conference_question_date,
Q.conference_question_update, Q.conference_pk, Q.group_pk, Q.user_pk
ORDER BY Q.conference_question_date DESC
LIMIT 0, 10;

-- ========== 좋아요 연관 테이블 외래키 delete on cascade 추가 ==========

-- ALTER TABLE 테이블명 
-- DROP FOREIGN KEY 포린키이름;

ALTER TABLE `conference_question_user` 
DROP FOREIGN KEY `conference_question_user_ibfk_1`;

-- ALTER TABLE 테이블명 
-- ADD CONSTRAINT 포린키이름 
-- FOREIGN KEY 자식속성 
-- REFERENCES 부모테이블명(자식속성이 참고할 부모속성) 
-- ON DELETE CASCADE;

ALTER TABLE `conference_question_user` 
ADD CONSTRAINT `conference_question_user_ibfk_1` 
FOREIGN KEY (conference_question_pk) 
REFERENCES conference_question(conference_question_pk) 
ON DELETE CASCADE;

ALTER TABLE `conference_answer_user` 
DROP FOREIGN KEY `conference_answer_user_ibfk_1`;

ALTER TABLE `conference_answer_user` 
ADD CONSTRAINT `conference_answer_user_ibfk_1` 
FOREIGN KEY (conference_answer_pk) 
REFERENCES conference_answer(conference_answer_pk) 
ON DELETE CASCADE;

ALTER TABLE `group_question_user` 
DROP FOREIGN KEY `group_question_user_ibfk_1`;

ALTER TABLE `group_question_user` 
ADD CONSTRAINT `group_question_user_ibfk_1` 
FOREIGN KEY (group_question_pk) 
REFERENCES group_question(group_question_pk) 
ON DELETE CASCADE;

ALTER TABLE `group_answer_user` 
DROP FOREIGN KEY `group_answer_user_ibfk_1`;

ALTER TABLE `group_answer_user` 
ADD CONSTRAINT `group_answer_user_ibfk_1` 
FOREIGN KEY (group_answer_pk) 
REFERENCES group_answer(group_answer_pk) 
ON DELETE CASCADE;
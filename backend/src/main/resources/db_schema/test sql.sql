use s08p11d109;

select *
from user;

select *
from user_info;

select *
from user natural join user_info;

delete from user where user_pk = 3;
delete from user_info where user_pk = 3;

ALTER TABLE user_info AUTO_INCREMENT = 1;
ALTER TABLE user AUTO_INCREMENT = 1;

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
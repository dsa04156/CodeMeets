package com.hypeboy.codemeets.model.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hypeboy.codemeets.controller.GroupController;
import com.hypeboy.codemeets.model.dao.PwFindDao;


@Service
public class PwFindServiceImpl implements PwFindService{

	private PwFindDao pwFindDao;
	
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JavaMailSender emailSender;
	
	
	private final Logger Logger = LoggerFactory.getLogger(GroupController.class);
	
	@Autowired
	public PwFindServiceImpl(PwFindDao pwFindDao, PasswordEncoder passwordEncoder ) throws Exception {
		super();
		this.pwFindDao = pwFindDao;
		this.passwordEncoder = passwordEncoder;
	}
	
	@Override
	public int pwFind(String userId, String userEmail) throws Exception {
		return pwFindDao.pwFind(userId, userEmail);
	}


	@Override
	public int pwSend(String userId, String userEmail) throws Exception {
		char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        String str = "";

        // 문자 배열 길이의 값을 랜덤으로 10개를 뽑아 구문을 작성함
        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        
        
       
        
        
        try {
        	Logger.info(str);
        	str = passwordEncoder.encode(str);
        	Logger.info("1" + str);
        	pwFindDao.pwChange(userId, str);
        	Logger.info("2" + str);
	        SimpleMailMessage message = new SimpleMailMessage();
	        message.setTo(userEmail);
	        message.setSubject("CodeMeets 임시 비밀번호 안내 메일입니다.");
	        message.setText("안녕하세요 CodeMeets 임시비밀번호 안내 관련 이메일입니다." + "회원님의 임시 비밀번호는" + str + "입니다" + "로그인 후에 비밀번호를 변경해 주세여");
	        message.setFrom("codemeetshypeboy@gmail.com");
	        message.setReplyTo("codemeetshypeboy@gmail.com");
	        System.out.println("message"+message);
	        emailSender.send(message);
	        return 1;
        } catch(Exception e) {
        	Logger.info("sendMessage 오류 - " + e);
        	return 0;
        }
		
	}
	
	
	
	

}

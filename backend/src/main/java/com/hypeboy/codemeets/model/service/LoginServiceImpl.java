package com.hypeboy.codemeets.model.service;

import java.util.Collections;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hypeboy.codemeets.controller.UserController;
import com.hypeboy.codemeets.exception.LoginFailedException;
import com.hypeboy.codemeets.model.dao.LoginDao;
import com.hypeboy.codemeets.model.dto.LoginDto;
import com.hypeboy.codemeets.utils.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LoginServiceImpl implements LoginService {
	private final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
	
	@Autowired
	private SqlSession sqlSession;
	
    public String login(LoginDto loginDto) {
    	LoginDto loginUserDto = sqlSession.getMapper(LoginDao.class).findUserByUsername(loginDto.getUserId())
    			.orElseThrow(() -> new LoginFailedException("잘못된 아이디입니다"));
    	
//    	logger.info(loginUserDto.toString());

        if (!passwordEncoder.matches(loginDto.getPassword(), loginUserDto.getPassword())) {
            throw new LoginFailedException("잘못된 비밀번호입니다");
        }

        return jwtTokenProvider.createToken(loginUserDto.getUserPk(), Collections.singletonList(loginUserDto.getUserId()));
    }
}

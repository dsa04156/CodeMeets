package com.hypeboy.codemeets.model.service;

import java.util.HashMap;
import java.util.Map;

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
import com.hypeboy.codemeets.model.dto.UserDto;
import com.hypeboy.codemeets.utils.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LoginServiceImpl implements LoginService {
	private final Logger logger = LoggerFactory.getLogger(LoginServiceImpl.class);

    private final PasswordEncoder passwordEncoder;
	
	@Autowired
	private SqlSession sqlSession;
	
	@Override
    public LoginDto login(LoginDto loginDto) throws Exception {
		logger.info("login - 실행");
		
    	LoginDto loginUserDto = sqlSession.getMapper(LoginDao.class)
    			.findByUserId(loginDto.getUserId())
    			.orElseThrow(() -> new LoginFailedException("잘못된 아이디입니다"));
    	
    	logger.info("LoginServiceImpl login - " + loginUserDto.toString());

        if (!passwordEncoder.matches(loginDto.getPassword(), loginUserDto.getPassword())) {
            throw new LoginFailedException("잘못된 비밀번호입니다");
        }

        return loginUserDto;
    }
    
	@Override
	public UserDto getUserInfo(int userPk) throws Exception {
		logger.info("getUserInfo - 실행");
		
		return sqlSession.getMapper(LoginDao.class).getUserInfo(userPk);
	}
	
	// token ----------------------------------------------------------------------------------------------------
	
	@Override
	public void saveRefreshToken(int userPk, String refreshToken) throws Exception {
		logger.info("saveRefreshToken - 실행");
		
		sqlSession.getMapper(LoginDao.class).saveRefreshToken(userPk, refreshToken);
	}
	
	@Override
	public String getRefreshToken(int userPk) throws Exception {
		logger.info("getRefreshToken - 실행");
		
		return sqlSession.getMapper(LoginDao.class).getRefreshToken(userPk);
	}

	@Override
	public int deleteRefreshToken(int userPk) throws Exception {
		logger.info("deleteRefreshToken - 실행");
		
		return sqlSession.getMapper(LoginDao.class).deleteRefreshToken(userPk);
	}

	// social login ----------------------------------------------------------------------------------------------------
	
	public UserDto findByEmail(String email) throws Exception {
		logger.info("findByEmail - 실행");
		
		return sqlSession.getMapper(LoginDao.class).findByEmail(email);
	}
	
    public int findByEmailPk(String email) throws Exception {
		logger.info("findByEmailPk - 실행");
		
		return sqlSession.getMapper(LoginDao.class).findByEmailPk(email);
	}
	
}

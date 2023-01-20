package com.hypeboy.codemeets.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hypeboy.codemeets.controller.UserController;
import com.hypeboy.codemeets.model.dao.UserDao;
import com.hypeboy.codemeets.model.dto.UserDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
	private final Logger logger = LoggerFactory.getLogger(UserController.class);

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	
	@Autowired
	private SqlSession sqlSession;

    private final PasswordEncoder passwordEncoder;

	@Override
	public List<UserDto> getUserList(String userId) throws Exception {
//		logger.info("getUserInfoList - 실행");
		return sqlSession.getMapper(UserDao.class).getUserList(userId);
	}
	
	@Override
	public List<UserDto> getAllUserList() throws Exception {
		return sqlSession.getMapper(UserDao.class).getAllUserList();
	}

	@Override
	public void registUser(UserDto userDto) throws Exception {
		logger.info("registUser - 실행");
		userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
		sqlSession.getMapper(UserDao.class).registUser(userDto);
	}
	
	@Override
	public void registUserInfo(UserDto userDto) throws Exception {
		logger.info("registUserInfo - 실행");
		sqlSession.getMapper(UserDao.class).registUserInfo(userDto);
	}

	@Override
	public int getUserIdOverlap(String userId) throws Exception {
		return sqlSession.getMapper(UserDao.class).getUserIdOverlap(userId);
	}

	@Override
	public int getUserTelOverlap(String userId) throws Exception {
		return sqlSession.getMapper(UserDao.class).getUserTelOverlap(userId);
	}

	@Override
	public int getUserEmailOverlap(String userId) throws Exception {
		return sqlSession.getMapper(UserDao.class).getUserEmailOverlap(userId);
	}

	@Override
	public String searchId(String type, String data) throws Exception {
		String result = null;
		
		try {
			if (type.equals("email")) {
				result = sqlSession.getMapper(UserDao.class).searchIdFromEmail(data);
			}
			else if (type.equals("tel")) {
				result = sqlSession.getMapper(UserDao.class).searchIdFromTel(data);
			}
		} catch (Exception e) {
			return null;
		}
		
		return result;
	}

	@Override
	public int forgotPw(String userId, String type, String data) throws Exception {
		int result = 0;
		
		try {
			if (type.equals("email")) {
				result = sqlSession.getMapper(UserDao.class).forgotPwFromEmail(userId, data);
			}
			else if (type.equals("tel")) {
				result = sqlSession.getMapper(UserDao.class).forgotPwFromTel(userId, data);
			}
		} catch (Exception e) {
			return result;
		}
		
		return result;
	}

	@Override
	public String editPw(String userId, String password) throws Exception {
		try {
			int result = sqlSession.getMapper(UserDao.class).editPw(userId, passwordEncoder.encode(password));
			
			if (result == 1) {
				return SUCCESS;
			}
			else {
				return FAIL;
			}
			
		} catch (Exception e) {
			return FAIL;
		}

	}


	

}

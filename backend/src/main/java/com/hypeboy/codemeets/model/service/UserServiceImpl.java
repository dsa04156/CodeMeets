package com.hypeboy.codemeets.model.service;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hypeboy.codemeets.controller.UserController;
import com.hypeboy.codemeets.model.dao.UserDao;
import com.hypeboy.codemeets.model.dto.UserDto;

@Service
public class UserServiceImpl implements UserService{
	private final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<UserDto> getUserList(int userPk) throws Exception {
//		logger.info("getUserInfoList - 실행");
		return sqlSession.getMapper(UserDao.class).getUserList(userPk);
	}

	@Override
	public void registUser(UserDto userDto) throws Exception {
		logger.info("userRegist - 실행");
		sqlSession.getMapper(UserDao.class).registUser(userDto);
	}
	
	@Override
	public void registUserInfo(UserDto userDto) throws Exception {
		logger.info("userInfoRegist - 실행");
		sqlSession.getMapper(UserDao.class).registUserInfo(userDto);
	}

	@Override
	public int getUserIdOverlap(String userId) throws SQLException {
		return sqlSession.getMapper(UserDao.class).getUserIdOverlap(userId);
	}

	@Override
	public int getUserTelOverlap(String userId) throws SQLException {
		return sqlSession.getMapper(UserDao.class).getUserTelOverlap(userId);
	}

	@Override
	public int getUserEmailOverlap(String userId) throws SQLException {
		return sqlSession.getMapper(UserDao.class).getUserEmailOverlap(userId);
	}
	

}

package com.hypeboy.codemeets.model.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hypeboy.codemeets.controller.UserController;
import com.hypeboy.codemeets.model.dao.UserDao;
import com.hypeboy.codemeets.model.dto.ConferenceGroupDto;
import com.hypeboy.codemeets.model.dto.ConferenceQuestionDto;
import com.hypeboy.codemeets.model.dto.UserDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class UserServiceImpl implements UserService{
	private final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private SqlSession sqlSession;

    private final PasswordEncoder passwordEncoder;

	@Override
	public List<UserDto> devGetUserInfoList(String userId) throws Exception {
		logger.info("devGetUserInfoList - 실행");
		
		return sqlSession.getMapper(UserDao.class).devGetUserInfoList(userId);
	}
	
	@Override
	public List<UserDto> devGetUserInfoAllList() throws Exception {
		logger.info("devGetUserInfoAllList - 실행");
		
		return sqlSession.getMapper(UserDao.class).devGetUserInfoAllList();
	}

	@Override
	public void registUser(UserDto userDto) throws Exception {
		logger.info("registUser - 실행");
		
		userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
		
		sqlSession.getMapper(UserDao.class).registUser(userDto);
		sqlSession.getMapper(UserDao.class).registUserInfo(userDto);
	}

	@Override
	public int getUserIdOverlap(String userId) throws Exception {
		logger.info("getUserIdOverlap - 실행");
		
		return sqlSession.getMapper(UserDao.class).getUserIdOverlap(userId);
	}

	@Override
	public int getUserTelOverlap(String userId) throws Exception {
		logger.info("getUserTelOverlap - 실행");
		
		return sqlSession.getMapper(UserDao.class).getUserTelOverlap(userId);
	}

	@Override
	public int getUserEmailOverlap(String userId) throws Exception {
		logger.info("getUserEmailOverlap - 실행");
		
		return sqlSession.getMapper(UserDao.class).getUserEmailOverlap(userId);
	}

	@Override
	public String searchId(String type, String data) throws Exception {
		logger.info("searchId - 실행");
		
		String result = null;
		
		try {
			if (type.equals("email")) {
				result = sqlSession.getMapper(UserDao.class).searchIdFromEmail(data);
			}
			else if (type.equals("tel")) {
				result = sqlSession.getMapper(UserDao.class).searchIdFromTel(data);
			}
		} catch (Exception e) {
			logger.warn("searchId fail - " + e);
			
			return null;
		}
		
		return result;
	}

	@Override
	public int forgotPw(String userId, String type, String data) throws Exception {
		logger.info("forgotPw - 실행");
		
		int result = 0;
		
		try {
			if (type.equals("email")) {
				result = sqlSession.getMapper(UserDao.class).forgotPwFromEmail(userId, data);
			}
			else if (type.equals("tel")) {
				result = sqlSession.getMapper(UserDao.class).forgotPwFromTel(userId, data);
			}
		} catch (Exception e) {
			logger.warn("forgotPw fail - " + e);
			
			return result;
		}
		
		return result;
	}

	@Override
	public boolean editPw(String userId, String password) throws Exception {
		logger.info("editPw - 실행");
		
		try {
			return sqlSession.getMapper(UserDao.class).editPw(userId, passwordEncoder.encode(password)) == 1 ? true : false;
		} catch (Exception e) {
			logger.warn("editPw fail - " + e);			
			
			return false;
		}

	}

	@Override
	public UserDto getMyProfile(int userPk) throws Exception {
		logger.info("getMyProfile - 실행");
		
		return sqlSession.getMapper(UserDao.class).getMyProfile(userPk);
	}

	@Override
	public List<UserDto> getUserInfoList(String userPkList) throws Exception {
		logger.info("getUserInfoList - 실행");

		return sqlSession.getMapper(UserDao.class).getUserInfoList(userPkList);
	}

	@Override
	public int editMyProfile(UserDto userDto) throws Exception {
		logger.info("editMyProfile - 실행");
		
		return sqlSession.getMapper(UserDao.class).editMyProfile(userDto);
	}

	@Override
	public int resign(int userPk) throws Exception {
		logger.info("resign - 실행");
		
		return sqlSession.getMapper(UserDao.class).resign(userPk);
	}
	
	@Override
	public List<ConferenceGroupDto> getMyConferenceRecord(int nowPage, int items, int userPk) throws Exception {
		logger.info("getMyConferenceRecord - 실행");
		
		return sqlSession.getMapper(UserDao.class).getMyConferenceRecord(nowPage, items, userPk);
	}

	@Override
	public List<ConferenceGroupDto> getMyConferenceRecordFilter(int nowPage, int items, int userPk, int groupPk)
			throws Exception {
		logger.info("getMyConferenceRecordFilter - 실행");
		
		return sqlSession.getMapper(UserDao.class).getMyConferenceRecordFilter(nowPage, items, userPk, groupPk);
	}

	@Override
	public List<ConferenceQuestionDto> getMyQuestionRecord(int nowPage, int items, int userPk) throws Exception {
		logger.info("getMyQuestionRecord - 실행");
		
		return sqlSession.getMapper(UserDao.class).getMyQuestionRecord(nowPage, items, userPk);
	}

}

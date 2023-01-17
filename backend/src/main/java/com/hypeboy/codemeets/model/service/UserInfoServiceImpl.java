package com.hypeboy.codemeets.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hypeboy.codemeets.controller.UserInfoController;
import com.hypeboy.codemeets.model.dao.UserInfoDao;
import com.hypeboy.codemeets.model.dto.UserInfoDto;

@Service
public class UserInfoServiceImpl implements UserInfoService{
	private final Logger logger = LoggerFactory.getLogger(UserInfoController.class);
	
	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<UserInfoDto> getUserInfoList(int userPk) throws Exception {
		logger.info("getUserInfoList - 실행");
		return sqlSession.getMapper(UserInfoDao.class).getUserInfoList(userPk);
	}
	

}

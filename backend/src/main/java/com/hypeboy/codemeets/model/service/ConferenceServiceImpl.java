package com.hypeboy.codemeets.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hypeboy.codemeets.controller.UserController;
import com.hypeboy.codemeets.model.dao.ConferenceDao;
import com.hypeboy.codemeets.model.dto.ConferenceDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ConferenceServiceImpl implements ConferenceService {
	private final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private SqlSession sqlSession;

	@Override
	public ConferenceDto getConferenceDetail(int conferencePk) throws Exception {
		logger.info("Service getConferenceDetail - 실행");
		
		return sqlSession.getMapper(ConferenceDao.class).getConferenceDetail(conferencePk);
	}

}

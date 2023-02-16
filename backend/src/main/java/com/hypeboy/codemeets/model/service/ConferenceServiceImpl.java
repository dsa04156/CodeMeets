package com.hypeboy.codemeets.model.service;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hypeboy.codemeets.controller.UserController;
import com.hypeboy.codemeets.model.dao.ConferenceDao;
import com.hypeboy.codemeets.model.dto.ConferenceDto;
import com.hypeboy.codemeets.model.dto.ConferenceThreeDto;

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
	
	@Override
	public int createConference(ConferenceDto conferenceDto) throws Exception{
		System.out.println(conferenceDto.toString());
		return sqlSession.getMapper(ConferenceDao.class).createConference(conferenceDto);
	}

	@Override
	public int joinConference(int conferencePk,int userPk) throws Exception {
		return sqlSession.getMapper(ConferenceDao.class).joinConference(conferencePk,userPk);
	}
	
	@Override
	public List<ConferenceThreeDto> clickCreate(int userPk) throws Exception {
		return sqlSession.getMapper(ConferenceDao.class).clickCreate(userPk);
	}

	@Override
	public int checkUrl(String conferenceUrl) throws Exception {
		return sqlSession.getMapper(ConferenceDao.class).checkUrl(conferenceUrl);
	}
	
	@Override
	public void enterConference(int userPk, int conferencePk) throws SQLException {
		sqlSession.getMapper(ConferenceDao.class).enterConference(userPk,conferencePk);
	}

	@Override
	public void closeConference(int conferencePk, int userPk) throws SQLException {
		sqlSession.getMapper(ConferenceDao.class).closeConference(conferencePk,userPk);
	}

	@Override
	public void exitConference(int conferencePk, int userPk) throws SQLException {
		sqlSession.getMapper(ConferenceDao.class).exitConference(conferencePk,userPk);
	}
	
	@Override
	public void joinManager(int conferencePk, int userPk) throws SQLException {
		sqlSession.getMapper(ConferenceDao.class).joinManager(conferencePk,userPk);
	}

	@Override
	public void enterMember(int conferencePk, int userPk) throws SQLException {
		sqlSession.getMapper(ConferenceDao.class).enterMember(conferencePk,userPk);
	}
	
	@Override
	public List<String> participantsConference(int conferencePk) throws SQLException {
		return sqlSession.getMapper(ConferenceDao.class).participantsConference(conferencePk);
	}

	@Override
	public List<ConferenceDto> listConference(int userPk, int i, int items, String order, int groupPk) throws SQLException {
		return sqlSession.getMapper(ConferenceDao.class).listConference(userPk,i,items,order,groupPk);
	}

	@Override
	public int getGroupPk(int conferencePk) throws SQLException{
		return sqlSession.getMapper(ConferenceDao.class).getGroupPk(conferencePk);
	}


}

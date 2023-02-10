package com.hypeboy.codemeets.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hypeboy.codemeets.model.dao.ConferenceQuestionDao;
import com.hypeboy.codemeets.model.dto.ConferenceQuestionDto;

@Service
public class ConferenceQuestionServiceImpl implements ConferenceQuestionService {

	private ConferenceQuestionDao conferenceQuestionDao;
	
	@Autowired
	public ConferenceQuestionServiceImpl(ConferenceQuestionDao conferenceQuestionDao) throws Exception {
		super();
		this.conferenceQuestionDao = conferenceQuestionDao;
	}

	@Override
	public int writeConferenceQuestion(ConferenceQuestionDto conferenceQuestionDto) throws Exception {
		return conferenceQuestionDao.writeConferenceQuestion(conferenceQuestionDto);
	}

	@Override
	public List<ConferenceQuestionDto> getList(int conferencePk, int userPk) throws Exception {
		return conferenceQuestionDao.getList(conferencePk, userPk);
	}

	@Override
	public ConferenceQuestionDto getConferenceQuestion(int conferenceQuestionPk, int userPk) throws Exception {
		return conferenceQuestionDao.getConferenceQuestion(conferenceQuestionPk, userPk);
	}

	@Override
	public int modifyConferenceQuestion(ConferenceQuestionDto conferenceQuestionDto) throws Exception {
		return conferenceQuestionDao.modifyConferenceQuestion(conferenceQuestionDto);
	}

	@Override
	public int deleteConferenceQuestion(int conferenceQuestionPk) throws Exception {
		return conferenceQuestionDao.deleteConferenceQuestion(conferenceQuestionPk);
	}

	@Override
	public int likeConferenceQuestion(ConferenceQuestionDto conferenceQuestionDto) throws Exception {
		if (conferenceQuestionDao.searchLike(conferenceQuestionDto) == 1) {
			return conferenceQuestionDao.deleteLike(conferenceQuestionDto);
		}
		else {
			return conferenceQuestionDao.likeConferenceQuestion(conferenceQuestionDto);
		}
		
	}

	@Override
	public List<ConferenceQuestionDto> pageList(int conferencePk, int userPk, int nowPage, int items) throws Exception {
		return conferenceQuestionDao.pageList(conferencePk, userPk, nowPage, items);
	}
	
	
}

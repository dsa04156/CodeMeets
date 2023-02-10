package com.hypeboy.codemeets.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hypeboy.codemeets.model.dao.ConferenceAnswerDao;
import com.hypeboy.codemeets.model.dto.ConferenceAnswerDto;

@Service
public class ConferenceAnswerServiceImpl implements ConferenceAnswerService{

	private ConferenceAnswerDao conferenceAnswerDao;
	
	@Autowired
	public ConferenceAnswerServiceImpl (ConferenceAnswerDao conferenceAnswerDao) throws Exception {
		super();
		this.conferenceAnswerDao = conferenceAnswerDao;
	}

	@Override
	public int writeConferenceAnswer(ConferenceAnswerDto conferenceAnswerDto) throws Exception {
		return conferenceAnswerDao.writeConferenceAnswer(conferenceAnswerDto);
	}

	@Override
	public List<ConferenceAnswerDto> getList(int conferenceQuestionPk, int userPk) throws Exception {
		return conferenceAnswerDao.getList(conferenceQuestionPk, userPk);
	}

	@Override
	public int modifyConferenceAnswer(ConferenceAnswerDto conferenceAnswerDto) throws Exception {
		return conferenceAnswerDao.modifyConferenceAnswer(conferenceAnswerDto);
	}

	@Override
	public int deleteConferenceAnswer(int conferenceAnswerPk) throws Exception {
		return conferenceAnswerDao.deleteConferenceAnswer(conferenceAnswerPk);
	}

	@Override
	public int likeConferenceAnswer(ConferenceAnswerDto conferenceAnswerDto) throws Exception {
		if (conferenceAnswerDao.searchLike(conferenceAnswerDto)== 1) {
			return conferenceAnswerDao.deleteLike(conferenceAnswerDto);
		}
		else {
			return conferenceAnswerDao.likeConferenceAnswer(conferenceAnswerDto);
		}
	}
	
	

}

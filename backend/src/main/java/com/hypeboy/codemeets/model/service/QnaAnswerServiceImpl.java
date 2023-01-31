package com.hypeboy.codemeets.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hypeboy.codemeets.model.dao.QnaAnswerDao;
import com.hypeboy.codemeets.model.dto.QnaAnswerDto;


@Service
public class QnaAnswerServiceImpl implements QnaAnswerService{

	private QnaAnswerDao qnaAnswerDao;
	
	@Autowired
	public QnaAnswerServiceImpl(QnaAnswerDao qnaAnswerDao) {
		super();
		this.qnaAnswerDao = qnaAnswerDao;
	}
	
	@Override
	public int writeQnaAnswer(QnaAnswerDto qnaAnswerDto) throws Exception{
		return qnaAnswerDao.writeQnaAnswer(qnaAnswerDto);
	}
	
	@Override
	public List<QnaAnswerDto> getList(int questionPk, int userPk, int nowPage, int items) throws Exception {
		return qnaAnswerDao.getList(questionPk, userPk, nowPage, items );
	}

	@Override
	public QnaAnswerDto getQnaAnswer(int qnaAnswerPk, int userPk) throws Exception {
		return qnaAnswerDao.getQnaAnswer(qnaAnswerPk, userPk);
	}

	@Override
	public int modifyQnaAnswer(QnaAnswerDto groupQnaAnswerPk) throws Exception {
		return qnaAnswerDao.modifyQnaAnswer(groupQnaAnswerPk);
	}

	@Override
	public int deleteQnaAnswer(int groupQnaAnswerPk) throws Exception {
		return qnaAnswerDao.deleteQnaAnswer(groupQnaAnswerPk);
	}
	
	@Override
	public int likeQnaAnswer(QnaAnswerDto qnaAnswerDto) throws Exception {
		if (qnaAnswerDao.searchLike(qnaAnswerDto) == 1) {
			return qnaAnswerDao.deleteLike(qnaAnswerDto);
		}
		else {
		return qnaAnswerDao.likeQnaAnswer(qnaAnswerDto);
		}
	}
	
	
}

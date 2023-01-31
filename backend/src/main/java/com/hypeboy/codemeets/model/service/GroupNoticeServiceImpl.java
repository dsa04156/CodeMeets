package com.hypeboy.codemeets.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hypeboy.codemeets.controller.UserController;
import com.hypeboy.codemeets.model.dao.GroupNoticeDao;
import com.hypeboy.codemeets.model.dto.GroupNoticeDto;
import com.hypeboy.codemeets.utils.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GroupNoticeServiceImpl implements GroupNoticeService {
	private final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private SqlSession sqlSession;

	@Override
	public void writeGroupNotice(GroupNoticeDto groupNoticeDto) throws Exception {
		logger.info("Service writeGroupNotice - 실행");
		
		sqlSession.getMapper(GroupNoticeDao.class).writeGroupNotice(groupNoticeDto);
	}

	@Override
	public GroupNoticeDto getGroupNotice(int groupNoticePk) throws Exception {
		logger.info("Service getGroupNotice - 실행");
		
		// 조회수 증가
		sqlSession.getMapper(GroupNoticeDao.class).addGroupNoticeHit(groupNoticePk);
		
		return sqlSession.getMapper(GroupNoticeDao.class).getGroupNotice(groupNoticePk);
	}

	@Override
	public List<GroupNoticeDto> getGroupNoticeList(int groupPk, int nowPage, int items, String order) throws Exception {
		logger.info("Service getGroupNoticeList - 실행");
		
		return sqlSession.getMapper(GroupNoticeDao.class).getGroupNoticeList(groupPk, nowPage, items, order);
	}

	@Override
	public int editGroupNotice(GroupNoticeDto groupNoticeDto) throws Exception {
		logger.info("Service editGroupNotice - 실행");
		
		return sqlSession.getMapper(GroupNoticeDao.class).editGroupNotice(groupNoticeDto);
	}

	@Override
	public int deleteGroupNotice(int groupNoticePk) throws Exception {
		logger.info("Service deleteGroupNotice - 실행");

		return sqlSession.getMapper(GroupNoticeDao.class).deleteGroupNotice(groupNoticePk);
	}

}

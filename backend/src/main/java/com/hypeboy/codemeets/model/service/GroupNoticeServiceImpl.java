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
		sqlSession.getMapper(GroupNoticeDao.class).writeGroupNotice(groupNoticeDto);
	}

	@Override
	public GroupNoticeDto getGroupNotice(int groupNoticePk) throws Exception {
		sqlSession.getMapper(GroupNoticeDao.class).getGroupNotice(groupNoticePk);
		return sqlSession.getMapper(GroupNoticeDao.class).getGroupNotice(groupNoticePk);
	}

	@Override
	public List<GroupNoticeDto> getGroupNoticeList(int groupPk, int nowPage, int items) throws Exception {
		return sqlSession.getMapper(GroupNoticeDao.class).getGroupNoticeList(groupPk, nowPage, items);
	}

	@Override
	public int editGroupNotice(GroupNoticeDto groupNoticeDto) throws Exception {
		return sqlSession.getMapper(GroupNoticeDao.class).editGroupNotice(groupNoticeDto);
	}

	@Override
	public int deleteGroupNotice(int groupNoticePk) throws Exception {
		return sqlSession.getMapper(GroupNoticeDao.class).deleteGroupNotice(groupNoticePk);
	}

}

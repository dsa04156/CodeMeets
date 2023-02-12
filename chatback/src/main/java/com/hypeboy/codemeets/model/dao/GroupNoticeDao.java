package com.hypeboy.codemeets.model.dao;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.hypeboy.codemeets.model.dto.GroupNoticeDto;

@Mapper
public interface GroupNoticeDao {
	// 그룹 공지 작성
	public void writeGroupNotice(GroupNoticeDto groupNoticeDto) throws SQLException;
	
	// 그룹 공지 상세 확인
	public GroupNoticeDto getGroupNotice(int groupNoticePk) throws SQLException;
	
	// 그룹 공지 조회수 증가
	public int addGroupNoticeHit(int groupNoticePk) throws SQLException;
	
	// 그룹 공지 리스트 확인
	public List<GroupNoticeDto> getGroupNoticeList(int groupPk, int nowPage, int items, String order) throws SQLException;
	
	// 그룹 공지 수정
	public int editGroupNotice(GroupNoticeDto groupNoticeDto) throws SQLException;
	
	// 그룹 공지 삭제
	public int deleteGroupNotice(int groupNoticePk) throws SQLException;
}

package com.hypeboy.codemeets.model.service;

import java.sql.SQLException;
import java.util.List;

import com.hypeboy.codemeets.model.dto.GroupNoticeDto;

public interface GroupNoticeService {
	// 그룹 공지 작성
	public void writeGroupNotice(GroupNoticeDto groupNoticeDto) throws Exception;
	
	// 그룹 공지 상세 확인
	public GroupNoticeDto getGroupNotice(int groupNoticePk) throws Exception;
	
	// 그룹 공지 리스트 확인
	public List<GroupNoticeDto> getGroupNoticeList(int groupPk, int nowPage, int items, String order) throws Exception;
	
	// 그룹 공지 수정
	public int editGroupNotice(GroupNoticeDto groupNoticeDto) throws Exception;

	// 그룹 공지 삭제
	public int deleteGroupNotice(int groupNoticePk) throws Exception;
}

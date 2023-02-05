package com.hypeboy.codemeets.model.dao;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.hypeboy.codemeets.model.dto.ConferenceDto;

@Mapper
public interface ConferenceDao {
	// 그룹 공지 작성
	public ConferenceDto getConferenceDetail(int conferencePk) throws SQLException;

	public int createConference(ConferenceDto conferenceDto) throws SQLException;

	public int joinConference(int conferencePk, int userPk) throws SQLException;

	public List<String> clickCreate(int userPk) throws SQLException;

}

package com.hypeboy.codemeets.model.dao;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.hypeboy.codemeets.model.dto.ConferenceDto;
import com.hypeboy.codemeets.model.dto.ConferenceThreeDto;

@Mapper
public interface ConferenceDao {
	// 그룹 공지 작성
	public ConferenceDto getConferenceDetail(int conferencePk) throws SQLException;

	public int createConference(ConferenceDto conferenceDto) throws SQLException;

	public int joinConference(int conferencePk, int userPk) throws SQLException;

	public List<ConferenceThreeDto> clickCreate(int userPk) throws SQLException;

	public int checkUrl(String conferenceUrl) throws SQLException;

	public void enterConference(int userPk, int conferencePk) throws SQLException;

	public void closeConference(int conferencePk, int userPk) throws SQLException;

	public void exitConference(int conferencePk, int userPk) throws SQLException;

	public void joinManager(int conferencePk, int userPk) throws SQLException;

	public void enterMember(int conferencePk, int userPk) throws SQLException;

	public List<String> participantsConference(int conferencePk) throws SQLException;

	public List<ConferenceDto> listConference(int userPk, int i, int items, String order, int groupPk) throws SQLException;

	public int getGroupPk(int conferencePk) throws SQLException;
}

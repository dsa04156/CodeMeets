package com.hypeboy.codemeets.model.service;

import java.util.List;

import com.hypeboy.codemeets.model.dto.ConferenceDto;

public interface ConferenceService {
	// 회의 상세 페이지 조회
	public ConferenceDto getConferenceDetail(int conferencePk) throws Exception;

}

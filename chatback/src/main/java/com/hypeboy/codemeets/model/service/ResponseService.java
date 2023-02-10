package com.hypeboy.codemeets.model.service;

import java.util.List;

import com.hypeboy.codemeets.model.dto.response.BaseResponse;
import com.hypeboy.codemeets.model.dto.response.ListDataResponse;
import com.hypeboy.codemeets.model.dto.response.SingleDataResponse;

public interface ResponseService {
	public <T> SingleDataResponse<T> getSingleDataResponse(boolean success, String message, T data);
	public <T> ListDataResponse<T> getListDataResponse(boolean success, String message, List<T> data);
	public BaseResponse getBaseResponse(boolean success, String message);
}

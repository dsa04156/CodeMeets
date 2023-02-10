package com.hypeboy.codemeets.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hypeboy.codemeets.model.dto.response.BaseResponse;
import com.hypeboy.codemeets.model.dto.response.ListDataResponse;
import com.hypeboy.codemeets.model.dto.response.SingleDataResponse;

@Service
public class ResponseServiceImpl implements ResponseService {

    public <T> SingleDataResponse<T> getSingleDataResponse(boolean success, String message, T data) {
        SingleDataResponse<T> response = new SingleDataResponse<>();
        response.setSuccess(success);
        response.setMessage(message);
        response.setData(data);

        return response;
    }

    public <T> ListDataResponse<T> getListDataResponse(boolean success, String message, List<T> data) {
        ListDataResponse<T> response = new ListDataResponse<>();
        response.setSuccess(success);
        response.setMessage(message);
        response.setData(data);

        return response;
    }

    public BaseResponse getBaseResponse(boolean success, String message) {
        BaseResponse response = new BaseResponse();
        response.setSuccess(success);
        response.setMessage(message);

        return response;
    }
}

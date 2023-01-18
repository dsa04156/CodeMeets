package com.hypeboy.codemeets.model.dao;

import java.sql.SQLException;
import java.util.Map;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import com.hypeboy.codemeets.model.dto.UserDto;


@Mapper
public interface LoginDao {
    Optional<UserDto> findUserByUsername(String username) throws SQLException;
    Optional<UserDto> findByUserId(Long userId) throws SQLException;
    void save(UserDto userDto) throws SQLException;
    public void saveRefreshToken(Map<String, String> map) throws SQLException;
}
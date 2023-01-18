package com.hypeboy.codemeets.model.dao;

import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import com.hypeboy.codemeets.model.dto.LoginDto;
import com.hypeboy.codemeets.model.dto.UserDto;


@Mapper
public interface LoginDao {
    Optional<LoginDto> findUserByUsername(String username);
    Optional<UserDto> findByUserId(Long userId);
    void save(UserDto userDto);
}
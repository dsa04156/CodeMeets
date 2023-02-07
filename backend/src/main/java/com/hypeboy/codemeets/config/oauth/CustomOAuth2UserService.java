package com.hypeboy.codemeets.config.oauth;

import java.util.Collections;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.hypeboy.codemeets.controller.UserController;
import com.hypeboy.codemeets.model.dao.LoginDao;
import com.hypeboy.codemeets.model.dto.UserDto;
import com.hypeboy.codemeets.model.service.UserServiceImpl;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
	private final Logger logger = LoggerFactory.getLogger(CustomOAuth2UserService.class);
	private final HttpSession httpSession;
    private final PasswordEncoder passwordEncoder;

	@Autowired
	private SqlSession sqlSession;
	
	@Autowired
	private UserServiceImpl userService;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
		OAuth2User oAuth2User = delegate.loadUser(userRequest);

		// 현재 로그인 진행 중인 서비스를 구분하는 코드
		String registrationId = userRequest.getClientRegistration().getRegistrationId();

		// oauth2 로그인 진행 시 키가 되는 필드값
		String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint()
				.getUserNameAttributeName();

		// OAuthAttributes: attribute를 담을 클래스 (개발자가 생성)
		OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName,
				oAuth2User.getAttributes());
//		logger.info("oAuth2User.getAttributes() - " + oAuth2User.getAttributes());
		
		String userId = String.valueOf(attributes.getAttributes().get("sub"));
		String userName = String.valueOf(attributes.getAttributes().get("name"));
		String picture = String.valueOf(attributes.getAttributes().get("picture"));
		String email = String.valueOf(attributes.getAttributes().get("email"));
		
//		logger.info(userId + " " + userName + " " + picture + " " + email);
		UserDto userDto = new UserDto();
		
		try {
			userDto = saveOrUpdate(userId, userName, email, picture);
		} catch (Exception e) {
			logger.info("CustomOAuth2UserService loadUser UserDto userDto try Error - " + e);
		}

		// SessioUser: 세션에 사용자 정보를 저장하기 위한 DTO 클래스 (개발자가 생성)
//		httpSession.setAttribute("user", new SessionUser(userDto));
		return new DefaultOAuth2User(
				Collections.singleton(
						new SimpleGrantedAuthority("ROLE_USER")
						),
				attributes.getAttributes(), 
				attributes.getNameAttributeKey() );
	}

	public UserDto saveOrUpdate(String userId, String userName, String email, String picture) throws Exception {
		UserDto userDto = new UserDto();
		
		try {
			if (sqlSession.getMapper(LoginDao.class).findByEmail(email) != null) {
				userDto = sqlSession.getMapper(LoginDao.class).findByEmail(email);
			}
			// 회원이 아닌 경우 회원가입 진행
			else {
				try {
					userDto.setUserId( userId.substring(0, 10) );
					userDto.setUserName(userName);
					userDto.setNickname(userName);
					userDto.setEmail(email);
					userDto.setProfilePhoto(picture);

					// 패스워드 임의 생성
					userDto.setPassword( userId.substring(0, 10) );

					logger.info(userDto.toString());
					
					userService.registUser(userDto);
					
				} catch (Exception e) {
					logger.info("saveOrUpdate if (userDto == null) error - " + e);
				}
			}
			
		} catch (Exception e) {
			logger.info("saveOrUpdate LoginDao error - " + e);
		}
		
        return userDto;
    }
	
	public void saveRefreshToken(int userPk, String newRefreshToken) throws Exception {
		sqlSession.getMapper(LoginDao.class).saveRefreshToken(userPk, newRefreshToken);
	}
	
}

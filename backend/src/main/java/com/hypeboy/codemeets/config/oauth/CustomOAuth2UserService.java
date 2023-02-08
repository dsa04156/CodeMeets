package com.hypeboy.codemeets.config.oauth;

import java.util.Collections;
import java.util.Map;

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
		
		logger.info("registrationId - " + registrationId + " userNameAttributeName - " + userNameAttributeName);
		logger.info("attributes - " + attributes.getAttributes());
		
		UserDto user = new UserDto();
		String userId = null;
		String userName = null;
		String nickname = null;
		String email = null;
		String profilePhoto = null;
		String provider = null;
		String providerId = null;
		
		if ( registrationId.equals("google") ) {
			email = String.valueOf(attributes.getAttributes().get("email"));
			userId = email.split("@")[0] + "@" + registrationId;
			userName = String.valueOf(attributes.getAttributes().get("name"));
			nickname = userName;
			profilePhoto = String.valueOf(attributes.getAttributes().get("picture"));
			provider = String.valueOf(registrationId);
			providerId = String.valueOf(attributes.getAttributes().get("sub"));
		} else if ( registrationId.equals("kakao") ) {
	        Map<String, Object> kakaoAttributes = oAuth2User.getAttributes();
	        Map<String, Object> kakao_account = (Map<String, Object>) kakaoAttributes.get("kakao_account");
	        email = (String) kakao_account.get("email");
	        Map<String, Object> properties = (Map<String, Object>) kakaoAttributes.get("properties");
	        nickname = String.valueOf( properties.get("nickname") );
	        
			userId = email.split("@")[0] + "@" + registrationId;
			userName = nickname;
			profilePhoto = String.valueOf( properties.get("profile_image") );
			provider = String.valueOf(registrationId);
			providerId = String.valueOf(attributes.getAttributes().get("id"));
		}
		
		user.setUserId(userId);
		user.setUserName(userName);
		user.setNickname(nickname);
		user.setEmail(email);
		user.setEmailPublic(1);
		user.setProfilePhoto(profilePhoto);
		user.setProvider(provider);
		user.setProviderId(providerId);

		// 패스워드 임의 생성
		user.setPassword( user.getUserId().substring(0, 10) );
		
//		logger.info(userId + " " + userName + " " + picture + " " + email);
		UserDto userDto = new UserDto();
		
		try {
			userDto = saveOrUpdate(user);
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

	public UserDto saveOrUpdate(UserDto user) throws Exception {
		UserDto userDto = new UserDto();
		logger.info("saveOrUpdate user - " + user);
		
		try {
			// 회원이면 정보 찾아서 전달
			if (sqlSession.getMapper(LoginDao.class).findByEmail(user.getEmail()) != null) {
				userDto = sqlSession.getMapper(LoginDao.class).findByEmail(user.getEmail());
				logger.info(userDto.getProvider() + " 유저 로그인 진행");
			}
			// 회원이 아닌 경우 회원가입 진행
			else {
				try {
					userService.registUser(user);
					logger.info(user.getProvider() + " 유저 가입 성공");
				} catch (Exception e) {
					logger.info("saveOrUpdate if (userDto == null) error - " + e);
				}
			}
			
		} catch (Exception e) {
			logger.info("saveOrUpdate LoginDao error - " + e);
		}

		logger.info(userDto.toString());
		
        return userDto;
    }
	
	public void saveRefreshToken(int userPk, String newRefreshToken) throws Exception {
		sqlSession.getMapper(LoginDao.class).saveRefreshToken(userPk, newRefreshToken);
	}
	
}

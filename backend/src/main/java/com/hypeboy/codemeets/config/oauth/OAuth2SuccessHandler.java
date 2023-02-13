package com.hypeboy.codemeets.config.oauth;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import com.hypeboy.codemeets.model.dto.UserDto;
import com.hypeboy.codemeets.model.service.LoginServiceImpl;
import com.hypeboy.codemeets.utils.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Component
@Service
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	private final Logger logger = LoggerFactory.getLogger(OAuth2SuccessHandler.class);

    private final JwtTokenProvider jwtTokenProvider;
    private final CustomOAuth2UserService customOAuth2UserService;
    
    @Value("${url.front-url}")
    private String frontUrl;
    
	@Autowired
	private SqlSession sqlSession;
	
	@Autowired
	private LoginServiceImpl loginService;
	
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {
    	OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
    	logger.info("oAuth2User - " + oAuth2User.toString());
    	
        String targetUrl;
        String newAccessToken = null;
        String newRefreshToken = null;
        
        UserDto user = new UserDto();
        UserDto userDto = new UserDto();
        String email = null;
        
        email = String.valueOf( oAuth2User.getAttributes().get("email") );
        logger.info("email - " + email);
        
        // 구글이 아닌상황. 일단 카카오인지 확인
        if (email.equals("null")) {
	        Map<String, Object> kakaoAttributes = oAuth2User.getAttributes();
	        logger.info("kakaoAttributes - " + kakaoAttributes.toString());
	        Map<String, Object> kakao_account = (Map<String, Object>) kakaoAttributes.get("kakao_account");
	        logger.info(kakao_account.toString());
	        email = String.valueOf( kakao_account.get("email") );
        }
        logger.info("email - " + email);

		user.setEmail(email);
        
        try {
			userDto = customOAuth2UserService.saveOrUpdate(user);
		} catch (Exception e) {
			logger.info("CustomOAuth2UserService loadUser UserDto userDto try Error - " + e);
		}
        
        logger.info("userDto - " + userDto);
                
        try {
			newAccessToken = jwtTokenProvider.createAccessToken("userPk", userDto.getUserPk());
			newRefreshToken = jwtTokenProvider.createRefreshToken();
//			logger.info("newAccessToken - " + newAccessToken);
			customOAuth2UserService.saveRefreshToken(userDto.getUserPk(), newRefreshToken);
		} catch (Exception e) {
			logger.info("saveRefreshToken error - " + e);
		}

        targetUrl = UriComponentsBuilder.fromUriString(frontUrl)
//        targetUrl = UriComponentsBuilder.fromUriString("/api/login/oauth2/success")
                .queryParam("accessToken", newAccessToken)
                .queryParam("refreshToken", newRefreshToken)
                .build().toUriString();
        logger.info("targetUrl - " + targetUrl);
        
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

}
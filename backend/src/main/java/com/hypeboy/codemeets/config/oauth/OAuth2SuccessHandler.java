package com.hypeboy.codemeets.config.oauth;

import java.io.IOException;

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
        String targetUrl;
        String newAccessToken = null;
        String newRefreshToken = null;

		String userId = String.valueOf(oAuth2User.getAttributes().get("sub"));
		String userName = String.valueOf(oAuth2User.getAttributes().get("name"));
		String picture = String.valueOf(oAuth2User.getAttributes().get("picture"));
		String email = String.valueOf(oAuth2User.getAttributes().get("email"));
		
        UserDto userDto = new UserDto();
        
        try {
			userDto = customOAuth2UserService.saveOrUpdate(userId, userName, email, picture);
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

        targetUrl = UriComponentsBuilder.fromUriString(frontUrl + "codemeets/login")
//        targetUrl = UriComponentsBuilder.fromUriString("/api/login/oauth2/success")
                .queryParam("accessToken", newAccessToken)
                .queryParam("refreshToken", newRefreshToken)
                .build().toUriString();
        logger.info("targetUrl - " + targetUrl);
        
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

}
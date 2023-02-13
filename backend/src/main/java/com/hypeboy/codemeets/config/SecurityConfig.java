package com.hypeboy.codemeets.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.stereotype.Component;

import com.hypeboy.codemeets.config.oauth.CustomOAuth2UserService;
import com.hypeboy.codemeets.config.oauth.OAuth2SuccessHandler;
import com.hypeboy.codemeets.config.security.CustomAccessDeniedHandler;
import com.hypeboy.codemeets.config.security.CustomAuthenticationEntryPoint;
import com.hypeboy.codemeets.utils.JwtTokenProvider;

@Component
@Configuration
//Spring Security에 대한 디버깅 모드를 사용하기 위한 어노테이션 (default : false)
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	private final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);
	private final OAuth2SuccessHandler oAuth2SuccessHandler;
    
    @Value("${url.front-url}")
    private String frontUrl;
    
	@Autowired
	private CustomOAuth2UserService customOAuth2UserService;

	@Autowired
	public SecurityConfig(JwtTokenProvider jwtTokenProvider, OAuth2SuccessHandler oAuth2SuccessHandler) {
		this.oAuth2SuccessHandler = oAuth2SuccessHandler;
	}

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		// REST API는 UI를 사용하지 않으므로 기본설정을 비활성화
		httpSecurity.httpBasic().disable() 
				// REST API는 csrf 보안이 필요 없으므로 비활성화
				.csrf().disable() 
				// JWT Token 인증방식으로 세션은 필요 없으므로 비활성화
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) 
				// 리퀘스트에 대한 사용권한 체크			
				.and().authorizeRequests()
				.antMatchers("**").permitAll()
				
				.and().exceptionHandling().accessDeniedHandler(new CustomAccessDeniedHandler())
				.and().exceptionHandling().authenticationEntryPoint(new CustomAuthenticationEntryPoint())
				
				// 소셜 로그인
				.and().oauth2Login()
				.defaultSuccessUrl(frontUrl)
				.userInfoEndpoint()
				.userService(customOAuth2UserService)
				.and()
                .successHandler(oAuth2SuccessHandler);
				
	}

	/**
	 * Swagger 페이지 접근에 대한 예외 처리
	 *
	 * @param webSecurity
	 */
	@Override
	public void configure(WebSecurity webSecurity) {
		webSecurity.ignoring().antMatchers("/v2/api-docs", "/swagger-resources/**", "/swagger-ui.html", "/webjars/**",
				"/swagger/**", "/sign-api/exception", "/v3/api-docs/**", "/swagger-ui/**");
	}
}
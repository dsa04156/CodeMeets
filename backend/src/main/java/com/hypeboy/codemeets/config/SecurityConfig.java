package com.hypeboy.codemeets.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.hypeboy.codemeets.config.oauth.CustomOAuth2UserService;
import com.hypeboy.codemeets.config.security.CustomAccessDeniedHandler;
import com.hypeboy.codemeets.config.security.CustomAuthenticationEntryPoint;
import com.hypeboy.codemeets.config.security.JwtAuthenticationFilter;
import com.hypeboy.codemeets.utils.JwtTokenProvider;

@Configuration
//Spring Security에 대한 디버깅 모드를 사용하기 위한 어노테이션 (default : false)
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	private final JwtTokenProvider jwtTokenProvider;

	@Autowired
	private CustomOAuth2UserService customOAuth2UserService;

	@Autowired
	public SecurityConfig(JwtTokenProvider jwtTokenProvider) {
		this.jwtTokenProvider = jwtTokenProvider;
	}

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity.httpBasic().disable() // REST API는 UI를 사용하지 않으므로 기본설정을 비활성화

				.csrf().disable() // REST API는 csrf 보안이 필요 없으므로 비활성화

				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // JWT Token 인증방식으로 세션은 필요
																							// 없으므로 비활성화

				.and().authorizeRequests() // 리퀘스트에 대한 사용권한 체크
//          .antMatchers("/sign-api/sign-in", "/sign-api/sign-up",
//              "/sign-api/exception").permitAll() // 가입 및 로그인 주소는 허용
//          .antMatchers(HttpMethod.GET, "/product/**").permitAll() // product로 시작하는 Get 요청은 허용

//          .antMatchers("**exception**").permitAll()
				.antMatchers("**").permitAll()

//          .anyRequest().hasRole("ADMIN") // 나머지 요청은 인증된 ADMIN만 접근 가능
				
				.and().exceptionHandling().accessDeniedHandler(new CustomAccessDeniedHandler())
				.and().exceptionHandling().authenticationEntryPoint(new CustomAuthenticationEntryPoint())
//				.and()
//				.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
//						UsernamePasswordAuthenticationFilter.class); // JWT Token 필터를 id/password 인증 필터 이전에 추가

				.and().oauth2Login()
				.defaultSuccessUrl("http://localhost:3000")
				.userInfoEndpoint()
				.userService(customOAuth2UserService);
				
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
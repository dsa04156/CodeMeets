package com.hypeboy.codemeets.utils;

import java.util.Base64;
import java.util.Date;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.token-validity-in-seconds}")
    private long tokenValidMillisecond;
    
    @Value("${jwt.refresh-token-validity-in-seconds}")
    private long refreshTokenValidMillisecond;
    
    @Value("${jwt.access-token}")
    private String accessToken;
    
    @Value("${jwt.refresh-token}")
    private String refreshToken;

//    private final UserDetailsService userDetailsService;
    private final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes()); // SecretKey Base64로 인코딩
    }

//	public <T> String createAccessToken(String key, T data) {
//		return create(key, data, "access_token", tokenValidMillisecond);
//	}
//
//	public <T> String createRefreshToken(String key, T data) {
//		return create(key, data, "refresh_token", refreshTokenValidMillisecond);
//	}

	public <T> String createAccessToken(String key, T data) {
		String jwt = Jwts.builder()
				.setHeaderParam("typ", "JWT")
				.setHeaderParam("regDate", System.currentTimeMillis())
				.setExpiration(new Date(System.currentTimeMillis() + tokenValidMillisecond))
				.setSubject(accessToken)
				.claim(key, data)
				.signWith(SignatureAlgorithm.HS256, secretKey)
				.compact();
		return jwt;
	}
	
	public <T> String createRefreshToken() {
		String jwt = Jwts.builder()
				.setHeaderParam("typ", "JWT")
				.setHeaderParam("regDate", System.currentTimeMillis())
				.setExpiration(new Date(System.currentTimeMillis() + refreshTokenValidMillisecond))
				.setSubject(refreshToken)
				.signWith(SignatureAlgorithm.HS256, secretKey)
				.compact();
		return jwt;
	}

    // JWT 토큰에서 인증 정보 조회
//    public Authentication getAuthentication(String token) {
//        UserDetails userDetails = userDetailsService.loadUserByUsername( String.valueOf(this.getUserPk(token)) );
//
//        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
//    }

    // 유저 PK 추출
    public int getUserPk(String token) {
        return Integer.parseInt(Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody().get("userPk").toString());
    }

    // Request header에서 token 꺼내옴
    public String resolveToken(HttpServletRequest request) {
        String token = request.getHeader("Authorization");

        // 가져온 Authorization Header 가 문자열이고, Bearer 로 시작해야 가져옴
        if (StringUtils.hasText(token) && token.startsWith("Bearer ")) {
            return token.substring(7);
        }

        return null;
    }

    // JWT 토큰 유효성 체크
    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);

            return !claims.getBody().getExpiration().before(new Date());
        } catch (SecurityException | MalformedJwtException | IllegalArgumentException exception) {
            logger.info("잘못된 Jwt 토큰입니다");
        } catch (ExpiredJwtException exception) {
            logger.info("만료된 Jwt 토큰입니다");
        } catch (UnsupportedJwtException exception) {
            logger.info("지원하지 않는 Jwt 토큰입니다");
        }

        return false;
    }
    
	public Map<String, Object> get(String key) {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
				.getRequest();
		String jwt = request.getHeader(accessToken);
		Jws<Claims> claims = null;
		try {
			claims = Jwts.parser().setSigningKey(secretKey.getBytes("UTF-8")).parseClaimsJws(jwt);
		} catch (Exception e) {
			e.printStackTrace();
		}
		Map<String, Object> value = claims.getBody();
		return value;
	}

	public String getUserId() {
		return (String) this.get("user").get("userid");
	}
}

package com.gonggam;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // CSRF 보호 비활성화
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))  // CORS 설정
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/login", "/api/register", "/api/posts", "/api/posts/*", "/api/me").permitAll()  // 특정 경로는 인증 없이 허용
                        .anyRequest().authenticated())  // 그 외의 모든 요청은 인증이 필요
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)  // 세션이 없을 경우 생성
//                        .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)  // 세션을 항상 생성
                        .sessionFixation().migrateSession())  // 세션 고정 공격 방지
                .logout(logout -> logout
                        .logoutUrl("/api/logout")
                        .logoutSuccessUrl("/login"));

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);  // 세션 쿠키 허용
        configuration.addAllowedOrigin("http://localhost:3000");  // 프론트엔드 주소 허용 (슬래시 제거)
        configuration.addAllowedHeader("*");  // 모든 헤더 허용
        configuration.addAllowedMethod("*");  // 모든 HTTP 메서드 허용 (GET, POST, 등)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);  // 모든 경로에 대해 CORS 설정 적용
        return source;
    }
}
package com.example.subscribe;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorizeRequests ->
                authorizeRequests
                    .requestMatchers("/api/**").permitAll() // /api/** 경로는 인증 없이 허용
                    .anyRequest().authenticated() // 그 외의 경로는 인증 요구
            )
            // .cors().and() // CORS 설정을 적용
            .csrf(csrf -> csrf.disable()); // CSRF 보호 비활성화

        return http.build();
    }
}

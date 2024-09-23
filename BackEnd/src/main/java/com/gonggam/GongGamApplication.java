package com.gonggam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc // 필요 시 추가
public class GongGamApplication {
	public static void main(String[] args) {
		SpringApplication.run(GongGamApplication.class, args);
	}
}
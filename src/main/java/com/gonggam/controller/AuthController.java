// src/main/java/com/gonggam/controller/AuthController.java
package com.gonggam.controller;

import com.gonggam.entity.User;
import com.gonggam.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; // 암호화 관련
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/api/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword())); // 비밀번호 암호화
        userRepository.save(user);
        return ResponseEntity.ok("회원가입 성공");
    }

    // 로그인 API 추가...
}
// src/main/java/com/gonggam/controller/AuthController.java
package com.gonggam.controller;

import com.gonggam.entity.User;
import com.gonggam.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        boolean isRegistered = userService.registerUser(user);
        return isRegistered
                ? ResponseEntity.ok()
                .header("Content-Type", "text/plain; charset=UTF-8")
                .body("회원가입 성공")
                : ResponseEntity.badRequest()
                .header("Content-Type", "text/plain; charset=UTF-8")
                .body("회원가입 실패");
    }

    // 로그인 메서드 추가
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        boolean isAuthenticated = userService.authenticateUser(user.getUsername(), user.getPassword());
        return isAuthenticated
                ? ResponseEntity.ok()
                .header("Content-Type", "text/plain; charset=UTF-8")
                .body("로그인 성공")
                : ResponseEntity.badRequest()
                .header("Content-Type", "text/plain; charset=UTF-8")
                .body("로그인 실패");
    }
}
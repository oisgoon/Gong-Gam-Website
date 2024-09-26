package com.gonggam.controller;

import com.gonggam.entity.User;
import com.gonggam.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
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

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user, HttpSession session) {
        boolean isAuthenticated = userService.authenticateUserByUserid(user.getUserid(), user.getPassword());
        if (isAuthenticated) {
            // 로그인 성공 시 username을 세션에 저장
            String username = userService.findUsernameByUserid(user.getUserid());
            session.setAttribute("username", username);

            return ResponseEntity.ok()
                    .header("Content-Type", "text/plain; charset=UTF-8")
                    .body("로그인 성공");
        } else {
            return ResponseEntity.status(401)
                    .header("Content-Type", "text/plain; charset=UTF-8")
                    .body("로그인 실패: 잘못된 아이디 또는 비밀번호");
        }
    }


    @GetMapping("/me")
    public ResponseEntity<String> getCurrentUser(HttpSession session) {
        // 세션에서 username을 가져옴
        String username = (String) session.getAttribute("username");
        if (username != null) {
            return ResponseEntity.ok(username);  // 로그인한 사용자의 username 반환
        } else {
            return ResponseEntity.status(401).body("anonymous");  // 인증되지 않았을 경우 "anonymous" 반환
        }
    }
}